
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Button with hover effect and click ripple
export const InteractiveButton = ({ 
  children, 
  onClick, 
  className = "" 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const [isRippling, setIsRippling] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500);
    } else {
      setIsRippling(false);
    }
  }, [coords]);
  
  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });
    }
    if (onClick) onClick();
  };
  
  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden cyberpunk-border group ${className}`}
      onClick={handleClick}
    >
      {isRippling && (
        <span
          className="absolute bg-white/20 rounded-full animate-ripple"
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
      <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 transition-all duration-300 group-hover:h-full"></span>
    </button>
  );
};

// Text with hover underline effect
export const InteractiveText = ({ 
  children, 
  className = "" 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-px bg-cyber-neon group-hover:w-full transition-all duration-300"></span>
    </span>
  );
};

// Card with hover effects
export const InteractiveCard = ({ 
  children, 
  className = "" 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 30px -10px rgba(0, 245, 255, 0.2)' 
      }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`cyberpunk-border bg-cyber-dark/50 backdrop-blur-sm rounded-lg overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Image with hover zoom effect
export const InteractiveImage = ({ 
  src, 
  alt, 
  className = "" 
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Icon with hover rotate effect
export const InteractiveIcon = ({ 
  children, 
  className = "" 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ rotate: 15, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Add these styles to your global CSS
const globalStyles = `
@keyframes ripple {
  to {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
}
.animate-ripple {
  width: 0;
  height: 0;
  opacity: 0.4;
  animation: ripple 0.5s ease-out;
}
`;
