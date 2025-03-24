
import React from 'react';
import { Send } from 'lucide-react';
import { ChatInputProps } from './types';

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  handleKeyDown 
}) => {
  return (
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
  );
};

export default React.memo(ChatInput);
