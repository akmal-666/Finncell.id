import type { MediaPrefix } from '@fincell/shared';

export interface StorageUploadResult {
  key: string;
  url: string;
  size: number;
  mimeType: string;
  prefix: MediaPrefix;
}

const ALLOWED_MIME_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
};

const ALLOWED_PREFIXES: MediaPrefix[] = ['products', 'blog', 'banners', 'trade-in', 'general'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export class StorageService {
  private bucket?: any; // Cloudflare R2 / S3-compatible B2 binding
  private publicBaseUrl: string;

  constructor(bucketBinding?: any, publicBaseUrl: string = 'https://vincellid.id') {
    this.bucket = bucketBinding;
    this.publicBaseUrl = publicBaseUrl.replace(/\/$/, '');
  }

  /**
   * Validate file parameters before upload
   */
  public validate(fileSize: number, mimeType: string, prefix: MediaPrefix): { valid: boolean; error?: string } {
    if (!ALLOWED_PREFIXES.includes(prefix)) {
      return { valid: false, error: `Prefix storage '${prefix}' tidak valid. Pilihan: ${ALLOWED_PREFIXES.join(', ')}` };
    }

    if (fileSize > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: `Ukuran berkas (${(fileSize / (1024 * 1024)).toFixed(2)} MB) melebihi batas maksimum 10 MB` };
    }

    if (!ALLOWED_MIME_TYPES[mimeType.toLowerCase()]) {
      return { valid: false, error: `Format berkas '${mimeType}' tidak didukung. Gunakan JPG, PNG, WEBP, GIF, SVG, atau PDF.` };
    }

    return { valid: true };
  }

  /**
   * Upload file to Backblaze B2 / R2 storage bucket
   */
  public async upload(
    fileBuffer: ArrayBuffer,
    fileName: string,
    mimeType: string,
    prefix: MediaPrefix = 'general'
  ): Promise<StorageUploadResult> {
    const validation = this.validate(fileBuffer.byteLength, mimeType, prefix);
    if (!validation.valid) {
      throw new Error(validation.error || 'Validasi berkas gagal');
    }

    const ext = ALLOWED_MIME_TYPES[mimeType.toLowerCase()] || 'bin';
    const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const key = `${prefix}/${Date.now()}-${randomSuffix}-${cleanName}`;

    // Upload to B2 / R2 bucket if binding exists
    if (this.bucket) {
      await this.bucket.put(key, fileBuffer, {
        httpMetadata: { contentType: mimeType },
        customMetadata: { originalName: fileName, uploadedAt: new Date().toISOString() },
      });
    }

    const url = this.generatePublicUrl(key);

    return {
      key,
      url,
      size: fileBuffer.byteLength,
      mimeType,
      prefix,
    };
  }

  /**
   * Delete file from Backblaze B2 / R2 storage bucket
   */
  public async delete(key: string): Promise<boolean> {
    if (!key) return false;
    if (this.bucket) {
      await this.bucket.delete(key);
    }
    return true;
  }

  /**
   * Check if file exists in bucket
   */
  public async exists(key: string): Promise<boolean> {
    if (!key) return false;
    if (!this.bucket) return true; // dev fallback
    const head = await this.bucket.head(key);
    return Boolean(head);
  }

  /**
   * Fetch raw file data from bucket
   */
  public async get(key: string): Promise<{ data: ArrayBuffer; contentType: string } | null> {
    if (!key) return null;
    if (!this.bucket) return null;
    const object = await this.bucket.get(key);
    if (!object) return null;
    const data = await object.arrayBuffer();
    const contentType = object.httpMetadata?.contentType || 'application/octet-stream';
    return { data, contentType };
  }

  /**
   * Generate public access URL for a given storage key
   */
  public generatePublicUrl(key: string): string {
    return `${this.publicBaseUrl}/media/file/${key}`;
  }
}
