import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { settingsService, StoreSettings } from '@/services/settingsService';
import {
  Save,
  Sparkles,
  HelpCircle,
  Layout,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Plus,
  Trash2,
  Share2
} from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const AdminContentPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Content Fields
  const [heroTitle, setHeroTitle] = useState<string>('');
  const [heroSubtitle, setHeroSubtitle] = useState<string>('');
  const [heroCtaText, setHeroCtaText] = useState<string>('');
  const [footerTagline, setFooterTagline] = useState<string>('');

  // Contact Info
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');

  // FAQs
  const [faqs, setFaqs] = useState<FaqItem[]>([
    { q: 'Apakah seluruh iPhone bergaransi resmi?', a: 'Ya, 100% unit bergaransi resmi Apple Indonesia atau garansi toko terpercaya.' },
  ]);

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      if (res.data) {
        const s = res.data;
        setHeroTitle(s.homepage_hero_title || '');
        setHeroSubtitle(s.homepage_hero_subtitle || '');
        setHeroCtaText(s.homepage_cta_text || 'Belanja Sekarang');
        setFooterTagline(s.footer_tagline || '');
        setWhatsapp(s.whatsapp_number || '');
        setEmail(s.store_email || '');
        setPhone(s.store_phone || '');
        setAddress(s.store_address || '');
        setHours(s.operating_hours || '');
        setInstagram(s.instagram_handle || '');

        if (s.faq_content) {
          try {
            const parsed = JSON.parse(s.faq_content);
            if (Array.isArray(parsed)) setFaqs(parsed);
          } catch {
            // fallback
          }
        }
      }
      setIsLoading(false);
    });
  }, []);

  const handleAddFaq = () => {
    setFaqs(prev => [...prev, { q: '', a: '' }]);
  };

  const handleFaqChange = (index: number, field: 'q' | 'a', value: string) => {
    setFaqs(prev => {
      const list = [...prev];
      list[index][field] = value;
      return list;
    });
  };

  const handleDeleteFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: Partial<StoreSettings> = {
      homepage_hero_title: heroTitle,
      homepage_hero_subtitle: heroSubtitle,
      homepage_cta_text: heroCtaText,
      footer_tagline: footerTagline,
      whatsapp_number: whatsapp,
      store_email: email,
      store_phone: phone,
      store_address: address,
      operating_hours: hours,
      instagram_handle: instagram,
      faq_content: JSON.stringify(faqs),
    };

    try {
      const res = await settingsService.updateSettings(payload);
      if (res.success) {
        toast('Konten Beranda & Informasi Berhasil Disimpan', {
          type: 'success',
          message: 'Seluruh teks banner, FAQ, dan info kontak publik telah diperbarui.',
        });
      }
    } catch {
      toast('Gagal Menyimpan', { type: 'error', message: 'Terjadi kesalahan saat menyimpan pengaturan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer title="Memuat Konten CMS...">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Manajemen Konten CMS & Informasi Toko"
      subtitle="Kelola teks banner beranda, headline hero, daftar FAQ, informasi kontak, dan footer toko."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        
        {/* 1. HOMEPAGE HERO SECTION */}
        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Layout className="w-4 h-4 text-[#E7B65A]" /> Banner Hero Beranda Utama
          </h3>

          <Input
            label="Headline Utama (Hero Title) *"
            placeholder="Temukan iPhone yang tepat untukmu."
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            required
          />

          <Textarea
            label="Sub-Headline / Deskripsi Pendukung *"
            placeholder="iPhone pilihan dengan kondisi terpercaya, harga kompetitif, dan layanan terbaik."
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            rows={3}
            required
          />

          <Input
            label="Teks Tombol CTA Primary *"
            placeholder="Belanja Sekarang"
            value={heroCtaText}
            onChange={(e) => setHeroCtaText(e.target.value)}
          />
        </Card>

        {/* 2. CONTACT & BUSINESS INFORMATION */}
        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600" /> Informasi Kontak & Jam Operasional (Dinamis)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nomor WhatsApp Direct *"
              placeholder="6281234567890"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              leftIcon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
              required
            />

            <Input
              label="Email Support *"
              placeholder="support@fincell.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-blue-600" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telepon Store"
              placeholder="(021) 1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4 text-[#B88632]" />}
            />

            <Input
              label="Instagram Handle"
              placeholder="@fincell.id"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              leftIcon={<Instagram className="w-4 h-4 text-purple-600" />}
            />
          </div>

          <Input
            label="Jam Operasional Toko"
            placeholder="Senin - Minggu: 09:00 - 21:00 WIB"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            leftIcon={<Clock className="w-4 h-4 text-emerald-600" />}
          />

          <Textarea
            label="Alamat Lengkap Outlet / Headquarter *"
            placeholder="Ruko Premium Apple Center, Lt. 2, Central Park Mall, Jakarta Barat..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
          />
        </Card>

        {/* 3. FAQ MANAGEMENT */}
        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" /> Daftar Pertanyaan Umum (FAQ)
            </h3>
            <Button variant="secondary" size="sm" type="button" onClick={handleAddFaq} leftIcon={<Plus className="w-4 h-4" />}>
              Tambah Pertanyaan
            </Button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 relative group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#111111]">Pertanyaan #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(idx)}
                    className="p-1 text-rose-500 hover:text-rose-700"
                    title="Hapus FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Input
                  placeholder="Contoh: Apakah seluruh iPhone bergaransi resmi?"
                  value={faq.q}
                  onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                />

                <Textarea
                  placeholder="Jawaban rinci..."
                  value={faq.a}
                  onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* 4. FOOTER & SOCIAL LINKS */}
        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-600" /> Footer & Social Links
          </h3>

          <Textarea
            label="Tagline Footer Toko"
            placeholder="Pusat belanja online iPhone & Apple ecosystem terpercaya dengan garansi resmi dan layanan trade-in terbaik."
            value={footerTagline}
            onChange={(e) => setFooterTagline(e.target.value)}
            rows={2}
          />
        </Card>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-end pt-2">
          <Button variant="primary" size="md" type="submit" isLoading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
            Simpan Seluruh Perubahan CMS
          </Button>
        </div>

      </form>
    </PageContainer>
  );
};
