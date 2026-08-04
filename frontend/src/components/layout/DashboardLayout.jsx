import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import BottomNavigation from './BottomNavigation';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-[100dvh] bg-slate-50 font-body overflow-hidden">
      <div className="hidden md:block">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      <div className="hidden md:block">
          <Topbar onMenuToggle={toggleSidebar} />
      </div>
        <main className="flex-1 overflow-y-auto px-5 pt-4 pb-32 sm:px-6 sm:pt-6 sm:pb-8 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
                {children}
            </div>
        </main>

        <div className="md:hidden">
        <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export { DashboardLayout };
export default DashboardLayout;