
import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessageProps } from './types';

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
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
  );
};

export default React.memo(ChatMessage);
