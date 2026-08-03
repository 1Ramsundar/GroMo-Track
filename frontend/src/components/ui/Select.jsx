import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ label, options = [], error, className = '', ...rest }, ref) => {
  const id = rest.id || rest.name || Math.random().toString(36).substring(7);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={`appearance-none w-full bg-white border ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-teal-600 focus:ring-teal-600/20'} rounded-xl px-4 py-2 pr-10 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-4 ${className}`}
          {...rest}
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <span className="text-sm text-red-500 mt-0.5">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
export { Select };
export default Select;
