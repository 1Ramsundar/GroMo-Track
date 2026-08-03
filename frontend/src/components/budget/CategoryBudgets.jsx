import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { useBudget } from '../../context/BudgetContext';
import { useSettings } from '../../context/SettingsContext';
import { 
  UtensilsCrossed, Plane, ShoppingBag, 
  FileText, Heart, GraduationCap, MoreHorizontal 
} from 'lucide-react';

const ICONS = {
  Food: UtensilsCrossed,
  Travel: Plane,
  Shopping: ShoppingBag,
  Bills: FileText,
  Medical: Heart,
  Education: GraduationCap,
  Others: MoreHorizontal
};

export const CategoryBudgets = ({ onEditCategory }) => {
  const { categoryBudgets, getSpentByCategory } = useBudget();
  const { currency } = useSettings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(categoryBudgets).map(([category, budget]) => {
        if (!budget) return null;
        
        const spent = getSpentByCategory(category);
        const percent = budget > 0 ? (spent / budget) * 100 : 0;
        const Icon = ICONS[category] || MoreHorizontal;
        
        return (
          <Card key={category} hover onClick={() => onEditCategory(category)} className="cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                <Icon size={20} />
              </div>
              <h3 className="font-medium text-slate-800">{category}</h3>
            </div>
            
            <div className="flex justify-between items-end mb-2">
              <div>
                <p className="text-xs text-slate-500 mb-1">Spent</p>
                <p className="font-semibold text-slate-800">
                  {currency}{spent.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 ml-1">/ {currency}{budget.toLocaleString()}</span>
                </p>
              </div>
              <p className={`text-sm font-medium ${percent > 90 ? 'text-red-600' : percent > 75 ? 'text-amber-500' : 'text-teal-600'}`}>
                {percent.toFixed(0)}%
              </p>
            </div>
            
            <ProgressBar value={spent} max={budget} size="sm" />
          </Card>
        );
      })}
    </div>
  );
};
