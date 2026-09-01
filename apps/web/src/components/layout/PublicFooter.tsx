import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import { CANONICAL_NAP } from '@/utils/localBusiness';

export const PublicFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0d0d0d] text-[#888] border-t border-white/[0.07]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand + tagline + social */}
          <div className="space-y-4">
            <Link to="/" className="text-white font-black text-[18px] tracking-[-0.5px] block">
              vincell<span className="text-[#D6A84F]">id</span>
            </Link>
            <p className="text-[12px] leading-relaxed text-[#666]">
              Toko iPhone terpercaya di Depok.<br />
              Produk original, garansi resmi,<br />dan layanan terbaik untukmu.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg flex items-center justify-center text-[#666] hover:text-white hover:border-[#D6A84F] transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg flex items-center justify-center text-[#666] hover:text-white hover:border-[#D6A84F] transition-colors text-[11px] font-bold">
                TK
              </a>
              <a href={`https://wa.me/${CANONICAL_NAP.whatsapp}`} target="_blank" rel="noreferrer"
                className="w-8 h-8 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg flex items-center justify-center text-[#25D366] hover:border-[#25D366] transition-colors text-[11px] font-bold">
                WA
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[1.5px] mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-[12px]">
              {[
                ['Produk', '/produk'],
                ['Aksesoris', '/aksesoris'],
                ['Trade In', '/trade-in'],
                ['Blog', '/blog'],
                ['Tentang Kami', '/tentang-kami'],
                ['Hubungi Kami', '/hubungi-kami'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[1.5px] mb-4">Bantuan</h4>
            <ul className="space-y-2.5 text-[12px]">
              {[['FAQ', '/'], ['Pengiriman', '/'], ['Garansi', '/'], ['Kebijakan Privasi', '/'], ['Syarat & Ketentuan', '/']].map(([l, h]) => (
                <li key={l}><Link to={h} className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Lokasi / NAP */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[1.5px] mb-4">Lokasi Toko</h4>
            <address className="not-italic space-y-2.5 text-[12px]">
              <div className="flex items-start gap-2 text-[#666]">
                <MapPin className="w-3.5 h-3.5 text-[#D6A84F] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {CANONICAL_NAP.streetAddress},<br />
                  {CANONICAL_NAP.neighborhood}, {CANONICAL_NAP.district},<br />
                  {CANONICAL_NAP.city}, {CANONICAL_NAP.province} {CANONICAL_NAP.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#666]">
                <Phone className="w-3.5 h-3.5 text-[#D6A84F] shrink-0" />
                <a href={`tel:${CANONICAL_NAP.phone}`} className="hover:text-white transition-colors font-mono">
                  {CANONICAL_NAP.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#666]">
                <Clock className="w-3.5 h-3.5 text-[#D6A84F] shrink-0" />
                <span>Senin – Minggu: 09:00 – 21:00</span>
              </div>
              {/* Tiny Google Maps placeholder */}
              <a
                href="https://maps.app.goo.gl/vincellid"
                target="_blank"
                rel="noreferrer"
                className="block mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#D6A84F] transition-colors"
              >
                <div className="h-[70px] w-full bg-[#1f1f1f] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-4 h-4 text-[#D6A84F] mx-auto mb-0.5" />
                    <span className="text-[10px] text-[#555] font-semibold">VINCELL.ID</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 text-[10px] text-[#666] text-center hover:text-[#D6A84F] transition-colors">
                  Buka di Google Maps →
                </div>
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] py-4">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[#555]">
          <p>&copy; {year} vincellid. All rights reserved.</p>
          <p className="text-[#444]">
            <Link to="/jual-beli-iphone-depok" className="hover:text-[#D6A84F] transition-colors">
              Jual Beli iPhone Depok
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
