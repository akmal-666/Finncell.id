import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#050505] text-[#111111] dark:text-white font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AdminHeader />
        <main className="flex-1 bg-gray-50/50 dark:bg-[#050505]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
