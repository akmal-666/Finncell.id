import React from 'react';
import { Bell, Search, ExternalLink, LogOut, User, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '../ui/Badge';

export interface AdminHeaderProps {
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title = 'Dashboard' }) => {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case 'super_admin': return 'dark';
      case 'admin': return 'secondary';
      case 'content_manager': return 'outline';
      case 'order_manager': return 'success';
      case 'seo_manager': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-[#111111] border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-base font-bold text-[#111111] dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <input
            type="text"
            placeholder="Cari pesanan, produk, pengguna..."
            className="w-64 pl-9 pr-4 py-1.5 text-xs bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 rounded-lg text-[#111111] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#111111] dark:focus:border-[#E7B65A]"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 pointer-events-none" />
        </div>

        {/* Store link */}
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[#111111] dark:text-white transition-colors"
        >
          <span>Lihat Toko</span>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </Link>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-[#111111] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* User Info & Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-[#111111] dark:bg-[#E7B65A] text-white dark:text-[#111111] text-xs font-bold flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#111111] dark:text-white truncate max-w-[120px]">
              {session?.name || 'Administrator'}
            </span>
            <div className="flex items-center gap-1">
              <Badge variant={getRoleBadgeVariant(session?.role)} size="sm">
                {session?.role || 'admin'}
              </Badge>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Keluar dari Admin Portal"
            className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
