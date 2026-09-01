import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { SeoHead } from '@/components/common/SeoHead';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category') || '';
  const querySearch = searchParams.get('q') || '';

  const [selectedModel, setSelectedModel] = useState<string>(queryCategory || 'ALL');

  const products = [
    { name: 'iPhone 17 Pro Max', category: '17', storage: '256GB', price: 24999000, slug: 'iphone-17-pro-max', img: '/images/iphone17_transparent.png' },
    { name: 'iPhone 17 Pro', category: '17', storage: '128GB', price: 21999000, slug: 'iphone-17-pro', img: '/images/iphone17pm_transparent.png' },
    { name: 'iPhone 16 Pro Max', category: '16', storage: '256GB', price: 22499000, slug: 'iphone-16-pro-max', img: '/images/hero-iphone17-gold.png' },
    { name: 'iPhone 15 Pro', category: '15', storage: '128GB', price: 18999000, slug: 'iphone-15-pro', img: '/images/iphone17_transparent.png' },
    { name: 'iPhone 15', category: '15', storage: '128GB', price: 14299000, slug: 'iphone-15', img: '/images/iphone17pm_transparent.png' },
    { name: 'iPhone SE (3rd Gen)', category: 'se', storage: '64GB', price: 7999000, slug: 'iphone-se-3rd-gen', img: '/images/hero-iphone17-gold.png' },
  ];

  const filteredProducts = products.filter((p) => {
    if (selectedModel !== 'ALL' && !p.category.toLowerCase().includes(selectedModel.toLowerCase())) {
      return false;
    }
    if (querySearch && !p.name.toLowerCase().includes(querySearch.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen py-12">
      <SeoHead
        title="Katalog iPhone & Aksesoris — vincellid"
        description="Temukan koleksi iPhone garansi resmi Apple Indonesia dengan harga transparan di vincellid."
        canonicalUrl="https://vincellid.id/produk"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">KATALOG UTAMA</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">iPhone &amp; Perangkat</h1>
          <p className="text-xs text-gray-400 mt-1">Temukan perangkat yang sesuai dengan kebutuhan dan spesifikasi profesional Anda.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#262626] pb-4">
          {[
            { id: 'ALL', label: 'Semua iPhone' },
            { id: '17', label: 'iPhone 17' },
            { id: '16', label: 'iPhone 16' },
            { id: '15', label: 'iPhone 15' },
            { id: 'se', label: 'iPhone SE' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedModel(tab.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors ${
                selectedModel === tab.id
                  ? 'bg-[#D6A84F] text-black font-bold'
                  : 'bg-[#101010] text-gray-400 border border-[#262626] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div key={p.slug} className="bg-[#101010] border border-[#262626] rounded-md p-5 flex flex-col justify-between hover:border-[#D6A84F] transition-colors group">
              <div onClick={() => navigate(`/produk/${p.slug}`)} className="cursor-pointer space-y-4">
                <div className="aspect-square flex items-center justify-center p-4 bg-[#080808] rounded-sm">
                  <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase font-mono">{p.storage}</p>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D6A84F] transition-colors">{p.name}</h3>
                  <p className="text-xs font-semibold text-[#D6A84F] mt-1">
                    Rp {p.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    trackEvent('Contact', { content_name: p.name });
                    openWhatsApp(buildProductWhatsAppMessage({ productName: p.name, storage: p.storage, price: p.price }));
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-[11px] tracking-wider uppercase py-2 rounded-sm transition-colors text-center"
                >
                  Beli via WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
