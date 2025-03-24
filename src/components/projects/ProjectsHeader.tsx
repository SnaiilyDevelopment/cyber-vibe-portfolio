
import React from 'react';
import { motion } from 'framer-motion';

interface ProjectsHeaderProps {
  isInView: boolean;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({ isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
        Projects
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Work</h2>
      <p className="text-lg text-white/70 max-w-2xl mx-auto">
        Exploring the intersection of code and creativity through interactive experiences.
      </p>
    </motion.div>
  );
};

export default ProjectsHeader;
