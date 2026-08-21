import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { promoService } from '@/services/promoService';
import { formatRupiah } from '@/lib/utils';
import { Promo } from '@fincell/shared';
import { Tag, Copy, Check } from 'lucide-react';

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
    <PageContainer
      title="Promo & Voucher Spesial"
      subtitle="Gunakan kode promo untuk mendapatkan potongan harga eksklusif di fincell.id."
      breadcrumbs={[{ label: 'Promo' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map((promo) => (
          <Card key={promo.id} className="p-6 border-l-4 border-l-[#E7B65A] bg-white border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="accent" size="sm" className="mb-2">Voucher Aktif</Badge>
                <h3 className="text-lg font-bold text-[#111111]">{promo.title}</h3>
              </div>
              <Tag className="w-6 h-6 text-[#E7B65A]" />
            </div>
            <p className="text-xs text-gray-500">{promo.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Kode Voucher</p>
                <span className="text-sm font-mono font-bold text-[#111111]">{promo.code}</span>
              </div>
              <Button
                variant={copiedCode === promo.code ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => handleCopy(promo.code)}
                leftIcon={copiedCode === promo.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copiedCode === promo.code ? 'Tersalin' : 'Salin Kode'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};
