
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SkillCategory from './skills/SkillCategory';
import TechGalaxy from './skills/TechGalaxy';
import { Skill } from './projects/types';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const skills: Skill[] = [
    // Frontend
    { name: 'React', level: 90, color: 'cyber-blue', category: 'frontend' },
    { name: 'TypeScript', level: 85, color: 'cyber-blue', category: 'frontend' },
    { name: 'CSS/SCSS', level: 88, color: 'cyber-blue', category: 'frontend' },
    { name: 'Three.js', level: 75, color: 'cyber-blue', category: 'frontend' },
    { name: 'WebGL', level: 70, color: 'cyber-blue', category: 'frontend' },
    
    // Backend
    { name: 'Node.js', level: 82, color: 'cyber-purple', category: 'backend' },
    { name: 'Express', level: 80, color: 'cyber-purple', category: 'backend' },
    { name: 'GraphQL', level: 75, color: 'cyber-purple', category: 'backend' },
    { name: 'MongoDB', level: 78, color: 'cyber-purple', category: 'backend' },
    
    // Design
    { name: 'UI/UX', level: 85, color: 'cyber-pink', category: 'design' },
    { name: 'Figma', level: 80, color: 'cyber-pink', category: 'design' },
    { name: 'Motion Design', level: 75, color: 'cyber-pink', category: 'design' },
    
    // Tools
    { name: 'Git', level: 88, color: 'cyber-neon', category: 'tools' },
    { name: 'Docker', level: 72, color: 'cyber-neon', category: 'tools' },
    { name: 'GSAP', level: 85, color: 'cyber-neon', category: 'tools' },
    { name: 'Framer Motion', level: 80, color: 'cyber-neon', category: 'tools' },
  ];
  
  const categories = [
    { id: 'frontend', label: 'Frontend', color: 'cyber-blue' },
    { id: 'backend', label: 'Backend', color: 'cyber-purple' },
    { id: 'design', label: 'Design', color: 'cyber-pink' },
    { id: 'tools', label: 'Tools', color: 'cyber-neon' },
  ];
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding relative bg-cyber-dark overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyber-purple/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
            Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            My toolkit for creating immersive digital experiences, constantly evolving and expanding.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Skill Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {categories.map((category) => (
                <SkillCategory
                  key={category.id}
                  categoryId={category.id}
                  categoryLabel={category.label}
                  categoryColor={category.color}
                  skills={skills}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Tech Galaxy Visualization */}
          <div className="order-1 md:order-2">
            <TechGalaxy />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
