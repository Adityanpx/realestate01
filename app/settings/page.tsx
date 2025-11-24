'use client';

import React, { useState } from 'react';
import { Settings, Bell, Shield,  Sun,  Globe } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(true);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-[#121212] font-sans text-white selection:bg-yellow-400 selection:text-black flex flex-col pt-16">
      <Navbar />
      
      <div className="px-6 py-6 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto flex items-center text-gray-500 text-xs font-medium uppercase tracking-wider">
          <span className="hover:text-white cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
          <span className="mx-2">/</span>
          <span className="text-yellow-400">Settings</span>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 pt-10">
        
        {/* Settings Card */}
        <div className="w-full max-w-[600px] bg-[#1E1E1E] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                    Settings
                </h1>
                <p className="text-gray-500 text-xs">
                    Customize your WhichFloor experience
                </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-8">
                
                {/* Appearance Settings */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Sun className="w-5 h-5" />
                        Appearance
                    </h3>
                    <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-medium">Dark Mode</div>
                                <div className="text-gray-400 text-xs">Switch between light and dark themes</div>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notifications
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-medium">Push Notifications</div>
                                    <div className="text-gray-400 text-xs">Get notified about property updates</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={notifications}
                                        onChange={(e) => setNotifications(e.target.checked)}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-medium">Email Updates</div>
                                    <div className="text-gray-400 text-xs">Weekly digest and important updates</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={emailUpdates}
                                        onChange={(e) => setEmailUpdates(e.target.checked)}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Privacy & Security
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-medium">Private Profile</div>
                                    <div className="text-gray-400 text-xs">Hide your profile from public searches</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={privacyMode}
                                        onChange={(e) => setPrivacyMode(e.target.checked)}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-400/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-white font-medium">Two-Factor Authentication</div>
                                    <div className="text-gray-400 text-xs">Add an extra layer of security</div>
                                </div>
                                <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500 transition">
                                    Enable
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data & Preferences */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Data & Preferences
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                            <div className="text-white font-medium mb-2">Language</div>
                            <select className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded border border-neutral-600 focus:border-yellow-400 outline-none">
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>

                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700">
                            <div className="text-white font-medium mb-2">Currency</div>
                            <select className="w-full bg-[#1a1a1a] text-white px-3 py-2 rounded border border-neutral-600 focus:border-yellow-400 outline-none">
                                <option>INR (₹)</option>
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-800">
                    <button className="flex-1 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition">
                        Save Settings
                    </button>
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="flex-1 bg-gray-700 text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>

        </div>

      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}