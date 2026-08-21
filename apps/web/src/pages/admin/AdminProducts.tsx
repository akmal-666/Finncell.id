import React, { useEffect, useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { useToast } from '@/components/ui/Toast';
import { productService } from '@/services/productService';
import { formatRupiah } from '@/lib/utils';
import { Product, Category, Brand } from '@fincell/shared';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Power,
  Package,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Filter,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Filters
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStock, setSelectedStock] = useState<string>('all');

  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        productService.getProducts(),
        productService.getCategories(),
        productService.getBrands(),
      ]);

      if (prodRes.success && prodRes.data) {
        setProducts(prodRes.data);
      } else {
        setIsError(true);
      }

      if (catRes.data) setCategories(catRes.data);
      if (brandRes.data) setBrands(brandRes.data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute Dashboard Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter(p => p.status === 'active').length;
    const inactive = products.filter(p => p.status !== 'active').length;
    const lowStock = products.filter(p => (p.stock !== undefined ? p.stock : 10) <= (p.lowStockThreshold || 5)).length;
    return { total, active, inactive, lowStock };
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.sku ? p.sku.toLowerCase().includes(q) : false;
        if (!matchName && !matchSku) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.categoryId !== selectedCategory && p.category !== selectedCategory) {
        return false;
      }

      // Brand
      if (selectedBrand !== 'all' && p.brandId !== selectedBrand && p.brand !== selectedBrand) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Stock
      const currentStock = p.stock !== undefined ? p.stock : 10;
      const lowThresh = p.lowStockThreshold || 5;

      if (selectedStock === 'ready' && currentStock <= 0) return false;
      if (selectedStock === 'low' && (currentStock > lowThresh || currentStock <= 0)) return false;
      if (selectedStock === 'empty' && currentStock > 0) return false;

      return true;
    });
  }, [products, search, selectedCategory, selectedBrand, selectedStatus, selectedStock]);

  const handleDuplicate = async (p: Product) => {
    try {
      const res = await productService.duplicateProduct(p.id);
      if (res.success && res.data) {
        toast('Produk Berhasil Diduplikasi', {
          type: 'success',
          message: `Salinan produk "${res.data.name}" telah dibuat.`,
        });
        setProducts(prev => [res.data, ...prev]);
      }
    } catch {
      toast('Gagal Duplikasi', { type: 'error', message: 'Terjadi kesalahan saat menduplikasi produk.' });
    }
  };

  const handleToggleStatus = async (p: Product) => {
    try {
      const res = await productService.toggleProductStatus(p.id, p.status || 'active');
      if (res.success && res.data) {
        toast('Status Produk Diperbarui', {
          type: 'info',
          message: `Status ${p.name} diubah menjadi ${res.data.status}.`,
        });
        setProducts(prev => prev.map(item => (item.id === p.id ? { ...item, status: res.data.status } : item)));
      }
    } catch {
      toast('Gagal Mengubah Status', { type: 'error', message: 'Terjadi kesalahan saat mengubah status produk.' });
    }
  };

  const handleDelete = async (p: Product) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk "${p.name}"?`)) {
      try {
        await productService.deleteProduct(p.id);
        toast('Produk Dihapus', { type: 'info', message: `Produk "${p.name}" telah dihapus dari katalog.` });
        setProducts(prev => prev.filter(item => item.id !== p.id));
      } catch {
        toast('Gagal Hapus', { type: 'error', message: 'Terjadi kesalahan saat menghapus produk.' });
      }
    }
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedStatus('all');
    setSelectedStock('all');
  };

  return (
    <PageContainer
      title="Katalog & CMS Produk"
      subtitle="Kelola inventaris iPhone, varian harga, spesifikasi, dan ketersediaan stok secara real-time."
      actions={
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Tambah Produk Baru
          </Button>
        </Link>
      }
    >
      <div className="space-y-6">
        
        {/* 1. DASHBOARD STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Card className="p-5 space-y-2 border border-gray-200/80 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Produk</span>
              <div className="p-2 bg-gray-100 rounded-lg text-gray-700">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#111111]">{stats.total}</p>
            <p className="text-[11px] text-gray-400">Total unit di database</p>
          </Card>

          <Card className="p-5 space-y-2 border border-gray-200/80 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Produk Aktif</span>
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{stats.active}</p>
            <p className="text-[11px] text-gray-400">Tampil di katalog publik</p>
          </Card>

          <Card className="p-5 space-y-2 border border-gray-200/80 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Produk Nonaktif</span>
              <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-700">{stats.inactive}</p>
            <p className="text-[11px] text-gray-400">Draft atau diarsipkan</p>
          </Card>

          <Card className="p-5 space-y-2 border border-amber-200 bg-amber-50/40 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-800 font-bold uppercase tracking-wider">Stok Menipis</span>
              <div className="p-2 bg-amber-100 rounded-lg text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-900">{stats.lowStock}</p>
            <p className="text-[11px] text-amber-700">Perlu restok segera</p>
          </Card>

        </div>

        {/* 2. FILTERS & SEARCH TOOLBAR */}
        <Card className="p-5 space-y-4 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* Search Input */}
            <div className="lg:col-span-2">
              <Input
                placeholder="Cari nama produk / SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>

            {/* Category Filter */}
            <Select
              options={[
                { value: 'all', label: 'Semua Kategori' },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />

            {/* Status Filter */}
            <Select
              options={[
                { value: 'all', label: 'Semua Status' },
                { value: 'active', label: 'Aktif (Terbit)' },
                { value: 'draft', label: 'Draft' },
                { value: 'archived', label: 'Nonaktif / Arsip' },
              ]}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />

            {/* Stock Filter */}
            <Select
              options={[
                { value: 'all', label: 'Semua Stok' },
                { value: 'ready', label: 'Ready Stock' },
                { value: 'low', label: 'Stok Menipis' },
                { value: 'empty', label: 'Stok Habis' },
              ]}
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            />

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
            <span>Menampilkan <strong className="text-[#111111]">{filteredProducts.length}</strong> dari {products.length} produk</span>
            {(search || selectedCategory !== 'all' || selectedBrand !== 'all' || selectedStatus !== 'all' || selectedStock !== 'all') && (
              <button onClick={resetFilters} className="text-[#B88632] hover:underline font-bold flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Reset Filter
              </button>
            )}
          </div>
        </Card>

        {/* 3. LOADING & ERROR STATES */}
        {isLoading && (
          <Card className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </Card>
        )}

        {isError && (
          <ErrorState
            title="Gagal Memuat Produk"
            message="Terjadi kesalahan saat memuat katalog produk dari server API."
            onRetry={loadData}
          />
        )}

        {/* 4. PRODUCTS TABLE */}
        {!isLoading && !isError && (
          <Card className="overflow-hidden border border-gray-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold text-xs">Produk & SKU</TableHead>
                  <TableHead className="font-bold text-xs">Kategori</TableHead>
                  <TableHead className="font-bold text-xs">Harga Dasar</TableHead>
                  <TableHead className="font-bold text-xs">Stok</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs">Pembaruan</TableHead>
                  <TableHead className="font-bold text-xs text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-xs text-gray-500">
                      Tidak ada produk yang cocok dengan kombinasi filter Anda.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((p) => {
                    const stockNum = p.stock !== undefined ? p.stock : 10;
                    const lowThresh = p.lowStockThreshold || 5;
                    const isLowStock = stockNum > 0 && stockNum <= lowThresh;
                    const isOutOfStock = stockNum <= 0;

                    return (
                      <TableRow key={p.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        {/* Product Column */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0] || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'}
                              alt={p.name}
                              className="w-11 h-11 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-100"
                            />
                            <div className="space-y-0.5 max-w-xs">
                              <p className="font-extrabold text-[#111111] text-xs leading-snug truncate">{p.name}</p>
                              <p className="text-[10px] text-gray-400 font-mono truncate">SKU: {p.sku || 'N/A'}</p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="text-xs text-gray-700 font-medium">
                          {p.category}
                        </TableCell>

                        {/* Price */}
                        <TableCell>
                          <p className="font-extrabold text-xs text-[#111111]">{formatRupiah(p.basePrice)}</p>
                          {p.originalPrice && (
                            <p className="text-[10px] text-gray-400 line-through">{formatRupiah(p.originalPrice)}</p>
                          )}
                        </TableCell>

                        {/* Stock Badge */}
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-black ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-emerald-600'}`}>
                              {stockNum} unit
                            </span>
                            {isLowStock && (
                              <Badge variant="warning" size="sm" className="text-[9px] px-1.5 py-0">Menipis</Badge>
                            )}
                            {isOutOfStock && (
                              <Badge variant="danger" size="sm" className="text-[9px] px-1.5 py-0">Habis</Badge>
                            )}
                          </div>
                        </TableCell>

                        {/* Status Badge */}
                        <TableCell>
                          {p.status === 'active' ? (
                            <Badge variant="success" size="sm">Aktif</Badge>
                          ) : p.status === 'draft' ? (
                            <Badge variant="warning" size="sm">Draft</Badge>
                          ) : (
                            <Badge variant="secondary" size="sm">Nonaktif</Badge>
                          )}
                        </TableCell>

                        {/* Updated */}
                        <TableCell className="text-[11px] text-gray-400 whitespace-nowrap">
                          {new Date(p.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            
                            {/* Edit */}
                            <Link to={`/admin/products/${p.id}/edit`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                iconOnly={<Edit className="w-4 h-4 text-blue-600" />}
                                title="Edit Produk"
                              />
                            </Link>

                            {/* Duplicate */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicate(p)}
                              iconOnly={<Copy className="w-4 h-4 text-purple-600" />}
                              title="Duplikasi Produk"
                            />

                            {/* Activate / Deactivate Toggle */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleStatus(p)}
                              iconOnly={<Power className={`w-4 h-4 ${p.status === 'active' ? 'text-amber-600' : 'text-emerald-600'}`} />}
                              title={p.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                            />

                            {/* Delete */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(p)}
                              iconOnly={<Trash2 className="w-4 h-4 text-rose-600" />}
                              title="Hapus Produk"
                            />

                          </div>
                        </TableCell>

                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Card>
        )}

      </div>
    </PageContainer>
  );
};
