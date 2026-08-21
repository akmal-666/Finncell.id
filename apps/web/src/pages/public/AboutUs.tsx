import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { settingsService, StoreSettings } from '@/services/settingsService';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Smartphone,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Users,
  CheckCircle2
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      if (res.data) setSettings(res.data);
      setIsLoading(false);
    });
  }, []);

  const storeName = settings?.store_name || 'fincell.id';
  const whatsappNumber = settings?.whatsapp_number || '6281234567890';
  const address = settings?.store_address || 'Ruko Premium Apple Center, Lt. 2, Central Park Mall, Jakarta Barat';
  const hours = settings?.operating_hours || 'Senin - Minggu: 09:00 - 21:00 WIB';

  return (
    <PageContainer
      title={`Tentang ${storeName}`}
      subtitle="Pusat belanja online iPhone & Apple ecosystem terpercaya di Indonesia."
      breadcrumbs={[{ label: 'Tentang Kami' }]}
    >
      <div className="space-y-12 max-w-5xl mx-auto">
        
        {/* 1. BRAND STORY HERO */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#111111] via-[#1A1A1A] to-[#252525] p-8 sm:p-12 text-white overflow-hidden shadow-xl border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E7B65A]/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <Badge variant="accent" size="sm" className="bg-[#E7B65A]/20 text-[#E7B65A] border-[#E7B65A]/30">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Profil Resmi {storeName}
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Pilihan Utama untuk Perangkat Apple Bergaransi Resmi di Indonesia.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              {storeName} didirikan dengan visi utama menyediakan perangkat iPhone dan ekosistem Apple bergaransi resmi dengan transparansi kondisi 100%, harga paling kompetitif, serta kemudahan transaksi online yang aman bagi seluruh masyarakat Indonesia.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Halo%20${encodeURIComponent(storeName)},%20saya%20ingin%20konsultasi%20produk%20iPhone`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="primary" size="md" leftIcon={<MessageCircle className="w-4 h-4" />}>
                  Konsultasi via WhatsApp
                </Button>
              </a>
              <Link to="/produk">
                <Button variant="outline" size="md" className="border-gray-700 text-white hover:bg-white/10" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Lihat Katalog Produk
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. STATS OVERVIEW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 text-center space-y-1 bg-white border border-gray-200 shadow-sm">
            <p className="text-3xl sm:text-4xl font-black text-[#111111]">10.000+</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Unit iPhone Terjual</p>
          </Card>
          <Card className="p-6 text-center space-y-1 bg-white border border-gray-200 shadow-sm">
            <p className="text-3xl sm:text-4xl font-black text-emerald-600">99.8%</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Kepuasan Pelanggan</p>
          </Card>
          <Card className="p-6 text-center space-y-1 bg-white border border-gray-200 shadow-sm">
            <p className="text-3xl sm:text-4xl font-black text-[#B88632]">100%</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Garansi Resmi</p>
          </Card>
          <Card className="p-6 text-center space-y-1 bg-white border border-gray-200 shadow-sm">
            <p className="text-3xl sm:text-4xl font-black text-[#111111]">24/7</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Dukungan WhatsApp</p>
          </Card>
        </div>

        {/* 3. CORE VALUES & PILLARS */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge variant="secondary" size="sm">Nilai Utama</Badge>
            <h2 className="text-2xl font-extrabold text-[#111111]">Mengapa Memilih {storeName}?</h2>
            <p className="text-xs sm:text-sm text-gray-500">Kami mengutamakan kualitas produk, kepastian garansi, dan pengalaman belanja tanpa rasa cemas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 bg-white border border-gray-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#B88632] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#111111]">100% Original & Garansi Resmi</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Seluruh unit iPhone yang kami jual terjamin keasliannya dengan garansi resmi Apple Indonesia (iBox / Digimap / GDN) serta perlindungan garansi toko yang jelas.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-gray-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#111111]">Integritas & Transparansi</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kami memberikan gambaran akurat mengenai kondisi unit, battery health, status garansi, dan kelengkapan kotak tanpa ada hal yang disembunyikan.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-white border border-gray-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#111111]">Layanan Trade-In & Purna Jual</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Nikmati kemudahan tukar tambah iPhone lama dengan harga penilaian tertinggi serta bantuan tim purna jual selama masa pemakaian produk Anda.
              </p>
            </Card>
          </div>
        </div>

        {/* 4. STORE ADDRESS & OPERATING HOURS */}
        <Card className="p-8 bg-gray-50 border border-gray-200 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#111111] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B88632]" /> Headquarter & Store Fisik
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 max-w-xl leading-relaxed font-medium">
                {address}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" /> {hours}
              </p>
            </div>
            
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <Button variant="primary" size="md" leftIcon={<MessageCircle className="w-4 h-4" />}>
                Hubungi Customer Support
              </Button>
            </a>
          </div>
        </Card>

      </div>
    </PageContainer>
  );
};
