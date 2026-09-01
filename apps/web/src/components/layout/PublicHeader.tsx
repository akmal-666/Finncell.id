import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '@/utils/whatsapp';

const NAV = [
  { label: 'Beranda', href: '/' },
  { label: 'Produk', href: '/produk', hasDropdown: true },
  { label: 'Aksesoris', href: '/aksesoris' },
  { label: 'Trade In', href: '/trade-in' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
];

export const PublicHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/produk?q=${encodeURIComponent(q.trim())}`);
    setQ('');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center h-[52px] gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0 text-white font-black text-[17px] tracking-[-0.5px] mr-2">
            vincell<span className="text-[#D6A84F]">id</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV.map(({ label, href, hasDropdown }) => (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-0.5 px-3 py-1.5 rounded text-[12.5px] font-medium transition-colors ${
                  isActive(href) ? 'text-white' : 'text-[#999] hover:text-white'
                }`}
              >
                {label}
                {hasDropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 ml-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Cari iPhone..."
                className="w-[180px] pl-3 pr-9 py-[7px] bg-[#1a1a1a] border border-[#333] rounded-[6px] text-[12px] text-white placeholder-[#555] focus:outline-none focus:border-[#D6A84F] transition-colors"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <Search className="w-3.5 h-3.5 text-[#555]" />
              </button>
            </form>

            <button
              onClick={() => openWhatsApp('Halo vincellid, saya ingin bertanya tentang produk iPhone.')}
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1db954] text-black font-bold text-[12px] px-4 py-[7px] rounded-[6px] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button onClick={() => navigate('/produk')} className="p-2 text-[#aaa] hover:text-white">
              <Search className="w-5 h-5" />
            </button>
            <a
              href={`https://wa.me/628990033684`}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 bg-[#25D366] rounded-lg flex items-center justify-center"
            >
              <MessageCircle className="w-4.5 h-4.5 text-black" />
            </a>
            <button onClick={() => setMenuOpen(v => !v)} className="p-2 text-[#aaa] hover:text-white">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/[0.07] pt-3 pb-4 space-y-0.5">
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Cari iPhone..."
                autoFocus
                className="w-full pl-9 pr-3 py-2 bg-[#1a1a1a] border border-[#333] rounded-[6px] text-[13px] text-white placeholder-[#555] focus:outline-none focus:border-[#D6A84F]"
              />
              <Search className="w-4 h-4 text-[#555] absolute left-3 top-1/2 -translate-y-1/2" />
            </form>
            {[...NAV, { label: 'Hubungi Kami', href: '/hubungi-kami' }].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2.5 text-[13px] font-medium rounded transition-colors ${
                  isActive(href) ? 'text-[#D6A84F]' : 'text-[#ccc] hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
