import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, CheckCircle2, ShoppingBag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

/* ─── DATA ───────────────────────────────────────────────────── */

const CATEGORIES = [
  { label: 'iPhone 17 Series', sub: 'Terbaru', img: '/images/iphone17_transparent.png', q: '17' },
  { label: 'iPhone 16 Series', sub: 'Populer', img: '/images/iphone17pm_transparent.png', q: '16' },
  { label: 'iPhone 15 Series', sub: 'Hemat & Berkualitas', img: '/images/hero-iphone17-gold.png', q: '15' },
  { label: 'iPhone SE', sub: 'Ringkas & Powerful', img: '/images/iphone17_transparent.png', q: 'se' },
  { label: 'Semua iPhone', sub: 'Lihat Semua', img: '/images/iphone17pm_transparent.png', q: '' },
];

const BEST_SELLERS = [
  { name: 'iPhone 17 Pro Max', storage: '256GB', color: 'Natural Titanium', price: 24999000, rating: 4.9, reviews: 128, slug: 'iphone-17-pro-max', img: '/images/iphone17_transparent.png', badge: null },
  { name: 'iPhone 17', storage: '128GB', color: 'Pink', price: 14999000, rating: 4.8, reviews: 96, slug: 'iphone-17', img: '/images/iphone17pm_transparent.png', badge: null },
  { name: 'iPhone 16', storage: '128GB', color: 'Blue', price: 11199000, oldPrice: 11999000, rating: 4.7, reviews: 85, slug: 'iphone-16', img: '/images/hero-iphone17-gold.png', badge: '-7%' },
  { name: 'iPhone 15', storage: '128GB', color: 'Midnight', price: 8999000, rating: 4.6, reviews: 64, slug: 'iphone-15', img: '/images/iphone17_transparent.png', badge: null },
  { name: 'iPhone SE (3rd Gen)', storage: '64GB', color: 'Starlight', price: 5999000, rating: 4.6, reviews: 48, slug: 'iphone-se-3rd-gen', img: '/images/iphone17pm_transparent.png', badge: null },
];

