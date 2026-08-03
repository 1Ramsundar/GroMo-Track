import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';

const ExpenseSearch = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div className="relative w-full md:w-72">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search expenses..."
        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors bg-white shadow-sm"
      />
    </div>
  );
};

export default ExpenseSearch;
