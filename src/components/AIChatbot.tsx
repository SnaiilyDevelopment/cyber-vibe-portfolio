
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: 'Hi there! I\'m the SnaillyDevs assistant. Ask me anything about my projects, skills, or experience!',
    timestamp: new Date()
  }
];

// Sample responses based on keywords - in a real implementation, this would connect to a real AI backend
const RESPONSES: Record<string, string> = {
  'project': 'I have worked on various projects including web applications, mobile apps, and interactive 3D experiences. Is there a specific project you want to know more about?',
  'skill': 'My core skills include React, TypeScript, Three.js, Node.js, and creative coding. I\'m constantly expanding my skillset with new technologies.',
  'experience': 'I have several years of experience building modern web applications with a focus on performance, accessibility, and creative interactions.',
  'contact': 'You can reach out to me through the contact form at the bottom of this page or connect with me on social media.',
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! How can I assist you?',
  'help': 'I can tell you about my projects, skills, work experience, or how to get in touch. What would you like to know?',
  'react': 'I have extensive experience with React, building component libraries, state management solutions, and complex UI interfaces.',
  'threejs': 'Three.js is one of my favorite libraries! I use it to create immersive 3D experiences on the web.',
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const generateResponse = (message: string) => {
    // In a real implementation, this would call an AI service
    // For now, we'll use simple keyword matching
    const lowercaseMsg = message.toLowerCase();
    
    for (const [keyword, response] of Object.entries(RESPONSES)) {
      if (lowercaseMsg.includes(keyword)) {
        return response;
      }
    }
    
    return "I'm not sure I understand that question. Could you rephrase or ask me about my projects, skills, or experience?";
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: generateResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyber-neon text-cyber-dark shadow-neon flex items-center justify-center transition-transform hover:scale-110"
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
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-96 rounded-lg overflow-hidden cyberpunk-border bg-cyber-dark/95 flex flex-col"
          >
            {/* Chat header */}
            <div className="p-3 bg-cyber-purple/20 border-b border-cyber-neon/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} className="text-cyber-neon" />
                <h3 className="text-white font-medium">AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-cyber-purple/30 scrollbar-track-cyber-dark">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-cyber-blue/20 text-white ml-auto'
                        : 'bg-cyber-purple/20 text-white mr-auto'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'bot' ? (
                        <Bot size={14} className="text-cyber-neon" />
                      ) : (
                        <User size={14} className="text-cyber-neon" />
                      )}
                      <span className="text-xs text-white/60">
                        {message.type === 'bot' ? 'Assistant' : 'You'}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
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
            <div className="p-3 border-t border-cyber-neon/20">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-cyber-dark border border-cyber-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:border-cyber-neon transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-md bg-cyber-purple/20 text-white hover:bg-cyber-purple/40 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
