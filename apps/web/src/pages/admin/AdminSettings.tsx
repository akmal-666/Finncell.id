import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { settingsService, StoreSettings } from '@/services/settingsService';
import { Save, Store, Phone, CreditCard, Mail, MapPin, Instagram } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [storeName, setStoreName] = useState<string>('fincell.id');
  const [whatsapp, setWhatsapp] = useState<string>('6281234567890');
  const [email, setEmail] = useState<string>('support@fincell.id');
  const [phone, setPhone] = useState<string>('(021) 1234-5678');
  const [address, setAddress] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('@fincell.id');

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      if (res.data) {
        setStoreName(res.data.store_name || 'fincell.id');
        setWhatsapp(res.data.whatsapp_number || '6281234567890');
        setEmail(res.data.store_email || 'support@fincell.id');
        setPhone(res.data.store_phone || '(021) 1234-5678');
        setAddress(res.data.store_address || '');
        setInstagram(res.data.instagram_handle || '@fincell.id');
      }
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: Partial<StoreSettings> = {
      store_name: storeName,
      whatsapp_number: whatsapp,
      store_email: email,
      store_phone: phone,
      store_address: address,
      instagram_handle: instagram,
    };

    try {
      const res = await settingsService.updateSettings(payload);
      if (res.success) {
        toast('Pengaturan Toko Disimpan', {
          type: 'success',
          message: 'Informasi identitas toko & kontak official telah diperbarui.',
        });
      }
    } catch {
      toast('Gagal Menyimpan', { type: 'error', message: 'Terjadi kesalahan saat menyimpan pengaturan toko.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer title="Memuat Pengaturan Toko...">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Pengaturan Toko & Platform"
      subtitle="Konfigurasi identitas toko fincell.id, nomor WhatsApp official, email, dan alamat outlet."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Store className="w-4 h-4 text-[#E7B65A]" /> Identitas Toko & Platform
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nama Toko Official *" value={storeName} onChange={(e) => setStoreName(e.target.value)} required />
            <Input label="Domain URL Official *" defaultValue="https://fincell.id" disabled />
          </div>
        </Card>

        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#25D366]" /> Kontak Official & Social Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nomor WhatsApp Order *" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
            <Input label="Email Support Toko *" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Telepon Outlet" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Instagram Handle" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
          </div>
          <Input label="Alamat Headquarter" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Card>

        <Card className="p-6 space-y-4 border border-gray-200 shadow-sm">
          <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#E7B65A]" /> Rekening Pembayaran Bank Official
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="BCA No. Rekening" defaultValue="8830192841" />
            <Input label="BCA Atas Nama" defaultValue="PT FINCELL TEKNOLOGI INDONESIA" />
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" size="md" type="submit" isLoading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
            Simpan Seluruh Pengaturan Toko
          </Button>
        </div>
      </form>
    </PageContainer>
  );
};
