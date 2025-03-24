
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? 'glass-morphism' : 'bg-transparent'
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <LogoAnimation />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white hover:text-cyber-neon transition-colors relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-neon group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col space-y-1.5">
            <motion.span
              className="block w-6 h-0.5 bg-cyber-neon"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            <motion.span
              className="block w-6 h-0.5 bg-cyber-neon"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
            <motion.span
              className="block w-6 h-0.5 bg-cyber-neon"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            ></motion.span>
          </div>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 glass-morphism md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto py-4 px-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-cyber-neon transition-colors py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Animated logo component
const LogoAnimation = () => {
  const brandName = "SnaillyDevs";
  
  return (
    <motion.div 
      className="text-2xl font-bold relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex">
        {brandName.split('').map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -5, 0],
              color: [
                '#00F5FF', // cyber-neon
                '#FF3864', // cyber-pink
                '#7B5EA7', // cyber-purple
                '#4361EE', // cyber-blue
                '#00F5FF'  // back to cyber-neon
              ]
            }}
            transition={{
              y: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 0.1,
                ease: "easeInOut"
              },
              color: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 0.1,
                ease: "easeInOut"
              }
            }}
            className="relative inline-block"
          >
            {letter}
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-neon"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            ></motion.span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Navbar;
