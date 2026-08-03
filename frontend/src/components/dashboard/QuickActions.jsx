import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import SectionTitle from '../ui/SectionTitle';
import { Plus, Wallet, FileText, Download } from 'lucide-react';
import { useExpenses } from "../../context/ExpenseContext";
import { exportToExcel } from "../../utils/exportUtils";

export default function QuickActions() {
  const navigate = useNavigate();
  const { expenses } = useExpenses();

  const actions = [
    { name: 'Add Expense', icon: Plus, color: 'text-teal-600', bg: 'bg-teal-50', onClick: () => navigate('/expenses') },
    { name: 'Set Budget', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', onClick: () => navigate('/budget') },
    { name: 'View Reports', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', onClick: () => navigate('/reports') },
    {name: 'Export Data',icon: Download,color: 'text-rose-600',bg: 'bg-rose-50',onClick: () => exportToExcel(expenses,`GroMoTrack_${new Date().toISOString().split("T")[0]}.xlsx`)}
  ];

  return (
    <div>
      <SectionTitle title="Quick Actions" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {actions.map((action, idx) => (
          <Card key={idx} hover={true} className="cursor-pointer transition-all active:scale-95" padding="md">
            <div 
              className="flex flex-col items-center justify-center text-center space-y-3"
              onClick={action.onClick}
            >
              <div className={`p-3 rounded-full ${action.bg}`}>
                <action.icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <span className="text-sm font-medium text-slate-700">{action.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
