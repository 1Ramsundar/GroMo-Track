import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { useBudget } from '../../context/BudgetContext';
import { useSettings } from '../../context/SettingsContext';
import { Pencil } from 'lucide-react';

export const BudgetOverview = ({ onEdit }) => {
  const { monthlyBudget, getTotalSpent } = useBudget();
  const { currency } = useSettings();
  
  const totalSpent = getTotalSpent();
  const remaining = monthlyBudget - totalSpent;
  const percent = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
  
  return (
    <Card className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold font-display text-slate-800">Monthly Budget Overview</h2>
          <p className="text-sm text-slate-500">Track your overall spending this month</p>
        </div>
        <Button variant="outline" size="sm" icon={<Pencil size={16} />} onClick={onEdit} className="mt-4 sm:mt-0">
          Edit Budget
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500 font-medium mb-1">Total Budget</p>
          <p className="text-2xl font-semibold text-slate-800">{currency}{monthlyBudget.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500 font-medium mb-1">Total Spent</p>
          <p className="text-2xl font-semibold text-slate-800">{currency}{totalSpent.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-sm text-slate-500 font-medium mb-1">Remaining</p>
          <p className={`text-2xl font-semibold ${remaining < 0 ? 'text-red-600' : 'text-teal-600'}`}>
            {currency}{remaining.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span className="text-slate-600">Usage</span>
          <span className={percent > 100 ? 'text-red-600' : 'text-slate-600'}>{percent.toFixed(1)}%</span>
        </div>
        <ProgressBar value={totalSpent} max={monthlyBudget} size="lg" />
      </div>
    </Card>
  );
};
