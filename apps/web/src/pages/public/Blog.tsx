import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/common/SeoHead';

export const BlogPage: React.FC = () => {
  const posts = [
    {
      title: 'Panduan Memilih iPhone 17 Series Sesuai Kebutuhan Profesional',
      slug: 'panduan-memilih-iphone-17-series',
      category: 'iPhone',
      excerpt: 'Bandingkan inovasi kamera, daya tahan baterai, dan performa chip A18 Pro untuk menemukan varian iPhone 17 terbaik Anda.',
      date: '2026-08-30',
      img: '/images/iphone17_transparent.png',
    },
    {
      title: 'Cara Mengoptimalkan Nilai Trade In iPhone Lama Anda',
      slug: 'cara-mengoptimalkan-nilai-trade-in-iphone',
      category: 'Trade In',
      excerpt: 'Langkah sederhana merawat kondisi fisik, kesehatan baterai, dan kelengkapan dus agar penawaran estimasi trade in tetap maksimal.',
      date: '2026-08-25',
      img: '/images/iphone17pm_transparent.png',
    },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen py-16">
      <SeoHead
        title="Jurnal &amp; Artikel Editorial — vincellid"
        description="Analisis mendalam, ulasan iPhone, dan panduan resmi dari editor vincellid."
        canonicalUrl="https://vincellid.id/blog"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">EDITORIAL MAGAZINE</span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Jurnal vincellid</h1>
          <p className="text-xs text-gray-400 mt-1">Panduan, ulasan teknologi, dan informasi resmi seputar ekosistem iPhone.</p>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#101010] border border-[#262626] rounded-md p-6 hover:border-[#D6A84F] transition-colors">
              <div className="md:col-span-4 bg-[#080808] p-4 rounded flex items-center justify-center">
                <img src={post.img} alt={post.title} className="max-h-48 object-contain" />
              </div>
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] font-mono uppercase text-[#D6A84F] bg-[#D6A84F]/10 px-2.5 py-1 rounded-sm border border-[#D6A84F]/20">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-white hover:text-[#D6A84F] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">{post.excerpt}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                  <span>{post.date}</span>
                  <Link to={`/blog/${post.slug}`} className="text-[#D6A84F] font-semibold hover:underline">
                    Baca Artikel &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
