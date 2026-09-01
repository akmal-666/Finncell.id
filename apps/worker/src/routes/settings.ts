import { Hono } from 'hono';
import { UpdateSettingsSchema } from '../validators.js';

type Bindings = {
  DB: D1Database;
};

export const settingsRoutes = new Hono<{ Bindings: Bindings }>();

// GET /api/settings
settingsRoutes.get('/', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({
        success: true,
        data: {
          store_name: 'VINCELL.ID',
          store_phone: '0899-0033-684',
          whatsapp_number: '628990033684',
          contact_email: 'info@vincellid.id',
          store_address: "Jl. Masjid Jami' Al-Huda No.2a, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16424",
          store_city: 'Depok',
          store_district: 'Beji',
          store_postal_code: '16424',
          google_maps_url: 'https://maps.app.goo.gl/vincellid',
          google_business_profile_url: 'https://g.page/vincellid',
          google_rating: '4.9',
          google_review_count: '169',
          google_review_url: 'https://g.page/r/vincellid/review',
          operating_hours: 'Senin - Minggu: 09:00 - 21:00 WIB',
        },
      });
    }

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
