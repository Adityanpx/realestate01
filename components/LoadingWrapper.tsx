'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

// Create the fallback component outside to avoid creating it during render
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 mx-auto bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
        🏢
      </div>
      <h2 className="text-2xl font-bold text-gray-800">WHICH FLOOR</h2>
      <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-1/3 h-full bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial page load only
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds on initial load only

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen - only shows on initial load */}
      <AnimatePresence>
        {(isLoading || isInitialLoad) && (
          <LoadingScreen 
            isLoading={isLoading || isInitialLoad}
            onLoadingComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      {/* Main content - no loading on navigation */}
      {children}
    </>
  );
};

export default LoadingWrapper;