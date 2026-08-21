import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { productService } from '@/services/productService';
import { blogService } from '@/services/blogService';
import { formatRupiah } from '@/lib/utils';
import { Product, BlogPost } from '@fincell/shared';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  MessageCircle,
  Star,
  Sparkles,
  Heart,
  ShoppingBag,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  CheckCircle2,
  Zap,
  HelpCircle,
  Clock
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [prodRes, blogRes] = await Promise.all([
        productService.getProducts(),
        blogService.getPosts()
      ]);

      if (prodRes.success && prodRes.data) {
        setProducts(prodRes.data);
      } else {
        setIsError(true);
        setErrorMessage('Gagal memuat catalog produk dari server');
      }

      if (blogRes.success && blogRes.data) {
        setBlogPosts(blogRes.data.slice(0, 3));
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.message || 'Koneksi API terputus. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION (Premium Dark Hero) */}
      <section className="relative bg-[#050505] text-white pt-10 pb-20 overflow-hidden border-b border-white/10">
        {/* Glow ambient background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[300px] bg-[#E7B65A]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="accent" size="md" className="inline-flex items-center gap-1.5 bg-[#E7B65A]/15 text-[#E7B65A] border-[#E7B65A]/30">
                <Sparkles className="w-3.5 h-3.5" />
                fincell.id — Authorized Apple & Trade-In Store
              </Badge>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Temukan iPhone<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#E7B65A]">
                  yang tepat untukmu.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                iPhone pilihan dengan kondisi terpercaya, harga kompetitif, dan layanan terbaik.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link to="/produk" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Belanja Sekarang
                  </Button>
                </Link>
                <Link to="/produk" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                    Lihat Produk
                  </Button>
                </Link>
              </div>

              {/* Quick Guarantee Highlights */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-xs font-bold text-white">100% Original</p>
                  <p className="text-[11px] text-gray-400">Garansi Resmi Apple</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Pengiriman Cepat</p>
                  <p className="text-[11px] text-gray-400">Seluruh Indonesia</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Trade In Instan</p>
                  <p className="text-[11px] text-gray-400">Harga Terbaik</p>
                </div>
              </div>
            </div>

            {/* Right Hero Product Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#111111] to-[#0A0A0A] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
                  alt="iPhone 15 Pro Max Titanium"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                
                {/* Floating Product Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 flex items-center justify-between shadow-lg">
                  <div>
                    <p className="text-xs font-bold text-white">iPhone 15 Pro Max</p>
                    <p className="text-[11px] text-[#E7B65A] font-extrabold">{formatRupiah(23999000)}</p>
                  </div>
                  <Badge variant="accent" size="sm">Flagship</Badge>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 sm:p-8 bg-white rounded-3xl border border-gray-200/80 shadow-sm text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="p-3 bg-[#E7B65A]/15 text-[#B88632] rounded-2xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Garansi</h4>
            <p className="text-[11px] text-gray-500">Klaim garansi resmi Apple dibantu 100%</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="p-3 bg-[#E7B65A]/15 text-[#B88632] rounded-2xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Produk Terpercaya</h4>
            <p className="text-[11px] text-gray-500">QC ketat 30+ titik pemeriksaan fungsi</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="p-3 bg-[#E7B65A]/15 text-[#B88632] rounded-2xl">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Pengiriman Cepat</h4>
            <p className="text-[11px] text-gray-500">Packing kayu & asuransi penuh</p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="p-3 bg-[#E7B65A]/15 text-[#B88632] rounded-2xl">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Trade In</h4>
            <p className="text-[11px] text-gray-500">Penilaian instan via WA dengan harga tertinggi</p>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start gap-2">
            <div className="p-3 bg-[#25D366]/15 text-[#25D366] rounded-2xl">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">Support Pelanggan</h4>
            <p className="text-[11px] text-gray-500">Bantuan responsif via CS 24/7</p>
          </div>

        </div>
      </section>

      {/* 3. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">Kategori Produk</h2>
            <p className="text-xs text-gray-500 mt-0.5">Pilih kategori Apple yang ingin kamu eksplorasi</p>
          </div>
          <Link to="/produk" className="text-xs font-bold text-[#111111] hover:text-[#B88632] flex items-center gap-1">
            Semua Produk <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* Card 1: iPhone */}
          <Link to="/produk" className="group">
            <div className="p-5 rounded-2xl bg-[#111111] text-white border border-gray-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-[#E7B65A]/50">
              <div className="p-3 bg-white/10 rounded-xl text-[#E7B65A] w-fit mb-3">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">iPhone</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Seri 13, 14, & 15 Pro</p>
              <Badge variant="accent" size="sm" className="mt-3">Tersedia</Badge>
            </div>
          </Link>

          {/* Card 2: iPad */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 transition-all duration-300 opacity-80">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-500 w-fit mb-3">
              <Tablet className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111]">iPad</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Pro, Air, & Mini</p>
            <Badge variant="secondary" size="sm" className="mt-3 text-gray-500 bg-gray-100">Segera Hadir</Badge>
          </div>

          {/* Card 3: Mac */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 transition-all duration-300 opacity-80">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-500 w-fit mb-3">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111]">Mac</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">MacBook Air & Pro</p>
            <Badge variant="secondary" size="sm" className="mt-3 text-gray-500 bg-gray-100">Segera Hadir</Badge>
          </div>

          {/* Card 4: Apple Watch */}
          <div className="p-5 rounded-2xl bg-white border border-gray-200/80 transition-all duration-300 opacity-80">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-500 w-fit mb-3">
              <Watch className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#111111]">Apple Watch</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">Series 9 & Ultra</p>
            <Badge variant="secondary" size="sm" className="mt-3 text-gray-500 bg-gray-100">Segera Hadir</Badge>
          </div>

          {/* Card 5: Accessories */}
          <Link to="/aksesoris" className="group col-span-2 sm:col-span-1">
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-[#E7B65A]/50">
              <div className="p-3 bg-amber-50 rounded-xl text-[#B88632] w-fit mb-3">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111]">Accessories</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">MagSafe & Charger</p>
              <Badge variant="accent" size="sm" className="mt-3">Tersedia</Badge>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. BEST SELLER PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">Produk Best Seller</h2>
            <p className="text-xs text-gray-500 mt-0.5">Varian iPhone paling populer dengan jaminan kualitas terbaik</p>
          </div>
          <Link to="/produk" className="text-xs font-bold text-[#111111] hover:text-[#B88632] flex items-center gap-1">
            Lihat Katalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-gray-200 space-y-4">
                <Skeleton className="w-full aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <ErrorState
            title="Gagal Memuat Produk"
            message={errorMessage}
            onRetry={loadData}
          />
        )}

        {/* Product Cards Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const primaryVariant = product.variants?.[0];
              const isWishlisted = wishlist[product.id] || false;

              return (
                <Card key={product.id} className="group overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isBestSeller && (
                          <Badge variant="accent" size="sm">Best Seller</Badge>
                        )}
                        <Badge variant={product.condition === 'brand_new' ? 'success' : 'dark'} size="sm">
                          {product.condition === 'brand_new' ? 'BNIB Garansi Resmi' : 'Second Mulus'}
                        </Badge>
                      </div>

                      {/* Wishlist Icon Button */}
                      <button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                          isWishlisted
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 text-gray-700 hover:bg-white'
                        }`}
                        title="Tambah ke Wishlist"
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    {/* Product Meta */}
                    <div className="space-y-2 px-1">
                      <div className="flex items-center justify-between text-[11px] text-gray-500">
                        <span className="font-semibold text-gray-600">{product.category}</span>
                        <div className="flex items-center text-amber-500 gap-1 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{product.rating}</span>
                          <span className="text-gray-400">({product.reviewCount})</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#B88632] transition-colors truncate">
                        <Link to={`/produk/${product.slug}`}>{product.name}</Link>
                      </h3>

                      {/* Storage & Color Pills */}
                      {primaryVariant && (
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                          <span className="px-2 py-0.5 bg-gray-100 rounded-md font-medium text-gray-700">
                            {primaryVariant.storage}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-md font-medium text-gray-700">
                            <span
                              className="w-2 h-2 rounded-full border border-gray-400 shrink-0"
                              style={{ backgroundColor: primaryVariant.colorHex || '#9E9992' }}
                            />
                            {primaryVariant.color}
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="pt-1 flex items-baseline gap-2">
                        <span className="text-base font-black text-[#111111]">{formatRupiah(product.basePrice)}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{formatRupiah(product.originalPrice)}</span>
                        )}
                      </div>

                      {/* Stock Status Indicator */}
                      <div className="pt-1 flex items-center gap-1.5 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-700 font-medium">Stok Tersedia</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center gap-2">
                    <Link to={`/produk/${product.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                        Lihat Detail
                      </Button>
                    </Link>
                    <Link to="/keranjang" title="Tambah ke Keranjang">
                      <Button variant="primary" size="sm" iconOnly={<ShoppingBag className="w-3.5 h-3.5" />} />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. TRADE IN BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#050505] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#E7B65A]/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <Badge variant="accent" size="sm" className="inline-flex items-center gap-1 bg-[#E7B65A]/15 text-[#E7B65A] border-[#E7B65A]/30">
              <Zap className="w-3.5 h-3.5" />
              Layanan Tukar Tambah Resmi
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Tukar iPhone lamamu.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#E7B65A]">
                Dapatkan harga terbaik.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Tukarkan unit lama Anda dari seri apapun dengan estimasi harga pasar paling kompetitif, potongan instan, dan proses cepat tanpa ribet.
            </p>

            <div className="pt-2">
              <Link to="/trade-in">
                <Button variant="secondary" size="lg" className="font-bold" leftIcon={<RefreshCw className="w-4 h-4" />}>
                  Cek Trade In
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shrink-0 relative z-10">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop"
              alt="Tukar iPhone Lamamu"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* 6. WHY FINCELL (Keunggulan fincell.id) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">Mengapa Memilih fincell.id?</h2>
          <p className="text-xs sm:text-sm text-gray-500">Kami menjamin setiap transaksi aman, transparan, dan memberikan nilai tambah terbaik untuk konsumen Apple di Indonesia.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-3 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#111111] text-[#E7B65A] rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111111]">Produk Terpercaya</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              100% produk Apple bergaransi resmi Indonesia. Dilengkapi pengujian QC 30+ poin fungsi sebelum pengiriman.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-3 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#111111] text-[#E7B65A] rounded-xl w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111111]">Harga Kompetitif</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Penawaran harga terbaik tanpa biaya tersembunyi. Dapatkan promo potongan voucher dan cashback transaksi.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-3 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#111111] text-[#E7B65A] rounded-xl w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111111]">Pengiriman Aman</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dikemas rapi dengan proteksi bubble wrap berlapis & opsi packing kayu dengan asuransi pengiriman penuh.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 space-y-3 hover:shadow-lg transition-all">
            <div className="p-3 bg-[#111111] text-[#25D366] rounded-xl w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111111]">Layanan Cepat</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Konsultasi produk & bantuan klaim garansi responsif. Tim Customer Service siap melayani pertanyaan Anda.
            </p>
          </div>

        </div>
      </section>

      {/* 7. LATEST BLOG ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">Artikel & Tips Edukasi</h2>
            <p className="text-xs text-gray-500 mt-0.5">Panduan praktis seputar perawatan iPhone & berita Apple terbaru</p>
          </div>
          <Link to="/blog" className="text-xs font-bold text-[#111111] hover:text-[#B88632] flex items-center gap-1">
            Lihat Blog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <Badge variant="dark" size="sm" className="absolute top-3 left-3">
                    {post.category}
                  </Badge>
                </div>

                <div className="space-y-2 px-1">
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTimeMinutes} menit baca</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#B88632] transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 px-1">
                <Link to={`/blog/${post.slug}`} className="text-xs font-bold text-[#111111] hover:text-[#B88632] inline-flex items-center gap-1">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
};
