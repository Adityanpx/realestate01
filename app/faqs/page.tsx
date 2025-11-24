'use client';
import React, { useState } from 'react';
import { 
  ChevronRight, Phone, Mail, Plus, Minus
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Mock Data ---
const CATEGORIES = [
  "General Questions",
  "Buying Property",
  "Leasing & Rent",
  "Selling Property",
  "Investment",
  "Legal & Documentation"
];

const FAQS = [
  {
    q: "What services does Which Floor Really offer?",
    a: "Which Floor provides a comprehensive range of commercial real estate services including property discovery, leasing assistance, investment consulting, and legal documentation support for both buyers and sellers."
  },
  {
    q: "What types of commercial properties do you deal in?",
    a: "We specialize in office spaces, coworking centers, retail showrooms, warehouses, and managed commercial properties across major metropolitan areas."
  },
  {
    q: "How do you ensure properties listed with you are verified?",
    a: "Our field agents physically visit every property to verify ownership documents, legal status, and physical amenities before listing them on our platform."
  },
  {
    q: "How can you help my business find the right office space?",
    a: "We analyze your team size, budget, location preferences, and future growth plans to recommend the most suitable workspaces, saving you time and negotiation effort."
  },
  {
    q: "What if I want a custom-built office space?",
    a: "We partner with top developers and interior fit-out firms to help you find bare-shell properties and customize them according to your brand guidelines."
  },
  {
    q: "Do you help with legal documentation and due diligence?",
    a: "Yes, our in-house legal team assists with drafting lease agreements, title verification, and registration processes to ensure a hassle-free transaction."
  },
  {
    q: "Can you help with exit strategies or sub-leasing?",
    a: "Absolutely. We help businesses find replacement tenants or sub-lease their unused space to minimize financial liability during exits."
  },
  {
    q: "What if I need a fully furnished or plug-and-play office?",
    a: "We have an extensive inventory of managed offices and coworking spaces that are ready to move in immediately with zero capex."
  },
  {
    q: "What if I want customized interiors in a bareshell property?",
    a: "We can connect you with our trusted network of interior designers and contractors who specialize in commercial fit-outs."
  },
  {
    q: "How big of a space does which floor realty deal in?",
    a: "We handle requirements ranging from small 5-seater private cabins to large corporate campuses spanning over 100,000 sq. ft."
  }
];

// --- Components ---

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden mb-4 transition-all duration-300 hover:border-border/80">
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 text-left"
    >
      <span className={`text-sm font-medium transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground'}`}>
        {question}
      </span>
      <div className={`p-1 rounded-full transition-colors duration-300 ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground'}`}>
         {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <p className="p-5 pt-0 text-muted-foreground text-xs leading-relaxed border-t border-border mt-2 transition-colors duration-300">
        {answer}
      </p>
    </div>
  </div>
);

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground pt-16 transition-colors duration-300">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="px-6 py-6 bg-background transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wider transition-colors duration-300">
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Home</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-primary">FAQs</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 pb-20">
          
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-sm transition-colors duration-300">Find answers to common questions about commercial real estate, property investment, and our services</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              
            {/* Sidebar: Categories */}
            <div className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-4 transition-colors duration-300">
                    <h3 className="text-foreground font-bold text-sm mb-4 px-2">Categories</h3>
                    <div className="space-y-1">
                        {CATEGORIES.map((cat, i) => (
                            <button 
                                key={i}
                                className={`w-full text-left text-xs font-medium py-3 px-4 rounded transition-colors duration-300 ${i === 0 ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Help Card */}
                <div className="bg-card border border-border rounded-xl p-6 text-center transition-colors duration-300">
                    <h3 className="text-foreground font-bold text-sm mb-2">Still Need Help?</h3>
                    <p className="text-muted-foreground text-[10px] mb-6 transition-colors duration-300">Can&apos;t find what you&apos;re looking for? Our experts are here to help.</p>
                    
                    <div className="space-y-3">
                        <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors duration-300 text-xs">
                            <Phone className="w-3 h-3 fill-primary-foreground" /> Call Us Now
                        </button>
                        <button className="w-full bg-transparent border border-border text-foreground font-medium py-3 rounded flex items-center justify-center gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors duration-300 text-xs">
                            <Mail className="w-3 h-3" /> Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content: FAQs */}
            <div>
                <h2 className="text-xl font-bold text-foreground mb-6">General Questions</h2>
                <div>
                    {FAQS.map((faq, i) => (
                        <FAQItem 
                            key={i} 
                            question={faq.q} 
                            answer={faq.a} 
                            isOpen={openIndex === i}
                            onClick={() => toggleFAQ(i)}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center py-12 bg-secondary rounded-2xl border border-border transition-colors duration-300">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Make Smart Investment Decisions?</h2>
            <p className="text-muted-foreground text-sm mb-8 transition-colors duration-300">Get expert consultation along with our powerful calculators</p>
            <button className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:bg-primary/90 transition inline-flex items-center gap-2 text-sm">
                Explore Properties
            </button>
        </div>

      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}