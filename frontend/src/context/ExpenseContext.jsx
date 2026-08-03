import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from "./AuthContext";
import {
  getExpenses,
  addExpense as addExpenseAPI,
  updateExpense as updateExpenseAPI,
  deleteExpense as deleteExpenseAPI
} from "../services/expenseService";

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load from localStorage on mount
  useEffect(() => {

    if (!user) {
      setExpenses([]);
      setLoading(false);
      return;
    }

    const loadExpenses = async () => {
      try {

        setLoading(true);

        const response = await getExpenses();

        setExpenses(response.expenses || []);

      } catch (error) {

        console.error("Error loading expenses", error);

        setExpenses([]);

      } finally {

        setLoading(false);

      }
    };

    loadExpenses();

  }, [user]);

  // Save to localStorage whenever expenses change

const addExpense = useCallback(async (expenseData) => {
  try {
    const response = await addExpenseAPI(expenseData);

    setExpenses(prev => [...prev, response.expense]);

    return response.expense;
  } catch (error) {
    console.error("Failed to add expense", error);
    throw error;
  }
}, []);

  const updateExpense = useCallback(async (id, updatedExpense) => {
    try {
      const response = await updateExpenseAPI(id, updatedExpense);

      setExpenses(prev =>
        prev.map(exp =>
          exp.id === id ? response.expense : exp
        )
      );
    } catch (error) {
      console.error("Failed to update expense", error);
      throw error;
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    try {
      await deleteExpenseAPI(id);

      setExpenses(prev =>
        prev.filter(exp => exp.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete expense", error);
      throw error;
    }
  }, []);

  const getExpensesByDateRange = useCallback((startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return expenses.filter(exp => {
      const date = new Date(exp.date);
      return date >= start && date <= end;
    });
  }, [expenses]);

  const getExpensesByCategory = useCallback((category) => {
    return expenses.filter(exp => exp.category === category);
  }, [expenses]);

  const getTotalByCategory = useCallback(() => {
    return expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {});
  }, [expenses]);

  const getTotalByPaymentMethod = useCallback(() => {
    return expenses.reduce((acc, exp) => {

      const method = exp.paymentMethod || exp.payment_method || "Unknown";

      acc[method] = (acc[method] || 0) + Number(exp.amount);

      return acc;

    }, {});
  }, [expenses]);

  const getDailyTotals = useCallback((month, year) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyTotals = Array.from({ length: daysInMonth }, (_, i) => ({
      date: i + 1,
      total: 0
    }));

    expenses.forEach(exp => {
      const date = new Date(exp.date);
      if (date.getMonth() + 1 === month && date.getFullYear() === year) {
        const day = date.getDate();
        dailyTotals[day - 1].total += Number(exp.amount);
      }
    });

    return dailyTotals;
  }, [expenses]);

  const getMonthlyTotals = useCallback((year) => {
    const monthlyTotals = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      total: 0
    }));

    expenses.forEach(exp => {
      const date = new Date(exp.date);
      if (date.getFullYear() === year) {
        const month = date.getMonth();
        monthlyTotals[month].total += Number(exp.amount);
      }
    });

    return monthlyTotals;
  }, [expenses]);

  const getWeeklyTotals = useCallback(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyTotals = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      day,
      total: 0
    }));

    expenses.forEach(exp => {
      const date = new Date(exp.date);
      if (date >= startOfWeek) {
        let dayIdx = date.getDay() - 1;
        if (dayIdx === -1) dayIdx = 6; // Sunday
        if (dayIdx >= 0 && dayIdx <= 6) {
          weeklyTotals[dayIdx].total += Number(exp.amount);
        }
      }
    });

    return weeklyTotals;
  }, [expenses]);

  const getTotalSpent = useCallback((month, year) => {
    return expenses.reduce((acc, exp) => {
      const date = new Date(exp.date);
      if (date.getMonth() + 1 === month && date.getFullYear() === year) {
        return acc + Number(exp.amount);
      }
      return acc;
    }, 0);
  }, [expenses]);

  const clearAllExpenses = useCallback(() => {
    setExpenses([]);
  }, []);

  const value = useMemo(() => ({
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByDateRange,
    getExpensesByCategory,
    getTotalByCategory,
    getTotalByPaymentMethod,
    getDailyTotals,
    getMonthlyTotals,
    getWeeklyTotals,
    getTotalSpent,
    clearAllExpenses
  }), [
    expenses, loading, addExpense, updateExpense, deleteExpense,
    getExpensesByDateRange, getExpensesByCategory, getTotalByCategory,
    getTotalByPaymentMethod, getDailyTotals, getMonthlyTotals,
    getWeeklyTotals, getTotalSpent, clearAllExpenses
  ]);

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
