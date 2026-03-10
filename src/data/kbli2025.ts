// Data KBLI 2025 - Bertahap (Kategori → Golongan Pokok → Golongan → Subgolongan → Kelompok)
// Sesuai Peraturan BPS Nomor 7 Tahun 2025

export interface KBLIKategori {
  kode: string
  nama: string
}

export interface KBLIGolonganPokok {
  kode: string
  nama: string
  kategori_kode: string
}

export interface KBLIGolongan {
  kode: string
  nama: string
  golongan_pokok_kode: string
}

export interface KBLISubgolongan {
  kode: string
  nama: string
  golongan_kode: string
}

export interface KBLIKelompok {
  kode: string
  nama: string
  subgolongan_kode: string
}

export const kbliKategori: KBLIKategori[] = [
  { kode: 'A', nama: 'Pertanian, Kehutanan, dan Perikanan' },
  { kode: 'B', nama: 'Pertambangan dan Penggalian' },
  { kode: 'C', nama: 'Industri' },
  { kode: 'D', nama: 'Penyediaan Listrik, Gas, Uap/Air Panas, dan Udara Dingin' },
  { kode: 'E', nama: 'Penyediaan Air, Pengelolaan Air Limbah, Penanganan Limbah, dan Remediasi' },
  { kode: 'F', nama: 'Konstruksi' },
  { kode: 'G', nama: 'Perdagangan Besar dan Eceran' },
  { kode: 'H', nama: 'Transportasi dan Penyimpanan' },
  { kode: 'I', nama: 'Aktivitas Penyediaan Akomodasi dan Makan Minum' },
  { kode: 'J', nama: 'Aktivitas Penerbitan, Penyiaran, serta Produksi dan Distribusi Konten' },
  { kode: 'K', nama: 'Aktivitas Telekomunikasi, Pemrograman Komputer, Konsultansi, Infrastruktur Komputasi, dan Jasa Informasi Lainnya' },
  { kode: 'L', nama: 'Aktivitas Keuangan dan Asuransi' },
  { kode: 'M', nama: 'Aktivitas Real Estat' },
  { kode: 'N', nama: 'Aktivitas Profesional, Ilmiah, dan Teknis' },
  { kode: 'O', nama: 'Aktivitas Administratif dan Penunjang Usaha' },
  { kode: 'P', nama: 'Administrasi Pemerintahan dan Pertahanan, serta Jaminan Sosial Wajib' },
  { kode: 'Q', nama: 'Pendidikan' },
  { kode: 'R', nama: 'Aktivitas Kesehatan Manusia dan Aktivitas Sosial' },
  { kode: 'S', nama: 'Kesenian, Olahraga, dan Rekreasi' },
  { kode: 'T', nama: 'Aktivitas Jasa Lainnya' },
  { kode: 'U', nama: 'Aktivitas Rumah Tangga sebagai Pemberi Kerja' },
  { kode: 'V', nama: 'Aktivitas Badan Internasional dan Badan Ekstra Internasional Lainnya' },
]

export const kbliGolonganPokok: KBLIGolonganPokok[] = [
  // A - Pertanian, Kehutanan, dan Perikanan
  { kode: '01', nama: 'Pertanian Tanaman, Peternakan, Perburuan dan Kegiatan YBDI', kategori_kode: 'A' },
  { kode: '03', nama: 'Perikanan', kategori_kode: 'A' },
  // C - Industri
  { kode: '10', nama: 'Industri Makanan', kategori_kode: 'C' },
  { kode: '11', nama: 'Industri Minuman', kategori_kode: 'C' },
  { kode: '13', nama: 'Industri Tekstil', kategori_kode: 'C' },
  { kode: '14', nama: 'Industri Pakaian Jadi', kategori_kode: 'C' },
  { kode: '15', nama: 'Industri Kulit, Barang dari Kulit dan Alas Kaki', kategori_kode: 'C' },
  { kode: '16', nama: 'Industri Kayu, Barang dari Kayu dan Gabus', kategori_kode: 'C' },
  { kode: '17', nama: 'Industri Kertas dan Barang dari Kertas', kategori_kode: 'C' },
  { kode: '18', nama: 'Percetakan dan Reproduksi Media Rekaman', kategori_kode: 'C' },
  { kode: '31', nama: 'Industri Furnitur', kategori_kode: 'C' },
  { kode: '32', nama: 'Industri Pengolahan Lainnya', kategori_kode: 'C' },
  // G - Perdagangan Besar dan Eceran
  { kode: '45', nama: 'Perdagangan, Reparasi Mobil dan Sepeda Motor', kategori_kode: 'G' },
  { kode: '46', nama: 'Perdagangan Besar, Bukan Mobil dan Sepeda Motor', kategori_kode: 'G' },
  { kode: '47', nama: 'Perdagangan Eceran, Bukan Mobil dan Sepeda Motor', kategori_kode: 'G' },
  // H - Transportasi dan Penyimpanan
  { kode: '49', nama: 'Angkutan Darat dan Angkutan Melalui Saluran Pipa', kategori_kode: 'H' },
  { kode: '52', nama: 'Pergudangan dan Penunjang Angkutan', kategori_kode: 'H' },
  { kode: '53', nama: 'Pos dan Kurir', kategori_kode: 'H' },
  // I - Aktivitas Penyediaan Akomodasi dan Makan Minum
  { kode: '55', nama: 'Penyediaan Akomodasi', kategori_kode: 'I' },
  { kode: '56', nama: 'Penyediaan Makan Minum', kategori_kode: 'I' },
  // J - Aktivitas Penerbitan, Penyiaran, serta Produksi dan Distribusi Konten
  { kode: '58', nama: 'Penerbitan', kategori_kode: 'J' },
  { kode: '59', nama: 'Produksi Gambar Bergerak, Video dan Program Televisi, Perekaman Suara dan Penerbitan Musik', kategori_kode: 'J' },
  { kode: '60', nama: 'Penyiaran dan Pemrograman', kategori_kode: 'J' },
  // K - Aktivitas Telekomunikasi, Pemrograman Komputer, dst
  { kode: '61', nama: 'Telekomunikasi', kategori_kode: 'K' },
  { kode: '62', nama: 'Aktivitas Pemrograman, Konsultasi Komputer dan Kegiatan YBDI', kategori_kode: 'K' },
  { kode: '63', nama: 'Aktivitas Jasa Informasi', kategori_kode: 'K' },
  // L - Aktivitas Keuangan dan Asuransi
  { kode: '64', nama: 'Aktivitas Jasa Keuangan, Bukan Asuransi dan Dana Pensiun', kategori_kode: 'L' },
  { kode: '66', nama: 'Aktivitas Penunjang Jasa Keuangan, Asuransi, dan Dana Pensiun', kategori_kode: 'L' },
  // N - Aktivitas Profesional, Ilmiah, dan Teknis
  { kode: '69', nama: 'Aktivitas Hukum dan Akuntansi', kategori_kode: 'N' },
  { kode: '70', nama: 'Aktivitas Kantor Pusat dan Konsultasi Manajemen', kategori_kode: 'N' },
  { kode: '71', nama: 'Aktivitas Arsitektur dan Rekayasa; Analisis dan Uji Teknis', kategori_kode: 'N' },
  { kode: '73', nama: 'Periklanan dan Riset Pasar', kategori_kode: 'N' },
  { kode: '74', nama: 'Aktivitas Profesional, Ilmiah dan Teknis Lainnya', kategori_kode: 'N' },
  // O - Aktivitas Administratif dan Penunjang Usaha
  { kode: '79', nama: 'Aktivitas Agen Perjalanan, Penyelenggara Tur dan Penunjang Reservasi', kategori_kode: 'O' },
  { kode: '82', nama: 'Aktivitas Administrasi Kantor, Penunjang Kantor dan Penunjang Usaha Lainnya', kategori_kode: 'O' },
  // Q - Pendidikan
  { kode: '85', nama: 'Pendidikan', kategori_kode: 'Q' },
  // S - Kesenian, Olahraga, dan Rekreasi
  { kode: '90', nama: 'Aktivitas Hiburan, Kesenian dan Kreativitas', kategori_kode: 'S' },
  { kode: '93', nama: 'Aktivitas Olahraga dan Rekreasi Lainnya', kategori_kode: 'S' },
  // T - Aktivitas Jasa Lainnya
  { kode: '95', nama: 'Reparasi Komputer dan Barang Keperluan Pribadi dan Perlengkapan Rumah Tangga', kategori_kode: 'T' },
  { kode: '96', nama: 'Aktivitas Jasa Perseorangan Lainnya', kategori_kode: 'T' },
  // B - Pertambangan dan Penggalian
  { kode: '05', nama: 'Pertambangan Batu Bara dan Lignit', kategori_kode: 'B' },
  { kode: '08', nama: 'Pertambangan dan Penggalian Lainnya', kategori_kode: 'B' },
  // D - Penyediaan Listrik, Gas, Uap/Air Panas
  { kode: '35', nama: 'Penyediaan Listrik, Gas, Uap/Air Panas, dan Udara Dingin', kategori_kode: 'D' },
  // E - Penyediaan Air, Pengelolaan Limbah
  { kode: '36', nama: 'Pengelolaan Air', kategori_kode: 'E' },
  { kode: '38', nama: 'Pengelolaan dan Daur Ulang Sampah', kategori_kode: 'E' },
  // F - Konstruksi
  { kode: '41', nama: 'Konstruksi Gedung', kategori_kode: 'F' },
  { kode: '42', nama: 'Konstruksi Bangunan Sipil', kategori_kode: 'F' },
  { kode: '43', nama: 'Konstruksi Khusus', kategori_kode: 'F' },
  // H tambahan
  { kode: '50', nama: 'Angkutan Air', kategori_kode: 'H' },
  // M - Aktivitas Real Estat
  { kode: '68', nama: 'Aktivitas Real Estat', kategori_kode: 'M' },
  // P - Administrasi Pemerintahan
  { kode: '84', nama: 'Administrasi Pemerintahan, Pertahanan, dan Jaminan Sosial Wajib', kategori_kode: 'P' },
  // R - Aktivitas Kesehatan
  { kode: '86', nama: 'Aktivitas Kesehatan Manusia', kategori_kode: 'R' },
  { kode: '87', nama: 'Aktivitas Perawatan Kesehatan Tinggal', kategori_kode: 'R' },
  { kode: '88', nama: 'Aktivitas Sosial Tanpa Akomodasi', kategori_kode: 'R' },
  // U - Aktivitas Rumah Tangga
  { kode: '97', nama: 'Aktivitas Rumah Tangga sebagai Pemberi Kerja dari Pekerja Rumah Tangga', kategori_kode: 'U' },
  // V - Badan Internasional
  { kode: '99', nama: 'Aktivitas Badan Internasional dan Badan Ekstra Internasional Lainnya', kategori_kode: 'V' },
  // === Tambahan Golongan Pokok yang belum ada ===
  // A
  { kode: '02', nama: 'Kehutanan dan Penebangan Kayu', kategori_kode: 'A' },
  // B
  { kode: '06', nama: 'Pertambangan Minyak Bumi dan Gas Alam dan Panas Bumi', kategori_kode: 'B' },
  { kode: '07', nama: 'Pertambangan Bijih Logam', kategori_kode: 'B' },
  { kode: '09', nama: 'Aktivitas Penunjang Pertambangan dan Penggalian', kategori_kode: 'B' },
  // C
  { kode: '12', nama: 'Industri Pengolahan Tembakau', kategori_kode: 'C' },
  { kode: '19', nama: 'Industri Produk dari Batu Bara dan Pengilangan Minyak Bumi', kategori_kode: 'C' },
  { kode: '20', nama: 'Industri Bahan Kimia dan Barang dari Bahan Kimia', kategori_kode: 'C' },
  { kode: '21', nama: 'Industri Farmasi, Produk Obat Kimia dan Obat Tradisional', kategori_kode: 'C' },
  { kode: '22', nama: 'Industri Karet, Barang dari Karet dan Plastik', kategori_kode: 'C' },
  { kode: '23', nama: 'Industri Barang Galian Bukan Logam', kategori_kode: 'C' },
  { kode: '24', nama: 'Industri Logam Dasar', kategori_kode: 'C' },
  { kode: '25', nama: 'Industri Barang Logam, Bukan Mesin dan Peralatannya', kategori_kode: 'C' },
  { kode: '26', nama: 'Industri Komputer, Barang Elektronik dan Optik', kategori_kode: 'C' },
  { kode: '27', nama: 'Industri Peralatan Listrik', kategori_kode: 'C' },
  { kode: '28', nama: 'Industri Mesin dan Perlengkapan YTDL', kategori_kode: 'C' },
  { kode: '29', nama: 'Industri Kendaraan Bermotor, Trailer dan Semi Trailer', kategori_kode: 'C' },
  { kode: '30', nama: 'Industri Alat Angkutan Lainnya', kategori_kode: 'C' },
  { kode: '33', nama: 'Reparasi dan Pemasangan Mesin dan Peralatan', kategori_kode: 'C' },
  // E
  { kode: '37', nama: 'Pengelolaan Air Limbah', kategori_kode: 'E' },
  { kode: '39', nama: 'Aktivitas Remediasi dan Pengelolaan Limbah Lainnya', kategori_kode: 'E' },
  // H
  { kode: '51', nama: 'Angkutan Udara', kategori_kode: 'H' },
  // L
  { kode: '65', nama: 'Asuransi, Reasuransi, dan Dana Pensiun', kategori_kode: 'L' },
  // N
  { kode: '72', nama: 'Penelitian dan Pengembangan Ilmiah', kategori_kode: 'N' },
  { kode: '75', nama: 'Aktivitas Kesehatan Hewan', kategori_kode: 'N' },
  // O
  { kode: '77', nama: 'Aktivitas Persewaan dan Sewa Guna Usaha Tanpa Hak Opsi', kategori_kode: 'O' },
  { kode: '78', nama: 'Aktivitas Ketenagakerjaan', kategori_kode: 'O' },
  { kode: '80', nama: 'Aktivitas Keamanan dan Penyelidikan', kategori_kode: 'O' },
  { kode: '81', nama: 'Aktivitas Penunjang Perawatan Bangunan dan Lansekap', kategori_kode: 'O' },
  // S
  { kode: '91', nama: 'Aktivitas Perpustakaan, Arsip, Museum dan Kegiatan Kebudayaan Lainnya', kategori_kode: 'S' },
  { kode: '92', nama: 'Aktivitas Perjudian dan Pertaruhan', kategori_kode: 'S' },
  { kode: '94', nama: 'Aktivitas Keanggotaan Organisasi', kategori_kode: 'S' },
]

