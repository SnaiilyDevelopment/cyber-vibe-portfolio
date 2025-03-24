import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeScene from '../components/ThreeScene';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import CodeWall from '../components/CodeWall';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import VisitorCounter from '../components/VisitorCounter';
import SeedDataButton from '../components/SeedDataButton';
import ResumeTimeline from '../components/resume/ResumeTimeline';
import PerformanceMetrics from '../components/performance/PerformanceMetrics';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // Check if data needs to be seeded
  useEffect(() => {
    const checkAndSeedData = async () => {
      try {
        // Check if we have any projects
        const { data: projects, error } = await supabase
          .from('projects')
          .select('id')
          .limit(1);
        
        if (error) throw error;
        
        // If no projects found, seed data
        if (!projects || projects.length === 0) {
          setIsSeeding(true);
          
          try {
            // Call seed-data function
            const { data, error: seedError } = await supabase.functions.invoke('seed-data');
            
            if (seedError) throw seedError;
            
            if (data && data.success) {
              toast.success('Demo data seeded successfully!');
              console.log('Data seeded successfully');
            } else {
              throw new Error('Failed to seed data');
            }
          } catch (seedError) {
            console.error('Error seeding data:', seedError);
            toast.error('Failed to seed demo data. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error checking/seeding data:', error);
      } finally {
        setIsSeeding(false);
      }
    };
    
    checkAndSeedData();
  }, []);

  // Simulate loading assets
  useEffect(() => {
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
              <span>{isSeeding ? 'Initializing Data' : 'Loading'}</span>
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
          <ResumeTimeline />
          <PerformanceMetrics />
          <CodeWall />
          <Contact />
          <Footer />
          
          {/* Visitor Counter - Fixed Position */}
          <div className="fixed bottom-4 right-4 z-40">
            <VisitorCounter />
          </div>
          
          {/* Seed Data Button */}
          <SeedDataButton />
        </div>
      </motion.div>
    </>
  );
};

export default Index;
