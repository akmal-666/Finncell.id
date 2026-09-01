import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

export const seoRoutes = new Hono<{ Bindings: Bindings }>();

// ─── GLOBAL SEO SETTINGS ──────────────────────────────────────────────────────

// GET /api/seo/settings
seoRoutes.get('/settings', async (c) => {
  try {
    const db = c.env.DB;
    if (!db) return c.json({ success: false, message: 'DB unavailable' }, 500);

    const { results } = await db.prepare(`SELECT key, value FROM settings WHERE key LIKE 'seo_%'`).all();
    const map: Record<string, string> = {};
    for (const row of (results || []) as any[]) {
      map[row.key] = row.value;
    }

    const data = {
      websiteName: map['seo_website_name'] || 'fincell.id',
      defaultTitle: map['seo_default_title'] || 'fincell.id — Toko iPhone & Apple Ecosystem Garansi Resmi',
      defaultDescription: map['seo_default_description'] || 'Beli iPhone 15, 14, 13 series bergaransi resmi Apple Indonesia. Nikmati promo & layanan Trade-in instan.',
      defaultOgImage: map['seo_default_og_image'] || 'https://fincell.id/og-image.jpg',
      googleSearchConsoleToken: map['seo_gsc_token'] || '',
      googleAnalyticsId: map['seo_ga_id'] || '',
      titleSeparator: map['seo_title_separator'] || '—',
    };

    return c.json({ success: true, data });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// PUT /api/seo/settings
seoRoutes.put('/settings', async (c) => {
  try {
    const body = await c.req.json();
    const db = c.env.DB;

    const map: Record<string, string> = {
      seo_website_name: body.websiteName || 'fincell.id',
      seo_default_title: body.defaultTitle || '',
      seo_default_description: body.defaultDescription || '',
      seo_default_og_image: body.defaultOgImage || '',
      seo_gsc_token: body.googleSearchConsoleToken || '',
      seo_ga_id: body.googleAnalyticsId || '',
      seo_title_separator: body.titleSeparator || '—',
    };

    if (db) {
      for (const [key, value] of Object.entries(map)) {
        await db.prepare(`
          INSERT INTO settings (key, value, updated_at)
          VALUES (?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
        `).bind(key, value).run();
      }
    }

    return c.json({ success: true, message: 'Global SEO settings disimpan', data: body });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ─── PER-ENTITY SEO METADATA ─────────────────────────────────────────────────

// GET /api/seo/metadata
seoRoutes.get('/metadata', async (c) => {
  try {
    const db = c.env.DB;
    const { entityType } = c.req.query();

    let query = `SELECT * FROM seo_metadata WHERE 1=1`;
    const params: any[] = [];

    if (entityType) {
      query += ` AND entity_type = ?`;
      params.push(entityType);
    }

    query += ` ORDER BY updated_at DESC`;

    const { results } = db ? await db.prepare(query).bind(...params).all() : { results: [] };

    const data = (results || []).map((r: any) => ({
      id: r.id,
      entityType: r.entity_type,
      entityId: r.entity_id,
      seoTitle: r.seo_title,
      metaDescription: r.meta_description,
      canonicalUrl: r.canonical_url,
      ogTitle: r.og_title,
      ogDescription: r.og_description,
      ogImage: r.og_image,
      indexDirective: r.index_directive || 'index',
      followDirective: r.follow_directive || 'follow',
      schemaType: r.schema_type,
      updatedAt: r.updated_at,
    }));

    return c.json({ success: true, data });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// GET /api/seo/metadata/:entityType/:entityId
seoRoutes.get('/metadata/:entityType/:entityId', async (c) => {
  try {
    const db = c.env.DB;
    const { entityType, entityId } = c.req.param();

    const row: any = db
      ? await db.prepare(`SELECT * FROM seo_metadata WHERE entity_type = ? AND entity_id = ?`).bind(entityType, entityId).first()
      : null;

    if (!row) {
      return c.json({ success: true, data: null });
    }

    return c.json({
      success: true,
      data: {
        id: row.id,
        entityType: row.entity_type,
        entityId: row.entity_id,
        seoTitle: row.seo_title,
        metaDescription: row.meta_description,
        canonicalUrl: row.canonical_url,
        ogTitle: row.og_title,
        ogDescription: row.og_description,
        ogImage: row.og_image,
        indexDirective: row.index_directive || 'index',
        followDirective: row.follow_directive || 'follow',
        schemaType: row.schema_type,
        updatedAt: row.updated_at,
      },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// PUT /api/seo/metadata/:entityType/:entityId
seoRoutes.put('/metadata/:entityType/:entityId', async (c) => {
  try {
    const db = c.env.DB;
    const { entityType, entityId } = c.req.param();
    const body = await c.req.json();
    const id = `seo-${entityType}-${entityId}`.replace(/[^a-z0-9-]/g, '-');

    if (db) {
      await db.prepare(`
        INSERT INTO seo_metadata (
          id, entity_type, entity_id, seo_title, meta_description, canonical_url,
          og_title, og_description, og_image,
          index_directive, follow_directive, schema_type, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          seo_title = excluded.seo_title,
          meta_description = excluded.meta_description,
          canonical_url = excluded.canonical_url,
          og_title = excluded.og_title,
          og_description = excluded.og_description,
          og_image = excluded.og_image,
          index_directive = excluded.index_directive,
          follow_directive = excluded.follow_directive,
          schema_type = excluded.schema_type,
          updated_at = CURRENT_TIMESTAMP
      `).bind(
        id, entityType, entityId,
        body.seoTitle || null,
        body.metaDescription || null,
        body.canonicalUrl || null,
        body.ogTitle || null,
        body.ogDescription || null,
        body.ogImage || null,
        body.indexDirective || 'index',
        body.followDirective || 'follow',
        body.schemaType || null,
      ).run();
    }

    return c.json({ success: true, message: 'SEO metadata disimpan', data: { id, entityType, entityId, ...body } });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ─── REDIRECTS ───────────────────────────────────────────────────────────────

// GET /api/seo/redirects
seoRoutes.get('/redirects', async (c) => {
  try {
    const db = c.env.DB;
    const { results } = db ? await db.prepare(`SELECT * FROM redirects ORDER BY created_at DESC`).all() : { results: [] };

    const data = (results || []).map((r: any) => ({
      id: r.id,
      source: r.source,
      target: r.target,
      type: r.type || '301',
      isActive: Boolean(r.is_active ?? 1),
      createdAt: r.created_at,
    }));

    return c.json({ success: true, data });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// POST /api/seo/redirects
seoRoutes.post('/redirects', async (c) => {
  try {
    const db = c.env.DB;
    const body = await c.req.json();

    if (!body.source || !body.target) {
      return c.json({ success: false, message: 'source & target wajib diisi', code: 'INVALID_PAYLOAD' }, 400);
    }

    const id = `redir-${Date.now()}`;
    const now = new Date().toISOString();

    if (db) {
      await db.prepare(`
        INSERT INTO redirects (id, source, target, type, is_active, created_at)
        VALUES (?, ?, ?, ?, 1, ?)
      `).bind(id, body.source, body.target, body.type || '301', now).run();
    }

    return c.json({ success: true, message: 'Redirect berhasil dibuat', data: { id, ...body, isActive: true, createdAt: now } }, 201);
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// DELETE /api/seo/redirects/:id
seoRoutes.delete('/redirects/:id', async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param('id');

    if (db) {
      await db.prepare(`DELETE FROM redirects WHERE id = ?`).bind(id).run();
    }

    return c.json({ success: true, message: 'Redirect dihapus' });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ─── SITEMAP.XML ─────────────────────────────────────────────────────────────

// GET /api/seo/sitemap
seoRoutes.get('/sitemap', async (c) => {
  try {
    const db = c.env.DB;
    const baseUrl = 'https://vincellid.id';

    const staticPages = [
      { url: baseUrl, changefreq: 'daily', priority: '1.0' },
      { url: `${baseUrl}/produk`, changefreq: 'daily', priority: '0.9' },
      { url: `${baseUrl}/blog`, changefreq: 'weekly', priority: '0.8' },
      { url: `${baseUrl}/trade-in`, changefreq: 'monthly', priority: '0.7' },
      { url: `${baseUrl}/tentang-kami`, changefreq: 'monthly', priority: '0.5' },
      { url: `${baseUrl}/hubungi-kami`, changefreq: 'monthly', priority: '0.5' },
      { url: `${baseUrl}/jual-beli-iphone-depok`, changefreq: 'monthly', priority: '0.8' },
    ];

    let products: any[] = [];
    let categories: any[] = [];
    let blogPosts: any[] = [];

    if (db) {
      const pr = await db.prepare(`SELECT slug, updated_at FROM products WHERE status = 'active'`).all();
      products = (pr.results || []) as any[];

      const cr = await db.prepare(`SELECT slug FROM categories`).all();
      categories = (cr.results || []) as any[];

      const br = await db.prepare(`SELECT slug, updated_at FROM blog_posts WHERE status = 'published'`).all();
      blogPosts = (br.results || []) as any[];
    }

    const now = new Date().toISOString().split('T')[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    <lastmod>${now}</lastmod>
  </url>`).join('\n')}
${products.map((p: any) => `  <url>
    <loc>${baseUrl}/produk/${p.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${(p.updated_at || now).split('T')[0]}</lastmod>
  </url>`).join('\n')}
${categories.map((c: any) => `  <url>
    <loc>${baseUrl}/kategori/${c.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${now}</lastmod>
  </url>`).join('\n')}
${blogPosts.map((b: any) => `  <url>
    <loc>${baseUrl}/blog/${b.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <lastmod>${(b.updated_at || now).split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ─── ROBOTS.TXT ──────────────────────────────────────────────────────────────

// GET /api/seo/robots
seoRoutes.get('/robots', async (c) => {
  try {
    const db = c.env.DB;
    let customRobots = '';

    if (db) {
      const row: any = await db.prepare(`SELECT value FROM settings WHERE key = 'seo_robots_txt'`).first();
      if (row?.value) customRobots = row.value;
    }

    const robots = customRobots || `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://vincellid.id/sitemap.xml`;

    return new Response(robots, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// PUT /api/seo/robots
seoRoutes.put('/robots', async (c) => {
  try {
    const db = c.env.DB;
    const body = await c.req.json();

    if (db) {
      await db.prepare(`
        INSERT INTO settings (key, value, updated_at)
        VALUES ('seo_robots_txt', ?, CURRENT_TIMESTAMP)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
      `).bind(body.content || '').run();
    }

    return c.json({ success: true, message: 'robots.txt diperbarui' });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ─── STATS (mock / GSC integration ready) ────────────────────────────────────
seoRoutes.get('/stats', async (c) => {
  try {
    const db = c.env.DB;
    let indexed = 0;

    if (db) {
      const r: any = await db.prepare(`SELECT COUNT(*) as total FROM products WHERE status = 'active'`).first();
      indexed = (r?.total || 0) + 8; // products + static pages
    }

    return c.json({
      success: true,
      data: {
        indexedPages: indexed,
        clicks: 0,
        impressions: 0,
        averageCtr: 0,
      },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});
