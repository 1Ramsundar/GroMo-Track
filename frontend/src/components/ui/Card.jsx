import React from 'react';

const Card = ({ padding = 'md', hover = false, className = '', children, ...rest }) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: 'p-0'
  };

  const classes = `bg-white rounded-2xl border border-slate-200 shadow-sm ${hover ? 'transition-shadow hover:shadow-md' : ''} ${paddings[padding]} ${className}`;

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export { Card };
export default Card;
