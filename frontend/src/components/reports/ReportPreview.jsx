import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { StatCard } from '../ui/StatCard';
import { IndianRupee, TrendingUp, Calendar, Hash } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export function ReportPreview({ expenses, summary }) {
  const { currency } = useSettings();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={IndianRupee}
          title="Total Spent"
          value={`${currency} ${summary.totalSpent.toLocaleString()}`}
          color="blue"
        />
        <StatCard
          icon={Calendar}
          title="Avg. Per Day"
          value={`${currency} ${summary.avgPerDay.toLocaleString()}`}
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          title="Top Category"
          value={summary.topCategory || 'N/A'}
          color="orange"
        />
        <StatCard
          icon={Hash}
          title="Total Transactions"
          value={summary.count.toString()}
          color="purple"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 font-semibold text-slate-600">Date</th>
                <th className="p-4 font-semibold text-slate-600">Title</th>
                <th className="p-4 font-semibold text-slate-600">Category</th>
                <th className="p-4 font-semibold text-slate-600 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 50).map((expense) => (
                <tr key={expense.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="p-4 font-medium text-slate-800">{expense.title}</td>
                  <td className="p-4">
                    <Badge variant="info">{expense.category}</Badge>
                  </td>
                  <td className="p-4 text-right font-medium text-slate-800">
                    {currency} {expense.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No expenses found for the selected period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {expenses.length > 50 && (
          <div className="p-4 text-center text-sm text-slate-500 border-t border-slate-100">
            Showing first 50 transactions. Download the report to see all.
          </div>
        )}
      </Card>
    </div>
  );
}
