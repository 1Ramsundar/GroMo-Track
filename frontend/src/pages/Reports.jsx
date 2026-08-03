import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportPreview } from '../components/reports/ReportPreview';
import { ReportDownload } from '../components/reports/ReportDownload';
import { useExpenses } from '../context/ExpenseContext';
import { EmptyState } from '../components/ui/EmptyState';
import { FileText } from 'lucide-react';

export default function Reports() {
  const { expenses } = useExpenses();
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [periodLabel, setPeriodLabel] = useState('Monthly');

  const filteredExpenses = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return expenses;
    return expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate >= dateRange.from && expDate <= dateRange.to;
    });
  }, [expenses, dateRange]);

  const summary = useMemo(() => {
    const totalSpent = filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0);
    const count = filteredExpenses.length;
    
    let days = 1;
    if (dateRange.from && dateRange.to) {
      days = Math.max(1, Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24)));
    }
    const avgPerDay = Math.round(totalSpent / days);
    
    const categoryTotals = filteredExpenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    
    const topCategory = Object.keys(categoryTotals).sort((a, b) => categoryTotals[b] - categoryTotals[a])[0];

    return { totalSpent, avgPerDay, topCategory, count };
  }, [filteredExpenses, dateRange]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SectionTitle title="Reports" subtitle="Analyze and download your spending reports" />
        
        <ReportFilters 
          onFilterChange={(range) => setDateRange(range)} 
        />
        
{expenses.length === 0 ? (
  <EmptyState
    icon={FileText}
    title="No Data Available"
    description="Add some expenses to view reports."
  />
) : (
  <>
    <ReportPreview
      expenses={filteredExpenses}
      summary={summary}
    />

    <ReportDownload
      expenses={filteredExpenses}
      summary={summary}
      period={periodLabel}
    />
  </>
)}
      </div>
    </DashboardLayout>
  );
}
