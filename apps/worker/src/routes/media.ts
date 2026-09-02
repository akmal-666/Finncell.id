import { Hono } from 'hono';
import { StorageService } from '../services/storageService.js';
import type { MediaPrefix } from '@fincell/shared';

type Bindings = {
  DB: D1Database;
  B2_KEY_ID?: string;
  B2_APPLICATION_KEY?: string;
  B2_BUCKET_NAME?: string;
  PUBLIC_BASE_URL?: string;
};

export const mediaRoutes = new Hono<{ Bindings: Bindings }>();

// ── GET /api/media — List media files (search, prefix filter, pagination) ───

mediaRoutes.get('/', async (c) => {
  try {
    const { prefix, search, page = '1', limit = '30' } = c.req.query();
    const db = c.env.DB;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 30));
    const offset = (pageNum - 1) * limitNum;

    if (!db) {
      // Mock / Dev response
      const mockItems = [
        {
          id: 'med-1',
          filename: 'iphone-15-pro-titanium.jpg',
          fileKey: 'products/iphone-15-pro-titanium.jpg',
          url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
          fileSize: 450000,
          mimeType: 'image/jpeg',
          prefix: 'products',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'med-2',
          filename: 'banner-promo-lebaran.png',
          fileKey: 'banners/banner-promo-lebaran.png',
          url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop',
          fileSize: 1200000,
          mimeType: 'image/png',
          prefix: 'banners',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'med-3',
          filename: 'tradein-guide.webp',
          fileKey: 'trade-in/tradein-guide.webp',
          url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop',
          fileSize: 280000,
          mimeType: 'image/webp',
          prefix: 'trade-in',
          createdAt: new Date().toISOString(),
        },
      ];

      return c.json({
        success: true,
        data: mockItems,
        meta: { total: mockItems.length, page: pageNum, limit: limitNum },
      });
    }

    let sql = `SELECT * FROM media WHERE 1=1`;
    const params: any[] = [];

    if (prefix && prefix !== 'all') {
      sql += ` AND file_key LIKE ?`;
      params.push(`${prefix}/%`);
    }

    if (search) {
      sql += ` AND (filename LIKE ? OR file_key LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    // Count
    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
    const countRes: any = await db.prepare(countSql).bind(...params).first();
    const total = countRes?.total || 0;

    // Fetch list
    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limitNum, offset);
    const { results } = await db.prepare(sql).bind(...params).all();

    const storage = new StorageService(c.env.B2_KEY_ID, c.env.B2_APPLICATION_KEY, c.env.B2_BUCKET_NAME);
    const items = (results || []).map((row: any) => ({
      id: row.id,
      filename: row.filename,
      fileKey: row.file_key || row.file_path,
      url: row.file_path.startsWith('http') ? row.file_path : storage.generatePublicUrl(row.file_key || row.file_path),
      fileSize: row.file_size,
      mimeType: row.mime_type,
      prefix: (row.file_key?.split('/')[0] as MediaPrefix) || 'general',
      createdAt: row.created_at,
    }));

    return c.json({
      success: true,
      data: items,
      meta: { total, page: pageNum, limit: limitNum },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal mengambil daftar media' }, 500);
  }
});

// ── POST /api/media/upload — Upload media via StorageService ────────────────

mediaRoutes.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File | null;
    const prefixInput = (formData.get('prefix') || c.req.query('prefix') || 'general') as MediaPrefix;

    if (!file) {
      return c.json({ success: false, message: 'File tidak ditemukan dalam form upload' }, 400);
    }

    const storage = new StorageService(c.env.B2_KEY_ID, c.env.B2_APPLICATION_KEY, c.env.B2_BUCKET_NAME);

    // Validate size, type, prefix
    const validation = storage.validate(file.size, file.type, prefixInput);
    if (!validation.valid) {
      return c.json({ success: false, message: validation.error }, 400);
    }

    const fileBuffer = await file.arrayBuffer();
    const uploadResult = await storage.upload(fileBuffer, file.name, file.type, prefixInput);

    const mediaId = `med-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Save metadata in D1 table
    if (c.env.DB) {
      await c.env.DB.prepare(`
        INSERT INTO media (id, filename, file_path, file_key, file_size, mime_type, created_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(mediaId, file.name, uploadResult.url, uploadResult.key, uploadResult.size, uploadResult.mimeType).run().catch(() => {});
    }

    return c.json({
      success: true,
      message: 'File berhasil diunggah ke storage Backblaze B2',
      data: {
        id: mediaId,
        filename: file.name,
        key: uploadResult.key,
        url: uploadResult.url,
        size: uploadResult.size,
        mimeType: uploadResult.mimeType,
        prefix: uploadResult.prefix,
      },
    }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal mengunggah file' }, 500);
  }
});

// ── GET /api/media/file/* — Stream file from B2 storage ─────────────────────

mediaRoutes.get('/file/*', async (c) => {
  try {
    const key = c.req.path.replace('/api/media/file/', '');
    const storage = new StorageService(c.env.B2_KEY_ID, c.env.B2_APPLICATION_KEY, c.env.B2_BUCKET_NAME);

    const object = await storage.get(key);
    if (!object) {
      return c.json({ success: false, message: 'File tidak ditemukan di storage B2' }, 404);
    }

    return new Response(object.data, {
      headers: {
        'Content-Type': object.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// ── DELETE /api/media/:id — Delete media item by ID or Key ───────────────────

mediaRoutes.delete('/:id', async (c) => {
  try {
    const idOrKey = c.req.param('id');
    const storage = new StorageService(c.env.B2_KEY_ID, c.env.B2_APPLICATION_KEY, c.env.B2_BUCKET_NAME);
    const db = c.env.DB;

    let keyToDelete = idOrKey;

    if (db) {
      // Find media row first
      const mediaRow: any = await db
        .prepare(`SELECT * FROM media WHERE id = ? OR file_key = ? OR file_path LIKE ?`)
        .bind(idOrKey, idOrKey, `%${idOrKey}`)
        .first();

      if (mediaRow) {
        keyToDelete = mediaRow.file_key || mediaRow.file_path;
        await db.prepare(`DELETE FROM media WHERE id = ?`).bind(mediaRow.id).run();
      }
    }

    await storage.delete(keyToDelete);

    return c.json({
      success: true,
      message: 'File media berhasil dihapus dari Backblaze B2 & basis data',
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal menghapus media' }, 500);
  }
});
