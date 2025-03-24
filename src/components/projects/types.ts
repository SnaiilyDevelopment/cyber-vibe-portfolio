
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
  performance_metrics?: PerformanceMetrics;
  seo_keywords?: string[];
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
  category?: 'frontend' | 'backend' | 'fullstack' | 'mobile' | '3d' | 'design';
  duration?: string;
  client?: string;
  testimonial?: string;
  impact?: string;
  code_snippets?: CodeSnippet[];
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  description?: string;
}

export interface PerformanceMetrics {
  load_time?: number;
  first_contentful_paint?: number;
  largest_contentful_paint?: number;
  accessibility_score?: number;
  seo_score?: number;
  best_practices_score?: number;
  time_to_interactive?: number;
  performance_score?: number;
  mobile_friendly?: boolean;
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
