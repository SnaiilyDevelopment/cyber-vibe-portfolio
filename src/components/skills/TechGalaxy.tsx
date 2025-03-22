
import React from 'react';
import { motion } from 'framer-motion';

const TechGalaxy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative aspect-square glass-morphism rounded-lg cyberpunk-border flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 via-cyber-blue/10 to-cyber-neon/10 rounded-lg"></div>
      
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-cyber-blue/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute w-48 h-48 border border-cyber-purple/30 rounded-full animate-spin-slow"></div>
        <div className="absolute w-64 h-64 border border-cyber-neon/20 rounded-full" style={{ animationDuration: '15s' }}></div>
        <div className="text-cyber-neon font-bold text-xl font-mono">Tech Universe</div>
        
        {/* Add decorative orbiting elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-cyber-neon rounded-full"
            animate={{
              x: Math.cos(i * (Math.PI / 3)) * 120,
              y: Math.sin(i * (Math.PI / 3)) * 120,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TechGalaxy;
