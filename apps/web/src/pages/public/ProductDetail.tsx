import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Truck, CheckCircle2 } from 'lucide-react';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { SeoHead } from '@/components/common/SeoHead';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock product detail for vincellid
  const product = {
    id: 'prod-001',
    name: slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'iPhone 17 Pro Max',
    slug: slug || 'iphone-17-pro-max',
    price: 24999000,
    storages: ['256GB', '512GB', '1TB'],
    colors: ['Orange', 'Natural Titanium', 'Black Titanium'],
    description: 'iPhone 17 Pro Max memadukan performa chipset generasi terbaru dengan kamera canggih dan ketahanan baterai maksimal untuk pengalaman profesional.',
    specifications: [
      { label: 'Chipset', value: 'A18 Pro Bionic' },
      { label: 'Layar', value: '6.9" Super Retina XDR ProMotion 120Hz' },
      { label: 'Kamera', value: '48MP Main + 48MP Ultra Wide + 48MP Telephoto' },
      { label: 'Garansi', value: '1 Tahun Garansi Resmi Apple Indonesia' },
    ],
    image: '/images/iphone17_transparent.png',
  };

  const [selectedStorage, setSelectedStorage] = useState<string>(product.storages[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);

  const handleBuyWhatsApp = () => {
    trackEvent('Contact', {
      content_name: product.name,
      value: product.price,
      currency: 'IDR',
    });
    const message = buildProductWhatsAppMessage({
      productName: product.name,
      storage: selectedStorage,
      color: selectedColor,
      price: product.price,
      slug: product.slug,
    });
    openWhatsApp(message);
  };

  const handleAskWhatsApp = () => {
    openWhatsApp(`Halo vincellid, saya ada pertanyaan tentang ${product.name} (${selectedStorage}, ${selectedColor}).`);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen py-12">
      <SeoHead
        title={`${product.name} — vincellid`}
        description={product.description}
        canonicalUrl={`https://vincellid.id/produk/${product.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-white">Beranda</Link>
          <span>/</span>
          <Link to="/produk" className="hover:text-white">Produk</Link>
          <span>/</span>
          <span className="text-[#D6A84F] font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7 bg-[#080808] border border-[#262626] rounded-md p-8 flex items-center justify-center min-h-[400px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[450px] w-auto object-contain"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">GARANSI RESMI</span>
              <h1 className="text-3xl font-extrabold text-white mt-1">{product.name}</h1>
              <p className="text-2xl font-bold text-[#D6A84F] mt-2">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Storage Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Storage</label>
              <div className="flex gap-3">
                {product.storages.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`px-4 py-2 text-xs font-mono rounded-sm border transition-colors ${
                      selectedStorage === st
                        ? 'bg-[#D6A84F] text-black border-[#D6A84F] font-bold'
                        : 'bg-[#101010] text-gray-300 border-[#262626] hover:border-gray-600'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Warna</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 text-xs rounded-sm border transition-colors ${
                      selectedColor === c
                        ? 'border-[#D6A84F] text-[#D6A84F] font-semibold bg-[#D6A84F]/10'
                        : 'border-[#262626] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#262626]">
              <button
                onClick={handleBuyWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-md transition-colors text-center"
              >
                Beli via WhatsApp
              </button>
              <button
                onClick={handleAskWhatsApp}
                className="w-full bg-[#101010] border border-[#262626] hover:border-[#D6A84F] text-white font-medium text-xs uppercase tracking-wider py-3 rounded-md transition-colors text-center"
              >
                Tanya Produk
              </button>
            </div>

            {/* Specs & Info */}
            <div className="pt-6 border-t border-[#262626] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Spesifikasi Utama</h3>
              <div className="space-y-2 text-xs text-gray-400">
                {product.specifications.map((s) => (
                  <div key={s.label} className="flex justify-between py-1 border-b border-[#262626]/50">
                    <span>{s.label}</span>
                    <span className="text-white font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-gray-400 pt-2">
              <div className="p-2 bg-[#101010] rounded border border-[#262626] flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-[#D6A84F]" />
                <span>Original</span>
              </div>
              <div className="p-2 bg-[#101010] rounded border border-[#262626] flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#D6A84F]" />
                <span>Pengiriman Cepat</span>
              </div>
              <div className="p-2 bg-[#101010] rounded border border-[#262626] flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" />
                <span>Garansi Resmi</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
