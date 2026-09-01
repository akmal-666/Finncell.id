import { Hono } from 'hono';
import { CreateProductSchema, UpdateProductSchema } from '../validators.js';

type Bindings = {
  DB: D1Database;
};

export const productRoutes = new Hono<{ Bindings: Bindings }>();

// GET /api/products (pagination, search, filter, sorting)
productRoutes.get('/', async (c) => {
  try {
    const { category, brand, search, status, sort, page = '1', limit = '20' } = c.req.query();

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const offset = (pageNum - 1) * limitNum;

    let query = `
      SELECT p.*, c.name as category_name, b.name as brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category) {
      query += ` AND (p.category_id = ? OR c.slug = ?)`;
      params.push(category, category);
    }

    if (brand) {
      query += ` AND (p.brand_id = ? OR b.slug = ?)`;
      params.push(brand, brand);
    }

    if (status) {
      query += ` AND p.status = ?`;
      params.push(status);
    }

    if (search) {
      query += ` AND (p.name LIKE ? OR p.sku LIKE ? OR p.description LIKE ?)`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    // Sorting
    if (sort === 'price_low') {
      query += ` ORDER BY p.base_price ASC`;
    } else if (sort === 'price_high') {
      query += ` ORDER BY p.base_price DESC`;
    } else {
      query += ` ORDER BY p.created_at DESC`;
    }

    // Count Total
    const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
    const countStmt = c.env.DB.prepare(countQuery).bind(...params);
    const countResult = await countStmt.first<{ total: number }>();
    const total = countResult?.total || 0;

    // Pagination limit & offset
    query += ` LIMIT ? OFFSET ?`;
    params.push(limitNum, offset);

    const stmt = c.env.DB.prepare(query).bind(...params);
    const { results } = await stmt.all();

    return c.json({
      success: true,
      data: results || [],
      meta: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// GET /api/products/:slug
productRoutes.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');

    const productStmt = c.env.DB.prepare(`
      SELECT p.*, c.name as category_name, b.name as brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.slug = ? OR p.id = ?
    `).bind(slug, slug);

    const product = await productStmt.first();

    if (!product) {
      return c.json({ success: false, message: 'Product tidak ditemukan', code: 'PRODUCT_NOT_FOUND' }, 404);
    }

    // Fetch variants
    const variantsStmt = c.env.DB.prepare(`
      SELECT pv.*, s.capacity as storage_capacity, cl.name as color_name, cl.hex_code as color_hex
      FROM product_variants pv
      LEFT JOIN storage_options s ON pv.storage_id = s.id
      LEFT JOIN colors cl ON pv.color_id = cl.id
      WHERE pv.product_id = ?
    `).bind((product as any).id);

    const variants = await variantsStmt.all();

    // Fetch images
    const imagesStmt = c.env.DB.prepare(`
      SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order ASC
    `).bind((product as any).id);

    const images = await imagesStmt.all();

    return c.json({
      success: true,
      data: {
        ...product,
        variants: variants.results || [],
        images: images.results || [],
      },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// POST /api/products
productRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const parseResult = CreateProductSchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({
        success: false,
        message: 'Payload request tidak valid',
        code: 'INVALID_PAYLOAD',
        errors: parseResult.error.flatten().fieldErrors,
      }, 400);
    }

    const data = parseResult.data;

    // Check duplicate slug
    const existingSlug = await c.env.DB.prepare(`SELECT id FROM products WHERE slug = ?`).bind(data.slug).first();
    if (existingSlug) {
      return c.json({ success: false, message: 'Slug produk sudah digunakan', code: 'DUPLICATE_SLUG' }, 400);
    }

    // Check duplicate SKU
    const existingSku = await c.env.DB.prepare(`SELECT id FROM products WHERE sku = ?`).bind(data.sku).first();
    if (existingSku) {
      return c.json({ success: false, message: 'SKU produk sudah digunakan', code: 'DUPLICATE_SKU' }, 400);
    }

    const productId = `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    await c.env.DB.prepare(`
      INSERT INTO products (
        id, name, slug, sku, brand_id, category_id, description, short_description,
        base_price, compare_price, stock, low_stock_threshold, status, condition
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      productId,
      data.name,
      data.slug,
      data.sku,
      data.brand_id || null,
      data.category_id || null,
      data.description || null,
      data.short_description || null,
      data.base_price,
      data.compare_price || null,
      data.stock,
      data.low_stock_threshold,
      data.status,
      data.condition
    ).run();

    // Insert variants if provided
    if (data.variants && data.variants.length > 0) {
      for (const variant of data.variants) {
        const existingVarSku = await c.env.DB.prepare(`SELECT id FROM product_variants WHERE sku = ?`).bind(variant.sku).first();
        if (existingVarSku) {
          return c.json({ success: false, message: `SKU varian ${variant.sku} sudah digunakan`, code: 'DUPLICATE_SKU' }, 400);
        }

        const variantId = `var-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        await c.env.DB.prepare(`
          INSERT INTO product_variants (id, product_id, storage_id, color_id, sku, price, stock, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          variantId,
          productId,
          variant.storage_id || null,
          variant.color_id || null,
          variant.sku,
          variant.price,
          variant.stock,
          variant.status
        ).run();
      }
    }

    // Insert images if provided
    if (data.images && data.images.length > 0) {
      for (const img of data.images) {
        const imgId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
        await c.env.DB.prepare(`
          INSERT INTO product_images (id, product_id, url, alt_text, sort_order, is_primary)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(
          imgId,
          productId,
          img.url,
          img.alt_text || null,
          img.sort_order,
          img.is_primary ? 1 : 0
        ).run();
      }
    }

    const createdProduct = await c.env.DB.prepare(`SELECT * FROM products WHERE id = ?`).bind(productId).first();

    return c.json({
      success: true,
      data: createdProduct,
    }, 201);
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// PUT /api/products/:id
productRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parseResult = UpdateProductSchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({
        success: false,
        message: 'Payload request tidak valid',
        code: 'INVALID_PAYLOAD',
        errors: parseResult.error.flatten().fieldErrors,
      }, 400);
    }

    const existing = await c.env.DB.prepare(`SELECT id FROM products WHERE id = ?`).bind(id).first();
    if (!existing) {
      return c.json({ success: false, message: 'Product tidak ditemukan', code: 'PRODUCT_NOT_FOUND' }, 404);
    }

    const data = parseResult.data;

    // Check duplicate slug
    if (data.slug) {
      const existingSlug = await c.env.DB.prepare(`SELECT id FROM products WHERE slug = ? AND id != ?`).bind(data.slug, id).first();
      if (existingSlug) {
        return c.json({ success: false, message: 'Slug produk sudah digunakan', code: 'DUPLICATE_SLUG' }, 400);
      }
    }

    // Check duplicate SKU
    if (data.sku) {
      const existingSku = await c.env.DB.prepare(`SELECT id FROM products WHERE sku = ? AND id != ?`).bind(data.sku, id).first();
      if (existingSku) {
        return c.json({ success: false, message: 'SKU produk sudah digunakan', code: 'DUPLICATE_SKU' }, 400);
      }
    }

    await c.env.DB.prepare(`
      UPDATE products SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        sku = COALESCE(?, sku),
        brand_id = COALESCE(?, brand_id),
        category_id = COALESCE(?, category_id),
        description = COALESCE(?, description),
        short_description = COALESCE(?, short_description),
        base_price = COALESCE(?, base_price),
        compare_price = COALESCE(?, compare_price),
        stock = COALESCE(?, stock),
        low_stock_threshold = COALESCE(?, low_stock_threshold),
        status = COALESCE(?, status),
        condition = COALESCE(?, condition),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      data.name || null,
      data.slug || null,
      data.sku || null,
      data.brand_id || null,
      data.category_id || null,
      data.description || null,
      data.short_description || null,
      data.base_price || null,
      data.compare_price || null,
      data.stock !== undefined ? data.stock : null,
      data.low_stock_threshold !== undefined ? data.low_stock_threshold : null,
      data.status || null,
      data.condition || null,
      id
    ).run();

    const updated = await c.env.DB.prepare(`SELECT * FROM products WHERE id = ?`).bind(id).first();

    // Re-sync product_images: delete old, insert new
    if (data.images !== undefined) {
      await c.env.DB.prepare(`DELETE FROM product_images WHERE product_id = ?`).bind(id).run();
      if (data.images.length > 0) {
        for (const img of data.images) {
          const imgId = `img-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
          await c.env.DB.prepare(`
            INSERT INTO product_images (id, product_id, url, alt_text, sort_order, is_primary)
            VALUES (?, ?, ?, ?, ?, ?)
          `).bind(
            imgId,
            id,
            img.url,
            img.alt_text || null,
            img.sort_order,
            img.is_primary ? 1 : 0
          ).run();
        }
      }
    }

    // Re-fetch with images
    const images = await c.env.DB.prepare(`SELECT url, alt_text, sort_order, is_primary FROM product_images WHERE product_id = ? ORDER BY sort_order ASC`).bind(id).all();

    return c.json({
      success: true,
      data: { ...updated, images: images.results || [] },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// DELETE /api/products/:id
productRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const existing = await c.env.DB.prepare(`SELECT id FROM products WHERE id = ?`).bind(id).first();

    if (!existing) {
      return c.json({ success: false, message: 'Product tidak ditemukan', code: 'PRODUCT_NOT_FOUND' }, 404);
    }

    await c.env.DB.prepare(`DELETE FROM products WHERE id = ?`).bind(id).run();

    return c.json({
      success: true,
      message: 'Produk berhasil dihapus',
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});
