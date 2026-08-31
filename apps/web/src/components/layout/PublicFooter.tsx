import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Headset, Instagram, MessageCircle, Youtube } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#061426] text-white border-t border-[#0B1F3A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Proposition Grid - Subtle Editorial Strips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#0B1F3A] text-left">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-[#5EA7FF] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Garansi Resmi</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Produk bergaransi resmi Apple Indonesia 100% original.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="w-5 h-5 text-[#5EA7FF] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Pengiriman Cepat</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Pengiriman berasuransi ke seluruh pelosok Indonesia.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <RefreshCw className="w-5 h-5 text-[#5EA7FF] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Trade In Mudah</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Tukar tambah iPhone lama dengan penawaran transparan.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Headset className="w-5 h-5 text-[#5EA7FF] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider">Konsultasi Specialist</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">Bantuan spesialis untuk pemilihan perangkat yang tepat.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 py-12">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tight inline-block">
              <span className="text-white">fincell</span>
              <span className="text-[#1769E0]">.id</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Retailer independen iPhone &amp; ekosistem Apple terpercaya di Indonesia. Menghadirkan kurasi produk original dengan standar layanan profesional.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#0B1F3A] hover:bg-[#1769E0] text-slate-300 hover:text-white rounded-md transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#0B1F3A] hover:bg-[#25D366] text-slate-300 hover:text-white rounded-md transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#0B1F3A] hover:bg-red-600 text-slate-300 hover:text-white rounded-md transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Katalog</h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link to="/produk" className="hover:text-white transition-colors">Semua iPhone</Link></li>
              <li><Link to="/aksesoris" className="hover:text-white transition-colors">Aksoris Original</Link></li>
              <li><Link to="/trade-in" className="hover:text-white transition-colors">Layanan Trade In</Link></li>
              <li><Link to="/promo" className="hover:text-white transition-colors">Penawaran Khusus</Link></li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Informasi</h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link to="/tentang-kami" className="hover:text-white transition-colors">Tentang fincell.id</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Jurnal &amp; Artikel</Link></li>
              <li><Link to="/hubungi-kami" className="hover:text-white transition-colors">FAQ &amp; Bantuan</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Legal &amp; Akses</h5>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link to="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat &amp; Ketentuan</Link></li>
              <li><Link to="/admin/login" className="hover:text-white transition-colors">Portal Admin</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#0B1F3A] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} fincell.id. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Garansi Resmi Indonesia</span>
            <span>•</span>
            <span>100% Original</span>
            <span>•</span>
            <span>Trade In Transparan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
