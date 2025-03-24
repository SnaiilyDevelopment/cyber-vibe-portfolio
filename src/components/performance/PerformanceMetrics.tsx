
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { Zap, BarChart as BarChartIcon, AlertCircle, Monitor } from 'lucide-react';
import { performanceData, projectsData } from './data';
import CustomTooltip from './CustomTooltip';
import MetricsCard from './MetricsCard';
import FeatureCard from './FeatureCard';

const PerformanceMetrics: React.FC = React.memo(() => {
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
          <MetricsCard 
            title="Core Web Vitals" 
            icon={<Zap className="text-cyber-neon" size={20} />}
          >
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
          </MetricsCard>
          
          <MetricsCard 
            title="Load Time Comparison" 
            icon={<BarChartIcon className="text-cyber-neon" size={20} />}
          >
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
          </MetricsCard>
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
            <FeatureCard 
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

PerformanceMetrics.displayName = 'PerformanceMetrics';

export default PerformanceMetrics;
