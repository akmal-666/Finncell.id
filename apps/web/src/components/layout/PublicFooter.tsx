import React from 'react';
import { Link } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tight text-white inline-flex items-center gap-1.5">
              <span>vincellid</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Retailer independen iPhone &amp; Apple berkualitas tinggi dengan layanan Trade In tepercaya di Indonesia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Navigasi</h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/produk" className="hover:text-white transition-colors">Produk</Link></li>
              <li><Link to="/aksesoris" className="hover:text-white transition-colors">Aksesoris</Link></li>
              <li><Link to="/trade-in" className="hover:text-white transition-colors">Trade In</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Dukungan</h3>
            <ul className="space-y-2.5 text-xs">
              <li><span className="hover:text-white cursor-default">Garansi Resmi</span></li>
              <li><span className="hover:text-white cursor-default">Pengiriman Cepat</span></li>
              <li><span className="hover:text-white cursor-default">Panduan Trade In</span></li>
              <li><span className="hover:text-white cursor-default">Pemeriksaan Unit</span></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Sosial</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Customer Care</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} vincellid. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Syarat &amp; Ketentuan</span>
            <span>Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
