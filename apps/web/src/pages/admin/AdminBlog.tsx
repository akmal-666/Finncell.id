import React, { useEffect, useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { blogService, CreateBlogPostPayload } from '@/services/blogService';
import { storageService } from '@/services/storageService';
import { BlogPost } from '@fincell/shared';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  BookOpen,
  Upload,
  Calendar,
  User,
  CheckCircle,
  Eye,
  Sparkles
} from 'lucide-react';

export const AdminBlogPage: React.FC = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Form Fields
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [excerpt, setExcerpt] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [featuredImage, setFeaturedImage] = useState<string>('');
  const [author, setAuthor] = useState<string>('Admin fincell.id');
  const [category, setCategory] = useState<string>('Panduan iPhone');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [publishedAt, setPublishedAt] = useState<string>(new Date().toISOString().slice(0, 10));

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await blogService.getPosts();
      if (res.data) setBlogs(res.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      const genSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(genSlug);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setFeaturedImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop');
    setAuthor('Admin fincell.id');
    setCategory('Panduan iPhone');
    setStatus('published');
    setPublishedAt(new Date().toISOString().slice(0, 10));
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setFeaturedImage(post.coverImage || (post as any).featuredImage || '');
    setAuthor(post.author || 'Admin fincell.id');
    setCategory(post.category || 'Panduan iPhone');
    setStatus((post as any).status || 'published');
    setPublishedAt(new Date(post.publishedAt || new Date()).toISOString().slice(0, 10));
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploaded = await storageService.uploadImage(files[0]);
      setFeaturedImage(uploaded.url);
      toast('Gambar Header Diunggah', { type: 'success', message: 'Gambar artikel berhasil diunggah ke storage B2.' });
    } catch {
      toast('Gagal Unggah Gambar', { type: 'error', message: 'Terjadi kesalahan saat mengunggah gambar.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !slug.trim()) {
      toast('Lengkapi Data', { type: 'error', message: 'Judul dan Slug artikel wajib diisi!' });
      return;
    }

    setIsSubmitting(true);

    const payload: CreateBlogPostPayload = {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author,
      category,
      status,
      publishedAt: new Date(publishedAt).toISOString(),
    };

    try {
      if (editingPost) {
        const res = await blogService.updatePost(editingPost.id, payload);
        if (res.success) {
          toast('Artikel Diperbarui', { type: 'success', message: `Artikel "${title}" berhasil disimpan.` });
          setIsModalOpen(false);
          loadBlogs();
        }
      } else {
        const res = await blogService.createPost(payload);
        if (res.success) {
          toast('Artikel Diterbitkan', { type: 'success', message: `Artikel "${title}" telah berhasil terbit.` });
          setIsModalOpen(false);
          loadBlogs();
        }
      }
    } catch {
      toast('Gagal Menyimpan', { type: 'error', message: 'Terjadi kesalahan saat menghubungkan server API.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus artikel "${post.title}"?`)) {
      try {
        await blogService.deletePost(post.id);
        toast('Artikel Dihapus', { type: 'info', message: `Artikel "${post.title}" telah dihapus.` });
        setBlogs(prev => prev.filter(p => p.id !== post.id));
      } catch {
        toast('Gagal Hapus', { type: 'error', message: 'Terjadi kesalahan saat menghapus artikel.' });
      }
    }
  };

  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!b.title.toLowerCase().includes(q) && !b.excerpt.toLowerCase().includes(q)) return false;
      }
      if (selectedCategory !== 'all' && b.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [blogs, search, selectedCategory]);

  return (
    <PageContainer
      title="CMS & Edukasi Blog"
      subtitle="Kelola publikasi artikel panduan Apple, tips perawatan battery health, dan edukasi garansi resmi."
      actions={
        <Button variant="primary" size="sm" onClick={handleOpenCreateModal} leftIcon={<Plus className="w-4 h-4" />}>
          Tulis Artikel Baru
        </Button>
      }
    >
      <div className="space-y-6">
        
        {/* FILTERS */}
        <Card className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-200">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Cari judul / ringkasan artikel..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-gray-400" />}
            />
          </div>

          <div className="w-full sm:w-60">
            <Select
              options={[
                { value: 'all', label: 'Semua Kategori' },
                { value: 'Panduan iPhone', label: 'Panduan iPhone' },
                { value: 'Edukasi & Tips', label: 'Edukasi & Tips' },
                { value: 'Tips & Trik', label: 'Tips & Trik' },
                { value: 'Berita Apple', label: 'Berita Apple' },
              ]}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </div>
        </Card>

        {/* TABLE */}
        {isLoading ? (
          <Card className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </Card>
        ) : (
          <Card className="overflow-hidden border border-gray-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold text-xs">Artikel</TableHead>
                  <TableHead className="font-bold text-xs">Kategori</TableHead>
                  <TableHead className="font-bold text-xs">Penulis</TableHead>
                  <TableHead className="font-bold text-xs">Status</TableHead>
                  <TableHead className="font-bold text-xs">Tanggal Terbit</TableHead>
                  <TableHead className="font-bold text-xs text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-xs text-gray-500">
                      Belum ada artikel yang cocok. Klik "Tulis Artikel Baru" untuk membuat postingan pertama.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBlogs.map((b) => {
                    const isPub = (b as any).status === 'published' || b.isPublished;
                    const img = b.coverImage || (b as any).featuredImage;

                    return (
                      <TableRow key={b.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        {/* Title & Preview */}
                        <TableCell>
                          <div className="flex items-center gap-3 max-w-md">
                            {img && (
                              <img src={img} alt="" className="w-12 h-12 object-cover rounded-xl border border-gray-200 shrink-0 bg-gray-100" />
                            )}
                            <div className="space-y-0.5">
                              <p className="font-extrabold text-[#111111] text-xs leading-snug line-clamp-1">{b.title}</p>
                              <p className="text-[10px] text-gray-400 font-mono truncate">slug: /{b.slug}</p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-xs font-medium text-gray-700">
                          {b.category}
                        </TableCell>

                        <TableCell className="text-xs text-gray-500">
                          {b.author}
                        </TableCell>

                        <TableCell>
                          <Badge variant={isPub ? 'success' : 'warning'} size="sm">
                            {isPub ? 'Terbit (Published)' : 'Draft'}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-[11px] text-gray-400 whitespace-nowrap">
                          {new Date(b.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <a href={`/blog/${b.slug}`} target="_blank" rel="noreferrer">
                              <Button variant="ghost" size="sm" iconOnly={<Eye className="w-4 h-4 text-gray-600" />} title="Lihat di Toko" />
                            </a>
                            <Button variant="ghost" size="sm" onClick={() => handleOpenEditModal(b)} iconOnly={<Edit className="w-4 h-4 text-blue-600" />} title="Edit Artikel" />
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(b)} iconOnly={<Trash2 className="w-4 h-4 text-rose-600" />} title="Hapus Artikel" />
                          </div>
                        </TableCell>

                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* MODAL EDIT / CREATE */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPost ? 'Edit Artikel Blog' : 'Tulis Artikel Blog Baru'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Judul Artikel *"
                  placeholder="Contoh: Tips Merawat Battery Health iPhone Agar Awet 100%"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>
              <Input
                label="Slug URL *"
                placeholder="tips-merawat-battery-health-iphone"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Kategori *"
                options={[
                  { value: 'Panduan iPhone', label: 'Panduan iPhone' },
                  { value: 'Edukasi & Tips', label: 'Edukasi & Tips' },
                  { value: 'Tips & Trik', label: 'Tips & Trik' },
                  { value: 'Berita Apple', label: 'Berita Apple' },
                ]}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Input
                label="Nama Penulis *"
                placeholder="Admin fincell.id"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <Select
                label="Status Publikasi *"
                options={[
                  { value: 'published', label: 'Terbitkan (Published)' },
                  { value: 'draft', label: 'Simpan Draft' },
                ]}
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700">Gambar Header (Featured Image) *</label>
              <div className="flex gap-3 items-center">
                {featuredImage && (
                  <img src={featuredImage} alt="" className="w-16 h-12 object-cover rounded-lg border border-gray-200 shrink-0" />
                )}
                <Input
                  placeholder="https://images.unsplash.com/..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                />
                <label className="shrink-0 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button variant="secondary" size="sm" type="button" isLoading={isUploading} leftIcon={<Upload className="w-4 h-4" />}>
                    Upload B2
                  </Button>
                </label>
              </div>
            </div>

            <Textarea
              label="Ringkasan Singkat (Excerpt) *"
              placeholder="Tuliskan 2-3 kalimat rangkuman utama isi artikel..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              required
            />

            <Textarea
              label="Isi Konten Artikel *"
              placeholder="Tuliskan konten artikel lengkap. Gunakan baris baru untuk memisahkan paragraf..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
            />

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-200">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
                {editingPost ? 'Simpan Perubahan' : 'Terbitkan Artikel'}
              </Button>
            </div>

          </form>
        </Modal>

      </div>
    </PageContainer>
  );
};
