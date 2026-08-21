import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headset, MessageCircle } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#E7B65A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Garansi Resmi</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Produk bergaransi resmi Apple Indonesia</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#E7B65A]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Pengiriman Cepat</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Kirim ke seluruh Indonesia dengan aman</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#E7B65A]">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Trade In Mudah</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Tukar tambah iPhone lama dengan harga terbaik</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="p-3 bg-white/5 rounded-2xl text-[#25D366]">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Layanan Pelanggan</h5>
              <p className="text-[11px] text-gray-400 mt-0.5">Tim kami siap membantu setiap hari</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-bold tracking-tighter inline-block">
              <span className="text-[#E7B65A]">fincell</span>.id
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Platform e-commerce online premium Indonesia khusus iPhone, produk Apple, aksesoris berkualitas, dan layanan tukar tambah terbaik.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat Via WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-[#E7B65A] uppercase tracking-wider mb-4">Navigasi</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/produk" className="hover:text-white transition-colors">Semua Produk</Link></li>
              <li><Link to="/aksesoris" className="hover:text-white transition-colors">Aksesoris iPhone</Link></li>
              <li><Link to="/promo" className="hover:text-white transition-colors">Promo Spesial</Link></li>
              <li><Link to="/trade-in" className="hover:text-white transition-colors">Tukar Tambah (Trade In)</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Artikel & Edukasi</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-[#E7B65A] uppercase tracking-wider mb-4">Informasi</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Portal Admin</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold text-[#E7B65A] uppercase tracking-wider mb-4">Jam Operasional</h5>
            <div className="space-y-2 text-xs text-gray-400">
              <p><span className="text-white font-medium">Senin - Jumat:</span> 09.00 - 21.00 WIB</p>
              <p><span className="text-white font-medium">Sabtu:</span> 09.00 - 21.00 WIB</p>
              <p><span className="text-white font-medium">Minggu & Libur:</span> 10.00 - 20.00 WIB</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} fincell.id. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span>Garansi Indonesia</span>
            <span>•</span>
            <span>100% Original</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
