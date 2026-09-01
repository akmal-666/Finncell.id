import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  RefreshCw,
  FileText,
  Search,
  Image,
  Users,
  Settings,
  Activity,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { session, logout } = useAuth();

  const mainLinks = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Produk', href: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { label: 'Kategori', href: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Brand', href: '/admin/brands', icon: <Tag className="w-4 h-4" /> },
    { label: 'Trade In', href: '/admin/trade-in', icon: <RefreshCw className="w-4 h-4" /> },
    { label: 'Blog / Konten', href: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
    { label: 'SEO Manager', href: '/admin/seo', icon: <Search className="w-4 h-4" /> },
    { label: 'Media Library', href: '/admin/media', icon: <Image className="w-4 h-4" /> },
    { label: 'Pengguna Admin', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Pengaturan Toko', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
    { label: 'Log Aktivitas', href: '/admin/activity-log', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#080808] border-r border-[#262626] min-h-screen flex flex-col justify-between p-4 text-gray-300">
      <div className="space-y-6">
        <Link to="/admin" className="flex items-center gap-2 px-2 text-white font-bold tracking-tight text-lg">
          <ShieldCheck className="w-5 h-5 text-[#D6A84F]" />
          <span>vincellid Admin</span>
        </Link>

        <nav className="space-y-1">
          {mainLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#D6A84F] text-black font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-[#101010]'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-[#262626] space-y-3">
        <div className="px-2 text-xs">
          <p className="text-white font-semibold">{session?.name || 'Administrator'}</p>
          <p className="text-[11px] text-gray-500 font-mono">{session?.email || 'admin@vincellid.id'}</p>
        </div>
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Portal</span>
        </button>
      </div>
    </aside>
  );
};
