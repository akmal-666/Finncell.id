export type ProductCondition = 'brand_new' | 'second_mulus' | 'like_new' | 'refurbished';

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  storage: string;
  color: string;
  colorHex: string;
  price: number;
  originalPrice?: number;
  stock: number;
  isAvailable: boolean;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  brand: string;
  brandId?: string;
  category: string;
  categoryId: string;
  summary: string;
  description: string;
  basePrice: number;
  originalPrice?: number;
  stock?: number;
  lowStockThreshold?: number;
  status?: 'active' | 'draft' | 'archived';
  condition: ProductCondition;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
  icon?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  productCount: number;
}
