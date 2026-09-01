import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Smartphone, RefreshCw, BookOpen, Info } from 'lucide-react';

const TABS = [
  { label: 'Beranda', href: '/', Icon: Home },
  { label: 'Produk', href: '/produk', Icon: Smartphone },
  { label: 'Trade In', href: '/trade-in', Icon: RefreshCw },
  { label: 'Blog', href: '/blog', Icon: BookOpen },
  { label: 'Tentang Kami', href: '/tentang-kami', Icon: Info },
];

export const MobileBottomNav: React.FC = () => {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0d0d0d] border-t border-white/[0.08] safe-area-pb">
      <div className="flex items-center justify-around h-[56px] max-w-lg mx-auto px-2">
        {TABS.map(({ label, href, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              to={href}
              className="flex flex-col items-center gap-0.5 flex-1 py-1 group"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  active ? 'text-[#D6A84F]' : 'text-[#666] group-hover:text-[#aaa]'
                }`}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span
                className={`text-[9px] font-semibold transition-colors ${
                  active ? 'text-[#D6A84F]' : 'text-[#666] group-hover:text-[#aaa]'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
