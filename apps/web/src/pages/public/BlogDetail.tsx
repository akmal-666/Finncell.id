import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { blogService } from '@/services/blogService';
import { settingsService } from '@/services/settingsService';
import { BlogPost } from '@fincell/shared';
import { Clock, User, Calendar, Share2, ArrowLeft, MessageCircle, Sparkles, BookOpen } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [waNumber, setWaNumber] = useState<string>('6281234567890');

  useEffect(() => {
    settingsService.getSettings().then(res => {
      if (res.data?.whatsapp_number) setWaNumber(res.data.whatsapp_number);
    });
  }, []);

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);

    Promise.all([
      blogService.getPostBySlug(slug),
      blogService.getPosts(),
    ]).then(([detailRes, listRes]) => {
      if (detailRes.data) {
        setPost(detailRes.data);
      }
      if (listRes.data) {
        setRelatedPosts(listRes.data.filter(p => p.slug !== slug).slice(0, 3));
      }
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return (
      <PageContainer title="Memuat Artikel...">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full" />
        </div>
      </PageContainer>
    );
  }

  if (!post) {
    return (
      <PageContainer title="Artikel Tidak Ditemukan">
        <Card className="p-12 text-center max-w-xl mx-auto space-y-4">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
          <h2 className="text-lg font-bold text-[#111111]">Artikel Tidak Ditemukan</h2>
          <p className="text-xs text-gray-500">Artikel yang Anda cari tidak tersedia atau telah dipindahkan.</p>
          <Link to="/blog">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Kembali ke Blog
            </Button>
          </Link>
        </Card>
      </PageContainer>
    );
  }

  const cover = post.coverImage || (post as any).featuredImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop';
  const readTime = (post as any).readTime || `${post.readTimeMinutes || 5} min baca`;

  return (
    <PageContainer
      breadcrumbs={[
        { label: 'Blog', href: '/blog' },
        { label: post.title },
      ]}
    >
      <article className="max-w-4xl mx-auto space-y-8">
        
        {/* 1. ARTICLE HEADER */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="accent" size="sm">{post.category}</Badge>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#111111] leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 pt-1">
            <span className="flex items-center gap-1.5 font-medium text-gray-700">
              <User className="w-4 h-4 text-[#B88632]" /> {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" /> {readTime}
            </span>
          </div>
        </div>

        {/* 2. COVER IMAGE HERO */}
        <div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
          <img src={cover} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* 3. EXCERPT & CONTENT BODY */}
        <Card className="p-6 sm:p-10 space-y-6 bg-white border border-gray-200 shadow-sm text-gray-800 leading-relaxed">
          
          {post.excerpt && (
            <div className="p-4 bg-amber-50/60 rounded-2xl border-l-4 border-[#B88632] text-sm sm:text-base font-semibold text-[#111111]">
              {post.excerpt}
            </div>
          )}

          <div className="prose prose-gray max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
            {post.content ? (
              post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 font-normal">
                  {paragraph}
                </p>
              ))
            ) : (
              <p>Artikel ini berisi informasi dan panduan komprehensif dari tim pakar fincell.id seputar ekosistem produk Apple.</p>
            )}
          </div>

        </Card>

        {/* 4. WHATSAPP CONSULTATION BANNER */}
        <div className="rounded-2xl bg-gradient-to-r from-[#111111] to-[#252525] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-gray-800">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#E7B65A]" /> Ada Pertanyaan Lebih Lanjut?
            </h3>
            <p className="text-xs text-gray-300 max-w-md">
              Tim customer support fincell.id siap memberikan rekomendasi iPhone terbaik sesuai anggaran Anda.
            </p>
          </div>

          <a
            href={`https://wa.me/${waNumber}?text=Halo%20fincell.id,%20saya%20membaca%20artikel%20"${encodeURIComponent(post.title)}"%20dan%20ingin%20bertanya.`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <Button variant="primary" size="md" leftIcon={<MessageCircle className="w-4 h-4" />}>
              Konsultasi WhatsApp
            </Button>
          </a>
        </div>

        {/* 5. RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-extrabold text-[#111111]">Artikel Terkait</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((rel) => (
                <Card key={rel.id} className="group p-4 space-y-3 border border-gray-200 bg-white hover:shadow-md transition-all">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <img src={rel.coverImage || (rel as any).featuredImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <Badge variant="secondary" size="sm" className="text-[10px]">{rel.category}</Badge>
                  <h4 className="text-xs font-bold text-[#111111] group-hover:text-[#B88632] transition-colors line-clamp-2">
                    <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                </Card>
              ))}
            </div>
          </div>
        )}

      </article>
    </PageContainer>
  );
};
