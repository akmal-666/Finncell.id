import { Hono } from 'hono';
import { CreateCategorySchema, UpdateCategorySchema } from '../validators.js';

type Bindings = {
  DB: D1Database;
};

export const categoryRoutes = new Hono<{ Bindings: Bindings }>();

// GET /api/categories
categoryRoutes.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.name ASC
    `).all();

    return c.json({
      success: true,
      data: results || [],
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// POST /api/categories
categoryRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const parseResult = CreateCategorySchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({
        success: false,
        message: 'Payload request tidak valid',
        code: 'INVALID_PAYLOAD',
        errors: parseResult.error.flatten().fieldErrors,
      }, 400);
    }

    const data = parseResult.data;
    const existing = await c.env.DB.prepare(`SELECT id FROM categories WHERE slug = ?`).bind(data.slug).first();
    if (existing) {
      return c.json({ success: false, message: 'Slug kategori sudah digunakan', code: 'DUPLICATE_SLUG' }, 400);
    }

    const id = `cat-${Date.now()}`;
    await c.env.DB.prepare(`
      INSERT INTO categories (id, name, slug, description, icon)
      VALUES (?, ?, ?, ?, ?)
    `).bind(id, data.name, data.slug, data.description || null, data.icon || null).run();

    const created = await c.env.DB.prepare(`SELECT * FROM categories WHERE id = ?`).bind(id).first();

    return c.json({
      success: true,
      data: created,
    }, 201);
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// PUT /api/categories/:id
categoryRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const parseResult = UpdateCategorySchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({
        success: false,
        message: 'Payload request tidak valid',
        code: 'INVALID_PAYLOAD',
        errors: parseResult.error.flatten().fieldErrors,
      }, 400);
    }

    const existing = await c.env.DB.prepare(`SELECT id FROM categories WHERE id = ?`).bind(id).first();
    if (!existing) {
      return c.json({ success: false, message: 'Kategori tidak ditemukan', code: 'CATEGORY_NOT_FOUND' }, 404);
    }

    const data = parseResult.data;
    if (data.slug) {
      const existingSlug = await c.env.DB.prepare(`SELECT id FROM categories WHERE slug = ? AND id != ?`).bind(data.slug, id).first();
      if (existingSlug) {
        return c.json({ success: false, message: 'Slug kategori sudah digunakan', code: 'DUPLICATE_SLUG' }, 400);
      }
    }

    await c.env.DB.prepare(`
      UPDATE categories SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        icon = COALESCE(?, icon),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(data.name || null, data.slug || null, data.description || null, data.icon || null, id).run();

    const updated = await c.env.DB.prepare(`SELECT * FROM categories WHERE id = ?`).bind(id).first();

    return c.json({
      success: true,
      data: updated,
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// DELETE /api/categories/:id
categoryRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const existing = await c.env.DB.prepare(`SELECT id FROM categories WHERE id = ?`).bind(id).first();

    if (!existing) {
      return c.json({ success: false, message: 'Kategori tidak ditemukan', code: 'CATEGORY_NOT_FOUND' }, 404);
    }

    await c.env.DB.prepare(`DELETE FROM categories WHERE id = ?`).bind(id).run();

    return c.json({
      success: true,
      message: 'Kategori berhasil dihapus',
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});
