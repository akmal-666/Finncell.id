import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@fincell/shared';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/common/SeoHead';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts({ category: 'cat-5' }).then((res) => {
      if (res.data) setAccessories(res.data);
    });
  }, []);

  return (
    <>
      <SeoHead
        title="Aksesoris Original Apple — fincell.id"
        description="Pengisi daya, adaptor 20W, MagSafe, dan kabel original Apple di fincell.id."
        canonicalUrl="https://fincell.id/aksesoris"
      />

      <PageContainer
        title="Aksesoris Original Apple"
        subtitle="Pengisi daya, adaptor, kabel MagSafe &amp; USB-C original bergaransi resmi."
        breadcrumbs={[{ label: 'Aksesoris' }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessories.map((item) => (
            <Card key={item.id} className="group overflow-hidden border border-[#DCE5EF] hover:border-[#1769E0] transition-all duration-200 p-4 bg-white rounded-md flex flex-col justify-between">
              <div>
                <div className="relative aspect-square rounded-md overflow-hidden bg-[#F7F9FC] mb-4 flex items-center justify-center">
                  <img src={item.images[0]} alt={item.name} className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#1769E0] uppercase tracking-wider block">100% ORIGINAL APPLE</span>
                  <h4 className="text-sm font-bold text-[#061426] group-hover:text-[#1769E0] transition-colors">{item.name}</h4>
                  <p className="text-xs text-[#64748B] line-clamp-2">{item.summary}</p>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-black text-[#061426]">{formatRupiah(item.basePrice)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link to={`/produk/${item.slug}`}>
                  <Button size="sm" className="w-full bg-[#061426] hover:bg-[#1769E0] text-white font-semibold text-xs tracking-wider uppercase py-2.5 rounded-md transition-colors">
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  );
};
