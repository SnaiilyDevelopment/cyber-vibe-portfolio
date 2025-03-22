
import React from 'react';
import { motion } from 'framer-motion';

interface Filter {
  id: string;
  label: string;
}

interface ProjectFiltersProps {
  filters: Filter[];
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  isInView: boolean;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ 
  filters, 
  activeFilter, 
  setActiveFilter,
  isInView 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.id
              ? "bg-cyber-purple text-white shadow-purple-glow"
              : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </motion.div>
  );
};

export default ProjectFilters;
