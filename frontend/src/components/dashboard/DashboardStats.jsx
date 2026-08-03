import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import { useBudget } from '../../context/BudgetContext';
import StatCard from '../ui/StatCard';
import { CreditCard, TrendingUp, Wallet, Receipt } from 'lucide-react';
import { format, isToday, isYesterday, isSameMonth, subMonths } from 'date-fns';

export default function DashboardStats() {
  const { expenses } = useExpenses();
  const { getTotalSpent, monthlyBudget } = useBudget();
  
  // Calculate today's spending
  const todayExpenses = expenses.filter(e => isToday(new Date(e.date)));
  const todaySpent = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Calculate yesterday's spending for trend
  const yesterdayExpenses = expenses.filter(e => isYesterday(new Date(e.date)));
  const yesterdaySpent = yesterdayExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  const todayTrend = yesterdaySpent === 0 
    ? (todaySpent > 0 ? 100 : 0) 
    : ((todaySpent - yesterdaySpent) / yesterdaySpent) * 100;

  // Calculate monthly spending
  const currentMonthExpenses = expenses.filter(e => isSameMonth(new Date(e.date), new Date()));
  const monthlySpent = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  const lastMonth = subMonths(new Date(), 1);
  const lastMonthExpenses = expenses.filter(e => isSameMonth(new Date(e.date), lastMonth));
  const lastMonthSpent = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
  
  const monthlyTrend = lastMonthSpent === 0 
    ? (monthlySpent > 0 ? 100 : 0) 
    : ((monthlySpent - lastMonthSpent) / lastMonthSpent) * 100;

  // Budget remaining
  const totalSpent = getTotalSpent();
  const budgetRemaining = Math.max(0, monthlyBudget - totalSpent);
  const budgetPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;
  
  // Total Expenses
  const expensesCount = currentMonthExpenses.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<TrendingUp className="text-rose-600 w-5 h-5" />}
        title="Today's Spending"
        value={`₹${todaySpent.toLocaleString()}`}
        trend={todayTrend}
        trendLabel="vs yesterday"
        color="rose"
      />
      <StatCard
        icon={<CreditCard className="text-blue-600 w-5 h-5" />}
        title="Monthly Spending"
        value={`₹${monthlySpent.toLocaleString()}`}
        trend={monthlyTrend}
        trendLabel="vs last month"
        color="blue"
      />
      <StatCard
        icon={<Wallet className="text-emerald-600 w-5 h-5" />}
        title="Budget Remaining"
        value={`₹${budgetRemaining.toLocaleString()}`}
        trend={-budgetPercentage} // negative denotes usage
        trendLabel={`${budgetPercentage.toFixed(1)}% used`}
        color="emerald"
      />
      <StatCard
        icon={<Receipt className="text-amber-600 w-5 h-5" />}
        title="Total Expenses"
        value={expensesCount.toString()}
        trend={0}
        trendLabel="this month"
        color="amber"
      />
    </div>
  );
}