
import React from 'react';
import { Bot } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatDialogProps, Message } from './types';

const ChatDialog: React.FC<ChatDialogProps> = ({
  isOpen,
  setIsOpen,
  messages,
  input,
  setInput,
  isTyping,
  messagesEndRef,
  handleSendMessage,
  handleKeyDown
}) => {
  // Do not allow closure until user has interacted with the chat
  const handleOpenChange = (open: boolean) => {
    // If user has interacted (sent at least one message), allow closure
    const hasInteracted = messages.some(msg => msg.type === 'user');
    if (!open && !hasInteracted) return;
    
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="w-[90vw] max-w-md p-0 bg-cyber-dark/95 border-cyber-neon/20 rounded-lg overflow-hidden cyberpunk-border"
        hideCloseButton
      >
        {/* Chat header */}
        <ChatHeader onClose={() => handleOpenChange(false)} />
        
        {/* Chat messages */}
        <div className="h-80 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-cyber-purple/30 scrollbar-track-cyber-dark">
          {messages.map((message: Message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-cyber-purple/20 text-white rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Bot size={14} className="text-cyber-neon" />
                  <span className="text-xs text-white/60">Assistant</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse delay-75"></span>
                  <span className="w-2 h-2 bg-cyber-neon rounded-full animate-pulse delay-150"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <ChatInput 
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
        />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(ChatDialog);
