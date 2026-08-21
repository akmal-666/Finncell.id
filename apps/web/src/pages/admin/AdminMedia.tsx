import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, Image as ImageIcon } from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  return (
    <PageContainer
      title="Perpustakaan Media (Backblaze B2)"
      subtitle="Kelola aset gambar produk, banner promo, dan berkas foto toko."
      actions={
        <Button variant="primary" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
          Upload Gambar Baru
        </Button>
      }
    >
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
          ].map((url, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden border border-gray-200 group relative">
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" iconOnly={<ImageIcon className="w-3.5 h-3.5 text-white" />} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
};
