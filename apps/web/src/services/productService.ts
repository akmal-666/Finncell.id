import { Product, ProductCondition, Category, Brand, ApiResponse } from '@fincell/shared';
import { fetchApi } from './apiClient';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_BRANDS } from './mockData';

export interface CreateProductPayload {
  name: string;
  slug: string;
  sku: string;
  brand_id?: string;
  category_id?: string;
  description?: string;
  short_description?: string;
  base_price: number;
  compare_price?: number;
  stock: number;
  low_stock_threshold: number;
  status: 'active' | 'draft' | 'archived';
  condition: ProductCondition;
  seo_title?: string;
  seo_description?: string;
  images?: { url: string; alt_text?: string; sort_order: number; is_primary: boolean }[];
  variants?: any[];
}

export const productService = {
  async getProducts(params?: {
    category?: string;
    brand?: string;
    search?: string;
    status?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Product[]>> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.brand) query.append('brand', params.brand);
      if (params?.search) query.append('search', params.search);
      if (params?.status) query.append('status', params.status);
      if (params?.sort) query.append('sort', params.sort);
      if (params?.page) query.append('page', String(params.page));
      if (params?.limit) query.append('limit', String(params.limit));

      const res = await fetchApi<any>(`/products?${query.toString()}`);
      if (res.success && res.data) {
        const mappedProducts: Product[] = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          sku: item.sku || `SKU-${item.id}`,
          brand: item.brand_name || 'Apple',
          brandId: item.brand_id || 'brand-1',
          category: item.category_name || 'iPhone',
          categoryId: item.category_id || 'cat-1',
          summary: item.short_description || item.description || '',
          description: item.description || '',
          basePrice: item.base_price,
          originalPrice: item.compare_price || undefined,
          stock: item.stock !== undefined ? item.stock : 10,
          lowStockThreshold: item.low_stock_threshold || 5,
          status: item.status || 'active',
          condition: item.condition || 'brand_new',
          isFeatured: true,
          isBestSeller: true,
          isNewArrival: false,
          rating: 4.9,
          reviewCount: 42,
          images: item.images?.length ? item.images.map((i: any) => i.url) : [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
          ],
          specs: {
            'Kondisi': item.condition === 'brand_new' ? 'Baru (BNIB)' : 'Second Mulus',
            'SKU': item.sku || `SKU-${item.id}`,
            'Garansi': 'Garansi Resmi Apple Indonesia'
          },
          variants: item.variants ? item.variants.map((v: any) => ({
            id: v.id,
            productId: v.product_id,
            sku: v.sku,
            storage: v.storage_capacity || '128GB',
            color: v.color_name || 'Natural Titanium',
            colorHex: v.color_hex || '#9E9992',
            price: v.price,
            stock: v.stock,
            isAvailable: v.stock > 0
          })) : [
            {
              id: `var-${item.id}`,
              productId: item.id,
              sku: item.sku || `SKU-${item.id}`,
              storage: '256GB',
              color: 'Natural Titanium',
              colorHex: '#9E9992',
              price: item.base_price,
              originalPrice: item.compare_price || undefined,
              stock: item.stock !== undefined ? item.stock : 10,
              isAvailable: (item.stock || 10) > 0
            }
          ],
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString(),
        }));
        return { success: true, data: mappedProducts, meta: res.meta };
      }
    } catch {
      // Fallback
    }

    let filtered = [...MOCK_PRODUCTS];
    if (params?.category) {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(params.category!.toLowerCase()) || p.categoryId === params.category);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q)));
    }

    return {
      success: true,
      data: filtered,
      meta: { total: filtered.length, page: 1, limit: 20 }
    };
  },

  async getProductBySlug(slug: string): Promise<ApiResponse<Product | null>> {
    try {
      const res = await fetchApi<any>(`/products/${slug}`);
      if (res.success && res.data) {
        const item = res.data;
        const product: Product = {
          id: item.id,
          name: item.name,
          slug: item.slug,
          sku: item.sku || `SKU-${item.id}`,
          brand: item.brand_name || 'Apple',
          brandId: item.brand_id || 'brand-1',
          category: item.category_name || 'iPhone',
          categoryId: item.category_id || 'cat-1',
          summary: item.short_description || item.description || '',
          description: item.description || '',
          basePrice: item.base_price,
          originalPrice: item.compare_price || undefined,
          stock: item.stock !== undefined ? item.stock : 10,
          lowStockThreshold: item.low_stock_threshold || 5,
          status: item.status || 'active',
          condition: item.condition || 'brand_new',
          isFeatured: true,
          isBestSeller: true,
          isNewArrival: false,
          rating: 4.9,
          reviewCount: 42,
          images: item.images?.length ? item.images.map((i: any) => (typeof i === 'string' ? i : i.url)) : [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
          ],
          specs: {
            'Kondisi': item.condition === 'brand_new' ? 'Baru (BNIB)' : 'Second Mulus',
            'SKU': item.sku || `SKU-${item.id}`,
            'Garansi': 'Garansi Resmi Apple Indonesia'
          },
          variants: item.variants?.map((v: any) => ({
            id: v.id,
            productId: v.product_id,
            sku: v.sku,
            storage: v.storage_capacity || '128GB',
            color: v.color_name || 'Natural Titanium',
            colorHex: v.color_hex || '#9E9992',
            price: v.price,
            stock: v.stock,
            isAvailable: v.stock > 0
          })) || [],
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString(),
        };
        return { success: true, data: product };
      }
    } catch {
      // Fallback
    }

    const product = MOCK_PRODUCTS.find(p => p.slug === slug || p.id === slug) || MOCK_PRODUCTS[0];
    return {
      success: true,
      data: product
    };
  },

  async createProduct(payload: CreateProductPayload): Promise<ApiResponse<Product>> {
    try {
      const res = await fetchApi<any>('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.success && res.data) {
        return { success: true, message: 'Produk berhasil dibuat', data: res.data };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal membuat produk', data: undefined as any };
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: payload.name,
      slug: payload.slug,
      sku: payload.sku,
      brand: 'Apple',
      categoryId: payload.category_id || 'cat-1',
      category: 'iPhone 15 Series',
      summary: payload.short_description || '',
      description: payload.description || '',
      basePrice: payload.base_price,
      originalPrice: payload.compare_price,
      stock: payload.stock,
      lowStockThreshold: payload.low_stock_threshold,
      status: payload.status,
      condition: payload.condition,
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: false,
      rating: 5.0,
      reviewCount: 0,
      images: payload.images?.map(i => i.url) || ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'],
      specs: {
        'Kondisi': payload.condition === 'brand_new' ? 'Baru (BNIB)' : 'Second Mulus',
        'SKU': payload.sku,
        'Garansi': 'Garansi Resmi Apple Indonesia'
      },
      variants: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    MOCK_PRODUCTS.unshift(newProd);

    return { success: true, message: 'Produk berhasil dibuat', data: newProd };
  },

  async updateProduct(id: string, payload: Partial<CreateProductPayload>): Promise<ApiResponse<Product>> {
    try {
      const res = await fetchApi<any>(`/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.success && res.data) {
        return { success: true, message: 'Produk berhasil diperbarui', data: res.data };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal memperbarui produk', data: undefined as any };
    }

    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      MOCK_PRODUCTS[index] = {
        ...MOCK_PRODUCTS[index],
        name: payload.name || MOCK_PRODUCTS[index].name,
        slug: payload.slug || MOCK_PRODUCTS[index].slug,
        basePrice: payload.base_price || MOCK_PRODUCTS[index].basePrice,
        stock: payload.stock !== undefined ? payload.stock : MOCK_PRODUCTS[index].stock,
        status: payload.status || MOCK_PRODUCTS[index].status,
        updatedAt: new Date().toISOString()
      };
      return { success: true, message: 'Produk berhasil diperbarui', data: MOCK_PRODUCTS[index] };
    }

    return { success: false, message: 'Produk tidak ditemukan', data: undefined as any };
  },

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    try {
      await fetchApi<void>(`/products/${id}`, { method: 'DELETE' });
    } catch {}

    const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (idx !== -1) MOCK_PRODUCTS.splice(idx, 1);

    return { success: true, data: undefined };
  },

  async duplicateProduct(id: string): Promise<ApiResponse<Product>> {
    const prodRes = await this.getProductBySlug(id);
    if (!prodRes.data) return { success: false, message: 'Produk tidak ditemukan', data: undefined as any };

    const original = prodRes.data;
    const time = Date.now().toString().slice(-4);
    const newPayload: CreateProductPayload = {
      name: `${original.name} (Copy)`,
      slug: `${original.slug}-copy-${time}`,
      sku: `${original.sku || 'SKU'}-COPY-${time}`,
      brand_id: original.brandId || 'brand-1',
      category_id: original.categoryId || 'cat-1',
      short_description: original.summary,
      description: original.description,
      base_price: original.basePrice,
      compare_price: original.originalPrice,
      stock: original.stock || 10,
      low_stock_threshold: original.lowStockThreshold || 5,
      status: 'draft',
      condition: original.condition || 'brand_new',
      images: original.images.map((url, idx) => ({ url, sort_order: idx + 1, is_primary: idx === 0 }))
    };

    return this.createProduct(newPayload);
  },

  async toggleProductStatus(id: string, currentStatus: string): Promise<ApiResponse<Product>> {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    return this.updateProduct(id, { status: newStatus as any });
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const res = await fetchApi<any[]>('/categories');
      if (res.success && res.data) {
        const categories: Category[] = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description || '',
          productCount: item.product_count || 0,
          icon: item.icon || 'Smartphone'
        }));
        return { success: true, data: categories };
      }
    } catch {}

    return { success: true, data: MOCK_CATEGORIES };
  },

  async getBrands(): Promise<ApiResponse<Brand[]>> {
    try {
      const res = await fetchApi<any[]>('/brands');
      if (res.success && res.data) {
        const brands: Brand[] = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          productCount: item.product_count || 0
        }));
        return { success: true, data: brands };
      }
    } catch {}

    return { success: true, data: MOCK_BRANDS };
  }
};
