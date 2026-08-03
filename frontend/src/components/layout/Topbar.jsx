import React from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const Topbar = ({ onMenuToggle }) => {
  const location = useLocation();
  const auth = useAuth();
  const user = auth ? auth.user : { name: 'Admin User' };
  
  // Create a readable title from pathname
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const initial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-slate-900 font-heading hidden sm:block">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-900">{user?.fullName || 'User'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">
            {initial}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;