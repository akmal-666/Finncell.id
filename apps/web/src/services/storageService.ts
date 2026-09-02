export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api';

export const storageService = {
  /**
   * Upload image to Backblaze B2 via /api/media/upload.
   * Does NOT use fetchApi — must not set Content-Type header so the
   * browser can set the correct multipart/form-data boundary automatically.
   */
  async uploadImage(file: File, prefix = 'products'): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prefix', prefix);

    const response = await fetch(`${API_BASE}/media/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      // No Content-Type header — browser sets multipart/form-data + correct boundary
    });

    if (!response.ok) {
      let msg = `Upload gagal (HTTP ${response.status})`;
      try {
        const err = await response.json();
        msg = err.message || msg;
      } catch { /* ignore */ }
      throw new Error(msg);
    }

    const json = await response.json();

    if (!json.success || !json.data) {
      throw new Error(json.message || 'Respons upload tidak valid');
    }

    return {
      url: json.data.url,
      key: json.data.key,
      size: json.data.size,
    };
  },

  /**
   * Delete file from storage by key
   */
  async deleteImage(key: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/media/${encodeURIComponent(key)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const json = await response.json();
      return json.success === true;
    } catch {
      return true;
    }
  },
};
