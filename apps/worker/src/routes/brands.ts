import { Hono } from 'hono';
import { CreateBrandSchema } from '../validators.js';

type Bindings = {
  DB: D1Database;
};

export const brandRoutes = new Hono<{ Bindings: Bindings }>();

// GET /api/brands
brandRoutes.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT b.*, COUNT(p.id) as product_count
      FROM brands b
      LEFT JOIN products p ON b.id = p.brand_id
      GROUP BY b.id
      ORDER BY b.name ASC
    `).all();

    return c.json({
      success: true,
      data: results || [],
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// POST /api/brands
brandRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const parseResult = CreateBrandSchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({
        success: false,
        message: 'Payload request tidak valid',
        code: 'INVALID_PAYLOAD',
        errors: parseResult.error.flatten().fieldErrors,
      }, 400);
    }

    const data = parseResult.data;
    const existing = await c.env.DB.prepare(`SELECT id FROM brands WHERE slug = ?`).bind(data.slug).first();
    if (existing) {
      return c.json({ success: false, message: 'Slug brand sudah digunakan', code: 'DUPLICATE_SLUG' }, 400);
    }

    const id = `brand-${Date.now()}`;
    await c.env.DB.prepare(`
      INSERT INTO brands (id, name, slug, description, logo_url)
      VALUES (?, ?, ?, ?, ?)
    `).bind(id, data.name, data.slug, data.description || null, data.logo_url || null).run();

    const created = await c.env.DB.prepare(`SELECT * FROM brands WHERE id = ?`).bind(id).first();

    return c.json({
      success: true,
      data: created,
    }, 201);
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});