export const kbliGolongan: KBLIGolongan[] = [
  // Perdagangan eceran 47
  { kode: '471', nama: 'Perdagangan Eceran Berbagai Macam Barang di Toko', golongan_pokok_kode: '47' },
  { kode: '472', nama: 'Perdagangan Eceran Khusus Makanan, Minuman dan Tembakau di Toko', golongan_pokok_kode: '47' },
  { kode: '473', nama: 'Perdagangan Eceran Khusus Bahan Bakar Kendaraan Bermotor', golongan_pokok_kode: '47' },
  { kode: '474', nama: 'Perdagangan Eceran Khusus Peralatan Informasi dan Komunikasi di Toko', golongan_pokok_kode: '47' },
  { kode: '475', nama: 'Perdagangan Eceran Khusus Perlengkapan Rumah Tangga di Toko', golongan_pokok_kode: '47' },
  { kode: '476', nama: 'Perdagangan Eceran Khusus Barang Budaya dan Rekreasi di Toko', golongan_pokok_kode: '47' },
  { kode: '477', nama: 'Perdagangan Eceran Khusus Barang Lainnya di Toko', golongan_pokok_kode: '47' },
  { kode: '478', nama: 'Perdagangan Eceran Kaki Lima dan Los Pasar', golongan_pokok_kode: '47' },
  { kode: '479', nama: 'Perdagangan Eceran Bukan di Toko, Kaki Lima dan Los Pasar', golongan_pokok_kode: '47' },
  // Makan Minum 56
  { kode: '561', nama: 'Restoran dan Penyediaan Makanan Keliling', golongan_pokok_kode: '56' },
  { kode: '562', nama: 'Penyediaan Jasa Boga untuk Suatu Event Tertentu (Event Catering) dan Penyediaan Jasa Boga Lainnya', golongan_pokok_kode: '56' },
  { kode: '563', nama: 'Penyediaan Minuman', golongan_pokok_kode: '56' },
  // Akomodasi 55
  { kode: '551', nama: 'Hotel dan Akomodasi Sejenis Lainnya', golongan_pokok_kode: '55' },
  { kode: '552', nama: 'Penyediaan Akomodasi Jangka Pendek', golongan_pokok_kode: '55' },
  { kode: '559', nama: 'Penyediaan Akomodasi Lainnya', golongan_pokok_kode: '55' },
  // IT 62
  { kode: '620', nama: 'Aktivitas Pemrograman, Konsultasi Komputer dan Kegiatan YBDI', golongan_pokok_kode: '62' },
  // Jasa Informasi 63
  { kode: '631', nama: 'Pengolahan Data, Hosting dan Kegiatan YBDI; Portal Web', golongan_pokok_kode: '63' },
  { kode: '639', nama: 'Aktivitas Jasa Informasi Lainnya', golongan_pokok_kode: '63' },
  // Periklanan 73
  { kode: '731', nama: 'Periklanan', golongan_pokok_kode: '73' },
  { kode: '732', nama: 'Riset Pasar dan Jasa Polling Pendapat Masyarakat', golongan_pokok_kode: '73' },
  // Profesional lainnya 74
  { kode: '741', nama: 'Aktivitas Desain Khusus', golongan_pokok_kode: '74' },
  { kode: '742', nama: 'Aktivitas Fotografi', golongan_pokok_kode: '74' },
  { kode: '749', nama: 'Aktivitas Profesional, Ilmiah dan Teknis Lainnya YTDL', golongan_pokok_kode: '74' },
  // Agen Perjalanan 79
  { kode: '791', nama: 'Aktivitas Agen Perjalanan dan Penyelenggara Tur', golongan_pokok_kode: '79' },
  { kode: '799', nama: 'Aktivitas Reservasi Lainnya dan Kegiatan YBDI', golongan_pokok_kode: '79' },
  // Reparasi komputer 95
  { kode: '951', nama: 'Reparasi Komputer dan Alat Komunikasi', golongan_pokok_kode: '95' },
  { kode: '952', nama: 'Reparasi Barang Keperluan Pribadi dan Perlengkapan Rumah Tangga', golongan_pokok_kode: '95' },
  // Jasa perseorangan 96
  { kode: '960', nama: 'Aktivitas Jasa Perseorangan Lainnya', golongan_pokok_kode: '96' },
  // Industri makanan 10
  { kode: '101', nama: 'Industri Pengolahan dan Pengawetan Daging', golongan_pokok_kode: '10' },
  { kode: '102', nama: 'Industri Pengolahan dan Pengawetan Ikan dan Biota Air', golongan_pokok_kode: '10' },
  { kode: '103', nama: 'Industri Pengolahan dan Pengawetan Buah-Buahan dan Sayuran', golongan_pokok_kode: '10' },
  { kode: '104', nama: 'Industri Minyak dan Lemak Nabati dan Hewani', golongan_pokok_kode: '10' },
  { kode: '105', nama: 'Industri Pengolahan Susu, Produk dari Susu dan Es Krim', golongan_pokok_kode: '10' },
  { kode: '106', nama: 'Industri Penggilingan Padi-Padian, Tepung dan Pati', golongan_pokok_kode: '10' },
  { kode: '107', nama: 'Industri Makanan Lainnya', golongan_pokok_kode: '10' },
  { kode: '108', nama: 'Industri Makanan Hewan', golongan_pokok_kode: '10' },
  // Industri minuman 11
  { kode: '110', nama: 'Industri Minuman', golongan_pokok_kode: '11' },
  // Industri pakaian 14
  { kode: '141', nama: 'Industri Pakaian Jadi, Bukan Pakaian Jadi dari Kulit', golongan_pokok_kode: '14' },
  { kode: '142', nama: 'Industri Pakaian Jadi dan Aksesori dari Kulit', golongan_pokok_kode: '14' },
  { kode: '143', nama: 'Industri Pakaian Jadi Rajutan dan Sulaman/Bordir', golongan_pokok_kode: '14' },
  // Penerbitan 58
  { kode: '581', nama: 'Penerbitan Buku, Majalah dan Penerbitan Lainnya', golongan_pokok_kode: '58' },
  { kode: '582', nama: 'Penerbitan Piranti Lunak (Software)', golongan_pokok_kode: '58' },
  // Hiburan 90
  { kode: '900', nama: 'Aktivitas Hiburan, Kesenian dan Kreativitas', golongan_pokok_kode: '90' },
  // New: B
  { kode: '051', nama: 'Pertambangan Batu Bara', golongan_pokok_kode: '05' },
  { kode: '081', nama: 'Pertambangan Batu, Pasir dan Tanah Liat', golongan_pokok_kode: '08' },
  // New: D
  { kode: '351', nama: 'Penyediaan Tenaga Listrik', golongan_pokok_kode: '35' },
  // New: E
  { kode: '360', nama: 'Pengelolaan Air', golongan_pokok_kode: '36' },
  { kode: '381', nama: 'Pengumpulan Sampah', golongan_pokok_kode: '38' },
  // New: F
  { kode: '410', nama: 'Konstruksi Gedung', golongan_pokok_kode: '41' },
  { kode: '421', nama: 'Konstruksi Jalan dan Rel Kereta Api', golongan_pokok_kode: '42' },
  { kode: '431', nama: 'Pembongkaran dan Penyiapan Lahan', golongan_pokok_kode: '43' },
  // H/50
  { kode: '501', nama: 'Angkutan Laut', golongan_pokok_kode: '50' },
  // New: Pertanian 01
  { kode: '011', nama: 'Pertanian Tanaman Semusim', golongan_pokok_kode: '01' },
  { kode: '012', nama: 'Pertanian Tanaman Tahunan', golongan_pokok_kode: '01' },
  { kode: '014', nama: 'Peternakan', golongan_pokok_kode: '01' },
  // New: Perikanan 03
  { kode: '031', nama: 'Perikanan Tangkap', golongan_pokok_kode: '03' },
  { kode: '032', nama: 'Perikanan Budidaya', golongan_pokok_kode: '03' },
  // Industri tekstil 13
  { kode: '131', nama: 'Pemintalan, Pertenunan dan Penyelesaian Akhir Tekstil', golongan_pokok_kode: '13' },
  // Industri kulit 15
  { kode: '151', nama: 'Industri Kulit dan Barang dari Kulit', golongan_pokok_kode: '15' },
  { kode: '152', nama: 'Industri Alas Kaki', golongan_pokok_kode: '15' },
  // Industri kayu 16
  { kode: '161', nama: 'Penggergajian dan Pengawetan Kayu', golongan_pokok_kode: '16' },
  { kode: '162', nama: 'Industri Barang dari Kayu, Gabus, Rotan, dan Bambu', golongan_pokok_kode: '16' },
  // Industri kertas 17
  { kode: '170', nama: 'Industri Kertas dan Barang dari Kertas', golongan_pokok_kode: '17' },
  // Percetakan 18
  { kode: '181', nama: 'Percetakan dan Kegiatan YBDI', golongan_pokok_kode: '18' },
  // Furnitur 31
  { kode: '310', nama: 'Industri Furnitur', golongan_pokok_kode: '31' },
  // Pengolahan lainnya 32
  { kode: '321', nama: 'Industri Perhiasan dan Barang Sejenis', golongan_pokok_kode: '32' },
  { kode: '329', nama: 'Industri Pengolahan Lainnya YTDL', golongan_pokok_kode: '32' },
  // Perdagangan mobil 45
  { kode: '451', nama: 'Perdagangan Mobil', golongan_pokok_kode: '45' },
  { kode: '453', nama: 'Perdagangan Suku Cadang dan Aksesori Mobil', golongan_pokok_kode: '45' },
  { kode: '454', nama: 'Perdagangan, Perawatan dan Reparasi Sepeda Motor', golongan_pokok_kode: '45' },
  // Perdagangan besar 46
  { kode: '461', nama: 'Perdagangan Besar Atas Dasar Balas Jasa (Fee) atau Kontrak', golongan_pokok_kode: '46' },
  { kode: '462', nama: 'Perdagangan Besar Hasil Pertanian dan Hewan Hidup', golongan_pokok_kode: '46' },
  { kode: '469', nama: 'Perdagangan Besar Lainnya', golongan_pokok_kode: '46' },
  // Angkutan darat 49
  { kode: '491', nama: 'Angkutan Jalan Rel', golongan_pokok_kode: '49' },
  { kode: '492', nama: 'Angkutan Darat Lainnya', golongan_pokok_kode: '49' },
  // Pergudangan 52
  { kode: '521', nama: 'Pergudangan dan Penyimpanan', golongan_pokok_kode: '52' },
  { kode: '522', nama: 'Aktivitas Penunjang Angkutan', golongan_pokok_kode: '52' },
  // Pos kurir 53
  { kode: '531', nama: 'Aktivitas Pos', golongan_pokok_kode: '53' },
  { kode: '532', nama: 'Aktivitas Kurir', golongan_pokok_kode: '53' },
  // Produksi video 59
  { kode: '591', nama: 'Produksi Gambar Bergerak, Video dan Program Televisi', golongan_pokok_kode: '59' },
  // Penyiaran 60
  { kode: '601', nama: 'Penyiaran Radio', golongan_pokok_kode: '60' },
  { kode: '602', nama: 'Penyiaran Televisi', golongan_pokok_kode: '60' },
  // Telekomunikasi 61
  { kode: '611', nama: 'Aktivitas Telekomunikasi Kabel', golongan_pokok_kode: '61' },
  { kode: '612', nama: 'Aktivitas Telekomunikasi Tanpa Kabel', golongan_pokok_kode: '61' },
  // Keuangan 64
  { kode: '641', nama: 'Perantara Moneter', golongan_pokok_kode: '64' },
  { kode: '649', nama: 'Aktivitas Jasa Keuangan Lainnya', golongan_pokok_kode: '64' },
  // Penunjang Keuangan 66
  { kode: '661', nama: 'Aktivitas Penunjang Jasa Keuangan', golongan_pokok_kode: '66' },
  // Hukum akuntansi 69
  { kode: '691', nama: 'Aktivitas Hukum', golongan_pokok_kode: '69' },
  { kode: '692', nama: 'Aktivitas Akuntansi, Pembukuan dan Pemeriksa; Konsultasi Pajak', golongan_pokok_kode: '69' },
  // Konsultasi manajemen 70
  { kode: '702', nama: 'Aktivitas Konsultasi Manajemen', golongan_pokok_kode: '70' },
  // Arsitektur 71
  { kode: '711', nama: 'Aktivitas Arsitektur dan Rekayasa', golongan_pokok_kode: '71' },
  // Administrasi kantor 82
  { kode: '821', nama: 'Aktivitas Administrasi dan Penunjang Kantor', golongan_pokok_kode: '82' },
  // Pendidikan 85
  { kode: '851', nama: 'Pendidikan Dasar', golongan_pokok_kode: '85' },
  { kode: '852', nama: 'Pendidikan Menengah', golongan_pokok_kode: '85' },
  { kode: '853', nama: 'Pendidikan Tinggi', golongan_pokok_kode: '85' },
  { kode: '854', nama: 'Pendidikan Lainnya', golongan_pokok_kode: '85' },
  // Olahraga 93
  { kode: '931', nama: 'Aktivitas Olahraga', golongan_pokok_kode: '93' },
  { kode: '932', nama: 'Aktivitas Rekreasi dan Hiburan Lainnya', golongan_pokok_kode: '93' },
  // Real estat 68
  { kode: '681', nama: 'Aktivitas Real Estat dengan Hak Milik atau Sewa', golongan_pokok_kode: '68' },
  { kode: '682', nama: 'Aktivitas Real Estat Atas Dasar Balas Jasa (Fee) atau Kontrak', golongan_pokok_kode: '68' },
  // Administrasi pemerintahan 84
  { kode: '841', nama: 'Administrasi Pemerintahan dan Kebijakan Ekonomi dan Sosial', golongan_pokok_kode: '84' },
  // Kesehatan 86
  { kode: '861', nama: 'Aktivitas Rumah Sakit', golongan_pokok_kode: '86' },
  { kode: '862', nama: 'Aktivitas Praktik Dokter dan Dokter Gigi', golongan_pokok_kode: '86' },
  { kode: '869', nama: 'Aktivitas Kesehatan Manusia Lainnya', golongan_pokok_kode: '86' },
  // Perawatan 87
  { kode: '871', nama: 'Aktivitas Perawatan Kesehatan Tinggal', golongan_pokok_kode: '87' },
  // Sosial 88
  { kode: '881', nama: 'Aktivitas Sosial Tanpa Akomodasi untuk Lanjut Usia dan Disabilitas', golongan_pokok_kode: '88' },
  // Rumah tangga 97
  { kode: '970', nama: 'Aktivitas Rumah Tangga sebagai Pemberi Kerja', golongan_pokok_kode: '97' },
  // Badan internasional 99
  { kode: '990', nama: 'Aktivitas Badan Internasional', golongan_pokok_kode: '99' },
  // === Tambahan Golongan untuk GP baru ===
  // Kehutanan 02
  { kode: '021', nama: 'Silvikultur dan Kegiatan Kehutanan Lainnya', golongan_pokok_kode: '02' },
  { kode: '022', nama: 'Penebangan Kayu', golongan_pokok_kode: '02' },
  { kode: '023', nama: 'Pengumpulan Hasil Hutan Bukan Kayu', golongan_pokok_kode: '02' },
  { kode: '024', nama: 'Jasa Penunjang Kehutanan', golongan_pokok_kode: '02' },
  // Pertambangan Migas 06
  { kode: '061', nama: 'Pertambangan Minyak Bumi', golongan_pokok_kode: '06' },
  { kode: '062', nama: 'Pertambangan Gas Alam dan Panas Bumi', golongan_pokok_kode: '06' },
  // Pertambangan Bijih Logam 07
  { kode: '071', nama: 'Pertambangan Bijih Besi', golongan_pokok_kode: '07' },
  { kode: '072', nama: 'Pertambangan Bijih Logam Bukan Besi', golongan_pokok_kode: '07' },
  // Jasa Pertambangan 09
  { kode: '091', nama: 'Aktivitas Penunjang Pertambangan Minyak Bumi dan Gas Alam', golongan_pokok_kode: '09' },
  { kode: '099', nama: 'Aktivitas Penunjang Pertambangan dan Penggalian Lainnya', golongan_pokok_kode: '09' },
  // Tembakau 12
  { kode: '120', nama: 'Industri Pengolahan Tembakau', golongan_pokok_kode: '12' },
  // Batu Bara & Minyak 19
  { kode: '191', nama: 'Industri Produk dari Batu Bara', golongan_pokok_kode: '19' },
  { kode: '192', nama: 'Industri Pengilangan Minyak Bumi', golongan_pokok_kode: '19' },
  // Bahan Kimia 20
  { kode: '201', nama: 'Industri Bahan Kimia Dasar, Pupuk dan Nitrogen, Plastik dan Karet Sintetis', golongan_pokok_kode: '20' },
  { kode: '202', nama: 'Industri Bahan Kimia dan Barang Kimia Lainnya', golongan_pokok_kode: '20' },
  // Farmasi 21
  { kode: '210', nama: 'Industri Farmasi, Produk Obat Kimia dan Obat Tradisional', golongan_pokok_kode: '21' },
  // Karet & Plastik 22
  { kode: '221', nama: 'Industri Karet dan Barang dari Karet', golongan_pokok_kode: '22' },
  { kode: '222', nama: 'Industri Barang dari Plastik', golongan_pokok_kode: '22' },
  // Barang Galian 23
  { kode: '231', nama: 'Industri Kaca dan Barang dari Kaca', golongan_pokok_kode: '23' },
  { kode: '239', nama: 'Industri Barang Galian Bukan Logam Lainnya', golongan_pokok_kode: '23' },
  // Logam Dasar 24
  { kode: '241', nama: 'Industri Logam Dasar Besi dan Baja', golongan_pokok_kode: '24' },
  { kode: '242', nama: 'Industri Logam Dasar Mulia dan Logam Dasar Bukan Besi', golongan_pokok_kode: '24' },
  { kode: '243', nama: 'Industri Pengecoran Logam', golongan_pokok_kode: '24' },
  // Barang Logam 25
  { kode: '251', nama: 'Industri Barang Logam Siap Pasang untuk Bangunan dan Tangki', golongan_pokok_kode: '25' },
  { kode: '259', nama: 'Industri Barang Logam Lainnya dan Jasa Pembuatan Barang Logam', golongan_pokok_kode: '25' },
  // Komputer & Elektronik 26
  { kode: '261', nama: 'Industri Komponen dan Papan Elektronik', golongan_pokok_kode: '26' },
  { kode: '262', nama: 'Industri Komputer dan Perlengkapannya', golongan_pokok_kode: '26' },
  { kode: '263', nama: 'Industri Peralatan Komunikasi', golongan_pokok_kode: '26' },
  { kode: '264', nama: 'Industri Peralatan Audio dan Video Elektronik', golongan_pokok_kode: '26' },
  // Peralatan Listrik 27
  { kode: '271', nama: 'Industri Motor Listrik, Generator dan Transformator', golongan_pokok_kode: '27' },
  { kode: '272', nama: 'Industri Batu Baterai dan Akumulator Listrik', golongan_pokok_kode: '27' },
  { kode: '274', nama: 'Industri Peralatan Penerangan Listrik', golongan_pokok_kode: '27' },
  { kode: '279', nama: 'Industri Peralatan Listrik Lainnya', golongan_pokok_kode: '27' },
  // Mesin 28
  { kode: '281', nama: 'Industri Mesin untuk Keperluan Umum', golongan_pokok_kode: '28' },
  { kode: '282', nama: 'Industri Mesin untuk Keperluan Khusus', golongan_pokok_kode: '28' },
  // Kendaraan Bermotor 29
  { kode: '291', nama: 'Industri Kendaraan Bermotor', golongan_pokok_kode: '29' },
  { kode: '292', nama: 'Industri Karoseri Kendaraan Bermotor', golongan_pokok_kode: '29' },
  { kode: '293', nama: 'Industri Suku Cadang dan Aksesori Kendaraan Bermotor', golongan_pokok_kode: '29' },
  // Alat Angkutan Lainnya 30
  { kode: '301', nama: 'Industri Pembuatan Kapal dan Perahu', golongan_pokok_kode: '30' },
  { kode: '303', nama: 'Industri Pesawat Terbang dan Perlengkapannya', golongan_pokok_kode: '30' },
  { kode: '309', nama: 'Industri Alat Angkutan Lainnya YTDL', golongan_pokok_kode: '30' },
  // Reparasi Mesin 33
  { kode: '331', nama: 'Reparasi Produk Logam Pabrikasi, Mesin dan Peralatan', golongan_pokok_kode: '33' },
  { kode: '332', nama: 'Pemasangan Mesin dan Peralatan Industri', golongan_pokok_kode: '33' },
  // Air Limbah 37
  { kode: '370', nama: 'Pengelolaan Air Limbah', golongan_pokok_kode: '37' },
  // Remediasi 39
  { kode: '390', nama: 'Aktivitas Remediasi dan Pengelolaan Limbah Lainnya', golongan_pokok_kode: '39' },
  // Angkutan Udara 51
  { kode: '511', nama: 'Angkutan Udara Penumpang', golongan_pokok_kode: '51' },
  { kode: '512', nama: 'Angkutan Udara Barang', golongan_pokok_kode: '51' },
  // Asuransi 65
  { kode: '651', nama: 'Asuransi', golongan_pokok_kode: '65' },
  { kode: '652', nama: 'Reasuransi', golongan_pokok_kode: '65' },
  { kode: '653', nama: 'Dana Pensiun', golongan_pokok_kode: '65' },
  // Penelitian 72
  { kode: '721', nama: 'Penelitian dan Pengembangan Ilmu Pengetahuan Alam dan Teknologi', golongan_pokok_kode: '72' },
  { kode: '722', nama: 'Penelitian dan Pengembangan Ilmu Pengetahuan Sosial dan Humaniora', golongan_pokok_kode: '72' },
  // Kesehatan Hewan 75
  { kode: '750', nama: 'Aktivitas Kesehatan Hewan', golongan_pokok_kode: '75' },
  // Persewaan 77
  { kode: '771', nama: 'Persewaan dan Sewa Guna Usaha Kendaraan Bermotor', golongan_pokok_kode: '77' },
  { kode: '772', nama: 'Persewaan dan Sewa Guna Usaha Barang Pribadi dan Rumah Tangga', golongan_pokok_kode: '77' },
  { kode: '773', nama: 'Persewaan dan Sewa Guna Usaha Mesin dan Peralatan', golongan_pokok_kode: '77' },
  // Ketenagakerjaan 78
  { kode: '781', nama: 'Aktivitas Agen Tenaga Kerja', golongan_pokok_kode: '78' },
  { kode: '782', nama: 'Aktivitas Penyedia Tenaga Kerja Sementara', golongan_pokok_kode: '78' },
  // Keamanan 80
  { kode: '801', nama: 'Aktivitas Keamanan Swasta', golongan_pokok_kode: '80' },
  { kode: '802', nama: 'Aktivitas Jasa Sistem Keamanan', golongan_pokok_kode: '80' },
  { kode: '803', nama: 'Aktivitas Penyelidikan', golongan_pokok_kode: '80' },
  // Perawatan Bangunan 81
  { kode: '811', nama: 'Aktivitas Penunjang Fasilitas', golongan_pokok_kode: '81' },
  { kode: '812', nama: 'Aktivitas Kebersihan', golongan_pokok_kode: '81' },
  { kode: '813', nama: 'Aktivitas Perawatan Lansekap', golongan_pokok_kode: '81' },
  // Perpustakaan Museum 91
  { kode: '910', nama: 'Aktivitas Perpustakaan, Arsip, Museum dan Kegiatan Kebudayaan Lainnya', golongan_pokok_kode: '91' },
  // Perjudian 92
  { kode: '920', nama: 'Aktivitas Perjudian dan Pertaruhan', golongan_pokok_kode: '92' },
  // Organisasi 94
  { kode: '941', nama: 'Aktivitas Organisasi Bisnis, Pengusaha dan Profesional', golongan_pokok_kode: '94' },
  { kode: '942', nama: 'Aktivitas Serikat Pekerja', golongan_pokok_kode: '94' },
  { kode: '949', nama: 'Aktivitas Organisasi Keanggotaan Lainnya', golongan_pokok_kode: '94' },
]

