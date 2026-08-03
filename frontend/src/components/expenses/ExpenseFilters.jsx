import React from 'react';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

const CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Food', value: 'Food' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Bills', value: 'Bills' },
  { label: 'Medical', value: 'Medical' },
  { label: 'Education', value: 'Education' },
  { label: 'Others', value: 'Others' }
];

const PAYMENT_METHODS = [
  { label: 'All Methods', value: 'all' },
  { label: 'Cash', value: 'Cash' },
  { label: 'UPI', value: 'UPI' },
  { label: 'Credit Card', value: 'Credit Card' },
  { label: 'Debit Card', value: 'Debit Card' },
  { label: 'Net Banking', value: 'Net Banking' }
];

const ExpenseFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const activeCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.paymentMethod !== 'all' ? 1 : 0) +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-slate-800 font-display">Filters</h3>
          {activeCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-teal-700 bg-teal-50 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear all
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          options={CATEGORIES}
        />
        <Select
          label="Payment Method"
          value={filters.paymentMethod}
          onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
          options={PAYMENT_METHODS}
        />
        <Input
          label="From Date"
          type="date"
          value={filters.dateFrom}
          onChange={(e) => onFilterChange('dateFrom', e.target.value)}
        />
        <Input
          label="To Date"
          type="date"
          value={filters.dateTo}
          onChange={(e) => onFilterChange('dateTo', e.target.value)}
        />
      </div>
    </div>
  );
};

export default ExpenseFilters;
