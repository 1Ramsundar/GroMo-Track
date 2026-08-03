import React, { useState, useEffect } from 'react';
import { Tabs } from '../ui/Tabs';
import { Input } from '../ui/Input';

export function ReportFilters({ filters, onFilterChange }) {
  const [period, setPeriod] = useState('monthly');
  const [customRange, setCustomRange] = useState({ from: '', to: '' });

  const periods = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' },
    { label: 'Custom', value: 'custom' },
  ];

  useEffect(() => {
    handlePeriodChange(period);
  }, [period]);

  const handlePeriodChange = (val) => {
    setPeriod(val);
    const now = new Date();
    let from = new Date();
    let to = new Date();

    if (val === 'weekly') {
      from.setDate(now.getDate() - 7);
    } else if (val === 'monthly') {
      from.setMonth(now.getMonth() - 1);
    } else if (val === 'quarterly') {
      from.setMonth(now.getMonth() - 3);
    } else if (val === 'yearly') {
      from.setFullYear(now.getFullYear() - 1);
    } else if (val === 'custom') {
      return; // Do nothing, let custom date handle it
    }
    
    if (val !== 'custom') {
      onFilterChange({ from, to });
    }
  };

  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    setCustomRange((prev) => ({ ...prev, [name]: value }));
    if (customRange.from && customRange.to && (name === 'to' || name === 'from')) {
       // Need to use the updated value here
       const newRange = { ...customRange, [name]: value };
       if (newRange.from && newRange.to) {
           onFilterChange({ from: new Date(newRange.from), to: new Date(newRange.to) });
       }
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <Tabs tabs={periods} activeTab={period} onChange={setPeriod} />
      {period === 'custom' && (
        <div className="flex gap-4">
          <Input 
            type="date" 
            label="From Date" 
            name="from" 
            value={customRange.from} 
            onChange={handleCustomDateChange} 
          />
          <Input 
            type="date" 
            label="To Date" 
            name="to" 
            value={customRange.to} 
            onChange={handleCustomDateChange} 
          />
        </div>
      )}
    </div>
  );
}
