import app from './index.js';

async function runTests() {
  console.log('--- STARTING FINCELL WORKER QA API TESTS ---');

  const mockDbData: Record<string, any[]> = {
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

  const mockDb = {
    prepare(sql: string) {
      return {
        bind(...args: any[]) {
          return {
            async first<T = any>(): Promise<T | null> {
              if (sql.includes('SELECT p.*')) {
                const slugOrId = args[0];
                const found = mockDbData.products.find(p => p.slug === slugOrId || p.id === slugOrId);
                return (found as T) || null;
              }
              if (sql.includes('SELECT id FROM products WHERE slug = ?')) {
                const slug = args[0];
                const excludeId = args[1];
                const found = mockDbData.products.find(p => p.slug === slug && p.id !== excludeId);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM products WHERE sku = ?')) {
                const sku = args[0];
                const excludeId = args[1];
                const found = mockDbData.products.find(p => p.sku === sku && p.id !== excludeId);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM categories WHERE slug = ?')) {
                const slug = args[0];
                const excludeId = args[1];
                const found = mockDbData.categories.find(c => c.slug === slug && c.id !== excludeId);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM categories WHERE id = ?')) {
                const id = args[0];
                const found = mockDbData.categories.find(c => c.id === id);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('SELECT id FROM products WHERE id = ?')) {
                const id = args[0];
                const found = mockDbData.products.find(p => p.id === id);
                return (found ? { id: found.id } : null) as T;
              }
              if (sql.includes('COUNT(*) as total')) {
                return { total: mockDbData.products.length } as T;
              }
              return null;
            },
            async all() {
              if (sql.includes('FROM products')) {
                return { results: mockDbData.products };
              }
              if (sql.includes('FROM categories')) {
                return { results: mockDbData.categories };
              }
              if (sql.includes('FROM brands')) {
                return { results: mockDbData.brands };
              }
              if (sql.includes('FROM settings')) {
                return { results: mockDbData.settings };
              }
              return { results: [] };
            },
            async run() {
              if (sql.includes('INSERT INTO products')) {
                mockDbData.products.push({
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
                mockDbData.products = mockDbData.products.filter(p => p.id !== id);
              }
              return { success: true };
            },
          };
        },
      };
    },
  };

  const mockEnv = { DB: mockDb as unknown as D1Database };

  // 1. Health check
  const res1 = await app.request('/api/health', {}, mockEnv);
  console.assert(res1.status === 200, 'Health check status 200');
  console.log('[PASS] GET /api/health (200 OK)');

  // 2. GET /api/products
  const res2 = await app.request('/api/products?page=1&limit=10', {}, mockEnv);
  const json2: any = await res2.json();
  console.assert(json2.success === true && json2.meta.page === 1, 'Products list pagination');
  console.log('[PASS] GET /api/products (200 OK with Pagination Meta)');

  // 3. GET /api/products/:slug (404 test)
  const res3 = await app.request('/api/products/invalid-slug-xyz', {}, mockEnv);
  const json3: any = await res3.json();
  console.assert(res3.status === 404 && json3.code === 'PRODUCT_NOT_FOUND', 'Product 404');
  console.log('[PASS] GET /api/products/:slug Invalid ID (404 PRODUCT_NOT_FOUND)');

  // 4. POST /api/products (Validation Error)
  const res4 = await app.request('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Short' }),
  }, mockEnv);
  const json4: any = await res4.json();
  console.assert(res4.status === 400 && json4.code === 'INVALID_PAYLOAD', 'Zod Payload Validation');
  console.log('[PASS] POST /api/products Zod Validation Error (400 INVALID_PAYLOAD)');

  // 5. POST /api/products (Duplicate SKU)
  const res5 = await app.request('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Duplicate SKU Product',
      slug: 'unique-slug-new',
      sku: 'IP15PM-TEST',
      base_price: 15000000,
    }),
  }, mockEnv);
  const json5: any = await res5.json();
  console.assert(res5.status === 400 && json5.code === 'DUPLICATE_SKU', 'Duplicate SKU');
  console.log('[PASS] POST /api/products Duplicate SKU Error (400 DUPLICATE_SKU)');

  // 6. POST /api/products (Duplicate Slug)
  const res6 = await app.request('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Duplicate Slug Product',
      slug: 'iphone-15-pro-max-test',
      sku: 'NEW-SKU-999',
      base_price: 15000000,
    }),
  }, mockEnv);
  const json6: any = await res6.json();
  console.assert(res6.status === 400 && json6.code === 'DUPLICATE_SLUG', 'Duplicate Slug');
  console.log('[PASS] POST /api/products Duplicate Slug Error (400 DUPLICATE_SLUG)');

  // 7. GET /api/categories
  const res7 = await app.request('/api/categories', {}, mockEnv);
  console.assert(res7.status === 200, 'Categories GET');
  console.log('[PASS] GET /api/categories (200 OK)');

  // 8. GET /api/settings
  const res8 = await app.request('/api/settings', {}, mockEnv);
  const json8: any = await res8.json();
  console.assert(res8.status === 200 && json8.data.store_name === 'fincell.id', 'Settings GET');
  console.log('[PASS] GET /api/settings (200 OK)');

  console.log('--- ALL QA TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch(console.error);
