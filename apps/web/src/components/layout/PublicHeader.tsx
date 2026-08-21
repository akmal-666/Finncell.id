import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';

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
          <Link to="/" className="flex items-center gap-1.5 text-xl sm:text-2xl font-black tracking-tighter shrink-0 group">
            <span className="text-white group-hover:text-gray-200 transition-colors">fincell</span>
            <span className="text-[#E7B65A] font-extrabold">.id</span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Bar Desktop */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Cari iPhone, aksesoris..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 xl:w-56 pl-9 pr-4 py-1.5 text-xs bg-[#111111] text-white border border-white/15 rounded-full placeholder-gray-500 focus:outline-none focus:border-[#E7B65A] focus:w-64 transition-all duration-300"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            </div>

            {/* Action Buttons: Account, Wishlist, Cart */}
            <div className="flex items-center space-x-1">
              <Link
                to="/admin/login"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Account / Login"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>
              <Link
                to="/wishlist"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link
                to="/keranjang"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E7B65A] text-[#111111] text-[9px] font-extrabold rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
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
