import React, { useEffect, useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { blogService } from '@/services/blogService';
import { BlogPost } from '@fincell/shared';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search, Sparkles, BookOpen, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setIsLoading(true);
    blogService.getPosts().then((res) => {
      if (res.data) setBlogs(res.data);
      setIsLoading(false);
    });
  }, []);

  const categories = ['all', 'Panduan iPhone', 'Edukasi & Tips', 'Tips & Trik', 'Berita Apple'];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = b.title.toLowerCase().includes(q);
        const matchExcerpt = b.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt) return false;
      }

      if (selectedCategory !== 'all') {
        if (b.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      }

      return true;
    });
  }, [blogs, search, selectedCategory]);

  const featuredPost = blogs[0];

  return (
    <PageContainer
      title="Blog & Edukasi Apple"
      subtitle="Panduan memilih iPhone, tips perawatan battery health, edukasi garansi, serta artikel terupdate."
      breadcrumbs={[{ label: 'Blog' }]}
    >
      <div className="space-y-10 max-w-6xl mx-auto">
        
        {/* 1. SEARCH & CATEGORY FILTER TOOLBAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Semua Artikel' : cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-72">
            <Input
              placeholder="Cari artikel blog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-gray-400" />}
            />
          </div>

        </div>

        {/* 2. FEATURED ARTICLE HERO (If no search query) */}
        {!search && selectedCategory === 'all' && featuredPost && (
          <Card className="group overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              <div className="lg:col-span-7 aspect-video lg:aspect-auto overflow-hidden bg-gray-100 relative">
                <img
                  src={featuredPost.coverImage || (featuredPost as any).featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge variant="accent" size="sm" className="absolute top-4 left-4 z-10">
                  <Sparkles className="w-3 h-3 mr-1" /> Artikel Utama
                </Badge>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <Badge variant="secondary" size="sm">{featuredPost.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {(featuredPost as any).readTime || `${featuredPost.readTimeMinutes || 5} min`}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] group-hover:text-[#B88632] transition-colors leading-tight">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {featuredPost.author}
                  </span>

                  <Link to={`/blog/${featuredPost.slug}`}>
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#111111] hover:text-[#B88632] transition-colors">
                      Baca Artikel <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </Card>
        )}

        {/* 3. LOADING & EMPTY STATES */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-2xl w-full" />
            <Skeleton className="h-64 rounded-2xl w-full" />
            <Skeleton className="h-64 rounded-2xl w-full" />
          </div>
        )}

        {!isLoading && filteredBlogs.length === 0 && (
          <Card className="p-12 text-center space-y-3 bg-white border border-gray-200">
            <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-[#111111]">Artikel Tidak Ditemukan</h3>
            <p className="text-xs text-gray-500">Tidak ada artikel yang sesuai dengan pencarian atau kategori ini.</p>
          </Card>
        )}

        {/* 4. ARTICLES GRID */}
        {!isLoading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post) => (
              <Card key={post.id} className="group flex flex-col justify-between overflow-hidden border border-gray-200 bg-white hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
                    <img
                      src={post.coverImage || (post as any).featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Badge variant="accent" size="sm">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{(post as any).readTime || `${post.readTimeMinutes || 5} min`}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#111111] group-hover:text-[#B88632] transition-colors leading-snug line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">{post.author}</span>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#111111] hover:text-[#B88632] transition-colors">
                    Baca <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </PageContainer>
  );
};
