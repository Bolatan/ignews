import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Newspaper, Menu, X, Search, TrendingUp, Clock, 
  MessageSquare, Share2, Bookmark, User, Bell,
  ChevronRight, Eye, Heart, MapPin, Calendar,
  Facebook, Twitter, Linkedin, Instagram, Loader
} from 'lucide-react';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Subscribe from './components/Subscribe';
import Profile from './components/Profile';
import Privacy from './components/Privacy';
import Advertise from './components/Advertise';
import NotFound from './components/NotFound';

// API Configuration
const API_URL = '/api';

const categories = [
  'Breaking News', 'Local News', 'Politics', 'Business', 
  'Sports', 'Entertainment', 'Technology', 'Opinion'
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const navigate = useNavigate();

  // Fetch articles from API
  useEffect(() => {
    fetchArticles();
    fetchTrending();
  }, [activeCategory, searchQuery]);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'All') params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${API_URL}/articles?${params}`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching articles:', err);
      // Fallback to mock data if API fails
      setArticles(getMockArticles());
    } finally {
      setLoading(false);
    }
  };

  const fetchTrending = async () => {
    try {
      const response = await fetch(`${API_URL}/trending`);
      if (response.ok) {
        const data = await response.json();
        setTrendingTopics(data.map(item => item.title));
      }
    } catch (err) {
      console.error('Error fetching trending:', err);
      setTrendingTopics([
        'Lagos Traffic Solutions',
        'Election Updates',
        'ASUU Strike',
        'Fuel Subsidy',
        'Naira Exchange Rate'
      ]);
    }
  };

  const getMockArticles = () => [
    {
      _id: '1',
      title: 'New Infrastructure Project Announced for Ikorodu Division',
      excerpt: 'Lagos State Government unveils ambitious plan to upgrade roads and facilities in Igbe Laara and surrounding communities...',
      category: 'Local News',
      author: 'Adewale Johnson',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop',
      views: 1243,
      comments: 28,
      featured: true
    },
    {
      _id: '2',
      title: 'Local Market Traders Protest Rising Costs',
      excerpt: 'Traders at Igbe Laara market staged a peaceful protest today over increasing operational costs and taxation...',
      category: 'Local News',
      author: 'Ngozi Okafor',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop',
      views: 892,
      comments: 45
    },
  ];

  const toggleSave = (articleId) => {
    setSavedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (date) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffMs = now - articleDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return articleDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Lexend:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Lexend', sans-serif;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Newspaper className="w-9 h-9 text-green-600" strokeWidth={2.5} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Igbe Laara News</h1>
                <p className="text-xs text-gray-600 font-medium">Lagos, Nigeria</p>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search news..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <Link to="/subscribe" className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                Subscribe
              </Link>
              <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </Link>
            </div>

            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8 py-3">
              <button 
                onClick={() => handleCategoryClick('All')}
                className={`whitespace-nowrap text-sm font-semibold transition-colors ${
                  activeCategory === 'All' 
                    ? 'text-green-600 border-b-2 border-green-600 pb-3' 
                    : 'text-gray-600 hover:text-gray-900 pb-3'
                }`}
              >
                All News
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`whitespace-nowrap text-sm font-semibold transition-colors ${
                    activeCategory === cat 
                      ? 'text-green-600 border-b-2 border-green-600 pb-3' 
                      : 'text-gray-600 hover:text-gray-900 pb-3'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search news..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/subscribe" onClick={() => setMenuOpen(false)} className="block w-full text-center px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold">
              Subscribe
            </Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 font-semibold">
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}

      {/* Breaking News Banner */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 animate-pulse" />
            <span className="font-bold text-sm">BREAKING:</span>
            <span className="text-sm font-medium">Governor announces new development projects for Ikorodu Division</span>
          </div>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              loading={loading}
              error={error}
              articles={articles}
              savedArticles={savedArticles}
              toggleSave={toggleSave}
              formatDate={formatDate}
              trendingTopics={trendingTopics}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Newspaper className="w-7 h-7 text-green-500" strokeWidth={2.5} />
                <span className="font-bold text-xl">Igbe Laara News</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your trusted source for local and national news in Lagos, Nigeria.
              </p>
              <div className="flex items-center space-x-1.5 mt-4 text-sm text-gray-400 font-medium">
                <MapPin className="w-4 h-4" />
                <span>Igbe Laara, Lagos</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-base">Categories</h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li>
                  <button onClick={() => handleCategoryClick('Local News')} className="hover:text-green-500 transition-colors">Local News</button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Politics')} className="hover:text-green-500 transition-colors">Politics</button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Business')} className="hover:text-green-500 transition-colors">Business</button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Sports')} className="hover:text-green-500 transition-colors">Sports</button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-base">About</h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li><Link to="/about" className="hover:text-green-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact</Link></li>
                <li><Link to="/advertise" className="hover:text-green-500 transition-colors">Advertise</Link></li>
                <li><Link to="/privacy" className="hover:text-green-500 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-base">Follow Us</h4>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-gray-800 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-400 font-medium">
            <p>&copy; 2024 Igbe Laara News. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
