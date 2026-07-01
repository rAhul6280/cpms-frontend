import React from 'react';
import { useAuth } from '../../context/AuthContextProvider';

function DashboardHome() {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sm:p-10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">{user?.profile?.fullName}</span>!
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">Here's what's happening with your <span className="capitalize text-indigo-600 dark:text-indigo-400">{user.role}</span> account today.</p>
      </div>
    </div>
  );
}

export default DashboardHome;
