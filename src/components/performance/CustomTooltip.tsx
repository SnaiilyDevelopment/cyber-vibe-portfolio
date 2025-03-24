
import React from 'react';
import { CustomTooltipProps } from './types';

const CustomTooltip: React.FC<CustomTooltipProps> = React.memo(({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cyber-dark/90 p-3 border border-cyber-neon/30 rounded-md">
        <p className="text-cyber-neon">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

export default CustomTooltip;
