import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { SeoHead } from '@/components/common/SeoHead';
import { productService } from '@/services/productService';
import type { Product } from '@fincell/shared';

const PLACEHOLDER_IMG = '/images/iphone17_transparent.png';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category') || '';
  const querySearch = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string>('ALL');

  useEffect(() => {
    setIsLoading(true);
    productService
      .getProducts({ status: 'active', limit: 60 })
      .then(res => {
        if (res.success && res.data) setProducts(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = products.filter(p => {
    if (selectedModel !== 'ALL') {
      const haystack = (p.name + p.category + p.categoryId).toLowerCase();
      if (!haystack.includes(selectedModel.toLowerCase())) return false;
    }
    if (queryCategory) {
      const haystack = (p.name + p.category + p.categoryId).toLowerCase();
      if (!haystack.includes(queryCategory.toLowerCase())) return false;
    }
    if (querySearch) {
      const q = querySearch.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !(p.sku || '').toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const getImg = (p: Product) =>
    p.images?.[0] || PLACEHOLDER_IMG;

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen py-10">
      <SeoHead
        title="Katalog iPhone & Aksesoris — vincellid"
        description="Temukan koleksi iPhone garansi resmi Apple Indonesia dengan harga transparan di vincellid."
        canonicalUrl="https://vincellid.id/produk"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#D6A84F] mb-1">KATALOG</p>
          <h1 className="text-2xl font-black text-white tracking-tight">iPhone &amp; Perangkat</h1>
          <p className="text-[12px] text-[#666] mt-1">
            Temukan perangkat sesuai kebutuhan Anda.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#222] pb-4">
          {[
            { id: 'ALL', label: 'Semua iPhone' },
            { id: '17', label: 'iPhone 17' },
            { id: '16', label: 'iPhone 16' },
            { id: '15', label: 'iPhone 15' },
            { id: 'se', label: 'iPhone SE' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedModel(tab.id)}
              className={`px-4 py-1.5 text-[12px] font-semibold rounded-md transition-colors ${
                selectedModel === tab.id
                  ? 'bg-[#D6A84F] text-black'
                  : 'bg-[#1a1a1a] text-[#888] border border-[#2a2a2a] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] animate-pulse">
                <div className="aspect-square bg-[#222] rounded-t-xl" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-[#2a2a2a] rounded w-2/3" />
                  <div className="h-4 bg-[#2a2a2a] rounded w-full" />
                  <div className="h-4 bg-[#2a2a2a] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#555] text-sm">
            Tidak ada produk yang sesuai.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map(p => (
              <div
                key={p.id}
                className="bg-[#161616] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#D6A84F]/50 transition-colors group"
              >
                {/* Image */}
                <div
                  className="aspect-square flex items-center justify-center p-5 bg-[#111] cursor-pointer"
                  onClick={() => { trackEvent('ViewContent', { content_name: p.name }); navigate(`/produk/${p.slug}`); }}
                >
                  <img
                    src={getImg(p)}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                  />
                </div>

                {/* Info */}
                <div className="p-3 space-y-1.5">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/produk/${p.slug}`)}
                  >
                    <p className="text-[10px] text-[#555] font-mono">{p.category}</p>
                    <h3 className="text-[13px] font-bold text-white group-hover:text-[#D6A84F] transition-colors leading-tight">
                      {p.name}
                    </h3>
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-white">
                      Rp {p.basePrice.toLocaleString('id-ID')}
                    </p>
                    {p.originalPrice && (
                      <p className="text-[10px] text-[#555] line-through">
                        Rp {p.originalPrice.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        trackEvent('Contact', { content_name: p.name, value: p.basePrice, currency: 'IDR' });
                        openWhatsApp(buildProductWhatsAppMessage({ productName: p.name, price: p.basePrice }));
                      }}
                      className="w-full bg-[#25D366] hover:bg-[#1db954] text-black font-bold text-[11px] uppercase tracking-wider py-2 rounded-md transition-colors text-center"
                    >
                      Beli via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
