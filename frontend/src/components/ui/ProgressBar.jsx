import React from 'react';

const ProgressBar = ({ value, max = 100, color = 'teal', showLabel = false, size = 'md' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  let barColor = color;
  if (color === 'auto') {
    if (percentage < 60) barColor = 'green';
    else if (percentage < 85) barColor = 'amber';
    else barColor = 'red';
  }

  const colors = {
    teal: 'bg-teal-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-medium text-slate-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`${sizes[size]} ${colors[barColor] || colors.teal} transition-all duration-500 ease-out rounded-full`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
export default ProgressBar;
