
import React, { memo } from 'react';
import { CustomTooltipProps } from './types';

// Using memo to prevent unnecessary re-renders
const CustomTooltip: React.FC<CustomTooltipProps> = memo(({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    
    return (
      <div className="bg-cyber-dark/90 p-3 border border-cyber-neon/30 rounded-md shadow-lg text-sm">
        <p className="text-cyber-neon font-mono">{`${payload[0].name}: ${value}`}</p>
        
        {/* Additional info for performance metrics if available */}
        {payload[0].name.toLowerCase().includes('time') && Number(value) > 3 && (
          <p className="text-white/70 text-xs mt-1">
            Consider optimizing for better performance
          </p>
        )}
      </div>
    );
  }

  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

export default CustomTooltip;
