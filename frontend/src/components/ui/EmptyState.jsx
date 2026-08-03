import React from 'react';
import Button from './Button';

const EmptyState = ({ icon, title, description, actionLabel, onAction }) => {
  // icon can be either a React component (e.g. Receipt) or a JSX element (e.g. <Receipt className="..." />)
  const renderIcon = () => {
    if (!icon) return null;
    // If it's already a valid element (JSX), render it directly
    if (React.isValidElement(icon)) return icon;
    // Otherwise treat it as a component reference
    const Icon = icon;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center w-full">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
        {renderIcon()}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2 font-heading">{title}</h3>
      <p className="text-slate-500 text-sm max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export { EmptyState };
export default EmptyState;
