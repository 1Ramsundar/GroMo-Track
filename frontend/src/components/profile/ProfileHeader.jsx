import React from 'react';
import { Card } from '../ui/Card';
import { useAuth } from '../../context/AuthContext';

export function ProfileHeader() {
  const { user } = useAuth();
  
  const initials = user?.fullName 
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A';

  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center text-3xl font-bold shadow-md">
        {initials}
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold font-heading text-slate-800">{user?.fullName || 'User'}</h2>
        <p className="text-slate-500 mb-2">{user?.email || 'user@example.com'}</p>
        {user?.createdAt && (
          <p className="text-sm text-slate-400">Member since {memberSince}</p>
        )}
      </div>
    </Card>
  );
}
