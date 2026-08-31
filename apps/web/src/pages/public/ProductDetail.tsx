import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { useToast } from '@/components/ui/Toast';
import { SeoHead } from '@/components/common/SeoHead';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product, ProductVariant } from '@fincell/shared';
import {
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  Check,
  Plus,
  Minus,
  Heart,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
  PackageCheck,
  Headset,
  Sparkles,
  Zap
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'warranty' | 'shipping'>('desc');
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({ 0: true });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    setIsError(false);

    productService
      .getProductBySlug(slug)
      .then(async (res) => {
        if (res.success && res.data) {
          const prod = res.data;
          setProduct(prod);
          if (prod.variants && prod.variants.length > 0) {
            setSelectedVariant(prod.variants[0]);
          }
          if (prod.images && prod.images.length > 0) {
            setSelectedImage(prod.images[0]);
          }

          // Fetch related products
          const allRes = await productService.getProducts();
          if (allRes.data) {
            setRelatedProducts(allRes.data.filter(p => p.id !== prod.id).slice(0, 4));
          }
        } else {
          setIsError(true);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  // Derived price & stock
  const currentPrice = selectedVariant ? selectedVariant.price : (product?.basePrice || 0);
  const currentOriginalPrice = selectedVariant?.originalPrice || product?.originalPrice;
  const currentStock = selectedVariant ? selectedVariant.stock : 10;
  const isOutOfStock = currentStock <= 0;

  const discountPercent = currentOriginalPrice && currentOriginalPrice > currentPrice
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  // Handlers
  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > currentStock) return currentStock;
      return next;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    toast('Berhasil Ditambahkan', {
      type: 'success',
      message: `${quantity}x ${product.name} (${selectedVariant?.storage || ''} ${selectedVariant?.color || ''}) ditambahkan ke keranjang.`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Generate Product JSON-LD Schema
  const jsonLdProductSchema = useMemo(() => {
    if (!product) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images,
      description: product.summary || product.description,
      sku: product.specs?.SKU || product.id,
      brand: {
        '@type': 'Brand',
        name: product.brand || 'Apple',
      },
      offers: {
        '@type': 'Offer',
        url: `https://fincell.id/produk/${product.slug}`,
        priceCurrency: 'IDR',
        price: currentPrice,
        availability: isOutOfStock ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
        itemCondition: product.condition === 'brand_new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating || 4.9,
        reviewCount: product.reviewCount || 42,
      },
    };
  }, [product, currentPrice, isOutOfStock]);

  if (isLoading) {
    return (
      <PageContainer breadcrumbs={[{ label: 'Produk', href: '/produk' }, { label: 'Memuat...' }]}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <Skeleton className="w-full aspect-square rounded-3xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-12 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (isError || !product) {
    return (
      <PageContainer breadcrumbs={[{ label: 'Produk', href: '/produk' }, { label: 'Produk Tidak Ditemukan' }]}>
        <ErrorState
          title="Produk Tidak Ditemukan"
          message="Maaf, produk yang Anda cari tidak tersedia atau telah dihapus dari katalog fincell.id."
          onRetry={() => navigate('/produk')}
        />
      </PageContainer>
    );
  }

  return (
    <>
      <SeoHead
        title={`${product.name} (${selectedVariant?.storage || ''}) — Harga Terbaik`}
        description={`Beli ${product.name} garansi resmi Apple Indonesia di fincell.id. ${product.summary || ''}`}
        canonicalUrl={`https://fincell.id/produk/${product.slug}`}
        ogImage={product.images[0]}
        ogType="product"
        jsonLdSchema={jsonLdProductSchema}
      />

      <PageContainer
        breadcrumbs={[
          { label: 'Produk', href: '/produk' },
          { label: product.category, href: `/produk?category=${product.categoryId}` },
          { label: product.name },
        ]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-md overflow-hidden bg-[#F7F9FC] border border-[#DCE5EF] group flex items-center justify-center p-8">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-[380px] object-contain group-hover:scale-105 transition-transform duration-500"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 p-2.5 rounded-md border border-[#DCE5EF] transition-colors ${
                  isWishlisted ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-md overflow-hidden border p-1 bg-white shrink-0 transition-all ${
                      selectedImage === img
                        ? 'border-[#1769E0] ring-1 ring-[#1769E0]'
                        : 'border-[#DCE5EF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Value Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#DCE5EF] text-center">
              <div className="p-3 bg-white rounded-md border border-[#DCE5EF] space-y-1">
                <ShieldCheck className="w-4 h-4 text-[#1769E0] mx-auto" />
                <p className="text-xs font-bold text-[#061426]">100% Original</p>
                <p className="text-[10px] text-[#64748B]">Apple Indonesia</p>
              </div>
              <div className="p-3 bg-white rounded-md border border-[#DCE5EF] space-y-1">
                <Truck className="w-4 h-4 text-[#1769E0] mx-auto" />
                <p className="text-xs font-bold text-[#061426]">Bebas Ongkir</p>
                <p className="text-[10px] text-[#64748B]">Asuransi Penuh</p>
              </div>
              <div className="p-3 bg-white rounded-md border border-[#DCE5EF] space-y-1">
                <RefreshCw className="w-4 h-4 text-[#1769E0] mx-auto" />
                <p className="text-xs font-bold text-[#061426]">Trade-In Ready</p>
                <p className="text-[10px] text-[#64748B]">Terima Unit Lama</p>
              </div>
            </div>
          </div>

          {/* Right: Info & Selectors (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-wider">{product.category}</span>
                <div className="flex items-center text-amber-500 text-xs gap-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewCount} ulasan pembeli)</span>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-black text-[#061426] tracking-tight">{product.name}</h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">{product.summary}</p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-md bg-white text-[#061426] border border-[#DCE5EF] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-[#061426]">{formatRupiah(currentPrice)}</span>
                  {currentOriginalPrice && (
                    <span className="text-xs sm:text-sm text-[#64748B] line-through">
                      {formatRupiah(currentOriginalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#E7B65A] font-semibold mt-0.5">
                  Termasuk PPN 11% + Garansi Resmi 1 Tahun
                </p>
              </div>

              {/* Stock status pill */}
              <div className="text-right">
                {isOutOfStock ? (
                  <Badge variant="danger" size="md">Stok Habis</Badge>
                ) : (
                  <Badge variant="success" size="md" className="font-bold">
                    Stok Ready ({currentStock} Unit)
                  </Badge>
                )}
              </div>
            </div>

            {/* Storage Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#111111] mb-2">
                    Kapasitas Storage: <span className="text-[#B88632]">{selectedVariant?.storage}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                          className={`px-4 py-2 text-xs font-extrabold rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-[#111111] text-white border-[#111111] shadow-lg scale-95'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {v.storage}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Selector */}
                {selectedVariant && (
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#111111] mb-2">
                      Warna Pilihan: <span className="text-[#B88632]">{selectedVariant.color}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-gray-400 shadow-inner"
                        style={{ backgroundColor: selectedVariant.colorHex || '#9E9992' }}
                      />
                      <span className="text-xs font-bold text-gray-800">{selectedVariant.color}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#111111] mb-2">
                Jumlah Pembelian
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2.5 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    aria-label="Kurangi Jumlah"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="px-5 py-2 text-sm font-black text-[#111111] min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= currentStock || isOutOfStock}
                    className="p-2.5 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    aria-label="Tambah Jumlah"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  Maksimal pembelian {currentStock} unit
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="w-full font-bold border-gray-300 hover:bg-gray-50"
                  leftIcon={<ShoppingBag className="w-5 h-5 text-[#B88632]" />}
                >
                  Tambah ke Keranjang
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className="w-full font-bold shadow-lg"
                >
                  Beli Sekarang
                </Button>
              </div>

              {/* WhatsApp Buy CTA */}
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Halo fincell.id, saya tertarik untuk beli ${product.name} (${selectedVariant?.storage || ''} ${selectedVariant?.color || ''}) sebanyak ${quantity} unit.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full font-bold shadow-md"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  Chat WhatsApp (Tanya Stock & Nego)
                </Button>
              </a>
            </div>

          </div>

        </div>

        {/* Dynamic Information Tabs (Deskripsi, Spesifikasi, Garansi, Pengiriman) */}
        <div className="space-y-6 mb-16">
          <div className="border-b border-gray-200 flex items-center space-x-2 overflow-x-auto">
            {[
              { id: 'desc', label: 'Deskripsi Produk' },
              { id: 'specs', label: 'Spesifikasi Teknis' },
              { id: 'warranty', label: 'Ketentuan Garansi' },
              { id: 'shipping', label: 'Pengiriman & Packing' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 text-xs sm:text-sm font-extrabold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#111111] text-[#111111]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Card className="p-6 sm:p-8">
            {activeTab === 'desc' && (
              <div className="space-y-4 leading-relaxed text-xs sm:text-sm text-gray-700">
                <h3 className="text-base font-bold text-[#111111]">{product.name} — Performa & Inovasi Terbaik Apple</h3>
                <p>{product.description || product.summary}</p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-2 font-medium text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unit 100% Original Apple dengan Garansi Resmi Indonesia.</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kondisi fisik 100% mulus (BNIB) / 99% mulus (Second pilihan).</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium text-gray-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bebas dari kendala iCloud atau pemblokiran IMEI, 100% sinyal permanen.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#111111]">Spesifikasi Detail</h3>
                <Table>
                  <TableBody>
                    {Object.entries(product.specs || {}).map(([key, val]) => (
                      <TableRow key={key}>
                        <TableCell className="font-bold text-gray-700 w-1/3 text-xs">{key}</TableCell>
                        <TableCell className="text-[#111111] text-xs font-medium">{val}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <h3 className="text-base font-bold text-[#111111]">Jaminan & Klaim Garansi fincell.id</h3>
                <p>
                  Semua unit bergaransi resmi yang dibeli melalui <strong>fincell.id</strong> dilindungi oleh Garansi Resmi Apple Indonesia (iBox / Digimap / GDN) selama 1 (satu) tahun penuh.
                </p>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-amber-900">
                  <p className="font-bold">Prosedur Klaim Garansi Mudah:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>Hubungi Customer Care fincell.id via WhatsApp dengan melampirkan Invoice pembelian.</li>
                    <li>Unit dapat dikirim ke store fincell.id atau langsung ke Authorized Apple Service Provider resmi terdekat.</li>
                    <li>Tim fincell.id akan mendampingi proses klaim hingga unit selesai diproses/diganti baru.</li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <h3 className="text-base font-bold text-[#111111]">Metode Pengiriman & Proteksi Produk</h3>
                <p>
                  fincell.id bekerja sama dengan mitra kurir terpercaya untuk memastikan setiap paket produk Apple yang dikirim tiba dalam kondisi aman dan tepat waktu.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                    <p className="font-bold text-[#111111]">Bubble Wrap Berlapis</p>
                    <p className="text-xs text-gray-500">Kemasan ekstra tebal melindungi dari benturan keras.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                    <p className="font-bold text-[#111111]">Packing Kayu Opsional</p>
                    <p className="text-xs text-gray-500">Proteksi tambahan untuk pengiriman luar pulau.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                    <p className="font-bold text-[#111111]">Asuransi Pengiriman 100%</p>
                    <p className="text-xs text-gray-500">Penggantian nilai barang penuh jika barang hilang/rusak.</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* FAQ Accordion Section */}
        <section className="space-y-6 mb-16">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
          <div className="space-y-3">
            {[
              {
                q: 'Apakah produk iPhone di fincell.id bergaransi resmi?',
                a: 'Ya, 100% produk iPhone baru yang kami jual bergaransi resmi Apple Indonesia (iBox/Digimap/GDN) selama 1 tahun. IMEI terdaftar resmi di Kemenperin.'
              },
              {
                q: 'Bagaimana cara melakukan Trade-In (tukar tambah)?',
                a: 'Anda cukup menghubungi tim kami via WhatsApp atau datang ke menu Trade In untuk mendapatkan estimasi instan unit lama Anda.'
              },
              {
                q: 'Metode pembayaran apa saja yang didukung?',
                a: 'Kami menerima Pembayaran Bank Transfer, QRIS, Kartu Kredit 0%, dan metode Cicilan tanpa kartu kredit.'
              },
              {
                q: 'Berapa lama proses pengiriman produk?',
                a: 'Untuk area Jabodetabek dapat dikirim via GoSend/GrabExpress Sameday. Luar kota menggunakan JNE/Sicepat Express (1-3 hari kerja).'
              }
            ].map((faq, index) => {
              const isOpen = !!openFaq[index];
              return (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#111111]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                Produk Terkait
              </h2>
              <Link to="/produk" className="text-xs font-bold text-[#111111] hover:text-[#B88632] flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProd) => (
                <Card key={relProd.id} className="group overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={relProd.images[0]}
                      alt={relProd.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge variant="dark" size="sm" className="absolute top-3 left-3">
                      {relProd.condition === 'brand_new' ? 'BNIB Garansi' : 'Second Mulus'}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-extrabold text-[#111111] group-hover:text-[#B88632] transition-colors truncate">
                      <Link to={`/produk/${relProd.slug}`}>{relProd.name}</Link>
                    </h3>
                    <p className="text-sm font-black text-[#111111]">{formatRupiah(relProd.basePrice)}</p>
                    <div className="pt-2">
                      <Link to={`/produk/${relProd.slug}`}>
                        <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </>
  );
};
