import { Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { ROLE_PERMISSIONS } from '@fincell/shared';
import type { UserRole, Permission } from '@fincell/shared';

type Bindings = {
  DB: D1Database;
};

export const authRoutes = new Hono<{ Bindings: Bindings }>();

// ── Crypto helpers (Web Crypto API — available in CF Workers) ──────────────────

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  // Salt with a fixed prefix + password for deterministic hashing in D1
  const data = encoder.encode(`fincell2024:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function generateSessionToken(): Promise<string> {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function logActivity(db: D1Database, userId: string, userName: string, action: string, entity: string, entityId: string, details: string, ip: string) {
  try {
    const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await db.prepare(`
      INSERT INTO activity_logs (id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(id, userId, userName, action, entity, entityId, details, ip).run();
  } catch {
    // Non-blocking — log failure should not break the request
  }
}

// ── POST /api/auth/login ─────────────────────────────────────────────────────

authRoutes.post('/login', async (c) => {
  try {
    const db = c.env.DB;
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ success: false, message: 'Email dan kata sandi wajib diisi', code: 'INVALID_PAYLOAD' }, 400);
    }

    if (!db) {
      // Dev fallback — accept seeded admin credentials
      if (email === 'admin@fincell.id' && password === 'admin123') {
        const token = await generateSessionToken();
        const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

        setCookie(c, 'fincell_session', token, {
          httpOnly: true,
          secure: false, // set true in production
          sameSite: 'Strict',
          path: '/',
          maxAge: 8 * 60 * 60,
        });

        return c.json({
          success: true,
          message: 'Login berhasil',
          data: {
            userId: 'user-dev-001',
            email,
            name: 'Super Admin Dev',
            role: 'super_admin' as UserRole,
            permissions: ROLE_PERMISSIONS['super_admin'],
            expiresAt: expires,
          },
        });
      }
      return c.json({ success: false, message: 'Email atau kata sandi salah', code: 'INVALID_CREDENTIALS' }, 401);
    }

    // DB: find user by email
    const hashed = await hashPassword(password);
    const user: any = await db
      .prepare(`SELECT * FROM users WHERE email = ? AND is_active = 1`)
      .bind(email.toLowerCase().trim())
      .first();

    if (!user || user.password_hash !== hashed) {
      const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
      if (user) await logActivity(db, user.id, user.name, 'LOGIN_FAILED', 'auth', user.id, 'Wrong password', ip);
      return c.json({ success: false, message: 'Email atau kata sandi salah', code: 'INVALID_CREDENTIALS' }, 401);
    }

    const role = user.role as UserRole;
    const permissions = ROLE_PERMISSIONS[role] || [];
    const token = await generateSessionToken();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';

    // Store session in D1
    const sessionId = `sess-${Date.now()}`;
    await db.prepare(`
      INSERT INTO sessions (id, user_id, token, ip_address, expires_at, created_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(sessionId, user.id, token, ip, expiresAt).run();

    // Update last_login_at
    await db.prepare(`UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?`).bind(user.id).run();

    // Set HTTP-only session cookie
    setCookie(c, 'fincell_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 8 * 60 * 60,
    });

    await logActivity(db, user.id, user.name, 'LOGIN_SUCCESS', 'auth', user.id, `Login dari IP ${ip}`, ip);

    return c.json({
      success: true,
      message: 'Login berhasil',
      data: {
        userId: user.id,
        email: user.email,
        name: user.name,
        role,
        permissions,
        expiresAt,
      },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message, code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────────

authRoutes.post('/logout', async (c) => {
  try {
    const db = c.env.DB;
    const token = getCookie(c, 'fincell_session');

    if (db && token) {
      await db.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
    }

    deleteCookie(c, 'fincell_session', { path: '/' });

    return c.json({ success: true, message: 'Logout berhasil' });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────────────────────

authRoutes.get('/me', async (c) => {
  try {
    const db = c.env.DB;
    const token = getCookie(c, 'fincell_session');

    if (!token) {
      return c.json({ success: false, message: 'Sesi tidak ditemukan', code: 'UNAUTHORIZED' }, 401);
    }

    if (!db) {
      // Dev fallback — trust the cookie presence
      if (token) {
        return c.json({
          success: true,
          data: {
            userId: 'user-dev-001',
            email: 'admin@fincell.id',
            name: 'Super Admin Dev',
            role: 'super_admin' as UserRole,
            permissions: ROLE_PERMISSIONS['super_admin'],
            expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          },
        });
      }
      return c.json({ success: false, message: 'Unauthorized', code: 'UNAUTHORIZED' }, 401);
    }

    const session: any = await db
      .prepare(`SELECT s.*, u.name, u.email, u.role, u.is_active FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = ?`)
      .bind(token)
      .first();

    if (!session) {
      deleteCookie(c, 'fincell_session', { path: '/' });
      return c.json({ success: false, message: 'Sesi tidak valid atau telah berakhir', code: 'UNAUTHORIZED' }, 401);
    }

    if (new Date(session.expires_at) < new Date()) {
      await db.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
      deleteCookie(c, 'fincell_session', { path: '/' });
      return c.json({ success: false, message: 'Sesi telah berakhir. Silakan login kembali', code: 'SESSION_EXPIRED' }, 401);
    }

    if (!session.is_active) {
      return c.json({ success: false, message: 'Akun dinonaktifkan', code: 'ACCOUNT_DISABLED' }, 403);
    }

    const role = session.role as UserRole;
    return c.json({
      success: true,
      data: {
        userId: session.user_id,
        email: session.email,
        name: session.name,
        role,
        permissions: ROLE_PERMISSIONS[role] || [],
        expiresAt: session.expires_at,
      },
    });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ── POST /api/auth/seed (dev only — seed default super_admin) ─────────────────

authRoutes.post('/seed', async (c) => {
  try {
    const db = c.env.DB;
    if (!db) return c.json({ success: false, message: 'DB unavailable' }, 500);

    const hashed = await hashPassword('admin123');
    const id = 'user-super-001';

    await db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET password_hash = excluded.password_hash
    `).bind(id, 'Super Admin', 'admin@fincell.id', hashed, 'super_admin').run();

    return c.json({ success: true, message: 'Default admin seeded', data: { email: 'admin@fincell.id', password: 'admin123' } });
  } catch (err: any) {
    return c.json({ success: false, message: err.message }, 500);
  }
});
