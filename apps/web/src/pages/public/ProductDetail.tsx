import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Table, TableBody, TableRow, TableCell } from '@/components/ui/Table';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product, ProductVariant } from '@fincell/shared';
import { ShoppingBag, MessageCircle, ShieldCheck, Truck, RefreshCw, Star, Check } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (slug) {
      productService.getProductBySlug(slug).then((res) => {
        if (res.data) {
          setProduct(res.data);
          if (res.data.variants.length > 0) {
            setSelectedVariant(res.data.variants[0]);
          }
          if (res.data.images.length > 0) {
            setSelectedImage(res.data.images[0]);
          }
        }
      });
    }
  }, [slug]);

  if (!product) return null;

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const currentOriginalPrice = selectedVariant?.originalPrice || product.originalPrice;

  return (
    <PageContainer
      breadcrumbs={[
        { label: 'Produk', href: '/produk' },
        { label: product.name },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
        
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-[#111111] scale-95' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Variant Selector */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm">{product.category}</Badge>
              <div className="flex items-center text-amber-500 text-xs gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount} ulasan)</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">{product.name}</h1>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{product.summary}</p>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-black text-[#111111]">{formatRupiah(currentPrice)}</span>
            {currentOriginalPrice && (
              <span className="text-sm text-gray-400 line-through">{formatRupiah(currentOriginalPrice)}</span>
            )}
            <Badge variant="success" size="sm" className="ml-auto">Garansi Resmi</Badge>
          </div>

          {/* Variants selection */}
          {product.variants.length > 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#111111] mb-2">Kapasitas Penyimpanan</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111] shadow-md'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {v.storage}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedVariant && (
                <div>
                  <label className="block text-xs font-bold uppercase text-[#111111] mb-2">
                    Warna: <span className="text-gray-500 font-normal">{selectedVariant.color}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-400"
                      style={{ backgroundColor: selectedVariant.colorHex }}
                    />
                    <span className="text-xs font-medium">{selectedVariant.color}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link to="/checkout" className="w-full sm:flex-1">
              <Button variant="primary" size="lg" className="w-full" leftIcon={<ShoppingBag className="w-5 h-5" />}>
                Tambah ke Keranjang
              </Button>
            </Link>
            <a
              href={`https://wa.me/6281234567890?text=Halo%20fincell.id,%20saya%20tertarik%20dengan%20${encodeURIComponent(
                product.name
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="whatsapp" size="lg" className="w-full" leftIcon={<MessageCircle className="w-5 h-5" />}>
                Beli via WhatsApp
              </Button>
            </a>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 text-center">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-[#E7B65A] mx-auto" />
              <p className="text-[11px] font-bold text-[#111111]">100% Original</p>
              <p className="text-[10px] text-gray-500">Apple Indonesia</p>
            </div>
            <div className="space-y-1">
              <Truck className="w-5 h-5 text-[#E7B65A] mx-auto" />
              <p className="text-[11px] font-bold text-[#111111]">Bebas Ongkir</p>
              <p className="text-[10px] text-gray-500">Syarat & Ketentuan</p>
            </div>
            <div className="space-y-1">
              <RefreshCw className="w-5 h-5 text-[#E7B65A] mx-auto" />
              <p className="text-[11px] font-bold text-[#111111]">Trade-In Ready</p>
              <p className="text-[10px] text-gray-500">Terima Unit Lama</p>
            </div>
          </div>

        </div>
      </div>

      {/* Specifications */}
      <Card className="space-y-4">
        <h3 className="text-lg font-bold text-[#111111]">Spesifikasi Teknis</h3>
        <Table>
          <TableBody>
            {Object.entries(product.specs).map(([key, val]) => (
              <TableRow key={key}>
                <TableCell className="font-semibold text-gray-600 w-1/3">{key}</TableCell>
                <TableCell className="text-[#111111]">{val}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </PageContainer>
  );
};
