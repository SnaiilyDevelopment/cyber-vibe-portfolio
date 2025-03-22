
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  technologies?: string[];
  live_demo_url?: string;
  github_url?: string;
  featured: boolean;
}

export interface Technology {
  id: string;
  project_id: string;
  technology: string;
}
