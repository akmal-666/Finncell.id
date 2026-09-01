import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Truck, CheckCircle2, ShoppingBag, Star, Heart, ChevronRight, MessageCircle } from 'lucide-react';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

/* ─── DATA ─────────────────────────────────────────── */

const CATEGORIES = [
  { label: 'iPhone 17 Series', sub: 'Terbaru', img: '/images/iphone17_transparent.png', q: '17' },
  { label: 'iPhone 16 Series', sub: 'Populer', img: '/images/iphone17pm_transparent.png', q: '16' },
  { label: 'iPhone 15 Series', sub: 'Hemat & Berkualitas', img: '/images/hero-iphone17-gold.png', q: '15' },
  { label: 'iPhone SE', sub: 'Ringkas & Powerful', img: '/images/iphone17_transparent.png', q: 'se' },
  { label: 'Aksesoris', sub: 'Lengkapi Perangkatmu', img: '/images/iphone17pm_transparent.png', q: 'aksesoris' },
];

const PRODUCTS = [
  { name: 'iPhone 17 Pro Max', storage: '256GB', color: 'Desert Titanium', price: 23999000, rating: 4.9, reviews: 239, slug: 'iphone-17-pro-max', img: '/images/iphone17_transparent.png', badge: 'Pro Max' },
  { name: 'iPhone 15', storage: '128GB', color: 'Pink', price: 14999000, rating: 4.8, reviews: 398, slug: 'iphone-15', img: '/images/iphone17pm_transparent.png', badge: null },
  { name: 'iPhone 16', storage: '128GB', color: 'Black', price: 16000000, oldPrice: 19000000, rating: 4.3, reviews: 241, slug: 'iphone-16', img: '/images/hero-iphone17-gold.png', badge: null },
  { name: 'iPhone 15 Pro', storage: '256GB', color: 'Blue Titanium', price: 20999000, rating: 4.9, reviews: 142, slug: 'iphone-15-pro', img: '/images/iphone17_transparent.png', badge: null },
  { name: 'iPhone SE (3rd Gen)', storage: '256GB', color: 'Midnight', price: 5999000, rating: 4.8, reviews: 99, slug: 'iphone-se-3rd-gen', img: '/images/iphone17pm_transparent.png', badge: null },
];

