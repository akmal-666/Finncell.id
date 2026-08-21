import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <PageContainer
      title="Tentang fincell.id"
      subtitle="Pusat belanja online iPhone & Apple ecosystem terpercaya di Indonesia."
      breadcrumbs={[{ label: 'Tentang Kami' }]}
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        <Card className="p-8 space-y-4 bg-white border border-gray-200">
          <Badge variant="accent" size="sm">Brand Identity</Badge>
          <h2 className="text-2xl font-extrabold text-[#111111]">Komitmen Kualitas & Pelayanan Premium</h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            fincell.id didirikan dengan misi menyediakan perangkat iPhone dan Apple ecosystem bergaransi resmi dengan transparansi penuh, harga kompetitif, serta kemudahan transaksi online bagi seluruh masyarakat Indonesia.
          </p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#E7B65A] mx-auto" />
            <h4 className="text-sm font-bold text-[#111111]">100% Original</h4>
            <p className="text-xs text-gray-500">Seluruh unit dijamin original dengan garansi resmi Apple Indonesia.</p>
          </Card>
          <Card className="p-6 text-center space-y-3">
            <Award className="w-8 h-8 text-[#E7B65A] mx-auto" />
            <h4 className="text-sm font-bold text-[#111111]">Jaminan Transparansi</h4>
            <p className="text-xs text-gray-500">Detail spesifikasi, kondisi, dan garansi dijelaskan secara terbuka tanpa biaya tersembunyi.</p>
          </Card>
          <Card className="p-6 text-center space-y-3">
            <HeartHandshake className="w-8 h-8 text-[#E7B65A] mx-auto" />
            <h4 className="text-sm font-bold text-[#111111]">Layanan Purna Jual</h4>
            <p className="text-xs text-gray-500">Tim dukungan pelanggan siap membantu klaim garansi dan konsultasi teknis.</p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};
