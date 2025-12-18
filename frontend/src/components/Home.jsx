import React from 'react';
import {
  Clock, Eye, MessageSquare, Bookmark, Share2, TrendingUp, ChevronRight, Loader
} from 'lucide-react';

const Home = ({
  loading,
  error,
  articles,
  savedArticles,
  toggleSave,
  formatDate,
  trendingTopics,
  setSearchQuery,
  activeCategory
}) => {

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const featuredArticle = filteredArticles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
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

      {!loading && (articles.length > 0) && (
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
                    {featuredArticle.excerpt && featuredArticle.excerpt}
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
                      {article.excerpt && `${article.excerpt.substring(0, 100)}...`}
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
      )}
    </main>
  );
};

export default Home;
