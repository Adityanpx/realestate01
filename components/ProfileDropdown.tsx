'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileDropdownProps {
  className?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    // Redirect to home page after logout
    window.location.href = '/';
  };

  const handleMenuClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 group"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Profile menu"
        title="Profile"
      >
        <User className="w-5 h-5" />
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        } group-hover:rotate-180`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-slide-down">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Welcome back!</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@example.com</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => handleMenuClick(() => window.location.href = '/profile')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200"
            >
              <User className="w-4 h-4 mr-3" />
              Profile
            </button>

            <button
              onClick={() => handleMenuClick(() => window.location.href = '/settings')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200"
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </button>

            <hr className="my-1 border-gray-200 dark:border-gray-700" />

            <button
              onClick={() => handleMenuClick(handleLogout)}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;