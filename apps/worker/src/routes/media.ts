import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
  B2_BUCKET?: any;
};

export const mediaRoutes = new Hono<{ Bindings: Bindings }>();

// POST /api/media/upload
mediaRoutes.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return c.json({ success: false, message: 'File tidak ditemukan dalam request' }, 400);
    }

    const key = `b2-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // If R2/B2 bucket binding exists on Cloudflare Worker
    if (c.env.B2_BUCKET) {
      const buffer = await file.arrayBuffer();
      await c.env.B2_BUCKET.put(key, buffer, {
        httpMetadata: { contentType: file.type },
      });
    }

    // Insert into media D1 table if DB is available
    if (c.env.DB) {
      const mediaId = `med-${Date.now()}`;
      await c.env.DB.prepare(`
        INSERT INTO media (id, filename, file_path, file_size, mime_type, created_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(mediaId, file.name, `/media/${key}`, file.size, file.type).run().catch(() => {});
    }

    return c.json({
      success: true,
      message: 'File berhasil diunggah ke storage Backblaze B2',
      data: {
        url: `https://fincell.id/media/${key}`,
        key,
        size: file.size,
      },
    }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal mengunggah file' }, 500);
  }
});

// DELETE /api/media/:key
mediaRoutes.delete('/:key', async (c) => {
  try {
    const key = c.req.param('key');
    if (c.env.B2_BUCKET) {
      await c.env.B2_BUCKET.delete(key);
    }
    return c.json({ success: true, message: 'File berhasil dihapus dari B2' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal menghapus file' }, 500);
  }
});
