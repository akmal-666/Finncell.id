import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  return (
    <PageContainer
      title="Hubungi Kami"
      subtitle="Tim layanan pelanggan fincell.id siap membantu pertanyaan produk, pesanan, atau layanan trade-in."
      breadcrumbs={[{ label: 'Hubungi Kami' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#111111]">Informasi Kontak</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#111111]">WhatsApp Official</p>
                  <p className="text-gray-500">0812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#111111]">Email Support</p>
                  <p className="text-gray-500">support@fincell.id</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-[#B88632]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#111111]">Telepon Store</p>
                  <p className="text-gray-500">(021) 1234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#111111]">Alamat Headquarter</p>
                  <p className="text-gray-500">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-[#111111]">Kirim Pesan Direct</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Nama Lengkap" placeholder="Masukkan nama Anda" />
              <Input label="Alamat Email" type="email" placeholder="email@domain.com" />
            </div>
            <Input label="No. WhatsApp / HP" placeholder="0812xxxxxxx" />
            <Textarea label="Pesan Anda" placeholder="Tuliskan pertanyaan atau kebutuhan Anda..." rows={4} />
            <Button variant="primary" size="md" rightIcon={<Send className="w-4 h-4" />}>
              Kirim Pesan
            </Button>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
};
