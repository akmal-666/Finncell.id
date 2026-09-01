import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { openWhatsApp } from '@/utils/whatsapp';

export const PublicHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk' },
    { label: 'Aksesoris', href: '/aksesoris' },
    { label: 'Trade In', href: '/trade-in' },
    { label: 'Blog', href: '/blog' },
    { label: 'Tentang Kami', href: '/tentang-kami' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/produk?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false);
  };

  const handleWhatsAppClick = () => {
    openWhatsApp('Halo vincellid, saya ingin bertanya tentang produk iPhone & aksesoris.');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050505] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 shrink-0">
            <span className="text-white">vincellid</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs font-medium uppercase tracking-wider text-gray-300 hover:text-[#D6A84F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari iPhone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-8 pr-3 py-1.5 bg-[#101010] border border-[#262626] rounded-md text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A84F] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs px-4 py-2 rounded-md transition-colors"
            >
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="px-3 py-1.5 bg-[#25D366] text-black font-bold text-xs rounded-md"
            >
              WA
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-[#262626]">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari iPhone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#101010] border border-[#262626] rounded-md text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D6A84F]"
                autoFocus
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#262626] space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-200 hover:text-[#D6A84F] py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/hubungi-kami"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-gray-200 hover:text-[#D6A84F] py-1"
            >
              Hubungi Kami
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