/* ─── COMPONENT ──────────────────────────────────────────────── */

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [dot, setDot] = useState(0);

  const handleBuyWhatsApp = (p: typeof BEST_SELLERS[0]) => {
    trackEvent('Contact', { content_name: p.name });
    openWhatsApp(buildProductWhatsAppMessage({ productName: p.name, storage: p.storage, color: p.color, price: p.price }));
  };

  return (
    <div className="bg-white text-[#111]">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[420px] lg:min-h-[520px] overflow-hidden bg-[#0a0a0a] flex items-center"
        style={{
          backgroundImage: 'url(/images/hero-bg-gold.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        {/* dark gradient overlay — left side readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/85 via-[#080808]/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-20 w-full">
          <div className="max-w-xl space-y-4">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 border border-white/20 rounded-sm px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
              <span className="text-[11px] font-semibold tracking-widest text-white/80 uppercase">New Arrival</span>
            </div>

            {/* brand + headline */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <svg viewBox="0 0 814 1000" className="w-5 h-5 fill-white" aria-hidden="true">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-166.8-105.3C173.1 710.5 096.5 585.2 096.5 465.5c0-190.5 124.1-291.3 247.1-291.3 64.9 0 119.2 42.8 158.8 42.8 37.6 0 103.7-45.5 180.2-45.5zM600.5 64.5c28.1-33.5 48.8-80.5 48.8-127.5 0-6.5-.6-13-1.9-18.2-46.3 1.9-101.4 32.2-134.5 70.4-27.5 31.6-52.1 78.3-52.1 125.3 0 7.1 1.3 14.2 1.9 16.5 2.6.3 6.5.6 10.4.6 41.5 0 93.3-29.1 127.4-67.1z"/>
                </svg>
                <span className="text-white text-sm font-semibold tracking-wide">iPhone 17 Pro Max</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Pro.<br />Melampaui.<br />
                <span className="text-[#D6A84F]">Segalanya.</span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm">
              Performa ekstrem. Desain premium. Pengalaman iPhone yang lebih berani untuk kebutuhan profesional Anda.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => {
                  trackEvent('Contact', { content_name: 'Hero CTA' });
                  openWhatsApp(buildProductWhatsAppMessage({ productName: 'iPhone 17 Pro Max', storage: '256GB', color: 'Orange' }));
                }}
                className="bg-white hover:bg-gray-100 text-[#111] font-bold text-xs px-6 py-2.5 rounded-sm transition-colors inline-flex items-center gap-2"
              >
                Belanja Sekarang <span className="text-base leading-none">&rarr;</span>
              </button>
              <Link
                to="/produk/iphone-17-pro-max"
                className="border border-white/40 hover:border-white text-white font-semibold text-xs px-6 py-2.5 rounded-sm transition-colors"
              >
                Lihat Detail
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-5 pt-4 border-t border-white/10">
              {[
                { Icon: Shield, text: 'Garansi Resmi', sub: 'Apple Indonesia' },
                { Icon: Truck, text: 'Pengiriman Cepat', sub: 'Seluruh Indonesia' },
                { Icon: CheckCircle2, text: '100% Original', sub: 'Produk Bergaransi' },
              ].map(({ Icon, text, sub }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-tight">{text}</p>
                    <p className="text-[10px] text-white/50">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* carousel dots */}
            <div className="flex gap-1.5 pt-2">
              {[0,1,2,3,4].map(i => (
                <button
                  key={i}
                  onClick={() => setDot(i)}
                  className={`transition-all rounded-full ${i === dot ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
                  aria-label={`Slide ${i+1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          CATEGORIES — WHITE
      ══════════════════════════════════════════ */}
      <section className="bg-white py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[11px] text-[#888] font-medium uppercase tracking-widest mb-1">Jelajahi Produk</p>
              <h2 className="text-xl font-bold text-[#111] leading-tight">
                Pilih iPhone yang<br />
                <span className="text-[#111]">Sesuai </span>
                <span className="font-normal text-[#555]">untukmu</span>
              </h2>
            </div>
            <Link to="/produk" className="text-xs text-[#111] hover:text-[#D6A84F] font-semibold inline-flex items-center gap-1 transition-colors">
              Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                onClick={() => navigate(`/produk${cat.q ? `?category=${cat.q}` : ''}`)}
                className="cursor-pointer bg-[#F5F5F5] rounded-lg overflow-hidden hover:shadow-md transition-shadow group border border-gray-100"
              >
                <div className="aspect-square flex items-center justify-center p-5 bg-white">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-3 pb-3 pt-2">
                  <p className="text-xs font-bold text-[#111] leading-tight">{cat.label}</p>
                  <p className="text-[10px] text-[#888] mt-0.5">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          BEST SELLERS — DARK
      ══════════════════════════════════════════ */}
      <section className="bg-[#111] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[11px] text-[#888] font-medium uppercase tracking-widest mb-1">Best Seller</p>
              <h2 className="text-xl font-bold text-white">Produk Terlaris</h2>
            </div>
            <Link to="/produk" className="text-xs text-white/60 hover:text-[#D6A84F] font-semibold inline-flex items-center gap-1 transition-colors">
              Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BEST_SELLERS.map((p) => (
              <div
                key={p.slug}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#D6A84F]/50 transition-colors group"
              >
                {/* Product Image */}
                <div
                  className="relative aspect-square bg-[#141414] flex items-center justify-center p-5 cursor-pointer"
                  onClick={() => navigate(`/produk/${p.slug}`)}
                >
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-[#D6A84F] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm z-10">
                      {p.badge}
                    </span>
                  )}
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-3 space-y-1.5">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/produk/${p.slug}`)}
                  >
                    <p className="text-[10px] text-[#666] font-mono">{p.storage} · {p.color}</p>
                    <h3 className="text-xs font-bold text-white leading-tight group-hover:text-[#D6A84F] transition-colors mt-0.5">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-white">
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                    {p.oldPrice && (
                      <span className="text-[10px] text-[#555] line-through">
                        Rp {p.oldPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  {/* Rating + Cart */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#D6A84F] fill-[#D6A84F]" />
                      <span className="text-[10px] text-[#999] font-medium">{p.rating} ({p.reviews})</span>
                    </div>
                    <button
                      onClick={() => handleBuyWhatsApp(p)}
                      className="w-7 h-7 rounded-lg bg-[#2a2a2a] hover:bg-[#25D366] flex items-center justify-center transition-colors group/btn"
                      title="Beli via WhatsApp"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#888] group-hover/btn:text-black transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          TRADE-IN BANNER
      ══════════════════════════════════════════ */}
      <section className="bg-[#111] pb-10 lg:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] min-h-[200px] flex items-center">
            {/* Content */}
            <div className="relative z-10 p-8 lg:p-10 max-w-lg space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#D6A84F]">
                Tukar Tambah Dapat Untung
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Trade in iPhone lamamu<br />
                dapatkan potongan harga<br />
                hingga <span className="text-[#D6A84F]">Rp 2.000.000</span>
              </h2>
              <Link
                to="/trade-in"
                onClick={() => trackEvent('Lead', { content_name: 'Trade In Banner CTA' })}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#111] font-bold text-xs px-6 py-2.5 rounded-sm transition-colors mt-1"
              >
                Cek Harga Trade In <span className="text-base">&rarr;</span>
              </Link>
              <div className="flex flex-wrap gap-4 pt-2 text-[10px] text-[#888]">
                {['Proses cepat & mudah', 'Harga terbaik', 'Aman & terpercaya'].map(t => (
                  <span key={t} className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#D6A84F]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side decorative phones */}
            <div className="absolute right-0 top-0 bottom-0 w-64 lg:w-80 flex items-center justify-end pr-6 lg:pr-10 pointer-events-none select-none">
              <img
                src="/images/iphone17_transparent.png"
                alt=""
                aria-hidden="true"
                className="h-44 lg:h-52 object-contain opacity-80 translate-x-4 rotate-[8deg]"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
              />
              <img
                src="/images/iphone17pm_transparent.png"
                alt=""
                aria-hidden="true"
                className="h-48 lg:h-56 object-contain opacity-90 -translate-x-4 -rotate-[5deg]"
                style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
              />
            </div>

            {/* Subtle arrow icon in background */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <svg viewBox="0 0 24 24" className="w-40 h-40 text-white fill-white">
                <path d="M12 4V2.5a.5.5 0 0 1 .854-.354l3.146 3.146a.5.5 0 0 1 0 .708L12.854 9.146A.5.5 0 0 1 12 8.792V7c-4.971 0-9 4.029-9 9a9.01 9.01 0 0 0 5.254 8.164.5.5 0 0 1-.508.863A10.01 10.01 0 0 1 2 16c0-5.514 4.486-10 10-10zm0 14.792V17.5a.5.5 0 0 0-.854-.354l-3.146 3.146a.5.5 0 0 0 0 .708l3.146 3.146A.5.5 0 0 0 12 23.5v-1.292a9 9 0 0 0 6.746-14.872.5.5 0 1 0-.746.666A8 8 0 0 1 12 18.792z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
