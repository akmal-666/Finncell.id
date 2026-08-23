import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Truck } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk', hasDropdown: true },
    { label: 'Aksesoris', href: '/aksesoris' },
    { label: 'Promo', href: '/promo' },
    { label: 'Trade In', href: '/trade-in' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tentang Kami', href: '/tentang-kami' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505] text-white border-b border-white/10 shadow-lg select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BAR (Mobile & Desktop)
      ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#0b0c10] border-b border-white/5 py-1.5 px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-gray-300 font-medium tracking-wide">
          <Truck className="w-3.5 h-3.5 text-[#E7B65A]" />
          <span>Gratis Ongkir ke Seluruh Indonesia</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN NAVBAR
      ────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          
          {/* Mobile Left: Hamburger Menu Icon */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo with tagline */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5 text-xl sm:text-2xl font-extrabold tracking-tight">
                <span className="text-white group-hover:text-gray-200 transition-colors">fincell</span>
                <span className="text-[#E7B65A]">.id</span>
              </div>
              <span className="text-[9px] text-gray-400 font-medium tracking-wide -mt-1 hidden sm:block">
                Your iPhone Destination
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all relative flex items-center gap-1 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-70 mt-0.5" />}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E7B65A] rounded-full" />
                  )}
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
                placeholder="Cari iPhone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 xl:w-48 pl-9 pr-4 py-1.5 text-xs bg-[#16181d] text-white border border-white/10 rounded-full placeholder-gray-400 focus:outline-none focus:border-[#E7B65A] focus:w-56 transition-all duration-300"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
            </div>

            {/* Action Buttons: Search (Mobile), Account, Wishlist, Cart */}
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <button
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors md:hidden"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

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
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative hidden sm:flex"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
              </Link>

              <Link
                to="/keranjang"
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors relative"
                title="Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#E7B65A] text-[#111111] text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#050505]">
                  2
                </span>
              </Link>
            </div>
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
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  location.pathname === link.href
                    ? 'text-[#E7B65A] bg-white/5 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-60" />}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

