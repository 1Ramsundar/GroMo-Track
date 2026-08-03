import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Tabs } from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/EmptyState';
import { useExpenses } from '../context/ExpenseContext';
import { PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { MonthlySpendingChart } from '../components/analytics/MonthlySpendingChart';
import { WeeklySpendingChart } from '../components/analytics/WeeklySpendingChart';
import { YearlySpendingChart } from '../components/analytics/YearlySpendingChart';
import { CategoryPieChart } from '../components/analytics/CategoryPieChart';
import { PaymentMethodChart } from '../components/analytics/PaymentMethodChart';
import { SpendingInsights } from '../components/analytics/SpendingInsights';

export default function Analytics() {
  const { expenses } = useExpenses();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('monthly');

  const tabs = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' }
  ];

  if (!expenses.length) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="Analytics & Insights" 
            subtitle="Visualize your spending patterns"
          />
          <div className="mt-8">
            <EmptyState 
              icon={PieChart}
              title="No data to analyze"
              description="Add some expenses to see your spending analytics and insights."
              actionLabel="Add Expense"
              onAction={() => navigate('/expenses')}
            />
          </div>
        </div>
      </DashboardLayout>
    );
  }

return (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto">

      <SectionTitle
        title="Analytics & Insights"
        subtitle="Visualize your spending patterns"
      />

      <SpendingInsights />

      <div className="mb-6 flex justify-center sm:justify-start">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="mb-6">
        {activeTab === "weekly" && <WeeklySpendingChart />}
        {activeTab === "monthly" && <MonthlySpendingChart />}
        {activeTab === "yearly" && <YearlySpendingChart />}
      </div>

      <div className="grid grid-cols-1">
        <CategoryPieChart />
        <PaymentMethodChart />
      </div>

    </div>
  </DashboardLayout>
);
}
