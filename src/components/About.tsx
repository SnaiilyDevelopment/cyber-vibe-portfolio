
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Lightbulb, Zap, Cpu } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const skills = [
    { 
      icon: <Code size={24} />,
      title: "Clean Code",
      description: "Writing elegant, maintainable code that focuses on simplicity and clarity."
    },
    { 
      icon: <Lightbulb size={24} />,
      title: "Creative Solutions",
      description: "Finding innovative approaches to complex problems with a focus on user experience."
    },
    { 
      icon: <Zap size={24} />,
      title: "Performance",
      description: "Building high-performance applications optimized for speed and efficiency."
    },
    { 
      icon: <Cpu size={24} />,
      title: "Technical Depth",
      description: "Leveraging deep technical knowledge to create robust, scalable systems."
    }
  ];
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-dots"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Art of Digital Craftsmanship</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Merging technical expertise with creative expression to build digital experiences that resonate and inspire.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden cyberpunk-border">
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-cyber-blue/20 to-cyber-neon/20"></div>
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-6xl animate-pulse-slow text-cyber-neon">
                  {/* This would be a 3D model in the full implementation */}
                  <span className="font-mono">&lt;/&gt;</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyber-purple/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyber-blue/10 rounded-full blur-xl"></div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-4">The Digital Synesthete</h3>
              <p className="text-white/70 mb-4">
                I specialize in creating immersive digital experiences where code and creativity converge. With a background in both technical development and design, I bring a unique perspective to every project.
              </p>
              <p className="text-white/70">
                My approach combines technical precision with artistic vision, resulting in applications that are not only functional but captivating. I believe in pushing boundaries and exploring the intersection of technology and art.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="text-xl font-semibold text-white mb-4">Core Values</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="glass-morphism p-4 rounded-lg flex flex-col"
                  >
                    <div className="text-cyber-neon mb-2">{skill.icon}</div>
                    <h5 className="text-lg font-semibold text-white mb-1">{skill.title}</h5>
                    <p className="text-sm text-white/70">{skill.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
