import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { productService, CreateProductPayload } from '@/services/productService';
import { storageService } from '@/services/storageService';
import { Category, Brand, ProductCondition } from '@fincell/shared';
import {
  Save,
  ArrowLeft,
  Upload,
  Trash2,
  Star,
  MoveLeft,
  MoveRight,
  Plus,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';

interface ProductImageItem {
  id: string;
  url: string;
  isPrimary: boolean;
}

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [brandId, setBrandId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [storage, setStorage] = useState<string>('256GB');
  const [color, setColor] = useState<string>('Natural Titanium');
  const [condition, setCondition] = useState<ProductCondition>('brand_new');
  const [basePrice, setBasePrice] = useState<string>('');
  const [comparePrice, setComparePrice] = useState<string>('');
  const [stock, setStock] = useState<string>('10');
  const [lowStockThreshold, setLowStockThreshold] = useState<string>('5');
  const [status, setStatus] = useState<'active' | 'draft' | 'archived'>('active');
  const [seoTitle, setSeoTitle] = useState<string>('');
  const [seoDescription, setSeoDescription] = useState<string>('');

  // Images
  const [images, setImages] = useState<ProductImageItem[]>([
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
      isPrimary: true,
    },
  ]);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');

  // Auto slug generator
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      const [catRes, brandRes] = await Promise.all([
        productService.getCategories(),
        productService.getBrands(),
      ]);

      if (catRes.data) {
        setCategories(catRes.data);
        if (catRes.data.length > 0 && !categoryId) setCategoryId(catRes.data[0].id);
      }
      if (brandRes.data) {
        setBrands(brandRes.data);
        if (brandRes.data.length > 0 && !brandId) setBrandId(brandRes.data[0].id);
      }
    };

    fetchDropdowns();
  }, []);

  // Fetch Existing Product data if Editing
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    productService
      .getProductBySlug(id)
      .then((res) => {
        if (res.data) {
          const p = res.data;
          setName(p.name);
          setSlug(p.slug);
          setSku(p.sku || `SKU-${p.id}`);
          if (p.brandId) setBrandId(p.brandId);
          if (p.categoryId) setCategoryId(p.categoryId);
          setShortDescription(p.summary || '');
          setDescription(p.description || '');
          setCondition(p.condition || 'brand_new');
          setBasePrice(String(p.basePrice));
          setComparePrice(p.originalPrice ? String(p.originalPrice) : '');
          setStock(String(p.stock !== undefined ? p.stock : 10));
          setLowStockThreshold(String(p.lowStockThreshold || 5));
          setStatus(p.status || 'active');

          if (p.images && p.images.length > 0) {
            setImages(
              p.images.map((url, idx) => ({
                id: `img-${idx}`,
                url,
                isPrimary: idx === 0,
              }))
            );
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Handle Image File Upload (Backblaze B2 Abstraction)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const file = files[0];
      const uploaded = await storageService.uploadImage(file);

      const newItem: ProductImageItem = {
        id: `img-${Date.now()}`,
        url: uploaded.url,
        isPrimary: images.length === 0,
      };

      setImages(prev => [...prev, newItem]);
      toast('Gambar Berhasil Diunggah', {
        type: 'success',
        message: `File ${file.name} telah diunggah ke storage B2.`,
      });
    } catch {
      toast('Gagal Unggah Gambar', { type: 'error', message: 'Terjadi kesalahan saat mengunggah gambar.' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Add Custom Image URL
  const handleAddCustomUrl = () => {
    if (!customImageUrl.trim()) return;
    const newItem: ProductImageItem = {
      id: `img-${Date.now()}`,
      url: customImageUrl.trim(),
      isPrimary: images.length === 0,
    };
    setImages(prev => [...prev, newItem]);
    setCustomImageUrl('');
    toast('URL Gambar Ditambahkan', { type: 'info', message: 'Gambar baru ditambahkan ke galeri.' });
  };

  // Set Primary Image
  const setPrimaryImage = (imgId: string) => {
    setImages(prev =>
      prev.map(img => ({
        ...img,
        isPrimary: img.id === imgId,
      }))
    );
  };

  // Move Image Order
  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;

    const list = [...images];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    setImages(list);
  };

  // Delete Image
  const handleDeleteImage = (imgId: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== imgId);
      if (filtered.length > 0 && !filtered.some(i => i.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  // Handle Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !slug.trim() || !sku.trim() || !basePrice) {
      toast('Lengkapi Data', { type: 'error', message: 'Nama, Slug, SKU, dan Harga Dasar wajib diisi!' });
      return;
    }

    setIsSubmitting(true);

    const formattedImages = images.map((img, idx) => ({
      url: img.url,
      sort_order: idx + 1,
      is_primary: img.isPrimary,
    }));

    const payload: CreateProductPayload = {
      name,
      slug,
      sku,
      brand_id: brandId,
      category_id: categoryId,
      short_description: shortDescription,
      description,
      base_price: Number(basePrice),
      compare_price: comparePrice ? Number(comparePrice) : undefined,
      stock: Number(stock) || 0,
      low_stock_threshold: Number(lowStockThreshold) || 5,
      status,
      condition,
      seo_title: seoTitle || name,
      seo_description: seoDescription || shortDescription,
      images: formattedImages,
    };

    try {
      if (isEdit && id) {
        const res = await productService.updateProduct(id, payload);
        if (res.success) {
          toast('Produk Berhasil Diperbarui', { type: 'success', message: `Data ${name} berhasil disimpan.` });
          navigate('/admin/products');
        }
      } else {
        const res = await productService.createProduct(payload);
        if (res.success) {
          toast('Produk Berhasil Ditambahkan', { type: 'success', message: `Produk ${name} telah terbit.` });
          navigate('/admin/products');
        }
      }
    } catch {
      toast('Gagal Menyimpan', { type: 'error', message: 'Terjadi kesalahan pada koneksi API.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer title="Memuat Data Produk...">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={isEdit ? `Edit Produk: ${name}` : 'Tambah Produk Baru'}
      subtitle={isEdit ? 'Perbarui informasi spesifikasi, varian harga, dan galeri produk.' : 'Tambahkan perangkat iPhone atau aksesoris baru ke katalog fincell.id.'}
      breadcrumbs={[
        { label: 'Produk', href: '/admin/products' },
        { label: isEdit ? 'Edit Produk' : 'Tambah Baru' },
      ]}
      actions={
        <Link to="/admin/products">
          <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Kembali
          </Button>
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        
        {/* 1. INFORMASI UTAMA & SKUS */}
        <Card className="p-6 space-y-4 border border-gray-200">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E7B65A]" /> Informasi Utama Produk
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Nama Produk *"
                placeholder="Contoh: iPhone 15 Pro Max 256GB"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <Input
              label="Kode SKU *"
              placeholder="Contoh: IP15PM-256-NAT"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="URL Slug *"
              placeholder="iphone-15-pro-max-256gb"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />

            <Select
              label="Kategori Produk *"
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />

            <Select
              label="Brand / Merk *"
              options={brands.map((b) => ({ value: b.id, label: b.name }))}
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
            />
          </div>
        </Card>

        {/* 2. SPEC & HARGA */}
        <Card className="p-6 space-y-4 border border-gray-200">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Harga, Kondisi & Ketersediaan Stok
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              label="Harga Dasar (Rp) *"
              type="number"
              placeholder="23999000"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              required
            />

            <Input
              label="Harga Coret (Rp)"
              type="number"
              placeholder="24999000"
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)}
            />

            <Input
              label="Jumlah Stok Unit *"
              type="number"
              placeholder="10"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />

            <Input
              label="Batas Stok Menipis"
              type="number"
              placeholder="5"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Kondisi Perangkat *"
              options={[
                { value: 'brand_new', label: 'Baru (BNIB Garansi Resmi)' },
                { value: 'second_mulus', label: 'Second Mulus (Eks Garansi)' },
              ]}
              value={condition}
              onChange={(e) => setCondition(e.target.value as any)}
            />

            <Select
              label="Kapasitas Storage"
              options={[
                { value: '128GB', label: '128GB' },
                { value: '256GB', label: '256GB' },
                { value: '512GB', label: '512GB' },
                { value: '1TB', label: '1TB' },
              ]}
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
            />

            <Select
              label="Status Publikasi *"
              options={[
                { value: 'active', label: 'Aktif (Tampil di Toko)' },
                { value: 'draft', label: 'Draft (Belum Terbit)' },
                { value: 'archived', label: 'Arsip (Nonaktif)' },
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            />
          </div>
        </Card>

        {/* 3. MEDIA & B2 IMAGE STORAGE */}
        <Card className="p-6 space-y-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Galeri Gambar Produk (Backblaze B2 Ready)
            </h3>
            <span className="text-xs text-gray-500 font-medium">{images.length} Gambar Dimuat</span>
          </div>

          {/* Upload Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
            
            {/* File Upload Button */}
            <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-gray-200 text-center hover:border-gray-400 transition-all cursor-pointer">
              <input
                type="file"
                id="b2-image-upload"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploadingImage}
              />
              <label htmlFor="b2-image-upload" className="cursor-pointer space-y-1">
                <Upload className="w-6 h-6 text-gray-500 mx-auto" />
                <p className="text-xs font-bold text-[#111111]">
                  {isUploadingImage ? 'Mengunggah ke B2...' : 'Unggah File Gambar'}
                </p>
                <p className="text-[10px] text-gray-400">PNG, JPG, WebP hingga 5MB</p>
              </label>
            </div>

            {/* Custom URL Input */}
            <div className="flex flex-col justify-center space-y-2">
              <label className="text-xs font-bold text-gray-700">Atau Tambahkan via URL Gambar</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://images.unsplash.com/..."
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  leftIcon={<LinkIcon className="w-4 h-4 text-gray-400" />}
                />
                <Button variant="secondary" size="sm" type="button" onClick={handleAddCustomUrl}>
                  Tambah
                </Button>
              </div>
            </div>

          </div>

          {/* Image Thumbnail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`relative group rounded-xl border p-2 bg-white transition-all ${
                  img.isPrimary ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                {/* Primary Badge */}
                {img.isPrimary && (
                  <Badge variant="accent" size="sm" className="absolute top-3 left-3 z-10 text-[9px] shadow-sm">
                    ★ Sampul Utama
                  </Badge>
                )}

                {/* Thumbnail */}
                <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100 mb-2">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Control Actions */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  
                  {/* Reorder Left */}
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'left')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                  >
                    <MoveLeft className="w-3.5 h-3.5" />
                  </button>

                  {/* Set Primary */}
                  {!img.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(img.id)}
                      className="text-[10px] text-amber-700 font-bold hover:underline"
                    >
                      Jadikan Sampul
                    </button>
                  )}

                  {/* Reorder Right */}
                  <button
                    type="button"
                    onClick={() => moveImage(index, 'right')}
                    disabled={index === images.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                  >
                    <MoveRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 ml-auto"
                    title="Hapus gambar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. DESKRIPSI & SEO */}
        <Card className="p-6 space-y-4 border border-gray-200">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" /> Deskripsi & Optimalisasi SEO
          </h3>

          <Textarea
            label="Ringkasan Singkat (Summary) *"
            placeholder="Ringkasan fitur unggulan produk yang akan tampil di kartu katalog..."
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={2}
            required
          />

          <Textarea
            label="Deskripsi Lengkap Produk *"
            placeholder="Spesifikasi detail, garansi, keunggulan layar, kamera, dan kapasitas baterai..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <Input
              label="SEO Title Tag"
              placeholder="Jual iPhone 15 Pro Max Original Garansi Resmi - fincell.id"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
            />
            <Textarea
              label="SEO Meta Description"
              placeholder="Beli iPhone 15 Pro Max garansi resmi Apple Indonesia. Harga terbaik, cicilan 0%, pengiriman cepat."
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={2}
            />
          </div>
        </Card>

        {/* 5. FORM SUBMIT BUTTONS */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" size="md" type="button" onClick={() => navigate('/admin/products')}>
            Batal
          </Button>
          <Button variant="primary" size="md" type="submit" isLoading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
            {isEdit ? 'Simpan Perubahan Produk' : 'Terbitkan Produk Baru'}
          </Button>
        </div>

      </form>
    </PageContainer>
  );
};
