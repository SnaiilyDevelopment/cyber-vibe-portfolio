
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, ExternalLink, Github, ZoomIn } from 'lucide-react';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Audio Visualizer",
      description: "Real-time audio visualization using WebGL and the Web Audio API, creating dynamic visuals that react to music.",
      image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=500&auto=format&fit=crop",
      tags: ["WebGL", "JavaScript", "Web Audio API"],
      link: "https://example.com/project1",
      github: "https://github.com/example/project1",
      featured: true,
    },
    {
      id: 2,
      title: "Neural Network Visualization",
      description: "Interactive 3D visualization of neural networks that helps explain machine learning concepts in an intuitive way.",
      image: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=500&auto=format&fit=crop",
      tags: ["Three.js", "React", "ML"],
      link: "https://example.com/project2",
      github: "https://github.com/example/project2",
      featured: true,
    },
    {
      id: 3,
      title: "Interactive Data Dashboard",
      description: "Real-time data visualization dashboard with customizable charts and filters for business intelligence.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
      tags: ["React", "D3.js", "Node.js"],
      link: "https://example.com/project3",
      github: "https://github.com/example/project3",
      featured: false,
    },
    {
      id: 4,
      title: "Algorithmic Art Generator",
      description: "Procedurally generated art using custom algorithms and randomization to create unique visual patterns.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop",
      tags: ["Canvas API", "JavaScript", "Algorithms"],
      link: "https://example.com/project4",
      featured: false,
    },
  ];
  
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "featured", label: "Featured" },
    { id: "WebGL", label: "WebGL" },
    { id: "React", label: "React" },
  ];
  
  const filteredProjects = projects.filter(project => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return project.featured;
    return project.tags.includes(activeFilter);
  });
  
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
        
        {/* Projects Grid */}
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
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: ProjectType }) => {
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
      className="group relative overflow-hidden rounded-lg cyberpunk-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image with Overlay */}
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-cyber-dark/60 to-transparent opacity-80"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs font-mono px-2 py-1 rounded-full bg-cyber-purple/30 text-white/90"
              >
                {tag}
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
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-cyber-neon transition-colors"
                aria-label="View source code on GitHub"
              >
                <Github size={18} />
              </a>
            )}
            
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-cyber-neon transition-colors"
                aria-label="View live project"
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

export default Projects;
