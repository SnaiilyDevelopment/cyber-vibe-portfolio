
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from "../../integrations/supabase/client";
import { toast } from "sonner";
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import ProjectModal from './ProjectModal';
import ProjectAnalytics from './ProjectAnalytics';
import { Project, Technology } from './types';
import ProjectsHeader from './ProjectsHeader';
import useProjects from '../../hooks/useProjects';

const ProjectsContainer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [analyticsProject, setAnalyticsProject] = useState<Project | null>(null);
  
  const { projects, technologies, loading, filters } = useProjects();
  
  const filteredProjects = projects.filter(project => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return project.featured;
    return project.technologies?.includes(activeFilter);
  });
  
  // Handle project detail view
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  // Handle project analytics view
  const openProjectAnalytics = (project: Project) => {
    setAnalyticsProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };
  
  const closeProjectAnalytics = () => {
    setAnalyticsProject(null);
    document.body.style.overflow = ''; // Restore scrolling
  };
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding relative bg-cyber-dark overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-cyber-blue/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <ProjectsHeader isInView={isInView} />
        
        {/* Project Filters */}
        <ProjectFilters 
          filters={filters} 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          isInView={isInView}
        />
        
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-cyber-neon/20 border-t-cyber-neon rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Projects Grid */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => openProjectDetails(project)} 
                  onViewAnalytics={() => openProjectAnalytics(project)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-white/60">
                No projects found with the selected filter.
              </div>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Project Details Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={closeProjectDetails}
        project={selectedProject}
      />
      
      {/* Project Analytics Modal */}
      <ProjectAnalytics
        isOpen={!!analyticsProject}
        onClose={closeProjectAnalytics}
        project={analyticsProject}
      />
    </section>
  );
};

export default ProjectsContainer;
