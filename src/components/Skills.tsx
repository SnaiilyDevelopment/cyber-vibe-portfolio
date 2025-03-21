
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  color: string;
  category: 'frontend' | 'backend' | 'design' | 'tools';
}

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Expertise</h2>
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
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              {categories.map((category) => (
                <div key={category.id} className="mb-8">
                  <h3 className={`text-xl font-bold mb-4 text-${category.color}`}>
                    {category.label}
                  </h3>
                  
                  <div className="space-y-5">
                    {skills
                      .filter(skill => skill.category === category.id)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          variants={itemVariants}
                          className="relative"
                        >
                          <div className="flex justify-between mb-1">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-white/70 text-sm">{skill.level}%</span>
                          </div>
                          
                          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden cyberpunk-border">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                              className={`h-full bg-${skill.color} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Tech Galaxy Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 md:order-2 relative aspect-square glass-morphism rounded-lg cyberpunk-border flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 via-cyber-blue/10 to-cyber-neon/10 rounded-lg"></div>
            
            {/* This would be a 3D visualization in the full implementation */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-cyber-blue/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute w-48 h-48 border border-cyber-purple/30 rounded-full animate-spin-slow"></div>
              <div className="absolute w-64 h-64 border border-cyber-neon/20 rounded-full" style={{ animationDuration: '15s' }}></div>
              <div className="text-cyber-neon font-bold text-xl font-mono">Tech Galaxy</div>
              
              {/* Add decorative orbiting elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-cyber-neon rounded-full"
                  animate={{
                    x: Math.cos(i * (Math.PI / 3)) * 120,
                    y: Math.sin(i * (Math.PI / 3)) * 120,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
