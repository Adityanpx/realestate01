"use client";

import React, { useState } from 'react';
import { 
  ChevronRight, Calculator, 
  TrendingUp, Home, FileText, Check, ArrowRight, X
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';
import EMICalculator from '../../components/calculators/EMICalculator';
import ROICalculator from '../../components/calculators/ROICalculator';
import RentalYieldCalculator from '../../components/calculators/RentalYieldCalculator';
import LeaseCalculator from '../../components/calculators/LeaseCalculator';

// --- Data ---
const CALCULATORS = [
  {
    id: 'emi',
    title: "EMI Calculator",
    desc: "Calculate monthly payments for your home loan EMI with advanced amortization schedules.",
    features: ["Calculate monthly payments", "Compare different loan options", "View EMI breakdown charts"],
    badge: "₹50,000 EMI for 50L Loan",
    icon: Calculator,
    cta: "Try EMI Calculator"
  },
  {
    id: 'roi',
    title: "ROI Calculator",
    desc: "Analyze investment returns for rental properties with comprehensive ROI analysis tools.",
    features: ["Analyze investment returns", "Compare property yields", "Factor in maintenance costs"],
    badge: "12.5% annual ROI projected",
    icon: TrendingUp,
    cta: "Try ROI Calculator"
  },
  {
    id: 'yield',
    title: "Rental Yield Calculator",
    desc: "Calculate gross and net rental yields for pre-leased and rental properties instantly.",
    features: ["Gross & net yield calculations", "Multi-year projections", "Escalation factor analysis"],
    badge: "8.2% rental yield calculation",
    icon: Home,
    cta: "Try Rental Yield Calculator"
  },
  {
    id: 'lease',
    title: "Lease Calculator",
    desc: "Plan lease payments with escalation and tenure analysis for commercial properties.",
    features: ["Lease payment scheduling", "Escalation planning", "Total cost projections"],
    badge: "120 Mo. monthly lease cost",
    icon: FileText,
    cta: "Try Lease Calculator"
  }
];

const STEPS = [
  { num: 1, title: "Enter Details", desc: "Input your property and financial details into our secure tools." },
  { num: 2, title: "Get Calculations", desc: "Receive instant, accurate financial calculations and projections." },
  { num: 3, title: "Make Decisions", desc: "Use insights for informed investment choices and planning." },
];

// --- Components ---

interface CalculatorItem {
  id: string;
  title: string;
  desc: string;
  features: string[];
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  cta: string;
}

const CalculatorCard = ({ item, onOpen }: { item: CalculatorItem; onOpen: (id: string) => void }) => (
  <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-colors duration-300 hover:-translate-y-1 shadow-lg cursor-pointer" onClick={() => onOpen(item.id)}>
    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
      <item.icon className="text-primary w-7 h-7 group-hover:text-primary-foreground transition-colors duration-300" />
    </div>
    
    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
    <p className="text-muted-foreground text-sm mb-6 leading-relaxed min-h-[40px] transition-colors duration-300">{item.desc}</p>
    
    <ul className="text-left w-full space-y-3 mb-8">
      {item.features.map((feat: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-muted-foreground text-xs transition-colors duration-300">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>{feat}</span>
        </li>
      ))}
    </ul>

    <div className="mt-auto w-full">
       <div className="bg-accent border border-border rounded-full py-2 px-4 text-[10px] text-muted-foreground mb-6 inline-block mx-auto w-full transition-colors duration-300">
          {item.badge}
       </div>
       <div className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-lg hover:bg-primary/90 transition shadow-[0_0_15px_rgba(250,204,21,0.2)] flex items-center justify-center">
          {item.cta}
       </div>
    </div>
  </div>
);

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const openCalculator = (calculatorId: string) => {
    setActiveCalculator(calculatorId);
  };

  const closeCalculator = () => {
    setActiveCalculator(null);
  };

  const renderActiveCalculator = () => {
    switch (activeCalculator) {
      case 'emi':
        return <EMICalculator />;
      case 'roi':
        return <ROICalculator />;
      case 'yield':
        return <RentalYieldCalculator />;
      case 'lease':
        return <LeaseCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground pt-16 transition-colors duration-300">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-background px-6 py-4 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium transition-colors duration-300">
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Home</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-primary">Calculators</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
          
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Property Investment Calculators</h1>
            <p className="text-muted-foreground text-sm md:text-base">Make informed decisions with our comprehensive suite of financial tools designed for real estate investors and tenants.</p>
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {CALCULATORS.map((calc) => (
                <CalculatorCard key={calc.id} item={calc} onOpen={openCalculator} />
            ))}
        </div>

        {/* How It Works Section */}
        <div className="mb-24">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-2">How It Works</h2>
                <p className="text-muted-foreground text-sm transition-colors duration-300">Simple 3-step process to get accurate financial calculations</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STEPS.map((step) => (
                    <div key={step.num} className="bg-secondary border border-border p-8 rounded-xl text-center relative group transition-colors duration-300">
                        <div className="w-12 h-12 bg-background text-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-lg z-10 relative">
                            {step.num}
                        </div>
                        <h3 className="text-foreground font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed transition-colors duration-300">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* CTA Section */}
        <div className="bg-secondary rounded-2xl p-12 text-center border border-border relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Make Smart Investment Decisions?</h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-xl mx-auto transition-colors duration-300">Get expert consultation along with our powerful calculators to maximize your property returns.</p>
            <button className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition shadow-lg inline-flex items-center gap-2">
                Explore Properties <ArrowRight className="w-4 h-4" />
            </button>
        </div>

      </main>

      {/* Calculator Modal */}
      {activeCalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border border-border rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {CALCULATORS.find(calc => calc.id === activeCalculator)?.title} Calculator
              </h2>
              <button
                onClick={closeCalculator}
                className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="p-6">
              {renderActiveCalculator()}
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}