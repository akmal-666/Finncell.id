import { BlogPost, ApiResponse } from '@fincell/shared';
import { fetchApi } from './apiClient';
import { MOCK_BLOGS } from './mockData';

export interface CreateBlogPostPayload {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  author?: string;
  category?: string;
  status: 'draft' | 'published';
  publishedAt?: string;
}

export const blogService = {
  async getPosts(params?: { category?: string; search?: string; status?: string }): Promise<ApiResponse<BlogPost[]>> {
    try {
      const queryParts: string[] = [];
      if (params?.category) queryParts.push(`category=${encodeURIComponent(params.category)}`);
      if (params?.search) queryParts.push(`search=${encodeURIComponent(params.search)}`);
      if (params?.status) queryParts.push(`status=${encodeURIComponent(params.status)}`);

      const queryStr = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      const res = await fetchApi<BlogPost[]>(`/blog${queryStr}`);
      if (res.success && res.data) {
        return res;
      }
    } catch {
      // fallback
    }

    let filtered = [...MOCK_BLOGS];
    if (params?.category && params.category !== 'all') {
      filtered = filtered.filter(b => b.category.toLowerCase() === params.category!.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    if (params?.status) {
      filtered = filtered.filter(b => (b as any).status === params.status);
    }

    return {
      success: true,
      data: filtered,
    };
  },

  async getPostBySlug(slug: string): Promise<ApiResponse<BlogPost | null>> {
    try {
      const res = await fetchApi<BlogPost>(`/blog/${slug}`);
      if (res.success && res.data) {
        return { success: true, data: res.data };
      }
    } catch {
      // fallback
    }

    const post = MOCK_BLOGS.find(b => b.slug === slug || b.id === slug) || MOCK_BLOGS[0];
    return {
      success: true,
      data: post,
    };
  },

  async createPost(payload: CreateBlogPostPayload): Promise<ApiResponse<BlogPost>> {
    try {
      const res = await fetchApi<BlogPost>('/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.success && res.data) {
        return res;
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal membuat artikel blog', data: undefined as any };
    }

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt || '',
      content: payload.content || '',
      coverImage: payload.featuredImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      author: payload.author || 'Admin fincell.id',
      category: payload.category || 'Panduan iPhone',
      publishedAt: payload.publishedAt || new Date().toISOString(),
      isPublished: payload.status === 'published',
      readTimeMinutes: 5,
    };

    return { success: true, message: 'Artikel dibuat (local)', data: newPost };
  },

  async updatePost(id: string, payload: Partial<CreateBlogPostPayload>): Promise<ApiResponse<BlogPost>> {
    try {
      const res = await fetchApi<BlogPost>(`/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.success && res.data) {
        return res;
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal memperbarui artikel blog', data: undefined as any };
    }

    return { success: true, message: 'Artikel diperbarui (local)', data: { id, ...payload } as any };
  },

  async deletePost(id: string): Promise<ApiResponse<void>> {
    try {
      await fetchApi<void>(`/blog/${id}`, { method: 'DELETE' });
      return { success: true, message: 'Artikel berhasil dihapus', data: undefined };
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal menghapus artikel', data: undefined };
    }
  },
};
