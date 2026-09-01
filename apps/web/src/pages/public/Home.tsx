import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleHeroBuyClick = () => {
    trackEvent('Contact', { content_name: 'iPhone 17 Pro Max Hero CTA' });
    const message = buildProductWhatsAppMessage({
      productName: 'iPhone 17 Pro Max',
      storage: '256GB',
      color: 'Orange',
    });
    openWhatsApp(message);
  };

  const handleFeaturedClick = (slug: string) => {
    trackEvent('ViewContent', { content_name: slug });
    navigate(`/produk/${slug}`);
  };

  return (
    <div className="bg-[#050505] text-white">

      {/* HERO SECTION - MIDNIGHT GOLD */}
      <section className="relative overflow-hidden bg-[#050505] pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[#262626]">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D6A84F]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/20 px-3 py-1 rounded-sm">
                NEW ARRIVAL
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
                Pro. Melampaui.
                <br />
                <span className="text-[#D6A84F]">Dalam segala hal.</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed">
                Performa ekstrem. Desain premium. Pengalaman iPhone yang lebih berani untuk kebutuhan profesional Anda.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleHeroBuyClick}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-md transition-colors text-center"
                >
                  Belanja via WhatsApp
                </button>

                <Link
                  to="/produk/iphone-17-pro-max"
                  className="border border-[#262626] hover:border-[#D6A84F] text-white font-medium text-xs tracking-wider uppercase px-8 py-3.5 rounded-md transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Product Render - Seamless Background Integration */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square flex items-center justify-center">
                <img
                  src="/images/iphone17_transparent.png"
                  alt="iPhone 17 Pro Max"
                  className="w-full h-auto max-h-[500px] object-contain filter drop-shadow-[0_20px_40px_rgba(214,168,79,0.15)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* HERO TRUST STRIP */}
        <div className="mt-16 border-t border-[#262626]/60 pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#D6A84F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Garansi Resmi</p>
                <p className="text-[11px] text-gray-500">Apple Indonesia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-[#D6A84F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Pengiriman Cepat</p>
                <p className="text-[11px] text-gray-500">Seluruh Indonesia</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">100% Original</p>
                <p className="text-[11px] text-gray-500">Produk Terverifikasi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#D6A84F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white">Produk Bergaransi</p>
                <p className="text-[11px] text-gray-500">Jaminan Unit Baru</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* PRODUCT DISCOVERY - CLEAN WHITE CONTRAST */}
      <section className="bg-white text-black py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-widest text-[#B88A32] uppercase">JELAJAHI PRODUK</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
              Pilih iPhone sesuai kebutuhanmu.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {[
              { label: 'iPhone 17 Series', query: '17', img: '/images/iphone17_transparent.png' },
              { label: 'iPhone 16 Series', query: '16', img: '/images/iphone17pm_transparent.png' },
              { label: 'iPhone 15 Series', query: '15', img: '/images/hero-iphone17-gold.png' },
              { label: 'iPhone SE', query: 'se', img: '/images/iphone17_transparent.png' },
              { label: 'Accessories', query: 'aksesoris', img: '/images/iphone17pm.png' },
            ].map((cat) => (
              <div
                key={cat.label}
                onClick={() => navigate(`/produk?category=${encodeURIComponent(cat.query)}`)}
                className="group cursor-pointer bg-[#F5F5F3] p-6 rounded-md hover:bg-gray-100 transition-colors border border-gray-200 text-center flex flex-col items-center justify-between"
              >
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  <img src={cat.img} alt={cat.label} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* EDITORIAL FEATURED PRODUCT */}
      <section className="bg-[#080808] py-20 lg:py-28 border-y border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <img
                src="/images/iphone17pm_transparent.png"
                alt="iPhone 17 Pro Max Editorial"
                className="w-full max-h-[450px] object-contain mx-auto"
              />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">FEATURED EDITION</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pro yang tidak perlu banyak bicara.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Performa, kamera, dan desain yang dirancang untuk penggunaan tanpa kompromi. Setiap detail telah dikurasi oleh vincellid untuk standar tinggi Anda.
              </p>
              <div>
                <button
                  onClick={() => handleFeaturedClick('iphone-17-pro-max')}
                  className="bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-semibold text-xs tracking-wider uppercase px-8 py-3 rounded-md transition-colors"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* PRODUCT COLLECTION GRID */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">KATALOG PILIHAN</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Produk Pilihan</h2>
            </div>
            <Link to="/produk" className="text-xs text-[#D6A84F] hover:underline font-semibold uppercase tracking-wider">
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'iPhone 17 Pro Max', storage: '256GB', price: 24999000, slug: 'iphone-17-pro-max', img: '/images/iphone17_transparent.png' },
              { name: 'iPhone 17 Pro', storage: '128GB', price: 21999000, slug: 'iphone-17-pro', img: '/images/iphone17pm_transparent.png' },
              { name: 'iPhone 16 Pro Max', storage: '256GB', price: 22499000, slug: 'iphone-16-pro-max', img: '/images/hero-iphone17-gold.png' },
              { name: 'iPhone 15', storage: '128GB', price: 14299000, slug: 'iphone-15', img: '/images/iphone17_transparent.png' },
            ].map((product) => (
              <div
                key={product.slug}
                className="bg-[#101010] border border-[#262626] rounded-md p-5 flex flex-col justify-between hover:border-[#D6A84F] transition-colors group"
              >
                <div
                  onClick={() => navigate(`/produk/${product.slug}`)}
                  className="cursor-pointer space-y-4"
                >
                  <div className="aspect-square flex items-center justify-center p-4 bg-[#080808] rounded-sm">
                    <img src={product.img} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase font-mono">{product.storage}</p>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#D6A84F] transition-colors">{product.name}</h3>
                    <p className="text-xs font-semibold text-[#D6A84F] mt-1">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      trackEvent('Contact', { content_name: product.name });
                      openWhatsApp(buildProductWhatsAppMessage({ productName: product.name, storage: product.storage, price: product.price }));
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
      </section>


      {/* TRADE IN EDITORIAL SECTION */}
      <section className="bg-[#080808] py-20 lg:py-28 border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">TRADE IN SERVICE</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Tukar iPhone lamamu.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Dapatkan estimasi nilai perangkatmu secara transparan dan gunakan langsung untuk upgrade ke generasi iPhone berikutnya.
              </p>

              <div className="grid grid-cols-2 gap-4 py-4 text-xs">
                <div>
                  <span className="text-[#D6A84F] font-mono font-bold block text-base">01</span>
                  <p className="text-white font-medium">Pilih perangkat</p>
                </div>
                <div>
                  <span className="text-[#D6A84F] font-mono font-bold block text-base">02</span>
                  <p className="text-white font-medium">Kirim detail</p>
                </div>
                <div>
                  <span className="text-[#D6A84F] font-mono font-bold block text-base">03</span>
                  <p className="text-white font-medium">Dapat estimasi</p>
                </div>
                <div>
                  <span className="text-[#D6A84F] font-mono font-bold block text-base">04</span>
                  <p className="text-white font-medium">Upgrade</p>
                </div>
              </div>

              <div>
                <Link
                  to="/trade-in"
                  className="bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-semibold text-xs tracking-wider uppercase px-8 py-3 rounded-md transition-colors inline-block"
                >
                  Mulai Trade In
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <img src="/images/iphone17_transparent.png" alt="Trade In Vincellid" className="max-h-[400px] object-contain" />
            </div>
          </div>
        </div>
      </section>


      {/* CONTACT CTA */}
      <section className="bg-[#050505] py-16 text-center border-t border-[#262626]">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-white">Butuh konsultasi tipe iPhone yang tepat?</h2>
          <p className="text-xs text-gray-400">Tim spesialis vincellid siap membantu memberikan rekomendasi terbaik sesuai kebutuhan Anda.</p>
          <div className="pt-2">
            <button
              onClick={() => openWhatsApp('Halo vincellid, saya ingin konsultasi produk iPhone.')}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase px-8 py-3 rounded-md transition-colors"
            >
              Konsultasi via WhatsApp
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
