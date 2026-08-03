import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { DataSettings } from '../components/settings/DataSettings';
import { PrivacySettings } from '../components/settings/PrivacySettings';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <SectionTitle title="Settings" subtitle="Manage your app preferences and data" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <GeneralSettings />
            <NotificationSettings />
          </div>
          <div className="space-y-6">
            <DataSettings />
            <PrivacySettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
