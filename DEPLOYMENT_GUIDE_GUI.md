# 🖱 Panduan Deploy Produksi Versi GUI (Tampilan Browser Tanpa Terminal)

Panduan ini dibuat khusus agar Anda dapat melakukan penyebaran (deployment) platform **fincell.id** secara 100% menggunakan tampilan grafis/browser (GUI Dashboard) di **Cloudflare**, **Backblaze B2**, dan **GitHub**, tanpa perlu menyentuh terminal/command prompt.

---

## 📌 Ringkasan 5 Layanan Utama:
1. **Backblaze B2 Dashboard**: Penyimpanan Foto & Media Toko.
2. **GitHub Web Interface**: Tempat Penyimpanan Kode & Pengaturan Secret.
3. **Cloudflare D1 Dashboard**: Basis Data (Database SQLite Edge).
4. **Cloudflare Workers Dashboard**: Server API Backend.
5. **Cloudflare Pages Dashboard**: Tampilan Website Frontend React.

---

## 📦 BAGIAN 1: Setup Storage Backblaze B2 (Browser)

1. Buka browser dan login ke **[Backblaze B2 Console](https://www.backblaze.com/b2/cloud-storage.html)**.
2. **Buat Bucket Foto**:
   - Di menu sebelah kiri, klik **Buckets**.
   - Klik tombol **Create a Bucket**.
   - **Bucket Name**: Masukkan `fincell-media` (jika sudah ada yang pakai, tambahkan angka contoh: `fincell-media-store`).
   - **Files in Bucket Files Sharing**: Pilih **Public**.
   - Klik **Create a Bucket**.
3. **Buat Kunci Akses (App Key)**:
   - Di menu sebelah kiri, klik **App Keys**.
   - Klik tombol **Add a New Application Key**.
   - **Name of Key**: Isi `fincell-key`.
   - **Allow Access to Bucket(s)**: Pilih `fincell-media`.
   - **Type of Access**: Pilih **Read and Write**.
   - Klik **Create New Key**.
   - ⚠️ **PENTING**: Catat 2 kode ini dari layar browser Anda:
     - `keyID`
     - `applicationKey`

---

## 🔐 BAGIAN 2: Setup Rahasia (Secrets) di GitHub (Browser)

1. Buka repositori GitHub Anda di browser:  
   👉 **[https://github.com/akmal-666/Finncell.id](https://github.com/akmal-666/Finncell.id)**
2. Klik tab **Settings** di bagian atas menu repositori.
3. Di bilah samping kiri, pilih **Secrets and variables** -> klik **Actions**.
4. Klik tombol hijau **New repository secret**.
5. Tambahkan rahasia berikut satu per satu (Isi Nama dan Value, lalu klik **Add secret**):

| Name (Nama Secret) | Value (Isi Nilai) |
| :--- | :--- |
| `B2_KEY_ID` | Tempelkan `keyID` dari Backblaze B2 |
| `B2_APPLICATION_KEY` | Tempelkan `applicationKey` dari Backblaze B2 |
| `B2_BUCKET_NAME` | Isi `fincell-media` |
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare Anda |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID dari Dashboard Cloudflare |

---

## 🗄 BAGIAN 3: Setup Database Cloudflare D1 (Browser)

1. Buka browser dan login ke **[Cloudflare Dashboard](https://dash.cloudflare.com)**.
2. Di menu navigasi kiri, pilih **Workers & Pages** -> lalu klik **D1 Database**.
3. Klik tombol **Create Database**.
   - **Database Name**: Isi `fincell-db-prod`.
   - Klik **Create**.
4. **Catat Database ID**:
   - Setelah dibuat, Anda akan melihat baris **Database ID** (contoh: `f3a8c1d2-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
5. **Jalankan Tabel Database**:
   - Pada halaman database `fincell-db-prod`, klik tab **Console**.
   - Buka file `apps/worker/migrations/0001_initial_schema.sql` dari repositori GitHub Anda, lalu salin seluruh isi teks SQL-nya.
   - Tempelkan (paste) teks SQL tersebut ke dalam kolom Console di Cloudflare Browser, lalu klik **Execute**.
   - ✅ Seluruh tabel database toko siap digunakan!

---

## ⚡ BAGIAN 4: Deploy Worker Backend API (Browser Dashboard)

1. Di Cloudflare Dashboard, pilih menu **Workers & Pages** di bilah kiri.
2. Klik tombol **Create Application** -> pilih tab **Workers** -> klik **Create Worker**.
   - **Name**: Isi `fincell-worker-prod`.
   - Klik **Deploy**.
3. **Hubungkan Database D1 (Binding)**:
   - Masuk ke Worker `fincell-worker-prod` -> klik tab **Settings** -> klik **Bindings**.
   - Klik **Add** -> pilih **D1 Database**.
   - **Variable name**: Isi `DB` (Wajib huruf besar `DB`).
   - **D1 Database**: Pilih `fincell-db-prod`.
   - Klik **Save and deploy**.
4. **Tambahkan Rahasia B2 Storage (Environment Variables)**:
   - Di halaman Worker `fincell-worker-prod` -> klik tab **Settings** -> klik **Variables & Secrets**.
   - Klik **Add** untuk menambahkan Environment Variable/Secret:
     - Key: `B2_KEY_ID` | Value: `(keyID B2)`
     - Key: `B2_APPLICATION_KEY` | Value: `(applicationKey B2)`
     - Key: `B2_BUCKET_NAME` | Value: `fincell-media`
   - Klik **Encrypt & Save**.
5. **Hubungkan Custom Domain API**:
   - Klik tab **Triggers** -> di bagian **Custom Domains**, klik **Add Custom Domain**.
   - Masukkan `api.fincell.id`.
   - Klik **Add Custom Domain**.

---

## 🌐 BAGIAN 5: Deploy Frontend Cloudflare Pages dari GitHub (Browser)

1. Di Cloudflare Dashboard, pilih menu **Workers & Pages** -> klik **Create Application**.
2. Pilih tab **Pages** -> klik tombol **Connect to Git**.
3. Login & pilih akun GitHub `akmal-666` -> pilih repositori **`Finncell.id`** -> klik **Begin setup**.
4. **Konfigurasi Build (Build Settings)**:
   - **Project name**: Isi `fincell-web`
   - **Production branch**: Pilih `main`
   - **Framework preset**: Pilih **Vite**
   - **Build command**: Isi `npm run build`
   - **Build output directory**: Isi `apps/web/dist`
   - **Root directory**: Biarkan kosong `/`
5. **Environment Variables**:
   - Tambahkan variabel:
     - Name: `VITE_API_BASE_URL` | Value: `https://api.fincell.id/api`
     - Name: `VITE_STORE_NAME` | Value: `fincell.id`
6. Klik tombol **Save and Deploy**!
   - ⏳ Cloudflare akan otomatis mengunduh kode dari GitHub, melakukan build, dan merilis website Anda secara otomatis!

7. **Hubungkan Domain Utama Toko (`fincell.id`)**:
   - Setelah deploy selesai, klik tab **Custom domains** di project Pages `fincell-web`.
   - Klik **Set up a custom domain**.
   - Masukkan `fincell.id` -> klik **Continue** -> **Activate domain**.
   - Ulangi langkah di atas untuk domain `www.fincell.id`.

---

## 🌱 BAGIAN 6: Aktivasi Akun Admin Pertama via Browser

1. Buka tab baru di browser Anda dan ketikkan alamat berikut:  
   👉 **`https://api.fincell.id/api/auth/seed`**
2. Layar browser akan menampilkan respon JSON sukses:
   ```json
   {
     "success": true,
     "message": "Super Admin default berhasil dibuat/diperbarui"
   }
   ```
3. Buka Portal Admin Toko Anda di browser:  
   👉 **`https://fincell.id/admin/login`**
4. Masukkan kredensial login default:
   - **Email**: `admin@fincell.id`
   - **Password**: `admin123`
5. 🎉 **Selamat! Anda berhasil masuk ke Admin Dashboard fincell.id!**
