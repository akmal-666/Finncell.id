import { BlogPost, ApiResponse } from '@fincell/shared';
import { MOCK_BLOGS } from './mockData';

export const blogService = {
  async getPosts(): Promise<ApiResponse<BlogPost[]>> {
    return {
      success: true,
      data: MOCK_BLOGS
    };
  },

  async getPostBySlug(slug: string): Promise<ApiResponse<BlogPost | null>> {
    const post = MOCK_BLOGS.find(b => b.slug === slug) || MOCK_BLOGS[0];
    return {
      success: true,
      data: post
    };
  }
};
