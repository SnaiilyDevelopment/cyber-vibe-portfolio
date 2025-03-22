
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Code, Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { toast } from "sonner";

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
}

interface CodeBlockProps {
  snippet: CodeSnippet;
  expanded: boolean;
  toggleExpand: () => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ snippet, expanded, toggleExpand }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="glass-morphism rounded-lg overflow-hidden cyberpunk-border mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 flex justify-between items-center bg-cyber-dark/70">
        <div className="flex items-center gap-2">
          <Code size={18} className="text-cyber-neon" />
          <h3 className="text-xl font-bold text-white">{snippet.title}</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={copyToClipboard} 
            className="p-2 rounded-md hover:bg-white/10 text-white hover:text-cyber-neon transition-colors"
            aria-label="Copy code to clipboard"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          <button 
            onClick={toggleExpand} 
            className="p-2 rounded-md hover:bg-white/10 text-white hover:text-cyber-neon transition-colors"
            aria-label={expanded ? "Minimize code" : "Expand code"}
          >
            {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-cyber-dark/50">
        <p className="text-white/70">{snippet.description}</p>
      </div>
      
      <motion.div
        initial={{ height: "200px" }}
        animate={{ height: expanded ? "400px" : "200px" }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden relative"
      >
        <SyntaxHighlighter
          language={snippet.language}
          style={atomDark}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            background: 'transparent',
            height: '100%',
          }}
          wrapLines={true}
          showLineNumbers={true}
        >
          {snippet.code}
        </SyntaxHighlighter>
        
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyber-dark to-transparent pointer-events-none" />
        )}
      </motion.div>
    </motion.div>
  );
};

export default CodeBlock;
