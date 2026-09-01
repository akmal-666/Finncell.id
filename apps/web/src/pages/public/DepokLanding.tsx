import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Star, ExternalLink, ChevronDown } from 'lucide-react';
import { SeoHead } from '@/components/common/SeoHead';
import { CANONICAL_NAP, buildLocalBusinessSchema } from '@/utils/localBusiness';
import { openWhatsApp, buildProductWhatsAppMessage } from '@/utils/whatsapp';
import { trackEvent } from '@/utils/analytics';

const faqs = [
  {
    q: 'Apakah VINCELL.ID melayani jual beli iPhone di Depok?',
    a: 'Ya. VINCELL.ID melayani kebutuhan jual beli iPhone di area Depok, khususnya Beji dan Kemiri Muka.',
  },
  {
    q: 'Di mana lokasi VINCELL.ID?',
    a: "VINCELL.ID berlokasi di Jl. Masjid Jami' Al-Huda No.2a, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16424.",
  },
  {
    q: 'Apakah bisa Trade In iPhone?',
    a: 'Ya. Kamu dapat menghubungi VINCELL.ID melalui WhatsApp untuk proses Trade In dan mendapatkan estimasi perangkat.',
  },
  {
    q: 'Bagaimana cara membeli iPhone?',
    a: 'Pilih produk yang kamu inginkan lalu hubungi VINCELL.ID melalui WhatsApp untuk mengecek ketersediaan dan proses pembelian.',
  },
  {
    q: 'Apakah tersedia iPhone second atau bekas?',
    a: 'Ya. VINCELL.ID menyediakan pilihan iPhone kondisi second terseleksi dengan pemeriksaan unit menyeluruh sebelum dijual.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const products = [
  { name: 'iPhone 17 Pro Max', storage: '256GB', price: 24999000, slug: 'iphone-17-pro-max', img: '/images/iphone17_transparent.png' },
  { name: 'iPhone 16 Pro Max', storage: '256GB', price: 22499000, slug: 'iphone-16-pro-max', img: '/images/iphone17pm_transparent.png' },
  { name: 'iPhone 15 Pro', storage: '128GB', price: 18999000, slug: 'iphone-15-pro', img: '/images/hero-iphone17-gold.png' },
  { name: 'iPhone 15', storage: '128GB', price: 14299000, slug: 'iphone-15', img: '/images/iphone17_transparent.png' },
];

export const DepokLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const localSchema = buildLocalBusinessSchema({ url: 'https://vincellid.id/jual-beli-iphone-depok' });

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <SeoHead
        title="Jual Beli iPhone Depok | VINCELL.ID"
        description="VINCELL.ID melayani jual beli iPhone di Depok, Beji dan sekitarnya. Temukan iPhone original dan pilihan iPhone second, atau tukarkan iPhone lama melalui layanan Trade In."
        canonicalUrl="https://vincellid.id/jual-beli-iphone-depok"
        jsonLdSchema={localSchema}
      />

      {/* HERO */}
      <section className="relative border-b border-[#262626] py-16 lg:py-24 px-4">
        <div className="absolute inset-0 bg-[#D6A84F]/3 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#D6A84F] bg-[#D6A84F]/10 border border-[#D6A84F]/20 px-3 py-1 rounded-sm">
            <MapPin className="w-3 h-3" />
            <span>VINCELL.ID — DEPOK</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            Jual Beli iPhone<br />
            <span className="text-[#D6A84F]">di Depok</span>
          </h1>

          <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
            Temukan iPhone yang sesuai kebutuhanmu, atau tukarkan perangkat lamamu untuk upgrade berikutnya. VINCELL.ID melayani area Depok, Beji, dan sekitarnya.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/produk"
              onClick={() => trackEvent('ViewContent', { content_name: 'Depok Landing - Lihat Produk' })}
              className="bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-md transition-colors text-center"
            >
              Lihat Produk
            </Link>
            <button
              onClick={() => {
                trackEvent('Contact', { content_name: 'Depok Landing - WhatsApp' });
                openWhatsApp('Halo VINCELL.ID, saya ingin bertanya tentang produk iPhone di Depok.');
              }}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-md transition-colors text-center"
            >
              Chat WhatsApp
            </button>
          </div>
        </div>
      </section>


      {/* PRODUCT SELECTION */}
      <section className="py-16 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">PRODUK TERSEDIA</span>
            <h2 className="text-2xl font-bold text-white mt-1">Pilihan iPhone di VINCELL.ID</h2>
            <p className="text-xs text-gray-400 mt-1">Setiap unit diperiksa menyeluruh sebelum dijual.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map(p => (
              <div
                key={p.slug}
                className="bg-[#101010] border border-[#262626] rounded-md p-5 flex flex-col justify-between hover:border-[#D6A84F] transition-colors group"
              >
                <div onClick={() => navigate(`/produk/${p.slug}`)} className="cursor-pointer space-y-3">
                  <div className="aspect-square flex items-center justify-center p-4 bg-[#080808] rounded-sm">
                    <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 uppercase font-mono">{p.storage}</p>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#D6A84F] transition-colors">{p.name}</h3>
                    <p className="text-xs font-semibold text-[#D6A84F] mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    trackEvent('Contact', { content_name: p.name });
                    openWhatsApp(buildProductWhatsAppMessage({ productName: p.name, storage: p.storage, price: p.price }));
                  }}
                  className="mt-4 w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-[11px] tracking-wider uppercase py-2 rounded-sm transition-colors"
                >
                  Beli via WhatsApp
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/produk" className="text-xs text-[#D6A84F] hover:underline font-semibold uppercase tracking-wider">
              Lihat Semua Produk &rarr;
            </Link>
          </div>
        </div>
      </section>


      {/* WHY VINCELL.ID */}
      <section className="py-16 bg-[#080808] border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">KENAPA VINCELL.ID</span>
            <h2 className="text-2xl font-bold text-white mt-1">Toko iPhone Terpercaya di Depok</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-400">
            {[
              { title: 'Produk Terverifikasi', desc: 'Setiap iPhone diperiksa kondisi fisik, fungsi, dan kesehatan baterai sebelum dijual.' },
              { title: 'Garansi Resmi Tersedia', desc: 'Kami menyediakan unit bergaransi resmi Apple Indonesia maupun unit second terseleksi.' },
              { title: 'Trade In Mudah', desc: 'Tukarkan iPhone lama Anda dengan estimasi transparan langsung via WhatsApp.' },
              { title: 'Berlokasi di Depok', desc: 'Toko fisik di Beji, Depok — bisa dikunjungi langsung untuk melihat unit sebelum membeli.' },
            ].map(item => (
              <div key={item.title} className="border border-[#262626] rounded-md p-5 space-y-2">
                <h3 className="text-xs font-bold text-white">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TRADE IN */}
      <section className="py-16 border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">TRADE IN SERVICE</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Trade In iPhone<br />di Depok
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tukarkan iPhone lama Anda di VINCELL.ID Depok. Proses estimasi cepat dan transparan langsung via WhatsApp, tanpa perlu antre.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs border-t border-[#262626] pt-4">
                {['Estimasi Cepat', 'Proses Mudah', 'Nilai Transparan', 'Tanpa Ribet'].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="text-[#D6A84F] font-mono font-bold text-base">0{i + 1}</span>
                    <span className="text-white font-medium">{s}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/trade-in"
                className="inline-block bg-[#D6A84F] hover:bg-[#F0C66A] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-md transition-colors"
              >
                Mulai Trade In
              </Link>
            </div>
            <div className="flex justify-center">
              <img src="/images/iphone17_transparent.png" alt="Trade In iPhone Depok" className="max-h-72 object-contain" />
            </div>
          </div>
        </div>
      </section>


      {/* STORE LOCATION */}
      <section className="py-16 bg-[#080808] border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">LOKASI TOKO</span>
            <h2 className="text-2xl font-bold text-white mt-1">Kunjungi VINCELL.ID di Depok</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <address className="not-italic space-y-4 text-xs">
              <div>
                <p className="text-sm font-bold text-white">VINCELL.ID</p>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider">Electronics Store</p>
              </div>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D6A84F] shrink-0 mt-0.5" />
                  <span>
                    {CANONICAL_NAP.streetAddress},<br />
                    {CANONICAL_NAP.neighborhood}, {CANONICAL_NAP.district},<br />
                    {CANONICAL_NAP.city}, {CANONICAL_NAP.province} {CANONICAL_NAP.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D6A84F] shrink-0" />
                  <a href={`tel:${CANONICAL_NAP.phone}`} className="hover:text-white transition-colors font-mono">
                    {CANONICAL_NAP.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-[#D6A84F] shrink-0" />
                  <span>4.9 di Google (169 ulasan)</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://maps.app.goo.gl/vincellid"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-xs font-semibold bg-[#D6A84F] hover:bg-[#F0C66A] text-black py-2.5 rounded transition-colors"
                >
                  Google Maps
                </a>
                <a
                  href={`https://wa.me/${CANONICAL_NAP.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-black py-2.5 rounded transition-colors"
                >
                  Chat WhatsApp
                </a>
              </div>
            </address>

            <div className="bg-[#101010] border border-[#262626] rounded-md overflow-hidden">
              <iframe
                title="Lokasi VINCELL.ID Depok"
                src="https://www.google.com/maps/embed/v1/place?key=&q=VINCELL.ID,Beji,Depok"
                width="100%"
                height="240"
                style={{ border: 0, filter: 'grayscale(30%) invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>


      {/* HOW TO PURCHASE */}
      <section className="py-16 border-b border-[#262626]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">CARA BELI</span>
            <h2 className="text-2xl font-bold text-white mt-1">Cara Membeli iPhone</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            {[
              { step: '01', title: 'Pilih Produk', desc: 'Temukan iPhone sesuai kebutuhan di halaman produk.' },
              { step: '02', title: 'Chat WhatsApp', desc: 'Hubungi VINCELL.ID via WhatsApp untuk cek stok.' },
              { step: '03', title: 'Konfirmasi', desc: 'Tim kami akan konfirmasi ketersediaan dan harga.' },
              { step: '04', title: 'Selesai', desc: 'Ambil di toko atau minta dikirim ke seluruh Indonesia.' },
            ].map(s => (
              <div key={s.step} className="space-y-2">
                <span className="text-[#D6A84F] font-mono font-bold text-2xl block">{s.step}</span>
                <h3 className="text-white font-bold">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-16 bg-[#080808] border-b border-[#262626]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-[11px] font-bold tracking-widest text-[#D6A84F] uppercase">FAQ</span>
            <h2 className="text-2xl font-bold text-white mt-1">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#262626] rounded-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 text-xs font-semibold text-white hover:text-[#D6A84F] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-xs text-gray-400 leading-relaxed border-t border-[#262626] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WHATSAPP CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-white">Siap beli iPhone di Depok?</h2>
          <p className="text-xs text-gray-400">
            Hubungi VINCELL.ID sekarang dan dapatkan rekomendasi iPhone terbaik sesuai kebutuhan Anda.
          </p>
          <button
            onClick={() => {
              trackEvent('Lead', { content_name: 'Depok Landing Bottom CTA' });
              openWhatsApp('Halo VINCELL.ID, saya ingin membeli iPhone di Depok. Boleh bantu rekomendasikan?');
            }}
            className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider px-10 py-3.5 rounded-md transition-colors"
          >
            Chat WhatsApp Sekarang
          </button>
          <p className="text-[11px] text-gray-600 pt-2">
            VINCELL.ID &mdash; Jl. Masjid Jami' Al-Huda No.2a, Beji, Depok &mdash;{' '}
            <a href="https://maps.app.goo.gl/vincellid" target="_blank" rel="noreferrer" className="text-[#D6A84F] hover:underline inline-flex items-center gap-1">
              Lihat di Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </section>

    </div>
  );
};
