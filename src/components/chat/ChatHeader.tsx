
import React from 'react';
import { Bot, X } from 'lucide-react';
import { ChatHeaderProps } from './types';

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="p-3 bg-cyber-purple/20 border-b border-cyber-neon/20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Bot size={20} className="text-cyber-neon" />
        <h3 className="text-white font-medium">AI Assistant</h3>
      </div>
      <button
        onClick={onClose}
        className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        aria-label="Close chat"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default React.memo(ChatHeader);
