import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
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
  RefreshCw,
  Sparkles
} from 'lucide-react';
import bgIphone17Pm from '../../../img/bg-iphone17pm.png';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);

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

  // Static product list matching reference if API items are fewer
  const bestSellers = [
    {
      id: 'p1',
      name: 'iPhone 15 Pro Max',
      spec: '256GB - Natural Titanium',
      price: 23999000,
      originalPrice: undefined,
      discount: undefined,
      rating: 4.9,
      reviews: 128,
      slug: 'iphone-15-pro-max',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p2',
      name: 'iPhone 15',
      spec: '128GB - Pink',
      price: 14999000,
      originalPrice: undefined,
      discount: undefined,
      rating: 4.8,
      reviews: 96,
      slug: 'iphone-15',
      image: 'https://images.unsplash.com/photo-1695048065449-35c8e310034a?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p3',
      name: 'iPhone 14',
      spec: '128GB - Blue',
      price: 11199000,
      originalPrice: 11999000,
      discount: '-7%',
      rating: 4.7,
      reviews: 85,
      slug: 'iphone-14',
      image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p4',
      name: 'iPhone 13',
      spec: '128GB - Midnight',
      price: 8999000,
      originalPrice: undefined,
      discount: undefined,
      rating: 4.6,
      reviews: 64,
      slug: 'iphone-13',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'p5',
      name: 'iPhone SE (3rd Gen)',
      spec: '64GB - Starlight',
      price: 5999000,
      originalPrice: undefined,
      discount: undefined,
      rating: 4.6,
      reviews: 48,
      slug: 'iphone-se-3rd-gen',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#E7B65A] selection:text-black">
      
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Cinematic iPhone 17 Pro Max)
      ────────────────────────────────────────────────────────────── */}
      <section 
        className="relative overflow-hidden bg-[#050505] bg-cover bg-center bg-no-repeat min-h-[540px] lg:h-[600px] flex items-center border-b border-white/10 select-none"
        style={{ backgroundImage: `url(${bgIphone17Pm})` }}
      >
        
        {/* Top-Left Subtle Curved Golden Arc */}
        <svg 
          className="absolute top-0 left-0 w-[550px] h-[300px] pointer-events-none z-0 opacity-25" 
          viewBox="0 0 550 300" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M -50 0 C 150 60 350 140 550 -20" 
            stroke="url(#goldArcTopLeft)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          <defs>
            <linearGradient id="goldArcTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E7B65A" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#F2B84B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#E7B65A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom-Right Subtle Curved Golden Arc */}
        <svg 
          className="absolute bottom-0 right-0 w-[650px] h-[300px] pointer-events-none z-0 opacity-25" 
          viewBox="0 0 650 300" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M 700 300 C 450 220 200 180 -50 300" 
            stroke="url(#goldArcBottomRight)" 
            strokeWidth="1.5" 
          />
          <defs>
            <linearGradient id="goldArcBottomRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E7B65A" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#F2B84B" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E7B65A" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Subtle Radial Glow Behind Phone */}
        <div 
          className="absolute top-1/2 right-[12%] -translate-y-1/2 w-[520px] h-[520px] pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(231,182,90,0.12) 0%, rgba(231,182,90,0.03) 45%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* LEFT COLUMN: ~45% width (lg:col-span-5) */}
            <div className="lg:col-span-6 space-y-5 text-left order-1">
              
              {/* Badge */}
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-[#E7B65A]/40 bg-[#E7B65A]/10 text-white tracking-wide">
                  New Arrival
                </span>
              </div>

              {/* Product Title */}
              <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
                <span className="text-2xl sm:text-3xl text-white"></span>
                <span>iPhone 17 Pro Max</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-0.5">
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-white leading-[1.02]">
                  Pro. Melampaui.
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-[#E7B65A] leading-[1.02]">
                  Dalam segala hal.
                </h1>
              </div>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md leading-relaxed">
                Desain unibody aluminium terbaru.<br />
                Performa ekstrem. Baterai paling tahan lama.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link to="/produk">
                  <button className="px-7 py-3 bg-[#E7B65A] hover:bg-[#d99d3d] text-black font-extrabold text-xs sm:text-sm rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#E7B65A]/15 active:scale-95 group">
                    <span>Belanja Sekarang</span>
                    <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </Link>

                <Link to="/produk/iphone-17-pro-max">
                  <button className="px-7 py-3 bg-white/5 border border-white/20 hover:border-[#E7B65A] text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 active:scale-95">
                    Lihat Detail
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-2 border-t border-white/10 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E7B65A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white leading-tight">Garansi Resmi</p>
                    <p className="text-[10px] text-gray-400">Apple Indonesia</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-[#E7B65A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white leading-tight">Pengiriman Cepat</p>
                    <p className="text-[10px] text-gray-400">Seluruh Indonesia</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E7B65A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white leading-tight">100% Original</p>
                    <p className="text-[10px] text-gray-400">Produk Bergaransi</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: ~55% width spacer so bg-iphone17pm.png is visible */}
            <div className="hidden lg:block lg:col-span-6 h-[380px] sm:h-[460px] lg:h-[520px] pointer-events-none" />

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. EXPLORE CATEGORIES SECTION ("Jelajahi Produk")
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#f5f6f8] text-[#111111] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Jelajahi Produk
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                Pilih iPhone yang <span className="text-gray-400 font-normal">Sesuai</span> untukmu
              </h2>
            </div>

            <Link
              to="/produk"
              className="text-xs font-bold text-black hover:text-gray-600 flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5 Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* Card 1: iPhone 15 Series */}
            <Link to="/produk?series=15" className="group">
              <div className="bg-[#eaecee] hover:bg-[#e2e5e8] rounded-2xl p-5 text-center flex flex-col items-center justify-between h-56 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="w-full h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400&auto=format&fit=crop"
                    alt="iPhone 15 Series"
                    className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-black">iPhone 15 Series</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Terbaru</p>
                </div>
              </div>
            </Link>

            {/* Card 2: iPhone 14 Series */}
            <Link to="/produk?series=14" className="group">
              <div className="bg-[#eaecee] hover:bg-[#e2e5e8] rounded-2xl p-5 text-center flex flex-col items-center justify-between h-56 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="w-full h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=400&auto=format&fit=crop"
                    alt="iPhone 14 Series"
                    className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-black">iPhone 14 Series</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Populer</p>
                </div>
              </div>
            </Link>

            {/* Card 3: iPhone 13 Series */}
            <Link to="/produk?series=13" className="group">
              <div className="bg-[#eaecee] hover:bg-[#e2e5e8] rounded-2xl p-5 text-center flex flex-col items-center justify-between h-56 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="w-full h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400&auto=format&fit=crop"
                    alt="iPhone 13 Series"
                    className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-black">iPhone 13 Series</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Hemat & Berkualitas</p>
                </div>
              </div>
            </Link>

            {/* Card 4: iPhone SE */}
            <Link to="/produk?series=se" className="group">
              <div className="bg-[#eaecee] hover:bg-[#e2e5e8] rounded-2xl p-5 text-center flex flex-col items-center justify-between h-56 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="w-full h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=400&auto=format&fit=crop"
                    alt="iPhone SE"
                    className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-black">iPhone SE</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Ringkas & Powerful</p>
                </div>
              </div>
            </Link>

            {/* Card 5: Semua iPhone */}
            <Link to="/produk" className="group col-span-2 sm:col-span-1">
              <div className="bg-[#eaecee] hover:bg-[#e2e5e8] rounded-2xl p-5 text-center flex flex-col items-center justify-between h-56 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
                <div className="w-full h-28 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1695048065449-35c8e310034a?q=80&w=400&auto=format&fit=crop"
                    alt="Semua iPhone"
                    className="max-h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-black">Semua iPhone</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Lihat Semua</p>
                </div>
              </div>
            </Link>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. BEST SELLER PRODUCTS SECTION ("Produk Terlaris")
      ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0b0c10] py-16 text-white border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Best Seller
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Produk Terlaris
              </h2>
            </div>

            <Link
              to="/produk"
              className="text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5 Dark Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bestSellers.map((item) => (
              <div
                key={item.id}
                className="bg-[#12141c] border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-xl bg-[#090a0e] p-3 flex items-center justify-center mb-3 overflow-hidden">
                  {item.discount && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-md z-10">
                      {item.discount}
                    </span>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Meta info */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-white truncate group-hover:text-[#E7B65A] transition-colors">
                    <Link to={`/produk/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="text-[11px] text-gray-400 truncate">{item.spec}</p>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-1 text-[11px] text-gray-300 pt-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white">{item.rating}</span>
                    <span className="text-gray-500">({item.reviews})</span>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-white">{formatRupiah(item.price)}</p>
                      {item.originalPrice && (
                        <p className="text-[10px] text-gray-500 line-through">
                          {formatRupiah(item.originalPrice)}
                        </p>
                      )}
                    </div>

                    <Link
                      to={`/produk/${item.slug}`}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300"
                      title="Beli"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. TRADE IN BANNER SECTION ("Tukar Tambah Dapat Untung")
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0d0e14] via-[#12141f] to-[#0d0e14] border border-white/15 p-8 sm:p-12 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7B65A]/10 blur-[130px] rounded-full pointer-events-none" />

            {/* Left Text */}
            <div className="space-y-5 max-w-xl text-left relative z-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Tukar Tambah Dapat Untung
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Trade in iPhone lamamu dapatkan potongan harga hingga{' '}
                <span className="text-[#E7B65A]">Rp 2.000.000</span>
              </h2>

              {/* Action Button */}
              <div>
                <Link to="/trade-in">
                  <button className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 inline-flex items-center gap-2 shadow-lg">
                    <span>Cek Harga Trade In</span>
                    <span>→</span>
                  </button>
                </Link>
              </div>

              {/* Trust Checkmarks */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-gray-300 font-medium border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Proses cepat & mudah
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Harga terbaik
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Aman & terpercaya
                </span>
              </div>
            </div>

            {/* Right Side Image (Hands holding 2 iPhones with transfer symbol) */}
            <div className="relative z-10 w-full lg:w-96 flex items-center justify-center shrink-0">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#090a0e]/60 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop"
                  alt="Trade In iPhone"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-transparent to-transparent opacity-80" />
                <div className="absolute p-3 rounded-full bg-white/10 backdrop-blur-md text-[#E7B65A] border border-white/20">
                  <RefreshCw className="w-6 h-6 animate-spin-slow" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
