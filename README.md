# 📊 Dashboard Ekonomi Digital Kabupaten Tabanan
**Badan Pusat Statistik (BPS) Kabupaten Tabanan**

Sistem Informasi Pendataan Usaha Ekonomi Digital berbasis Next.js + Supabase.

---

## 🚀 Cara Setup & Menjalankan

### 1. Prasyarat
- Node.js 18+ ([download](https://nodejs.org))
- Akun Supabase ([daftar gratis](https://supabase.com))

---

### 2. Setup Supabase

#### a. Buat Project Baru di Supabase
- Buka [app.supabase.com](https://app.supabase.com)
- Klik **New Project**
- Isi nama project: `ekonomi-digital-tabanan`
- Pilih region terdekat (Singapore)

#### b. Jalankan SQL Schema
- Di dashboard Supabase, buka **SQL Editor**
- Copy seluruh isi file `supabase_schema.sql`
- Paste dan klik **Run**

#### c. Aktifkan Auth Email
- Buka **Authentication** → **Providers**
- Pastikan **Email** sudah enabled
- Buka **Authentication** → **Users**
- Klik **Add User** untuk membuat akun pengguna

#### d. Ambil Credentials
- Buka **Settings** → **API**
- Copy: **Project URL** dan **anon/public key**

---

### 3. Setup Project

```bash
# Clone atau ekstrak folder project
cd dashboard-ekonomi-digital

# Install dependencies
npm install

# Buat file environment
cp .env.local.example .env.local
```

Edit file `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Buka browser: **http://localhost:3000**

---

## 📁 Struktur Project

```
src/
├── app/
│   ├── login/          # Halaman login
│   ├── dashboard/      # Dashboard statistik
│   └── daftar-usaha/   # Daftar & manajemen usaha
├── components/
│   ├── Sidebar.tsx     # Navigasi sidebar
│   ├── FormTambahUsaha.tsx  # Form input usaha (6 step)
│   └── GeotagMap.tsx   # Komponen peta Leaflet
├── data/
│   ├── kbli2025.ts     # Data KBLI 2025 (bertahap)
│   └── wilayah.ts      # Data wilayah Indonesia
└── lib/
    └── supabase.ts     # Supabase client
```

---

## 🔑 Fitur Utama

### Login
- Autentikasi via Supabase Auth
- Session management otomatis
- Redirect otomatis setelah login/logout

### Dashboard
- Statistik total usaha, kelas, cakupan pasar
- Grafik distribusi KBLI
- Top kecamatan berdasarkan jumlah usaha
- Real-time update dari Supabase

### Daftar Usaha
- Tabel lengkap dengan pagination
- Filter berdasarkan kelas usaha & cakupan pasar
- Pencarian nama usaha/pemilik/kecamatan
- Detail usaha (modal)
- Hapus usaha (soft delete)
- Link ke Google Maps

### Form Tambah Usaha (6 Langkah)
1. **Data Dasar**: Nama pemilik & nama usaha
2. **KBLI 2025**: Dropdown bertahap (Kategori → Kelompok 5 digit)
3. **Lokasi**: Dropdown Provinsi → Kab/Kota → Kec → Desa → SLS → Sub SLS manual
4. **Geotagging**: GPS otomatis + peta interaktif (bisa klik/drag marker)
5. **Platform Digital**: Multi platform + nama akun (bisa tambah lebih dari 1)
6. **Klasifikasi**: Kelas usaha (Mikro/Kecil/Menengah) + Cakupan pasar

---

## 📦 Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Next.js | 14 | Framework React |
| TypeScript | 5 | Type safety |
| Supabase | 2.x | Database + Auth |
| Leaflet | 1.9 | Peta interaktif |
| Tailwind CSS | 3.x | Styling |

---

## 🗃️ Skema Database

Tabel utama: `usaha`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | UUID | Primary key |
| nama_pemilik | TEXT | Nama pemilik usaha |
| nama_usaha | TEXT | Nama usaha/toko |
| kbli_*_kode | TEXT | Kode KBLI bertahap |
| kbli_*_nama | TEXT | Nama KBLI bertahap |
| provinsi/kabkot/kecamatan/desa/sls | TEXT | Data wilayah |
| latitude/longitude | DOUBLE | Koordinat GPS |
| platform_digital | JSONB | Array platform [{platform, nama_akun}] |
| kelas_usaha | TEXT | mikro/kecil/menengah |
| cakupan_pasar | TEXT | lokal/nasional/internasional |
| created_by | UUID | ID user Supabase |

---

## 🔧 Pengembangan Lanjutan

### Tambah Data Wilayah
Edit `src/data/wilayah.ts` untuk menambah kecamatan/desa/SLS di luar Tabanan.

### Tambah Data KBLI
Edit `src/data/kbli2025.ts` untuk menambah kode KBLI yang belum ada.

### Export Data
Tambahkan fitur export CSV/Excel dengan library `xlsx` atau `papaparse`.

### Deploy ke Production
```bash
# Build
npm run build

# Deploy ke Vercel (gratis)
npx vercel --prod
```

---

## 📞 Kontak

**BPS Kabupaten Tabanan**  
Jl. Pahlawan No. 1, Tabanan, Bali  
Website: [tabanan.bps.go.id](https://tabanan.bps.go.id)
