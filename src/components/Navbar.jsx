import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation Bar Component
 * Provides navigation links and branding
 */
const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-bold hover:text-primary-200 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-3xl">🎬</span>
            <span className="bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
              Movie Search
            </span>
          </Link>
          {!isHome && (
            <Link 
              to="/" 
              className="px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 font-semibold border border-white/30 hover:border-white/50"
            >
              🏠 Home
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
