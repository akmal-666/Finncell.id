export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'content_manager'
  | 'order_manager'
  | 'seo_manager';

export type Permission =
  | 'product.read'
  | 'product.create'
  | 'product.update'
  | 'product.delete'
  | 'order.read'
  | 'order.update'
  | 'seo.read'
  | 'seo.update'
  | 'content.read'
  | 'content.update'
  | 'user.manage'
  | 'settings.manage';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'product.read', 'product.create', 'product.update', 'product.delete',
    'order.read', 'order.update',
    'seo.read', 'seo.update',
    'content.read', 'content.update',
    'user.manage', 'settings.manage',
  ],
  admin: [
    'product.read', 'product.create', 'product.update', 'product.delete',
    'order.read', 'order.update',
    'seo.read', 'seo.update',
    'content.read', 'content.update',
    'settings.manage',
  ],
  content_manager: [
    'product.read',
    'content.read', 'content.update',
    'seo.read',
  ],
  order_manager: [
    'product.read',
    'order.read', 'order.update',
  ],
  seo_manager: [
    'product.read',
    'seo.read', 'seo.update',
    'content.read',
  ],
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  expiresAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}
