import React, { useRef, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useSettings } from '../../context/SettingsContext';
import { useExpenses } from '../../context/ExpenseContext';
import { Download, Upload, Trash2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export function DataSettings() {
  const { exportData, importData, clearAllData, resetApp } = useSettings();
  const fileInputRef = useRef(null);
  const [modalState, setModalState] = useState({ open: false, type: null });

  const handleExport = () => {
    exportData();
    toast.success('Data backed up successfully');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
      toast.success('Data restored successfully');
    }
  };

  const confirmAction = () => {
    if (modalState.type === 'clear') {
      clearAllData();
      toast.success('All expenses deleted');
    } else if (modalState.type === 'reset') {
      resetApp();
      toast.success('App reset to factory defaults');
    }
    setModalState({ open: false, type: null });
  };

  return (
    <Card title="Data Management" padding="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" icon={Download} onClick={handleExport} fullWidth>
            Backup Data
          </Button>
          <div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".json"
              onChange={handleImport}
            />
            <Button variant="outline" icon={Upload} onClick={() => fileInputRef.current?.click()} fullWidth>
              Restore Data
            </Button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            variant="danger" 
            icon={Trash2} 
            onClick={() => setModalState({ open: true, type: 'clear' })}
            fullWidth
          >
            Delete All Expenses
          </Button>
          <Button 
            variant="danger" 
            icon={RotateCcw} 
            onClick={() => setModalState({ open: true, type: 'reset' })}
            fullWidth
          >
            Reset App
          </Button>
        </div>
      </div>

      <Modal
        isOpen={modalState.open}
        onClose={() => setModalState({ open: false, type: null })}
        title={modalState.type === 'clear' ? "Delete All Expenses" : "Reset App"}
      >
        <p className="text-slate-600 mb-6">
          {modalState.type === 'clear' 
            ? "Are you sure you want to delete all your expenses? This action cannot be undone."
            : "Are you sure you want to reset the entire app? This will delete all your data, budgets, and restore default settings."}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setModalState({ open: false, type: null })}>Cancel</Button>
          <Button variant="danger" onClick={confirmAction}>Yes, I'm sure</Button>
        </div>
      </Modal>
    </Card>
  );
}
