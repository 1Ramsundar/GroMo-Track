import React from 'react';

const Input = React.forwardRef(({ label, error, icon, className = '', ...rest }, ref) => {
  const id = rest.id || rest.name || Math.random().toString(36).substring(7);
  
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-white border ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-teal-600 focus:ring-teal-600/20'} rounded-xl px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-4 ${icon ? 'pl-10' : ''} ${className}`}
          {...rest}
        />
      </div>
      {error && <span className="text-sm text-red-500 mt-0.5">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export { Input };
export default Input;
