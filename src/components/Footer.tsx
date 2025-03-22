
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { InteractiveText } from './ui/micro-interactions';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="relative bg-cyber-dark py-12 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Glowing accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-neon/50 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-gradient-neon mb-4">SnaillyDevs</h3>
            <p className="text-white/50 mb-4">Merging code with creativity to create immersive digital experiences.</p>
            <div className="flex gap-4 mt-2">
              <SocialLink icon={<Github size={18} />} label="GitHub" />
              <SocialLink icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialLink icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink icon={<Mail size={18} />} label="Email" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <FooterLink href="#about" label="About" />
              <FooterLink href="#skills" label="Skills" />
              <FooterLink href="#projects" label="Projects" />
              <FooterLink href="#timeline" label="Career Journey" />
              <FooterLink href="#performance" label="Metrics Dashboard" />
              <FooterLink href="#code" label="Code Samples" />
              <FooterLink href="#contact" label="Contact" />
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <p className="text-white/50 mb-4">Have a project in mind? Let's collaborate and build something amazing together.</p>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-4 py-2 bg-cyber-purple/20 hover:bg-cyber-purple/30 text-white rounded-md transition-colors duration-300 w-max"
            >
              Contact Me
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/50 text-sm">
            &copy; {currentYear} SnaillyDevs. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToTop}
              className="group inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-cyber-neon transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={20} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, label }: { icon: React.ReactNode, label: string }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white hover:text-cyber-neon transition-colors">
          {icon}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="bg-cyber-dark/90 border border-cyber-neon/20 p-2">
        <p className="text-white text-sm">{label}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

const FooterLink = ({ href, label }: { href: string, label: string }) => {
  return (
    <li>
      <a 
        href={href}
        className="text-white/60 hover:text-cyber-neon transition-colors relative group"
      >
        <InteractiveText>{label}</InteractiveText>
      </a>
    </li>
  );
};

export default Footer;
