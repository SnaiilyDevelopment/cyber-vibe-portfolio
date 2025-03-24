
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

export interface AIChatbotProps {
  chatButtonRef?: React.RefObject<HTMLButtonElement>;
}

export interface ChatDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  messages: Message[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}
