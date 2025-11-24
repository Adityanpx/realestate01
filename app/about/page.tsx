"use client";
import React from 'react';
import Image from 'next/image';
import { 
  ChevronRight, Target, Eye, Users, CheckCircle2, MapPin, 
  Trophy, ShieldCheck, Handshake, Star, Heart, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Data ---
const STATS = [
  { val: "50K+", label: "Happy Customers", icon: Users },
  { val: "10K+", label: "Properties Verified", icon: CheckCircle2 },
  { val: "30+", label: "Cities Covered", icon: MapPin },
  { val: "15+", label: "Industry Awards", icon: Trophy },
];

const VALUES = [
  { 
    title: "Transparency", 
    desc: "Complete transparency in all property listings, pricing, and processes with zero hidden fees.", 
    icon: ShieldCheck 
  },
  { 
    title: "Trust", 
    desc: "Building lasting relationships through verified listings and reliable service delivery.", 
    icon: Handshake 
  },
  { 
    title: "Excellence", 
    desc: "Committed to providing exceptional service and innovative solutions for property seekers.", 
    icon: Star 
  },
  { 
    title: "Customer First", 
    desc: "Every decision we make is centered around creating value for our customers and partners.", 
    icon: Heart 
  },
];

const LEADERS = [
  { name: "Rajesh Kumar", role: "Founder & CEO" },
  { name: "Priya Sharma", role: "Co-founder & CTO" },
  { name: "Amit Patel", role: "Chief Operating Officer" },
];

// --- Components ---

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pt-16 transition-colors duration-300">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="px-6 py-6 bg-background transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wider transition-colors duration-300">
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Home</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-primary">About Us</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 pb-20">
        
        {/* Enhanced Section 1: Our Story */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
            <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1 
                    className="text-5xl font-bold text-foreground mb-8"
                    whileHover={{ 
                        scale: 1.02,
                        textShadow: "0 0 20px rgba(250, 204, 21, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    Our Story
                </motion.h1>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Founded in 2020, WhichFloor emerged from a simple yet powerful vision: to make property discovery and transaction transparent, efficient, and accessible to everyone in India. Our founders, experienced professionals from the real estate and technology sectors, recognized the need for a platform that could bridge the gap between property seekers and genuine opportunities.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        What started as a mission to eliminate brokerage fees and hidden costs has evolved into India&apos;s most trusted property platform. We&apos;ve built a comprehensive ecosystem that includes verified listings, expert guidance, financial tools, and market insights—all designed to empower informed property decisions.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Today, WhichFloor serves over 50,000 customers across 30+ cities, with a growing network of verified properties and trusted partners. Our commitment to transparency, innovation, and customer success continues to drive everything we do.
                    </motion.p>
                </div>
            </motion.div>
            <motion.div 
                className="flex-1 relative h-[500px] w-full"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
            >
                {/* Enhanced image container with multiple layers */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-yellow-400/10 to-transparent rounded-3xl transform rotate-3"
                    animate={{ 
                        rotate: [3, 5, 3],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute inset-0 rounded-3xl overflow-hidden bg-card border border-border shadow-2xl"
                    whileHover={{ 
                        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                        borderColor: "var(--primary)"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Image 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                        alt="Office Interior" 
                        fill 
                        className="object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
                
                {/* Floating elements */}
                <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
                    animate={{
                        scale: [1, 0.8, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
            </motion.div>
        </div>

        {/* Section 2: Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {/* Mission */}
            <div className="bg-secondary border border-border rounded-2xl p-12 text-center group hover:border-primary/30 transition">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition duration-500">
                    <Target className="w-8 h-8 text-primary group-hover:text-primary-foreground transition duration-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    To democratize real estate by providing transparent, tech-driven solutions that make property transactions simple, secure, and accessible for everyone.
                </p>
            </div>

            {/* Vision */}
            <div className="bg-secondary border border-border rounded-2xl p-12 text-center group hover:border-primary/30 transition">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition duration-500">
                    <Eye className="w-8 h-8 text-primary group-hover:text-primary-foreground transition duration-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    To become India&apos;s most trusted property platform, where every property seeker finds their perfect match through innovative technology and expert guidance.
                </p>
            </div>
        </div>

        {/* Section 3: About Whichfloor (Stats) */}
        <div className="mb-32">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-2">About <span className="text-primary">Whichfloor</span></h2>
                <p className="text-muted-foreground text-sm">Revolutionizing Property Discovery in India</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-secondary border border-border p-8 rounded-2xl text-center hover:-translate-y-1 transition duration-300">
                        <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 stroke-[1.5]" />
                        <h3 className="text-3xl font-bold text-foreground mb-1">{stat.val}</h3>
                        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Section 4: Our Values */}
        <div className="mb-32">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {VALUES.map((val, i) => (
                    <div key={i} className="bg-secondary border border-border p-8 rounded-2xl text-center group hover:bg-accent transition">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <val.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-foreground font-bold mb-3">{val.title}</h3>
                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                            {val.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>

        {/* Section 5: Leadership */}
        <div className="mb-32">
             <h2 className="text-2xl font-bold text-foreground text-center mb-12">Our Leadership</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {LEADERS.map((leader, i) => (
                    <div key={i} className="bg-secondary border border-border rounded-2xl p-8 text-center hover:border-primary/30 transition">
                        <div className="w-24 h-24 mx-auto bg-accent rounded-full mb-6 flex items-center justify-center text-xs text-muted-foreground font-medium">
                             {/* Placeholder for avatar */}
                             <Users className="w-8 h-8 opacity-20" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{leader.name}</h3>
                        <p className="text-primary text-xs uppercase font-bold tracking-wider">{leader.role}</p>
                    </div>
                ))}
             </div>
        </div>

        {/* CTA */}
        <div className="bg-secondary rounded-2xl p-12 text-center border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Make Smart Investment Decisions?</h2>
            <p className="text-muted-foreground text-sm mb-8">Get expert consultation along with our powerful calculators</p>
            <button className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:bg-primary/90 transition inline-block">
                Explore Properties
            </button>
        </div>

      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}