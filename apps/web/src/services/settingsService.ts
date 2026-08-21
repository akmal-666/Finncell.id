import { ApiResponse } from '@fincell/shared';
import { fetchApi } from './apiClient';

export interface StoreSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  whatsapp_number: string;
  store_address: string;
  operating_hours: string;
  instagram_handle: string;
  homepage_hero_title: string;
  homepage_hero_subtitle: string;
  homepage_cta_text: string;
  footer_tagline: string;
  faq_content: string; // JSON string
  banners_content: string; // JSON string
}

export const DEFAULT_SETTINGS: StoreSettings = {
  store_name: 'fincell.id',
  store_email: 'support@fincell.id',
  store_phone: '(021) 1234-5678',
  whatsapp_number: '6281234567890',
  store_address: 'Ruko Premium Apple Center, Lt. 2, Central Park Mall, Jakarta Barat, 11470',
  operating_hours: 'Senin - Minggu: 09:00 - 21:00 WIB',
  instagram_handle: '@fincell.id',
  homepage_hero_title: 'Temukan iPhone yang tepat untukmu.',
  homepage_hero_subtitle: 'iPhone pilihan dengan kondisi terpercaya, harga kompetitif, dan layanan terbaik di Indonesia.',
  homepage_cta_text: 'Belanja Sekarang',
  footer_tagline: 'Pusat belanja online iPhone & Apple ecosystem terpercaya dengan garansi resmi dan layanan trade-in terbaik.',
  faq_content: JSON.stringify([
    {
      q: 'Apakah seluruh iPhone di fincell.id bergaransi resmi?',
      a: 'Ya, 100% unit bergaransi resmi Apple Indonesia (iBox/Digimap/GDN) atau eks-garansi resmi dengan jaminan garansi toko.',
    },
    {
      q: 'Bagaimana proses layanan Trade In?',
      a: 'Anda dapat mengisi formulir Trade In di situs kami atau langsung menghubungi WhatsApp admin untuk mendapatkan estimasi nilai tukar tambahkan unit lama Anda.',
    },
    {
      q: 'Metode pembayaran apa saja yang didukung?',
      a: 'Kami menerima Pembayaran via Transfer Bank, QRIS, Kartu Kredit 0%, serta Virtual Account resmi.',
    },
  ]),
  banners_content: JSON.stringify([
    {
      id: 'b1',
      title: 'Promo Spesial Trade In iPhone 15',
      subtitle: 'Dapatkan cashback tambahan hingga Rp 1.500.000 untuk tukar tambah unit lama!',
      bg_color: 'from-[#111111] to-[#1A1A1A]',
      cta: 'Tukar Sekarang',
      link: '/trade-in',
    },
  ]),
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