export const kbliSubgolongan: KBLISubgolongan[] = [
  // 479 - Perdagangan eceran bukan di toko
  { kode: '4791', nama: 'Perdagangan Eceran Melalui Pemesanan Pos atau Internet', golongan_kode: '479' },
  { kode: '4799', nama: 'Perdagangan Eceran Bukan di Toko, Kaki Lima dan Los Pasar Lainnya', golongan_kode: '479' },
  // 477 - Perdagangan eceran lainnya
  { kode: '4771', nama: 'Perdagangan Eceran Khusus Pakaian di Toko', golongan_kode: '477' },
  { kode: '4772', nama: 'Perdagangan Eceran Khusus Alas Kaki dan Aksesori Kulit di Toko', golongan_kode: '477' },
  { kode: '4773', nama: 'Perdagangan Eceran Khusus Produk Farmasi di Toko', golongan_kode: '477' },
  { kode: '4774', nama: 'Perdagangan Eceran Khusus Barang Medis dan Ortopedi di Toko', golongan_kode: '477' },
  { kode: '4775', nama: 'Perdagangan Eceran Khusus Produk Kosmetik dan Perawatan Tubuh di Toko', golongan_kode: '477' },
  { kode: '4776', nama: 'Perdagangan Eceran Khusus Bunga, Tanaman, Bibit dan Pupuk di Toko', golongan_kode: '477' },
  { kode: '4779', nama: 'Perdagangan Eceran Khusus Barang Lainnya YTDL di Toko', golongan_kode: '477' },
  // 561 - Restoran
  { kode: '5610', nama: 'Restoran dan Penyediaan Makanan Keliling', golongan_kode: '561' },
  // 562 - Catering
  { kode: '5621', nama: 'Penyediaan Jasa Boga untuk Suatu Event Tertentu', golongan_kode: '562' },
  { kode: '5629', nama: 'Penyediaan Jasa Boga Lainnya', golongan_kode: '562' },
  // 563 - Minuman
  { kode: '5630', nama: 'Penyediaan Minuman', golongan_kode: '563' },
  // 551 - Hotel
  { kode: '5510', nama: 'Hotel dan Akomodasi Sejenis Lainnya', golongan_kode: '551' },
  // 552 - Akomodasi jangka pendek
  { kode: '5520', nama: 'Penyediaan Akomodasi Jangka Pendek', golongan_kode: '552' },
  // 620 - IT
  { kode: '6201', nama: 'Aktivitas Pemrograman Komputer', golongan_kode: '620' },
  { kode: '6202', nama: 'Aktivitas Konsultasi Komputer dan Manajemen Fasilitas Komputer', golongan_kode: '620' },
  { kode: '6209', nama: 'Aktivitas Teknologi Informasi dan Jasa Komputer Lainnya', golongan_kode: '620' },
  // 631 - Pengolahan Data
  { kode: '6311', nama: 'Pengolahan Data, Hosting dan Kegiatan YBDI', golongan_kode: '631' },
  { kode: '6312', nama: 'Portal Web', golongan_kode: '631' },
  // 731 - Periklanan
  { kode: '7310', nama: 'Periklanan', golongan_kode: '731' },
  // 741 - Desain
  { kode: '7410', nama: 'Aktivitas Desain Khusus', golongan_kode: '741' },
  // 742 - Fotografi
  { kode: '7420', nama: 'Aktivitas Fotografi', golongan_kode: '742' },
  // 791 - Agen Perjalanan
  { kode: '7911', nama: 'Aktivitas Agen Perjalanan', golongan_kode: '791' },
  { kode: '7912', nama: 'Aktivitas Penyelenggara Tur', golongan_kode: '791' },
  // 951 - Reparasi Komputer
  { kode: '9511', nama: 'Reparasi Komputer dan Perlengkapan Komputer', golongan_kode: '951' },
  { kode: '9512', nama: 'Reparasi Alat Komunikasi', golongan_kode: '951' },
  // 960 - Jasa perseorangan
  { kode: '9601', nama: 'Aktivitas Laundry dan Penatu', golongan_kode: '960' },
  { kode: '9602', nama: 'Aktivitas Salon Rambut dan Salon Kecantikan', golongan_kode: '960' },
  { kode: '9603', nama: 'Aktivitas Pemakaman dan Kegiatan YBDI', golongan_kode: '960' },
  { kode: '9609', nama: 'Aktivitas Jasa Perseorangan Lainnya YTDL', golongan_kode: '960' },
  // 107 - Makanan lainnya
  { kode: '1071', nama: 'Industri Produk Roti dan Kue', golongan_kode: '107' },
  { kode: '1072', nama: 'Industri Gula', golongan_kode: '107' },
  { kode: '1073', nama: 'Industri Kakao, Cokelat dan Kembang Gula', golongan_kode: '107' },
  { kode: '1074', nama: 'Industri Makaroni, Mie, dan Produk Sejenisnya', golongan_kode: '107' },
  { kode: '1075', nama: 'Industri Makanan dari Kedelai dan Pengolahan Kedelai Bukan Kecap dan Tempe', golongan_kode: '107' },
  { kode: '1079', nama: 'Industri Produk Makanan Lainnya', golongan_kode: '107' },
  // 104 - Minyak dan lemak
  { kode: '1040', nama: 'Industri Minyak dan Lemak Nabati dan Hewani', golongan_kode: '104' },
  // 900 - Hiburan
  { kode: '9000', nama: 'Aktivitas Hiburan, Kesenian dan Kreativitas', golongan_kode: '900' },
  // New chains
  { kode: '0510', nama: 'Pertambangan Batu Bara', golongan_kode: '051' },
  { kode: '0810', nama: 'Pertambangan Batu, Pasir dan Tanah Liat', golongan_kode: '081' },
  { kode: '3510', nama: 'Penyediaan Tenaga Listrik', golongan_kode: '351' },
  { kode: '3600', nama: 'Pengelolaan Air', golongan_kode: '360' },
  { kode: '3811', nama: 'Pengumpulan Sampah Tidak Berbahaya', golongan_kode: '381' },
  { kode: '4100', nama: 'Konstruksi Gedung', golongan_kode: '410' },
  { kode: '4210', nama: 'Konstruksi Jalan dan Rel Kereta Api', golongan_kode: '421' },
  { kode: '4311', nama: 'Pembongkaran', golongan_kode: '431' },
  { kode: '5011', nama: 'Angkutan Laut Penumpang', golongan_kode: '501' },
  { kode: '0111', nama: 'Pertanian Serealia', golongan_kode: '011' },
  { kode: '0113', nama: 'Pertanian Sayuran, Buah, dan Tanaman Obat', golongan_kode: '011' },
  { kode: '0121', nama: 'Pertanian Tanaman Tahunan Penghasil Buah', golongan_kode: '012' },
  { kode: '0141', nama: 'Peternakan Sapi dan Kerbau', golongan_kode: '014' },
  { kode: '0311', nama: 'Perikanan Tangkap di Laut', golongan_kode: '031' },
  { kode: '0321', nama: 'Budidaya Air Laut', golongan_kode: '032' },
  { kode: '1311', nama: 'Persiapan Serat Tekstil dan Pemintalan', golongan_kode: '131' },
  { kode: '1511', nama: 'Industri Kulit dan Barang dari Kulit', golongan_kode: '151' },
  { kode: '1520', nama: 'Industri Alas Kaki', golongan_kode: '152' },
  { kode: '1610', nama: 'Penggergajian dan Pengawetan Kayu', golongan_kode: '161' },
  { kode: '1621', nama: 'Industri Barang dari Kayu', golongan_kode: '162' },
  { kode: '1700', nama: 'Industri Kertas dan Barang dari Kertas', golongan_kode: '170' },
  { kode: '1811', nama: 'Percetakan', golongan_kode: '181' },
  { kode: '3100', nama: 'Industri Furnitur', golongan_kode: '310' },
  { kode: '3211', nama: 'Industri Perhiasan', golongan_kode: '321' },
  { kode: '3290', nama: 'Industri Pengolahan Lainnya YTDL', golongan_kode: '329' },
  { kode: '4510', nama: 'Perdagangan Mobil', golongan_kode: '451' },
  { kode: '4540', nama: 'Perdagangan Sepeda Motor', golongan_kode: '454' },
  { kode: '4610', nama: 'Perdagangan Besar Atas Dasar Balas Jasa', golongan_kode: '461' },
  { kode: '4620', nama: 'Perdagangan Besar Hasil Pertanian', golongan_kode: '462' },
  { kode: '4690', nama: 'Perdagangan Besar Lainnya', golongan_kode: '469' },
  { kode: '4921', nama: 'Angkutan Bus', golongan_kode: '492' },
  { kode: '5210', nama: 'Pergudangan dan Penyimpanan', golongan_kode: '521' },
  { kode: '5320', nama: 'Aktivitas Kurir', golongan_kode: '532' },
  { kode: '5910', nama: 'Produksi Film dan Video', golongan_kode: '591' },
  { kode: '6010', nama: 'Penyiaran Radio', golongan_kode: '601' },
  { kode: '6020', nama: 'Penyiaran Televisi', golongan_kode: '602' },
  { kode: '6110', nama: 'Telekomunikasi Kabel', golongan_kode: '611' },
  { kode: '6120', nama: 'Telekomunikasi Tanpa Kabel', golongan_kode: '612' },
  { kode: '6411', nama: 'Bank Sentral', golongan_kode: '641' },
  { kode: '6419', nama: 'Perantara Moneter Lainnya', golongan_kode: '641' },
  { kode: '6492', nama: 'Aktivitas Pembiayaan', golongan_kode: '649' },
  { kode: '6611', nama: 'Administrasi Pasar Keuangan', golongan_kode: '661' },
  { kode: '6910', nama: 'Aktivitas Hukum', golongan_kode: '691' },
  { kode: '6920', nama: 'Aktivitas Akuntansi', golongan_kode: '692' },
  { kode: '7020', nama: 'Aktivitas Konsultasi Manajemen', golongan_kode: '702' },
  { kode: '7110', nama: 'Aktivitas Arsitektur dan Rekayasa', golongan_kode: '711' },
  { kode: '8210', nama: 'Aktivitas Administrasi Kantor', golongan_kode: '821' },
  { kode: '8510', nama: 'Pendidikan Dasar', golongan_kode: '851' },
  { kode: '8530', nama: 'Pendidikan Tinggi', golongan_kode: '853' },
  { kode: '8541', nama: 'Pendidikan Olahraga dan Rekreasi', golongan_kode: '854' },
  { kode: '8549', nama: 'Pendidikan Lainnya YTDL', golongan_kode: '854' },
  { kode: '9311', nama: 'Pengoperasian Fasilitas Olahraga', golongan_kode: '931' },
  { kode: '9321', nama: 'Aktivitas Taman Bertema dan Rekreasi', golongan_kode: '932' },
  { kode: '6810', nama: 'Real Estat dengan Hak Milik', golongan_kode: '681' },
  { kode: '6820', nama: 'Real Estat Atas Dasar Balas Jasa', golongan_kode: '682' },
  { kode: '8411', nama: 'Administrasi Pemerintahan Umum', golongan_kode: '841' },
  { kode: '8610', nama: 'Aktivitas Rumah Sakit', golongan_kode: '861' },
  { kode: '8620', nama: 'Aktivitas Praktik Dokter', golongan_kode: '862' },
  { kode: '8690', nama: 'Aktivitas Kesehatan Lainnya', golongan_kode: '869' },
  { kode: '8710', nama: 'Perawatan Kesehatan Tinggal', golongan_kode: '871' },
  { kode: '8810', nama: 'Aktivitas Sosial Tanpa Akomodasi', golongan_kode: '881' },
  { kode: '9700', nama: 'Aktivitas Rumah Tangga sebagai Pemberi Kerja', golongan_kode: '970' },
  { kode: '9900', nama: 'Aktivitas Badan Internasional', golongan_kode: '990' },
  // === Tambahan Subgolongan untuk Golongan baru ===
  // Kehutanan
  { kode: '0210', nama: 'Silvikultur dan Kegiatan Kehutanan Lainnya', golongan_kode: '021' },
  { kode: '0220', nama: 'Penebangan Kayu', golongan_kode: '022' },
  { kode: '0230', nama: 'Pengumpulan Hasil Hutan Bukan Kayu', golongan_kode: '023' },
  { kode: '0240', nama: 'Jasa Penunjang Kehutanan', golongan_kode: '024' },
  // Pertambangan Migas
  { kode: '0610', nama: 'Pertambangan Minyak Bumi', golongan_kode: '061' },
  { kode: '0620', nama: 'Pertambangan Gas Alam dan Panas Bumi', golongan_kode: '062' },
  // Bijih Logam
  { kode: '0710', nama: 'Pertambangan Bijih Besi', golongan_kode: '071' },
  { kode: '0721', nama: 'Pertambangan Bijih Logam Mulia', golongan_kode: '072' },
  { kode: '0729', nama: 'Pertambangan Bijih Logam Bukan Besi Lainnya', golongan_kode: '072' },
  // Jasa Pertambangan
  { kode: '0910', nama: 'Aktivitas Penunjang Pertambangan Minyak Bumi dan Gas Alam', golongan_kode: '091' },
  { kode: '0990', nama: 'Aktivitas Penunjang Pertambangan dan Penggalian Lainnya', golongan_kode: '099' },
  // Tembakau
  { kode: '1200', nama: 'Industri Pengolahan Tembakau', golongan_kode: '120' },
  // Batu Bara & Minyak
  { kode: '1910', nama: 'Industri Produk dari Batu Bara', golongan_kode: '191' },
  { kode: '1920', nama: 'Industri Pengilangan Minyak Bumi', golongan_kode: '192' },
  // Bahan Kimia
  { kode: '2011', nama: 'Industri Bahan Kimia Dasar', golongan_kode: '201' },
  { kode: '2012', nama: 'Industri Pupuk dan Nitrogen', golongan_kode: '201' },
  { kode: '2013', nama: 'Industri Plastik dan Karet Sintetis dalam Bentuk Dasar', golongan_kode: '201' },
  { kode: '2021', nama: 'Industri Pestisida dan Produk Agrokimia Lainnya', golongan_kode: '202' },
  { kode: '2022', nama: 'Industri Cat, Pernis dan Pelapisan Sejenis', golongan_kode: '202' },
  { kode: '2023', nama: 'Industri Sabun, Deterjen, Bahan Pembersih, Parfum dan Kosmetik', golongan_kode: '202' },
  { kode: '2029', nama: 'Industri Bahan Kimia Lainnya YTDL', golongan_kode: '202' },
  // Farmasi
  { kode: '2100', nama: 'Industri Farmasi, Produk Obat Kimia dan Obat Tradisional', golongan_kode: '210' },
  // Karet & Plastik
  { kode: '2211', nama: 'Industri Ban dan Vulkanisir Ban', golongan_kode: '221' },
  { kode: '2219', nama: 'Industri Barang dari Karet Lainnya', golongan_kode: '221' },
  { kode: '2220', nama: 'Industri Barang dari Plastik', golongan_kode: '222' },
  // Barang Galian
  { kode: '2310', nama: 'Industri Kaca dan Barang dari Kaca', golongan_kode: '231' },
  { kode: '2391', nama: 'Industri Barang dari Tanah Liat/Keramik', golongan_kode: '239' },
  { kode: '2395', nama: 'Industri Semen, Kapur dan Gips', golongan_kode: '239' },
  { kode: '2399', nama: 'Industri Barang Galian Bukan Logam Lainnya YTDL', golongan_kode: '239' },
  // Logam Dasar
  { kode: '2410', nama: 'Industri Logam Dasar Besi dan Baja', golongan_kode: '241' },
  { kode: '2420', nama: 'Industri Logam Dasar Mulia dan Logam Dasar Bukan Besi', golongan_kode: '242' },
  { kode: '2431', nama: 'Industri Pengecoran Besi dan Baja', golongan_kode: '243' },
  { kode: '2432', nama: 'Industri Pengecoran Logam Bukan Besi', golongan_kode: '243' },
  // Barang Logam
  { kode: '2511', nama: 'Industri Barang Logam Siap Pasang untuk Bangunan', golongan_kode: '251' },
  { kode: '2591', nama: 'Industri Penempaan, Pengepresan dan Penggulungan Logam', golongan_kode: '259' },
  { kode: '2599', nama: 'Industri Barang Logam Lainnya YTDL', golongan_kode: '259' },
  // Komputer & Elektronik
  { kode: '2610', nama: 'Industri Komponen dan Papan Elektronik', golongan_kode: '261' },
  { kode: '2620', nama: 'Industri Komputer dan Perlengkapannya', golongan_kode: '262' },
  { kode: '2630', nama: 'Industri Peralatan Komunikasi', golongan_kode: '263' },
  { kode: '2640', nama: 'Industri Peralatan Audio dan Video Elektronik', golongan_kode: '264' },
  // Peralatan Listrik
  { kode: '2710', nama: 'Industri Motor Listrik, Generator dan Transformator', golongan_kode: '271' },
  { kode: '2720', nama: 'Industri Batu Baterai dan Akumulator Listrik', golongan_kode: '272' },
  { kode: '2740', nama: 'Industri Peralatan Penerangan Listrik', golongan_kode: '274' },
  { kode: '2790', nama: 'Industri Peralatan Listrik Lainnya', golongan_kode: '279' },
  // Mesin
  { kode: '2811', nama: 'Industri Motor dan Turbin', golongan_kode: '281' },
  { kode: '2819', nama: 'Industri Mesin untuk Keperluan Umum Lainnya', golongan_kode: '281' },
  { kode: '2821', nama: 'Industri Mesin Pertanian dan Kehutanan', golongan_kode: '282' },
  { kode: '2829', nama: 'Industri Mesin untuk Keperluan Khusus Lainnya', golongan_kode: '282' },
  // Kendaraan Bermotor
  { kode: '2910', nama: 'Industri Kendaraan Bermotor Roda Empat atau Lebih', golongan_kode: '291' },
  { kode: '2920', nama: 'Industri Karoseri Kendaraan Bermotor', golongan_kode: '292' },
  { kode: '2930', nama: 'Industri Suku Cadang dan Aksesori Kendaraan Bermotor', golongan_kode: '293' },
  // Alat Angkutan Lainnya
  { kode: '3011', nama: 'Industri Pembuatan Kapal', golongan_kode: '301' },
  { kode: '3012', nama: 'Industri Pembuatan Perahu', golongan_kode: '301' },
  { kode: '3030', nama: 'Industri Pesawat Terbang dan Perlengkapannya', golongan_kode: '303' },
  { kode: '3091', nama: 'Industri Sepeda Motor', golongan_kode: '309' },
  { kode: '3099', nama: 'Industri Alat Angkutan Lainnya YTDL', golongan_kode: '309' },
  // Reparasi Mesin
  { kode: '3311', nama: 'Reparasi Produk Logam Pabrikasi', golongan_kode: '331' },
  { kode: '3312', nama: 'Reparasi Mesin', golongan_kode: '331' },
  { kode: '3314', nama: 'Reparasi Peralatan Listrik', golongan_kode: '331' },
  { kode: '3320', nama: 'Pemasangan Mesin dan Peralatan Industri', golongan_kode: '332' },
  // Air Limbah
  { kode: '3700', nama: 'Pengelolaan Air Limbah', golongan_kode: '370' },
  // Remediasi
  { kode: '3900', nama: 'Aktivitas Remediasi dan Pengelolaan Limbah Lainnya', golongan_kode: '390' },
  // Angkutan Udara
  { kode: '5110', nama: 'Angkutan Udara Penumpang', golongan_kode: '511' },
  { kode: '5120', nama: 'Angkutan Udara Barang', golongan_kode: '512' },
  // Asuransi
  { kode: '6511', nama: 'Asuransi Jiwa', golongan_kode: '651' },
  { kode: '6512', nama: 'Asuransi Bukan Jiwa', golongan_kode: '651' },
  { kode: '6520', nama: 'Reasuransi', golongan_kode: '652' },
  { kode: '6530', nama: 'Dana Pensiun', golongan_kode: '653' },
  // Penelitian
  { kode: '7210', nama: 'Penelitian dan Pengembangan Ilmu Pengetahuan Alam dan Teknologi', golongan_kode: '721' },
  { kode: '7220', nama: 'Penelitian dan Pengembangan Ilmu Pengetahuan Sosial dan Humaniora', golongan_kode: '722' },
  // Kesehatan Hewan
  { kode: '7500', nama: 'Aktivitas Kesehatan Hewan', golongan_kode: '750' },
  // Persewaan
  { kode: '7710', nama: 'Persewaan dan Sewa Guna Usaha Kendaraan Bermotor', golongan_kode: '771' },
  { kode: '7720', nama: 'Persewaan dan Sewa Guna Usaha Barang Pribadi dan Rumah Tangga', golongan_kode: '772' },
  { kode: '7730', nama: 'Persewaan dan Sewa Guna Usaha Mesin dan Peralatan', golongan_kode: '773' },
  // Ketenagakerjaan
  { kode: '7810', nama: 'Aktivitas Agen Tenaga Kerja', golongan_kode: '781' },
  { kode: '7820', nama: 'Aktivitas Penyedia Tenaga Kerja Sementara', golongan_kode: '782' },
  // Keamanan
  { kode: '8010', nama: 'Aktivitas Keamanan Swasta', golongan_kode: '801' },
  { kode: '8020', nama: 'Aktivitas Jasa Sistem Keamanan', golongan_kode: '802' },
  { kode: '8030', nama: 'Aktivitas Penyelidikan', golongan_kode: '803' },
  // Perawatan Bangunan
  { kode: '8110', nama: 'Aktivitas Penunjang Fasilitas', golongan_kode: '811' },
  { kode: '8121', nama: 'Aktivitas Kebersihan Umum Bangunan', golongan_kode: '812' },
  { kode: '8129', nama: 'Aktivitas Kebersihan Lainnya', golongan_kode: '812' },
  { kode: '8130', nama: 'Aktivitas Perawatan Lansekap', golongan_kode: '813' },
  // Perpustakaan Museum
  { kode: '9101', nama: 'Aktivitas Perpustakaan dan Arsip', golongan_kode: '910' },
  { kode: '9102', nama: 'Aktivitas Museum dan Operasional Bangunan Bersejarah', golongan_kode: '910' },
  { kode: '9103', nama: 'Aktivitas Kebun Raya, Kebun Binatang dan Cagar Alam', golongan_kode: '910' },
  // Perjudian
  { kode: '9200', nama: 'Aktivitas Perjudian dan Pertaruhan', golongan_kode: '920' },
  // Organisasi
  { kode: '9411', nama: 'Aktivitas Organisasi Bisnis dan Pengusaha', golongan_kode: '941' },
  { kode: '9412', nama: 'Aktivitas Organisasi Profesional', golongan_kode: '941' },
  { kode: '9420', nama: 'Aktivitas Serikat Pekerja', golongan_kode: '942' },
  { kode: '9491', nama: 'Aktivitas Organisasi Keagamaan', golongan_kode: '949' },
  { kode: '9492', nama: 'Aktivitas Organisasi Politik', golongan_kode: '949' },
  { kode: '9499', nama: 'Aktivitas Organisasi Keanggotaan Lainnya YTDL', golongan_kode: '949' },
]

