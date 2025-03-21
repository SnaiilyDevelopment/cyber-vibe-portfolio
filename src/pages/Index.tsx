
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeScene from '../components/ThreeScene';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Create cursor dot effect
  useEffect(() => {
    if (isLoading) return;

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    // Create cursor trail elements
    const trailCount = 10;
    const trails: HTMLDivElement[] = [];

    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.classList.add('cursor-trail');
      document.body.appendChild(trail);
      trails.push(trail);
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Update main cursor dot
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      // Update trails with staggered delay
      trails.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.opacity = '0.7';
          trail.style.left = `${e.clientX}px`;
          trail.style.top = `${e.clientY}px`;

          // Fade out trail
          setTimeout(() => {
            trail.style.opacity = '0';
          }, 50);
        }, index * 50);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(cursorDot);
      trails.forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-mask"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="loading-text">
              <span>Loading</span>
              <span className="blink">_</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* 3D Background Scene */}
        <ThreeScene />

        {/* Main Content */}
        <div className="relative">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </motion.div>
    </>
  );
};

export default Index;
