'use client';

import React, { useState } from 'react';
import { 
  ChevronRight, Eye, EyeOff, 
  User, Lock, Smartphone, Mail
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';
import { useAuth } from '../../contexts/AuthContext';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const { handleSignUpSuccess } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    // Simulate signup success
    handleSignUpSuccess();
    alert('Account created successfully! Please log in.');
    
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 font-sans text-foreground selection:bg-primary selection:text-primary-foreground flex flex-col pt-16 transition-colors duration-300">
      <Navbar />
      
      <div className="px-6 py-6 bg-background dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wider transition-colors duration-300">
          <span className="hover:text-foreground cursor-pointer transition-colors duration-300" onClick={() => window.location.href = '/'}>Home</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-primary">Create Account</span>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 pt-10">
         
        {/* Signup Card */}
        <div className="w-full max-w-[480px] bg-card dark:bg-gray-800 border border-border rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-colors duration-300">
             
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                    Create Account
                </h1>
                <p className="text-muted-foreground text-xs transition-colors duration-300">
                    Join us to find your perfect commercial space
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name */}
                <div>
                    <label className="block text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">Full Name</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full bg-accent dark:bg-gray-700 text-foreground text-sm px-4 py-3.5 rounded-lg border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground pl-10"
                        />
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-300" />
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">Phone Number</label>
                    <div className="relative">
                        <input 
                            type="tel" 
                            name="phone"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-accent dark:bg-gray-700 text-foreground text-sm px-4 py-3.5 rounded-lg border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground pl-10"
                        />
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-300" />
                    </div>
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">Email Address</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full bg-accent dark:bg-gray-700 text-foreground text-sm px-4 py-3.5 rounded-lg border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-300" />
                    </div>
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-accent dark:bg-gray-700 text-foreground text-sm px-4 py-3.5 rounded-lg border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground pl-10 pr-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-300" />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-muted-foreground text-[11px] font-bold uppercase tracking-wider mb-2 transition-colors duration-300">Confirm Password</label>
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full bg-accent dark:bg-gray-700 text-foreground text-sm px-4 py-3.5 rounded-lg border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground pl-10 pr-10"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-300" />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:bg-primary/90 transition shadow-[0_0_20px_rgba(250,204,21,0.15)] mt-2"
                >
                    Create Account
                </button>

                {/* Toggle Text */}
                <p className="text-center text-muted-foreground text-xs mt-6 transition-colors duration-300">
                    Already have an account?{' '}
                    <button 
                        type="button" 
                        onClick={() => window.location.href = '/login'}
                        className="text-primary font-bold hover:underline"
                    >
                        Login
                    </button>
                </p>
            </form>

        </div>

      </main>

      {/* Pre-Footer CTA */}
      <div className="bg-secondary dark:bg-gray-800 py-16 text-center border-t border-border transition-colors duration-300">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Make Smart Investment Decisions?</h2>
            <p className="text-muted-foreground text-sm mb-8 transition-colors duration-300">Get expert consultation along with our powerful calculators</p>
            <button 
                onClick={() => window.location.href = '/'}
                className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:bg-primary/90 transition inline-flex items-center gap-2 text-sm"
            >
                Explore Properties
            </button>
      </div>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}