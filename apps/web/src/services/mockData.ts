import { Product, Category, Brand, Order, Promo, TradeInSubmission, BlogPost, User } from '@fincell/shared';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'iPhone 15 Series', slug: 'iphone-15-series', description: 'Generasi iPhone terbaru dengan Titanium dan USB-C.', productCount: 8, icon: 'Smartphone' },
  { id: 'cat-2', name: 'iPhone 14 Series', slug: 'iphone-14-series', description: 'Performa Andal dengan Dynamic Island.', productCount: 6, icon: 'Smartphone' },
  { id: 'cat-3', name: 'iPhone 13 Series', slug: 'iphone-13-series', description: 'Hemat & Berkualitas tinggi untuk harian.', productCount: 5, icon: 'Smartphone' },
  { id: 'cat-4', name: 'iPhone SE', slug: 'iphone-se', description: 'Ringkas & Powerful.', productCount: 2, icon: 'Smartphone' },
  { id: 'cat-5', name: 'Aksoris Apple', slug: 'aksesoris', description: 'Charger, MagSafe, Case, AirPods, dan Adaptor Original.', productCount: 15, icon: 'Headphones' },
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'brand-1', name: 'Apple', slug: 'apple', productCount: 30 },
  { id: 'brand-2', name: 'Anker', slug: 'anker', productCount: 8 },
  { id: 'brand-3', name: 'Spigen', slug: 'spigen', productCount: 12 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    brand: 'Apple',
    category: 'iPhone 15 Series',
    categoryId: 'cat-1',
    summary: 'iPhone 15 Pro Max dengan desain titanium yang kuat namun ringan.',
    description: 'iPhone 15 Pro Max membawa material titanium kelas penerbangan, chip A17 Pro berkinerja tinggi, dan sistem kamera Pro paling tangguh.',
    basePrice: 23999000,
    originalPrice: 24999000,
    condition: 'brand_new',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 128,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048132796-7c0064f7b445?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Layar': '6.7 inch Super Retina XDR OLED',
      'Chipset': 'Apple A17 Pro (3nm)',
      'Kamera Utama': '48 MP, f/1.78, 120mm Telephoto 5x',
      'Baterai': 'Hingga 29 jam pemutaran video',
      'Bahan': 'Titanium Frame',
      'Port': 'USB-C (USB 3 hingga 10Gbps)'
    },
    variants: [
      { id: 'var-101', productId: 'prod-1', sku: 'IP15PM-256-NT', storage: '256GB', color: 'Natural Titanium', colorHex: '#9E9992', price: 23999000, originalPrice: 24999000, stock: 15, isAvailable: true },
      { id: 'var-102', productId: 'prod-1', sku: 'IP15PM-512-NT', storage: '512GB', color: 'Natural Titanium', colorHex: '#9E9992', price: 27999000, originalPrice: 28999000, stock: 8, isAvailable: true },
      { id: 'var-103', productId: 'prod-1', sku: 'IP15PM-256-[#050505]', storage: '256GB', color: 'Black Titanium', colorHex: '#212024', price: 23999000, stock: 12, isAvailable: true }
    ],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'iPhone 15',
    slug: 'iphone-15',
    brand: 'Apple',
    category: 'iPhone 15 Series',
    categoryId: 'cat-1',
    summary: 'Dynamic Island dan Kamera 48 MP terbaru.',
    description: 'iPhone 15 dibekali Dynamic Island, kamera utama 48 MP dengan Telefoto 2x, serta desain kaca bagian belakang berwarna cerah.',
    basePrice: 14999000,
    originalPrice: 16499000,
    condition: 'brand_new',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 96,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Layar': '6.1 inch Super Retina XDR OLED',
      'Chipset': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Dual Camera',
      'Port': 'USB-C'
    },
    variants: [
      { id: 'var-201', productId: 'prod-2', sku: 'IP15-128-PK', storage: '128GB', color: 'Pink', colorHex: '#E3C1C7', price: 14999000, originalPrice: 16499000, stock: 20, isAvailable: true },
      { id: 'var-202', productId: 'prod-2', sku: 'IP15-256-BL', storage: '256GB', color: 'Blue', colorHex: '#D2D9E2', price: 17999000, stock: 10, isAvailable: true }
    ],
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-03-02T10:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'iPhone 14',
    slug: 'iphone-14',
    brand: 'Apple',
    category: 'iPhone 14 Series',
    categoryId: 'cat-2',
    summary: 'iPhone 14 dengan baterai tahan lama dan Deteksi Tabrakan.',
    description: 'Sistem dua kamera canggih untuk foto mengagumkan dalam pencahayaan redup maupun terang.',
    basePrice: 11199000,
    originalPrice: 12999000,
    condition: 'brand_new',
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.7,
    reviewCount: 85,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Layar': '6.1 inch Super Retina XDR',
      'Chipset': 'Apple A15 Bionic 5-core GPU',
      'Kamera': '12 MP Dual Camera'
    },
    variants: [
      { id: 'var-301', productId: 'prod-3', sku: 'IP14-128-DP', storage: '128GB', color: 'Midnight', colorHex: '#1D2128', price: 11199000, originalPrice: 12999000, stock: 14, isAvailable: true }
    ],
    createdAt: '2023-11-10T08:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Adaptor Apple 20W USB-C',
    slug: 'adaptor-apple-20w-usbc',
    brand: 'Apple',
    category: 'Aksesoris Apple',
    categoryId: 'cat-5',
    summary: 'Pengisian daya cepat original Apple 20W USB-C Power Adapter.',
    description: 'Nikmati pengisian daya efisien dan cepat di rumah, di kantor, atau di perjalanan.',
    basePrice: 449000,
    originalPrice: 499000,
    condition: 'brand_new',
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      'Daya Output': '20W USB-C',
      'Kompatibilitas': 'iPhone 8 hingga iPhone 15 Series'
    },
    variants: [
      { id: 'var-401', productId: 'prod-4', sku: 'ACC-ADP-20W', storage: 'Standard', color: 'White', colorHex: '#FFFFFF', price: 449000, originalPrice: 499000, stock: 50, isAvailable: true }
    ],
    createdAt: '2023-10-01T08:00:00Z',
    updatedAt: '2024-02-28T10:00:00Z'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'FIN-202403-001',
    customer: {
      name: 'Ahmad Rizky',
      email: 'ahmad.rizky@gmail.com',
      phone: '081298765432',
      address: 'Jl. Sudirman No. 45, Kebayoran Baru',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      notes: 'Tolong packing kayu'
    },
    items: [
      { id: 'item-1', productId: 'prod-1', productName: 'iPhone 15 Pro Max', variantId: 'var-101', sku: 'IP15PM-256-NT', price: 23999000, quantity: 1, color: 'Natural Titanium', storage: '256GB' }
    ],
    subtotal: 23999000,
    discountTotal: 500000,
    shippingFee: 50000,
    total: 23549000,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Bank Transfer BCA',
    createdAt: '2024-03-01T14:30:00Z',
    updatedAt: '2024-03-01T15:00:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'FIN-202403-002',
    customer: {
      name: 'Budi Santoso',
      email: 'budi.santoso@yahoo.com',
      phone: '085712345678',
      address: 'Jl. Gatot Subroto No. 12',
      city: 'Bandung',
      province: 'Jawa Barat',
      postalCode: '40115'
    },
    items: [
      { id: 'item-2', productId: 'prod-4', productName: 'Adaptor Apple 20W USB-C', variantId: 'var-401', sku: 'ACC-ADP-20W', price: 449000, quantity: 2, color: 'White', storage: 'Standard' }
    ],
    subtotal: 898000,
    discountTotal: 0,
    shippingFee: 20000,
    total: 918000,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'QRIS / GoPay',
    trackingNumber: 'JNE1298491823',
    createdAt: '2024-03-02T09:15:00Z',
    updatedAt: '2024-03-02T11:00:00Z'
  }
];

