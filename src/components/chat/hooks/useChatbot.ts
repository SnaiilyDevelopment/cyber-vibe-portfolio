
import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { RESPONSES } from '../responseData';
import { toast } from 'sonner';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'bot',
    text: 'Hi there! I\'m the SnaillyDevs assistant. Ask me anything about my projects, skills, or experience!',
    timestamp: new Date()
  }
];

export const useChatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const generateResponse = (message: string): string => {
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
  
  const handleSendMessage = (): void => {
    if (!input.trim()) return;
    
    try {
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
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
      setIsTyping(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    handleSendMessage,
    handleKeyDown
  };
};