const BLOG_POSTS = [
  { title: '5 Hal Wajib Cek Sebelum Beli iPhone Second', category: 'Tips', date: '20 Mei 2024', slug: 'cek-sebelum-beli-second', img: '/images/iphone17_transparent.png' },
  { title: 'Perbedaan iPhone Resmi dan iPhone Inter', category: 'iPhone', date: '18 Mei 2024', slug: 'resmi-vs-inter', img: '/images/iphone17pm_transparent.png' },
  { title: 'Kenapa Trade In Jadi Pilihan Terbaik?', category: 'Trade In', date: '15 Mei 2024', slug: 'kenapa-trade-in', img: '/images/hero-iphone17-gold.png' },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [dot, setDot] = useState(0);

  return (
    <div className="bg-white text-[#111]">

      {/* ═══════════════════════════════════
          1. HERO
      ═══════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-[#0d0d0d] min-h-[400px] lg:min-h-[480px] flex items-center"
        style={{
          backgroundImage: 'url(/images/hero-bg-gold.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/60 to-transparent" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16 py-14 lg:py-18 w-full">
          <div className="max-w-[480px] space-y-4">
            {/* eyebrow */}
            <p className="text-[11px] font-bold tracking-[2px] uppercase text-[#D6A84F]">New Arrival</p>

            {/* product line */}
            <p className="text-sm text-white/80 font-medium">iPhone 17 Pro Max</p>

            {/* headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.08] tracking-tight">
              Pro. Melampaui.<br />
              <span className="text-[#D6A84F]">Dalam segala hal.</span>
            </h1>

            {/* description */}
            <p className="text-[13px] text-white/55 leading-relaxed max-w-[320px]">
              Performa ekstrem.<br />
              Desain premium. Pengalaman iPhone yang lebih berani.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => {
                  trackEvent('Contact', { content_name: 'Hero CTA' });
                  openWhatsApp(buildProductWhatsAppMessage({ productName: 'iPhone 17 Pro Max', storage: '256GB', color: 'Orange' }));
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-black font-bold text-[13px] px-6 py-3 rounded-[6px] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Belanja via WhatsApp
              </button>
              <Link
                to="/produk/iphone-17-pro-max"
                className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-semibold text-[13px] px-6 py-3 rounded-[6px] transition-colors"
              >
                Lihat Detail
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-5 pt-4 border-t border-white/10 mt-2">
              {[
                { Icon: Shield, label: 'Garansi Resmi', sub: 'Apple Indonesia' },
                { Icon: Truck, label: 'Pengiriman Cepat', sub: 'Seluruh Indonesia' },
                { Icon: CheckCircle2, label: '100% Original', sub: 'Produk Bergaransi' },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-none">{label}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-1.5 pt-1">
              {[0, 1, 2, 3].map(i => (
                <button
                  key={i}
                  onClick={() => setDot(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full transition-all ${
                    i === dot ? 'w-5 h-1.5 bg-[#D6A84F]' : 'w-1.5 h-1.5 bg-white/25'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          2. CATEGORIES — WHITE
      ═══════════════════════════════════ */}
      <section className="bg-white py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#D6A84F] mb-1">Pilih iPhone</p>
              <h2 className="text-[22px] sm:text-[26px] font-black text-[#111] leading-tight tracking-tight">
                Pilih iPhone<br />sesuai kebutuhanmu.
              </h2>
            </div>
            <Link to="/produk" className="text-[12px] text-[#111] font-semibold hover:text-[#D6A84F] flex items-center gap-1 transition-colors whitespace-nowrap">
              Lihat Semua iPhone <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Category Cards — horizontal scroll on mobile */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-4 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <div
                key={cat.label}
                onClick={() => cat.q === 'aksesoris' ? navigate('/aksesoris') : navigate(`/produk?category=${cat.q}`)}
                className="flex-shrink-0 w-[140px] sm:w-[160px] lg:w-auto cursor-pointer bg-[#F7F7F7] rounded-xl overflow-hidden hover:shadow-md transition-shadow group border border-gray-100"
              >
                <div className="aspect-square flex items-center justify-center bg-white p-4">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-3 pb-3 pt-2">
                  <p className="text-[12px] font-bold text-[#111] leading-tight">{cat.label}</p>
                  <p className="text-[11px] text-[#888] mt-0.5">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          3. FEATURED PRODUCT — DARK
      ═══════════════════════════════════ */}
      <section className="bg-[#111] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[280px]">
            {/* Text */}
            <div className="py-12 lg:py-16 flex flex-col justify-center space-y-4">
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#D6A84F]">Featured</p>
              <div>
                <h2 className="text-[26px] sm:text-[32px] font-black text-white leading-tight tracking-tight">
                  iPhone 17 Pro Max
                </h2>
                <p className="text-[15px] text-white/60 font-medium mt-0.5">Pro yang tidak perlu banyak bicara.</p>
              </div>
              <p className="text-[13px] text-white/40 leading-relaxed max-w-xs">
                Chip generasi terbaru. Sistem kamera paling canggih. Desain titanium yang kokoh dan elegan.
              </p>
              <div className="pt-1">
                <Link
                  to="/produk/iphone-17-pro-max"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-[#D6A84F] text-white font-semibold text-[12px] px-5 py-2.5 rounded-[6px] transition-colors"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
            {/* Image */}
            <div className="flex items-end justify-center lg:justify-end overflow-hidden">
              <img
                src="/images/iphone17pm.png"
                alt="iPhone 17 Pro Max"
                className="max-h-[280px] lg:max-h-[320px] object-contain"
                style={{ filter: 'drop-shadow(0 -8px 32px rgba(214,168,79,0.15))' }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          4. PRODUCT GRID — WHITE
      ═══════════════════════════════════ */}
      <section className="bg-white py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#888] mb-1">Produk Pilihan</p>
              <h2 className="text-[22px] sm:text-[26px] font-black text-[#111] leading-tight tracking-tight">
                Produk pilihan untukmu.
              </h2>
            </div>
            <Link to="/produk" className="text-[12px] text-[#111] font-semibold hover:text-[#D6A84F] flex items-center gap-1 transition-colors whitespace-nowrap">
              Lihat Semua Produk <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-4 scrollbar-hide">
            {PRODUCTS.map(p => (
              <div
                key={p.slug}
                className="flex-shrink-0 w-[160px] sm:w-[180px] lg:w-auto bg-white border border-[#EAEAEA] rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image area */}
                <div
                  className="relative bg-[#F7F7F7] aspect-square flex items-center justify-center p-4 cursor-pointer"
                  onClick={() => navigate(`/produk/${p.slug}`)}
                >
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-[#D6A84F] text-black text-[9px] font-black px-1.5 py-0.5 rounded-sm z-10">
                      {p.badge}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm z-10 hover:text-rose-400">
                    <Heart className="w-3 h-3 text-[#ccc]" />
                  </button>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-3 space-y-1">
                  <div
                    onClick={() => navigate(`/produk/${p.slug}`)}
                    className="cursor-pointer"
                  >
                    <p className="text-[10px] text-[#999] font-mono">{p.storage} · {p.color}</p>
                    <h3 className="text-[12px] font-bold text-[#111] leading-tight mt-0.5 group-hover:text-[#D6A84F] transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-black text-[#111]">
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                    {p.oldPrice && (
                      <span className="text-[10px] text-[#aaa] line-through">
                        Rp {p.oldPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>

                  {/* Rating + Cart */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#D6A84F] fill-[#D6A84F]" />
                      <span className="text-[10px] text-[#888]">{p.rating} ({p.reviews})</span>
                    </div>
                    <button
                      onClick={() => {
                        trackEvent('Contact', { content_name: p.name });
                        openWhatsApp(buildProductWhatsAppMessage({ productName: p.name, storage: p.storage, color: p.color, price: p.price }));
                      }}
                      className="w-7 h-7 rounded-lg bg-[#F0F0F0] hover:bg-[#25D366] flex items-center justify-center transition-colors group/btn"
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


      {/* ═══════════════════════════════════
          5. TRADE IN — DARK
      ═══════════════════════════════════ */}
      <section className="bg-[#0d0d0d] py-10 lg:py-14 border-t border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="relative bg-[#161616] rounded-2xl overflow-hidden border border-[#2a2a2a] min-h-[220px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Text */}
              <div className="p-8 lg:p-12 space-y-4">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#D6A84F]">Trade In</p>
                <h2 className="text-[26px] sm:text-[30px] font-black text-white leading-tight tracking-tight">
                  Tukar iPhone lamamu.
                </h2>
                <p className="text-[13px] text-white/50 leading-relaxed max-w-xs">
                  Dapatkan estimasi terbaik<br />untuk upgrade ke iPhone terbaru.
                </p>
                <div>
                  <Link
                    to="/trade-in"
                    onClick={() => trackEvent('Lead', { content_name: 'Trade In Section' })}
                    className="inline-flex items-center gap-2 bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-bold text-[12px] px-5 py-2.5 rounded-[6px] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Mulai Trade In via WhatsApp
                  </Link>
                </div>
              </div>

              {/* iPhone render */}
              <div className="flex items-end justify-center lg:justify-end overflow-hidden pr-0 lg:pr-8">
                <img
                  src="/images/iphone17pm.png"
                  alt="Trade In"
                  className="max-h-[220px] lg:max-h-[260px] object-contain"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(214,168,79,0.12))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          6. BLOG — WHITE
      ═══════════════════════════════════ */}
      <section className="bg-white py-10 lg:py-14 border-t border-[#F0F0F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#888] mb-1">Artikel Terbaru</p>
              <h2 className="text-[22px] sm:text-[26px] font-black text-[#111] leading-tight tracking-tight">
                Tips, berita, dan informasi terbaru.
              </h2>
            </div>
            <Link to="/blog" className="text-[12px] text-[#111] font-semibold hover:text-[#D6A84F] flex items-center gap-1 transition-colors whitespace-nowrap">
              Lihat Semua Artikel <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BLOG_POSTS.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-[#F7F7F7] rounded-xl overflow-hidden border border-[#EAEAEA] hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/9] bg-[#E8E8E8] overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="inline-block bg-[#D6A84F]/15 text-[#B88A32] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-[13px] font-bold text-[#111] leading-snug group-hover:text-[#D6A84F] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[11px] text-[#999]">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
