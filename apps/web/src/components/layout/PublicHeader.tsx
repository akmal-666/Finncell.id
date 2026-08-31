import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Truck } from 'lucide-react';

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
    <header className="sticky top-0 z-50 w-full bg-white text-[#0B1F3A] border-b border-[#DCE5EF] select-none">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#061426] text-white py-1.5 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-[#5EA7FF]" />
          <span>Garansi Resmi Apple Indonesia &amp; Gratis Ongkir seluruh Indonesia</span>
        </div>
      </div>

      {/* Main Navbar - 64px height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Mobile Left: Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#0B1F3A] hover:bg-[#F7F9FC] rounded-md transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Logo with Strong Typographic Presence */}
          <Link to="/" className="flex items-center shrink-0">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#061426]">
              fincell<span className="text-[#1769E0]">.id</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`py-5 text-xs uppercase font-semibold tracking-wider transition-colors relative flex items-center ${
                    isActive
                      ? 'text-[#1769E0]'
                      : 'text-[#0B1F3A]/70 hover:text-[#0B1F3A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1769E0]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Compact Search */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Cari iPhone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 xl:w-48 pl-8 pr-3 py-1.5 text-xs bg-[#F7F9FC] text-[#0B1F3A] border border-[#DCE5EF] rounded-md placeholder-gray-400 focus:outline-none focus:border-[#1769E0] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 pointer-events-none" />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-1">
              <button
                className="p-2 text-[#0B1F3A] hover:bg-[#F7F9FC] rounded-md transition-colors md:hidden"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                to="/admin/login"
                className="p-2 text-[#0B1F3A]/80 hover:text-[#0B1F3A] hover:bg-[#F7F9FC] rounded-md transition-colors"
                title="Account"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              <Link
                to="/wishlist"
                className="p-2 text-[#0B1F3A]/80 hover:text-[#0B1F3A] hover:bg-[#F7F9FC] rounded-md transition-colors hidden sm:flex"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
              </Link>

              <Link
                to="/keranjang"
                className="p-2 text-[#0B1F3A]/80 hover:text-[#0B1F3A] hover:bg-[#F7F9FC] rounded-md transition-colors relative"
                title="Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#1769E0] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCE5EF] bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Cari iPhone, aksesoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F9FC] text-[#0B1F3A] border border-[#DCE5EF] rounded-md placeholder-gray-400 focus:outline-none focus:border-[#1769E0]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors ${
                  location.pathname === link.href
                    ? 'text-[#1769E0] bg-[#EAF2FC]'
                    : 'text-[#0B1F3A]/80 hover:bg-[#F7F9FC]'
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

