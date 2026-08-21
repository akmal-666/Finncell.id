import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headset, MessageCircle, Instagram, Youtube } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#E7B65A] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Garansi Resmi</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Produk bergaransi resmi Apple Indonesia</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#E7B65A] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Pengiriman Cepat</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Kirim ke seluruh Indonesia dengan aman</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#E7B65A] shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Trade In Mudah</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Tukar tambah iPhone lama dengan harga terbaik</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#25D366] shrink-0">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Layanan Pelanggan</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Tim kami siap membantu setiap hari</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 py-10">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tighter inline-block">
              <span className="text-white">fincell</span>
              <span className="text-[#E7B65A]">.id</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Platform e-commerce online premium Indonesia khusus iPhone, produk Apple, aksoris berkualitas, dan layanan tukar tambah terpercaya.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-[#E7B65A] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-300 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h5 className="text-xs font-bold text-[#E7B65A] uppercase tracking-wider mb-4">Shop</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/produk" className="hover:text-white transition-colors">Produk</Link></li>
              <li><Link to="/aksesoris" className="hover:text-white transition-colors">Aksesoris</Link></li>
              <li><Link to="/trade-in" className="hover:text-white transition-colors">Trade In</Link></li>
              <li><Link to="/promo" className="hover:text-white transition-colors">Promo Spesial</Link></li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h5 className="text-xs font-bold text-[#E7B65A] uppercase tracking-wider mb-4">Informasi</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-white transition-colors">Kontak</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Edukasi</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-bold text-[#E7B65A] uppercase tracking-wider mb-4">Legal</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Portal Admin</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} fincell.id. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Garansi Resmi Indonesia</span>
            <span>•</span>
            <span>100% Original</span>
            <span>•</span>
            <span>Trade In Instan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
