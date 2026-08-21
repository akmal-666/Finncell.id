import type { ApiResponse, AdminSession, Permission, UserRole } from '@fincell/shared';
import { fetchApi } from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<ApiResponse<AdminSession>> {
    try {
      const res = await fetchApi<AdminSession>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res;
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal terhubung ke server autentikasi', data: undefined as any };
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      await fetchApi<void>('/auth/logout', { method: 'POST' });
      return { success: true, message: 'Logout berhasil', data: undefined };
    } catch (err: any) {
      return { success: false, message: err.message, data: undefined };
    }
  },

  async getMe(): Promise<ApiResponse<AdminSession>> {
    try {
      const res = await fetchApi<AdminSession>('/auth/me');
      return res;
    } catch (err: any) {
      return { success: false, message: err.message || 'Tidak terautentikasi', data: undefined as any };
    }
  },
};

export function hasPermission(userPermissions: Permission[] = [], required: Permission): boolean {
  return userPermissions.includes(required);
}

export function hasRole(userRole: UserRole | undefined, requiredRoles: UserRole[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}
