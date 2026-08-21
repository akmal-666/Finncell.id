# 🚀 Panduan Deploy Produksi (Production Deployment Guide) — fincell.id

Panduan langkah demi langkah ini menjelaskan cara melakukan penyebaran (deployment) platform **fincell.id** ke lingkungan produksi menggunakan **Cloudflare Pages**, **Cloudflare Workers**, **Cloudflare D1 Database**, **Backblaze B2 Storage**, dan **GitHub Actions CI/CD**.

---

## 📋 1. Prasyarat Akun & Peralatan (Prerequisites)

Pastikan Anda telah menyiapkan akun dan peralatan berikut:

1. **Akun Cloudflare**: Berlangganan gratis/pro dengan akses ke Pages, Workers, D1, dan DNS Management.
2. **Akun Backblaze B2**: Untuk penyimpanan media publik (gambar produk, banner, blog, foto trade-in).
3. **Akun GitHub**: Repositori `https://github.com/akmal-666/Finncell.id.git`.
4. **Node.js & pnpm** terinstall di komputer lokal:
   ```bash
   node -v  # Node.js >= 18.0.0 (Disarankan Node 20 LTS)
   pnpm -v  # pnpm >= 8.0.0
   ```
5. **Cloudflare Wrangler CLI**:
   ```bash
   npm install -g wrangler
   wrangler login
   ```

---

## 🗄 2. Setup Cloudflare D1 Database

### 2.1 Buat Database Produksi
Jalankan perintah berikut di terminal:
```bash
npx wrangler d1 create fincell-db-prod
```

Output akan memberikan `database_id`, contoh:
```text
Created database 'fincell-db-prod' with ID 'f3a8c1d2-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
```

### 2.2 Update File `apps/worker/wrangler.json`
Buka file `apps/worker/wrangler.json` dan pastikan `database_id` pada bagian `env.production` sesuai dengan ID di atas:

```json
"production": {
  "name": "fincell-worker-prod",
  "routes": [
    {
      "pattern": "api.fincell.id/*",
      "custom_domain": true
    }
  ],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "fincell-db-prod",
      "database_id": "f3a8c1d2-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "migrations_dir": "migrations"
    }
  ]
}
```

### 2.3 Jalankan Migrasi Skema ke D1 Produksi
```bash
cd apps/worker
npx wrangler d1 migrations apply fincell-db-prod --remote
```

---

## 📦 3. Setup Backblaze B2 Object Storage

1. Masuk ke **Backblaze B2 Console**.
2. Buat **Bucket Baru**:
   - Nama Bucket: `fincell-media` (harus unik global).
   - Akses: **Public** (agar gambar dapat diakses oleh pengunjung toko).
3. Buat **App Key (B2 Application Key)**:
   - Pilih menu **App Keys** -> **Add a New Application Key**.
   - Nama Key: `fincell-worker-key`.
   - Access Type: **Read and Write**.
   - Catat `keyID` dan `applicationKey` yang dihasilkan.
4. Tambahkan kredensial ke Worker Secret (Server-Side saja):
   ```bash
   cd apps/worker
   npx wrangler secret put B2_KEY_ID --env production
   npx wrangler secret put B2_APPLICATION_KEY --env production
   npx wrangler secret put B2_BUCKET_NAME --env production
   ```

---

## 🔐 4. Konfigurasi GitHub Repository Secrets

Masuk ke repositori GitHub:
`https://github.com/akmal-666/Finncell.id` -> **Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**.

Tambahkan rahasia berikut:

| Secret Name | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- |
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare (izin Workers & Pages) | `v1.0-xxxx...` |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID dari Dashboard Cloudflare | `8a9b7c...` |
| `B2_KEY_ID` | Backblaze B2 Key ID | `0058xxxx...` |
| `B2_APPLICATION_KEY` | Backblaze B2 Application Key | `K005xxxx...` |
| `B2_BUCKET_NAME` | Nama Bucket B2 | `fincell-media` |

---

## 🌐 5. Konfigurasi Domain & DNS (Cloudflare Dashboard)

1. **Domain Utama (`fincell.id`)**:
   - Cloudflare Pages Project: `fincell-web`
   - Custom Domain: `fincell.id` & `www.fincell.id` (CNAME ke `fincell-web.pages.dev`).
2. **API Backend (`api.fincell.id`)**:
   - Route Worker: `api.fincell.id/*` -> `fincell-worker-prod`.
   - SSL/TLS Mode: **Full (Strict)**.

---

## 🚀 6. Cara Melakukan Deployment Produksi

### Cara A: Otomatis via GitHub Actions (Disarankan)
Cukup push kode atau merge Pull Request ke cabang `main`:
```bash
git checkout main
git merge develop
git push origin main
```
Pipeline `.github/workflows/deploy.yml` akan otomatis:
1. Menjalankan linting, typecheck, dan unit test.
2. Mengaplikasikan migrasi basis data Cloudflare D1.
3. Deploy Worker API ke `api.fincell.id`.
4. Deploy Frontend React ke Cloudflare Pages (`fincell.id`).

### Cara B: Manual via Terminal (Wrangler CLI)
Jika ingin melakukan deploy manual tanpa GitHub Actions:

```bash
# 1. Install & Build
pnpm install
pnpm run build

# 2. Migrasi Database D1 Produksi
cd apps/worker
npx wrangler d1 migrations apply fincell-db-prod --remote

# 3. Deploy Worker API Produksi
npx wrangler deploy --env production

# 4. Deploy Frontend Cloudflare Pages
cd ../web
npx wrangler pages deploy dist --project-name=fincell-web --branch=main
```

---

## 🌱 7. Seed Akun Admin Pertama (Initial Setup)

Setelah deployment pertama selesai, buat akun Super Admin default dengan mengirim HTTP POST request ke endpoint seed:

```bash
curl -X POST https://api.fincell.id/api/auth/seed
```

- **URL Portal Admin**: `https://fincell.id/admin/login`
- **Email**: `admin@fincell.id`
- **Password**: `admin123` *(Segera ubah kata sandi setelah berhasil login!)*

---

## ⏪ 8. Prosedur Rollback (Darurat)

Jika terjadi masalah pada versi produksi:

### Rollback Worker API Backend:
```bash
cd apps/worker
npx wrangler deployments list --env production
npx wrangler rollback [DEPLOYMENT_ID] --env production
```

### Rollback Frontend Cloudflare Pages:
1. Masuk ke **Cloudflare Dashboard** -> **Workers & Pages** -> **`fincell-web`**.
2. Pilih tab **Deployments**.
3. Cari versi deployment stabil sebelumnya, klik tombol `...` -> **Rollback to this deployment**.

### Rollback Database D1 (Time-Travel Restore):
```bash
npx wrangler d1 time-travel restore fincell-db-prod --timestamp="2026-08-22T00:00:00Z"
```

---

## ✅ 9. Checklist Verifikasi Setelah Deploy (Post-Deployment Check)

- [ ] `https://fincell.id` terbuka dengan indikator HTTPS hijau.
- [ ] Katalog produk dan pencarian berfungsi dengan lancar.
- [ ] Form checkout dapat menggenerasi tautan pesan WhatsApp dengan format yang benar.
- [ ] Portal admin `https://fincell.id/admin/login` dapat menerima login kredensial admin.
- [ ] Upload gambar di `/admin/media` berhasil tersimpan ke Backblaze B2 dan menampilkan pratinjau.
- [ ] Sitemap XML `https://api.fincell.id/api/seo/sitemap` dapat diakses oleh Google Search Console.
