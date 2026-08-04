import React from 'react';
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
      <div className="w-8 md:hidden"></div>
        <h1 className="text-xl font-semibold text-slate-900 font-heading">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-slate-900">
              {user?.fullName || "User"}
            </p>
          </div>

          <button
            onClick={() => window.location.href = "/profile"}
            className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100"
          >
            {initial}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;