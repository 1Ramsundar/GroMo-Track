import React, { useMemo } from "react";
import { Card } from "../ui/Card";
import { Wallet, Receipt, TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { useExpenses } from "../../context/ExpenseContext";
import { useBudget } from "../../context/BudgetContext";

export function ProfileStats() {
  const { expenses } = useExpenses();
  const { monthlyBudget } = useBudget();

  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce(
      (sum, exp) => sum + Number(exp.amount),
      0
    );

    const totalTransactions = expenses.length;

    const averageExpense =
      totalTransactions > 0
        ? (totalExpenses / totalTransactions).toFixed(2)
        : 0;

    const categoryTotals = {};

    expenses.forEach((exp) => {
      categoryTotals[exp.category] =
        (categoryTotals[exp.category] || 0) + Number(exp.amount);
    });

    let topCategory = "N/A";
    let highest = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {
      if (amount > highest) {
        highest = amount;
        topCategory = category;
      }
    });

    return {
      totalExpenses,
      totalTransactions,
      averageExpense,
      topCategory,
      monthlyBudget,
    };
  }, [expenses, monthlyBudget]);

  const cards = [
    {
      title: "Monthly Budget",
      value: `₹${stats.monthlyBudget}`,
      icon: Wallet,
      color: "text-blue-600",
    },
    {
      title: "Total Expenses",
      value: `₹${stats.totalExpenses.toFixed(2)}`,
      icon: Receipt,
      color: "text-red-600",
    },
    {
      title: "Transactions",
      value: stats.totalTransactions,
      icon: BarChart3,
      color: "text-green-600",
    },
    {
      title: "Average Expense",
      value: `₹${stats.averageExpense}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Top Category",
      value: stats.topCategory,
      icon: PieChart,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title} className="p-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500 text-sm">{card.title}</p>
                <h3 className="text-xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>

              <Icon className={`w-8 h-8 ${card.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}