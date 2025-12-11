import React, { useState, useEffect } from 'react';
import { 
  Newspaper, Menu, X, Search, TrendingUp, Clock, 
  MessageSquare, Share2, Bookmark, User, Bell,
  ChevronRight, Eye, Heart, MapPin, Calendar,
  Facebook, Twitter, Linkedin, Instagram, Loader
} from 'lucide-react';

// API Configuration
const API_URL = 'https://igbe-news-backend.vercel.app/api'; // Replace with your actual backend URL

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
  const [currentView, setCurrentView] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState([]);

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
    {
      _id: '3',
      title: 'Nigerian Tech Startup Raises $5M in Series A Funding',
      excerpt: 'A Lagos-based fintech company secures major investment to expand operations across West Africa...',
      category: 'Technology',
      author: 'Chidi Eze',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
      views: 2156,
      comments: 67
    },
    {
      _id: '4',
      title: 'Super Eagles Qualify for AFCON 2025',
      excerpt: 'Nigeria\'s national team secures qualification spot after dramatic victory against rivals...',
      category: 'Sports',
      author: 'Taiwo Adebayo',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop',
      views: 3421,
      comments: 134
    },
    {
      _id: '5',
      title: 'New Policy on Small Business Taxation Announced',
      excerpt: 'Federal Government introduces measures to support SMEs with revised tax framework...',
      category: 'Business',
      author: 'Fatima Bello',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
      views: 1876,
      comments: 56
    },
    {
      _id: '6',
      title: 'Entertainment Industry Veterans Call for Better Regulation',
      excerpt: 'Leading figures in Nollywood and music industry advocate for stronger copyright protection...',
      category: 'Entertainment',
      author: 'Kunle Afolayan',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop',
      views: 1654,
      comments: 89
    }
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
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
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

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const featuredArticle = filteredArticles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

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
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <Newspaper className="w-9 h-9 text-green-600" strokeWidth={2.5} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Igbe Laara News</h1>
                <p className="text-xs text-gray-600 font-medium">Lagos, Nigeria</p>
              </div>
            </button>
            
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
              <button 
                onClick={() => handleNavigation('subscribe')}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
              >
                Subscribe
              </button>
              <button 
                onClick={() => handleNavigation('profile')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
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
            <button 
              onClick={() => handleNavigation('subscribe')}
              className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold"
            >
              Subscribe
            </button>
            <button 
              onClick={() => handleNavigation('profile')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg flex items-center justify-center space-x-2 font-semibold"
            >
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader className="w-8 h-8 text-green-600 animate-spin" />
            <span className="ml-3 text-gray-600 font-medium">Loading articles...</span>
          </div>
        ) : error ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p className="text-yellow-800 font-medium mb-2">Unable to connect to server</p>
            <p className="text-sm text-yellow-600">Showing cached articles</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Articles Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {featuredArticle && (
              <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-96">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
                      FEATURED
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3 font-medium">
                    <span className="text-green-600 font-semibold">{featuredArticle.category}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(featuredArticle.createdAt)}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{featuredArticle.views?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MessageSquare className="w-4 h-4" />
                        <span>{featuredArticle.comments || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => toggleSave(featuredArticle._id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Bookmark 
                          className={`w-5 h-5 ${savedArticles.includes(featuredArticle._id) ? 'fill-green-600 text-green-600' : 'text-gray-600'}`} 
                        />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Regular Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularArticles.slice(0, 6).map(article => (
                <article 
                  key={article._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2.5 font-medium">
                      <span className="text-green-600 font-semibold">{article.category}</span>
                      <span>•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight hover:text-green-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {article.excerpt.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{article.views?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{article.comments || 0}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => toggleSave(article._id)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Bookmark 
                            className={`w-4 h-4 ${savedArticles.includes(article._id) ? 'fill-green-600 text-green-600' : ''}`} 
                          />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                <span>Trending Topics</span>
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSearchQuery(topic)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">{topic}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Daily Newsletter</h3>
              <p className="text-sm mb-4 text-green-100 font-medium">
                Get the latest news delivered to your inbox every morning
              </p>
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
              />
              <button className="w-full px-4 py-2.5 bg-white text-green-600 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm">
                Subscribe Now
              </button>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Most Read</h3>
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, idx) => (
                  <div key={article._id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <span className="text-2xl font-bold text-green-600 w-8 flex-shrink-0">{idx + 1}</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-green-600 cursor-pointer leading-tight mb-1.5">
                        {article.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{article.views?.toLocaleString() || 0} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

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
                  <button 
                    onClick={() => handleCategoryClick('Local News')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Local News
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('Politics')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Politics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('Business')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Business
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('Sports')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Sports
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-base">About</h4>
              <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
                <li>
                  <button 
                    onClick={() => handleNavigation('about')}
                    className="hover:text-green-500 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('advertise')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Advertise
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('privacy')}
                    className="hover:text-green-500 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
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
