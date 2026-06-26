import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowRightToBracket, FaUserPlus, FaRightFromBracket, FaBars, FaXmark } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContextProvider';

function NavBar() {
  const { user, authLogout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Detect scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Get user initials for fallback avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    setMobileOpen(false);
    await authLogout();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2'
          : 'py-3'
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? 'mt-2' : 'mt-3'
        }`}
      >
        <div
          className={`
            flex items-center justify-between rounded-2xl border px-4 sm:px-6 py-3
            transition-all duration-500
            ${
              scrolled
                ? 'border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
                : 'border-white/15 bg-white/8 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
            }
          `}
          style={{
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(12px) saturate(150%)',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="navbar-logo">
            {/* Logo Icon */}
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-black text-sm tracking-tight">CP</span>
              {/* Animated glow ring */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                CPMS
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              /* ─── Authenticated State ─── */
              <div className="flex items-center gap-3">
                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  id="navbar-dashboard"
                  className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Dashboard
                </Link>

                {/* User Avatar */}
                <div className="flex items-center gap-3 pl-2 border-l border-white/15">
                  <Link to="/dashboard" className="group flex items-center gap-2.5" id="navbar-avatar">
                    <div className="relative">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.fullName || 'User'}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300">
                          <span className="text-white text-xs font-bold">
                            {getInitials(user?.fullName)}
                          </span>
                        </div>
                      )}
                      {/* Online indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-900/80" />
                    </div>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-300 hidden lg:block max-w-[120px] truncate">
                      {user?.fullName}
                    </span>
                  </Link>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  id="navbar-logout"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white/70 hover:text-red-300 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 cursor-pointer"
                >
                  <FaRightFromBracket size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              /* ─── Unauthenticated State ─── */
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  id="navbar-signin"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-black/85 hover:text-black rounded-xl hover:bg-black/10 border border-transparent hover:border-black/15 transition-all duration-300"
                >
                  <FaArrowRightToBracket size={14} />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  id="navbar-signup"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaUserPlus size={14} />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            id="navbar-mobile-toggle"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* ─── Mobile Menu ─── */}
        <div
          ref={mobileMenuRef}
          className={`
            md:hidden overflow-hidden transition-all duration-400 ease-in-out
            ${mobileOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
          `}
        >
          <div
            className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-4 space-y-2"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {user ? (
              <>
                {/* User Info Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName || 'User'}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-2 ring-white/20">
                      <span className="text-white text-sm font-bold">
                        {getInitials(user?.fullName)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user?.fullName}</p>
                    <p className="text-xs text-white/50 truncate">{user?.email}</p>
                  </div>
                  {/* Online indicator */}
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
                </div>

                <Link
                  to="/dashboard"
                  id="navbar-mobile-dashboard"
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  id="navbar-mobile-logout"
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-300/80 hover:text-red-300 rounded-xl hover:bg-red-500/10 transition-all duration-300 cursor-pointer"
                >
                  <FaRightFromBracket size={14} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  id="navbar-mobile-signin"
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <FaArrowRightToBracket size={14} />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  id="navbar-mobile-signup"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-300"
                >
                  <FaUserPlus size={14} />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;