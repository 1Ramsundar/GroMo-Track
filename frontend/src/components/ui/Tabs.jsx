import React from 'react';

const Tabs = ({ tabs = [], activeTab, onChange }) => {
  return (
    <div className="w-full border-b border-slate-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${isActive 
                  ? 'border-teal-600 text-teal-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export { Tabs };
export default Tabs;
