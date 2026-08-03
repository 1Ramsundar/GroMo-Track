import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-body">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export { DashboardLayout };
export default DashboardLayout;