
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

// Lazy-loaded components for performance
const ThreeScene = lazy(() => import('../components/ThreeScene'));
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
const VisitorCounter = lazy(() => import('../components/VisitorCounter'));
const SeedDataButton = lazy(() => import('../components/SeedDataButton'));
const ResumeTimeline = lazy(() => import('../components/resume/ResumeTimeline'));
const PerformanceMetrics = lazy(() => import('../components/performance/PerformanceMetrics'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="w-10 h-10 border-4 border-cyber-neon/20 border-t-cyber-neon rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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
    
    // Set up passive event listeners for better scrolling performance
    document.addEventListener('scroll', () => {}, { passive: true });
    document.addEventListener('touchstart', () => {}, { passive: true });
    
    // Track page load performance
    window.addEventListener('load', () => {
      if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
      }
    });
    
    // Update interaction state
    const handleInteraction = () => setHasInteracted(true);
    document.addEventListener('click', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  // Simulate loading assets with reduced time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Track first contentful paint
      if ('performance' in window) {
        const perfEntries = performance.getEntriesByType('paint');
        const fcpEntry = perfEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          console.log('First Contentful Paint:', fcpEntry.startTime, 'ms');
        }
      }
    }, 1200); // Reduced from 2000ms to 1200ms

    return () => clearTimeout(timer);
  }, []);

  // Create cursor dot effect - only after user interacts with the page
  useEffect(() => {
    if (isLoading || !hasInteracted) return;

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    // Create cursor trail elements - reduced from 10 to 5 for performance
    const trailCount = 5;
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
      requestAnimationFrame(() => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      });

      // Update trails with staggered delay - using requestAnimationFrame
      trails.forEach((trail, index) => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            trail.style.opacity = '0.7';
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;

            // Fade out trail
            setTimeout(() => {
              trail.style.opacity = '0';
            }, 50);
          });
        }, index * 40); // Reduced from 50ms to 40ms
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(cursorDot);
      trails.forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
    };
  }, [isLoading, hasInteracted]);

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
        {/* 3D Background Scene - Lazy loaded */}
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>

        {/* Main Content */}
        <div className="relative">
          <Navbar />
          <Hero />
          
          {/* Lazily loaded sections */}
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <ResumeTimeline />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <PerformanceMetrics />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <Footer />
          </Suspense>
          
          {/* Visitor Counter - Fixed Position */}
          <div className="fixed bottom-4 right-4 z-40">
            <Suspense fallback={null}>
              <VisitorCounter />
            </Suspense>
          </div>
          
          {/* Seed Data Button */}
          <Suspense fallback={null}>
            <SeedDataButton />
          </Suspense>
        </div>
      </motion.div>
    </>
  );
};

export default Index;
