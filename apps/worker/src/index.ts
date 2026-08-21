import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { productRoutes } from './routes/products.js';
import { categoryRoutes } from './routes/categories.js';
import { brandRoutes } from './routes/brands.js';
import { settingsRoutes } from './routes/settings.js';
import { tradeInRoutes } from './routes/tradein.js';
import { mediaRoutes } from './routes/media.js';
import { blogRoutes } from './routes/blog.js';
import { seoRoutes } from './routes/seo.js';
import { authRoutes } from './routes/auth.js';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS
app.use('*', cors({
  origin: (origin) => origin || '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Health check
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    data: {
      status: 'ok',
      service: 'fincell-worker-api',
      timestamp: new Date().toISOString(),
    },
  });
});

// Mount Routes
app.route('/api/products', productRoutes);
app.route('/api/categories', categoryRoutes);
app.route('/api/brands', brandRoutes);
app.route('/api/settings', settingsRoutes);
app.route('/api/trade-in', tradeInRoutes);
app.route('/api/media', mediaRoutes);
app.route('/api/blog', blogRoutes);
app.route('/api/seo', seoRoutes);
app.route('/api/auth', authRoutes);

// 404 Handler
app.notFound((c) => {
  return c.json({
    success: false,
    message: 'Endpoint API tidak ditemukan',
    code: 'NOT_FOUND',
  }, 404);
});

// 500 Global Error Handler
app.onError((err, c) => {
  console.error('[Hono Error]', err);
  return c.json({
    success: false,
    message: err.message || 'Terjadi kesalahan pada server worker',
    code: 'INTERNAL_SERVER_ERROR',
  }, 500);
});

export default app;
