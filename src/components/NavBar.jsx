import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Detect scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4 sm:py-6'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`
            flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 sm:py-3
            transition-all duration-300
            ${
              scrolled
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/60 dark:border-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.05)]'
                : 'bg-transparent border border-transparent'
            }
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="navbar-logo">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-black text-xs sm:text-sm tracking-tight">CP</span>
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                CPMS
              </span>
            </span>
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle Dark Mode"
            >
               {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <Link
              to="/login"
              id="navbar-signin"
              className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 border border-gray-200/80 dark:border-gray-700 rounded-full hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-600 transition-all duration-200"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              id="navbar-signup"
              className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;