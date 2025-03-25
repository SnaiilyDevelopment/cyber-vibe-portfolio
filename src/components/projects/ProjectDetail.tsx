
import React from 'react';
import { motion } from 'framer-motion';
import { FileCode2, ExternalLink } from 'lucide-react';
import { Project } from './types';
import { InteractiveButton } from '../ui/micro-interactions';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-4xl mx-auto bg-cyber-dark/30 backdrop-blur-lg rounded-lg overflow-hidden"
    >
      {/* Project Image Header */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <img 
          src={project.image_url} 
          alt={`${project.title} preview`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent opacity-90"></div>
        
        {/* Project Title */}
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {project.title}
          </h1>
          
          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies?.map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-sm font-medium rounded-full bg-cyber-purple text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 md:p-8">
        {/* Project Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white flex items-center mb-4">
            <span className="inline-block mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 5L21 9V19L12 23L3 19V9Z" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 9L12 13L21 9" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13V23" stroke="#00FF87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            About this project
          </h2>
          <p className="text-white/80 leading-relaxed">
            {project.description}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {project.github_url && (
            <InteractiveButton 
              className="bg-cyber-dark/70 px-6 py-3 rounded-lg text-white hover:text-cyber-neon transition-colors duration-300"
              onClick={() => window.open(project.github_url, '_blank')}
            >
              <span className="flex items-center gap-2">
                <FileCode2 size={18} />
                View Code
              </span>
            </InteractiveButton>
          )}
          
          {project.live_demo_url && (
            <InteractiveButton 
              className="bg-cyber-dark/70 px-6 py-3 rounded-lg text-white hover:text-cyber-neon transition-colors duration-300"
              onClick={() => window.open(project.live_demo_url, '_blank')}
            >
              <span className="flex items-center gap-2">
                <ExternalLink size={18} />
                Live Demo
              </span>
            </InteractiveButton>
          )}
        </div>
        
        {/* Technologies Used */}
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center mb-4">
            <span className="inline-block mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H8" stroke="#00B0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H16" stroke="#00B0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8L16 12L12 16" stroke="#00B0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="#00B0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Technologies Used
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.technologies?.map((tech) => (
              <div key={tech} className="bg-cyber-dark/50 rounded-lg p-4 border border-cyber-blue/20">
                <span className="text-white font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
