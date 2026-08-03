import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, BarChart3, FileText, User, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; 

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth(); 
  const logout = auth ? auth.logout : () => {};

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', path: '/expenses', icon: Receipt },
    { name: 'Budget', path: '/budget', icon: Wallet },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const bottomItems = [
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItem = ({ item }) => {
    const isActive = location.pathname.startsWith(item.path);
    const Icon = item.icon;
    
    return (
      <NavLink
        to={item.path}
        onClick={onClose}
        className={`flex items-center px-4 py-3 mb-1 rounded-xl transition-colors ${
          isActive 
            ? 'bg-teal-50 text-teal-700 font-medium' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
        {item.name}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-screen md:w-64
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
              G
            </div>
            <span className="text-xl font-bold text-slate-900 font-heading">
              GroMo <span className="text-teal-600">Track</span>
            </span>
          </div>
          <button onClick={onClose} className="md:hidden text-slate-500 hover:bg-slate-100 p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="space-y-1 mb-4">
            {bottomItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;