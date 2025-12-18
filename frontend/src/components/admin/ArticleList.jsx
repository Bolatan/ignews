import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';

const API_URL = '/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/articles`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('You must be logged in to delete articles.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/articles/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to delete the article.');
        setArticles(articles.filter(article => article._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <Link
          to="/admin/articles/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <Plus className="mr-2" />
          Create New Article
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Author</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{article.title}</td>
                <td className="p-4">{article.category}</td>
                <td className="p-4">{article.author}</td>
                <td className="p-4">{new Date(article.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Link to={`/admin/articles/edit/${article._id}`} className="p-2 text-blue-500 hover:text-blue-700">
                      <Edit />
                    </Link>
                    <button onClick={() => handleDelete(article._id)} className="p-2 text-red-500 hover:text-red-700">
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleList;
