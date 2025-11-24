'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, MapPin, ChevronLeft, ChevronRight, Building2, Check, ArrowRight, Menu, User, Star, ChevronDown  } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

// --- Data Mocks to match the screenshot's density ---
const DATA = {
  coworking: [
    { title: "WeWork Galaxy", loc: "Residency Road", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
    { title: "IndiQube Gamma", loc: "HSR Layout", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" },
    { title: "91Springboard", loc: "Koramangala", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800" },
  ],
  logos: Array(12).fill(0).map((_, i) => `Logo ${i + 1}`),
  testimonials: [
    { name: "Arjun Mehta", role: "Founder, TechFlow", text: "The platform helped us find a space that perfectly reflects our brand culture." },
    { name: "Sarah Jenkins", role: "Director, CreativeSo", text: "Incredible service. The team understood our needs immediately." },
    { name: "Rahul Dravid", role: "Manager, Sporty", text: "Smooth transaction and great options provided in the city center." }
  ]
};

// --- Components ---

const HeroSection = () => {
  // React state for tab management
  const [activeTopTab, setActiveTopTab] = useState("Lease Commercial");
  const [activeSubTab, setActiveSubTab] = useState("Office/Commercial");

  // Define sub-tab options for each top tab
  const subTabOptions = {
    "Lease Commercial": ["Office/Commercial", "Coworking", "Managed Office"],
    "Buy Commercial": ["Offices", "Commercial Projects", "Upcoming Projects"],
    "Preleased": ["Showroom", "Offices"]
  };

  // Get current sub-tab options based on active top tab
  const currentSubTabs = subTabOptions[activeTopTab as keyof typeof subTabOptions];

  // Get placeholder text based on current selection
  const getPlaceholderText = () => {
    if (activeTopTab === "Lease Commercial") {
      if (activeSubTab === "Office/Commercial") return "Search Office/Commercial";
      if (activeSubTab === "Coworking") return "Search Coworking Space";
      if (activeSubTab === "Managed Office") return "Search Managed Office";
    } else if (activeTopTab === "Buy Commercial") {
      if (activeSubTab === "Offices") return "Search Offices for Sale";
      if (activeSubTab === "Commercial Projects") return "Search Commercial Projects";
      if (activeSubTab === "Upcoming Projects") return "Search Upcoming Projects";
    } else if (activeTopTab === "Preleased") {
      if (activeSubTab === "Showroom") return "Search Showroom";
      if (activeSubTab === "Offices") return "Search Preleased Offices";
    }
    return "Search...";
  };

  // Handle top tab change
  const handleTopTabChange = (tabName: string) => {
    setActiveTopTab(tabName);
    // Set first sub-tab as active when top tab changes
    const newSubTabs = subTabOptions[tabName as keyof typeof subTabOptions];
    setActiveSubTab(newSubTabs[0]);
  };

  return (
    <section className="relative h-[80vh] w-full flex flex-col justify-center items-center px-4 text-center">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover brightness-[0.35] dark:brightness-[0.35] light:brightness-[0.6]"
          priority
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-5xl w-full">

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white dark:text-white light:text-gray-900 mb-4 leading-tight">
          Which floor are you looking at?
        </h1>
        <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-base md:text-lg mb-8 md:mb-10">
          We will take you there
        </p>

        {/* Main Search Box Container */}
        <div className="bg-white/95 dark:bg-white/95 light:bg-white backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-200 light:border-gray-300 shadow-xl pt-4">

          {/* Top Tabs - Mobile Select */}
          <div className="md:hidden px-4 mb-5">
            <select
              value={activeTopTab}
              onChange={(e) => handleTopTabChange(e.target.value)}
              className="w-full px-4 py-2 rounded-full font-semibold text-sm bg-white border border-gray-200 text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {Object.keys(subTabOptions).map((tabName) => (
                <option key={tabName} value={tabName}>
                  {tabName}
                </option>
              ))}
            </select>
          </div>

          {/* Top Tabs - Desktop Buttons */}
          <div className="hidden md:flex justify-center gap-2 lg:gap-4 mb-5 px-4">
            {Object.keys(subTabOptions).map((tabName) => (
              <button
                key={tabName}
                onClick={() => handleTopTabChange(tabName)}
                className={`px-3 lg:px-5 py-2 rounded-full font-semibold text-xs lg:text-sm transition-all duration-200 cursor-pointer ${
                  activeTopTab === tabName
                    ? 'bg-yellow-400 text-black shadow-lg'
                    : 'text-gray-600 dark:text-gray-600 light:text-gray-700 dark:hover:text-yellow-600 dark:hover:bg-yellow-50 light:hover:text-yellow-600 light:hover:bg-yellow-50'
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Category Tabs - Dynamic */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-8 border-b border-gray-200 dark:border-gray-200 light:border-gray-300 pb-4 text-gray-600 dark:text-gray-600 light:text-gray-700 mb-5 px-4">
            {currentSubTabs.map((subTabName) => (
              <button
                key={subTabName}
                onClick={() => setActiveSubTab(subTabName)}
                className={`px-2 md:px-4 lg:px-5 py-1 font-semibold transition-all duration-200 text-xs md:text-sm rounded-full cursor-pointer ${
                  activeSubTab === subTabName
                    ? 'bg-yellow-500/20 border border-yellow-400 text-yellow-600 shadow-lg'
                    : 'dark:hover:text-yellow-600 dark:hover:bg-yellow-50 light:hover:text-yellow-600 light:hover:bg-yellow-50'
                }`}
              >
                {subTabName}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-4 px-4 md:px-6 pb-6">

            <div className="flex-1 bg-gray-50 dark:bg-gray-50 light:bg-gray-100 px-4 py-3 rounded-xl flex items-center justify-between border border-gray-200 dark:border-gray-200 light:border-gray-300 hover:border-yellow-400/40 transition cursor-pointer">
              <span className="text-gray-700 dark:text-gray-700 light:text-gray-800 text-sm">Cities</span>
              <ChevronDown className="text-gray-500 dark:text-gray-500 light:text-gray-600 w-4 h-4" />
            </div>

            <input
              type="text"
              className="flex-1 bg-gray-50 dark:bg-gray-50 light:bg-gray-100 px-4 py-3 rounded-xl text-gray-900 dark:text-gray-900 light:text-gray-900 placeholder-gray-500 dark:placeholder-gray-500 light:placeholder-gray-500 border border-gray-200 dark:border-gray-200 light:border-gray-300 hover:border-yellow-400/40 transition outline-none text-sm cursor-text"
              placeholder={getPlaceholderText()}
            />

            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 md:px-8 lg:px-10 py-3 rounded-xl transition text-sm hover:scale-105 active:scale-95 cursor-pointer">
              Explore
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <motion.div 
    className="mb-10 px-6 md:px-12"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
    <motion.div 
      className="h-1.5 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    ></motion.div>
  </motion.div>
);

interface PropertyCardProps {
  title: string;
  loc: string;
  img: string;
}

const PropertyCard = ({ item }: { item: PropertyCardProps }) => (
  <motion.div 
    className="min-w-[300px] md:min-w-[360px] snap-center group cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -8 }}
  >
    <motion.div 
      className="relative h-56 rounded-2xl overflow-hidden mb-4 border border-border transition-colors duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition duration-700" />
      <motion.div 
        className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        Verified
      </motion.div>
    </motion.div>
    <div className="px-2">
      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
      <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3">
        <MapPin className="w-3 h-3 text-primary" /> {item.loc}, Bangalore
      </p>
      <div className="flex gap-2 mb-4">
        {['Wifi', 'Coffee', 'Meeting'].map((tag, idx) => (
          <motion.span 
            key={tag} 
            className="text-[10px] text-muted-foreground border border-border px-2 py-1 rounded hover:border-primary hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * idx }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      <motion.button 
        className="w-full border border-border text-foreground text-xs uppercase tracking-widest font-semibold py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View Details
      </motion.button>
    </div>
  </motion.div>
);

const CarouselSection = ({ title }: { title: string }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380; // Card width + gap
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.section 
      className="py-12 bg-background border-b border-border relative transition-colors duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <SectionHeader title={title} />
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-4 snap-x scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {DATA.coworking.map((item, i) => (
          <PropertyCard key={i} item={item} />
        ))}
        {DATA.coworking.map((item, i) => (
          <PropertyCard key={i + 3} item={item} />
        ))}
      </div>
      
      {/* Arrow Controls Below */}
      <div className="flex justify-center gap-6 mt-8 px-6">
        <motion.button
          onClick={() => scroll('left')}
          className="group relative w-14 h-14 rounded-full bg-muted border-2 border-border flex items-center justify-center text-foreground hover:border-primary transition-all shadow-xl overflow-hidden"
          whileHover={{ scale: 1.2, rotate: -10 }}
          whileTap={{ scale: 0.85 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          />
          <ChevronLeft className="w-7 h-7 relative z-10 group-hover:text-black transition-colors duration-300" />
        </motion.button>
        <motion.button
          onClick={() => scroll('right')}
          className="group relative w-14 h-14 rounded-full bg-muted border-2 border-border flex items-center justify-center text-foreground hover:border-primary transition-all shadow-xl overflow-hidden"
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.85 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          />
          <ChevronRight className="w-7 h-7 relative z-10 group-hover:text-black transition-colors duration-300" />
        </motion.button>
      </div>
    </motion.section>
  );
};

const YellowPromo = () => (
  <section
    className="px-4 py-16 bg-background transition-colors duration-300"
  >
    <div
      className="max-w-6xl mx-auto bg-[#FACC15] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div className="max-w-xl">
        <div
          className="flex items-center gap-2 mb-4"
        >
          <Building2 className="w-6 h-6 text-black" />
          <span className="text-xs font-black uppercase tracking-widest">For Owners</span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-black text-black mb-4 leading-tight"
        >
          Got a space? <br/> We'll fill it.
        </h2>
        <p
          className="text-black/80 font-medium text-lg"
        >
          List your commercial property with WhichFloor and connect with premium tenants instantly.
        </p>
      </div>
      <button
        className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-neutral-800 transition flex items-center gap-2 whitespace-nowrap"
      >
        List Your Space <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </section>
);

const DarkValueProp = () => (
  <section
    className="bg-background py-20 px-4 transition-colors duration-300"
  >
    <div
      className="max-w-4xl mx-auto bg-card rounded-[2.5rem] border border-border p-10 md:p-16 text-center relative overflow-hidden"
    >
      {/* Decor */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]"
      ></div>

      <div
        className="w-16 h-16 bg-muted rounded-2xl mx-auto flex items-center justify-center mb-8 border border-border"
      >
        <Star className="w-8 h-8 text-primary fill-primary" />
      </div>

      <h2
        className="text-3xl md:text-5xl font-bold text-foreground mb-6"
      >
        We simplify the <span className="text-primary italic">search</span>.
      </h2>
      <p
        className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg mx-auto"
      >
        Our AI-driven engine matches your specific requirements with the best available inventory in real-time. No brokerage, no hassle.
      </p>

      <button
        className="text-foreground border-b border-primary pb-1 hover:text-primary transition"
      >
        Read more about our process
      </button>
    </div>
  </section>
);

const LogoGrid = ({ title }: { title?: string }) => {
  const companyLogos = [
    { name: "MICROSOFT", icon: "⊞" },
    { name: "GOOGLE", icon: "G" },
    { name: "AMAZON", icon: "a" },
    { name: "META", icon: "f" },
    { name: "APPLE", icon: "" },
    { name: "NETFLIX", icon: "N" },
    { name: "TESLA", icon: "T" },
    { name: "SPOTIFY", icon: "♫" },
    { name: "ADOBE", icon: "Aa" },
    { name: "ORACLE", icon: "○" },
    { name: "IBM", icon: "IBM" },
    { name: "INTEL", icon: "i" },
  ];

  return (
    <section
      className="bg-background py-16 border-y border-border transition-colors duration-300"
    >
      {title && (
        <p
          className="text-center text-gray-500 text-xs uppercase tracking-widest mb-12"
        >
          {title}
        </p>
      )}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 md:grid-cols-6 gap-8 md:gap-12">
        {companyLogos.map((logo, i) => (
          <div
            key={i}
            className="group h-16 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-all cursor-pointer"
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-xl border border-border group-hover:border-primary group-hover:bg-accent transition-all p-3"
            >
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{logo.icon}</span>
              <span className="text-[8px] font-bold text-muted-foreground group-hover:text-primary tracking-wider transition-colors">{logo.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const StatsBar = () => (
  <section
    className="bg-[#FACC15] py-16 px-6"
  >
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 text-center divide-black/10 md:divide-x">
      {[
        { k: "Square Feet", v: "2M+" },
        { k: "Happy Clients", v: "500+" },
        { k: "Cities", v: "12" },
        { k: "Partner Spaces", v: "150+" },
      ].map((s, i) => (
        <div
          key={i}
        >
          <h3
            className="text-4xl font-black text-black mb-1"
          >
            {s.v}
          </h3>
          <p
            className="text-black/60 text-xs font-bold uppercase tracking-widest"
          >
            {s.k}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const VerticalSplitSection = () => (
  <motion.section 
    className="bg-background py-24 px-6 transition-colors duration-300"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
      {/* Left Text */}
      <motion.div 
        className="w-full md:w-1/2 pl-4 border-l-4 border-yellow-400"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Premium <br /> <span className="text-muted-foreground">Interiors</span>
        </motion.h2>
        <motion.p 
          className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Offices that are ready to move in. Designed by world-class architects to foster productivity and well-being for your team.
        </motion.p>
        <ul className="space-y-4">
          {['Ergonomic Furniture', 'Sound-proof cabins', 'Biophilic design', 'Enterprise grade IT'].map((feat, idx) => (
            <motion.li 
              key={feat} 
              className="flex items-center gap-3 text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ x: 10, color: "var(--primary)" }}
            >
              <motion.div 
                className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center"
                whileHover={{ scale: 1.2, backgroundColor: "var(--primary)" }}
              >
                <Check className="w-3 h-3 text-primary" />
              </motion.div>
              {feat}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Right Image */}
      <motion.div 
        className="w-full md:w-1/2 h-[500px] relative rounded-[2rem] overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
         <Image 
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop"
          alt="Office Interior"
          fill
          className="object-cover"
         />
      </motion.div>
    </div>
  </motion.section>
);

const ArticleCard = () => (
  <motion.section 
    className="bg-background py-12 px-4 md:px-6 transition-colors duration-300"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <motion.div 
      className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row"
      whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(250, 204, 21, 0.2)" }}
      transition={{ duration: 0.3 }}
    >
       <motion.div 
         className="w-full md:w-1/2 h-64 md:h-auto relative"
         initial={{ opacity: 0, x: -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
       >
          <Image 
            src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1600&auto=format&fit=crop"
            alt="Modern Building"
            fill
            className="object-cover"
          />
       </motion.div>
       <motion.div 
         className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-neutral-100"
         initial={{ opacity: 0, x: 50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.6 }}
       >
          <motion.span 
            className="text-yellow-600 font-bold text-xs uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Feature Story
          </motion.span>
          <motion.h3 
            className="text-3xl font-bold text-black mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            The Future of Hybrid Work
          </motion.h3>
          <motion.p 
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
             How flexible workspaces are reshaping the corporate real estate landscape in India's metro cities.
          </motion.p>
          <motion.button 
            className="self-start border-b-2 border-black pb-1 font-bold hover:text-yellow-600 hover:border-yellow-600 transition"
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
             Read Article
          </motion.button>
       </motion.div>
    </motion.div>
  </motion.section>
);

const Testimonials = () => (
  <motion.section 
    className="bg-muted py-24 px-6 transition-colors duration-300"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
  >
    <div className="max-w-6xl mx-auto">
      <motion.h2 
        className="text-center text-3xl font-bold text-foreground mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Trusted by Leaders
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {DATA.testimonials.map((t, i) => (
          <motion.div 
            key={i} 
            className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ y: -10, borderColor: "var(--primary)" }}
          >
             <motion.div 
               className="flex items-center gap-4 mb-6"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.15 + 0.2 }}
             >
                <motion.div 
                  className="w-12 h-12 bg-muted rounded-full relative overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                   <Image src={`https://randomuser.me/api/portraits/men/${20+i}.jpg`} fill alt="User" className="object-cover" />
                </motion.div>
                <div>
                   <h4 className="text-foreground font-bold text-sm">{t.name}</h4>
                   <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
             </motion.div>
             <motion.p 
               className="text-muted-foreground text-sm leading-relaxed italic"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.15 + 0.3 }}
             >
               &ldquo;{t.text}&rdquo;
             </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

// --- Main Page Component ---
export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <div className="mt-0">
        <CarouselSection title="Trending Coworking Spaces" />
        <CarouselSection title="Premium Office Parks" />
        <CarouselSection title="Managed Commercial" />
        <YellowPromo />
        <DarkValueProp />
        <LogoGrid title="TRUSTED BY INDUSTRY LEADERS" />
        <StatsBar />
        <VerticalSplitSection />
        <ArticleCard />
        <LogoGrid />
        <Testimonials />
        <Footer />
        <ChatbotWidget />
      </div>
    </main>
  );
}
