import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { settingsService, StoreSettings } from '@/services/settingsService';
import { Save, Store, Phone, Mail, MapPin, Map, Star } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // General
  const [storeName, setStoreName] = useState('VINCELL.ID');
  const [email, setEmail] = useState('info@vincellid.id');
  const [instagram, setInstagram] = useState('@vincellid');

  // Contact
  const [phone, setPhone] = useState('0899-0033-684');
  const [whatsapp, setWhatsapp] = useState('628990033684');

  // Address / NAP
  const [address, setAddress] = useState("Jl. Masjid Jami' Al-Huda No.2a, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16424");
  const [city, setCity] = useState('Depok');
  const [district, setDistrict] = useState('Beji');
  const [postalCode, setPostalCode] = useState('16424');
  const [operatingHours, setOperatingHours] = useState('Senin - Minggu: 09:00 - 21:00 WIB');

  // Google / Local SEO
  const [googleMapsUrl, setGoogleMapsUrl] = useState('https://maps.app.goo.gl/vincellid');
  const [googleBusinessProfileUrl, setGoogleBusinessProfileUrl] = useState('https://g.page/vincellid');
  const [googleRating, setGoogleRating] = useState('4.9');
  const [googleReviewCount, setGoogleReviewCount] = useState('169');
  const [googleReviewUrl, setGoogleReviewUrl] = useState('https://g.page/r/vincellid/review');

  useEffect(() => {
    settingsService.getSettings().then((res) => {
      if (res.data) {
        const d = res.data;
        setStoreName(d.store_name || 'VINCELL.ID');
        setEmail(d.store_email || 'info@vincellid.id');
        setInstagram(d.instagram_handle || '@vincellid');
        setPhone(d.store_phone || '0899-0033-684');
        setWhatsapp(d.whatsapp_number || '628990033684');
        setAddress(d.store_address || '');
        setCity(d.store_city || 'Depok');
        setDistrict(d.store_district || 'Beji');
        setPostalCode(d.store_postal_code || '16424');
        setOperatingHours(d.operating_hours || 'Senin - Minggu: 09:00 - 21:00 WIB');
        setGoogleMapsUrl(d.google_maps_url || '');
        setGoogleBusinessProfileUrl(d.google_business_profile_url || '');
        setGoogleRating(d.google_rating || '4.9');
        setGoogleReviewCount(d.google_review_count || '169');
        setGoogleReviewUrl(d.google_review_url || '');
      }
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload: Partial<StoreSettings> = {
      store_name: storeName,
      store_email: email,
      instagram_handle: instagram,
      store_phone: phone,
      whatsapp_number: whatsapp,
      store_address: address,
      store_city: city,
      store_district: district,
      store_postal_code: postalCode,
      operating_hours: operatingHours,
      google_maps_url: googleMapsUrl,
      google_business_profile_url: googleBusinessProfileUrl,
      google_rating: googleRating,
      google_review_count: googleReviewCount,
      google_review_url: googleReviewUrl,
    };
    try {
      const res = await settingsService.updateSettings(payload);
      if (res.success) {
        toast('Pengaturan Disimpan', { type: 'success', message: 'Informasi toko berhasil diperbarui.' });
      }
    } catch {
      toast('Gagal Menyimpan', { type: 'error', message: 'Terjadi kesalahan saat menyimpan pengaturan.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageContainer title="Memuat Pengaturan...">
        <Card className="p-6 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Pengaturan Toko"
      subtitle="Kelola identitas bisnis, NAP, dan data Google Business Profile VINCELL.ID."
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

        {/* General Info */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
            <Store className="w-4 h-4 text-[#D6A84F]" />
            <span>Identitas Toko</span>
          </div>
          <Input label="Nama Bisnis (Google Business Profile)" value={storeName} onChange={e => setStoreName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Instagram Handle" value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@vincellid" />
        </Card>

        {/* Contact */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
            <Phone className="w-4 h-4 text-[#D6A84F]" />
            <span>Kontak</span>
          </div>
          <Input label="Nomor Telepon (ditampilkan di website)" value={phone} onChange={e => setPhone(e.target.value)} placeholder="0899-0033-684" />
          <Input label="Nomor WhatsApp (format internasional, tanpa +)" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="628990033684" />
        </Card>

        {/* Address / NAP */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
            <MapPin className="w-4 h-4 text-[#D6A84F]" />
            <span>Alamat Toko (NAP)</span>
          </div>
          <Input label="Alamat Lengkap" value={address} onChange={e => setAddress(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Kota" value={city} onChange={e => setCity(e.target.value)} />
            <Input label="Kecamatan / Kelurahan" value={district} onChange={e => setDistrict(e.target.value)} />
          </div>
          <Input label="Kode Pos" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
          <Input label="Jam Operasional" value={operatingHours} onChange={e => setOperatingHours(e.target.value)} placeholder="Senin - Minggu: 09:00 - 21:00 WIB" />
        </Card>

        {/* Google Business Profile */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
            <Map className="w-4 h-4 text-[#D6A84F]" />
            <span>Google Business Profile</span>
          </div>
          <Input
            label="Google Maps URL"
            value={googleMapsUrl}
            onChange={e => setGoogleMapsUrl(e.target.value)}
            placeholder="https://maps.app.goo.gl/..."
          />
          <Input
            label="Google Business Profile URL"
            value={googleBusinessProfileUrl}
            onChange={e => setGoogleBusinessProfileUrl(e.target.value)}
            placeholder="https://g.page/..."
          />
          <Input
            label="URL Halaman Review Google"
            value={googleReviewUrl}
            onChange={e => setGoogleReviewUrl(e.target.value)}
            placeholder="https://g.page/r/.../review"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase">Rating Google</label>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#D6A84F]" />
                <input
                  type="text"
                  value={googleRating}
                  onChange={e => setGoogleRating(e.target.value)}
                  placeholder="4.9"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D6A84F]"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase">Jumlah Ulasan Google</label>
              <input
                type="text"
                value={googleReviewCount}
                onChange={e => setGoogleReviewCount(e.target.value)}
                placeholder="169"
                className="w-full border border-gray-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D6A84F]"
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Nilai rating dan jumlah ulasan harus diperbarui secara manual sesuai kondisi aktual Google Business Profile. Jangan mengisi nilai palsu.
          </p>
        </Card>

        <Button type="submit" variant="primary" isLoading={isSubmitting} leftIcon={<Save className="w-4 h-4" />}>
          Simpan Pengaturan
        </Button>
      </form>
    </PageContainer>
  );
};
