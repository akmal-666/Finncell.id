import { ApiResponse } from '@fincell/shared';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan pada server');
    }
    return data;
  } catch (error: any) {
    console.warn(`[apiClient] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
}
