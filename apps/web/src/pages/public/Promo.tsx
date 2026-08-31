import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { promoService } from '@/services/promoService';
import { Promo } from '@fincell/shared';
import { Tag, Copy, Check } from 'lucide-react';
import { SeoHead } from '@/components/common/SeoHead';

export const PromoPage: React.FC = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    promoService.getPromos().then((res) => {
      if (res.data) setPromos(res.data);
    });
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <>
      <SeoHead
        title="Promo &amp; Voucher Spesial — fincell.id"
        description="Dapatkan potongan harga eksklusif untuk setiap transaksi iPhone di fincell.id."
        canonicalUrl="https://fincell.id/promo"
      />

      <PageContainer
        title="Penawaran Khusus"
        subtitle="Gunakan kode penawaran untuk potongan harga pembelian unit iPhone &amp; aksesoris."
        breadcrumbs={[{ label: 'Promo' }]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {promos.map((promo) => (
            <Card key={promo.id} className="p-6 border border-[#DCE5EF] hover:border-[#1769E0] bg-white rounded-md space-y-4 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1769E0] uppercase tracking-wider block mb-1">PENAWARAN AKTIF</span>
                  <h3 className="text-lg font-extrabold text-[#061426]">{promo.title}</h3>
                </div>
                <Tag className="w-5 h-5 text-[#1769E0]" />
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">{promo.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-[#DCE5EF]">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">KODE PROMO</p>
                  <span className="text-sm font-mono font-black text-[#061426]">{promo.code}</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleCopy(promo.code)}
                  className={`font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-md transition-colors ${
                    copiedCode === promo.code
                      ? 'bg-[#1769E0] text-white'
                      : 'border border-[#DCE5EF] text-[#061426] hover:bg-[#F7F9FC]'
                  }`}
                  leftIcon={copiedCode === promo.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedCode === promo.code ? 'Tersalin' : 'Salin Kode'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
};
