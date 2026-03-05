// ===== Shared TypeScript interfaces =====

export interface Platform {
    platform: string;
    nama_akun: string;
}

export interface Usaha {
    id: string;
    nama_pemilik: string;
    nama_usaha: string;
    deskripsi_kegiatan?: string;
    // KBLI
    kbli_kategori_kode: string;
    kbli_kategori_nama: string;
    kbli_golongan_pokok_kode: string;
    kbli_golongan_pokok_nama: string;
    kbli_golongan_kode: string;
    kbli_golongan_nama: string;
    kbli_subgolongan_kode: string;
    kbli_subgolongan_nama: string;
    kbli_kelompok_kode: string;
    kbli_kelompok_nama: string;
    // Lokasi
    provinsi_kode: string;
    provinsi_nama: string;
    kabkot_kode: string;
    kabkot_nama: string;
    kecamatan_kode: string;
    kecamatan_nama: string;
    desa_kode: string;
    desa_nama: string;
    sls_kode: string;
    sls_nama: string;
    sub_sls: string;
    // Geo
    latitude: number | null;
    longitude: number | null;
    // Platform
    platform_digital: Platform[];
    // Klasifikasi
    kelas_usaha: 'mikro' | 'kecil' | 'menengah' | 'besar';
    cakupan_pasar: 'lokal' | 'regional' | 'nasional' | 'internasional';
    // Meta
    created_at: string;
    created_by?: string;
    created_by_email?: string;
    is_active: boolean;
}

export interface StatsData {
    total: number;
    mikro: number;
    kecil: number;
    menengah: number;
    besar: number;
    lokal: number;
    regional: number;
    nasional: number;
    internasional: number;
    byKecamatan: Record<string, number>;
    byKategori: Record<string, number>;
    recentCount: number;
}

export interface UsahaFormData {
    nama_pemilik: string;
    nama_usaha: string;
    deskripsi_kegiatan: string;
    // KBLI
    kbli_kategori_kode: string;
    kbli_kategori_nama: string;
    kbli_golongan_pokok_kode: string;
    kbli_golongan_pokok_nama: string;
    kbli_golongan_kode: string;
    kbli_golongan_nama: string;
    kbli_subgolongan_kode: string;
    kbli_subgolongan_nama: string;
    kbli_kelompok_kode: string;
    kbli_kelompok_nama: string;
    // Lokasi
    provinsi_kode: string;
    provinsi_nama: string;
    kabkot_kode: string;
    kabkot_nama: string;
    kecamatan_kode: string;
    kecamatan_nama: string;
    desa_kode: string;
    desa_nama: string;
    sls_kode: string;
    sls_nama: string;
    sub_sls: string;
    // Geo
    latitude: number | null;
    longitude: number | null;
    // Platform
    platform_digital: Platform[];
    // Klasifikasi
    kelas_usaha: string;
    cakupan_pasar: string;
}
