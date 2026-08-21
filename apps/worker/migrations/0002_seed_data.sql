-- Cloudflare D1 Database Seed Migration: 0002_seed_data.sql

-- Roles & Super Admin
INSERT OR IGNORE INTO roles (id, name, permissions) VALUES 
('role-super-admin', 'Super Admin', '["*"]'),
('role-staff', 'Staff', '["read:orders", "update:orders", "read:products"]');

INSERT OR IGNORE INTO users (id, name, email, password_hash, role_id) VALUES 
('usr-admin', 'Super Admin fincell', 'admin@fincell.id', '$2a$12$KIXz8XvG...hash', 'role-super-admin');

-- Categories
INSERT OR IGNORE INTO categories (id, name, slug, description, icon) VALUES 
('cat-ip15', 'iPhone 15 Series', 'iphone-15-series', 'Generasi iPhone terbaru dengan Titanium dan USB-C.', 'Smartphone'),
('cat-ip14', 'iPhone 14 Series', 'iphone-14-series', 'Performa Canggih dengan Dynamic Island.', 'Smartphone'),
('cat-ip13', 'iPhone 13 Series', 'iphone-13-series', 'Hemat & Berkualitas tinggi untuk harian.', 'Smartphone'),
('cat-[#111111]', 'iPhone 12 Series', 'iphone-12-series', 'Desain retro datar dengan layar OLED.', 'Smartphone'),
('cat-ipse', 'iPhone SE Series', 'iphone-se-series', 'Performa tinggi dalam ukuran ringkas.', 'Smartphone'),
('cat-acc', 'Aksesoris Apple', 'aksesoris', 'Charger 20W, MagSafe, AirTags, dan Case Original.', 'Headphones');

-- Brands
INSERT OR IGNORE INTO brands (id, name, slug, description) VALUES 
('brand-apple', 'Apple', 'apple', 'Perangkat resmi Apple Indonesia'),
('brand-anker', 'Anker', 'anker', 'Aksesoris charger & kabel pihak ketiga terlisensi'),
('brand-spigen', 'Spigen', 'spigen', 'Casing dan pelindung layar premium');

-- Colors
INSERT OR IGNORE INTO colors (id, name, hex_code) VALUES 
('col-nat-tit', 'Natural Titanium', '#9E9992'),
('col-blk-tit', 'Black Titanium', '#212024'),
('col-blu-tit', 'Blue Titanium', '#2C3440'),
('col-wht-tit', 'White Titanium', '#F2F1ED'),
('col-mid', 'Midnight', '#1D2128'),
('col-stl', 'Starlight', '#F0ECE4'),
('col-pnk', 'Pink', '#E3C1C7'),
('col-blu', 'Blue', '#D2D9E2'),
('col-prp', 'Purple', '#E3D7E8');

-- Storage Options
INSERT OR IGNORE INTO storage_options (id, capacity, sort_order) VALUES 
('stg-128gb', '128GB', 1),
('stg-256gb', '256GB', 2),
('stg-512gb', '512GB', 3),
('stg-1tb', '1TB', 4),
('stg-std', 'Standard', 0);

-- 10+ iPhone Products & Accessories
INSERT OR IGNORE INTO products (id, name, slug, sku, brand_id, category_id, description, short_description, base_price, compare_price, stock, condition, status) VALUES 
('prod-1', 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'IP15PM-BASE', 'brand-apple', 'cat-ip15', 'iPhone 15 Pro Max membawa material titanium kelas penerbangan, chip A17 Pro berkinerja tinggi, dan sistem kamera Pro paling tangguh.', 'Titanium. Kuat. Ringan. Chip A17 Pro.', 23999000, 24999000, 35, 'brand_new', 'active'),

('prod-2', 'iPhone 15 Pro', 'iphone-15-pro', 'IP15P-BASE', 'brand-apple', 'cat-ip15', 'iPhone 15 Pro dilengkapi Action Button terbaru, chip A17 Pro, dan kamera 48 MP utama.', 'Action Button & A17 Pro Chip.', 20999000, 21999000, 25, 'brand_new', 'active'),

('prod-3', 'iPhone 15 Plus', 'iphone-15-plus', 'IP15PLUS-BASE', 'brand-apple', 'cat-ip15', 'Layar 6.7 inch luas dengan Dynamic Island dan daya tahan baterai sepanjang hari.', 'Layar 6.7 inch & Baterai Ekstra.', 17999000, 18999000, 20, 'brand_new', 'active'),

('prod-4', 'iPhone 15', 'iphone-15', 'IP15-BASE', 'brand-apple', 'cat-ip15', 'iPhone 15 dibekali Dynamic Island, kamera utama 48 MP, serta port USB-C.', 'Dynamic Island & Kamera 48MP USB-C.', 14999000, 16499000, 30, 'brand_new', 'active'),

