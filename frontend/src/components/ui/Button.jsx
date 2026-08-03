import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ variant = 'primary', size = 'md', loading, icon, fullWidth, disabled, children, className = '', type = 'button', ...rest }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-700 shadow-sm hover:shadow-md',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500 border border-slate-200',
    outline: 'border-2 border-teal-700 text-teal-700 hover:bg-teal-50 focus:ring-teal-700',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-sm',
  };

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : icon ? (
        <span className="mr-2">
          {React.isValidElement(icon)
            ? icon
            : React.createElement(icon, { className: "w-4 h-4" })}
        </span>
      ) : null}
      {children}
    </button>
  );
};

export { Button };
export default Button;
