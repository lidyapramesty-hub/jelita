// ===== Shared TypeScript interfaces =====

export interface Platform {
    id?: number;
    platform: string;
    nama_akun: string;
}

export interface UserInfo {
    id: number;
    name: string;
    username: string;
    role: 'pegawai' | 'mitra';
}

export interface Usaha {
    id: string;
    nama_pemilik: string;
    nama_usaha: string;
    deskripsi_kegiatan?: string;
    // KBLI (only codes — names from reference data)
    kbli_kategori_kode: string;
    kbli_kelompok_kode: string;
    // Lokasi
    kecamatan_nama: string;
    desa_nama: string;
    sls_nama: string;
    sub_sls: string;
    // Geo
    latitude: number | null;
    longitude: number | null;
    // Platform (separate table)
    platforms: Platform[];
    // Klasifikasi
    kelas_usaha: 'mikro' | 'kecil' | 'menengah' | 'besar';
    cakupan_pasar: 'lokal' | 'regional' | 'nasional' | 'internasional';
    // User tracking
    created_by: number | null;
    updated_by: number | null;
    creator?: UserInfo | null;
    updater?: UserInfo | null;
    // Meta
    created_at: string;
    updated_at?: string;
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
