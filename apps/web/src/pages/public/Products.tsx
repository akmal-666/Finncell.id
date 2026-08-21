import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Pagination } from '@/components/ui/Pagination';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { SeoHead } from '@/components/common/SeoHead';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product, Category } from '@fincell/shared';
import {
  Search,
  Star,
  Filter,
  X,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [selectedStorage, setSelectedStorage] = useState(searchParams.get('storage') || '');
  const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '');
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get('condition') || '');
  const [minPrice, setMinPrice] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get('maxPrice') || '');
  const [readyStockOnly, setReadyStockOnly] = useState<boolean>(searchParams.get('ready') === 'true');

  // Sort & Pagination
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Wishlist state
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const loadCatalogData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [prodRes, catRes] = await Promise.all([
        productService.getProducts(),
        productService.getCategories()
      ]);

      if (prodRes.success && prodRes.data) {
        setProducts(prodRes.data);
      } else {
        setIsError(true);
        setErrorMessage('Gagal memuat catalog produk dari server API');
      }

      if (catRes.success && catRes.data) {
        setCategories(catRes.data);
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.message || 'Terjadi kesalahan koneksi saat memuat catalog.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        p => p.name.toLowerCase().includes(q) || p.summary?.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      list = list.filter(
        p => p.categoryId === selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Brand
    if (selectedBrand) {
      list = list.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Storage
    if (selectedStorage) {
      list = list.filter(p =>
        p.variants?.some(v => v.storage.toLowerCase() === selectedStorage.toLowerCase())
      );
    }

    // Color
    if (selectedColor) {
      list = list.filter(p =>
        p.variants?.some(v => v.color.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    // Condition
    if (selectedCondition) {
      list = list.filter(p => p.condition === selectedCondition);
    }

    // Price Range
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) list = list.filter(p => p.basePrice >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) list = list.filter(p => p.basePrice <= max);
    }

    // Ready Stock Only
    if (readyStockOnly) {
      list = list.filter(p => p.variants?.some(v => v.stock > 0) ?? true);
    }

    // Sorting
    switch (sortBy) {
      case 'price_low':
        list.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price_high':
        list.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'best_seller':
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return list;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedStorage,
    selectedColor,
    selectedCondition,
    minPrice,
    maxPrice,
    readyStockOnly,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const activeFilterCount = [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedStorage,
    selectedColor,
    selectedCondition,
    minPrice,
    maxPrice,
    readyStockOnly ? 'ready' : '',
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBrand('');
    setSelectedStorage('');
    setSelectedColor('');
    setSelectedCondition('');
    setMinPrice('');
    setMaxPrice('');
    setReadyStockOnly(false);
    setCurrentPage(1);
    setSearchParams({});
  };

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  return (
    <>
      <SeoHead
        title="Katalog iPhone & Produk Apple"
        description="Temukan iPhone pilihan dengan kondisi terpercaya, garansi resmi Apple Indonesia, promo harga terbaik, dan layanan Trade-in."
        canonicalUrl="https://fincell.id/produk"
      />

      <PageContainer
        title="Katalog iPhone"
        subtitle="Temukan iPhone pilihan dengan harga terbaik."
        breadcrumbs={[{ label: 'Katalog Produk' }]}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Mobile Filter Trigger Button */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Button
              variant="dark"
              size="sm"
              onClick={() => setIsMobileFilterOpen(true)}
              leftIcon={<SlidersHorizontal className="w-4 h-4 text-[#E7B65A]" />}
            >
              Filter ({activeFilterCount})
            </Button>
            <span className="text-xs text-gray-500 font-medium">
              {filteredProducts.length} Produk
            </span>
          </div>

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 lg:col-span-1 sticky top-24">
            <Card className="p-5 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#E7B65A]" /> Filter Katalog
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-gray-500">Pencarian</label>
                <Input
                  placeholder="Cari seri iPhone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  leftIcon={<Search className="w-3.5 h-3.5 text-gray-400" />}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-gray-500">Kategori</label>
                <div className="space-y-1">
                  <button
                    onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      selectedCategory === '' ? 'bg-[#111111] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Semua Kategori
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id ? 'bg-[#111111] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-60">({cat.productCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-gray-500">Kapasitas Storage</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {['128GB', '256GB', '512GB', '1TB'].map((stg) => (
                    <button
                      key={stg}
                      onClick={() => {
                        setSelectedStorage(selectedStorage === stg ? '' : stg);
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        selectedStorage === stg
                          ? 'bg-[#111111] text-white border-[#111111]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-gray-500">Warna Pilihan</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { name: 'Natural Titanium', hex: '#9E9992' },
                    { name: 'Black Titanium', hex: '#2A2928' },
                    { name: 'Blue Titanium', hex: '#2F3847' },
                    { name: 'White Titanium', hex: '#E3E2DD' },
                  ].map((clr) => {
                    const isSelected = selectedColor === clr.name;
                    return (
                      <button
                        key={clr.name}
                        onClick={() => {
                          setSelectedColor(isSelected ? '' : clr.name);
                          setCurrentPage(1);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md border transition-all ${
                          isSelected
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-gray-400" style={{ backgroundColor: clr.hex }} />
                        {clr.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-gray-500">Kondisi</label>
                <div className="space-y-1">
                  {[
                    { value: '', label: 'Semua Kondisi' },
                    { value: 'brand_new', label: 'Baru (BNIB Garansi Resmi)' },
                    { value: 'like_new', label: 'Second Mulus (QC Tested)' },
                  ].map((c) => (
                    <button
                      key={c.value}
                      onClick={() => { setSelectedCondition(c.value); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        selectedCondition === c.value
                          ? 'bg-[#111111] text-white font-bold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-gray-500">Rentang Harga (Rp)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setCurrentPage(1); }}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setCurrentPage(1); }}
                  />
                </div>
              </div>

              {/* Ready Stock Toggle */}
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">Ready Stock Saja</span>
                <input
                  type="checkbox"
                  checked={readyStockOnly}
                  onChange={(e) => { setReadyStockOnly(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 accent-[#111111] rounded cursor-pointer"
                />
              </div>

            </Card>
          </aside>

          {/* Main Product Grid & Controls */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="text-xs text-gray-500">
                Menampilkan <span className="font-extrabold text-[#111111]">{filteredProducts.length}</span> iPhone terbaik
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-600 shrink-0">Urutkan:</span>
                <div className="w-full sm:w-48">
                  <Select
                    options={[
                      { value: 'newest', label: 'Terbaru' },
                      { value: 'price_low', label: 'Harga Terendah' },
                      { value: 'price_high', label: 'Harga Tertinggi' },
                      { value: 'best_seller', label: 'Terlaris' },
                    ]}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Loading Skeleton Grid */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
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
                onRetry={loadCatalogData}
              />
            )}

            {/* Empty State */}
            {!isLoading && !isError && paginatedProducts.length === 0 && (
              <EmptyState
                title="Produk Tidak Ditemukan"
                description="Tidak ada iPhone yang cocok dengan kombinasi filter yang Anda pilih."
                actionLabel="Reset Semua Filter"
                onAction={resetAllFilters}
              />
            )}

            {/* Product Cards Grid */}
            {!isLoading && !isError && paginatedProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const primaryVariant = product.variants?.[0];
                  const isWishlisted = wishlist[product.id] || false;
                  
                  // Compute discount %
                  const hasDiscount = product.originalPrice && product.originalPrice > product.basePrice;
                  const discountPercent = hasDiscount
                    ? Math.round(((product.originalPrice! - product.basePrice) / product.originalPrice!) * 100)
                    : 0;

                  return (
                    <Card
                      key={product.id}
                      className="group overflow-hidden border border-gray-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />

                          {/* Top Left Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {discountPercent > 0 && (
                              <Badge variant="danger" size="sm">
                                {discountPercent}% OFF
                              </Badge>
                            )}
                            <Badge variant={product.condition === 'brand_new' ? 'success' : 'dark'} size="sm">
                              {product.condition === 'brand_new' ? 'BNIB Garansi' : 'Second Mulus'}
                            </Badge>
                          </div>

                          {/* Wishlist Button */}
                          <button
                            onClick={(e) => toggleWishlist(product.id, e)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                              isWishlisted
                                ? 'bg-rose-500 text-white'
                                : 'bg-white/80 text-gray-700 hover:bg-white'
                            }`}
                            title="Simpan ke Wishlist"
                            aria-label="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
                          </button>
                        </div>

                        {/* Card Info */}
                        <div className="space-y-2 px-1">
                          <div className="flex items-center justify-between text-[11px] text-gray-500">
                            <span className="font-bold text-gray-600 uppercase">{product.category}</span>
                            <div className="flex items-center text-amber-500 gap-1 font-bold">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span>{product.rating}</span>
                              <span className="text-gray-400">({product.reviewCount})</span>
                            </div>
                          </div>

                          <h3 className="text-sm font-extrabold text-[#111111] group-hover:text-[#B88632] transition-colors truncate">
                            <Link to={`/produk/${product.slug}`}>{product.name}</Link>
                          </h3>

                          {/* Variant Storage & Color Pills */}
                          {primaryVariant && (
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                              <span className="px-2 py-0.5 bg-gray-100 rounded-md font-semibold text-gray-700">
                                {primaryVariant.storage}
                              </span>
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-md font-semibold text-gray-700">
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
                            <span className="text-base font-black text-[#111111]">
                              {formatRupiah(product.basePrice)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatRupiah(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Stock Status Indicator */}
                          <div className="pt-1 flex items-center gap-1.5 text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-700 font-bold">Stok Tersedia</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 flex items-center gap-2">
                        <Link to={`/produk/${product.slug}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full text-xs font-bold">
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

            {/* Pagination Controls */}
            {!isLoading && !isError && totalPages > 1 && (
              <div className="pt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}

          </main>

        </div>
      </PageContainer>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Filter Catalog</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-gray-500">Kategori</label>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedCategory(''); setIsMobileFilterOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg ${
                    selectedCategory === '' ? 'bg-[#111111] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Semua Kategori
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setIsMobileFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg flex items-center justify-between ${
                      selectedCategory === cat.id ? 'bg-[#111111] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-60">({cat.productCount})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-gray-500">Storage</label>
              <div className="grid grid-cols-2 gap-2">
                {['128GB', '256GB', '512GB', '1TB'].map((stg) => (
                  <button
                    key={stg}
                    onClick={() => { setSelectedStorage(selectedStorage === stg ? '' : stg); }}
                    className={`px-3 py-2 text-xs font-bold rounded-lg border ${
                      selectedStorage === stg ? 'bg-[#111111] text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    {stg}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-2">
              <Button variant="primary" size="md" className="w-full font-bold" onClick={() => setIsMobileFilterOpen(false)}>
                Terapkan Filter
              </Button>
              <Button variant="outline" size="md" className="w-full" onClick={resetAllFilters}>
                Reset Filter
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