export const kbliKelompok: KBLIKelompok[] = [
  // 4791 - E-commerce
  { kode: '47911', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Makanan, Minuman, dan Tembakau', subgolongan_kode: '4791' },
  { kode: '47912', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Pakaian', subgolongan_kode: '4791' },
  { kode: '47913', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Elektronik dan Peralatan Rumah Tangga', subgolongan_kode: '4791' },
  { kode: '47914', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Kosmetik dan Perawatan', subgolongan_kode: '4791' },
  { kode: '47919', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Komoditi Lainnya', subgolongan_kode: '4791' },
  { kode: '47920', nama: 'Perdagangan Eceran Melalui Pemesanan Pos', subgolongan_kode: '4791' },
  // 4779 - Barang lainnya
  { kode: '47790', nama: 'Perdagangan Eceran Khusus Barang Lainnya YTDL di Toko', subgolongan_kode: '4779' },
  // 5610 - Restoran
  { kode: '56101', nama: 'Restoran', subgolongan_kode: '5610' },
  { kode: '56102', nama: 'Warung Makan', subgolongan_kode: '5610' },
  { kode: '56103', nama: 'Kedai Makanan', subgolongan_kode: '5610' },
  { kode: '56104', nama: 'Penjaja Makanan Keliling', subgolongan_kode: '5610' },
  { kode: '56105', nama: 'Penjaja Makanan Kaki Lima', subgolongan_kode: '5610' },
  { kode: '56106', nama: 'Kantin', subgolongan_kode: '5610' },
  { kode: '56109', nama: 'Penyediaan Makanan Lainnya', subgolongan_kode: '5610' },
  // 5630 - Minuman
  { kode: '56301', nama: 'Bar', subgolongan_kode: '5630' },
  { kode: '56302', nama: 'Rumah Minum/Kafe', subgolongan_kode: '5630' },
  { kode: '56303', nama: 'Penjaja Minuman Keliling', subgolongan_kode: '5630' },
  { kode: '56309', nama: 'Penyediaan Minuman Lainnya', subgolongan_kode: '5630' },
  // 5510 - Hotel
  { kode: '55101', nama: 'Hotel Bintang', subgolongan_kode: '5510' },
  { kode: '55102', nama: 'Hotel Melati', subgolongan_kode: '5510' },
  { kode: '55103', nama: 'Losmen/Penginapan', subgolongan_kode: '5510' },
  { kode: '55109', nama: 'Hotel dan Akomodasi Sejenis Lainnya', subgolongan_kode: '5510' },
  // 5520 - Akomodasi jangka pendek
  { kode: '55201', nama: 'Pondok Wisata', subgolongan_kode: '5520' },
  { kode: '55202', nama: 'Villa', subgolongan_kode: '5520' },
  { kode: '55203', nama: 'Bungalo', subgolongan_kode: '5520' },
  { kode: '55204', nama: 'Homestay', subgolongan_kode: '5520' },
  // 6201 - Pemrograman
  { kode: '62010', nama: 'Aktivitas Pemrograman Komputer', subgolongan_kode: '6201' },
  // 6311 - Hosting
  { kode: '63111', nama: 'Pengolahan Data', subgolongan_kode: '6311' },
  { kode: '63112', nama: 'Hosting Web dan Sejenisnya', subgolongan_kode: '6311' },
  // 6312 - Portal web
  { kode: '63120', nama: 'Portal Web dan Platform Media Sosial', subgolongan_kode: '6312' },
  // 7310 - Periklanan
  { kode: '73100', nama: 'Periklanan', subgolongan_kode: '7310' },
  // 7410 - Desain
  { kode: '74100', nama: 'Aktivitas Desain Khusus', subgolongan_kode: '7410' },
  // 7420 - Fotografi
  { kode: '74200', nama: 'Aktivitas Fotografi', subgolongan_kode: '7420' },
  // 7911 - Agen perjalanan
  { kode: '79110', nama: 'Aktivitas Agen Perjalanan', subgolongan_kode: '7911' },
  // 7912 - Tour
  { kode: '79120', nama: 'Aktivitas Penyelenggara Tur', subgolongan_kode: '7912' },
  // 9511 - Reparasi komputer
  { kode: '95110', nama: 'Reparasi Komputer dan Perlengkapan Komputer', subgolongan_kode: '9511' },
  // 9512 - Reparasi HP
  { kode: '95120', nama: 'Reparasi Alat Komunikasi', subgolongan_kode: '9512' },
  // 9602 - Salon
  { kode: '96020', nama: 'Aktivitas Salon Rambut dan Salon Kecantikan', subgolongan_kode: '9602' },
  // 9609 - Jasa lainnya
  { kode: '96091', nama: 'Jasa Kebugaran', subgolongan_kode: '9609' },
  { kode: '96092', nama: 'Jasa Spa', subgolongan_kode: '9609' },
  { kode: '96099', nama: 'Aktivitas Jasa Perseorangan Lainnya YTDL', subgolongan_kode: '9609' },
  // 1071 - Roti dan kue
  { kode: '10710', nama: 'Industri Produk Roti dan Kue', subgolongan_kode: '1071' },
  // 1040 - Minyak
  { kode: '10401', nama: 'Industri Minyak Mentah dan Lemak Nabati', subgolongan_kode: '1040' },
  // 1079 - Makanan lainnya
  { kode: '10791', nama: 'Industri Kerupuk, Keripik, Peyek dan Sejenisnya', subgolongan_kode: '1079' },
  { kode: '10792', nama: 'Industri Kopi', subgolongan_kode: '1079' },
  { kode: '10793', nama: 'Industri Teh', subgolongan_kode: '1079' },
  { kode: '10794', nama: 'Industri Bumbu Masak dan Penyedap Masakan', subgolongan_kode: '1079' },
  { kode: '10799', nama: 'Industri Produk Makanan Lainnya YTDL', subgolongan_kode: '1079' },
  // 4771 - Pakaian
  { kode: '47711', nama: 'Perdagangan Eceran Khusus Pakaian Anak di Toko', subgolongan_kode: '4771' },
  { kode: '47712', nama: 'Perdagangan Eceran Khusus Pakaian Dewasa di Toko', subgolongan_kode: '4771' },
  { kode: '47719', nama: 'Perdagangan Eceran Khusus Pakaian Lainnya di Toko', subgolongan_kode: '4771' },
  // 4775 - Kosmetik
  { kode: '47750', nama: 'Perdagangan Eceran Khusus Produk Kosmetik dan Perawatan Tubuh di Toko', subgolongan_kode: '4775' },
  // 9000 - Hiburan
  { kode: '90001', nama: 'Aktivitas Seni Pertunjukan', subgolongan_kode: '9000' },
  { kode: '90002', nama: 'Aktivitas Hiburan dan Rekreasi', subgolongan_kode: '9000' },
  { kode: '90003', nama: 'Aktivitas Kerajinan dan Seni Kreatif', subgolongan_kode: '9000' },
  // New chains
  { kode: '05100', nama: 'Pertambangan Batu Bara', subgolongan_kode: '0510' },
  { kode: '08100', nama: 'Pertambangan Batu, Pasir dan Tanah Liat', subgolongan_kode: '0810' },
  { kode: '35100', nama: 'Penyediaan Tenaga Listrik', subgolongan_kode: '3510' },
  { kode: '36000', nama: 'Pengelolaan Air', subgolongan_kode: '3600' },
  { kode: '38110', nama: 'Pengumpulan Sampah Tidak Berbahaya', subgolongan_kode: '3811' },
  { kode: '41001', nama: 'Konstruksi Gedung Tempat Tinggal', subgolongan_kode: '4100' },
  { kode: '41002', nama: 'Konstruksi Gedung Bukan Tempat Tinggal', subgolongan_kode: '4100' },
  { kode: '42100', nama: 'Konstruksi Jalan dan Rel Kereta Api', subgolongan_kode: '4210' },
  { kode: '43110', nama: 'Pembongkaran', subgolongan_kode: '4311' },
  { kode: '50110', nama: 'Angkutan Laut Penumpang', subgolongan_kode: '5011' },
  { kode: '01111', nama: 'Pertanian Padi', subgolongan_kode: '0111' },
  { kode: '01112', nama: 'Pertanian Jagung', subgolongan_kode: '0111' },
  { kode: '01131', nama: 'Pertanian Sayuran', subgolongan_kode: '0113' },
  { kode: '01210', nama: 'Pertanian Tanaman Tahunan Penghasil Buah', subgolongan_kode: '0121' },
  { kode: '01411', nama: 'Peternakan Sapi', subgolongan_kode: '0141' },
  { kode: '03111', nama: 'Penangkapan Ikan di Laut', subgolongan_kode: '0311' },
  { kode: '03210', nama: 'Budidaya Air Laut', subgolongan_kode: '0321' },
  { kode: '13110', nama: 'Persiapan Serat Tekstil', subgolongan_kode: '1311' },
  { kode: '15110', nama: 'Penyamakan dan Pengolahan Kulit', subgolongan_kode: '1511' },
  { kode: '15200', nama: 'Industri Alas Kaki', subgolongan_kode: '1520' },
  { kode: '16100', nama: 'Penggergajian dan Pengawetan Kayu', subgolongan_kode: '1610' },
  { kode: '16211', nama: 'Industri Kayu Lapis', subgolongan_kode: '1621' },
  { kode: '17000', nama: 'Industri Kertas dan Barang dari Kertas', subgolongan_kode: '1700' },
  { kode: '18110', nama: 'Percetakan', subgolongan_kode: '1811' },
  { kode: '31001', nama: 'Industri Furnitur dari Kayu', subgolongan_kode: '3100' },
  { kode: '31002', nama: 'Industri Furnitur dari Logam', subgolongan_kode: '3100' },
  { kode: '32110', nama: 'Industri Perhiasan', subgolongan_kode: '3211' },
  { kode: '32900', nama: 'Industri Pengolahan Lainnya YTDL', subgolongan_kode: '3290' },
  { kode: '45100', nama: 'Perdagangan Mobil', subgolongan_kode: '4510' },
  { kode: '45400', nama: 'Perdagangan Sepeda Motor', subgolongan_kode: '4540' },
  { kode: '46100', nama: 'Perdagangan Besar Atas Dasar Balas Jasa', subgolongan_kode: '4610' },
  { kode: '46200', nama: 'Perdagangan Besar Hasil Pertanian', subgolongan_kode: '4620' },
  { kode: '46900', nama: 'Perdagangan Besar Lainnya', subgolongan_kode: '4690' },
  { kode: '49210', nama: 'Angkutan Bus', subgolongan_kode: '4921' },
  { kode: '52100', nama: 'Pergudangan dan Penyimpanan', subgolongan_kode: '5210' },
  { kode: '53200', nama: 'Aktivitas Kurir', subgolongan_kode: '5320' },
  { kode: '59100', nama: 'Produksi Film dan Video', subgolongan_kode: '5910' },
  { kode: '60100', nama: 'Penyiaran Radio', subgolongan_kode: '6010' },
  { kode: '60200', nama: 'Penyiaran Televisi', subgolongan_kode: '6020' },
  { kode: '61100', nama: 'Telekomunikasi Kabel', subgolongan_kode: '6110' },
  { kode: '61200', nama: 'Telekomunikasi Tanpa Kabel', subgolongan_kode: '6120' },
  { kode: '64110', nama: 'Bank Sentral', subgolongan_kode: '6411' },
  { kode: '64190', nama: 'Perantara Moneter Lainnya', subgolongan_kode: '6419' },
  { kode: '64920', nama: 'Aktivitas Pembiayaan', subgolongan_kode: '6492' },
  { kode: '66110', nama: 'Administrasi Pasar Keuangan', subgolongan_kode: '6611' },
  { kode: '69100', nama: 'Aktivitas Hukum', subgolongan_kode: '6910' },
  { kode: '69200', nama: 'Aktivitas Akuntansi', subgolongan_kode: '6920' },
  { kode: '70200', nama: 'Aktivitas Konsultasi Manajemen', subgolongan_kode: '7020' },
  { kode: '71100', nama: 'Aktivitas Arsitektur dan Rekayasa', subgolongan_kode: '7110' },
  { kode: '82100', nama: 'Aktivitas Administrasi Kantor', subgolongan_kode: '8210' },
  { kode: '85100', nama: 'Pendidikan Dasar', subgolongan_kode: '8510' },
  { kode: '85300', nama: 'Pendidikan Tinggi', subgolongan_kode: '8530' },
  { kode: '85410', nama: 'Pendidikan Olahraga dan Rekreasi', subgolongan_kode: '8541' },
  { kode: '85490', nama: 'Pendidikan Lainnya YTDL', subgolongan_kode: '8549' },
  { kode: '93110', nama: 'Pengoperasian Fasilitas Olahraga', subgolongan_kode: '9311' },
  { kode: '93210', nama: 'Aktivitas Taman Bertema dan Rekreasi', subgolongan_kode: '9321' },
  { kode: '68100', nama: 'Real Estat dengan Hak Milik', subgolongan_kode: '6810' },
  { kode: '68200', nama: 'Real Estat Atas Dasar Balas Jasa', subgolongan_kode: '6820' },
  { kode: '84111', nama: 'Administrasi Pemerintahan Umum', subgolongan_kode: '8411' },
  { kode: '86100', nama: 'Aktivitas Rumah Sakit', subgolongan_kode: '8610' },
  { kode: '86201', nama: 'Aktivitas Praktik Dokter Umum', subgolongan_kode: '8620' },
  { kode: '86202', nama: 'Aktivitas Praktik Dokter Spesialis', subgolongan_kode: '8620' },
  { kode: '86901', nama: 'Aktivitas Bidan dan Perawat', subgolongan_kode: '8690' },
  { kode: '86909', nama: 'Aktivitas Kesehatan Lainnya YTDL', subgolongan_kode: '8690' },
  { kode: '87100', nama: 'Perawatan Kesehatan Tinggal', subgolongan_kode: '8710' },
  { kode: '88100', nama: 'Aktivitas Sosial Tanpa Akomodasi', subgolongan_kode: '8810' },
  { kode: '97000', nama: 'Aktivitas Rumah Tangga sebagai Pemberi Kerja', subgolongan_kode: '9700' },
  { kode: '99000', nama: 'Aktivitas Badan Internasional', subgolongan_kode: '9900' },
  // === Tambahan Kelompok untuk Subgolongan baru ===
  // Kehutanan
  { kode: '02100', nama: 'Silvikultur dan Kegiatan Kehutanan Lainnya', subgolongan_kode: '0210' },
  { kode: '02200', nama: 'Penebangan Kayu', subgolongan_kode: '0220' },
  { kode: '02300', nama: 'Pengumpulan Hasil Hutan Bukan Kayu', subgolongan_kode: '0230' },
  { kode: '02400', nama: 'Jasa Penunjang Kehutanan', subgolongan_kode: '0240' },
  // Pertambangan Migas
  { kode: '06100', nama: 'Pertambangan Minyak Bumi', subgolongan_kode: '0610' },
  { kode: '06200', nama: 'Pertambangan Gas Alam dan Panas Bumi', subgolongan_kode: '0620' },
  // Bijih Logam
  { kode: '07100', nama: 'Pertambangan Bijih Besi', subgolongan_kode: '0710' },
  { kode: '07210', nama: 'Pertambangan Bijih Emas dan Perak', subgolongan_kode: '0721' },
  { kode: '07290', nama: 'Pertambangan Bijih Logam Bukan Besi Lainnya', subgolongan_kode: '0729' },
  // Jasa Pertambangan
  { kode: '09100', nama: 'Aktivitas Penunjang Pertambangan Minyak Bumi dan Gas Alam', subgolongan_kode: '0910' },
  { kode: '09900', nama: 'Aktivitas Penunjang Pertambangan dan Penggalian Lainnya', subgolongan_kode: '0990' },
  // Tembakau
  { kode: '12001', nama: 'Industri Rokok dan Cerutu', subgolongan_kode: '1200' },
  { kode: '12009', nama: 'Industri Pengolahan Tembakau Lainnya', subgolongan_kode: '1200' },
  // Batu Bara & Minyak
  { kode: '19100', nama: 'Industri Produk dari Batu Bara', subgolongan_kode: '1910' },
  { kode: '19200', nama: 'Industri Pengilangan Minyak Bumi', subgolongan_kode: '1920' },
  // Bahan Kimia
  { kode: '20111', nama: 'Industri Kimia Dasar Anorganik', subgolongan_kode: '2011' },
  { kode: '20112', nama: 'Industri Kimia Dasar Organik', subgolongan_kode: '2011' },
  { kode: '20121', nama: 'Industri Pupuk', subgolongan_kode: '2012' },
  { kode: '20130', nama: 'Industri Plastik dan Karet Sintetis dalam Bentuk Dasar', subgolongan_kode: '2013' },
  { kode: '20210', nama: 'Industri Pestisida dan Produk Agrokimia Lainnya', subgolongan_kode: '2021' },
  { kode: '20220', nama: 'Industri Cat, Pernis dan Pelapisan Sejenis', subgolongan_kode: '2022' },
  { kode: '20231', nama: 'Industri Sabun dan Deterjen', subgolongan_kode: '2023' },
  { kode: '20232', nama: 'Industri Parfum dan Kosmetik', subgolongan_kode: '2023' },
  { kode: '20290', nama: 'Industri Bahan Kimia Lainnya YTDL', subgolongan_kode: '2029' },
  // Farmasi
  { kode: '21001', nama: 'Industri Farmasi dan Produk Obat', subgolongan_kode: '2100' },
  { kode: '21002', nama: 'Industri Obat Tradisional dan Herbal', subgolongan_kode: '2100' },
  // Karet & Plastik
  { kode: '22111', nama: 'Industri Ban Luar dan Ban Dalam', subgolongan_kode: '2211' },
  { kode: '22190', nama: 'Industri Barang dari Karet Lainnya', subgolongan_kode: '2219' },
  { kode: '22201', nama: 'Industri Barang dari Plastik untuk Bangunan', subgolongan_kode: '2220' },
  { kode: '22202', nama: 'Industri Barang dari Plastik untuk Pengemasan', subgolongan_kode: '2220' },
  { kode: '22209', nama: 'Industri Barang dari Plastik Lainnya', subgolongan_kode: '2220' },
  // Barang Galian
  { kode: '23100', nama: 'Industri Kaca dan Barang dari Kaca', subgolongan_kode: '2310' },
  { kode: '23911', nama: 'Industri Batu Bata dan Genteng dari Tanah Liat', subgolongan_kode: '2391' },
  { kode: '23912', nama: 'Industri Keramik', subgolongan_kode: '2391' },
  { kode: '23950', nama: 'Industri Semen, Kapur dan Gips', subgolongan_kode: '2395' },
  { kode: '23990', nama: 'Industri Barang Galian Bukan Logam Lainnya YTDL', subgolongan_kode: '2399' },
  // Logam Dasar
  { kode: '24100', nama: 'Industri Logam Dasar Besi dan Baja', subgolongan_kode: '2410' },
  { kode: '24200', nama: 'Industri Logam Dasar Mulia dan Logam Dasar Bukan Besi', subgolongan_kode: '2420' },
  { kode: '24310', nama: 'Industri Pengecoran Besi dan Baja', subgolongan_kode: '2431' },
  { kode: '24320', nama: 'Industri Pengecoran Logam Bukan Besi', subgolongan_kode: '2432' },
  // Barang Logam
  { kode: '25110', nama: 'Industri Barang Logam Siap Pasang untuk Bangunan', subgolongan_kode: '2511' },
  { kode: '25910', nama: 'Industri Penempaan, Pengepresan dan Penggulungan Logam', subgolongan_kode: '2591' },
  { kode: '25990', nama: 'Industri Barang Logam Lainnya YTDL', subgolongan_kode: '2599' },
  // Komputer & Elektronik
  { kode: '26100', nama: 'Industri Komponen dan Papan Elektronik', subgolongan_kode: '2610' },
  { kode: '26200', nama: 'Industri Komputer dan Perlengkapannya', subgolongan_kode: '2620' },
  { kode: '26300', nama: 'Industri Peralatan Komunikasi', subgolongan_kode: '2630' },
  { kode: '26400', nama: 'Industri Peralatan Audio dan Video Elektronik', subgolongan_kode: '2640' },
  // Peralatan Listrik
  { kode: '27100', nama: 'Industri Motor Listrik, Generator dan Transformator', subgolongan_kode: '2710' },
  { kode: '27200', nama: 'Industri Batu Baterai dan Akumulator Listrik', subgolongan_kode: '2720' },
  { kode: '27400', nama: 'Industri Peralatan Penerangan Listrik', subgolongan_kode: '2740' },
  { kode: '27900', nama: 'Industri Peralatan Listrik Lainnya', subgolongan_kode: '2790' },
  // Mesin
  { kode: '28110', nama: 'Industri Motor dan Turbin', subgolongan_kode: '2811' },
  { kode: '28190', nama: 'Industri Mesin untuk Keperluan Umum Lainnya', subgolongan_kode: '2819' },
  { kode: '28210', nama: 'Industri Mesin Pertanian dan Kehutanan', subgolongan_kode: '2821' },
  { kode: '28290', nama: 'Industri Mesin untuk Keperluan Khusus Lainnya', subgolongan_kode: '2829' },
  // Kendaraan Bermotor
  { kode: '29100', nama: 'Industri Kendaraan Bermotor Roda Empat atau Lebih', subgolongan_kode: '2910' },
  { kode: '29200', nama: 'Industri Karoseri Kendaraan Bermotor', subgolongan_kode: '2920' },
  { kode: '29300', nama: 'Industri Suku Cadang dan Aksesori Kendaraan Bermotor', subgolongan_kode: '2930' },
  // Alat Angkutan Lainnya
  { kode: '30110', nama: 'Industri Pembuatan Kapal', subgolongan_kode: '3011' },
  { kode: '30120', nama: 'Industri Pembuatan Perahu', subgolongan_kode: '3012' },
  { kode: '30300', nama: 'Industri Pesawat Terbang dan Perlengkapannya', subgolongan_kode: '3030' },
  { kode: '30910', nama: 'Industri Sepeda Motor', subgolongan_kode: '3091' },
  { kode: '30990', nama: 'Industri Alat Angkutan Lainnya YTDL', subgolongan_kode: '3099' },
  // Reparasi Mesin
  { kode: '33110', nama: 'Reparasi Produk Logam Pabrikasi', subgolongan_kode: '3311' },
  { kode: '33120', nama: 'Reparasi Mesin', subgolongan_kode: '3312' },
  { kode: '33140', nama: 'Reparasi Peralatan Listrik', subgolongan_kode: '3314' },
  { kode: '33200', nama: 'Pemasangan Mesin dan Peralatan Industri', subgolongan_kode: '3320' },
  // Air Limbah
  { kode: '37000', nama: 'Pengelolaan Air Limbah', subgolongan_kode: '3700' },
  // Remediasi
  { kode: '39000', nama: 'Aktivitas Remediasi dan Pengelolaan Limbah Lainnya', subgolongan_kode: '3900' },
  // Angkutan Udara
  { kode: '51100', nama: 'Angkutan Udara Penumpang', subgolongan_kode: '5110' },
  { kode: '51200', nama: 'Angkutan Udara Barang', subgolongan_kode: '5120' },
  // Asuransi
  { kode: '65111', nama: 'Asuransi Jiwa Konvensional', subgolongan_kode: '6511' },
  { kode: '65112', nama: 'Asuransi Jiwa Syariah', subgolongan_kode: '6511' },
  { kode: '65121', nama: 'Asuransi Bukan Jiwa Konvensional', subgolongan_kode: '6512' },
  { kode: '65122', nama: 'Asuransi Bukan Jiwa Syariah', subgolongan_kode: '6512' },
  { kode: '65200', nama: 'Reasuransi', subgolongan_kode: '6520' },
  { kode: '65300', nama: 'Dana Pensiun', subgolongan_kode: '6530' },
  // Penelitian
  { kode: '72100', nama: 'Penelitian dan Pengembangan Ilmu Pengetahuan Alam dan Teknologi', subgolongan_kode: '7210' },
  { kode: '72200', nama: 'Penelitian dan Pengembangan Ilmu Pengetahuan Sosial dan Humaniora', subgolongan_kode: '7220' },
  // Kesehatan Hewan
  { kode: '75000', nama: 'Aktivitas Kesehatan Hewan', subgolongan_kode: '7500' },
  // Persewaan
  { kode: '77100', nama: 'Persewaan dan Sewa Guna Usaha Kendaraan Bermotor', subgolongan_kode: '7710' },
  { kode: '77200', nama: 'Persewaan dan Sewa Guna Usaha Barang Pribadi dan Rumah Tangga', subgolongan_kode: '7720' },
  { kode: '77300', nama: 'Persewaan dan Sewa Guna Usaha Mesin dan Peralatan', subgolongan_kode: '7730' },
  // Ketenagakerjaan
  { kode: '78100', nama: 'Aktivitas Agen Tenaga Kerja', subgolongan_kode: '7810' },
  { kode: '78200', nama: 'Aktivitas Penyedia Tenaga Kerja Sementara', subgolongan_kode: '7820' },
  // Keamanan
  { kode: '80100', nama: 'Aktivitas Keamanan Swasta', subgolongan_kode: '8010' },
  { kode: '80200', nama: 'Aktivitas Jasa Sistem Keamanan', subgolongan_kode: '8020' },
  { kode: '80300', nama: 'Aktivitas Penyelidikan', subgolongan_kode: '8030' },
  // Perawatan Bangunan
  { kode: '81100', nama: 'Aktivitas Penunjang Fasilitas', subgolongan_kode: '8110' },
  { kode: '81210', nama: 'Aktivitas Kebersihan Umum Bangunan', subgolongan_kode: '8121' },
  { kode: '81290', nama: 'Aktivitas Kebersihan Lainnya', subgolongan_kode: '8129' },
  { kode: '81300', nama: 'Aktivitas Perawatan Lansekap', subgolongan_kode: '8130' },
  // Perpustakaan Museum
  { kode: '91010', nama: 'Aktivitas Perpustakaan dan Arsip', subgolongan_kode: '9101' },
  { kode: '91020', nama: 'Aktivitas Museum dan Operasional Bangunan Bersejarah', subgolongan_kode: '9102' },
  { kode: '91030', nama: 'Aktivitas Kebun Raya, Kebun Binatang dan Cagar Alam', subgolongan_kode: '9103' },
  // Perjudian
  { kode: '92000', nama: 'Aktivitas Perjudian dan Pertaruhan', subgolongan_kode: '9200' },
  // Organisasi
  { kode: '94110', nama: 'Aktivitas Organisasi Bisnis dan Pengusaha', subgolongan_kode: '9411' },
  { kode: '94120', nama: 'Aktivitas Organisasi Profesional', subgolongan_kode: '9412' },
  { kode: '94200', nama: 'Aktivitas Serikat Pekerja', subgolongan_kode: '9420' },
  { kode: '94910', nama: 'Aktivitas Organisasi Keagamaan', subgolongan_kode: '9491' },
  { kode: '94920', nama: 'Aktivitas Organisasi Politik', subgolongan_kode: '9492' },
  { kode: '94990', nama: 'Aktivitas Organisasi Keanggotaan Lainnya YTDL', subgolongan_kode: '9499' },
]

// Helper functions
export function getGolonganPokokByKategori(kategoriKode: string): KBLIGolonganPokok[] {
  return kbliGolonganPokok.filter(g => g.kategori_kode === kategoriKode)
}

export function getGolonganByGolonganPokok(golonganPokokKode: string): KBLIGolongan[] {
  return kbliGolongan.filter(g => g.golongan_pokok_kode === golonganPokokKode)
}

export function getSubgolonganByGolongan(golonganKode: string): KBLISubgolongan[] {
  return kbliSubgolongan.filter(g => g.golongan_kode === golonganKode)
}

export function getKelompokBySubgolongan(subgolonganKode: string): KBLIKelompok[] {
  return kbliKelompok.filter(g => g.subgolongan_kode === subgolonganKode)
}
