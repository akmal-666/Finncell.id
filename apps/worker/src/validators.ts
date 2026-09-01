import { z } from 'zod';

export const VariantSchema = z.object({
  id: z.string().optional(),
  storage_id: z.string().optional(),
  color_id: z.string().optional(),
  sku: z.string().min(1, 'SKU varian wajib diisi'),
  price: z.number().positive('Harga varian harus lebih dari 0'),
  stock: z.number().int().min(0, 'Stok varian tidak boleh negatif').default(0),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const ImageSchema = z.object({
  url: z.string().url('URL gambar tidak valid'),
  alt_text: z.string().optional(),
  sort_order: z.number().int().default(0),
  is_primary: z.boolean().default(false),
});

export const CreateProductSchema = z.object({
  name: z.string().min(2, 'Nama produk minimal 2 karakter'),
  slug: z.string().min(2, 'Slug minimal 2 karakter').regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan strip'),
  sku: z.string().min(1, 'SKU produk wajib diisi'),
  brand_id: z.string().optional(),
  category_id: z.string().optional(),
  description: z.string().optional(),
  short_description: z.string().optional(),
  base_price: z.number().positive('Harga dasar harus lebih dari 0'),
  compare_price: z.number().positive().optional(),
  stock: z.number().int().min(0).default(0),
  low_stock_threshold: z.number().int().min(0).default(5),
  status: z.enum(['active', 'draft', 'archived']).default('active'),
  condition: z.enum(['brand_new', 'like_new', 'secondhand', 'second_mulus', 'second_good', 'second_fair']).default('brand_new'),
  variants: z.array(VariantSchema).optional(),
  images: z.array(ImageSchema).optional(),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export const CreateCategorySchema = z.object({
  name: z.string().min(2, 'Nama kategori minimal 2 karakter'),
  slug: z.string().min(2, 'Slug minimal 2 karakter'),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

export const CreateBrandSchema = z.object({
  name: z.string().min(1, 'Nama brand wajib diisi'),
  slug: z.string().min(1, 'Slug brand wajib diisi'),
  description: z.string().optional(),
  logo_url: z.string().url().optional(),
});

export const UpdateSettingsSchema = z.record(z.string(), z.string());
