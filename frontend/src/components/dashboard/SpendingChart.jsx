import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import EmptyState from '../ui/EmptyState';
import { BarChart3 } from 'lucide-react';
import { isSameMonth, format, getDate, getDaysInMonth } from 'date-fns';

export default function SpendingChart() {
  const { expenses } = useExpenses();

  const chartData = useMemo(() => {
    const currentMonthExpenses = expenses.filter(e => isSameMonth(new Date(e.date), new Date()));
    if (currentMonthExpenses.length === 0) return [];

    const daysInMonth = getDaysInMonth(new Date());
    const data = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      amount: 0,
      fullDate: format(new Date(new Date().getFullYear(), new Date().getMonth(), i + 1), 'MMM dd')
    }));

    currentMonthExpenses.forEach(expense => {
      const day = getDate(new Date(expense.date));
      if (day >= 1 && day <= daysInMonth) {
        data[day - 1].amount += expense.amount;
      }
    });

    return data;
  }, [expenses]);

  return (
    <Card padding="md">
      <SectionTitle title="Spending Overview" subtitle="Daily expenses for this month" />
      <div className="h-72 mt-4">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                minTickGap={20}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelFormatter={(val, arr) => arr?.[0]?.payload?.fullDate || val}
                formatter={(val) => [`₹${val}`, 'Amount']}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#0f766e" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState 
            icon={<BarChart3 className="w-12 h-12 text-slate-300" />}
            title="No spending data"
            description="Add some expenses this month to see your chart."
          />
        )}
      </div>
    </Card>
  );
}
