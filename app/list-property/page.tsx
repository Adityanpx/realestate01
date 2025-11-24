'use client'
import React, { useState } from 'react';
import { ChevronRight, Phone, Mail, ImageIcon, Upload, Check, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Form Components ---

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const Input = ({ label, placeholder, type = "text", required = false }: InputProps) => (
  <div>
    <label className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-accent text-foreground text-sm px-4 py-3 rounded border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground"
    />
  </div>
);

interface SelectProps {
  label: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}

const Select = ({ label, placeholder, options, required = false }: SelectProps) => (
  <div>
    <label className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select className="w-full bg-accent text-foreground text-sm px-4 py-3 rounded border border-border focus:border-primary outline-none transition-colors duration-300 appearance-none cursor-pointer">
        <option>{placeholder}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

interface CheckboxProps {
  label: string;
}

const Checkbox = ({ label }: CheckboxProps) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input type="checkbox" className="w-4 h-4 accent-primary bg-accent border-border rounded cursor-pointer transition-colors duration-300" />
    <span className="text-muted-foreground text-xs group-hover:text-foreground transition-colors duration-300 capitalize">{label}</span>
  </label>
);

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { num: 1, title: "Basic Info", desc: "Property details" },
    { num: 2, title: "Features", desc: "Amenities & more" },
    { num: 3, title: "Photos", desc: "Upload images" },
    { num: 4, title: "Verify", desc: "Review & submit" }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-8 md:p-10 mb-8 text-center shadow-lg transition-colors duration-300">
      <h1 className="text-3xl text-foreground font-bold mb-2">List Your Property</h1>
      <p className="text-muted-foreground mb-8 transition-colors duration-300">Share your property details and connect with potential tenants</p>
      
      <div className="flex justify-center items-center gap-8 md:gap-16 relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-border">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        {steps.map((step) => {
          const isActive = step.num === currentStep;
          const isCompleted = step.num < currentStep;
          
          return (
            <div key={step.num} className="relative z-10 flex flex-col items-center w-32 md:w-40">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3 transition-all duration-300 ${isActive || isCompleted ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-accent text-muted-foreground border border-border'} ring-8 ring-background transition-colors duration-300`}>
                {isCompleted ? <Check className="w-5 h-5" /> : step.num}
              </div>
              <div className="text-center">
                <h3 className={`text-xs font-bold transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </h3>
                <p className="text-[10px] text-muted-foreground transition-colors duration-300">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="space-y-6">
    {/* Why List Card */}
    <div className="bg-card border border-border rounded-xl p-6 transition-colors duration-300">
      <h3 className="text-foreground font-bold mb-6 text-sm">Why List with WhichFloor?</h3>
      <ul className="space-y-3">
        {[
          "Verified tenants only",
          "Zero brokerage fees", 
          "Professional photography",
          "Market insights & pricing",
          "Dedicated relationship manager"
        ].map((benefit, i) => (
          <li key={i} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-xs transition-colors duration-300">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Help Card */}
    <div className="bg-card border border-border rounded-xl p-6 text-center transition-colors duration-300">
      <h3 className="text-foreground font-bold mb-2 text-sm">Need Help?</h3>
      <p className="text-muted-foreground text-[10px] mb-4 transition-colors duration-300">Our experts are here to guide you through the listing process</p>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-accent text-foreground py-3 rounded hover:bg-accent/80 transition-colors duration-300 text-xs font-bold uppercase">
          <Phone className="w-3 h-3" /> Call Expert
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-accent text-foreground py-3 rounded hover:bg-accent/80 transition-colors duration-300 text-xs font-bold uppercase">
          <Mail className="w-3 h-3" /> Email Us
        </button>
      </div>
    </div>
  </div>
);

export default function ListPropertyPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-background font-sans relative flex flex-col text-foreground selection:bg-primary selection:text-primary-foreground pt-16 transition-colors duration-300">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-background transition-colors duration-300 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wide transition-colors duration-300">
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Home</span>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span className="text-primary">List Property</span>
        </div>
      </div>

      <main className="flex-1 max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          
          {/* Main Form Area */}
          <div className="bg-card border border-border rounded-xl p-8 md:p-10 h-fit transition-colors duration-300">
            <Stepper currentStep={currentStep} />

            {/* Form Content */}
            <form className="space-y-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Property Title" placeholder="e.g., Premium Office Space in MG Road" required />
                    <Select 
                      label="Property Type" 
                      placeholder="Select Type" 
                      options={["Office", "Coworking", "Managed Office", "Retail", "Warehouse"]}
                      required 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Area (sq ft)" placeholder="e.g., 5000" type="number" required />
                    <Input label="Monthly Rent (₹)" placeholder="e.g., 500000" type="number" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Security Deposit" placeholder="e.g., 6 months rent" />
                    <Input label="Lock-in Period" placeholder="e.g., 3 years" />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                      Property Description <span className="text-red-500">*</span>
                    </label>
                    <textarea rows={4} placeholder="Describe your property in detail..." className="w-full bg-accent text-foreground text-sm px-4 py-3 rounded border border-border focus:border-primary outline-none transition-colors duration-300 placeholder-muted-foreground resize-none" />
                    <p className="text-muted-foreground text-[10px] mt-1 text-right transition-colors duration-300">Minimum 100 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Floor" placeholder="e.g., 5th Floor" />
                    <Input label="Total Floors" placeholder="e.g., 15" type="number" />
                  </div>
                </div>
              )}

              {/* Step 2: Features & Amenities */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-foreground font-bold mb-4">Property Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Furnished", "Air Conditioning", "Power Backup", 
                        "Parking", "Security", "Elevator",
                        "Conference Room", "Reception", "Cafeteria",
                        "High Speed Internet", "House Keeping", "Mail Service"
                      ].map((feature) => (
                        <Checkbox key={feature} label={feature} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select 
                      label="Furnishing Status" 
                      placeholder="Select Status" 
                      options={["Fully Furnished", "Semi Furnished", "Bare Shell"]}
                    />
                    <Select 
                      label="Availability" 
                      placeholder="When Available" 
                      options={["Immediately", "1 Month", "3 Months", "6 Months"]}
                    />
                  </div>

                  <Input label="Additional Amenities" placeholder="List any other amenities..." />
                </div>
              )}

              {/* Step 3: Photos */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-foreground font-bold mb-4">Property Photos</h3>
                    <div className="border-2 border-dashed border-border rounded-xl bg-accent/50 p-12 text-center hover:border-primary/50 transition-colors duration-300 group cursor-pointer">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                        <ImageIcon className="text-muted-foreground w-8 h-8 group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <p className="text-foreground font-bold text-sm mb-2">Upload Property Photos</p>
                      <p className="text-muted-foreground text-xs transition-colors duration-300">Drag & drop or click to upload. Max 10 photos, 5MB each.</p>
                      <button className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded text-sm font-bold hover:bg-primary/90 transition-colors duration-300">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Photo Preview Slots */}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-accent rounded-lg border border-border flex items-center justify-center">
                        <span className="text-muted-foreground text-xs transition-colors duration-300">Photo {i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-foreground font-bold mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Your Name" placeholder="Full Name" required />
                      <Input label="Phone Number" placeholder="+91 9876543210" type="tel" required />
                    </div>
                    <Input label="Email" placeholder="your.email@example.com" type="email" required />
                    <Input label="Company/Organization" placeholder="Company name (optional)" />
                  </div>

                  <div className="bg-accent p-4 rounded-lg flex gap-3 items-start border border-border transition-colors duration-300">
                    <input type="checkbox" className="mt-1 accent-primary bg-transparent cursor-pointer border-border rounded transition-colors duration-300" />
                    <div className="space-y-2">
                      <p className="text-foreground text-xs font-bold">Terms & Conditions</p>
                      <p className="text-muted-foreground text-[10px] leading-relaxed transition-colors duration-300">
                        I confirm that all information provided is accurate and I agree to the terms and conditions. 
                        I understand that WhichFloor may contact me regarding my property listing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-border">
                {currentStep > 1 ? (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border border-border text-foreground rounded font-bold hover:bg-accent transition-colors duration-300"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}

                {currentStep < 4 ? (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded font-bold hover:bg-primary/90 transition-colors duration-300"
                  >
                    Next Step
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-emerald-500 text-white rounded font-bold hover:bg-emerald-600 transition-colors duration-300 shadow-lg"
                  >
                    Submit Listing
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}