import React from 'react';
import { useNavigate } from 'react-router-dom';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { SeoHead } from '@/components/common/SeoHead';

export const AccessoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const accessories = [
    { name: 'MagSafe Charger 25W Original', category: 'Charger', price: 899000, slug: 'magsafe-charger-25w', img: '/images/iphone17_transparent.png' },
    { name: 'Power Adapter 30W USB-C', category: 'Power', price: 549000, slug: 'power-adapter-30w', img: '/images/iphone17pm_transparent.png' },
    { name: 'Silicone Case with MagSafe', category: 'Case', price: 999000, slug: 'silicone-case-magsafe', img: '/images/hero-iphone17-gold.png' },
    { name: 'AirPods Pro (2nd Gen) USB-C', category: 'Audio', price: 3999000, slug: 'airpods-pro-2nd-gen', img: '/images/iphone17_transparent.png' },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen py-12">
      <SeoHead
        title="Aksesoris Original Apple — vincellid"
        description="Aksesoris resmi MagSafe, charger, case, dan audio Apple original di vincellid."
        canonicalUrl="https://vincellid.id/aksesoris"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">AKSESORIS RESMI</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">Aksesoris Original</h1>
          <p className="text-xs text-gray-400 mt-1">Pengisian daya cepat, perlindungan presisi, dan perangkat audio resmi Apple.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {accessories.map((item) => (
            <div key={item.slug} className="bg-[#101010] border border-[#262626] rounded-md p-5 flex flex-col justify-between hover:border-[#D6A84F] transition-colors group">
              <div onClick={() => navigate(`/produk/${item.slug}`)} className="cursor-pointer space-y-4">
                <div className="aspect-square flex items-center justify-center p-4 bg-[#080808] rounded-sm">
                  <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 uppercase font-mono">{item.category}</p>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D6A84F] transition-colors">{item.name}</h3>
                  <p className="text-xs font-semibold text-[#D6A84F] mt-1">
                    Rp {item.price.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    trackEvent('Contact', { content_name: item.name });
                    openWhatsApp(buildProductWhatsAppMessage({ productName: item.name, price: item.price }));
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
