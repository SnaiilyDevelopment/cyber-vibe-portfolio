
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github, Layers, X } from 'lucide-react';
import { Project } from './types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  project 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside content
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Close modal with escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!project) return null;
  
  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-lg overflow-hidden glass-morphism cyberpunk-border max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.9, y: isOpen ? 0 : 20, opacity: isOpen ? 1 : 0 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300 
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:text-cyber-neon transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        <div className="relative aspect-video">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-90"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech) => (
                <span 
                  key={tech} 
                  className="text-xs font-mono px-2 py-1 rounded-full bg-cyber-purple/50 text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Layers size={20} className="text-cyber-neon" />
              About this project
            </h3>
            <p className="text-white/80 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="flex gap-4 mb-6">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-cyber-neon transition-all"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
            
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-purple/20 hover:bg-cyber-purple/30 text-white hover:text-cyber-neon transition-all"
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <Code size={20} className="text-cyber-neon" />
              Technologies Used
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.technologies?.map((tech) => (
                <div 
                  key={tech} 
                  className="glass-morphism p-3 rounded-lg text-center"
                >
                  <span className="text-white font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
