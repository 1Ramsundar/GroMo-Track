import React from 'react';
import { Card } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import { format } from 'date-fns';
import { useSettings } from '../../context/SettingsContext';

export const YearlySpendingChart = () => {
  const { expenses } = useExpenses();
  const { currency } = useSettings();

  // Group by year
  const yearlyData = {};
  
  expenses.forEach(exp => {
    const year = format(new Date(exp.date), 'yyyy');
    yearlyData[year] = (yearlyData[year] || 0) + exp.amount;
  });

  let data = Object.keys(yearlyData).sort().map(year => ({
    year,
    amount: yearlyData[year]
  }));

  if (data.length === 0) {
    const currentYear = format(new Date(), 'yyyy');
    data = [{ year: currentYear, amount: 0 }];
  } else if (data.length === 1) {
    const year = parseInt(data[0].year);
    data = [
      { year: (year - 1).toString(), amount: 0 },
      data[0]
    ];
  }

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 font-display mb-6">Yearly Overview</h3>
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val >= 1000 ? val/1000 + 'k' : val}`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${currency}${value}`, 'Spent']}
              labelStyle={{ color: '#0f172a', fontWeight: 600, marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="amount" stroke="#0f766e" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
