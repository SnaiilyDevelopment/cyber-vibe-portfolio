
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';
import ChatHeader from './chat/ChatHeader';
import ChatMessage from './chat/ChatMessage';
import ChatInput from './chat/ChatInput';
import { useChatbot } from './chat/hooks/useChatbot';
import { Message } from './chat/types';

const AIChatbot: React.FC = () => {
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
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-24 z-40 w-14 h-14 rounded-full bg-cyber-neon text-cyber-dark shadow-neon flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="fixed bottom-24 right-48 z-50 w-80 md:w-96 h-96 rounded-lg overflow-hidden cyberpunk-border bg-cyber-dark/95 flex flex-col"
          >
            {/* Chat header */}
            <ChatHeader onClose={() => setIsOpen(false)} />
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-cyber-purple/30 scrollbar-track-cyber-dark">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(AIChatbot);
