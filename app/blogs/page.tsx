import React from 'react';
import Image from 'next/image';
import { 
  Search, ChevronRight, Calendar, 
  Clock, ArrowRight, ChevronDown, Facebook, Twitter, Linkedin, Mail
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ChatbotWidget from '../../components/ChatbotWidget';

// --- Mock Data ---
const FEATURED_POST = {
  id: 1,
  title: "The Future of Hybrid Workspaces in India: 2025 Outlook",
  excerpt: "As companies adapt to post-pandemic realities, the demand for flexible office spaces is skyrocketing. Here's what property owners need to know about the shifting landscape of commercial real estate.",
  category: "Market Trends",
  date: "Oct 24, 2025",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  author: {
    name: "Aditya Roy",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
};

const BLOG_POSTS = [
  {
    id: 2,
    title: "5 Design Trends Shaping Modern Corporate Offices",
    excerpt: "From biophilic design to acoustic privacy pods, discover the interior elements that are defining productivity in the new age.",
    category: "Design",
    date: "Oct 22, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Understanding Lease Agreements: A Guide for Startups",
    excerpt: "Don't get caught in hidden clauses. Our legal experts break down the essential components of a commercial lease agreement.",
    category: "Legal",
    date: "Oct 18, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Coworking vs. Traditional Office: Cost Benefit Analysis",
    excerpt: "A detailed financial breakdown of renting a managed office space versus leasing a traditional bare-shell property.",
    category: "Finance",
    date: "Oct 15, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Bangalore's Tech Corridors: Where to Set Up Shop?",
    excerpt: "An area-by-area guide to Bangalore's hottest commercial hubs, from Whitefield to ORR.",
    category: "Location Guide",
    date: "Oct 10, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  }
];

const CATEGORIES = [
  { name: "Market Trends", count: 12 },
  { name: "Interior Design", count: 8 },
  { name: "Legal & Compliance", count: 5 },
  { name: "Investment Tips", count: 10 },
  { name: "Case Studies", count: 4 },
];

// --- Components ---

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/30 transition-colors duration-300 flex flex-col">
    <div className="h-48 relative overflow-hidden">
      <Image 
        src={post.image} 
        alt={post.title} 
        fill 
        className="object-cover group-hover:scale-105 transition duration-500"
      />
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider border border-primary/20">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3 transition-colors duration-300">
         <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {post.date}</span>
         <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
      </div>
      <h3 className="text-foreground font-bold text-lg mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1 transition-colors duration-300">
        {post.excerpt}
      </p>
      <a href="#" className="inline-flex items-center text-primary text-xs font-bold uppercase tracking-widest hover:gap-2 transition-all">
        Read Article <ArrowRight className="w-3 h-3 ml-1" />
      </a>
    </div>
  </div>
);

const Sidebar = () => (
  <div className="space-y-8">
    {/* Search Widget */}
    <div className="bg-card border border-border rounded-xl p-6 transition-colors duration-300">
       <h3 className="text-foreground font-bold mb-4">Search</h3>
       <div className="relative">
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-accent text-foreground text-sm pl-10 pr-4 py-3 rounded border border-border focus:border-primary outline-none placeholder-muted-foreground transition-colors duration-300"
          />
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
       </div>
    </div>

    {/* Categories */}
    <div className="bg-card border border-border rounded-xl p-6 transition-colors duration-300">
       <h3 className="text-foreground font-bold mb-4">Categories</h3>
       <ul className="space-y-2">
          {CATEGORIES.map((cat) => (
             <li key={cat.name} className="flex justify-between items-center text-sm text-muted-foreground hover:text-primary cursor-pointer group transition-colors duration-300">
                <span>{cat.name}</span>
                <span className="bg-accent text-xs px-2 py-1 rounded text-muted-foreground group-hover:text-foreground transition-colors duration-300">{cat.count}</span>
             </li>
          ))}
       </ul>
    </div>

    {/* Newsletter Widget */}
    <div className="bg-primary rounded-xl p-6 text-center">
       <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="text-primary-foreground w-6 h-6" />
       </div>
       <h3 className="text-primary-foreground font-bold text-lg mb-2">Subscribe to Newsletter</h3>
       <p className="text-primary-foreground/70 text-xs mb-4 leading-relaxed">Get the latest real estate insights delivered directly to your inbox weekly.</p>
       <input 
         type="email" 
         placeholder="Your email address" 
         className="w-full bg-background text-foreground text-sm px-4 py-3 rounded border border-border outline-none mb-3 placeholder-muted-foreground transition-colors duration-300"
       />
       <button className="w-full bg-secondary text-foreground font-bold text-sm py-3 rounded hover:bg-accent transition-colors duration-300">
          Subscribe
       </button>
    </div>

    {/* Social Links */}
    <div className="flex gap-2">
       {[Facebook, Twitter, Linkedin].map((Icon, i) => (
          <a key={i} href="#" className="flex-1 bg-card border border-border py-3 rounded flex justify-center hover:border-primary group transition-colors duration-300">
             <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </a>
       ))}
    </div>
  </div>
);

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background font-sans pt-16 transition-colors duration-300">
      <Navbar />
      
      {/* Header / Breadcrumb */}
      <div className="bg-secondary border-b border-border transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
           <div className="flex items-center text-muted-foreground text-xs font-medium mb-4 uppercase tracking-wide transition-colors duration-300">
                <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Home</span>
                <ChevronRight className="w-3 h-3 mx-2" />
                <span className="text-primary">Blogs & Insights</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Latest Insights</h1>
           <p className="text-muted-foreground max-w-2xl">Expert analysis, market trends, and guides to help you navigate the commercial real estate landscape.</p>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
             
            {/* Main Content */}
            <div>
                {/* Featured Post */}
                <div className="bg-card border border-border rounded-xl overflow-hidden mb-12 group cursor-pointer transition-colors duration-300">
                    <div className="relative h-[400px] w-full">
                        <Image 
                            src={FEATURED_POST.image} 
                            alt={FEATURED_POST.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 p-8 max-w-3xl">
                            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
                                {FEATURED_POST.category}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                                {FEATURED_POST.title}
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-2 transition-colors duration-300">
                                {FEATURED_POST.excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-muted-foreground text-xs font-medium transition-colors duration-300">
                                <div className="flex items-center gap-2 text-foreground">
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                        <Image src={FEATURED_POST.author.avatar} alt={FEATURED_POST.author.name} fill className="object-cover"/>
                                    </div>
                                    {FEATURED_POST.author.name}
                                </div>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {FEATURED_POST.date}</span>
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {FEATURED_POST.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters / Sort Row */}
                <div className="flex justify-between items-center mb-8 border-b border-border pb-4 transition-colors duration-300">
                    <h2 className="text-foreground text-xl font-bold">Recent Articles</h2>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 bg-card border border-border text-foreground text-xs px-4 py-2 rounded hover:bg-accent transition-colors duration-300">
                            Latest <ChevronDown className="w-3 h-3"/>
                        </button>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {BLOG_POSTS.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-16">
                    <button className="w-10 h-10 flex items-center justify-center bg-card border border-border text-foreground rounded hover:border-primary hover:text-primary transition-colors duration-300">1</button>
                    <button className="w-10 h-10 flex items-center justify-center bg-card border border-border text-muted-foreground rounded hover:bg-accent transition-colors duration-300">2</button>
                    <button className="w-10 h-10 flex items-center justify-center bg-card border border-border text-muted-foreground rounded hover:bg-accent transition-colors duration-300">3</button>
                    <button className="px-4 h-10 flex items-center justify-center bg-card border border-border text-foreground text-sm font-bold rounded hover:border-primary hover:text-primary transition-colors duration-300">Next</button>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block h-fit sticky top-24">
                <Sidebar />
            </aside>
        </div>
      </main>

      <Footer />
      
      <ChatbotWidget />
    </div>
  );
}