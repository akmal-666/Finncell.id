export type MediaPrefix = 'products' | 'blog' | 'banners' | 'trade-in' | 'general';

export interface MediaItem {
  id: string;
  filename: string;
  fileKey: string;
  url: string;
  fileSize: number;
  mimeType: string;
  prefix: MediaPrefix;
  createdAt: string;
}

export interface UploadMediaResponse {
  id: string;
  filename: string;
  key: string;
  url: string;
  size: number;
  mimeType: string;
  prefix: MediaPrefix;
}
