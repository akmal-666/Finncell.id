import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product, Category } from '@fincell/shared';
import { Search, Star, Filter } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    productService.getCategories().then(res => {
      if (res.data) setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    productService.getProducts({ category: selectedCategory, search: searchQuery }).then(res => {
      if (res.data) setProducts(res.data);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PageContainer
      title="Katalog Produk Apple"
      subtitle="Temukan iPhone dan produk Apple impianmu dengan garansi resmi dan harga terbaik."
      breadcrumbs={[{ label: 'Produk' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="space-y-6 lg:col-span-1">
          <Card className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#E7B65A]" /> Filter Katalog
              </h4>
              <Input
                placeholder="Cari tipe iPhone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Kategori</label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    selectedCategory === '' ? 'bg-[#111111] text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Semua Produk
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id ? 'bg-[#111111] text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-60">({cat.productCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setSelectedCategory('');
                setSearchQuery('');
              }}
            >
              Reset Filter
            </Button>
          </Card>
        </aside>

        {/* Product Grid & Controls */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500">
              Menampilkan <span className="font-bold text-[#111111]">{products.length}</span> produk
            </p>
            <div className="w-48">
              <Select
                options={[
                  { value: 'newest', label: 'Urutkan: Terbaru' },
                  { value: 'price_low', label: 'Harga: Termurah' },
                  { value: 'price_high', label: 'Harga: Termahal' },
                ]}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge variant="dark" size="sm" className="absolute top-3 left-3">
                    {product.condition === 'brand_new' ? 'Brand New' : 'Like New'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400">{product.category}</span>
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
                        Beli / Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
        </main>

      </div>
    </PageContainer>
  );
};
