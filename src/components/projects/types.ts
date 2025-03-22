
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies?: string[];
  live_demo_url?: string;
  github_url?: string;
  featured: boolean;
  role?: string;
  challenges?: string;
  solution?: string;
}

export interface Technology {
  id: string;
  project_id: string;
  technology: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
}
