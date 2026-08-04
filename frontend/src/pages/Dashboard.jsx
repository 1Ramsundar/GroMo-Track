import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardStats from '../components/dashboard/DashboardStats';
import SpendingChart from '../components/dashboard/SpendingChart';
import BudgetCard from '../components/dashboard/BudgetCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentTransactions from '../components/dashboard/RecentTransactions';
/*import UpcomingBills from '../components/dashboard/UpcomingBills';*/
import FinancialHealth from '../components/dashboard/FinancialHealth';
import { useAuth } from '../context/AuthContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export default function Dashboard() {
  const { user } = useAuth();
  const greeting = getGreeting();
  
  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
          {greeting}, {user?.fullName?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="mt-1 text-sm md:text-base text-slate-500 leading-6">Track your spending, monitor your budget, and stay in control of your finances.</p>
      </div>
      
      {/* KPI Cards */}
      <DashboardStats />
      
      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6 md:mt-10">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <BudgetCard />
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6">
        <QuickActions />
      </div>
      
      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6 md:mt-10">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="space-y-6">
           <FinancialHealth /> 
           <div className="h-30 md:hidden" />
           {/*<UpcomingBills />*/}
        </div>
      </div>
    </DashboardLayout>
  );
}