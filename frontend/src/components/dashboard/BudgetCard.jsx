import React from 'react';
import { useBudget } from '../../context/BudgetContext';
import { useExpenses } from '../../context/ExpenseContext';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import SectionTitle from '../ui/SectionTitle';
import EmptyState from '../ui/EmptyState';
import { Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BudgetCard() {
  const { monthlyBudget, categoryBudgets, getTotalSpent, getSpentByCategory } = useBudget();
  const navigate = useNavigate();

  const totalSpent = getTotalSpent();
  const budgetPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
  
  const getColor = (pct) => {
    if (pct < 60) return 'green';
    if (pct <= 85) return 'amber';
    return 'red';
  };

  return (
    <Card padding="md" className="h-full">
      <SectionTitle 
        title="Budget" 
        action={monthlyBudget > 0} 
        actionLabel="Manage" 
        onAction={() => navigate('/budget')} 
      />
      
      {monthlyBudget > 0 ? (
        <div className="mt-6 space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Total Budget</span>
              <span className="text-slate-500">₹{totalSpent.toLocaleString()} / ₹{monthlyBudget.toLocaleString()}</span>
            </div>
            <ProgressBar 
              value={totalSpent} 
              max={monthlyBudget} 
              color={getColor(budgetPercentage)} 
              showLabel={true} 
              size="md" 
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900">By Category</h4>
            {Object.entries(categoryBudgets).length > 0 ? (
              Object.entries(categoryBudgets).map(([category, budget]) => {
                if (budget <= 0) return null;
                const spent = getSpentByCategory(category);
                const pct = (spent / budget) * 100;
                return (
                  <div key={category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600">{category}</span>
                      <span className="text-slate-500">₹{spent} / ₹{budget}</span>
                    </div>
                    <ProgressBar 
                      value={spent} 
                      max={budget} 
                      color={getColor(pct)} 
                      showLabel={false} 
                      size="sm" 
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-500">No category budgets set.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <EmptyState 
            icon={<Wallet className="w-10 h-10 text-slate-300" />}
            title="No Budget Set"
            description="Set up a budget to keep your spending in check."
            actionLabel="Set Budget"
            onAction={() => navigate('/budget')}
          />
        </div>
      )}
    </Card>
  );
}
