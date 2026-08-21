import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { blogService } from '@/services/blogService';
import { BlogPost } from '@fincell/shared';
import { Clock, User } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      blogService.getPostBySlug(slug).then((res) => {
        if (res.data) setPost(res.data);
      });
    }
  }, [slug]);

  if (!post) return null;

  return (
    <PageContainer
      breadcrumbs={[
        { label: 'Blog', href: '/blog' },
        { label: post.title },
      ]}
    >
      <article className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4 text-center">
          <Badge variant="accent" size="sm">{post.category}</Badge>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111111]">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min baca</span>
          </div>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <Card className="p-8 text-sm text-gray-700 leading-relaxed space-y-4">
          <p className="font-semibold text-base text-[#111111]">{post.excerpt}</p>
          <p>{post.content}</p>
        </Card>
      </article>
    </PageContainer>
  );
};
