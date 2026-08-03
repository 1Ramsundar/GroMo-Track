import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useSettings } from '../../context/SettingsContext';
import { Download, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProfileSettings() {
  const { currency, setCurrency, notifications, exportData, clearAllData } = useSettings();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const currencies = [
    { label: '₹ INR (Indian Rupee)', value: '₹' },
    { label: '$ USD (US Dollar)', value: '$' },
    { label: '€ EUR (Euro)', value: '€' },
    { label: '£ GBP (British Pound)', value: '£' }
  ];

  const handleExport = () => {
    exportData();
    toast.success('Data exported successfully');
  };

  const handleDeleteAccount = () => {
    clearAllData();
    toast.success('Account deleted');
    setIsDeleteModalOpen(false);
    // Redirect to login or logout handled elsewhere ideally
  };

  return (
    <Card title="Preferences" padding="lg">
      <div className="space-y-6">
        <div className="max-w-xs">
          <Select
            label="Currency"
            options={currencies}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-slate-700">Notifications</h3>
          <Toggle
            label="Budget Alerts"
            description="Get notified when you exceed 80% of your budget."
            checked={notifications?.budgetAlerts ?? true}
            onChange={() => {}}
          />
          <Toggle
            label="Weekly Summary"
            description="Receive a weekly breakdown of your spending."
            checked={notifications?.weeklySummary ?? true}
            onChange={() => {}}
          />
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
          <Button variant="outline" icon={Download} onClick={handleExport}>
            Export All Data
          </Button>
          <Button variant="danger" icon={Trash2} onClick={() => setIsDeleteModalOpen(true)}>
            Delete Account
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
      >
        <p className="text-slate-600 mb-6">
          Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteAccount}>Yes, Delete My Account</Button>
        </div>
      </Modal>
    </Card>
  );
}
