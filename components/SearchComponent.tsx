'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Filter,
  X,
  Calendar,
  DollarSign,
  Users,
  Zap,
  Clock,
  Star,
  ArrowRight,
  Heart,
  Bookmark,
  Share,
  SlidersHorizontal,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Eye,
  ThumbsUp,
  ChevronUp,
  ChevronDown,
  Mic,
  Camera,
  Wifi,
  Car,
  Coffee,
  Shield,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  location: string;
  type: 'coworking' | 'office' | 'virtual' | 'managed';
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  amenities: string[];
  availability: boolean;
  verified: boolean;
  featured: boolean;
  distance?: number;
  description: string;
  capacity: string;
  area: string;
  parking: boolean;
  wifi: boolean;
  cafeteria: boolean;
  security: boolean;
  ac: boolean;
  furnished: boolean;
  immediate: boolean;
  trending: boolean;
  matches: number;
  similar?: SearchResult[];
  bookmarked?: boolean;
  liked?: boolean;
  viewCount: number;
  lastUpdated: string;
}

interface SearchComponentProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'default' | 'compact' | 'fullscreen';
  showAdvancedFilters?: boolean;
  maxResults?: number;
  enableVoiceSearch?: boolean;
  enableImageSearch?: boolean;
  enableRecommendations?: boolean;
}

interface SearchFilters {
  location: string;
  type: 'coworking' | 'office' | 'virtual' | 'managed';
  priceRange?: string;
  priceMin?: number;
  priceMax?: number;
  availability?: string;
  amenities?: string[];
  areaRange?: { min: number; max: number };
  capacity?: number;
  verified?: boolean;
  immediate?: boolean;
  parking?: boolean;
  wifi?: boolean;
  ac?: boolean;
  furnished?: boolean;
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance' | 'newest';
  viewMode?: 'grid' | 'list';
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'location' | 'property' | 'amenity' | 'recent';
  icon: React.ReactNode;
  count?: number;
}

