'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Building2, Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import ProfileDropdown from './ProfileDropdown';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, isSignedUp, handleSignUpSuccess } = useAuth();

  // More menu items for dropdown
  const moreMenuItems = [
    { label: 'Blogs', href: '/blogs' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
  ];

  // Navigate to signup page function
  const handleSignUpClick = () => {
    window.location.href = '/signup';
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.5 } }}
      whileHover={{ 
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  boxShadow: "0 8px 25px rgba(250, 204, 21, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Building2 className="text-primary-foreground w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <div className="flex flex-col">
                <motion.span 
                  className="text-xl font-bold text-foreground tracking-tight"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2 }}
                >
                  WHICH
                </motion.span>
                <motion.span 
                  className="text-xl font-bold text-primary tracking-tight -mt-1"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 8px rgba(250, 204, 21, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  FLOOR
                </motion.span>
              </div>
            </Link>
          </div>

          {/* Enhanced Search Bar */}
          <div className="hidden lg:flex items-center ml-4">
            <div className="relative group">
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="w-4 h-4" />
              </motion.div>
              <input
                type="text"
                placeholder="Search location or workspace"
                className="pl-10 pr-4 py-2 w-64 bg-accent/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-accent transition-all duration-200"
              />
              {/* Subtle glow effect on focus */}
              <motion.div
                className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 pointer-events-none"
                whileFocus={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            
              <Link
                href="/properties"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
              >
                Solutions
              </Link>
            
            <Link
              href="/list-property"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
            >
              List Your Property
            </Link>
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200 py-2"
                aria-expanded={isMoreDropdownOpen}
                aria-haspopup="true"
              >
                More
                <div
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${isMoreDropdownOpen ? 'rotate-180' : ''}`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              
              {isMoreDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 mt-2 w-48 bg-secondary rounded-lg shadow-xl border border-border py-2 z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {moreMenuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-accent transition-colors duration-200"
                        onClick={() => setIsMoreDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            
            {/* Show Login only if not authenticated */}
            {/* {!isAuthenticated && (
              <Link 
                href="/login" 
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 py-2"
              >
                Login
              </Link>
            )} */}
          </nav>

          {/* Enhanced Right Side Icons and Buttons */}
          <div className="hidden lg:flex items-center space-x-3">

            {/* Enhanced Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <ThemeToggle />
            </motion.div>

            {/* Enhanced Profile Dropdown - show when authenticated */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileDropdown />
              </motion.div>
            )}

            {/* Enhanced Sign Up Button - only show if not signed up */}
            {!isSignedUp && (
              <motion.button
                onClick={handleSignUpClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 8px 25px rgba(250, 204, 21, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10">Sign Up</span>
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile theme toggle */}
            <ThemeToggle />
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Link 
                  href="/properties" 
                  className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 py-2 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Solutions
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                <Link 
                  href="/list-property" 
                  className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 py-2 block"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  List Your Property
                </Link>
              </motion.div>
              
              {/* Mobile More Section */}
              <motion.div 
                className="py-2"
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.2 }}
              >
                <motion.button
                  onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                  className="flex items-center text-muted-foreground hover:text-primary font-medium transition-colors duration-200 py-2"
                  whileTap={{ scale: 0.95 }}
                >
                  More
                  <motion.div
                    animate={{ rotate: isMoreDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </motion.div>
                </motion.button>
                
                {isMoreDropdownOpen && (
                  <motion.div 
                    className="ml-4 mt-2 space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {moreMenuItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="block text-muted-foreground hover:text-primary text-sm transition-colors duration-200 py-1"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMoreDropdownOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
              
              {/* Mobile auth buttons */}
              <motion.div 
                className="flex flex-col space-y-3 pt-4 border-t border-border"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.25 }}
              >
                {!isAuthenticated && (
                  <Link 
                    href="/login" 
                    className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
                
                {!isSignedUp && (
                  <motion.button
                    onClick={() => {
                      handleSignUpClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-bold text-center transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                )}
                
                {isAuthenticated && (
                  <motion.div 
                    className="pt-2 border-t border-border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ProfileDropdown />
                  </motion.div>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;