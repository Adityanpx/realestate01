'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, Eye, EyeOff, 
  User, Lock, Smartphone, Mail
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-[#121212] font-sans text-white selection:bg-yellow-400 selection:text-black flex flex-col pt-16">
      <Navbar />
      
      <div className="px-6 py-6 bg-[#121212]">
        <div className="max-w-[1400px] mx-auto flex items-center text-gray-500 text-xs font-medium uppercase tracking-wider">
            <span className="hover:text-white cursor-pointer">Home</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-yellow-400">{activeTab === 'login' ? 'Login' : 'Create Account'}</span>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 pt-10">
        
        {/* Auth Card */}
        <div className="w-full max-w-[480px] bg-[#1E1E1E] border border-white/5 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>

            {/* Tabs */}
            <div className="flex bg-[#252525] rounded-lg p-1 mb-8 border border-white/5">
                <button 
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-3 text-sm font-bold rounded-md transition-all duration-300 ${activeTab === 'login' ? 'bg-yellow-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 py-3 text-sm font-bold rounded-md transition-all duration-300 ${activeTab === 'signup' ? 'bg-yellow-400 text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                    Sign Up
                </button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">
                    {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
                </h1>
                <p className="text-gray-500 text-xs">
                    {activeTab === 'login' 
                        ? 'Sign in to access your property dashboard' 
                        : 'Join us to find your perfect commercial space'}
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
                
                {/* Sign Up Extra Fields */}
                {activeTab === 'signup' && (
                    <>
                        <div>
                            <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Full Name</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="John Doe"
                                    className="w-full bg-[#252525] text-white text-sm px-4 py-3.5 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition placeholder-neutral-600 pl-10"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Phone Number</label>
                            <div className="relative">
                                <input 
                                    type="tel" 
                                    placeholder="+91 98765 43210"
                                    className="w-full bg-[#252525] text-white text-sm px-4 py-3.5 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition placeholder-neutral-600 pl-10"
                                />
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                            </div>
                        </div>
                    </>
                )}

                {/* Email Input (Common) */}
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Email Address</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="your.email@example.com"
                            className="w-full bg-[#252525] text-white text-sm px-4 py-3.5 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition placeholder-neutral-600 pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </div>
                </div>

                {/* Password Input (Common) */}
                <div>
                    <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password"
                            className="w-full bg-[#252525] text-white text-sm px-4 py-3.5 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition placeholder-neutral-600 pl-10 pr-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password (Sign Up Only) */}
                {activeTab === 'signup' && (
                    <div>
                        <label className="block text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">Confirm Password</label>
                        <div className="relative">
                            <input 
                                type="password" 
                                placeholder="Re-enter your password"
                                className="w-full bg-[#252525] text-white text-sm px-4 py-3.5 rounded-lg border border-neutral-700 focus:border-yellow-400 outline-none transition placeholder-neutral-600 pl-10"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        </div>
                    </div>
                )}

                {/* Login Actions */}
                {activeTab === 'login' && (
                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="accent-yellow-400 w-4 h-4 bg-[#252525] border-neutral-600 rounded cursor-pointer" />
                            <span className="text-gray-400 text-xs group-hover:text-gray-300 transition">Remember me</span>
                        </label>
                        <a href="#" className="text-yellow-400 text-xs font-bold hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                )}

                {/* Submit Button */}
                <button className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition shadow-[0_0_20px_rgba(250,204,21,0.15)] mt-2">
                    {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                {/* Toggle Text */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        type="button" 
                        onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                        className="text-yellow-400 font-bold hover:underline"
                    >
                        {activeTab === 'login' ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </form>

        </div>

      </main>

      {/* Pre-Footer CTA */}
      <div className="bg-[#1A1A1A] py-16 text-center border-t border-white/5">
            <h2 className="text-2xl font-bold text-white mb-2">Ready to Make Smart Investment Decisions?</h2>
            <p className="text-gray-400 text-sm mb-8">Get expert consultation along with our powerful calculators</p>
            <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded hover:bg-yellow-500 transition inline-flex items-center gap-2 text-sm">
                Explore Properties
            </button>
      </div>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}