
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../projects/types';

interface SkillBarProps {
  skill: Skill;
  index: number;
  isInView: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index, isInView }) => {
  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
  );
};

export default SkillBar;
