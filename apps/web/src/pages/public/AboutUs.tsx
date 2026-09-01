import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/Button';
import { settingsService, StoreSettings } from '@/services/settingsService';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/components/common/SeoHead';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Smartphone,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      if (res.data) setSettings(res.data);
    });
  }, []);

  const storeName = settings?.store_name || 'vincellid';
  const whatsappNumber = settings?.whatsapp_number || '6281234567890';
  const address = settings?.store_address || 'Ruko Premium Apple Center, Lt. 2, Central Park Mall, Jakarta Barat';
  const hours = settings?.operating_hours || 'Senin - Minggu: 09:00 - 21:00 WIB';

  return (
    <>
      <SeoHead
        title={`Tentang ${storeName} — Independent Apple Retailer`}
        description="Pusat retail independen iPhone & ekosistem Apple terpercaya di Indonesia."
        canonicalUrl="https://vincellid/tentang-kami"
      />

      <PageContainer breadcrumbs={[{ label: 'Tentang Kami' }]}>
        <div className="space-y-12 max-w-5xl mx-auto">
          
          {/* 1. BRAND STORY HERO (Editorial Deep Navy #061426) */}
          <div className="rounded-md bg-[#061426] p-8 sm:p-12 text-white border border-[#0B1F3A]">
            <div className="max-w-3xl space-y-6">
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#5EA7FF] block">
                PROFIL RESMI {storeName}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                Pilihan Utama untuk Perangkat Apple Bergaransi Resmi di Indonesia.
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {storeName} didirikan dengan visi utama menyediakan perangkat iPhone dan ekosistem Apple bergaransi resmi dengan transparansi kondisi 100%, harga paling kompetitif, serta kemudahan transaksi online yang aman bagi seluruh masyarakat Indonesia.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Halo%20${encodeURIComponent(storeName)},%20saya%20ingin%20konsultasi%20produk%20iPhone`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button size="md" className="bg-[#1769E0] hover:bg-[#1769E0]/90 text-white font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-md" leftIcon={<MessageCircle className="w-4 h-4" />}>
                    Konsultasi via WhatsApp
                  </Button>
                </a>
                <Link to="/produk">
                  <Button size="md" className="border border-white/20 text-slate-300 hover:text-white hover:border-white/40 font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Lihat Katalog Produk
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. 4 CORE PILLARS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-md border border-[#DCE5EF] space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#1769E0]" />
              <h3 className="text-sm font-bold text-[#061426]">100% Garansi Resmi</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Seluruh perangkat yang kami sediakan dijamin memiliki nomor seri asli dan terdaftar di iBox / Digimap.
              </p>
            </div>

            <div className="p-6 bg-white rounded-md border border-[#DCE5EF] space-y-3">
              <Award className="w-6 h-6 text-[#1769E0]" />
              <h3 className="text-sm font-bold text-[#061426]">Transparansi Penuh</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Informasi kondisi unit, battery health, dan kelengkapan disampaikan secara akurat tanpa manipulasi.
              </p>
            </div>

            <div className="p-6 bg-white rounded-md border border-[#DCE5EF] space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#1769E0]" />
              <h3 className="text-sm font-bold text-[#061426]">Layanan Purnajual</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Tim spesialis kami selalu siap membantu klaim garansi, bantuan teknis, dan saran penggunaan.
              </p>
            </div>

            <div className="p-6 bg-white rounded-md border border-[#DCE5EF] space-y-3">
              <Smartphone className="w-6 h-6 text-[#1769E0]" />
              <h3 className="text-sm font-bold text-[#061426]">Tukar Tambah Cepat</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Layanan Trade In dengan taksiran harga wajar untuk mendukung upgrade perangkat secara efisien.
              </p>
            </div>
          </div>

          {/* 3. STORE LOCATION */}
          <div className="p-8 bg-white border border-[#DCE5EF] rounded-md space-y-4">
            <h3 className="text-lg font-bold text-[#061426]">Lokasi Store Official</h3>
            <p className="text-xs text-[#64748B]">{address}</p>
            <p className="text-xs text-[#64748B]">{hours}</p>
          </div>

        </div>
      </PageContainer>
    </>
  );
};
