import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useSettings } from '../../context/SettingsContext';
import { AlertCircle } from 'lucide-react';

const CATEGORIES = ['Food', 'Travel', 'Shopping', 'Bills', 'Medical', 'Education', 'Others'];

export const BudgetForm = ({ initialData, onSubmit, onCancel }) => {
  const { currency } = useSettings();
  
  const [monthlyBudget, setMonthlyBudget] = useState(initialData?.monthlyBudget || 0);
  const [categories, setCategories] = useState(
    CATEGORIES.reduce((acc, cat) => {
      acc[cat] = initialData?.categoryBudgets?.[cat] || 0;
      return acc;
    }, {})
  );

  const [sum, setSum] = useState(0);

  useEffect(() => {
    const total = Object.values(categories).reduce((acc, val) => acc + (Number(val) || 0), 0);
    setSum(total);
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      monthlyBudget: Number(monthlyBudget),
      categoryBudgets: Object.fromEntries(Object.entries(categories).map(([k, v]) => [k, Number(v) || 0]))
    });
  };

  const handleCategoryChange = (category, value) => {
    setCategories(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Total Monthly Budget</h3>
        <Input 
          type="number" 
          label={`Amount (${currency})`} 
          value={monthlyBudget} 
          onChange={(e) => setMonthlyBudget(e.target.value)}
          min="0"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-semibold text-slate-800">Category Budgets</h3>
          <span className={`text-sm font-medium ${sum > monthlyBudget ? 'text-red-600' : 'text-slate-500'}`}>
            Sum: {currency}{sum} / {currency}{monthlyBudget}
          </span>
        </div>
        
        {sum > monthlyBudget && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">
            <AlertCircle size={16} />
            <span>Category sum exceeds total monthly budget!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map(category => (
            <Input 
              key={category}
              type="number"
              label={category}
              value={categories[category]}
              onChange={(e) => handleCategoryChange(category, e.target.value)}
              min="0"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Budgets
        </Button>
      </div>
    </form>
  );
};
