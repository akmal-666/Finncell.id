import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Tag,
  RefreshCw,
  FileText,
  Search,
  Image as ImageIcon,
  Users,
  Settings,
  TrendingUp,
  Award,
  Boxes,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const mainLinks = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Pesanan', href: '/admin/orders', icon: <ShoppingCart className="w-4 h-4" /> },
    { label: 'Produk', href: '/admin/products', icon: <Package className="w-4 h-4" /> },
    { label: 'Kategori', href: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Promo', href: '/admin/promos', icon: <Tag className="w-4 h-4" /> },
    { label: 'Trade In', href: '/admin/trade-in', icon: <RefreshCw className="w-4 h-4" /> },
    { label: 'Konten / Blog', href: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
    { label: 'SEO', href: '/admin/seo', icon: <Search className="w-4 h-4" /> },
    { label: 'Media', href: '/admin/media', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Pengguna', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Pengaturan', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const reportLinks = [
    { label: 'Penjualan', href: '/admin/reports/sales', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Produk Terlaris', href: '/admin/reports/best-sellers', icon: <Award className="w-4 h-4" /> },
    { label: 'Stok', href: '/admin/reports/inventory', icon: <Boxes className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#061426] text-white border-r border-[#0B1F3A] flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-[#0B1F3A]">
        <Link to="/admin" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <ShieldCheck className="w-5 h-5 text-[#5EA7FF]" />
          <span>fincell<span className="text-[#1769E0]">.id</span></span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded bg-[#1769E0] text-white font-semibold uppercase">Admin</span>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Navigasi Utama</p>
          <nav className="space-y-1">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.href || (link.href !== '/admin' && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#0B1F3A] text-[#5EA7FF] font-semibold border-l-2 border-[#1769E0]'
                      : 'text-slate-300 hover:text-white hover:bg-[#0B1F3A]/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Laporan</p>
          <nav className="space-y-1">
            {reportLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#0B1F3A] text-[#5EA7FF] font-semibold border-l-2 border-[#1769E0]'
                      : 'text-slate-300 hover:text-white hover:bg-[#0B1F3A]/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-[#0B1F3A] bg-[#0B1F3A]/40 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-[#1769E0] text-white font-bold text-xs flex items-center justify-center shrink-0">
            FA
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-white truncate">Admin fincell</p>
            <p className="text-[10px] text-slate-400 truncate">admin@fincell.id</p>
          </div>
        </div>
        <Link to="/admin/login" className="text-slate-400 hover:text-red-400 p-1.5 rounded-md transition-colors" title="Logout">
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
};
