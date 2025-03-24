
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, Award, Clock } from 'lucide-react';
import { Project } from './types';
import CustomTooltip from '../performance/CustomTooltip';

interface ProjectAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

// Sample data generation based on project name for consistent random values
const generateProjectMetrics = (project: Project | null) => {
  if (!project) return null;
  
  // Use hash of project name to generate consistent random values
  let hash = 0;
  for (let i = 0; i < project.title.length; i++) {
    hash = ((hash << 5) - hash) + project.title.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use hash to generate percentage values between 75-98
  const basePerformance = 75 + Math.abs(hash % 23);
  const baseAccessibility = 75 + Math.abs((hash >> 2) % 23);
  const baseSeo = 75 + Math.abs((hash >> 4) % 23);
  const baseBestPractices = 75 + Math.abs((hash >> 6) % 23);
  
  // Load time values between 0.5 and 2.5 seconds
  const loadTime = 0.5 + Math.abs((hash % 100) / 50);
  const fcp = loadTime * 0.7;
  const lcp = loadTime * 1.4;
  
  return {
    scores: [
      { name: 'Performance', value: basePerformance, fill: '#00F5FF' },
      { name: 'Accessibility', value: baseAccessibility, fill: '#7B5EA7' },
      { name: 'Best Practices', value: baseBestPractices, fill: '#4361EE' },
      { name: 'SEO', value: baseSeo, fill: '#FFD166' },
    ],
    timings: [
      { name: 'Load Time', value: loadTime.toFixed(1) },
      { name: 'First Contentful Paint', value: fcp.toFixed(1) },
      { name: 'Largest Contentful Paint', value: lcp.toFixed(1) },
    ],
    deviceData: [
      { name: 'Mobile', value: 30 + Math.abs(hash % 30) },
      { name: 'Desktop', value: 40 + Math.abs((hash >> 2) % 30) },
      { name: 'Tablet', value: 10 + Math.abs((hash >> 4) % 20) },
    ],
  };
};

// Colors for the pie chart
const COLORS = ['#00F5FF', '#7B5EA7', '#4361EE'];

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ 
  isOpen, 
  onClose, 
  project 
}) => {
  const metrics = generateProjectMetrics(project);
  
  if (!metrics) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-cyber-dark border-cyber-neon/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-cyber-neon" size={24} />
            Performance Analytics: {project?.title}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Detailed performance metrics and user analytics for this project.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Core Web Vitals */}
          <div className="glass-morphism p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Award className="text-cyber-neon" size={18} />
              Core Web Vitals
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="80%" 
                  data={metrics.scores} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    label={{
                      fill: '#fff',
                      position: 'insideStart',
                      formatter: (value: number) => `${value}%`,
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                      color: 'white',
                      fontSize: '12px',
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Load Time Metrics */}
          <div className="glass-morphism p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Clock className="text-cyber-neon" size={18} />
              Loading Performance
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metrics.timings}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" label={{ 
                    value: 'Seconds', 
                    angle: -90, 
                    position: 'insideLeft', 
                    fill: '#fff' 
                  }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    fill="#00F5FF" 
                    radius={[4, 4, 0, 0]} 
                    name="Time (seconds)" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Device Distribution */}
          <div className="glass-morphism p-4 rounded-lg col-span-1 md:col-span-2">
            <h3 className="font-semibold text-lg mb-4">User Device Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {metrics.deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 glass-morphism rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Optimization Recommendations</h3>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-cyber-neon">•</span>
              <span>Implement lazy loading for images to improve initial load time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-neon">•</span>
              <span>Optimize third-party scripts to reduce render blocking resources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-neon">•</span>
              <span>Add preconnect hints for external domains to improve connection times</span>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectAnalytics;
