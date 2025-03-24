
import { PerformanceData, ProjectMetrics } from './types';

export const performanceData: PerformanceData[] = [
  { name: 'Performance', value: 98, fill: '#00F5FF' },
  { name: 'Accessibility', value: 94, fill: '#7B5EA7' },
  { name: 'Best Practices', value: 92, fill: '#4361EE' },
  { name: 'SEO', value: 97, fill: '#FFD166' },
];

export const projectsData: ProjectMetrics[] = [
  {
    name: 'Portfolio',
    loadTime: 0.8,
    fcp: 0.6,
    lcp: 1.2,
    accessibility: 94,
    seo: 97,
    bestPractices: 92,
  },
  {
    name: 'E-Commerce',
    loadTime: 1.2,
    fcp: 0.9,
    lcp: 1.5,
    accessibility: 92,
    seo: 95,
    bestPractices: 89,
  },
  {
    name: 'SaaS Dashboard',
    loadTime: 1.0,
    fcp: 0.8,
    lcp: 1.4,
    accessibility: 90,
    seo: 93,
    bestPractices: 94,
  },
  {
    name: 'Mobile App',
    loadTime: 0.7,
    fcp: 0.5,
    lcp: 1.0,
    accessibility: 96,
    seo: 91,
    bestPractices: 90,
  },
];
