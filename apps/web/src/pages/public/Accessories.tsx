import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@fincell/shared';
import { Link } from 'react-router-dom';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts({ category: 'cat-5' }).then((res) => {
      if (res.data) setAccessories(res.data);
    });
  }, []);

  return (
    <PageContainer
      title="Aksesoris Original Apple"
      subtitle="Pengisi daya, adaptor, kabel Lightning / USB-C, MagSafe, dan case premium."
      breadcrumbs={[{ label: 'Aksesoris' }]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessories.map((item) => (
          <Card key={item.id} className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <Badge variant="accent" size="sm" className="absolute top-3 left-3">100% Original</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#B88632] transition-colors">{item.name}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{item.summary}</p>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-base font-extrabold text-[#111111]">{formatRupiah(item.basePrice)}</span>
              </div>
              <div className="pt-2">
                <Link to={`/produk/${item.slug}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Beli Aksesoris
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};
