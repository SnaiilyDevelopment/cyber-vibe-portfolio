
import { useState, useEffect } from 'react';
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";
import { Project, Technology } from '../components/projects/types';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  
  return { projects, technologies, loading, filters };
};

export default useProjects;
