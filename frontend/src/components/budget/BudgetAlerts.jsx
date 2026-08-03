import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { useBudget } from '../../context/BudgetContext';
import { useSettings } from '../../context/SettingsContext';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const BudgetAlerts = () => {
  const { categoryBudgets, getSpentByCategory, monthlyBudget, getTotalSpent } = useBudget();
  const { currency } = useSettings();

  const alerts = [];

  const totalSpent = getTotalSpent();
  const totalPercent = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  if (totalPercent >= 85) {
    alerts.push({
      type: 'danger',
      title: 'Overall Budget Critical',
      message: `You have used ${totalPercent.toFixed(1)}% of your monthly budget.`,
      percent: totalPercent,
      spent: totalSpent,
      budget: monthlyBudget
    });
  } else if (totalPercent >= 75) {
    alerts.push({
      type: 'warning',
      title: 'Overall Budget Warning',
      message: `You have used ${totalPercent.toFixed(1)}% of your monthly budget.`,
      percent: totalPercent,
      spent: totalSpent,
      budget: monthlyBudget
    });
  }

  Object.entries(categoryBudgets).forEach(([category, budget]) => {
    if (budget > 0) {
      const spent = getSpentByCategory(category);
      const percent = (spent / budget) * 100;
      if (percent >= 85) {
        alerts.push({
          type: 'danger',
          title: `${category} Budget Critical`,
          message: `You have used ${percent.toFixed(1)}% of your ${category} budget.`,
          percent,
          spent,
          budget
        });
      } else if (percent >= 60) {
        alerts.push({
          type: 'warning',
          title: `${category} Budget Warning`,
          message: `You have used ${percent.toFixed(1)}% of your ${category} budget.`,
          percent,
          spent,
          budget
        });
      }
    }
  });

  if (alerts.length === 0) {
    return (
      <Card className="mb-6 bg-teal-50 border-teal-100">
        <div className="flex items-center gap-3 text-teal-800">
          <CheckCircle2 className="text-teal-600" />
          <p className="font-medium">All your budgets are currently looking good!</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      {alerts.map((alert, index) => (
        <Card 
          key={index} 
          className={`border-l-4 ${alert.type === 'danger' ? 'bg-red-50 border-red-500 border-t-red-100 border-r-red-100 border-b-red-100' : 'bg-amber-50 border-amber-500 border-t-amber-100 border-r-amber-100 border-b-amber-100'}`}
          padding="sm"
        >
          <div className="flex items-start gap-3">
            {alert.type === 'danger' ? (
              <AlertCircle className="text-red-500 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" />
            )}
            <div className="flex-1">
              <h4 className={`font-semibold ${alert.type === 'danger' ? 'text-red-900' : 'text-amber-900'}`}>
                {alert.title}
              </h4>
              <p className={`text-sm mb-2 ${alert.type === 'danger' ? 'text-red-700' : 'text-amber-700'}`}>
                {alert.message}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 max-w-[200px]">
                  <ProgressBar 
                    value={alert.spent} 
                    max={alert.budget} 
                    color={alert.type === 'danger' ? 'bg-red-500' : 'bg-amber-500'} 
                    size="sm" 
                  />
                </div>
                <span className={`text-xs font-medium ${alert.type === 'danger' ? 'text-red-800' : 'text-amber-800'}`}>
                  {currency}{alert.spent} / {currency}{alert.budget}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
