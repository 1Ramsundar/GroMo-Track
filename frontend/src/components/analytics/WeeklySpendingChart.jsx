import React from 'react';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { useSettings } from '../../context/SettingsContext';

export const WeeklySpendingChart = () => {
  const { expenses } = useExpenses();
  const { currency } = useSettings();

  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
  
  const data = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(start, i);
    return {
      day: format(day, 'EEE'),
      fullDate: day,
      amount: 0
    };
  });

  expenses.forEach(exp => {
    const expDate = new Date(exp.date);
    const dayData = data.find(d => isSameDay(d.fullDate, expDate));
    if (dayData) {
      dayData.amount += exp.amount;
    }
  });

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 font-display mb-6">This Week</h3>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val >= 1000 ? val/1000 + 'k' : val}`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${currency}${value}`, 'Spent']}
              labelStyle={{ color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}
            />
            <Line type="monotone" dataKey="amount" stroke="#0f766e" strokeWidth={3} dot={{ fill: '#0f766e', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
