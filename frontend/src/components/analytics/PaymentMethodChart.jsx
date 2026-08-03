import React from 'react';
import { Card } from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useExpenses } from '../../context/ExpenseContext';
import { useSettings } from '../../context/SettingsContext';

const COLORS = {
  Cash: "#10b981",
  UPI: "#6366f1",
  "Credit Card": "#f43f5e",
  "Debit Card": "#f97316",
  "Net Banking": "#06b6d4"
};

export const PaymentMethodChart = () => {
  const { expenses } = useExpenses();
  const { currency } = useSettings();

  const methodTotals = expenses.reduce((acc, exp) => {

    const method = exp.paymentMethod || exp.payment_method || "Unknown";

    acc[method] = (acc[method] || 0) + Number(exp.amount);

    return acc;

  }, {});

  const data = Object.entries(methodTotals)
    .map(([name, value]) => ({ name, value }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <Card className="h-96 flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 font-display mb-2">By Payment Method</h3>
      <div className="flex-1 w-full h-full min-h-0">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${currency}${value}`, 'Spent']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>
    </Card>
  );
};
