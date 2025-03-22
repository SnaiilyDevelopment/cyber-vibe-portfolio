
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'work' | 'education' | 'award' | 'project';
  title: string;
  organization: string;
  date: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    id: '1',
    type: 'education',
    title: 'Computer Science Degree',
    organization: 'Tech University',
    date: '2016 - 2020',
    description: 'Studied algorithms, data structures, and software engineering principles. Specialized in web technologies and interactive 3D graphics.'
  },
  {
    id: '2',
    type: 'work',
    title: 'Junior Developer',
    organization: 'StartupTech',
    date: '2020 - 2021',
    description: 'Developed responsive web applications using React and TypeScript. Worked on UI/UX improvements and performance optimizations.'
  },
  {
    id: '3',
    type: 'project',
    title: 'Open Source Contribution',
    organization: 'ThreeJS Community',
    date: '2021',
    description: 'Contributed to popular 3D visualization libraries and created reusable components for the community.'
  },
  {
    id: '4',
    type: 'work',
    title: 'Senior Frontend Developer',
    organization: 'TechCorp',
    date: '2021 - Present',
    description: 'Lead developer for interactive web experiences. Created design systems, implemented WebGL visualizations, and optimized web performance.'
  },
  {
    id: '5',
    type: 'award',
    title: 'Developer Innovation Award',
    organization: 'WebTech Conference',
    date: '2022',
    description: 'Recognized for innovative approaches to web development and contributions to the developer community.'
  }
];

const ResumeTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Interactive Resume</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore my professional path through interactive milestones that highlight key achievements and experiences.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyber-neon/30 via-cyber-purple/30 to-cyber-blue/30"></div>
          
          {/* Timeline items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={item.id} 
                item={item} 
                index={index} 
                isInView={isInView}
                isLast={index === timelineData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ 
  item, 
  index, 
  isInView,
  isLast
}: { 
  item: TimelineItem; 
  index: number; 
  isInView: boolean;
  isLast: boolean;
}) => {
  const isEven = index % 2 === 0;
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'work':
        return <Briefcase className="text-cyber-neon" />;
      case 'education':
        return <GraduationCap className="text-cyber-neon" />;
      case 'award':
        return <Award className="text-cyber-neon" />;
      case 'project':
        return <Code className="text-cyber-neon" />;
      default:
        return <Briefcase className="text-cyber-neon" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center mb-12 ${isLast ? 'mb-0' : ''}`}
    >
      {/* Content */}
      <div className={`w-5/12 ${isEven ? 'pr-16 text-right' : 'pl-16 ml-auto'}`}>
        <div className="glass-morphism p-6 rounded-lg cyberpunk-border hover:border-cyber-neon/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <span className="text-sm font-mono text-cyber-neon">{item.date}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
          <h4 className="text-lg text-cyber-purple mb-3">{item.organization}</h4>
          <p className="text-white/70">{item.description}</p>
        </div>
      </div>
      
      {/* Center node */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-cyber-dark border-2 border-cyber-neon flex items-center justify-center z-10">
        {getIcon(item.type)}
      </div>
    </motion.div>
  );
};

export default ResumeTimeline;
