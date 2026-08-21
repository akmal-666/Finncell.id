import { Hono } from 'hono';

type Bindings = {
  DB: D1Database;
};

export const blogRoutes = new Hono<{ Bindings: Bindings }>();

// GET /api/blog
blogRoutes.get('/', async (c) => {
  try {
    const { category, search, status } = c.req.query();
    const db = c.env.DB;

    let query = `SELECT * FROM blog_posts WHERE 1=1`;
    const params: any[] = [];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }

    if (category && category !== 'all') {
      query += ` AND (category = ? OR category_id = ?)`;
      params.push(category, category);
    }

    if (search) {
      query += ` AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)`;
      const pattern = `%${search}%`;
      params.push(pattern, pattern, pattern);
    }

    query += ` ORDER BY created_at DESC`;

    const { results } = db ? await db.prepare(query).bind(...params).all() : { results: [] };

    const mapped = (results || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt || '',
      content: row.content || '',
      featuredImage: row.featured_image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      author: row.author || 'Admin fincell.id',
      category: row.category || 'Panduan iPhone',
      status: row.status || 'published',
      publishedAt: row.published_at || row.created_at || new Date().toISOString(),
      readTime: row.read_time || '5 min read',
    }));

    return c.json({ success: true, data: mapped });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal mengambil blog posts' }, 500);
  }
});

// GET /api/blog/:slug
blogRoutes.get('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const db = c.env.DB;

    if (!db) {
      return c.json({ success: false, message: 'DB Unavailable' }, 500);
    }

    const row: any = await db
      .prepare(`SELECT * FROM blog_posts WHERE slug = ? OR id = ?`)
      .bind(slug, slug)
      .first();

    if (!row) {
      return c.json({ success: false, message: 'Artikel blog tidak ditemukan' }, 404);
    }

    const post = {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt || '',
      content: row.content || '',
      featuredImage: row.featured_image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      author: row.author || 'Admin fincell.id',
      category: row.category || 'Panduan iPhone',
      status: row.status || 'published',
      publishedAt: row.published_at || row.created_at || new Date().toISOString(),
      readTime: row.read_time || '5 min read',
    };

    return c.json({ success: true, data: post });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal mengambil detail blog' }, 500);
  }
});

// POST /api/blog
blogRoutes.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const db = c.env.DB;

    const id = `post-${Date.now()}`;
    const now = new Date().toISOString();

    if (db) {
      await db
        .prepare(
          `INSERT INTO blog_posts (
            id, title, slug, excerpt, content, featured_image,
            author, category, status, published_at, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          id,
          body.title,
          body.slug,
          body.excerpt || null,
          body.content || null,
          body.featuredImage || null,
          body.author || 'Admin fincell.id',
          body.category || 'Panduan iPhone',
          body.status || 'draft',
          body.publishedAt || now,
          now,
          now
        )
        .run();
    }

    const created = {
      id,
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || '',
      content: body.content || '',
      featuredImage: body.featuredImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      author: body.author || 'Admin fincell.id',
      category: body.category || 'Panduan iPhone',
      status: body.status || 'draft',
      publishedAt: body.publishedAt || now,
      readTime: '5 min read',
    };

    return c.json({ success: true, message: 'Artikel berhasil disimpan', data: created }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal membuat blog post' }, 500);
  }
});

// PUT /api/blog/:id
blogRoutes.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const db = c.env.DB;

    if (db) {
      await db
        .prepare(
          `UPDATE blog_posts SET
            title = COALESCE(?, title),
            slug = COALESCE(?, slug),
            excerpt = COALESCE(?, excerpt),
            content = COALESCE(?, content),
            featured_image = COALESCE(?, featured_image),
            author = COALESCE(?, author),
            category = COALESCE(?, category),
            status = COALESCE(?, status),
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?`
        )
        .bind(
          body.title || null,
          body.slug || null,
          body.excerpt || null,
          body.content || null,
          body.featuredImage || null,
          body.author || null,
          body.category || null,
          body.status || null,
          id
        )
        .run();
    }

    return c.json({ success: true, message: 'Artikel berhasil diperbarui', data: { id, ...body } });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal memperbarui blog post' }, 500);
  }
});

// DELETE /api/blog/:id
blogRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = c.env.DB;

    if (db) {
      await db.prepare(`DELETE FROM blog_posts WHERE id = ?`).bind(id).run();
    }

    return c.json({ success: true, message: 'Artikel berhasil dihapus' });
  } catch (error: any) {
    return c.json({ success: false, message: error.message || 'Gagal menghapus blog post' }, 500);
  }
});
