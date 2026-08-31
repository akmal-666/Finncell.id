import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@fincell/shared';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Star,
  ShoppingBag,
  Heart,
  RefreshCw,
  ChevronRight
} from 'lucide-react';
import iphone17Transparent from '../../../img/iphone17_transparent.png';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const res = await productService.getProducts();
        if (res.success && res.data) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error('Failed loading products', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const featuredGridProducts = [
    {
      id: 'p1',
      name: 'iPhone 16 Pro Max',
      storage: '256GB',
      color: 'Desert Titanium',
      price: 23999000,
      rating: 4.9,
      reviews: 328,
      slug: 'iphone-16-pro-max',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p2',
      name: 'iPhone 16 Pro',
      storage: '128GB',
      color: 'Natural Titanium',
      price: 20999000,
      rating: 4.9,
      reviews: 215,
      slug: 'iphone-16-pro',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p3',
      name: 'iPhone 16',
      storage: '128GB',
      color: 'Black',
      price: 16999000,
      rating: 4.8,
      reviews: 245,
      slug: 'iphone-16',
      image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p4',
      name: 'iPhone 15',
      storage: '128GB',
      color: 'Pink',
      price: 14999000,
      rating: 4.8,
      reviews: 186,
      slug: 'iphone-15',
      image: 'https://images.unsplash.com/photo-1695048065449-35c8e310034a?q=80&w=800&auto=format&fit=crop'
    },
  ];

  const visualCategories = [
    {
      title: 'iPhone 17 Series',
      subtitle: 'Generasi Terbaru',
      slug: 'iphone-17',
      image: iphone17Transparent,
    },
    {
      title: 'iPhone 16 Pro',
      subtitle: 'Titanium Engineering',
      slug: 'iphone-16-pro',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'iPhone 15 Series',
      subtitle: 'Dynamic Island',
      slug: 'iphone-15',
      image: 'https://images.unsplash.com/photo-1695048065449-35c8e310034a?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'iPhone SE',
      subtitle: 'Compact & Capable',
      slug: 'iphone-se',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Aksesoris Original',
      subtitle: 'MagSafe & Charging',
      slug: 'aksesoris',
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-[#F7F9FC] text-[#0B1F3A] min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Deep Navy #061426 - Editorial Asymmetric)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#061426] text-white relative overflow-hidden min-h-[580px] lg:h-[620px] flex items-center">
        {/* Subtle Background Lighting Accent */}
        <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] bg-[#0B1F3A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#5EA7FF] block mb-2">
                  NEW ARRIVAL
                </span>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block mb-3">
                  iPhone 17 Pro Max
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06]">
                  Pro. Melampaui.<br />
                  Dalam segala hal.
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-lg font-normal leading-relaxed">
                Desain unibody aluminium terbaru. Performa ekstrem chip A19 Pro. Baterai paling tahan lama dalam sejarah iPhone.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/produk/iphone-17-pro-max"
                  className="bg-[#1769E0] hover:bg-[#1769E0]/90 text-white font-semibold text-xs tracking-wider uppercase px-7 py-3.5 rounded-md transition-colors shadow-sm"
                >
                  Belanja Sekarang
                </Link>
                <Link
                  to="/produk/iphone-17-pro-max"
                  className="text-slate-300 hover:text-white font-semibold text-xs tracking-wider uppercase px-6 py-3.5 border border-white/20 hover:border-white/40 rounded-md transition-colors"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>

            {/* Right Visual Column (No Container Box, Product Dominates Directly) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <img
                src={iphone17Transparent}
                alt="iPhone 17 Pro Max"
                className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. TRUST STRIP (Horizontal Line with Thin Dividers)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#DCE5EF] py-6 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCE5EF]">
            
            <div className="py-3 md:py-0 md:px-8 flex items-center gap-4 justify-start">
              <ShieldCheck className="w-6 h-6 text-[#1769E0] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#061426]">Garansi Resmi</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Apple Indonesia (iBox / Digimap)</p>
              </div>
            </div>

            <div className="py-3 md:py-0 md:px-8 flex items-center gap-4 justify-start">
              <Truck className="w-6 h-6 text-[#1769E0] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#061426]">Pengiriman Cepat</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Berasuransi ke Seluruh Indonesia</p>
              </div>
            </div>

            <div className="py-3 md:py-0 md:px-8 flex items-center gap-4 justify-start">
              <CheckCircle2 className="w-6 h-6 text-[#1769E0] shrink-0" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#061426]">100% Original</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Produk Segel Bergaransi Utuh</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. PRODUCT DISCOVERY (Horizontal Visual Navigation)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#1769E0] block mb-1">
              Eksplorasi Katalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#061426]">
              Kategori Seri iPhone
            </h2>
          </div>
          <Link
            to="/produk"
            className="text-xs font-bold text-[#1769E0] hover:text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {visualCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/produk?category=${cat.slug}`}
              className="group bg-white border border-[#DCE5EF] hover:border-[#1769E0] p-4 transition-all duration-300 flex flex-col justify-between h-56"
            >
              <div className="h-32 flex items-center justify-center overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="max-h-28 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="pt-2 border-t border-[#DCE5EF]/60">
                <h3 className="text-xs font-bold text-[#061426] group-hover:text-[#1769E0] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">{cat.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FEATURED EDITORIAL PRODUCT (60% Visual / 40% Content)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#DCE5EF] py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual (60% width equivalent on lg) */}
            <div className="lg:col-span-7 flex justify-center bg-[#F7F9FC] p-8 lg:p-12 border border-[#DCE5EF]">
              <img
                src={iphone17Transparent}
                alt="Featured Editorial iPhone 17 Pro Max"
                className="max-h-[380px] lg:max-h-[440px] object-contain hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            {/* Content (40% width equivalent on lg) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#1769E0] block mb-2">
                  FEATURED EDITORIAL
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#061426] tracking-tight leading-tight">
                  iPhone 17 Pro Max
                </h2>
                <p className="text-base font-medium italic text-[#64748B] mt-2">
                  &ldquo;Pro yang tidak perlu banyak bicara.&rdquo;
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#0B1F3A]/90 border-t border-[#DCE5EF]">
                <div className="flex justify-between py-1.5 border-b border-[#DCE5EF]/60">
                  <span className="text-[#64748B]">Chipset</span>
                  <span className="font-semibold">Apple A19 Pro (3nm)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#DCE5EF]/60">
                  <span className="text-[#64748B]">Material</span>
                  <span className="font-semibold">Titanium Grade 5 Unibody</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#DCE5EF]/60">
                  <span className="text-[#64748B]">Kamera Utam</span>
                  <span className="font-semibold">48MP Fusion Camera Control</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#64748B]">Baterai</span>
                  <span className="font-semibold">Hingga 33 Jam Video Playback</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/produk/iphone-17-pro-max"
                  className="inline-flex items-center gap-2 bg-[#061426] hover:bg-[#1769E0] text-white font-semibold text-xs tracking-wider uppercase px-7 py-3.5 rounded-md transition-colors"
                >
                  Lihat iPhone 17 Pro Max <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PRODUCT GRID ("Produk Pilihan" - 4 Minimal Columns)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#1769E0] block mb-1">
              SELEKSI UTAMA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061426] tracking-tight">
              Produk Pilihan
            </h2>
          </div>
          <Link
            to="/produk"
            className="text-xs font-bold text-[#1769E0] hover:text-[#061426] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            Lihat Semua Produk <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clean 4-Column Minimal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGridProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-white border border-[#DCE5EF] hover:border-[#1769E0] p-5 flex flex-col justify-between transition-all duration-200 relative"
            >
              {/* Top Bar: Wishlist button on hover */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-wider">
                  {p.storage} • {p.color}
                </span>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#64748B] hover:text-red-500"
                  aria-label="Add to wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Product Image Dominance */}
              <Link to={`/produk/${p.slug}`} className="block h-52 my-2 overflow-hidden flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Info Area */}
              <div className="pt-4 border-t border-[#DCE5EF]/70 space-y-2">
                <div className="flex items-center gap-1 text-[11px] text-[#64748B]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-[#061426]">{p.rating}</span>
                  <span>({p.reviews})</span>
                </div>

                <Link to={`/produk/${p.slug}`} className="block">
                  <h3 className="text-sm font-bold text-[#061426] group-hover:text-[#1769E0] transition-colors">
                    {p.name}
                  </h3>
                </Link>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-sm font-black text-[#061426]">
                    {formatRupiah(p.price)}
                  </span>
                  <Link
                    to={`/produk/${p.slug}`}
                    className="text-xs font-semibold text-[#1769E0] hover:underline"
                  >
                    Beli &rarr;
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. TRADE IN EDITORIAL SECTION (Deep Navy #061426 Full Width)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#061426] text-white py-16 lg:py-20 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#5EA7FF] block">
                LAYANAN TRADE IN FINCELL
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Tukar iPhone lamamu.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-md font-normal leading-relaxed">
                Dapatkan estimasi harga terbaik secara transparan untuk proses upgrade yang cepat, aman, dan tanpa kendala.
              </p>

              <div className="pt-2">
                <Link
                  to="/trade-in"
                  className="inline-flex items-center gap-2 bg-[#1769E0] hover:bg-[#1769E0]/90 text-white font-semibold text-xs tracking-wider uppercase px-7 py-3.5 rounded-md transition-colors"
                >
                  Cek Trade In Sekarang <RefreshCw className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Integrated Visual */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
                alt="Trade In iPhone"
                className="max-h-[320px] lg:max-h-[380px] object-contain rounded-lg border border-white/10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. EDITORIAL / BLOG (Technology Magazine Composition)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#1769E0] block mb-1">
              JURNAL &amp; EDUKASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061426] tracking-tight">
              Artikel Terkini
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-bold text-[#1769E0] hover:text-[#061426] uppercase tracking-wider flex items-center gap-1 transition-colors"
          >
            Baca Semua Artikel <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Magazine Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Large Featured Article (60%) */}
          <div className="lg:col-span-7 bg-white border border-[#DCE5EF] p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0]">
                PANDUAN PEMBELIAN
              </span>
              <Link to="/blog/panduan-memilih-iphone" className="block">
                <h3 className="text-xl sm:text-2xl font-bold text-[#061426] hover:text-[#1769E0] transition-colors leading-snug">
                  Panduan memilih iPhone yang tepat untuk kebutuhan sehari-hari Anda.
                </h3>
              </Link>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Memahami perbedaan signifikan antara seri Pro dan standar, efisiensi baterai, hingga pertimbangan kapasitas penyimpanan untuk penggunaan jangka panjang.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#DCE5EF] flex items-center justify-between text-xs text-[#64748B]">
              <span>Tim Edukasi fincell.id</span>
              <Link to="/blog/panduan-memilih-iphone" className="font-semibold text-[#1769E0] hover:underline">
                Baca Selengkapnya &rarr;
              </Link>
            </div>
          </div>

          {/* Right Stacked Articles (40%) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white border border-[#DCE5EF] p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0]">
                TIPS &amp; TRIK
              </span>
              <Link to="/blog/tips-baterai-iphone" className="block">
                <h4 className="text-base font-bold text-[#061426] hover:text-[#1769E0] transition-colors">
                  5 Kebiasaan pengisian daya yang memperpanjang umur baterai iPhone.
                </h4>
              </Link>
              <p className="text-xs text-[#64748B] line-clamp-2">
                Praktik terbaik menjaga kesehatan baterai agar daya tahan tetap optimal hingga bertahun-tahun.
              </p>
            </div>

            <div className="bg-white border border-[#DCE5EF] p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1769E0]">
                GARANSI &amp; KEAMANAN
              </span>
              <Link to="/blog/memahami-garansi-apple" className="block">
                <h4 className="text-base font-bold text-[#061426] hover:text-[#1769E0] transition-colors">
                  Cara klaim dan cek status garansi resmi Apple Indonesia dengan mudah.
                </h4>
              </Link>
              <p className="text-xs text-[#64748B] line-clamp-2">
                Langkah rinci memeriksa nomor seri dan garansi aktif untuk perlindungan produk maksimal.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FINAL CTA (Restrained & Minimalist)
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#DCE5EF] py-16 text-center select-none">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#061426] tracking-tight">
            Temukan iPhone berikutnya.
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
            Jelajahi seluruh varian iPhone original bergaransi resmi dengan kemudahan transaksi online.
          </p>
          <div className="pt-2">
            <Link
              to="/produk"
              className="inline-block bg-[#061426] hover:bg-[#1769E0] text-white font-semibold text-xs tracking-wider uppercase px-8 py-3.5 rounded-md transition-colors"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
