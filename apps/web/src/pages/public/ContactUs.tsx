import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Clock, Star, ExternalLink } from 'lucide-react';
import { SeoHead } from '@/components/common/SeoHead';
import { CANONICAL_NAP, buildLocalBusinessSchema } from '@/utils/localBusiness';
import { openWhatsApp } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [waNum, setWaNum] = useState('');
  const [topic, setTopic] = useState('Pertanyaan Produk');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !waNum.trim() || !message.trim()) return;
    trackEvent('Contact', { content_name: topic });
    const text = `Halo VINCELL.ID,\n\nSaya ingin bertanya mengenai ${topic}.\n\nNama: ${name}\nWhatsApp: ${waNum}\n\nPesan:\n${message}`;
    openWhatsApp(text);
  };

  const schema = buildLocalBusinessSchema({ url: 'https://vincellid.id' });

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SeoHead
        title="Hubungi VINCELL.ID — Toko iPhone Depok"
        description="Hubungi VINCELL.ID di Depok untuk jual beli iPhone, aksesoris, dan layanan Trade In. Chat WhatsApp atau kunjungi toko di Beji, Depok."
        canonicalUrl="https://vincellid.id/hubungi-kami"
        jsonLdSchema={schema}
      />

      {/* HERO */}
      <section className="border-b border-[#262626] py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">HUBUNGI KAMI</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Hubungi VINCELL.ID
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Tim vincellid siap membantu kebutuhan iPhone, aksesoris, dan Trade In Anda.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT — Contact Info + Location */}
          <div className="lg:col-span-5 space-y-8">

            {/* Contact channels */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#D6A84F]">Kontak Langsung</h2>

              <a
                href={`https://wa.me/${CANONICAL_NAP.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('Contact', { content_name: 'WhatsApp Direct' })}
                className="flex items-center gap-4 p-4 bg-[#101010] border border-[#262626] rounded-md hover:border-[#25D366] transition-colors group"
              >
                <div className="w-9 h-9 rounded bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">WhatsApp</p>
                  <p className="text-[11px] text-gray-400 font-mono">{CANONICAL_NAP.phone}</p>
                </div>
              </a>

              <a
                href={`tel:${CANONICAL_NAP.phone}`}
                className="flex items-center gap-4 p-4 bg-[#101010] border border-[#262626] rounded-md hover:border-[#D6A84F] transition-colors group"
              >
                <div className="w-9 h-9 rounded bg-[#D6A84F]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#D6A84F]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Telepon</p>
                  <p className="text-[11px] text-gray-400 font-mono">{CANONICAL_NAP.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-[#101010] border border-[#262626] rounded-md">
                <div className="w-9 h-9 rounded bg-[#D6A84F]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#D6A84F]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Jam Operasional</p>
                  <p className="text-[11px] text-gray-400">Senin – Minggu: 09:00 – 21:00 WIB</p>
                </div>
              </div>
            </div>

            {/* Store Location / NAP */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#D6A84F]">Lokasi Toko</h2>
              <div className="bg-[#101010] border border-[#262626] rounded-md p-5 space-y-4">
                <div>
                  <p className="text-sm font-bold text-white">VINCELL.ID</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider">Electronics Store</p>
                </div>
                <address className="not-italic text-xs text-gray-400 leading-relaxed space-y-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D6A84F] shrink-0 mt-0.5" />
                    <span>
                      {CANONICAL_NAP.streetAddress},<br />
                      {CANONICAL_NAP.neighborhood}, {CANONICAL_NAP.district},<br />
                      {CANONICAL_NAP.city}, {CANONICAL_NAP.province} {CANONICAL_NAP.postalCode}
                    </span>
                  </div>
                </address>
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://maps.app.goo.gl/vincellid"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center text-xs font-semibold bg-[#D6A84F] hover:bg-[#F0C66A] text-black py-2 rounded transition-colors"
                  >
                    Google Maps
                  </a>
                  <a
                    href={`https://wa.me/${CANONICAL_NAP.whatsapp}?text=Halo%20VINCELL.ID%2C%20saya%20ingin%20berkunjung%20ke%20toko.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-black py-2 rounded transition-colors"
                  >
                    Chat WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Google Review CTA */}
            <div className="bg-[#101010] border border-[#262626] rounded-md p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D6A84F]" />
                <span className="text-xs font-bold text-white">4.9 di Google</span>
                <span className="text-[11px] text-gray-500">(169 ulasan)</span>
              </div>
              <p className="text-xs text-gray-400">Sudah berbelanja di VINCELL.ID? Bagikan pengalamanmu di Google.</p>
              <a
                href="https://g.page/r/vincellid/review"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] hover:underline"
              >
                <span>Berikan Review di Google</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

          {/* RIGHT — Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#101010] border border-[#262626] rounded-md p-8">
              <h2 className="text-lg font-bold text-white mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold uppercase mb-1.5">Nama *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold uppercase mb-1.5">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    value={waNum}
                    onChange={e => setWaNum(e.target.value)}
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold uppercase mb-1.5">Topik</label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none"
                  >
                    <option>Pertanyaan Produk</option>
                    <option>Trade In iPhone</option>
                    <option>Informasi Garansi</option>
                    <option>Pengiriman</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold uppercase mb-1.5">Pesan *</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tulis pertanyaan atau pesan Anda..."
                    className="w-full bg-[#050505] border border-[#262626] rounded p-3 text-white focus:border-[#D6A84F] focus:outline-none resize-none"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold uppercase tracking-wider py-3 rounded transition-colors"
                  >
                    Kirim via WhatsApp
                  </button>
                  <a
                    href={`https://wa.me/${CANONICAL_NAP.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-bold uppercase tracking-wider py-3 rounded transition-colors"
                  >
                    Chat Langsung
                  </a>
                </div>
              </form>
            </div>

            {/* Embedded Google Maps iframe placeholder — URL configurable via admin */}
            <div className="mt-6 bg-[#101010] border border-[#262626] rounded-md overflow-hidden">
              <iframe
                title="Lokasi VINCELL.ID di Depok"
                src="https://www.google.com/maps/embed/v1/place?key=&q=VINCELL.ID,Depok"
                width="100%"
                height="280"
                style={{ border: 0, filter: 'grayscale(30%) invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-3 flex justify-between items-center text-[11px] text-gray-500">
                <span>VINCELL.ID — {CANONICAL_NAP.neighborhood}, {CANONICAL_NAP.city}</span>
                <a href="https://maps.app.goo.gl/vincellid" target="_blank" rel="noreferrer" className="text-[#D6A84F] hover:underline">
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Internal link to local SEO page */}
      <div className="border-t border-[#262626] py-8 text-center">
        <p className="text-xs text-gray-500">
          Mencari informasi jual beli iPhone di Depok?{' '}
          <Link to="/jual-beli-iphone-depok" className="text-[#D6A84F] hover:underline">
            Lihat halaman Jual Beli iPhone Depok
          </Link>
        </p>
      </div>
    </div>
  );
};
