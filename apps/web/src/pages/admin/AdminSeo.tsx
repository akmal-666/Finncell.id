import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Save } from 'lucide-react';

export const AdminSeoPage: React.FC = () => {
  return (
    <PageContainer
      title="Pengaturan SEO & Meta Tags"
      subtitle="Optimalkan mesin pencari Google untuk kata kunci 'fincell.id', 'jual iPhone murah', dan 'trade in iPhone'."
    >
      <div className="space-y-6 max-w-4xl">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">Default Meta Tag Beranda</h3>
          <Input label="Meta Title Beranda *" defaultValue="fincell.id — Toko iPhone & Apple Ecosystem Garansi Resmi" />
          <Textarea label="Meta Description Beranda *" defaultValue="Beli iPhone 15, 14, 13 series bergaransi resmi Apple Indonesia. Nikmati promo voucher & layanan Trade-in instan di fincell.id." rows={3} />
          <Input label="Keywords Utama (Dipisah Koma)" defaultValue="fincell.id, iphone garansi resmi, trade in iphone, aksesoris apple original, iphone 15 pro max" />
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Simpan Konfigurasi SEO
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