interface SearchHistory {
  query: string;
  timestamp: Date;
  resultCount: number;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  onSearch, 
  isOpen = false, 
  onClose,
  variant = 'default',
  showAdvancedFilters = true,
  maxResults = 20,
  enableVoiceSearch = false,
  enableImageSearch = false,
  enableRecommendations = true
}) => {
  const [activeTab, setActiveTab] = useState<'coworking' | 'office' | 'virtual' | 'managed'>('coworking');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating' | 'distance' | 'newest'>('relevance');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set());
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced sample search results with full data
  const sampleResults: SearchResult[] = [
    {
      id: '1',
      title: 'WeWork Galaxy Residency',
      location: 'Residency Road, Bangalore',
      type: 'coworking',
      price: '₹8,000/month',
      originalPrice: '₹10,000/month',
      rating: 4.8,
      reviewCount: 324,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'
      ],
      amenities: ['High-speed WiFi', '24/7 Access', 'Meeting Rooms', 'Kitchen', 'Printer', 'Projector'],
      availability: true,
      verified: true,
      featured: true,
      distance: 2.3,
      description: 'Premium coworking space in the heart of Bangalore with modern amenities and flexible seating options.',
      capacity: '1-50 people',
      area: '15,000 sq ft',
      parking: true,
      wifi: true,
      cafeteria: true,
      security: true,
      ac: true,
      furnished: true,
      immediate: true,
      trending: false,
      matches: 95,
      bookmarked: false,
      liked: false,
      viewCount: 1247,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'IndiQube Gamma HSR',
      location: 'HSR Layout, Bangalore',
      type: 'coworking',
      price: '₹6,500/month',
      originalPrice: '₹8,000/month',
      rating: 4.6,
      reviewCount: 198,
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800'
      ],
      amenities: ['Parking', 'Security', 'Cafeteria', 'Conference Room', 'Gym', 'Reception'],
      availability: true,
      verified: true,
      featured: false,
      distance: 5.7,
      description: 'Modern coworking space with excellent connectivity and comprehensive business amenities.',
      capacity: '1-30 people',
      area: '12,000 sq ft',
      parking: true,
      wifi: true,
      cafeteria: true,
      security: true,
      ac: true,
      furnished: true,
      immediate: false,
      trending: true,
      matches: 87,
      bookmarked: true,
      liked: false,
      viewCount: 892,
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      title: 'Smart Office Solutions',
      location: 'Koramangala, Bangalore',
      type: 'office',
      price: '₹45/sq ft',
      originalPrice: '₹55/sq ft',
      rating: 4.9,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
      images: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
      ],
      amenities: ['Furnished', 'Reception', 'IT Support', 'Parking', 'Conference Room', 'CCTV'],
      availability: false,
      verified: true,
      featured: true,
      distance: 3.1,
      description: 'Fully furnished office spaces with premium amenities and professional environment.',
      capacity: '10-100 people',
      area: '25,000 sq ft',
      parking: true,
      wifi: true,
      cafeteria: false,
      security: true,
      ac: true,
      furnished: true,
      immediate: true,
      trending: false,
      matches: 92,
      bookmarked: false,
      liked: true,
      viewCount: 673,
      lastUpdated: '3 hours ago'
    }
  ];

  const [results, setResults] = useState<SearchResult[]>([]);

  // Enhanced search suggestions and history management
  const searchSuggestions = useMemo(() => [
    { id: '1', text: 'Bangalore', type: 'location' as const, icon: <MapPin className="w-4 h-4" />, count: 150 },
    { id: '2', text: 'Mumbai', type: 'location' as const, icon: <MapPin className="w-4 h-4" />, count: 89 },
    { id: '3', text: 'WeWork', type: 'property' as const, icon: <Building2 className="w-4 h-4" />, count: 23 },
    { id: '4', text: 'coworking with parking', type: 'amenity' as const, icon: <Car className="w-4 h-4" />, count: 45 },
    { id: '5', text: '24/7 access', type: 'amenity' as const, icon: <Clock className="w-4 h-4" />, count: 67 },
  ], []);

  const toggleBookmark = (itemId: string) => {
    const newBookmarks = new Set(bookmarkedItems);
    if (newBookmarks.has(itemId)) {
      newBookmarks.delete(itemId);
    } else {
      newBookmarks.add(itemId);
    }
    setBookmarkedItems(newBookmarks);
  };

  const toggleLike = (itemId: string) => {
    const newLikes = new Set(likedItems);
    if (newLikes.has(itemId)) {
      newLikes.delete(itemId);
    } else {
      newLikes.add(itemId);
    }
    setLikedItems(newLikes);
  };

  const clearFilters = () => {
    setSelectedAmenities([]);
    setPriceRange({ min: 0, max: 100000 });
    setActiveFilters([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = sampleResults.filter(result => {
        const matchesQuery = searchQuery === '' || 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLocation = location === '' || 
          result.location.toLowerCase().includes(location.toLowerCase());
        const matchesType = result.type === activeTab;
        
        return matchesQuery && matchesLocation && matchesType;
      });
      
      setResults(filteredResults);
      setIsLoading(false);
      setShowResults(true);
      onSearch?.(searchQuery, { location, type: activeTab });
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'coworking': return <Users className="w-4 h-4" />;
      case 'office': return <Building2 className="w-4 h-4" />;
      case 'virtual': return <Zap className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coworking': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'office': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'virtual': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={searchRef}
        className="absolute top-full left-0 right-0 mt-2 z-50"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-background border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Tabs */}
          <div className="flex border-b border-border">
            {[
              { id: 'coworking' as const, label: 'Coworking' },
              { id: 'office' as const, label: 'Office Space' },
              { id: 'virtual' as const, label: 'Virtual' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Search Form */}
          <div className="p-4">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or Location"
                  className="w-full pl-10 pr-4 py-3 bg-accent border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search spaces..."
                  className="w-full pl-10 pr-4 py-3 bg-accent border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <motion.button
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className={`px-4 py-3 rounded-xl transition-all ${
                  isAdvancedOpen
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-muted-foreground hover:bg-accent/80'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {isAdvancedOpen && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent rounded-xl"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">
                      Price Range
                    </label>
                    <select className="w-full p-2 bg-background border border-border rounded-lg text-sm">
                      <option>Any</option>
                      <option>Under ₹5,000</option>
                      <option>₹5,000 - ₹10,000</option>
                      <option>₹10,000 - ₹20,000</option>
                      <option>Above ₹20,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">
                      Availability
                    </label>
                    <select className="w-full p-2 bg-background border border-border rounded-lg text-sm">
                      <option>Any</option>
                      <option>Immediate</option>
                      <option>Within 1 month</option>
                      <option>Within 3 months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">
                      Amenities
                    </label>
                    <select className="w-full p-2 bg-background border border-border rounded-lg text-sm">
                      <option>All</option>
                      <option>Parking</option>
                      <option>24/7 Access</option>
                      <option>Meeting Rooms</option>
                      <option>High-speed WiFi</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                className="border-t border-border max-h-96 overflow-y-auto"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {results.length > 0 ? (
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </h3>
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        className="flex gap-4 p-3 bg-accent rounded-xl hover:bg-accent/80 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={result.image}
                            alt={result.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{result.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {getTypeIcon(result.type)}
                              <span className="ml-1 capitalize">{result.type}</span>
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{result.location}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs">
                              <span className="font-medium text-primary">{result.price}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{result.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${result.availability ? 'text-green-600' : 'text-red-600'}`}>
                                {result.availability ? 'Available' : 'Waitlist'}
                              </span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-sm font-medium mb-2">No results found</h3>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your search criteria or location
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchComponent;