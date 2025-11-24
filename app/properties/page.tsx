import React from 'react';
import Image from 'next/image';
import { 
  Search, ChevronRight, Heart, MapPin, 
  Building2, Lock, Filter, ChevronDown
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Mock Data to match Screenshot ---
const PROPERTIES = [
  {
    id: 1,
    title: "COWRKS - RESIDENCY ROAD, PURVA PREMIER",
    location: "WHITEFIELD, Bangalore",
    type: "Lease Commercial",
    tags: ["Managed Office", "Fully Furnished"],
    lockIn: "3 Years",
    price: "₹ 65",
    unit: "/sqft",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "awfis - PRESTIGE TECH PARK4",
    location: "MG ROAD, Bangalore",
    type: "Lease Commercial",
    tags: ["Managed Office", "Fully Furnished"],
    lockIn: "3 Years",
    price: "₹ 90",
    unit: "/sqft",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "awfis - MANTRI COMMERCE",
    location: "BANNERGHATTA ROAD, Bangalore",
    type: "Lease Commercial",
    tags: ["Managed Office", "Fully Furnished"],
    lockIn: "3 Years",
    price: "₹ 70",
    unit: "/sqft",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "awfis - PRESTIGE SHANTINIKETAN",
    location: "ASHOK NAGAR, Bangalore",
    type: "Lease Commercial",
    tags: ["Managed Office", "Fully Furnished"],
    lockIn: "3 Years",
    price: "₹ 110",
    unit: "/sqft",
    image: "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "awfis - SOUL SPACE PARADIGM",
    location: "BELLANDUR, Bangalore",
    type: "Lease Commercial",
    tags: ["Managed Office", "Fully Furnished"],
    lockIn: "3 Years",
    price: "₹ 80",
    unit: "/sqft",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"
  }
];

// --- Components ---

const Breadcrumb = () => (
  <div className="bg-background transition-colors duration-300 px-6 py-4">
    <div className="max-w-[1400px] mx-auto flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wide transition-colors duration-300">
        <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Home</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-primary">Properties</span>
    </div>
  </div>
);

interface PropertyData {
  id: number;
  title: string;
  location: string;
  type: string;
  tags: string[];
  lockIn: string;
  price: string;
  unit: string;
  image: string;
}

const PropertyCard = ({ data }: { data: PropertyData }) => (
  <div className="bg-card rounded-xl p-4 flex flex-col md:flex-row gap-6 border border-border hover:border-primary/30 transition-colors duration-300 group">
    {/* Image Section */}
    <div className="w-full md:w-[320px] h-52 md:h-auto relative shrink-0 rounded-lg overflow-hidden">
      <Image 
        src={data.image} 
        alt={data.title} 
        fill 
        className="object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors duration-300">
        <Heart className="w-4 h-4 text-white" />
      </div>
    </div>

    {/* Content Section */}
    <div className="flex-1 flex flex-col justify-between py-1">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-foreground font-bold text-lg md:text-xl mb-2 uppercase tracking-tight">
                    {data.title}
                </h3>
            </div>
            
            <div className="flex items-center text-muted-foreground text-xs md:text-sm mb-3 transition-colors duration-300">
                <MapPin className="w-3 h-3 mr-1" /> {data.location}
            </div>
            
            <div className="flex items-center text-muted-foreground text-xs md:text-sm mb-4 transition-colors duration-300">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                Property Type : {data.type}
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
                {data.tags.map((tag: string) => (
                    <span key={tag} className="bg-accent text-muted-foreground text-[10px] px-3 py-1 rounded border border-border transition-colors duration-300">
                        {tag}
                    </span>
                ))}
            </div>
            
            <div className="flex items-center text-muted-foreground text-xs mb-2 transition-colors duration-300">
                <Lock className="w-3 h-3 mr-1" /> Lock-in: {data.lockIn}
            </div>
        </div>

        <div className="flex items-end justify-between border-t border-border pt-4 mt-2 transition-colors duration-300">
            <div>
                <p className="text-muted-foreground text-xs mb-1 transition-colors duration-300">Price</p>
                <p className="text-foreground font-bold text-xl">
                    {data.price} <span className="text-xs font-normal text-muted-foreground transition-colors duration-300">{data.unit}</span>
                </p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold px-6 py-3 rounded transition-colors duration-300">
                View Details
            </button>
        </div>
    </div>
  </div>
);

const Sidebar = () => (
    <div className="space-y-6">
        {/* Consultant Card */}
        <div className="bg-card rounded-xl p-6 border border-border transition-colors duration-300">
            <h4 className="text-foreground font-medium mb-4">Interested in Properties</h4>
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg overflow-hidden relative">
                     {/* Placeholder for Agent Image */}
                     <div className="absolute inset-0 bg-accent flex items-center justify-center text-xs text-muted-foreground">IMG</div>
                </div>
                <div>
                    <p className="text-foreground font-bold text-sm">Ankit Khandelwal</p>
                    <p className="text-muted-foreground text-xs transition-colors duration-300">WhichFloor Consultant</p>
                </div>
            </div>
            
            <p className="text-muted-foreground text-xs leading-relaxed mb-4 transition-colors duration-300">
                Ankit&apos;s team has assisted over 500+ corporates to find the right office space.
            </p>
            
            <div className="flex gap-2 mb-6 opacity-60 grayscale">
               {/* Payment Icons Placeholder */}
               <div className="h-4 w-8 bg-accent rounded transition-colors duration-300"></div>
               <div className="h-4 w-8 bg-blue-500/50 rounded"></div>
               <div className="h-4 w-8 bg-green-500/50 rounded"></div>
            </div>
            
            <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded text-sm hover:bg-primary/90 transition-colors duration-300">
                Contact Ankit
            </button>
        </div>

        {/* Filter Card */}
        <div className="bg-card rounded-xl p-6 border border-border transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-foreground font-medium">Filters</h4>
                <div className="bg-primary p-2 rounded-full">
                    <Filter className="w-4 h-4 text-primary-foreground" />
                </div>
            </div>

            <div className="space-y-4">
                {/* Dropdowns */}
                {['Property Type', 'Service Type', 'City', 'Furnishing'].map((label) => (
                    <div key={label}>
                        <label className="text-muted-foreground text-xs block mb-1.5 transition-colors duration-300">{label}</label>
                        <div className="relative">
                            <select className="w-full bg-accent text-foreground text-sm px-4 py-3 rounded-lg border border-border appearance-none focus:border-primary outline-none cursor-pointer transition-colors duration-300">
                                <option>All {label.split(' ')[0]}s</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground pointer-events-none transition-colors duration-300" />
                        </div>
                    </div>
                ))}

                {/* Price Range */}
                <div>
                    <label className="text-muted-foreground text-xs block mb-1.5 transition-colors duration-300">Price Range (₹)</label>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Min Price" className="w-1/2 bg-accent text-foreground text-xs px-3 py-3 rounded-lg border border-border outline-none focus:border-primary transition-colors duration-300 placeholder-muted-foreground" />
                        <input type="text" placeholder="Max Price" className="w-1/2 bg-accent text-foreground text-xs px-3 py-3 rounded-lg border border-border outline-none focus:border-primary transition-colors duration-300 placeholder-muted-foreground" />
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 pt-2">
                     <button className="flex-1 bg-primary text-primary-foreground font-bold text-xs py-3 rounded hover:bg-primary/90 transition-colors duration-300">
                        Apply Filters
                     </button>
                     <button className="flex-1 bg-accent text-foreground font-medium text-xs py-3 rounded hover:bg-accent/80 transition-colors duration-300 border border-border">
                        Reset Filters
                     </button>
                </div>
            </div>
        </div>
    </div>
);

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-background font-sans pt-16 transition-colors duration-300">
      <Navbar />
      <Breadcrumb />
      
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
              
            {/* Left Column: Property List */}
            <div className="flex flex-col gap-6">
                {PROPERTIES.map((prop) => (
                    <PropertyCard key={prop.id} data={prop} />
                ))}

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                    <button className="w-8 h-8 flex items-center justify-center bg-card text-foreground font-bold text-xs rounded hover:bg-accent border border-border transition-colors duration-300">{'<'}</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground font-bold text-xs rounded">1</button>
                    <button className="w-8 h-8 flex items-center justify-center bg-card text-foreground font-bold text-xs rounded hover:bg-accent border border-border transition-colors duration-300">2</button>
                    <span className="flex items-center justify-center text-muted-foreground">...</span>
                    <button className="w-12 h-8 flex items-center justify-center bg-card text-foreground font-bold text-xs rounded hover:bg-accent border border-border transition-colors duration-300">NEXT {'>'}</button>
                </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="hidden lg:block sticky top-24">
                <Sidebar />
            </div>
        </div>
      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}