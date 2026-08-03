import React from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import Badge from '../ui/Badge';
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

const ExpenseTable = ({ expenses, onEdit, onDelete, sortConfig, onSort }) => {
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="w-4 h-4 inline-block ml-1"></span>;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline-block ml-1 text-teal-600" /> : 
      <ChevronDown className="w-4 h-4 inline-block ml-1 text-teal-600" />;
  };

  const headers = [
    { key: 'date', label: 'Date' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount' },
    { key: 'paymentMethod', label: 'Payment Method' }
  ];

  return (
    <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {headers.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-4 font-semibold text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => onSort(key)}
                >
                  <div className="flex items-center">
                    {label}
                    {getSortIcon(key)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 font-medium text-slate-800">
                  {expense.title}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={getCategoryColor(expense.category)}>
                    {expense.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                  ₹{Number(expense.amount).toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {expense.payment_method}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(expense)} className="p-2 h-8 w-8 !rounded-full">
                      <Pencil className="w-4 h-4 text-slate-500 hover:text-teal-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(expense)} className="p-2 h-8 w-8 !rounded-full">
                      <Trash2 className="w-4 h-4 text-slate-500 hover:text-red-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
