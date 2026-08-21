import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Permission } from '@fincell/shared';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredPermission }) => {
  const { isAuthenticated, isLoading, checkPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#E7B65A] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-gray-400 font-medium">Memverifikasi Sesi Admin...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !checkPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
        <Card variant="dark" className="p-8 max-w-md w-full space-y-4 border border-rose-900/40 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black">Akses Ditolak (403)</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Peran akun Anda tidak memiliki izin <code className="text-rose-400 font-mono bg-rose-950/50 px-1.5 py-0.5 rounded">{requiredPermission}</code> untuk mengakses halaman ini.
          </p>
          <div className="pt-2 flex justify-center">
            <a href="/admin">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Kembali ke Dashboard
              </Button>
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
