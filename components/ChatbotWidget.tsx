'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Home, 
  MessageSquare, 
  HelpCircle, 
  FileText,
  Bot,
  Send,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ChatbotWidgetProps {
  isOpen?: boolean;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isOpen: externalIsOpen }) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [activeTab, setActiveTab] = useState<'home' | 'conversation' | 'faqs' | 'articles'>('home');
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const { theme } = useTheme();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleTabChange = (tab: 'home' | 'conversation' | 'faqs' | 'articles') => {
    setActiveTab(tab);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Welcome to Which Floor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Hi there! I&apos;m your virtual assistant. I&apos;m here to help you find the perfect commercial space for your business.
              </p>
            </div>
            <div className="space-y-3">
              <button 
                className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                onClick={() => handleTabChange('conversation')}
              >
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Start a conversation</span>
                </div>
              </button>
              <button 
                className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                onClick={() => handleTabChange('faqs')}
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Browse FAQs</span>
                </div>
              </button>
            </div>
          </div>
        );
      
      case 'conversation':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    Hi! How can I help you find the perfect commercial space today?
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800 dark:text-gray-200 transition-colors duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'faqs':
        return (
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
            
            <div className="space-y-3">
              {[
                {
                  question: "What types of commercial properties do you offer?",
                  answer: "We offer office spaces, coworking spaces, managed offices, commercial projects, and pre-leased properties across various cities in India."
                },
                {
                  question: "How do I schedule a site visit?",
                  answer: "You can schedule a site visit through our website, mobile app, or by calling our customer support. We'll coordinate with the property owner to arrange a convenient time."
                },
                {
                  question: "What are your service charges?",
                  answer: "Our service charges vary based on the type of property and services required. Contact us for a detailed quote tailored to your specific needs."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-2">{faq.question}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'articles':
        return (
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Articles</h3>
            
            <div className="space-y-3">
              {[
                {
                  title: "Commercial Real Estate Trends 2025",
                  excerpt: "Latest insights on the commercial property market...",
                  readTime: "5 min read"
                },
                {
                  title: "Choosing the Right Office Space",
                  excerpt: "Factors to consider when selecting commercial space...",
                  readTime: "4 min read"
                },
                {
                  title: "Investment Guide for Commercial Property",
                  excerpt: "Tips for making smart commercial real estate investments...",
                  readTime: "6 min read"
                }
              ].map((article, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-2">{article.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{article.excerpt}</p>
                  <span className="text-xs text-blue-600 dark:text-blue-400">{article.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const tabItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'conversation' as const, icon: MessageSquare, label: 'Conversation' },
    { id: 'faqs' as const, icon: HelpCircle, label: 'FAQs' },
    { id: 'articles' as const, icon: FileText, label: 'Articles' }
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleChat}
            className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 dark:bg-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Which Floor Pvt Ltd</h3>
                <p className="text-xs text-blue-100">We are here to help you!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleChat}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <>
              {/* Chat Content Area */}
              <div className="h-96 overflow-y-auto">
                {renderTabContent()}
              </div>

              {/* Tab Navigation */}
              <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex">
                  {tabItems.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex-1 flex flex-col items-center py-3 px-2 text-xs transition-colors duration-300 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 dark:bg-blue-700 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mb-1" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;