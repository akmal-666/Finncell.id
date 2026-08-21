import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { blogService } from '@/services/blogService';
import { BlogPost } from '@fincell/shared';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    blogService.getPosts().then((res) => {
      if (res.data) setBlogs(res.data);
    });
  }, []);

  return (
    <PageContainer
      title="Blog & Edukasi Apple"
      subtitle="Tips, panduan perawatan, serta rumor terbaru seputar dunia iPhone dan Apple."
      breadcrumbs={[{ label: 'Blog' }]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((post) => (
          <Card key={post.id} className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <Badge variant="accent" size="sm">{post.category}</Badge>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readTimeMinutes} min baca</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#111111] group-hover:text-[#B88632] transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] hover:text-[#B88632] pt-2">
                Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};
