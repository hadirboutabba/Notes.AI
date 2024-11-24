import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookText, Home, LogIn, User } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-sky-soft">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-4 text-gray-custom hover:text-gray-800"
              >
                <BookText className="h-6 w-6 mr-2" />
                <span className="font-semibold text-lg">Notes.AI</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/')
                    ? 'bg-sky-soft text-gray-800'
                    : 'text-gray-custom hover:bg-sky-soft hover:text-gray-800'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard')
                    ? 'bg-sky-soft text-gray-800'
                    : 'text-gray-custom hover:bg-sky-soft hover:text-gray-800'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/login"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/login')
                    ? 'bg-sky-soft text-gray-800'
                    : 'text-gray-custom hover:bg-sky-soft hover:text-gray-800'
                }`}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
