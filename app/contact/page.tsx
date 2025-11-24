"use client";
import React from 'react';
import { 
  ChevronRight, Phone, Mail, MapPin, ArrowRight, ChevronDown, Send, MessageCircle, Clock, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Components ---

const InputGroup = ({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) => (
  <div className="flex-1">
    <label className="block text-muted-foreground text-xs mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full bg-accent text-foreground text-sm px-4 py-3 rounded border border-border focus:border-primary outline-none transition placeholder-muted-foreground"
      />
    </div>
  </div>
);

const SelectGroup = ({ label, options }: { label: string, options: string[] }) => (
  <div className="flex-1">
    <label className="block text-muted-foreground text-xs mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <select className="w-full bg-accent text-foreground text-sm px-4 py-3 rounded border border-border focus:border-primary outline-none transition appearance-none cursor-pointer">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground pt-16">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="px-6 py-6 bg-background">
        <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wider">
            <span className="hover:text-foreground cursor-pointer">Home</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-primary">Contact Us</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 pb-12">
        
        {/* Top Section: Form & Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 mb-16">
            
            {/* Enhanced Contact Form */}
            <motion.div 
                className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    borderColor: "var(--primary)"
                }}
            >
                <motion.h1 
                    className="text-3xl font-bold text-foreground mb-8"
                    whileHover={{ 
                        scale: 1.02,
                        textShadow: "0 0 20px rgba(250, 204, 21, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    Send us a Message
                </motion.h1>
                <form className="space-y-8">
                    <motion.div 
                        className="flex flex-col md:flex-row gap-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <InputGroup label="Full Name" placeholder="Enter your full name" />
                        <InputGroup label="Email Address" placeholder="your.email@example.com" type="email" />
                    </motion.div>
                    <motion.div 
                        className="flex flex-col md:flex-row gap-6"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <InputGroup label="Phone Number" placeholder="+91 9999999999" type="tel" />
                        <SelectGroup label="Subject" options={["General Inquiry", "Property Listing", "Partnership", "Support"]} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <label className="block text-muted-foreground text-sm mb-3 font-medium">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <motion.textarea 
                            rows={5}
                            placeholder="Please describe your inquiry in detail..."
                            className="w-full bg-accent text-foreground text-sm px-4 py-4 rounded-xl border border-border focus:border-primary outline-none transition-all duration-300 placeholder-muted-foreground resize-none hover:border-accent-foreground focus:shadow-lg"
                            whileFocus={{ 
                                scale: 1.02,
                                borderColor: "var(--primary)",
                                boxShadow: "0 0 0 3px rgba(250, 204, 21, 0.1)"
                            }}
                        />
                    </motion.div>
                    <motion.button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold py-4 rounded-xl hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-xl relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(250, 204, 21, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Button shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            Send Message
                        </div>
                    </motion.button>
                </form>
            </motion.div>

            {/* Enhanced Immediate Help Card */}
            <motion.div 
                className="h-fit"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <motion.div 
                    className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center shadow-lg relative overflow-hidden"
                    whileHover={{ 
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                        borderColor: "var(--primary)"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Background gradient */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
                        animate={{
                            background: [
                                "linear-gradient(135deg, rgba(250, 204, 21, 0.05) 0%, transparent 50%, rgba(250, 204, 21, 0.05) 100%)",
                                "linear-gradient(225deg, rgba(250, 204, 21, 0.05) 0%, transparent 50%, rgba(250, 204, 21, 0.05) 100%)"
                            ]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="relative z-10">
                        <motion.div
                            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
                            whileHover={{ 
                                scale: 1.1,
                                backgroundColor: "var(--primary)/20"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <MessageCircle className="w-8 h-8 text-primary" />
                        </motion.div>
                        
                        <motion.h3 
                            className="text-2xl font-bold text-foreground mb-3"
                            whileHover={{ 
                                scale: 1.05,
                                color: "var(--primary)"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Need Immediate Help?
                        </motion.h3>
                        <p className="text-muted-foreground text-sm mb-8">
                            For urgent property inquiries, contact us directly
                        </p>
                        
                        <div className="space-y-4">
                            <motion.button 
                                className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:from-primary/90 hover:to-primary transition-all shadow-lg hover:shadow-xl relative overflow-hidden group"
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: "0 10px 30px rgba(250, 204, 21, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Button shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="relative z-10 flex items-center gap-3">
                                    <Phone className="w-5 h-5 fill-primary-foreground" />
                                    <span>+91 7350781321</span>
                                </div>
                            </motion.button>
                            
                            <motion.button 
                                className="w-full bg-transparent border-2 border-border text-foreground font-medium py-4 rounded-xl flex items-center justify-center gap-3 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm relative overflow-hidden group"
                                whileHover={{ 
                                    scale: 1.02,
                                    borderColor: "var(--primary)",
                                    color: "var(--primary)",
                                    backgroundColor: "var(--primary)/5"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Mail className="w-5 h-5" />
                                info@whichfloor.in
                            </motion.button>
                        </div>
                        
                        {/* Response time indicator */}
                        <motion.div
                            className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div
                                className="w-2 h-2 bg-green-500 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span>Typically responds within 2 hours</span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
             <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-foreground mb-1">Find Us on Map</h2>
                <p className="text-muted-foreground text-sm">Visit our office for a personalized consultation</p>
             </div>
             
             <div className="w-full h-[400px] bg-secondary border border-border rounded-2xl overflow-hidden relative">
                 {/* Simulated Map UI */}
                 <div className="absolute inset-0 bg-accent flex items-center justify-center">
                     <div className="text-center opacity-50">
                        <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm font-mono">Interactive Map View</p>
                     </div>
                 </div>
                 {/* Map Overlay Gradient */}
                 <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background to-transparent opacity-20"></div>
             </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Make Smart Investment Decisions?</h2>
            <p className="text-muted-foreground text-sm mb-8">Get expert consultation along with our powerful calculators</p>
            <button className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:bg-primary/90 transition inline-flex items-center gap-2">
                Explore Properties
            </button>
        </div>

      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}