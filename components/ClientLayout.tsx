'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import ChatbotWidget from './ChatbotWidget';
import LoadingWrapper from './LoadingWrapper';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Loading wrapper that handles all loading logic */}
      <LoadingWrapper>
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <motion.main 
          className="pt-16 min-h-screen" // pt-16 to account for fixed navbar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
        
        {/* Floating Chat Widget */}
        <ChatbotWidget />
      </LoadingWrapper>
    </div>
  );
};

export default ClientLayout;