export const MOCK_PROMOS: Promo[] = [
  {
    id: 'prm-1',
    code: 'FINCELL2024',
    title: 'Diskon Spesial launching fincell.id',
    description: 'Potongan Rp 500.000 untuk pembelian iPhone 15 Pro Series.',
    discountType: 'fixed',
    discountValue: 500000,
    minPurchase: 15000000,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    isActive: true,
    usageCount: 42,
    usageLimit: 100
  },
  {
    id: 'prm-2',
    code: 'TRADEIN500K',
    title: 'Extra Cashback Trade In',
    description: 'Tambahan cashback hingga Rp 500.000 untuk tukar tambah.',
    discountType: 'fixed',
    discountValue: 500000,
    minPurchase: 5000000,
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    isActive: true,
    usageCount: 18
  }
];

export const MOCK_TRADEIN: TradeInSubmission[] = [
  {
    id: 'trd-1',
    customerName: 'Dewi Lestari',
    customerPhone: '081399887766',
    customerEmail: 'dewi.lestari@gmail.com',
    deviceModel: 'iPhone 13 Pro',
    storage: '128GB',
    condition: 'Body 95% Mulus, Layar Bening, Fungsi 100%',
    batteryHealth: 88,
    estimatedValue: 9500000,
    status: 'pending',
    createdAt: '2024-03-02T13:00:00Z'
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Tips Merawat Battery Health iPhone Agar Tetap 100%',
    slug: 'tips-merawat-battery-health-iphone',
    excerpt: 'Panduan praktis menjaga kesehatan baterai iPhone Anda dengan kebiasaan pengisian daya yang benar.',
    content: 'Kesehatan baterai (Battery Health) adalah indikator penting kapasitas baterai iPhone dibanding saat baru...',
    author: 'Tim fincell.id',
    coverImage: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop',
    category: 'Edukasi & Tips',
    publishedAt: '2024-02-25T10:00:00Z',
    isPublished: true,
    readTimeMinutes: 5
  },
  {
    id: 'blog-2',
    title: 'Cara Trade In iPhone di fincell.id: Proses Cepat dan Transparan',
    slug: 'cara-trade-in-iphone-fincell-id',
    excerpt: 'Langkah mudah menukarkan iPhone lama Anda ke seri terbaru dengan potongan harga instan.',
    content: 'Ingin upgrade ke iPhone 15 tapi bingung memasarkan unit lama? Layanan Trade-in fincell.id hadir sebagai solusi...',
    author: 'Tim fincell.id',
    coverImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop',
    category: 'Panduan Belanja',
    publishedAt: '2024-03-01T09:00:00Z',
    isPublished: true,
    readTimeMinutes: 4
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Super Admin fincell',
    email: 'admin@fincell.id',
    role: 'super_admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLoginAt: '2024-03-02T14:00:00Z'
  }
];
