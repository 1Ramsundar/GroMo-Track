import React from 'react';

const Toggle = ({ checked, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        {label && <span className="text-sm font-medium text-slate-900">{label}</span>}
        {description && <span className="text-sm text-slate-500">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${checked ? 'bg-teal-600' : 'bg-slate-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2`}
      >
        <span
          aria-hidden="true"
          className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
};

export { Toggle };
export default Toggle;
