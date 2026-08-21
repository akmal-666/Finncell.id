import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product } from '@fincell/shared';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, MessageCircle, Star, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getProducts().then(res => {
      if (res.data) setProducts(res.data);
    });
  }, []);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Dark Hero Section */}
      <section className="relative bg-[#050505] text-white pt-12 pb-20 overflow-hidden border-b border-white/10">
        {/* Glow ambient accent */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E7B65A]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="accent" size="md" className="inline-flex items-center gap-1.5 bg-[#E7B65A]/15 text-[#E7B65A] border-[#E7B65A]/30">
                <Sparkles className="w-3.5 h-3.5" />
                fincell.id — Premium Apple Store
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                iPhone 15 Pro Max.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#E7B65A]">
                  Titanium. Kuat & Ringan.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Temukan koleksi iPhone original bergaransi resmi Apple Indonesia dengan penawaran harga terbaik, promo spesial, dan layanan Trade-in instan.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/produk/iphone-15-pro-max">
                  <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Belanja Sekarang
                  </Button>
                </Link>
                <Link to="/trade-in">
                  <Button variant="dark" size="lg" leftIcon={<RefreshCw className="w-4 h-4 text-[#E7B65A]" />}>
                    Cek Trade In
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="text-xs font-bold text-white">100% Original</p>
                  <p className="text-[11px] text-gray-500">Garansi Resmi Apple</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Pengiriman Cepat</p>
                  <p className="text-[11px] text-gray-500">Seluruh Indonesia</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Trade In Instan</p>
                  <p className="text-[11px] text-gray-500">Harga Terbaik</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image Frame */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-white/10 bg-[#111111] shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop"
                  alt="iPhone 15 Pro Max Titanium"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">iPhone 15 Pro Max</p>
                    <p className="text-[11px] text-[#E7B65A] font-semibold">{formatRupiah(23999000)}</p>
                  </div>
                  <Badge variant="accent" size="sm">New Arrival</Badge>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">Jelajahi Seri iPhone</h2>
            <p className="text-xs text-gray-500 mt-1">Pilih kategori produk Apple yang sesuai dengan kebutuhan Anda</p>
          </div>
          <Link to="/produk" className="text-xs font-semibold text-[#111111] hover:text-[#B88632] flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'iPhone 15 Series', desc: 'Titanium & USB-C', href: '/produk?category=cat-1', bg: 'bg-[#111111] text-white' },
            { name: 'iPhone 14 Series', desc: 'Dynamic Island', href: '/produk?category=cat-2', bg: 'bg-white border border-gray-200' },
            { name: 'iPhone 13 Series', desc: 'Hemat & Poweful', href: '/produk?category=cat-3', bg: 'bg-white border border-gray-200' },
            { name: 'Aksesoris Original', desc: 'Charger & MagSafe', href: '/aksesoris', bg: 'bg-white border border-gray-200' },
          ].map((cat, idx) => (
            <Link key={idx} to={cat.href}>
              <div className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.bg}`}>
                <p className="text-xs font-bold uppercase tracking-wider text-[#E7B65A] mb-1">Kategori</p>
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <p className="text-xs opacity-70 mt-1">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#111111]">Produk Terlaris</h2>
            <p className="text-xs text-gray-500 mt-1">Produk favorit pilihan konsumen fincell.id</p>
          </div>
          <Link to="/produk" className="text-xs font-semibold text-[#111111] hover:text-[#B88632] flex items-center gap-1">
            Lihat Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                {product.isBestSeller && (
                  <Badge variant="accent" size="sm" className="absolute top-3 left-3">Best Seller</Badge>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>{product.category}</span>
                  <div className="flex items-center text-amber-500 gap-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-[#111111] group-hover:text-[#B88632] transition-colors truncate">
                  <Link to={`/produk/${product.slug}`}>{product.name}</Link>
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-[#111111]">{formatRupiah(product.basePrice)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">{formatRupiah(product.originalPrice)}</span>
                  )}
                </div>
                <div className="pt-2">
                  <Link to={`/produk/${product.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Trade In Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <Badge variant="accent" size="sm">Trade-In Service</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Tukar iPhone Lamamu,<br />Dapatkan Potongan Hingga <span className="text-[#E7B65A]">Rp 2.000.000</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Proses cepat, estimasi instan via WhatsApp, dan gratis konsultasi dengan tim spesialis fincell.id.
            </p>
            <div className="pt-2">
              <Link to="/trade-in">
                <Button variant="whatsapp" size="md" leftIcon={<MessageCircle className="w-4 h-4" />}>
                  Cek Estimasi Harga Sekarang
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-80 aspect-video rounded-2xl overflow-hidden border border-white/10 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop"
              alt="Trade In iPhone"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
