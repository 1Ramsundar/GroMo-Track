import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useExpenses } from './ExpenseContext';
import { getBudget } from "../services/budgetService";

const BudgetContext = createContext();

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

export const BudgetProvider = ({ children }) => {
  const { expenses } = useExpenses();
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [categoryBudgets, setCategoryBudgetsState] = useState({
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Bills: 0,
    Medical: 0,
    Education: 0,
    Others: 0
  });

  useEffect(() => {
  const loadBudget = async () => {
    try {
      const response = await getBudget();

      if (response.budget) {
        setMonthlyBudget(Number(response.budget.monthly_budget));

        setCategoryBudgetsState(prev => ({
          ...prev,
          ...response.budget.category_budgets
        }));
      }
    } catch (err) {
      console.error("Failed to load budget", err);
    }
  };

  loadBudget();
}, []);

  const updateMonthlyBudget = useCallback((amount) => {
    setMonthlyBudget(Number(amount));
  }, []);

  const setCategoryBudget = useCallback((category, amount) => {
    setCategoryBudgetsState(prev => ({ ...prev, [category]: Number(amount) }));
  }, []);

  const setCategoryBudgets = useCallback((budgetsObject) => {
    setCategoryBudgetsState(prev => ({ ...prev, ...budgetsObject }));
  }, []);

  const calculateStatus = (budget, spent) => {
    const percentage = budget > 0 ? (spent / budget) * 100 : (spent > 0 ? 100 : 0);
    const remaining = budget - spent;
    let status = 'safe';
    if (percentage >= 85) {
      status = 'danger';
    } else if (percentage >= 60) {
      status = 'warning';
    }
    return { budget, spent, remaining, percentage, status };
  };

  const getBudgetStatus = useCallback(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    
    const spent = expenses.reduce((acc, exp) => {
      const date = new Date(exp.date);
      if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
        return acc + Number(exp.amount);
      }
      return acc;
    }, 0);

    return calculateStatus(monthlyBudget, spent);
  }, [expenses, monthlyBudget]);

  const getCategoryBudgetStatus = useCallback((category) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const spent = expenses.reduce((acc, exp) => {
      const date = new Date(exp.date);
      if (exp.category === category && date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
        return acc + Number(exp.amount);
      }
      return acc;
    }, 0);

    const budget = categoryBudgets[category] || 0;
    return calculateStatus(budget, spent);
  }, [expenses, categoryBudgets]);

  const getAllCategoryStatuses = useCallback(() => {
    return Object.keys(categoryBudgets).map(category => {
      return {
        category,
        ...getCategoryBudgetStatus(category)
      };
    });
  }, [categoryBudgets, getCategoryBudgetStatus]);

  const getTotalSpent = useCallback(() => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    return expenses.reduce((acc, exp) => {
      const date = new Date(exp.date);
      if (date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
        return acc + Number(exp.amount);
      }
      return acc;
    }, 0);
  }, [expenses]);

  const getSpentByCategory = useCallback((category) => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    return expenses.reduce((acc, exp) => {
      const date = new Date(exp.date);
      if (exp.category === category && date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear) {
        return acc + Number(exp.amount);
      }
      return acc;
    }, 0);
  }, [expenses]);

  const value = useMemo(() => ({
    monthlyBudget,
    categoryBudgets,
    setMonthlyBudget: updateMonthlyBudget,
    setCategoryBudget,
    setCategoryBudgets,
    getBudgetStatus,
    getCategoryBudgetStatus,
    getAllCategoryStatuses,
    getTotalSpent,
    getSpentByCategory
  }), [
    monthlyBudget, categoryBudgets, updateMonthlyBudget,
    setCategoryBudget, setCategoryBudgets, getBudgetStatus,
    getCategoryBudgetStatus, getAllCategoryStatuses,
    getTotalSpent, getSpentByCategory
  ]);

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};
