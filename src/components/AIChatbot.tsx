
import React, { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useChatbot } from './chat/hooks/useChatbot';
import { AIChatbotProps } from './chat/types';
import ChatDialog from './chat/ChatDialog';

const AIChatbot: React.FC<AIChatbotProps> = ({ chatButtonRef: externalButtonRef }) => {
  const internalButtonRef = useRef<HTMLButtonElement>(null);
  const chatButtonRef = externalButtonRef || internalButtonRef;
  
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown
  } = useChatbot();
  
  return (
    <>
      <button
        ref={chatButtonRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-24 z-40 w-14 h-14 rounded-full bg-cyber-neon text-cyber-dark shadow-neon flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </button>
      
      <ChatDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        messages={messages}
        input={input}
        setInput={setInput}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        handleSendMessage={handleSendMessage}
        handleKeyDown={handleKeyDown}
      />
    </>
  );
};

export default React.memo(AIChatbot);
