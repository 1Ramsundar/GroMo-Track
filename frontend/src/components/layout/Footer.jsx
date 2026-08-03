import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const scrollTo = (anchor) => {
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

  return (
    <footer className="bg-white border-t border-slate-200 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                G
              </div>
              <span className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                GroMo <span className="text-teal-600">Track</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Track every rupee. Build better financial habits. GroMo Track is your personal finance companion.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-teal-50 text-teal-700 text-xs px-2.5 py-1 rounded-full font-medium ring-1 ring-teal-100 flex items-center gap-1">
                <Zap className="w-3 h-3" /> Free Forever
              </span>
              <span className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium ring-1 ring-slate-200">
                🔒 Privacy First
              </span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-teal-600 transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <Link to="/login" className="hover:text-teal-600 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-teal-600 transition-colors">
                  Get Started Free
                </Link>
              </li>
            </ul>
          </div>

          {/* App */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              App
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-500">
              <li>
                <Link to="/dashboard" className="hover:text-teal-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/expenses" className="hover:text-teal-600 transition-colors">
                  Expenses
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-teal-600 transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-teal-600 transition-colors">
                  Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} GroMo Track. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            Built with <span className="text-red-500 mx-1">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;