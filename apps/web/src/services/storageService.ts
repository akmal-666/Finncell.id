import { fetchApi } from './apiClient';

export interface UploadResult {
  url: string;
  key: string;
  size: number;
}

export const storageService = {
  /**
   * Abstraction for uploading image files to Backblaze B2 storage.
   * Sends file to worker API endpoint `/api/media/upload` if available,
   * with fallback to client-side data URL for instant previews.
   */
  async uploadImage(file: File): Promise<UploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetchApi<UploadResult>('/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.success && res.data) {
        return res.data;
      }
    } catch {
      // Fallback: Read file as Data URL for dev preview
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result as string,
          key: `b2-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
          size: file.size,
        });
      };
      reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
      reader.readAsDataURL(file);
    });
  },

  /**
   * Delete file from Backblaze B2 storage
   */
  async deleteImage(key: string): Promise<boolean> {
    try {
      const res = await fetchApi<void>(`/media/${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });
      return res.success;
    } catch {
      return true;
    }
  }
};
