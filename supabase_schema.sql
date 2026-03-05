-- =============================================
-- SCHEMA DATABASE: Dashboard Ekonomi Digital
-- Kabupaten Tabanan - BPS
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: usaha (Daftar Usaha Ekonomi Digital)
-- =============================================
CREATE TABLE IF NOT EXISTS public.usaha (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Data Pelaku Usaha
  nama_pemilik TEXT NOT NULL,
  nama_usaha TEXT NOT NULL,
  
  -- KBLI 2025
  kbli_kategori_kode TEXT,
  kbli_kategori_nama TEXT,
  kbli_golongan_pokok_kode TEXT,
  kbli_golongan_pokok_nama TEXT,
  kbli_golongan_kode TEXT,
  kbli_golongan_nama TEXT,
  kbli_subgolongan_kode TEXT,
  kbli_subgolongan_nama TEXT,
  kbli_kelompok_kode TEXT,
  kbli_kelompok_nama TEXT,
  
  -- Lokasi
  provinsi_kode TEXT,
  provinsi_nama TEXT,
  kabkot_kode TEXT,
  kabkot_nama TEXT,
  kecamatan_kode TEXT,
  kecamatan_nama TEXT,
  desa_kode TEXT,
  desa_nama TEXT,
  sls_kode TEXT,
  sls_nama TEXT,
  sub_sls TEXT,
  
  -- Geotagging
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  
  -- Platform Digital (array of objects)
  platform_digital JSONB DEFAULT '[]'::jsonb,
  -- Format: [{"platform": "Instagram", "nama_akun": "@tokosaya"}, ...]
  
  -- Klasifikasi
  kelas_usaha TEXT CHECK (kelas_usaha IN ('mikro', 'kecil', 'menengah')),
  cakupan_pasar TEXT CHECK (cakupan_pasar IN ('lokal', 'nasional', 'internasional')),
  
  -- Metadata
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT TRUE
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE public.usaha ENABLE ROW LEVEL SECURITY;

-- Policy: User yang login bisa melihat semua data
CREATE POLICY "Authenticated users can view all usaha"
  ON public.usaha FOR SELECT
  TO authenticated
  USING (true);

-- Policy: User yang login bisa menambah data
CREATE POLICY "Authenticated users can insert usaha"
  ON public.usaha FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policy: User hanya bisa edit data miliknya sendiri
CREATE POLICY "Users can update own usaha"
  ON public.usaha FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Policy: User hanya bisa hapus data miliknya sendiri
CREATE POLICY "Users can delete own usaha"
  ON public.usaha FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- =============================================
-- TRIGGER: Auto update updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usaha_updated_at
  BEFORE UPDATE ON public.usaha
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INDEX untuk performa query
-- =============================================
CREATE INDEX idx_usaha_kabkot ON public.usaha(kabkot_kode);
CREATE INDEX idx_usaha_kecamatan ON public.usaha(kecamatan_kode);
CREATE INDEX idx_usaha_kbli_kategori ON public.usaha(kbli_kategori_kode);
CREATE INDEX idx_usaha_kelas ON public.usaha(kelas_usaha);
CREATE INDEX idx_usaha_created_by ON public.usaha(created_by);
