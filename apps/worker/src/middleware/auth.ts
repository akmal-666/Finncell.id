import { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';
import { ROLE_PERMISSIONS } from '@fincell/shared';
import type { Permission, UserRole } from '@fincell/shared';

type Bindings = {
  DB: D1Database;
};

type Variables = {
  currentUser: {
    userId: string;
    email: string;
    name: string;
    role: UserRole;
    permissions: Permission[];
  };
};

export type AuthEnv = { Bindings: Bindings; Variables: Variables };

/**
 * requireAuth — validates the session cookie against D1 sessions table.
 * Attaches current user info to c.var.currentUser.
 * Falls back to dev mode when no DB is available.
 */
export const requireAuth = (): MiddlewareHandler<AuthEnv> => async (c, next) => {
  const db = c.env.DB;
  const token = getCookie(c, 'fincell_session');

  if (!token) {
    return c.json({ success: false, message: 'Autentikasi diperlukan', code: 'UNAUTHORIZED' }, 401);
  }

  // Dev mode — no DB
  if (!db) {
    c.set('currentUser', {
      userId: 'user-dev-001',
      email: 'admin@fincell.id',
      name: 'Super Admin Dev',
      role: 'super_admin',
      permissions: ROLE_PERMISSIONS['super_admin'],
    });
    return next();
  }

  try {
    const session: any = await db
      .prepare(`
        SELECT s.token, s.expires_at, u.id as user_id, u.name, u.email, u.role, u.is_active
        FROM sessions s
        JOIN users u ON s.user_id = u.id
        WHERE s.token = ?
      `)
      .bind(token)
      .first();

    if (!session) {
      return c.json({ success: false, message: 'Sesi tidak valid atau telah berakhir', code: 'UNAUTHORIZED' }, 401);
    }

    if (new Date(session.expires_at) < new Date()) {
      await db.prepare(`DELETE FROM sessions WHERE token = ?`).bind(token).run();
      return c.json({ success: false, message: 'Sesi telah berakhir. Silakan login kembali', code: 'SESSION_EXPIRED' }, 401);
    }

    if (!session.is_active) {
      return c.json({ success: false, message: 'Akun telah dinonaktifkan', code: 'ACCOUNT_DISABLED' }, 403);
    }

    const role = session.role as UserRole;
    const permissions = ROLE_PERMISSIONS[role] || [];

    c.set('currentUser', {
      userId: session.user_id,
      email: session.email,
      name: session.name,
      role,
      permissions,
    });

    return next();
  } catch (err: any) {
    return c.json({ success: false, message: 'Gagal memvalidasi sesi', code: 'INTERNAL_SERVER_ERROR' }, 500);
  }
};

/**
 * requirePermission — checks that the current user has the required permission.
 * Must be used AFTER requireAuth middleware.
 */
export const requirePermission = (permission: Permission): MiddlewareHandler<AuthEnv> => async (c, next) => {
  const user = c.get('currentUser');

  if (!user) {
    return c.json({ success: false, message: 'Autentikasi diperlukan', code: 'UNAUTHORIZED' }, 401);
  }

  if (!user.permissions.includes(permission)) {
    return c.json({
      success: false,
      message: `Akses ditolak. Diperlukan izin: ${permission}`,
      code: 'FORBIDDEN',
    }, 403);
  }

  return next();
};

/**
 * logActivity — non-blocking DB write for audit trail.
 */
export async function logActivity(
  db: D1Database,
  userId: string,
  userName: string,
  action: string,
  entity: string,
  entityId: string,
  details: string,
  ip: string,
): Promise<void> {
  try {
    const id = `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await db.prepare(`
      INSERT INTO activity_logs (id, user_id, user_name, action, entity, entity_id, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(id, userId, userName, action, entity, entityId, details, ip).run();
  } catch {
    // Non-blocking
  }
}
