
export interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export interface ChatHeaderProps {
  onClose: () => void;
}

export interface ChatMessageProps {
  message: Message;
}

export interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export interface ResponseDatabase {
  [keyword: string]: string;
}
