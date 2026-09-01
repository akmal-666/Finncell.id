import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/utils/whatsapp';

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Produk', href: '/produk' },
  { label: 'Aksesoris', href: '/aksesoris' },
  { label: 'Trade In', href: '/trade-in' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
];

export const PublicHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/produk?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111111] border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="shrink-0 flex items-center gap-1.5 text-white font-black text-lg tracking-tight">
            <span className="text-white">vincellid</span>
            <span className="text-[10px] font-normal text-[#888] hidden sm:inline ml-1 tracking-wider">
              Your iPhone Destination
            </span>
          </Link>

          {/* ── Center Nav (desktop) ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors rounded-sm ${
                  isActive(link.href)
                    ? 'text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#D6A84F] after:rounded-full'
                    : 'text-[#aaa] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Right Controls (desktop) ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari iPhone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-44 xl:w-52 pl-8 pr-3 py-1.5 bg-[#1f1f1f] border border-[#333] rounded-md text-[11px] text-white placeholder-[#666] focus:outline-none focus:border-[#D6A84F] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-[#666] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* WhatsApp CTA */}
            <button
              onClick={() => openWhatsApp('Halo vincellid, saya ingin bertanya tentang produk iPhone.')}
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-[11px] px-3.5 py-1.5 rounded-md transition-colors"
              title="Chat WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* ── Mobile Right Controls ── */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button
              onClick={() => navigate('/produk')}
              className="p-1.5 text-[#aaa] hover:text-white"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => openWhatsApp('Halo vincellid, saya ingin bertanya tentang produk iPhone.')}
              className="px-2.5 py-1.5 bg-[#25D366] text-black font-bold text-[11px] rounded-md"
            >
              WA
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-1.5 text-[#aaa] hover:text-white"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ── Mobile Drawer ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#2a2a2a] py-3 space-y-1">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                placeholder="Cari iPhone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#1f1f1f] border border-[#333] rounded-md text-[11px] text-white placeholder-[#666] focus:outline-none focus:border-[#D6A84F]"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#555] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {[...NAV_LINKS, { label: 'Hubungi Kami', href: '/hubungi-kami' }].map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-2 py-2 text-sm font-medium rounded-sm transition-colors ${
                  isActive(link.href) ? 'text-[#D6A84F]' : 'text-[#ccc] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
