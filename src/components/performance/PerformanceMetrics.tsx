
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { Zap, BarChart as BarChartIcon, AlertCircle, Monitor } from 'lucide-react';

interface PerformanceData {
  name: string;
  value: number;
  fill: string;
}

interface ProjectMetrics {
  name: string;
  loadTime: number;
  fcp: number;
  lcp: number;
  accessibility: number;
  seo: number;
  bestPractices: number;
}

const performanceData: PerformanceData[] = [
  { name: 'Performance', value: 98, fill: '#00F5FF' },
  { name: 'Accessibility', value: 94, fill: '#7B5EA7' },
  { name: 'Best Practices', value: 92, fill: '#4361EE' },
  { name: 'SEO', value: 97, fill: '#FFD166' },
];

const projectsData: ProjectMetrics[] = [
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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cyber-dark/90 p-3 border border-cyber-neon/30 rounded-md">
        <p className="text-cyber-neon">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const PerformanceMetrics = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section 
      id="performance" 
      ref={sectionRef}
      className="section-padding relative bg-cyber-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyber-blue/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
            Metrics Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Performance Analytics</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Transparency in web performance and accessibility metrics across my projects.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism rounded-lg overflow-hidden cyberpunk-border p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-cyber-neon" size={20} />
              Core Web Vitals
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="80%" 
                  data={performanceData} 
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-morphism rounded-lg overflow-hidden cyberpunk-border p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChartIcon className="text-cyber-neon" size={20} />
              Load Time Comparison
            </h3>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectsData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft', fill: '#fff' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="loadTime" name="Load Time" fill="#00F5FF" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fcp" name="First Contentful Paint" fill="#4361EE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lcp" name="Largest Contentful Paint" fill="#FF3864" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Responsive Design',
              icon: <Monitor size={20} />,
              description: 'All projects are tested across multiple devices and screen sizes to ensure perfect responsiveness.'
            },
            {
              title: 'Accessibility Focus',
              icon: <AlertCircle size={20} />,
              description: 'WCAG compliance and keyboard navigation are prioritized for all interactive elements.'
            },
            {
              title: 'Performance Optimization',
              icon: <Zap size={20} />,
              description: 'Code splitting, lazy loading, and asset optimization to achieve best-in-class loading times.'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-morphism p-6 rounded-lg cyberpunk-border"
            >
              <div className="text-cyber-neon mb-3">{item.icon}</div>
              <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
              <p className="text-white/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
