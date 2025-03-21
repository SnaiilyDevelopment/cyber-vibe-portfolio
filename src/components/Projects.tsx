
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, ExternalLink, Github, ZoomIn, Layers, X } from 'lucide-react';
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";

interface Technology {
  id: string;
  project_id: string;
  technology: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags?: string[];
  technologies?: string[];
  live_demo_url?: string;
  github_url?: string;
  featured: boolean;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Fetch projects and technologies from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');
        
        if (projectsError) throw projectsError;
        
        // Fetch technologies
        const { data: techData, error: techError } = await supabase
          .from('project_technologies')
          .select('*');
        
        if (techError) throw techError;
        
        // Process data
        if (projectsData && techData) {
          // Map technologies to projects
          const projectsWithTech = projectsData.map(project => {
            const projectTech = techData
              .filter(tech => tech.project_id === project.id)
              .map(tech => tech.technology);
            
            return {
              ...project,
              technologies: projectTech
            };
          });
          
          setProjects(projectsWithTech);
          setTechnologies(techData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load projects data');
        
        // Set fallback data if fetch fails
        setProjects([
          {
            id: '1',
            title: "Audio Visualizer",
            description: "Real-time audio visualization using WebGL and the Web Audio API, creating dynamic visuals that react to music.",
            image_url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop",
            technologies: ["WebGL", "JavaScript", "Web Audio API"],
            live_demo_url: "https://example.com/project1",
            github_url: "https://github.com/example/project1",
            featured: true,
          },
          {
            id: '2',
            title: "Neural Network Visualization",
            description: "Interactive 3D visualization of neural networks that helps explain machine learning concepts in an intuitive way.",
            image_url: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=500&auto=format&fit=crop",
            technologies: ["Three.js", "React", "ML"],
            live_demo_url: "https://example.com/project2",
            github_url: "https://github.com/example/project2",
            featured: true,
          },
          {
            id: '3',
            title: "Interactive Data Dashboard",
            description: "Real-time data visualization dashboard with customizable charts and filters for business intelligence.",
            image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
            technologies: ["React", "D3.js", "Node.js"],
            live_demo_url: "https://example.com/project3",
            github_url: "https://github.com/example/project3",
            featured: false,
          },
          {
            id: '4',
            title: "Algorithmic Art Generator",
            description: "Procedurally generated art using custom algorithms and randomization to create unique visual patterns.",
            image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop",
            technologies: ["Canvas API", "JavaScript", "Algorithms"],
            live_demo_url: "https://example.com/project4",
            featured: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate filters from available technologies
  const generateFilters = () => {
    const baseFitlers = [
      { id: "all", label: "All Projects" },
      { id: "featured", label: "Featured" },
    ];
    
    // Extract unique technologies
    const techSet = new Set<string>();
    projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => techSet.add(tech));
      }
    });
    
    // Convert to filter format and limit to most common
    const techFilters = Array.from(techSet)
      .map(tech => ({ id: tech, label: tech }))
      .slice(0, 5); // Limit to top 5 technologies
    
    return [...baseFitlers, ...techFilters];
  };
  
  const filters = generateFilters();
  
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
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding relative bg-cyber-dark overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-cyber-blue/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
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
        
        {/* Project Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-cyber-purple text-white shadow-purple-glow"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>
        
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
      <AnimatedModal
        isOpen={!!selectedProject}
        onClose={closeProjectDetails}
        project={selectedProject}
      />
    </section>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
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
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/60 to-transparent opacity-80"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies?.map((tech) => (
              <span 
                key={tech} 
                className="text-xs font-mono px-2 py-1 rounded-full bg-cyber-purple/30 text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyber-neon transition-colors">
            {project.title}
          </h3>
          
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

const AnimatedModal = ({ 
  isOpen, 
  onClose, 
  project 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  project: Project | null;
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

export default Projects;
