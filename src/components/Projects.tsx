
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import ProjectCard from './projects/ProjectCard';
import ProjectFilters from './projects/ProjectFilters';
import ProjectModal from './projects/ProjectModal';
import ProjectAnalytics from './projects/ProjectAnalytics';
import { Project, Technology } from './projects/types';

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [analyticsProject, setAnalyticsProject] = useState<Project | null>(null);
  
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

export default Projects;
