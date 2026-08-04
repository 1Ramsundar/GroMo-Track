import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SectionTitle } from '../components/ui/SectionTitle';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileForm } from '../components/profile/ProfileForm';
import { ProfileStats } from "../components/profile/ProfileStats";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <SectionTitle title="Profile" />

          <button
            onClick={logout}
            className="w-10 h-10 rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition flex items-center justify-center"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>

        <ProfileHeader />

        <ProfileStats />

        <ProfileForm />

        <div className="grid gap-3">
          <button
            onClick={() => navigate("/settings")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-left font-medium hover:bg-slate-50 transition"
          >
            Settings
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}