import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Newspaper } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <Link to="/admin" className="text-2xl font-bold">Admin Panel</Link>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin" className="flex items-center p-2 rounded hover:bg-gray-700">
                <LayoutDashboard className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/articles" className="flex items-center p-2 rounded hover:bg-gray-700">
                <Newspaper className="mr-2" />
                Articles
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
