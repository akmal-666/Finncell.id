import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { CANONICAL_NAP } from '@/utils/localBusiness';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-[#050505] text-gray-400 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand + NAP */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="text-xl font-bold tracking-tight text-white inline-flex items-center gap-1.5">
              <span>vincellid</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Retailer independen iPhone &amp; Apple di Depok. Garansi resmi, layanan Trade In, dan pengiriman ke seluruh Indonesia.
            </p>

            {/* NAP Block — critical for Local SEO */}
            <address className="not-italic text-xs space-y-2 pt-1">
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-3.5 h-3.5 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>
                  {CANONICAL_NAP.streetAddress},<br />
                  {CANONICAL_NAP.neighborhood}, {CANONICAL_NAP.district},<br />
                  {CANONICAL_NAP.city}, {CANONICAL_NAP.province} {CANONICAL_NAP.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-3.5 h-3.5 text-[#D6A84F] shrink-0" />
                <a href={`tel:${CANONICAL_NAP.phone}`} className="hover:text-white transition-colors">
                  {CANONICAL_NAP.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={`https://wa.me/${CANONICAL_NAP.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-[#25D366]"
                >
                  WhatsApp
                </a>
                <span className="mx-1 text-gray-600">·</span>
                <a
                  href="https://maps.app.goo.gl/vincellid"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors text-[#D6A84F]"
                >
                  Google Maps
                </a>
              </div>
            </address>
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
              <li>
                <Link to="/jual-beli-iphone-depok" className="hover:text-white transition-colors text-gray-500">
                  Jual Beli iPhone Depok
                </Link>
              </li>
            </ul>
          </div>

          {/* Social + Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">Sosial</h3>
            <ul className="space-y-2.5 text-xs">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
              <li>
                <a
                  href={`https://wa.me/${CANONICAL_NAP.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Customer Care
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} VINCELL.ID &mdash; vincellid. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Syarat &amp; Ketentuan</span>
            <span>Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
