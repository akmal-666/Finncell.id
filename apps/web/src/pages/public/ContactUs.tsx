import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { settingsService, StoreSettings } from '@/services/settingsService';
import { SeoHead } from '@/components/common/SeoHead';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Send
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<StoreSettings | null>(null);

  // Form Fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [topic, setTopic] = useState<string>('Pertanyaan Produk');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      if (res.data) setSettings(res.data);
    });
  }, []);

  const storeName = settings?.store_name || 'fincell.id';
  const whatsappNumber = settings?.whatsapp_number || '6281234567890';
  const emailAddr = settings?.store_email || 'support@fincell.id';
  const phone = settings?.store_phone || '(021) 1234-5678';
  const address = settings?.store_address || 'Ruko Premium Apple Center, Lt. 2, Central Park Mall, Jakarta Barat';
  const hours = settings?.operating_hours || 'Senin - Minggu: 09:00 - 21:00 WIB';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !whatsapp.trim() || !message.trim()) {
      toast('Lengkapi Formulir', { type: 'error', message: 'Nama, No. WhatsApp, dan Pesan wajib diisi!' });
      return;
    }

    const prefilled = `Halo ${storeName},\n\nSaya ingin bertanya mengenai ${topic}.\n\nNama: ${name}\nEmail: ${email || '-'}\nWhatsApp: ${whatsapp}\nTopik: ${topic}\n\nPesan:\n${message}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefilled)}`;

    toast('Pesan Terkirim!', {
      type: 'success',
      message: 'Membuka WhatsApp untuk mengirimkan pesan langsung ke tim customer support...',
    });

    window.open(waUrl, '_blank');
  };

  return (
    <>
      <SeoHead
        title="Hubungi fincell.id — Customer Care"
        description="Hubungi tim layanan pelanggan fincell.id via WhatsApp, email, atau telepon."
        canonicalUrl="https://fincell.id/tentang-kami"
      />

      <PageContainer breadcrumbs={[{ label: 'Hubungi Kami' }]}>
        <div className="max-w-6xl mx-auto py-8">
          
          <div className="mb-12">
            <span className="text-[11px] font-bold text-[#1769E0] uppercase tracking-widest block mb-1">
              LAYANAN PELANGGAN
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#061426] tracking-tight">
              Hubungi fincell.id
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2 max-w-xl">
              Tim spesialis kami siap memberikan bantuan seputar ketersediaan produk, spesifikasi, serta layanan tukar tambah.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Information (Typography & Spacing, No Card Clutter) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-6 text-xs text-[#061426]">
                
                <div className="space-y-1 border-b border-[#DCE5EF] pb-4">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">WHATSAPP OFFICIAL</span>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-bold text-[#1769E0] hover:underline inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> +{whatsappNumber}
                  </a>
                  <p className="text-[#64748B]">Respon cepat 24 jam via WhatsApp</p>
                </div>

                <div className="space-y-1 border-b border-[#DCE5EF] pb-4">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">EMAIL &amp; TELEPON</span>
                  <p className="font-semibold text-sm">{emailAddr}</p>
                  <p className="text-[#64748B]">{phone}</p>
                </div>

                <div className="space-y-1 border-b border-[#DCE5EF] pb-4">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">ALAMAT RETAIL STORE</span>
                  <p className="font-semibold leading-relaxed">{address}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">JAM OPERASIONAL</span>
                  <p className="font-semibold">{hours}</p>
                </div>

              </div>

            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 bg-white border border-[#DCE5EF] p-8 rounded-md space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#061426]">Kirim Pesan</h3>
                <p className="text-xs text-[#64748B] mt-1">Lengkapi data untuk terhubung langsung via sistem pesan kami.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#061426] mb-1">Nama Lengkap *</label>
                    <Input
                      placeholder="Contoh: Budi Santoso"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#061426] mb-1">No. WhatsApp *</label>
                    <Input
                      placeholder="08123456789"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#061426] mb-1">Email (Opsional)</label>
                  <Input
                    placeholder="nama@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#061426] mb-1">Topik Pertanyaan</label>
                  <Select
                    options={[
                      { value: 'Pertanyaan Produk', label: 'Ketersediaan / Stok iPhone' },
                      { value: 'Trade In', label: 'Estimasi Tukar Tambah (Trade In)' },
                      { value: 'Konfirmasi Pesanan', label: 'Status Pesanan & Pengiriman' },
                      { value: 'Garansi & Klaim', label: 'Klaim Garansi & Servis' },
                      { value: 'Kerjasama / Lainnya', label: 'Lainnya' },
                    ]}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#061426] mb-1">Pesan *</label>
                  <Textarea
                    placeholder="Tuliskan detail pertanyaan Anda..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#061426] hover:bg-[#1769E0] text-white font-semibold text-xs tracking-wider uppercase py-3.5 rounded-md transition-colors"
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Kirim Pesan WhatsApp
                </Button>
              </form>
            </div>

          </div>

        </div>
      </PageContainer>
    </>
  );
};
