import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Plus } from 'lucide-react';

const API_URL = '/api';

const Dashboard = () => {
  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/articles`)
      .then(res => res.json())
      .then(data => {
        setArticleCount(data.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Newspaper className="text-blue-500 w-12 h-12 mr-4" />
            <div>
              <p className="text-gray-600 text-lg">Total Articles</p>
              {loading ? (
                <p className="text-3xl font-bold">...</p>
              ) : (
                <p className="text-3xl font-bold">{articleCount}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center justify-center">
          <Link
            to="/admin/articles/new"
            className="bg-blue-500 text-white px-6 py-4 rounded hover:bg-blue-600 flex items-center text-lg"
          >
            <Plus className="mr-2" />
            Create New Article
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
