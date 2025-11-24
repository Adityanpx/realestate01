'use client';

import React from 'react';
import { User, Mail, Phone, MapPin, Edit3 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#121212] font-sans text-white selection:bg-yellow-400 selection:text-black flex flex-col pt-16">
      <Navbar />
      
      <div className="px-6 py-6 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto flex items-center text-gray-500 text-xs font-medium uppercase tracking-wider">
          <span className="hover:text-white cursor-pointer" onClick={() => window.location.href = '/'}>Home</span>
          <span className="mx-2">/</span>
          <span className="text-yellow-400">Profile</span>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 pt-10">
        
        {/* Profile Card */}
        <div className="w-full max-w-[600px] bg-[#1E1E1E] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-black" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                    Profile Settings
                </h1>
                <p className="text-gray-500 text-xs">
                    Manage your personal information and account preferences
                </p>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
                
                {/* Personal Information */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Full Name</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    defaultValue="John Doe"
                                    className="w-full bg-[#252525] text-white text-sm px-4 py-3 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition pl-10"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Email Address</label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="john.doe@example.com"
                                    defaultValue="john.doe@example.com"
                                    className="w-full bg-[#252525] text-white text-sm px-4 py-3 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition pl-10"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Phone Number</label>
                            <div className="relative">
                                <input 
                                    type="tel" 
                                    placeholder="+91 98765 43210"
                                    defaultValue="+91 98765 43210"
                                    className="w-full bg-[#252525] text-white text-sm px-4 py-3 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition pl-10"
                                />
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Location</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Mumbai, India"
                                    defaultValue="Mumbai, India"
                                    className="w-full bg-[#252525] text-white text-sm px-4 py-3 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition pl-10"
                                />
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Statistics */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Account Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700 text-center">
                            <div className="text-2xl font-bold text-yellow-400 mb-1">12</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Properties Viewed</div>
                        </div>
                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700 text-center">
                            <div className="text-2xl font-bold text-yellow-400 mb-1">3</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Saved Properties</div>
                        </div>
                        <div className="bg-[#252525] p-4 rounded-lg border border-neutral-700 text-center">
                            <div className="text-2xl font-bold text-yellow-400 mb-1">1</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Inquiry Made</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button className="flex-1 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Save Changes
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