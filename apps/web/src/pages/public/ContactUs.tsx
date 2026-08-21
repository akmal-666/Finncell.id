import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { settingsService, StoreSettings } from '@/services/settingsService';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Send,
  Sparkles,
  CheckCircle2
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
  const instagram = settings?.instagram_handle || '@fincell.id';

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
    <PageContainer
      title="Hubungi Kami"
      subtitle={`Tim layanan pelanggan ${storeName} siap membantu pertanyaan seputar unit iPhone, pemesanan, atau tukar tambah.`}
      breadcrumbs={[{ label: 'Hubungi Kami' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* 1. DYNAMIC CONTACT INFO CARD */}
        <div className="space-y-4">
          <Card className="p-6 space-y-6 border border-gray-200 shadow-sm bg-white">
            <div className="space-y-1">
              <Badge variant="accent" size="sm">Informasi Official</Badge>
              <h3 className="text-lg font-extrabold text-[#111111]">Kontak & Store</h3>
              <p className="text-xs text-gray-500">Hubungi kami melalui berbagai saluran komunikasi resmi.</p>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/50 transition-colors group border border-transparent hover:border-emerald-200"
              >
                <div className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-[#111111] group-hover:text-emerald-700">WhatsApp Support</p>
                  <p className="text-gray-500 font-mono">+{whatsappNumber}</p>
                  <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Respon Cepat 24/7</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${emailAddr}`}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors group border border-transparent hover:border-blue-200"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-[#111111] group-hover:text-blue-700">Email Customer Care</p>
                  <p className="text-gray-500">{emailAddr}</p>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <div className="p-2.5 rounded-xl bg-amber-50 text-[#B88632] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-[#111111]">Telepon Outlet</p>
                  <p className="text-gray-500">{phone}</p>
                </div>
              </div>

              {/* Instagram */}
              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-purple-50/50 transition-colors group border border-transparent hover:border-purple-200"
              >
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-[#111111] group-hover:text-purple-700">Instagram Official</p>
                  <p className="text-gray-500">{instagram}</p>
                </div>
              </a>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-[#111111]">Jam Operasional</p>
                  <p className="text-gray-500">{hours}</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100">
                <div className="p-2.5 rounded-xl bg-gray-200 text-gray-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-extrabold text-[#111111]">Alamat Headquarter</p>
                  <p className="text-gray-500 leading-snug">{address}</p>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* 2. CONTACT FORM */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8 space-y-6 border border-gray-200 shadow-sm bg-white">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#111111]">Kirim Pesan Direct</h3>
              <p className="text-xs text-gray-500">Isi formulir di bawah ini untuk terhubung langsung dengan tim spesialis kami.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Lengkap *"
                  placeholder="Masukkan nama lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Alamat Email"
                  type="email"
                  placeholder="nama@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="No. WhatsApp / HP *"
                  placeholder="081234567890"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />

                <Select
                  label="Topik Pertanyaan *"
                  options={[
                    { value: 'Pertanyaan Produk', label: 'Pertanyaan Unit iPhone' },
                    { value: 'Pemesanan & Payment', label: 'Pemesanan & Pembayaran' },
                    { value: 'Layanan Trade-In', label: 'Layanan Trade In Tukar Tambah' },
                    { value: 'Garansi & Service', label: 'Garansi & Layanan Service' },
                    { value: 'Lainnya', label: 'Topik Lainnya' },
                  ]}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <Textarea
                label="Pesan Anda *"
                placeholder="Tuliskan pertanyaan detail atau tipe iPhone yang sedang Anda cari..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
              />

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Respon instan via WhatsApp Official
                </p>
                <Button variant="primary" size="lg" type="submit" leftIcon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}>
                  Kirim via WhatsApp
                </Button>
              </div>

            </form>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
};
