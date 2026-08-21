import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Save, Store, Phone, CreditCard } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <PageContainer
      title="Pengaturan Toko & Platform"
      subtitle="Konfigurasi identitas toko fincell.id, nomor WhatsApp official, dan rekening pembayaran."
    >
      <div className="space-y-6 max-w-4xl">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Store className="w-4 h-4 text-[#E7B65A]" /> Identitas Toko
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nama Toko *" defaultValue="fincell.id" />
            <Input label="Domain Official *" defaultValue="https://fincell.id" />
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#25D366]" /> Kontak & WhatsApp Direct
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nomor WhatsApp Order *" defaultValue="6281234567890" />
            <Input label="Email Support Toko *" defaultValue="support@fincell.id" />
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#E7B65A]" /> Rekening Pembayaran Bank
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="BCA No. Rekening" defaultValue="8830192841" />
            <Input label="BCA Atas Nama" defaultValue="PT FINCELL TEKNOLOGI INDONESIA" />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Simpan Seluruh Pengaturan
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};
