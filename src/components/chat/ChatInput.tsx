
import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 bg-cyber-dark border border-cyber-purple/30 text-white focus:border-cyber-neon"
          autoFocus
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim()}
          className="w-10 h-10 p-0 rounded-md bg-cyber-purple/20 text-white hover:bg-cyber-purple/40 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Send message"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(ChatInput);
