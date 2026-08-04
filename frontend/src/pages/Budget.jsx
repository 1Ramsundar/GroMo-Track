import React, { useEffect, useState } from "react"; 
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { BudgetOverview } from '../components/budget/BudgetOverview';
import { BudgetAlerts } from '../components/budget/BudgetAlerts';
import { CategoryBudgets } from '../components/budget/CategoryBudgets';
import { BudgetForm } from '../components/budget/BudgetForm';
import { useBudget } from '../context/BudgetContext';
import { Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveBudget, getBudget } from "../services/budgetService";

export default function Budget() {
  const { monthlyBudget, categoryBudgets, setMonthlyBudget, setCategoryBudget } = useBudget();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  const loadBudget = async () => {
    try {

      const response = await getBudget();

      if (response.budget) {

        setMonthlyBudget(response.budget.monthly_budget);

        Object.entries(response.budget.category_budgets).forEach(([category, amount]) => {
          setCategoryBudget(category, amount);
        });

      }

    } catch (err) {
      console.error(err);
    }
  };

  loadBudget();
}, []);

  const handleSaveBudget = async (data) => {
  try {

    await saveBudget({
      monthlyBudget: data.monthlyBudget,
      categoryBudgets: data.categoryBudgets,
    });

    setMonthlyBudget(data.monthlyBudget);

    Object.entries(data.categoryBudgets).forEach(([category, amount]) => {
      setCategoryBudget(category, amount);
    });

    setIsModalOpen(false);

    toast.success("Budget saved successfully!");

  } catch (err) {

    toast.error("Failed to save budget");

    console.error(err);

  }
};

  const hasBudget = monthlyBudget > 0;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <SectionTitle 
          title="Budget Management" 
          subtitle="Track and manage your spending limits"
          action={hasBudget ? () => setIsModalOpen(true) : undefined}
          actionLabel="Edit Budget"
        />

        {!hasBudget ? (
          <div className="mt-8">
            <EmptyState 
              icon={Wallet}
              title="No budget set"
              description="Set a monthly budget to keep your spending in check and achieve your financial goals."
              actionLabel="Set Budget Now"
              onAction={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <div className="mt-6">
            <BudgetOverview onEdit={() => setIsModalOpen(true)} />
            <BudgetAlerts />
            <h3 className="text-lg font-semibold text-slate-800 font-display mb-4">Category Limits</h3>
            <CategoryBudgets onEditCategory={() => setIsModalOpen(true)} />
          </div>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Set Budget Limits"
          size="md"
        >
          <BudgetForm 
            initialData={{ monthlyBudget, categoryBudgets }} 
            onSubmit={handleSaveBudget} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </Modal>
        <div className="h-36 md:hidden" />
      </div>
    </DashboardLayout>
  );
}
