import React from 'react';
import { Pencil, Trash2, Calendar, CreditCard } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Button from '../ui/Button';

const getCategoryColor = (category) => {
  const map = {
    Food: 'warning',
    Travel: 'info',
    Shopping: 'danger',
    Bills: 'warning',
    Medical: 'danger',
    Education: 'info',
    Others: 'default'
  };
  return map[category] || 'default';
};

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  return (
    <Card className="mb-4 md:hidden" padding="md" hover>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg mb-1">{expense.title}</h3>
          <Badge variant={getCategoryColor(expense.category)}>{expense.category}</Badge>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-lg text-slate-900">
            ₹{Number(expense.amount).toLocaleString('en-IN')}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 text-sm text-slate-500 mt-4 border-t border-slate-100 pt-3 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>{new Date(expense.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>{expense.paymentMethod}</span>
        </div>
        {expense.notes && (
          <p className="text-xs text-slate-400 truncate mt-1 italic">
            "{expense.notes}"
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
        <Button variant="ghost" size="sm" onClick={() => onEdit(expense)} className="text-slate-600">
          <Pencil className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(expense)} className="text-red-600 hover:bg-red-50 hover:text-red-700">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default ExpenseCard;
