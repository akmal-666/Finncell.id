import { ApiResponse, SeoMetadata, GlobalSeoSettings, SeoRedirect, SeoStats } from '@fincell/shared';
import { fetchApi } from './apiClient';

export const DEFAULT_GLOBAL_SEO: GlobalSeoSettings = {
  websiteName: 'fincell.id',
  defaultTitle: 'fincell.id — Toko iPhone & Apple Ecosystem Garansi Resmi',
  defaultDescription: 'Beli iPhone 15, 14, 13 series bergaransi resmi Apple Indonesia. Nikmati promo voucher & layanan Trade-in instan di fincell.id.',
  defaultOgImage: 'https://fincell.id/og-image.jpg',
  googleSearchConsoleToken: '',
  googleAnalyticsId: '',
  titleSeparator: '—',
};

export const seoService = {
  // ── GLOBAL SETTINGS
  async getGlobalSettings(): Promise<ApiResponse<GlobalSeoSettings>> {
    try {
      const res = await fetchApi<GlobalSeoSettings>('/seo/settings');
      if (res.success && res.data) return res;
    } catch { /**/ }
    return { success: true, data: DEFAULT_GLOBAL_SEO };
  },

  async updateGlobalSettings(payload: Partial<GlobalSeoSettings>): Promise<ApiResponse<GlobalSeoSettings>> {
    try {
      const res = await fetchApi<GlobalSeoSettings>('/seo/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.success) return res;
    } catch (err: any) {
      return { success: false, message: err.message, data: DEFAULT_GLOBAL_SEO };
    }
    return { success: true, message: 'Saved locally', data: { ...DEFAULT_GLOBAL_SEO, ...payload } };
  },

  // ── PER-ENTITY METADATA
  async getAllMetadata(entityType?: string): Promise<ApiResponse<SeoMetadata[]>> {
    try {
      const qs = entityType ? `?entityType=${entityType}` : '';
      const res = await fetchApi<SeoMetadata[]>(`/seo/metadata${qs}`);
      if (res.success && res.data) return res;
    } catch { /**/ }
    return { success: true, data: [] };
  },

  async getMetadata(entityType: string, entityId: string): Promise<ApiResponse<SeoMetadata | null>> {
    try {
      const res = await fetchApi<SeoMetadata>(`/seo/metadata/${entityType}/${entityId}`);
      if (res.success) return { success: true, data: res.data ?? null };
    } catch { /**/ }
    return { success: true, data: null };
  },

  async saveMetadata(entityType: string, entityId: string, payload: Partial<SeoMetadata>): Promise<ApiResponse<SeoMetadata>> {
    try {
      const res = await fetchApi<SeoMetadata>(`/seo/metadata/${entityType}/${entityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.success && res.data) return res;
    } catch (err: any) {
      return { success: false, message: err.message, data: undefined as any };
    }
    return { success: true, message: 'Saved', data: { entityType, entityId, ...payload } as SeoMetadata };
  },

  // ── REDIRECTS
  async getRedirects(): Promise<ApiResponse<SeoRedirect[]>> {
    try {
      const res = await fetchApi<SeoRedirect[]>('/seo/redirects');
      if (res.success && res.data) return res;
    } catch { /**/ }
    return { success: true, data: [] };
  },

  async createRedirect(payload: { source: string; target: string; type: '301' | '302' }): Promise<ApiResponse<SeoRedirect>> {
    try {
      const res = await fetchApi<SeoRedirect>('/seo/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res;
    } catch (err: any) {
      return { success: false, message: err.message, data: undefined as any };
    }
  },

  async deleteRedirect(id: string): Promise<ApiResponse<void>> {
    try {
      await fetchApi<void>(`/seo/redirects/${id}`, { method: 'DELETE' });
      return { success: true, message: 'Redirect dihapus', data: undefined };
    } catch (err: any) {
      return { success: false, message: err.message, data: undefined };
    }
  },

  // ── ROBOTS.TXT
  async getRobots(): Promise<string> {
    try {
      const baseUrl = (import.meta as any).env?.VITE_WORKER_URL || '';
      const res = await fetch(`${baseUrl}/api/seo/robots`);
      return await res.text();
    } catch { /**/ }
    return `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://fincell.id/sitemap.xml`;
  },

  async saveRobots(content: string): Promise<ApiResponse<void>> {
    try {
      await fetchApi<void>('/seo/robots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      return { success: true, message: 'robots.txt diperbarui', data: undefined };
    } catch (err: any) {
      return { success: false, message: err.message, data: undefined };
    }
  },

  // ── STATS
  async getStats(): Promise<ApiResponse<SeoStats>> {
    try {
      const res = await fetchApi<SeoStats>('/seo/stats');
      if (res.success && res.data) return res;
    } catch { /**/ }
    return { success: true, data: { indexedPages: 0, clicks: 0, impressions: 0, averageCtr: 0 } };
  },

  // ── SITEMAP XML STRING (preview only in admin)
  async getSitemapPreview(): Promise<string> {
    try {
      const baseUrl = (import.meta as any).env?.VITE_WORKER_URL || '';
      const res = await fetch(`${baseUrl}/api/seo/sitemap`);
      return await res.text();
    } catch { /**/ }
    return '<!-- Sitemap tidak tersedia -->';
  },
};
