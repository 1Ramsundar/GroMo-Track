import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileForm } from '../components/profile/ProfileForm';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { ProfileStats } from "../components/profile/ProfileStats";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <SectionTitle title="Profile" subtitle="Manage your account settings and preferences" />
        <ProfileHeader />
        <ProfileStats />
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
}
