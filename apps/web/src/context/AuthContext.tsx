import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AdminSession, Permission, UserRole } from '@fincell/shared';
import { authService, hasPermission } from '../services/authService';

interface AuthContextType {
  session: AdminSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkPermission: (permission: Permission) => boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    authService
      .getMe()
      .then((res) => {
        if (res.success && res.data) {
          setSession(res.data);
        } else {
          setSession(null);
        }
      })
      .catch(() => setSession(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    if (res.success && res.data) {
      setSession(res.data);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || 'Login gagal' };
  };

  const logout = async () => {
    await authService.logout();
    setSession(null);
  };

  const checkPermission = (permission: Permission): boolean => {
    if (!session) return false;
    return hasPermission(session.permissions, permission);
  };

  const checkRole = (roles: UserRole[]): boolean => {
    if (!session) return false;
    return roles.includes(session.role);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: Boolean(session),
        isLoading,
        login,
        logout,
        checkPermission,
        hasRole: checkRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
