
import React from 'react';
import { motion } from 'framer-motion';
import { MetricsCardProps } from './types';

const MetricsCard: React.FC<MetricsCardProps> = React.memo(({ title, icon, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: title.includes('Load Time') ? 30 : -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="glass-morphism rounded-lg overflow-hidden cyberpunk-border p-6"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="h-80">
        {children}
      </div>
    </motion.div>
  );
});

MetricsCard.displayName = 'MetricsCard';

export default MetricsCard;
