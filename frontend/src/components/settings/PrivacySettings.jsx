import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { Shield, Trash2 } from 'lucide-react';

export function PrivacySettings() {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card title="Privacy & Security" padding="lg">
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <Shield className="w-6 h-6 text-teal-700 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-slate-800">Your Data is Secure</h4>
            <p className="text-sm text-slate-600 mt-1">
              All your financial data is stored locally on your device or securely in our backend. We do not sell your personal data to third parties. Data is retained as long as your account is active.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <h4 className="text-sm font-medium text-slate-800 mb-2">Account Deletion</h4>
          <p className="text-sm text-slate-600 mb-4">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="danger" icon={Trash2} onClick={() => setIsModalOpen(true)}>
            Delete Account
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Account"
      >
        <p className="text-slate-600 mb-6">
          This will permanently delete your account and remove all your data from our servers. Are you absolutely sure?
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => {
            setIsModalOpen(false);
            logout(); // Mock deletion by logging out
          }}>
            Yes, Delete My Account
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
