/** Canonical LocalBusiness / ElectronicsStore structured data for VINCELL.ID */
export const buildLocalBusinessSchema = (overrides?: {
  url?: string;
  googleMapsUrl?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'VINCELL.ID',
  url: overrides?.url || 'https://vincellid.id',
  telephone: '+628990033684',
  address: {
    '@type': 'PostalAddress',
    streetAddress: "Jl. Masjid Jami' Al-Huda No.2a",
    addressLocality: 'Kemiri Muka, Beji',
    addressRegion: 'Jawa Barat',
    postalCode: '16424',
    addressCountry: 'ID',
  },
  hasMap: overrides?.googleMapsUrl || 'https://maps.app.goo.gl/vincellid',
  areaServed: [
    { '@type': 'City', name: 'Depok' },
    { '@type': 'City', name: 'Kota Depok' },
  ],
  servesCuisine: undefined,
});

export const CANONICAL_NAP = {
  businessName: 'VINCELL.ID',
  brand: 'vincellid',
  phone: '0899-0033-684',
  whatsapp: '628990033684',
  streetAddress: "Jl. Masjid Jami' Al-Huda No.2a",
  neighborhood: 'Kemiri Muka',
  district: 'Kecamatan Beji',
  city: 'Kota Depok',
  province: 'Jawa Barat',
  postalCode: '16424',
  fullAddress: "Jl. Masjid Jami' Al-Huda No.2a, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16424",
  country: 'Indonesia',
} as const;
