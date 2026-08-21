import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const PublicHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk' },
    { label: 'Aksesoris', href: '/aksesoris' },
    { label: 'Promo', href: '/promo' },
    { label: 'Trade In', href: '/trade-in' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tentang Kami', href: '/tentang-kami' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter shrink-0">
            <span className="text-[#E7B65A]">fincell</span>.id
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#E7B65A] bg-white/5 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Search */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Bar Desktop */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Cari iPhone, aksesoris..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 pl-9 pr-4 py-1.5 text-xs bg-[#111111] text-white border border-white/15 rounded-full placeholder-gray-500 focus:outline-none focus:border-[#E7B65A] focus:w-72 transition-all duration-300"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Link
                to="/admin/login"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Account / Admin"
              >
                <User className="w-4 h-4" />
              </Link>
              <Link
                to="/wishlist"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
              </Link>
              <Link
                to="/keranjang"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E7B65A] text-[#111111] text-[9px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#050505] px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Cari iPhone, aksesoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#111111] text-white border border-white/15 rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#E7B65A]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-[#E7B65A] bg-white/5 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
