
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cyber-dark flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-morphism rounded-lg p-12 max-w-md text-center cyberpunk-border"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-7xl font-bold text-gradient-cyber mb-6"
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="h-1 w-16 bg-cyber-neon mx-auto mb-6 rounded-full"
        ></motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-xl text-white mb-8"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          href="/"
          className="inline-flex items-center gap-2 cyberpunk-border group relative overflow-hidden px-6 py-3 rounded-lg bg-cyber-dark text-white hover:text-cyber-neon transition-colors duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            Return Home
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 transition-all duration-300 group-hover:h-full"></span>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFound;
