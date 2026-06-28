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
             {/* If we add nested routes later, they will render here */}
             <Outlet />
             
             {/* Default Dashboard Content */}
             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-linear-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
               <div className="relative z-10">
                 <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                   Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">{user?.profile?.fullName}</span>!
                 </h1>
                 <p className="text-lg text-gray-500 font-medium">Here's what's happening with your <span className="capitalize text-indigo-600">{user.role}</span> account today.</p>
               </div>
             </div>
           </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;