'use client';

import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isSignedUp: boolean;
  signUp: () => void;
  login: () => void;
  logout: () => void;
  handleSignUpSuccess: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const signUp = () => {
    setIsSignedUp(true);
    // Simulate successful signup - user can now login
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsSignedUp(false);
  };

  const handleSignUpSuccess = () => {
    setIsSignedUp(true);
    // In a real app, this might redirect to login or auto-login
    console.log('Sign up successful! User can now login.');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isSignedUp,
      signUp,
      login,
      logout,
      handleSignUpSuccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};