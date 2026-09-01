import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Truck, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';
import { SeoHead } from '@/components/common/SeoHead';
import { productService } from '@/services/productService';
import type { Product } from '@fincell/shared';

const PLACEHOLDER_IMG = '/images/iphone17_transparent.png';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    setActiveImg(0);
    productService
      .getProductBySlug(slug)
      .then(res => {
        if (res.success && res.data) {
          const p = res.data;
          setProduct(p);
          trackEvent('ViewContent', {
            content_name: p.name,
            content_type: 'product',
            value: p.basePrice,
            currency: 'IDR',
          });
          // pre-select first variant storage / color
          if (p.variants?.length) {
            setSelectedStorage(p.variants[0].storage || '');
            setSelectedColor(p.variants[0].color || '');
          }
        } else {
          setProduct(null);
        }
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-[#0d0d0d] text-white min-h-screen py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-7 bg-[#1a1a1a] rounded-xl aspect-square" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-4 bg-[#2a2a2a] rounded w-1/3" />
            <div className="h-8 bg-[#2a2a2a] rounded w-3/4" />
            <div className="h-6 bg-[#2a2a2a] rounded w-1/2" />
            <div className="h-12 bg-[#2a2a2a] rounded" />
            <div className="h-12 bg-[#2a2a2a] rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#0d0d0d] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[#555] text-sm">Produk tidak ditemukan.</p>
          <Link to="/produk" className="text-[#D6A84F] hover:underline text-sm">← Kembali ke katalog</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [PLACEHOLDER_IMG];
  const storages = [...new Set(product.variants?.map(v => v.storage).filter(Boolean))];
  const colors = [...new Set(product.variants?.map(v => v.color).filter(Boolean))];

  const handleBuyWhatsApp = () => {
    trackEvent('Contact', { content_name: product.name, value: product.basePrice, currency: 'IDR' });
    openWhatsApp(buildProductWhatsAppMessage({
      productName: product.name,
      storage: selectedStorage || storages[0] || '',
      color: selectedColor || colors[0] || '',
      price: product.basePrice,
      slug: product.slug,
    }));
  };

  const conditionLabel: Record<string, string> = {
    brand_new: 'Baru (BNIB Garansi Resmi)',
    like_new: 'Second Like New',
    secondhand: 'Second',
    second_mulus: 'Second Mulus',
    second_good: 'Second Good',
    second_fair: 'Second Fair',
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen py-10 pb-24 lg:pb-10">
      <SeoHead
        title={`${product.name} — vincellid`}
        description={product.summary || product.description || `Beli ${product.name} garansi resmi di vincellid Depok.`}
        canonicalUrl={`https://vincellid.id/produk/${product.slug}`}
        ogType="product"
        jsonLdSchema={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: images[0],
          description: product.description || '',
          sku: product.sku,
          brand: { '@type': 'Brand', name: 'Apple' },
          offers: {
            '@type': 'Offer',
            price: product.basePrice,
            priceCurrency: 'IDR',
            availability: (product.stock ?? 0) > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] text-[#555] mb-8 uppercase tracking-wider">
          <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
          <span>/</span>
          <Link to="/produk" className="hover:text-white transition-colors">Produk</Link>
          <span>/</span>
          <span className="text-[#D6A84F] font-semibold truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ── Gallery ── */}
          <div className="lg:col-span-7 space-y-3">
            {/* Main image */}
            <div className="relative bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden aspect-square flex items-center justify-center p-6">
              <img
                src={images[activeImg] || PLACEHOLDER_IMG}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-colors ${
                      i === activeImg ? 'border-[#D6A84F]' : 'border-[#2a2a2a] hover:border-[#D6A84F]/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-contain p-1 bg-[#111]"
                      onError={e => { (e.target as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="lg:col-span-5 space-y-5">
            {/* Badge + name */}
            <div>
              <p className="text-[10px] font-bold tracking-[2px] uppercase text-[#D6A84F] mb-1">
                {conditionLabel[product.condition] || 'Garansi Resmi'}
              </p>
              <h1 className="text-[26px] sm:text-[30px] font-black text-white leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-[28px] font-black text-white">
                Rp {product.basePrice.toLocaleString('id-ID')}
              </span>
              {product.originalPrice && (
                <span className="text-[13px] text-[#555] line-through">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            {/* Stock */}
            {product.stock !== undefined && (
              <p className={`text-[12px] font-semibold ${product.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {product.stock > 0 ? `Stok: ${product.stock} unit tersedia` : 'Stok habis'}
              </p>
            )}

            {/* Storage selector */}
            {storages.length > 0 && (
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#888] uppercase tracking-wider">Storage</label>
                <div className="flex flex-wrap gap-2">
                  {storages.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedStorage(s!)}
                      className={`px-4 py-1.5 text-[12px] font-mono rounded-md border transition-colors ${
                        selectedStorage === s
                          ? 'bg-[#D6A84F] border-[#D6A84F] text-black font-bold'
                          : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888] hover:border-[#D6A84F]/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#888] uppercase tracking-wider">Warna</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c!)}
                      className={`px-3 py-1.5 text-[12px] rounded-md border transition-colors ${
                        selectedColor === c
                          ? 'border-[#D6A84F] text-[#D6A84F] bg-[#D6A84F]/10 font-semibold'
                          : 'border-[#2a2a2a] text-[#888] hover:border-[#D6A84F]/50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-2.5 pt-2 border-t border-[#2a2a2a]">
              <button
                onClick={handleBuyWhatsApp}
                disabled={product.stock === 0}
                className="w-full bg-[#25D366] hover:bg-[#1db954] disabled:opacity-50 text-black font-black text-[13px] uppercase tracking-wider py-3.5 rounded-lg transition-colors text-center"
              >
                Beli via WhatsApp
              </button>
              <button
                onClick={() => openWhatsApp(`Halo vincellid, saya ada pertanyaan tentang ${product.name}.`)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#D6A84F] text-white font-semibold text-[12px] uppercase tracking-wider py-3 rounded-lg transition-colors text-center"
              >
                Tanya Produk
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#666] pt-1">
              {[
                { Icon: Shield, text: 'Original' },
                { Icon: Truck, text: 'Pengiriman Cepat' },
                { Icon: CheckCircle2, text: 'Garansi Resmi' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 p-2 bg-[#111] rounded-lg border border-[#2a2a2a]">
                  <Icon className="w-4 h-4 text-[#D6A84F]" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.description && (
              <div className="pt-4 border-t border-[#2a2a2a] space-y-2">
                <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">Deskripsi</h2>
                <p className="text-[12px] text-[#888] leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="pt-4 border-t border-[#2a2a2a] space-y-2">
                <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">Spesifikasi</h2>
                <div className="space-y-1.5">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center py-1.5 border-b border-[#1a1a1a] text-[12px]">
                      <span className="text-[#666]">{key}</span>
                      <span className="text-white font-medium text-right max-w-[60%]">{val as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-14 inset-x-0 z-40 px-4 pb-2">
        <button
          onClick={handleBuyWhatsApp}
          disabled={product.stock === 0}
          className="w-full bg-[#25D366] hover:bg-[#1db954] disabled:opacity-50 text-black font-black text-[13px] uppercase tracking-wider py-3.5 rounded-xl shadow-xl transition-colors"
        >
          Beli via WhatsApp
        </button>
      </div>
    </div>
  );
};
