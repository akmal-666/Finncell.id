import type { ApiResponse, MediaItem, MediaPrefix } from '@fincell/shared';
import { fetchApi } from './apiClient';

export interface GetMediaParams {
  prefix?: MediaPrefix | 'all';
  search?: string;
  page?: number;
  limit?: number;
}

export const mediaService = {
  async getMediaList(params?: GetMediaParams): Promise<ApiResponse<MediaItem[]>> {
    try {
      const query = new URLSearchParams();
      if (params?.prefix && params.prefix !== 'all') query.append('prefix', params.prefix);
      if (params?.search) query.append('search', params.search);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());

      const url = `/media${query.toString() ? `?${query.toString()}` : ''}`;
      const res = await fetchApi<MediaItem[]>(url);
      return res;
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal mengambil media', data: [] };
    }
  },

  async uploadMedia(file: File, prefix: MediaPrefix = 'general'): Promise<ApiResponse<MediaItem>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('prefix', prefix);

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

      // Do NOT set Content-Type — browser sets it automatically with correct multipart boundary
      const response = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
        // No Content-Type header — let browser set it with proper boundary
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
        return { success: false, message: (err as any).message || `Upload gagal (${response.status})`, data: undefined as any };
      }

      const json = await response.json();
      return json;
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal mengunggah file', data: undefined as any };
    }
  },

  async deleteMedia(idOrKey: string): Promise<ApiResponse<void>> {
    try {
      const res = await fetchApi<void>(`/media/${encodeURIComponent(idOrKey)}`, {
        method: 'DELETE',
      });
      return res;
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal menghapus file', data: undefined };
    }
  },
};
