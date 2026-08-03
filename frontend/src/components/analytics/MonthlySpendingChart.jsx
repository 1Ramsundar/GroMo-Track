import React from 'react';
import { Card } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import { format, subMonths } from 'date-fns';
import { useSettings } from '../../context/SettingsContext';

export const MonthlySpendingChart = () => {
  const { expenses } = useExpenses();
  const { currency } = useSettings();

  // Generate last 12 months
  const data = Array.from({ length: 12 }).map((_, i) => {
    const d = subMonths(new Date(), 11 - i);
    return {
      month: format(d, 'MMM'),
      year: format(d, 'yyyy'),
      monthKey: format(d, 'MM-yyyy'),
      amount: 0
    };
  });

  expenses.forEach(exp => {
    const expDate = new Date(exp.date);
    const key = format(expDate, 'MM-yyyy');
    const monthData = data.find(d => d.monthKey === key);
    if (monthData) {
      monthData.amount += exp.amount;
    }
  });

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 font-display mb-6">Monthly Spending</h3>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val >= 1000 ? val/1000 + 'k' : val}`} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${currency}${value}`, 'Spent']}
              labelStyle={{ color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}
            />
            <Bar dataKey="amount" fill="#0f766e" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
