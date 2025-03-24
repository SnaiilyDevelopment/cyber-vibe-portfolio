
import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCardProps } from './types';

const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-morphism p-6 rounded-lg cyberpunk-border"
    >
      <div className="text-cyber-neon mb-3">{icon}</div>
      <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
