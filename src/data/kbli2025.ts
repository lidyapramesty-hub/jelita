// Data KBLI 2025 - Bertahap (Kategori → Golongan Pokok → Golongan → Subgolongan → Kelompok)
// Difokuskan pada sektor yang relevan dengan ekonomi digital

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
  { kode: 'C', nama: 'Industri Pengolahan' },
  { kode: 'G', nama: 'Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor' },
  { kode: 'H', nama: 'Pengangkutan dan Pergudangan' },
  { kode: 'I', nama: 'Penyediaan Akomodasi dan Penyediaan Makan Minum' },
  { kode: 'J', nama: 'Informasi dan Komunikasi' },
  { kode: 'K', nama: 'Aktivitas Keuangan dan Asuransi' },
  { kode: 'L', nama: 'Real Estat' },
  { kode: 'M', nama: 'Aktivitas Profesional, Ilmiah dan Teknis' },
  { kode: 'N', nama: 'Aktivitas Penyewaan dan Sewa Guna Usaha Tanpa Hak Opsi, Ketenagakerjaan, Agen Perjalanan dan Penunjang Usaha Lainnya' },
  { kode: 'P', nama: 'Pendidikan' },
  { kode: 'Q', nama: 'Aktivitas Kesehatan Manusia dan Aktivitas Sosial' },
  { kode: 'R', nama: 'Kesenian, Hiburan, dan Rekreasi' },
  { kode: 'S', nama: 'Aktivitas Jasa Lainnya' },
]

export const kbliGolonganPokok: KBLIGolonganPokok[] = [
  // A - Pertanian
  { kode: '01', nama: 'Pertanian Tanaman, Peternakan, Perburuan dan Kegiatan YBDI', kategori_kode: 'A' },
  { kode: '03', nama: 'Perikanan', kategori_kode: 'A' },
  // C - Industri Pengolahan
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
  // G - Perdagangan
  { kode: '45', nama: 'Perdagangan, Reparasi Mobil dan Sepeda Motor', kategori_kode: 'G' },
  { kode: '46', nama: 'Perdagangan Besar, Bukan Mobil dan Sepeda Motor', kategori_kode: 'G' },
  { kode: '47', nama: 'Perdagangan Eceran, Bukan Mobil dan Sepeda Motor', kategori_kode: 'G' },
  // H - Transportasi
  { kode: '49', nama: 'Angkutan Darat dan Angkutan Melalui Saluran Pipa', kategori_kode: 'H' },
  { kode: '52', nama: 'Pergudangan dan Penunjang Angkutan', kategori_kode: 'H' },
  { kode: '53', nama: 'Pos dan Kurir', kategori_kode: 'H' },
  // I - Akomodasi & Makan Minum
  { kode: '55', nama: 'Penyediaan Akomodasi', kategori_kode: 'I' },
  { kode: '56', nama: 'Penyediaan Makan Minum', kategori_kode: 'I' },
  // J - Informasi & Komunikasi
  { kode: '58', nama: 'Penerbitan', kategori_kode: 'J' },
  { kode: '59', nama: 'Produksi Gambar Bergerak, Video dan Program Televisi, Perekaman Suara dan Penerbitan Musik', kategori_kode: 'J' },
  { kode: '60', nama: 'Penyiaran dan Pemrograman', kategori_kode: 'J' },
  { kode: '61', nama: 'Telekomunikasi', kategori_kode: 'J' },
  { kode: '62', nama: 'Aktivitas Pemrograman, Konsultasi Komputer dan Kegiatan YBDI', kategori_kode: 'J' },
  { kode: '63', nama: 'Aktivitas Jasa Informasi', kategori_kode: 'J' },
  // K - Keuangan
  { kode: '64', nama: 'Aktivitas Jasa Keuangan, Bukan Asuransi dan Dana Pensiun', kategori_kode: 'K' },
  { kode: '66', nama: 'Aktivitas Penunjang Jasa Keuangan, Asuransi, dan Dana Pensiun', kategori_kode: 'K' },
  // M - Profesional
  { kode: '69', nama: 'Aktivitas Hukum dan Akuntansi', kategori_kode: 'M' },
  { kode: '70', nama: 'Aktivitas Kantor Pusat dan Konsultasi Manajemen', kategori_kode: 'M' },
  { kode: '71', nama: 'Aktivitas Arsitektur dan Rekayasa; Analisis dan Uji Teknis', kategori_kode: 'M' },
  { kode: '73', nama: 'Periklanan dan Riset Pasar', kategori_kode: 'M' },
  { kode: '74', nama: 'Aktivitas Profesional, Ilmiah dan Teknis Lainnya', kategori_kode: 'M' },
  // N - Penyewaan
  { kode: '79', nama: 'Aktivitas Agen Perjalanan, Penyelenggara Tur dan Penunjang Reservasi', kategori_kode: 'N' },
  { kode: '82', nama: 'Aktivitas Administrasi Kantor, Penunjang Kantor dan Penunjang Usaha Lainnya', kategori_kode: 'N' },
  // R - Kesenian
  { kode: '90', nama: 'Aktivitas Hiburan, Kesenian dan Kreativitas', kategori_kode: 'R' },
  { kode: '93', nama: 'Aktivitas Olahraga dan Rekreasi Lainnya', kategori_kode: 'R' },
  // S - Jasa Lainnya
  { kode: '95', nama: 'Reparasi Komputer dan Barang Keperluan Pribadi dan Perlengkapan Rumah Tangga', kategori_kode: 'S' },
  { kode: '96', nama: 'Aktivitas Jasa Perseorangan Lainnya', kategori_kode: 'S' },
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
  // 900 - Hiburan
  { kode: '9000', nama: 'Aktivitas Hiburan, Kesenian dan Kreativitas', golongan_kode: '900' },
]

export const kbliKelompok: KBLIKelompok[] = [
  // 4791 - E-commerce
  { kode: '47911', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Makanan, Minuman, dan Tembakau', subgolongan_kode: '4791' },
  { kode: '47912', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Pakaian', subgolongan_kode: '4791' },
  { kode: '47913', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Elektronik dan Peralatan Rumah Tangga', subgolongan_kode: '4791' },
  { kode: '47914', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Kosmetik dan Perawatan', subgolongan_kode: '4791' },
  { kode: '47919', nama: 'Perdagangan Eceran Melalui Internet (E-commerce) Komoditi Lainnya', subgolongan_kode: '4791' },
  { kode: '47920', nama: 'Perdagangan Eceran Melalui Pemesanan Pos', subgolongan_kode: '4791' },
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
