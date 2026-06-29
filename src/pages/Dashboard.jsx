import React, { useState } from 'react';
import { useAuth } from '../context/AuthContextProvider';
import Loading from '../components/Loading';
import DashboardNavBar from '../components/DashboardNavBar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const { authLoading, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (authLoading) return <Loading />;
  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <DashboardNavBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
           <div className="max-w-7xl mx-auto space-y-6">
             <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;