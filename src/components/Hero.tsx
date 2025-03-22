
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;
    
    // GSAP animations for text elements
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
    
    // Text typing animation using GSAP
    const title = "SnaillyDevs";
    const subtitle = "Code Developer";
    
    if (titleRef.current) {
      titleRef.current.textContent = "";
      
      const titleLetters = title.split("");
      titleLetters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        
        titleRef.current?.appendChild(span);
        
        gsap.to(span, {
          opacity: 1,
          duration: 0.1,
          delay: 0.1 + index * 0.05,
          ease: "power1.out"
        });
      });
    }
    
    if (subtitleRef.current) {
      subtitleRef.current.textContent = "";
      
      const subtitleLetters = subtitle.split("");
      subtitleLetters.forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        
        subtitleRef.current?.appendChild(span);
        
        gsap.to(span, {
          opacity: 1,
          duration: 0.1,
          delay: 0.6 + index * 0.05,
          ease: "power1.out"
        });
      });
    }
  }, []);
  
  // Scroll to About section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-cyber-neon bg-cyber-dark/50 rounded-full border border-cyber-neon/30 mb-6">
              Welcome to my portfolio
            </span>
          </motion.div>
          
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-cyber mb-6"
          >
            SnaillyDevs
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl font-mono text-white/80 mb-8"
          >
            Code Developer
          </p>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <button 
              onClick={scrollToAbout}
              className="cyberpunk-border group relative overflow-hidden px-6 py-3 rounded-lg bg-cyber-dark/70 text-white hover:text-cyber-neon transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore My Work
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 transition-all duration-300 group-hover:h-full"></span>
            </button>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <ArrowDown size={24} className="text-cyber-neon opacity-70" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
