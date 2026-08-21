import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { mediaService } from '@/services/mediaService';
import type { MediaItem, MediaPrefix } from '@fincell/shared';
import {
  Upload,
  Image as ImageIcon,
  Copy,
  Trash2,
  Eye,
  Search,
  Folder,
  HardDrive,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

const PREFIX_OPTIONS: { label: string; value: MediaPrefix | 'all' }[] = [
  { label: 'Semua Folder', value: 'all' },
  { label: 'products/', value: 'products' },
  { label: 'blog/', value: 'blog' },
  { label: 'banners/', value: 'banners' },
  { label: 'trade-in/', value: 'trade-in' },
  { label: 'general/', value: 'general' },
];

export const AdminMediaPage: React.FC = () => {
  const { toast } = useToast();

  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPrefix, setSelectedPrefix] = useState<MediaPrefix | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPrefix, setUploadPrefix] = useState<MediaPrefix>('products');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Preview & Delete modal states
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const res = await mediaService.getMediaList({
        prefix: selectedPrefix,
        search: searchQuery,
      });
      if (res.success && res.data) {
        setItems(res.data);
      }
    } catch {
      toast('Gagal memuat daftar media', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [selectedPrefix, searchQuery]);

  // Upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadError(null);

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('Ukuran berkas melebihi batas 10 MB');
        setUploadFile(null);
        return;
      }
      setUploadFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await mediaService.uploadMedia(uploadFile, uploadPrefix);
      if (res.success) {
        toast('Berkas berhasil diunggah ke Backblaze B2', { type: 'success' });
        setIsUploadOpen(false);
        setUploadFile(null);
        loadMedia();
      } else {
        setUploadError(res.message || 'Gagal mengunggah berkas');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Terjadi kesalahan saat upload');
    } finally {
      setIsUploading(false);
    }
  };

  // Copy URL handler
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast('URL media berhasil disalin ke clipboard!', { type: 'success' });
  };

  // Delete handler
  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      const res = await mediaService.deleteMedia(deleteItem.id || deleteItem.fileKey);
      if (res.success) {
        toast('Berkas berhasil dihapus dari B2 storage', { type: 'success' });
        setItems((prev) => prev.filter((i) => i.id !== deleteItem.id));
        setDeleteItem(null);
      } else {
        toast(res.message || 'Gagal menghapus berkas', { type: 'error' });
      }
    } catch {
      toast('Terjadi kesalahan saat menghapus', { type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  // Helpers
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const totalBytes = items.reduce((acc, curr) => acc + (curr.fileSize || 0), 0);

  return (
    <PageContainer
      title="Perpustakaan Media (Backblaze B2 Storage)"
      subtitle="Kelola aset gambar produk, banner promo, blog, dan berkas foto toko di Cloudflare Workers / B2 storage."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadMedia} iconOnly={<RefreshCw className="w-4 h-4" />} />
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Upload Media Baru
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
            <div className="p-3 bg-[#E7B65A]/10 text-[#E7B65A] rounded-xl">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Berkas Media</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">{items.length} Aset</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Penyimpanan B2</p>
              <p className="text-xl font-black text-gray-900 dark:text-white">{formatSize(totalBytes)}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Status Provider Storage</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-400">Backblaze B2 Active</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters & Search Toolbar */}
        <Card className="p-4 space-y-4 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Folder Prefix Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {PREFIX_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedPrefix(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    selectedPrefix === opt.value
                      ? 'bg-[#111111] dark:bg-[#E7B65A] text-white dark:text-[#111111] font-bold shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-64">
              <Input
                placeholder="Cari nama berkas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                className="bg-gray-50 dark:bg-[#1A1A1A] border-gray-200 dark:border-gray-800 text-xs"
              />
            </div>
          </div>
        </Card>

        {/* Media Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-[#E7B65A] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500">Memuat berkas media dari Backblaze B2...</p>
          </div>
        ) : items.length === 0 ? (
          <Card className="py-16 text-center space-y-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Belum ada berkas media</p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Unggah gambar produk, banner promo, atau foto blog baru ke storage Backblaze B2.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsUploadOpen(true)}
              leftIcon={<Upload className="w-4 h-4" />}
            >
              Upload Pertama
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item) => {
              const isPdf = item.mimeType === 'application/pdf';
              return (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 hover:border-[#E7B65A]/50 transition-all flex flex-col justify-between"
                >
                  {/* Thumbnail Container */}
                  <div className="aspect-square w-full bg-gray-100 dark:bg-[#1A1A1A] relative flex items-center justify-center overflow-hidden">
                    {isPdf ? (
                      <div className="flex flex-col items-center gap-1 text-rose-500">
                        <FileText className="w-10 h-10" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Document PDF</span>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                    )}

                    {/* Prefix Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge variant="dark" size="sm" className="bg-black/70 text-[10px] backdrop-blur-md">
                        {item.prefix || 'general'}
                      </Badge>
                    </div>

                    {/* Hover Action Toolbar */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-[2px]">
                      <button
                        onClick={() => setPreviewItem(item)}
                        title="Pratinjau Media"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCopyUrl(item.url)}
                        title="Salin URL Storage B2"
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteItem(item)}
                        title="Hapus dari B2"
                        className="p-2 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-white backdrop-blur-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata Info Footer */}
                  <div className="p-2.5 space-y-1">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500">
                      <span>{formatSize(item.fileSize)}</span>
                      <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* ── UPLOAD MEDIA MODAL ── */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-5 text-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#E7B65A]" />
                Upload Media ke Backblaze B2
              </h3>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Target Folder Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">Target Folder Prefix:</label>
                <select
                  value={uploadPrefix}
                  onChange={(e) => setUploadPrefix(e.target.value as MediaPrefix)}
                  className="w-full px-3 py-2 bg-[#1A1A1A] border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#E7B65A]"
                >
                  <option value="products">products/ (Foto Produk iPhone & Aksesoris)</option>
                  <option value="blog">blog/ (Gambar Artikel Blog)</option>
                  <option value="banners">banners/ (Banner Promo & Hero Homepage)</option>
                  <option value="trade-in">trade-in/ (Foto Estimasi Unit Trade-In)</option>
                  <option value="general">general/ (Media Umum Toko)</option>
                </select>
              </div>

              {/* File Input Dropzone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300">Pilih Berkas Media:</label>
                <div className="border-2 border-dashed border-gray-800 hover:border-[#E7B65A]/50 rounded-2xl p-6 text-center space-y-2 bg-[#1A1A1A]/40 transition-colors">
                  <input
                    type="file"
                    id="b2-file-input"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="b2-file-input" className="cursor-pointer space-y-2 block">
                    <div className="w-10 h-10 rounded-full bg-[#E7B65A]/10 text-[#E7B65A] flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    {uploadFile ? (
                      <div>
                        <p className="text-xs font-bold text-emerald-400">{uploadFile.name}</p>
                        <p className="text-[10px] text-gray-400">{formatSize(uploadFile.size)}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-bold text-gray-200">Klik untuk memilih berkas</p>
                        <p className="text-[10px] text-gray-500">JPG, PNG, WEBP, GIF, SVG, PDF (Maks. 10 MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsUploadOpen(false)}
                  disabled={isUploading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isUploading}
                  disabled={!uploadFile}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Unggah ke B2
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PREVIEW MEDIA MODAL ── */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden text-white shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-sm font-bold truncate pr-4">{previewItem.filename}</h3>
              <button onClick={() => setPreviewItem(null)} className="text-gray-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 flex flex-col items-center justify-center bg-black/40">
              {previewItem.mimeType === 'application/pdf' ? (
                <div className="p-10 text-center space-y-3">
                  <FileText className="w-16 h-16 text-rose-500 mx-auto" />
                  <p className="text-sm font-bold">{previewItem.filename}</p>
                </div>
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.filename}
                  className="max-h-[350px] object-contain rounded-xl border border-gray-800 shadow-xl"
                />
              )}

              <div className="w-full bg-[#1A1A1A] p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-gray-400">
                  <div>Ukuran: <span className="text-white font-bold">{formatSize(previewItem.fileSize)}</span></div>
                  <div>Tipe: <span className="text-white font-bold">{previewItem.mimeType}</span></div>
                  <div>Folder: <span className="text-white font-bold">{previewItem.prefix}</span></div>
                  <div>Tanggal: <span className="text-white font-bold">{new Date(previewItem.createdAt).toLocaleString('id-ID')}</span></div>
                </div>
                <div className="pt-2 border-t border-gray-800 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={previewItem.url}
                    className="flex-1 px-3 py-1.5 bg-black border border-gray-800 rounded-lg text-xs font-mono text-gray-300 focus:outline-none"
                  />
                  <Button variant="outline" size="sm" onClick={() => handleCopyUrl(previewItem.url)} leftIcon={<Copy className="w-3.5 h-3.5" />}>
                    Salin
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 flex justify-end gap-2">
              <a href={previewItem.url} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-4 h-4" />}>
                  Buka URL B2
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-gray-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold">Hapus Berkas Media?</h3>
            <p className="text-xs text-gray-400">
              Berkas <span className="text-white font-bold font-mono">{deleteItem.filename}</span> akan dihapus secara permanen dari Backblaze B2 storage dan basis data.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteItem(null)} disabled={isDeleting}>
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-500 text-white border-none"
                isLoading={isDeleting}
                onClick={handleDeleteConfirm}
              >
                Hapus Permanen
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};
