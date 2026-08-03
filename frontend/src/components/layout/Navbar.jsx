import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleAnchor = (anchor) => {
    setIsOpen(false);
    // If we're not on home, navigate home first then scroll
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const initial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-teal-200 transition-shadow">
              G
            </div>
            <span className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              GroMo <span className="text-teal-600">Track</span>
            </span>
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleAnchor('features')}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleAnchor('about')}
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors cursor-pointer"
            >
              About
            </button>
          </div>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors px-3 py-2 rounded-xl hover:bg-teal-50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                    {initial}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{user.fullName?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-teal-600 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-500 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 shadow-lg">
          <button
            onClick={() => handleAnchor('features')}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleAnchor('about')}
            className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-colors"
          >
            About
          </button>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-base font-medium text-teal-700 bg-teal-50"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 text-center border border-slate-200 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-base font-semibold text-center bg-teal-700 text-white hover:bg-teal-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;