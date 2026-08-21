import { Product, Category, ApiResponse } from '@fincell/shared';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from './mockData';

export const productService = {
  async getProducts(params?: { category?: string; search?: string }): Promise<ApiResponse<Product[]>> {
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
    const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
    return {
      success: true,
      data: product
    };
  },

  async getCategories(): Promise<ApiResponse<Category[]>> {
    return {
      success: true,
      data: MOCK_CATEGORIES
    };
  }
};
