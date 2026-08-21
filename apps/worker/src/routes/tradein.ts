import { Hono } from 'hono';
import { z } from 'zod';

type Bindings = {
  DB: D1Database;
};

export const tradeInRoutes = new Hono<{ Bindings: Bindings }>();

// Zod schema for input validation
const tradeInSchema = z.object({
  customerName: z.string().min(2, 'Nama minimal 2 karakter'),
  customerPhone: z.string().min(8, 'Nomor HP minimal 8 karakter'),
  customerEmail: z.string().email().optional().or(z.literal('')),
  deviceModel: z.string().min(1, 'Model perangkat wajib diisi'),
  storage: z.string().min(1, 'Kapasitas storage wajib diisi'),
  color: z.string().optional(),
  condition: z.string().optional(),
  kelengkapan: z.string().optional(),
  batteryHealth: z.number().optional(),
  estimatedValue: z.number().positive('Estimasi harga harus bernilai positif'),
  notes: z.string().optional(),
});

// GET /api/trade-in
tradeInRoutes.get('/', async (c) => {
  try {
    const db = c.env.DB;
    if (!db) throw new Error('Database D1 unavailable');

    const { results } = await db
      .prepare(`SELECT * FROM trade_in_requests ORDER BY created_at DESC`)
      .all();

    const mapped = (results || []).map((row: any) => ({
      id: row.id,
      customerName: row.customer_name,
      customerPhone: row.customer_phone,
      customerEmail: row.customer_email,
      deviceModel: row.device_model,
      storage: row.storage,
      color: row.color,
      condition: row.condition,
      kelengkapan: row.kelengkapan,
      batteryHealth: row.battery_health,
      estimatedValue: row.estimated_value,
      status: row.status || 'new',
      notes: row.notes,
      createdAt: row.created_at,
    }));

    return c.json({ success: true, data: mapped });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal mengambil data trade in' }, 500);
  }
});

// POST /api/trade-in
tradeInRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validated = tradeInSchema.parse(body);
    const db = c.env.DB;

    const id = `trd-${Date.now()}`;
    const now = new Date().toISOString();

    if (db) {
      await db
        .prepare(
          `INSERT INTO trade_in_requests (
            id, customer_name, customer_phone, customer_email,
            device_model, storage, condition, battery_health,
            estimated_value, status, notes, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          id,
          validated.customerName,
          validated.customerPhone,
          validated.customerEmail || null,
          validated.deviceModel,
          validated.storage,
          validated.condition || 'Bagus',
          validated.batteryHealth || 90,
          validated.estimatedValue,
          'new',
          validated.notes || null,
          now
        )
        .run();
    }

    const created = {
      id,
      customerName: validated.customerName,
      customerPhone: validated.customerPhone,
      customerEmail: validated.customerEmail,
      deviceModel: validated.deviceModel,
      storage: validated.storage,
      color: validated.color || 'Natural Titanium',
      condition: validated.condition || 'Bagus',
      kelengkapan: validated.kelengkapan || 'Fullset',
      batteryHealth: validated.batteryHealth || 90,
      estimatedValue: validated.estimatedValue,
      status: 'new',
      notes: validated.notes,
      createdAt: now,
    };

    return c.json({ success: true, message: 'Pengajuan Trade-In berhasil dikirim', data: created }, 201);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return c.json({ success: false, message: 'Data tidak valid', errors: error.errors }, 400);
    }
    return c.json({ success: false, message: error.message || 'Gagal menyimpan pengajuan' }, 500);
  }
});

// PUT /api/trade-in/:id
tradeInRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status, notes } = body;
    const db = c.env.DB;

    if (db) {
      await db
        .prepare(`UPDATE trade_in_requests SET status = ?, notes = ? WHERE id = ?`)
        .bind(status, notes || null, id)
        .run();
    }

    return c.json({
      success: true,
      message: 'Status Trade In berhasil diperbarui',
      data: { id, status, notes },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal memperbarui status' }, 500);
  }
});

// DELETE /api/trade-in/:id
tradeInRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = c.env.DB;

    if (db) {
      await db.prepare(`DELETE FROM trade_in_requests WHERE id = ?`).bind(id).run();
    }

    return c.json({ success: true, message: 'Pengajuan Trade In berhasil dihapus' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal menghapus data' }, 500);
  }
});
