export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  isPublished: boolean;
  readTimeMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
}
