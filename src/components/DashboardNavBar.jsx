import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';

function DashboardNavBar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Hamburger for mobile */}
            <button
              onClick={onMenuClick}
              className="p-2 mr-3 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-black text-xs sm:text-sm tracking-tight">CP</span>
              </div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  CPMS
                </span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center">
            {/* User Avatar & Name */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-900">{user?.fullName}</span>
                  <span className="text-xs font-medium text-indigo-600 capitalize">{user?.role}</span>
                </div>
                <button className="relative w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
                   {user?.avatar ? (
                     <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                   ) : (
                     user?.fullName ? user.fullName.charAt(0) : 'U'
                   )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavBar;
