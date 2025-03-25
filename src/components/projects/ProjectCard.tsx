
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ZoomIn, BarChart2 } from 'lucide-react';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onViewAnalytics: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onViewAnalytics }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-lg cyberpunk-border cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Project Image with Overlay */}
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.image_url} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/60 to-transparent opacity-80"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyber-neon transition-colors mb-3">
            {project.title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies?.map((tech) => (
              <span 
                key={tech} 
                className="text-xs font-mono px-3 py-1 rounded-full bg-cyber-purple text-white"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <p className="text-white/70 mt-2 text-sm line-clamp-2 md:line-clamp-3">
            {project.description}
          </p>
          
          {/* Project Links */}
          <div className="flex gap-3 mt-4 opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-cyber-neon transition-colors"
                aria-label="View source code on GitHub"
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
              >
                <Github size={18} />
              </a>
            )}
            
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-cyber-neon transition-colors"
                aria-label="View live project"
                onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
              >
                <ExternalLink size={18} />
              </a>
            )}
            
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-cyber-neon transition-colors"
              aria-label="View project details"
            >
              <ZoomIn size={18} />
            </button>
            
            <button
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-cyber-neon transition-colors"
              aria-label="View project analytics"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onViewAnalytics();
              }}
            >
              <BarChart2 size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated Border Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? 'inset 0 0 0 2px #00F5FF, 0 0 20px 0 rgba(0, 245, 255, 0.3)' 
            : 'inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 0 0 rgba(0, 245, 255, 0)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
