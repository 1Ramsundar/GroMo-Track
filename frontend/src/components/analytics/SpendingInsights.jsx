import React, { useMemo } from 'react';
import { StatCard } from '../ui/StatCard';
import { useExpenses } from '../../context/ExpenseContext';
import { useSettings } from '../../context/SettingsContext';
import { Trophy, CalendarDays, CalendarMinus, Activity } from 'lucide-react';
import { format } from 'date-fns';

export const SpendingInsights = () => {
  const { expenses } = useExpenses();
  const { currency } = useSettings();

  const insights = useMemo(() => {
    if (!expenses.length) return null;

    // Top Category
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    let topCat = '';
    let topCatVal = 0;
    Object.entries(categoryTotals).forEach(([cat, val]) => {
      if (val > topCatVal) {
        topCatVal = val;
        topCat = cat;
      }
    });

    // Daily totals
    const dailyTotals = expenses.reduce((acc, exp) => {
      const date = format(new Date(exp.date), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + exp.amount;
      return acc;
    }, {});

    let highestDay = '';
    let highestVal = -1;
    let lowestDay = '';
    let lowestVal = Infinity;
    let totalSpent = 0;
    
    const days = Object.keys(dailyTotals);

    days.forEach(day => {
      const val = dailyTotals[day];
      totalSpent += val;
      if (val > highestVal) {
        highestVal = val;
        highestDay = day;
      }
      if (val < lowestVal && val > 0) {
        lowestVal = val;
        lowestDay = day;
      }
    });

    if (lowestVal === Infinity) {
      lowestVal = highestVal;
      lowestDay = highestDay;
    }

    const avgDaily = totalSpent / days.length || 0;

    return {
      topCategory: { name: topCat, value: topCatVal },
      highestDay: { date: highestDay ? format(new Date(highestDay), 'MMM dd, yyyy') : '-', value: highestVal },
      lowestDay: { date: lowestDay ? format(new Date(lowestDay), 'MMM dd, yyyy') : '-', value: lowestVal },
      avgDaily
    };
  }, [expenses]);

  if (!insights) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        icon={Trophy} 
        title="Top Category" 
        value={insights.topCategory.name} 
        trendLabel={`${currency}${insights.topCategory.value.toLocaleString()}`}
        color="text-amber-500"
      />
      <StatCard 
        icon={CalendarDays} 
        title="Highest Spend Day" 
        value={insights.highestDay.date} 
        trendLabel={`${currency}${insights.highestDay.value.toLocaleString()}`}
        color="text-red-500"
      />
      <StatCard 
        icon={CalendarMinus} 
        title="Lowest Spend Day" 
        value={insights.lowestDay.date} 
        trendLabel={`${currency}${insights.lowestDay.value.toLocaleString()}`}
        color="text-teal-500"
      />
      <StatCard 
        icon={Activity} 
        title="Avg. Daily Spend" 
        value={`${currency}${insights.avgDaily.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
        trendLabel="Per active day"
        color="text-blue-500"
      />
    </div>
  );
};
