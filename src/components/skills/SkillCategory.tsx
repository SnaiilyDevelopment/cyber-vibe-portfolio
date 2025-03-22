
import React from 'react';
import { motion } from 'framer-motion';
import SkillBar from './SkillBar';
import { Skill } from '../projects/types';

interface SkillCategoryProps {
  categoryId: string;
  categoryLabel: string;
  categoryColor: string;
  skills: Skill[];
  isInView: boolean;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  categoryId, 
  categoryLabel, 
  categoryColor, 
  skills, 
  isInView 
}) => {
  return (
    <div className="mb-8">
      <h3 className={`text-xl font-bold mb-4 text-${categoryColor}`}>
        {categoryLabel}
      </h3>
      
      <div className="space-y-5">
        {skills
          .filter(skill => skill.category === categoryId)
          .map((skill, index) => (
            <SkillBar 
              key={skill.name} 
              skill={skill} 
              index={index} 
              isInView={isInView} 
            />
          ))}
      </div>
    </div>
  );
};

export default SkillCategory;
