import { Hono } from 'hono';
import { UpdateSettingsSchema } from '../validators.js';

type Bindings = {
  DB: D1Database;
};

export const settingsRoutes = new Hono<{ Bindings: Bindings }>();

// GET /api/settings
settingsRoutes.get('/', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`SELECT key, value FROM settings`).all();
    const settingsMap: Record<string, string> = {};

    if (results) {
      for (const row of results as any[]) {
        settingsMap[row.key] = row.value;
      }
    }

    return c.json({
      success: true,
      data: settingsMap,
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// PUT /api/settings
settingsRoutes.put('/', async (c) => {
  try {
    const body = await c.req.json();
    const parseResult = UpdateSettingsSchema.safeParse(body);

    if (!parseResult.success) {
      return c.json({
        success: false,
        message: 'Payload request tidak valid',
        code: 'INVALID_PAYLOAD',
        errors: parseResult.error.flatten().fieldErrors,
      }, 400);
    }

    const data = parseResult.data;

    for (const [key, value] of Object.entries(data)) {
      await c.env.DB.prepare(`
        INSERT INTO settings (key, value, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
      `).bind(key, value).run();
    }

    const { results } = await c.env.DB.prepare(`SELECT key, value FROM settings`).all();
    const updatedMap: Record<string, string> = {};
    if (results) {
      for (const row of results as any[]) {
        updatedMap[row.key] = row.value;
      }
    }

    return c.json({
      success: true,
      data: updatedMap,
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});
