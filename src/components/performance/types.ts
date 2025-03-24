
export interface PerformanceData {
  name: string;
  value: number;
  fill: string;
}

export interface ProjectMetrics {
  name: string;
  loadTime: number;
  fcp: number;
  lcp: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
}

export interface MetricsCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
