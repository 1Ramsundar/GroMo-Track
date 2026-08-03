import React, { useMemo } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { useExpenses } from '../../context/ExpenseContext';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import { isSameMonth } from 'date-fns';

export default function FinancialHealth() {
  const { monthlyBudget, getTotalSpent } = useBudget();
  const { expenses } = useExpenses();

  const score = useMemo(() => {
    if (expenses.length === 0 || monthlyBudget === 0) return 0;

    let points = 0;
    
    // Budget adherence (40%)
    const totalSpent = getTotalSpent();
    const budgetUsage = totalSpent / monthlyBudget;
    if (budgetUsage <= 0.8) points += 40;
    else if (budgetUsage <= 1) points += 20;
    
    // Spending consistency (30%)
    const daysWithExpenses = new Set(
      expenses.filter(e => isSameMonth(new Date(e.date), new Date())).map(e => new Date(e.date).getDate())
    ).size;
    
    if (daysWithExpenses >= 5) points += 30;
    else if (daysWithExpenses > 2) points += 15;

    // Category diversity (30%)
    const categories = new Set(
      expenses.filter(e => isSameMonth(new Date(e.date), new Date())).map(e => e.category)
    ).size;
    
    if (categories >= 3) points += 30;
    else if (categories >= 1) points += 15;

    return Math.min(100, points);
  }, [expenses, monthlyBudget, getTotalSpent]);

  const getScoreDetails = (s) => {
    if (s === 0) return { label: 'No Data', color: '#94a3b8' }; // slate-400
    if (s <= 40) return { label: 'Poor', color: '#e11d48' }; // rose-600
    if (s <= 60) return { label: 'Fair', color: '#d97706' }; // amber-600
    if (s <= 80) return { label: 'Good', color: '#0f766e' }; // teal-700
    return { label: 'Excellent', color: '#059669' }; // emerald-600
  };

  const details = getScoreDetails(score);

  // SVG Ring calculation
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card padding="md" className="h-full">
      <SectionTitle title="Financial Health" />
      <div className="mt-6 flex flex-col items-center justify-center space-y-4">
        {score === 0 ? (
          <div className="text-center p-4">
            <p className="text-sm text-slate-500">Start tracking expenses and set a budget to see your score.</p>
          </div>
        ) : (
          <>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={details.color}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{score}</span>
                <span className="text-xs text-slate-500">/ 100</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold" style={{ color: details.color }}>
                {details.label}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Keep your spending below your budget!
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
