import { Product, Category, ApiResponse } from '@fincell/shared';
import { fetchApi } from './apiClient';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockData';

export const productService = {
  async getProducts(params?: { category?: string; search?: string; sort?: string }): Promise<ApiResponse<Product[]>> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.search) query.append('search', params.search);
      if (params?.sort) query.append('sort', params.sort);

      const res = await fetchApi<any>(`/products?${query.toString()}`);
      if (res.success && res.data) {
        const mappedProducts: Product[] = res.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          brand: item.brand_name || 'Apple',
          category: item.category_name || 'iPhone',
          categoryId: item.category_id || 'cat-1',
          summary: item.short_description || item.description || '',
          description: item.description || '',
          basePrice: item.base_price,
          originalPrice: item.compare_price || undefined,
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
            'SKU': item.sku,
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
              sku: item.sku,
              storage: '256GB',
              color: 'Natural Titanium',
              colorHex: '#9E9992',
              price: item.base_price,
              originalPrice: item.compare_price || undefined,
              stock: item.stock || 10,
              isAvailable: (item.stock || 10) > 0
            }
          ],
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString(),
        }));
        return { success: true, data: mappedProducts, meta: res.meta };
      }
    } catch {
      // Fallback to MOCK_PRODUCTS if API server is not running locally
    }

    let filtered = [...MOCK_PRODUCTS];
    if (params?.category) {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(params.category!.toLowerCase()) || p.categoryId === params.category);
    }
    if (params?.search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(params.search!.toLowerCase()));
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
          brand: item.brand_name || 'Apple',
          category: item.category_name || 'iPhone',
          categoryId: item.category_id || 'cat-1',
          summary: item.short_description || item.description || '',
          description: item.description || '',
          basePrice: item.base_price,
          originalPrice: item.compare_price || undefined,
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
            'SKU': item.sku,
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

    const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
    return {
      success: true,
      data: product
    };
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
    } catch {
      // Fallback
    }

    return {
      success: true,
      data: MOCK_CATEGORIES
    };
  }
};
