import { ApiResponse } from '@fincell/shared';
import { fetchApi } from './apiClient';

export interface StoreSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  whatsapp_number: string;
  store_address: string;
  store_city: string;
  store_district: string;
  store_postal_code: string;
  operating_hours: string;
  instagram_handle: string;
  google_maps_url: string;
  google_business_profile_url: string;
  google_rating: string;
  google_review_count: string;
  google_review_url: string;
  homepage_hero_title: string;
  homepage_hero_subtitle: string;
  homepage_cta_text: string;
  footer_tagline: string;
  faq_content: string; // JSON string
  banners_content: string; // JSON string
}

export const DEFAULT_SETTINGS: StoreSettings = {
  store_name: 'VINCELL.ID',
  store_email: 'info@vincellid.id',
  store_phone: '0899-0033-684',
  whatsapp_number: '628990033684',
  store_address: "Jl. Masjid Jami' Al-Huda No.2a, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16424",
  store_city: 'Depok',
  store_district: 'Beji',
  store_postal_code: '16424',
  operating_hours: 'Senin - Minggu: 09:00 - 21:00 WIB',
  instagram_handle: '@vincellid',
  google_maps_url: 'https://maps.app.goo.gl/vincellid',
  google_business_profile_url: 'https://g.page/vincellid',
  google_rating: '4.9',
  google_review_count: '169',
  google_review_url: 'https://g.page/r/vincellid/review',
  homepage_hero_title: 'Jual Beli iPhone di Depok',
  homepage_hero_subtitle: 'Temukan iPhone original pilihan, aksesoris resmi, dan layanan Trade In dengan proses mudah di vincellid.',
  homepage_cta_text: 'Lihat Produk',
  footer_tagline: 'Retailer iPhone independen di Depok. Garansi resmi, Trade In mudah, pengiriman ke seluruh Indonesia.',
  faq_content: JSON.stringify([
    {
      q: 'Apakah VINCELL.ID melayani jual beli iPhone di Depok?',
      a: "Ya. VINCELL.ID melayani kebutuhan jual beli iPhone di area Depok, khususnya Beji dan Kemiri Muka.",
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
  ]),
  banners_content: JSON.stringify([]),
};

export const settingsService = {
  async getSettings(): Promise<ApiResponse<StoreSettings>> {
    try {
      const res = await fetchApi<Record<string, string>>('/settings');
      if (res.success && res.data && Object.keys(res.data).length > 0) {
        const merged: StoreSettings = {
          ...DEFAULT_SETTINGS,
          ...res.data,
        };
        return { success: true, data: merged };
      }
    } catch {
      // fallback
    }

    return {
      success: true,
      data: DEFAULT_SETTINGS,
    };
  },

  async updateSettings(payload: Partial<StoreSettings>): Promise<ApiResponse<StoreSettings>> {
    try {
      const res = await fetchApi<Record<string, string>>('/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.success && res.data) {
        const merged: StoreSettings = {
          ...DEFAULT_SETTINGS,
          ...res.data,
        };
        return { success: true, message: 'Pengaturan toko berhasil disimpan', data: merged };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal menyimpan pengaturan toko', data: DEFAULT_SETTINGS };
    }

    return { success: true, message: 'Pengaturan diperbarui (local)', data: { ...DEFAULT_SETTINGS, ...payload } };
  },
};
