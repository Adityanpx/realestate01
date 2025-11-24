'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Server-side default, will be overridden on client
    return 'light';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme on mount - client only
  useEffect(() => {
    // Get saved theme or default to light for SSR consistency
    let initialTheme: 'light' | 'dark' = 'light';

    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        initialTheme = savedTheme;
      } else {
        // Check system preference, but prefer light theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        initialTheme = prefersDark ? 'dark' : 'light'; // Default to light
      }
      
      // Apply theme to HTML
      const html = document.documentElement;
      if (initialTheme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', initialTheme);
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    
    // Add transition class for smooth theme switching
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      
      // Reset transition after theme change
      setTimeout(() => {
        document.documentElement.style.transition = '';
        setIsTransitioning(false);
      }, 300);
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};