import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] font-sans">
      <PublicHeader />
      <main className="flex-1 pb-14 lg:pb-0">
        <Outlet />
      </main>
      <PublicFooter />
      <MobileBottomNav />
    </div>
  );
};
