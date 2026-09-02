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
};

const ALLOWED_PREFIXES: MediaPrefix[] = ['products', 'blog', 'banners', 'trade-in', 'general'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// B2 S3-compatible endpoint constants
const B2_S3_HOST = 's3.us-east-005.backblazeb2.com';
const B2_BUCKET_NAME = 'fincell-media';
const B2_DOWNLOAD_URL = 'https://f005.backblazeb2.com';

/**
 * Build AWS Signature V4 authorization for Backblaze B2 S3-compatible API.
 * Cloudflare Workers supports SubtleCrypto needed for HMAC-SHA256 signing.
 */
async function hmacSha256(key: ArrayBuffer | string, data: string): Promise<ArrayBuffer> {
  const keyBuf = typeof key === 'string'
    ? new TextEncoder().encode(key)
    : key;

  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyBuf, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data));
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(data: ArrayBuffer | string): Promise<string> {
  const buf = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return toHex(hash);
}

async function buildAwsV4Auth(params: {
  method: string;
  host: string;
  path: string;
  contentType: string;
  body: ArrayBuffer;
  keyId: string;
  secretKey: string;
  region: string;
}): Promise<{ authorization: string; amzDate: string; amzContentSha256: string }> {
  const { method, host, path, contentType, body, keyId, secretKey, region } = params;
  const service = 's3';

  const now = new Date();
  const datestamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';

  const payloadHash = await sha256Hex(body);

  // Canonical request
  const canonicalHeaders =
    `content-type:${contentType}\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;

  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    method,
    path,
    '', // no query string
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  // String to sign
  const credentialScope = `${datestamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    await sha256Hex(new TextEncoder().encode(canonicalRequest).buffer as ArrayBuffer),
  ].join('\n');

  // Signing key
  const kDate = await hmacSha256(`AWS4${secretKey}`, datestamp);
  const kRegion = await hmacSha256(kDate, region);
  const kService = await hmacSha256(kRegion, service);
  const kSigning = await hmacSha256(kService, 'aws4_request');

  const signature = toHex(await hmacSha256(kSigning, stringToSign));

  const authorization =
    `AWS4-HMAC-SHA256 ` +
    `Credential=${keyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, ` +
    `Signature=${signature}`;

  return { authorization, amzDate, amzContentSha256: payloadHash };
}

export class StorageService {
  private keyId: string;
  private appKey: string;
  private bucketName: string;
  private region: string;
  private host: string;

  constructor(keyId?: string, appKey?: string, bucketName?: string) {
    this.keyId = keyId || '';
    this.appKey = appKey || '';
    this.bucketName = bucketName || B2_BUCKET_NAME;
    this.region = 'us-east-005';
    this.host = `${this.bucketName}.${B2_S3_HOST}`;
  }

  public validate(
    fileSize: number,
    mimeType: string,
    prefix: MediaPrefix
  ): { valid: boolean; error?: string } {
    if (!ALLOWED_PREFIXES.includes(prefix)) {
      return { valid: false, error: `Prefix '${prefix}' tidak valid.` };
    }
    if (fileSize > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: `Ukuran berkas melebihi batas 10 MB` };
    }
    if (!ALLOWED_MIME_TYPES[mimeType.toLowerCase()]) {
      return { valid: false, error: `Format '${mimeType}' tidak didukung.` };
    }
    return { valid: true };
  }

  public generatePublicUrl(key: string): string {
    return `${B2_DOWNLOAD_URL}/file/${this.bucketName}/${key}`;
  }

  public async upload(
    fileBuffer: ArrayBuffer,
    fileName: string,
    mimeType: string,
    prefix: MediaPrefix = 'general'
  ): Promise<StorageUploadResult> {
    const validation = this.validate(fileBuffer.byteLength, mimeType, prefix);
    if (!validation.valid) throw new Error(validation.error || 'Validasi berkas gagal');

    const ext = ALLOWED_MIME_TYPES[mimeType.toLowerCase()] || 'bin';
    const cleanName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toLowerCase();
    const randomSuffix = Math.random().toString(36).substring(2, 10);
    const key = `${prefix}/${Date.now()}-${randomSuffix}-${cleanName}`;

    if (!this.keyId || !this.appKey) {
      // Dev/fallback: no credentials, just return a URL as if uploaded
      console.warn('[StorageService] B2 credentials not configured — skipping actual upload');
      return { key, url: this.generatePublicUrl(key), size: fileBuffer.byteLength, mimeType, prefix };
    }

    const path = `/${key}`;
    const auth = await buildAwsV4Auth({
      method: 'PUT',
      host: this.host,
      path,
      contentType: mimeType,
      body: fileBuffer,
      keyId: this.keyId,
      secretKey: this.appKey,
      region: this.region,
    });

    const res = await fetch(`https://${this.host}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
        'x-amz-content-sha256': auth.amzContentSha256,
        'x-amz-date': auth.amzDate,
        'Authorization': auth.authorization,
      },
      body: fileBuffer,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`B2 upload gagal (${res.status}): ${text}`);
    }

    return {
      key,
      url: this.generatePublicUrl(key),
      size: fileBuffer.byteLength,
      mimeType,
      prefix,
    };
  }

  public async delete(key: string): Promise<boolean> {
    if (!key || !this.keyId || !this.appKey) return false;
    const path = `/${key}`;
    const emptyBody = new ArrayBuffer(0);
    const auth = await buildAwsV4Auth({
      method: 'DELETE',
      host: this.host,
      path,
      contentType: '',
      body: emptyBody,
      keyId: this.keyId,
      secretKey: this.appKey,
      region: this.region,
    });
    const res = await fetch(`https://${this.host}${path}`, {
      method: 'DELETE',
      headers: {
        'x-amz-content-sha256': auth.amzContentSha256,
        'x-amz-date': auth.amzDate,
        'Authorization': auth.authorization,
      },
    });
    return res.ok || res.status === 404;
  }

  public async get(key: string): Promise<{ data: ArrayBuffer; contentType: string } | null> {
    const url = this.generatePublicUrl(key);
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.arrayBuffer();
    const contentType = res.headers.get('Content-Type') || 'application/octet-stream';
    return { data, contentType };
  }

  public exists = async (key: string): Promise<boolean> => {
    if (!key) return false;
    const url = this.generatePublicUrl(key);
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  };
}