('prod-5', 'iPhone 14 Pro Max', 'iphone-14-pro-max', 'IP14PM-BASE', 'brand-apple', 'cat-ip14', 'iPhone 14 Pro Max dengan Dynamic Island pertama, layar Always-On, dan A16 Bionic.', 'Dynamic Island Pertama & A16 Bionic.', 18999000, 20999000, 15, 'brand_new', 'active'),

('prod-6', 'iPhone 14 Pro', 'iphone-14-pro', 'IP14P-BASE', 'brand-apple', 'cat-ip14', 'Performa kamera 48 MP Pro dalam ukuran layar 6.1 inch yang ringkas.', 'Kamera 48MP Pro & Dynamic Island.', 16499000, 18499000, 12, 'brand_new', 'active'),

('prod-7', 'iPhone 14', 'iphone-14', 'IP14-BASE', 'brand-apple', 'cat-ip14', 'Sistem dua kamera canggih untuk foto mengagumkan dalam berbagai kondisi cahaya.', 'Deteksi Tabrakan & Dua Kamera.', 11199000, 12999000, 40, 'brand_new', 'active'),

('prod-8', 'iPhone 13', 'iphone-13', 'IP13-BASE', 'brand-apple', 'cat-ip13', 'iPhone 13 favorit dengan chip A15 Bionic super cepat dan Mode Sinematik.', 'Super Retina XDR & Cinema Mode.', 9999000, 11999000, 50, 'brand_new', 'active'),

('prod-9', 'iPhone 12', 'iphone-12', 'IP12-BASE', 'brand-apple', 'cat-[#111111]', 'Layar OLED Super Retina XDR dan dukungan jaringan 5G.', 'Layar OLED & 5G Speed.', 7999000, 9499000, 18, 'brand_new', 'active'),

('prod-10', 'iPhone SE Gen 3 (2022)', 'iphone-se-gen-3', 'IPSE3-BASE', 'brand-apple', 'cat-ipse', 'Performa chip A15 Bionic dalam desain klasik Tombol Utama Touch ID.', 'A15 Bionic & Touch ID.', 6499000, 7299000, 10, 'brand_new', 'active'),

('prod-11', 'Adaptor Apple 20W USB-C', 'adaptor-apple-20w-usbc', 'ACC-ADP-20W', 'brand-apple', 'cat-acc', 'Power Adapter 20W USB-C original Apple untuk pengisian cepat.', 'Charger Cepat Original Apple 20W.', 449000, 499000, 100, 'brand_new', 'active'),

('prod-12', 'Kabel Apple USB-C to Woven (1m)', 'kabel-usbc-woven-1m', 'ACC-CBL-1M', 'brand-apple', 'cat-acc', 'Kabel rajut premium USB-C original Apple.', 'Kabel USB-C Rajut Original.', 349000, 399000, 80, 'brand_new', 'active');

-- Product Variants
INSERT OR IGNORE INTO product_variants (id, product_id, storage_id, color_id, sku, price, stock) VALUES 
('var-101', 'prod-1', 'stg-256gb', 'col-nat-tit', 'IP15PM-256-NAT', 23999000, 15),
('var-102', 'prod-1', 'stg-512gb', 'col-nat-tit', 'IP15PM-512-NAT', 27999000, 10),
('var-103', 'prod-1', 'stg-1tb', 'col-blk-tit', 'IP15PM-1TB-BLK', 31999000, 5),
('var-201', 'prod-2', 'stg-128gb', 'col-blu-tit', 'IP15P-128-BLU', 20999000, 15),
('var-202', 'prod-2', 'stg-256gb', 'col-wht-tit', 'IP15P-256-WHT', 23499000, 10),
('var-401', 'prod-4', 'stg-128gb', 'col-pnk', 'IP15-128-PNK', 14999000, 20),
('var-402', 'prod-4', 'stg-256gb', 'col-blu', 'IP15-256-BLU', 17999000, 10),
('var-701', 'prod-7', 'stg-128gb', 'col-mid', 'IP14-128-MID', 11199000, 25),
('var-801', 'prod-8', 'stg-128gb', 'col-stl', 'IP13-128-STL', 9999000, 30),
('var-1101', 'prod-11', 'stg-std', 'col-wht-tit', 'ACC-ADP-20W-STD', 449000, 100);

-- Product Images
INSERT OR IGNORE INTO product_images (id, product_id, url, is_primary, sort_order) VALUES 
('img-1', 'prod-1', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', 1, 0),
('img-2', 'prod-2', 'https://images.unsplash.com/photo-1695048132796-7c0064f7b445?q=80&w=800&auto=format&fit=crop', 1, 0),
('img-4', 'prod-4', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', 1, 0),
('img-11', 'prod-11', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop', 1, 0);

-- System Settings
INSERT OR IGNORE INTO settings (key, value) VALUES 
('store_name', 'fincell.id'),
('store_domain', 'https://fincell.id'),
('whatsapp_number', '6281234567890'),
('contact_email', 'support@fincell.id'),
('bca_account_number', '8830192841'),
('bca_account_name', 'PT FINCELL TEKNOLOGI INDONESIA');
