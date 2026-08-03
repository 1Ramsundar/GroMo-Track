import React from 'react';
import { useExpenses } from '../../context/ExpenseContext';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { Receipt, UtensilsCrossed, Plane, ShoppingBag, FileText, Heart, GraduationCap, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const categoryIcons = {
  Food: UtensilsCrossed,
  Travel: Plane,
  Shopping: ShoppingBag,
  Bills: FileText,
  Medical: Heart,
  Education: GraduationCap,
  Others: MoreHorizontal
};

export default function RecentTransactions() {
  const { expenses } = useExpenses();
  const navigate = useNavigate();

  const recentExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const getCategoryIcon = (category) => {
    const Icon = categoryIcons[category] || categoryIcons.Others;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <Card padding="md">
      <SectionTitle 
        title="Recent Transactions" 
        action={recentExpenses.length > 0} 
        actionLabel="View All" 
        onAction={() => navigate('/expenses')} 
      />
      
      <div className="mt-4">
        {recentExpenses.length > 0 ? (
          <div className="space-y-4">
            {recentExpenses.map((expense, idx) => (
              <motion.div 
                key={expense.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-slate-100 text-slate-600 rounded-lg">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{expense.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="default">{expense.category}</Badge>
                      <span className="text-xs text-slate-500">
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900">₹{expense.amount.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={<Receipt className="w-10 h-10 text-slate-300" />}
            title="No transactions yet"
            description="Your recent expenses will appear here."
            actionLabel="Add Expense"
            onAction={() => navigate('/expenses')}
          />
        )}
      </div>
    </Card>
  );
}
