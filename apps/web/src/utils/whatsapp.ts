export interface WhatsAppProductPayload {
  productName: string;
  storage?: string;
  color?: string;
  price?: number;
  slug?: string;
}

export const DEFAULT_WHATSAPP_NUMBER = '6281234567890';

export const getWhatsAppNumber = (): string => {
  return import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
};

export const buildProductWhatsAppMessage = (payload: WhatsAppProductPayload): string => {
  const lines = [
    'Halo vincellid, saya tertarik dengan:',
    '',
    `*${payload.productName}*`,
  ];

  if (payload.storage) {
    lines.push(`Storage: ${payload.storage}`);
  }
  if (payload.color) {
    lines.push(`Warna: ${payload.color}`);
  }
  if (payload.price) {
    lines.push(`Harga: Rp ${payload.price.toLocaleString('id-ID')}`);
  }

  lines.push('');
  lines.push('Apakah produk ini masih tersedia?');

  return lines.join('\n');
};

export const buildTradeInWhatsAppMessage = (payload?: { device?: string; storage?: string; condition?: string }): string => {
  const lines = [
    'Halo vincellid, saya ingin mengajukan Trade In:',
    '',
  ];

  if (payload?.device) {
    lines.push(`Perangkat: ${payload.device}`);
  }
  if (payload?.storage) {
    lines.push(`Storage: ${payload.storage}`);
  }
  if (payload?.condition) {
    lines.push(`Kondisi: ${payload.condition}`);
  }

  lines.push('');
  lines.push('Boleh bantu estimasi nilai trade in dan proses selanjutnya?');

  return lines.join('\n');
};

export const openWhatsApp = (message: string): void => {
  const number = getWhatsAppNumber().replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encodedText}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
