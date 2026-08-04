import React from 'react';
import Button from './Button';

const SectionTitle = ({title,subtitle,action,actionLabel,onAction,}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 font-heading">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {action && actionLabel && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export { SectionTitle };
export default SectionTitle;
