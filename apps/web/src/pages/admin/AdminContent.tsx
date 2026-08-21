import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';

export const AdminContentPage: React.FC = () => {
  return (
    <PageContainer
      title="Manajemen Konten CMS"
      subtitle="Atur teks banner beranda, headline promo, dan teks informasi toko."
    >
      <div className="space-y-6 max-w-4xl">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Hero Banner Utama</h3>
          <Input label="Headline Utama" defaultValue="iPhone 15 Pro Max. Titanium. Kuat & Ringan." />
          <Textarea label="Deskripsi Banner" defaultValue="Temukan koleksi iPhone original bergaransi resmi Apple Indonesia..." rows={2} />
          <Input label="Teks Button Primary" defaultValue="Belanja Sekarang" />
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
