import { describe, it, expect, beforeEach } from 'vitest';
import app from '../src/index';

// Mock DB for D1 execution testing
function createMockDb() {
  const dbData: Record<string, any[]> = {
    products: [
      {
        id: 'prod-test-1',
        name: 'iPhone 15 Pro Max Test',
        slug: 'iphone-15-pro-max-test',
        sku: 'IP15PM-TEST',
        brand_id: 'brand-apple',
        category_id: 'cat-1',
        description: 'Test Description',
        base_price: 23999000,
        compare_price: 24999000,
        stock: 10,
        low_stock_threshold: 5,
        status: 'active',
        condition: 'brand_new',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    categories: [
      { id: 'cat-1', name: 'iPhone 15 Series', slug: 'iphone-15-series', description: 'Test Cat' },
    ],
    brands: [
      { id: 'brand-apple', name: 'Apple', slug: 'apple', description: 'Test Brand' },
    ],
    settings: [
      { key: 'store_name', value: 'fincell.id' },
    ],
    product_variants: [],
    product_images: [],
  };

  return {
    prepare(sql: string) {
      return {
        bind(...args: any[]) {
          return {
            async first<T = any>(): Promise<T | null> {
              if (sql.includes('SELECT p.*')) {
                const slugOrId = args[0];
                const found = dbData.products.find(p => p.slug === slugOrId || p.id === slugOrId);
                return (found as T) || null;
              }
              if (sql.includes('SELECT id FROM products WHERE slug = ?')) {
                const slug = args[0];
                const excludeId = args[1];
                const found = dbData.products.find(p => p.slug === slug && p.id !== excludeId);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM products WHERE sku = ?')) {
                const sku = args[0];
                const excludeId = args[1];
                const found = dbData.products.find(p => p.sku === sku && p.id !== excludeId);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM categories WHERE slug = ?')) {
                const slug = args[0];
                const excludeId = args[1];
                const found = dbData.categories.find(c => c.slug === slug && c.id !== excludeId);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM categories WHERE id = ?')) {
                const id = args[0];
                const found = dbData.categories.find(c => c.id === id);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM products WHERE id = ?')) {
                const id = args[0];
                const found = dbData.products.find(p => p.id === id);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('COUNT(*) as total')) {
                return { total: dbData.products.length } as T;
              }
              return null;
            },
            async all() {
              if (sql.includes('FROM products')) {
                return { results: dbData.products };
              }
              if (sql.includes('FROM categories')) {
                return { results: dbData.categories };
              }
              if (sql.includes('FROM brands')) {
                return { results: dbData.brands };
              }
              if (sql.includes('FROM settings')) {
                return { results: dbData.settings };
              }
              return { results: [] };
            },
            async run() {
              if (sql.includes('INSERT INTO products')) {
                dbData.products.push({
                  id: args[0],
                  name: args[1],
                  slug: args[2],
                  sku: args[3],
                  brand_id: args[4],
                  category_id: args[5],
                  description: args[6],
                  short_description: args[7],
                  base_price: args[8],
                  compare_price: args[9],
                  stock: args[10],
                  low_stock_threshold: args[11],
                  status: args[12],
                  condition: args[13],
                });
              }
              if (sql.includes('DELETE FROM products')) {
                const id = args[0];
                dbData.products = dbData.products.filter(p => p.id !== id);
              }
              return { success: true };
            },
          };
        },
      };
    },
  };
}

describe('Fincell Worker API QA Suite', () => {
  let mockEnv: { DB: any };

  beforeEach(() => {
    mockEnv = { DB: createMockDb() };
  });

  it('GET /api/health returns 200 OK', async () => {
    const res = await app.request('/api/health', {}, mockEnv);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.status).toBe('ok');
  });

  it('GET /api/products returns product list with pagination meta', async () => {
    const res = await app.request('/api/products?page=1&limit=10', {}, mockEnv);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.meta.page).toBe(1);
  });

  it('GET /api/products/:slug returns 404 for invalid product', async () => {
    const res = await app.request('/api/products/non-existent-slug', {}, mockEnv);
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.code).toBe('PRODUCT_NOT_FOUND');
  });

  it('POST /api/products validates missing required payload fields', async () => {
    const res = await app.request('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Incomplete' }),
    }, mockEnv);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.code).toBe('INVALID_PAYLOAD');
  });

  it('POST /api/products rejects duplicate SKU', async () => {
    const res = await app.request('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate SKU Product',
        slug: 'unique-slug-123',
        sku: 'IP15PM-TEST', // Existing SKU
        base_price: 15000000,
      }),
    }, mockEnv);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.code).toBe('DUPLICATE_SKU');
  });

  it('POST /api/products rejects duplicate slug', async () => {
    const res = await app.request('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Slug Product',
        slug: 'iphone-15-pro-max-test', // Existing Slug
        sku: 'UNIQUE-SKU-999',
        base_price: 15000000,
      }),
    }, mockEnv);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.code).toBe('DUPLICATE_SLUG');
  });

  it('GET /api/categories returns category list', async () => {
    const res = await app.request('/api/categories', {}, mockEnv);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it('GET /api/settings returns settings object', async () => {
    const res = await app.request('/api/settings', {}, mockEnv);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.store_name).toBe('fincell.id');
  });
});
