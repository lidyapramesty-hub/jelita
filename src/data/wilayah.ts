// Data Wilayah Indonesia - Difokuskan pada Bali & Tabanan

export interface Provinsi {
  kode: string
  nama: string
}

export interface KabKot {
  kode: string
  nama: string
  provinsi_kode: string
}

export interface Kecamatan {
  kode: string
  nama: string
  kabkot_kode: string
}

export interface Desa {
  kode: string
  nama: string
  kecamatan_kode: string
}

export interface SLS {
  kode: string
  nama: string
  desa_kode: string
}

export const provinsiData: Provinsi[] = [
  { kode: '11', nama: 'Aceh' },
  { kode: '12', nama: 'Sumatera Utara' },
  { kode: '13', nama: 'Sumatera Barat' },
  { kode: '14', nama: 'Riau' },
  { kode: '15', nama: 'Jambi' },
  { kode: '16', nama: 'Sumatera Selatan' },
  { kode: '17', nama: 'Bengkulu' },
  { kode: '18', nama: 'Lampung' },
  { kode: '19', nama: 'Kepulauan Bangka Belitung' },
  { kode: '21', nama: 'Kepulauan Riau' },
  { kode: '31', nama: 'DKI Jakarta' },
  { kode: '32', nama: 'Jawa Barat' },
  { kode: '33', nama: 'Jawa Tengah' },
  { kode: '34', nama: 'DI Yogyakarta' },
  { kode: '35', nama: 'Jawa Timur' },
  { kode: '36', nama: 'Banten' },
  { kode: '51', nama: 'Bali' },
  { kode: '52', nama: 'Nusa Tenggara Barat' },
  { kode: '53', nama: 'Nusa Tenggara Timur' },
  { kode: '61', nama: 'Kalimantan Barat' },
  { kode: '62', nama: 'Kalimantan Tengah' },
  { kode: '63', nama: 'Kalimantan Selatan' },
  { kode: '64', nama: 'Kalimantan Timur' },
  { kode: '65', nama: 'Kalimantan Utara' },
  { kode: '71', nama: 'Sulawesi Utara' },
  { kode: '72', nama: 'Sulawesi Tengah' },
  { kode: '73', nama: 'Sulawesi Selatan' },
  { kode: '74', nama: 'Sulawesi Tenggara' },
  { kode: '75', nama: 'Gorontalo' },
  { kode: '76', nama: 'Sulawesi Barat' },
  { kode: '81', nama: 'Maluku' },
  { kode: '82', nama: 'Maluku Utara' },
  { kode: '91', nama: 'Papua Barat' },
  { kode: '92', nama: 'Papua' },
  { kode: '93', nama: 'Papua Selatan' },
  { kode: '94', nama: 'Papua Tengah' },
  { kode: '95', nama: 'Papua Pegunungan' },
  { kode: '96', nama: 'Papua Barat Daya' },
]

export const kabKotData: KabKot[] = [
  // Bali
  { kode: '5101', nama: 'Kabupaten Jembrana', provinsi_kode: '51' },
  { kode: '5102', nama: 'Kabupaten Tabanan', provinsi_kode: '51' },
  { kode: '5103', nama: 'Kabupaten Badung', provinsi_kode: '51' },
  { kode: '5104', nama: 'Kabupaten Gianyar', provinsi_kode: '51' },
  { kode: '5105', nama: 'Kabupaten Klungkung', provinsi_kode: '51' },
  { kode: '5106', nama: 'Kabupaten Bangli', provinsi_kode: '51' },
  { kode: '5107', nama: 'Kabupaten Karangasem', provinsi_kode: '51' },
  { kode: '5108', nama: 'Kabupaten Buleleng', provinsi_kode: '51' },
  { kode: '5171', nama: 'Kota Denpasar', provinsi_kode: '51' },
]

export const kecamatanData: Kecamatan[] = [
  // Tabanan (5102)
  { kode: '510201', nama: 'Selemadeg', kabkot_kode: '5102' },
  { kode: '510202', nama: 'Selemadeg Barat', kabkot_kode: '5102' },
  { kode: '510203', nama: 'Selemadeg Timur', kabkot_kode: '5102' },
  { kode: '510204', nama: 'Kerambitan', kabkot_kode: '5102' },
  { kode: '510205', nama: 'Tabanan', kabkot_kode: '5102' },
  { kode: '510206', nama: 'Kediri', kabkot_kode: '5102' },
  { kode: '510207', nama: 'Marga', kabkot_kode: '5102' },
  { kode: '510208', nama: 'Penebel', kabkot_kode: '5102' },
  { kode: '510209', nama: 'Baturiti', kabkot_kode: '5102' },
  { kode: '510210', nama: 'Pupuan', kabkot_kode: '5102' },
]

export const desaData: Desa[] = [
  // Kecamatan Tabanan (510205)
  { kode: '51020501', nama: 'Dauh Peken', kecamatan_kode: '510205' },
  { kode: '51020502', nama: 'Dajan Peken', kecamatan_kode: '510205' },
  { kode: '51020503', nama: 'Delod Peken', kecamatan_kode: '510205' },
  { kode: '51020504', nama: 'Gubug', kecamatan_kode: '510205' },
  { kode: '51020505', nama: 'Buahan', kecamatan_kode: '510205' },
  { kode: '51020506', nama: 'Bongan', kecamatan_kode: '510205' },
  { kode: '51020507', nama: 'Denbantas', kecamatan_kode: '510205' },
  { kode: '51020508', nama: 'Subamia', kecamatan_kode: '510205' },
  // Kecamatan Kediri (510206)
  { kode: '51020601', nama: 'Abian Tuwung', kecamatan_kode: '510206' },
  { kode: '51020602', nama: 'Banjar Anyar', kecamatan_kode: '510206' },
  { kode: '51020603', nama: 'Beraban', kecamatan_kode: '510206' },
  { kode: '51020604', nama: 'Buwit', kecamatan_kode: '510206' },
  { kode: '51020605', nama: 'Kaba Kaba', kecamatan_kode: '510206' },
  { kode: '51020606', nama: 'Kediri', kecamatan_kode: '510206' },
  { kode: '51020607', nama: 'Nyambu', kecamatan_kode: '510206' },
  { kode: '51020608', nama: 'Pandak Bandung', kecamatan_kode: '510206' },
  { kode: '51020609', nama: 'Pandak Gede', kecamatan_kode: '510206' },
  { kode: '51020610', nama: 'Pejaten', kecamatan_kode: '510206' },
  // Kecamatan Marga (510207)
  { kode: '51020701', nama: 'Batannyuh', kecamatan_kode: '510207' },
  { kode: '51020702', nama: 'Belayu', kecamatan_kode: '510207' },
  { kode: '51020703', nama: 'Biaung', kecamatan_kode: '510207' },
  { kode: '51020704', nama: 'Kuwum', kecamatan_kode: '510207' },
  { kode: '51020705', nama: 'Marga', kecamatan_kode: '510207' },
  { kode: '51020706', nama: 'Marga Dauh Puri', kecamatan_kode: '510207' },
  { kode: '51020707', nama: 'Payangan', kecamatan_kode: '510207' },
  { kode: '51020708', nama: 'Petiga', kecamatan_kode: '510207' },
  { kode: '51020709', nama: 'Selanbawak', kecamatan_kode: '510207' },
  { kode: '51020710', nama: 'Tua', kecamatan_kode: '510207' },
  // Kecamatan Penebel (510208)
  { kode: '51020801', nama: 'Babahan', kecamatan_kode: '510208' },
  { kode: '51020802', nama: 'Biaung', kecamatan_kode: '510208' },
  { kode: '51020803', nama: 'Buruan', kecamatan_kode: '510208' },
  { kode: '51020804', nama: 'Dukuh', kecamatan_kode: '510208' },
  { kode: '51020805', nama: 'Jegu', kecamatan_kode: '510208' },
  { kode: '51020806', nama: 'Mengesta', kecamatan_kode: '510208' },
  { kode: '51020807', nama: 'Pacung', kecamatan_kode: '510208' },
  { kode: '51020808', nama: 'Penebel', kecamatan_kode: '510208' },
  { kode: '51020809', nama: 'Pesagi', kecamatan_kode: '510208' },
  { kode: '51020810', nama: 'Riang Gede', kecamatan_kode: '510208' },
  { kode: '51020811', nama: 'Senganan', kecamatan_kode: '510208' },
  { kode: '51020812', nama: 'Tajen', kecamatan_kode: '510208' },
  { kode: '51020813', nama: 'Tegal Mengkeb', kecamatan_kode: '510208' },
  // Kecamatan Kerambitan (510204)
  { kode: '51020401', nama: 'Baturan', kecamatan_kode: '510204' },
  { kode: '51020402', nama: 'Belumbang', kecamatan_kode: '510204' },
  { kode: '51020403', nama: 'Cau Belayu', kecamatan_kode: '510204' },
  { kode: '51020404', nama: 'Kelating', kecamatan_kode: '510204' },
  { kode: '51020405', nama: 'Kerambitan', kecamatan_kode: '510204' },
  { kode: '51020406', nama: 'Kukuh', kecamatan_kode: '510204' },
  { kode: '51020407', nama: 'Meliling', kecamatan_kode: '510204' },
  { kode: '51020408', nama: 'Penarukan', kecamatan_kode: '510204' },
  { kode: '51020409', nama: 'Samsam', kecamatan_kode: '510204' },
  { kode: '51020410', nama: 'Tista', kecamatan_kode: '510204' },
  { kode: '51020411', nama: 'Tiying Gading', kecamatan_kode: '510204' },
  { kode: '51020412', nama: 'Warnasari', kecamatan_kode: '510204' },
  // Kecamatan Baturiti (510209)
  { kode: '51020901', nama: 'Antapan', kecamatan_kode: '510209' },
  { kode: '51020902', nama: 'Apuan', kecamatan_kode: '510209' },
  { kode: '51020903', nama: 'Baturiti', kecamatan_kode: '510209' },
  { kode: '51020904', nama: 'Candikuning', kecamatan_kode: '510209' },
  { kode: '51020905', nama: 'Luwus', kecamatan_kode: '510209' },
  { kode: '51020906', nama: 'Mekarsari', kecamatan_kode: '510209' },
  { kode: '51020907', nama: 'Perean', kecamatan_kode: '510209' },
  { kode: '51020908', nama: 'Perean Kangin', kecamatan_kode: '510209' },
  { kode: '51020909', nama: 'Perean Tengah', kecamatan_kode: '510209' },
  // Kecamatan Pupuan (510210)
  { kode: '51021001', nama: 'Bantiran', kecamatan_kode: '510210' },
  { kode: '51021002', nama: 'Batungsel', kecamatan_kode: '510210' },
  { kode: '51021003', nama: 'Belimbing', kecamatan_kode: '510210' },
  { kode: '51021004', nama: 'Jelekungkang', kecamatan_kode: '510210' },
  { kode: '51021005', nama: 'Kebon Padangan', kecamatan_kode: '510210' },
  { kode: '51021006', nama: 'Munduk Temu', kecamatan_kode: '510210' },
  { kode: '51021007', nama: 'Padangan', kecamatan_kode: '510210' },
  { kode: '51021008', nama: 'Pajahan', kecamatan_kode: '510210' },
  { kode: '51021009', nama: 'Pujungan', kecamatan_kode: '510210' },
  { kode: '51021010', nama: 'Pupuan', kecamatan_kode: '510210' },
  { kode: '51021011', nama: 'Sanda', kecamatan_kode: '510210' },
  // Kecamatan Selemadeg (510201)
  { kode: '51020101', nama: 'Antosari', kecamatan_kode: '510201' },
  { kode: '51020102', nama: 'Bajera', kecamatan_kode: '510201' },
  { kode: '51020103', nama: 'Beraban', kecamatan_kode: '510201' },
  { kode: '51020104', nama: 'Gadungan', kecamatan_kode: '510201' },
  { kode: '51020105', nama: 'Manikyang', kecamatan_kode: '510201' },
  { kode: '51020106', nama: 'Pupuan Sawah', kecamatan_kode: '510201' },
  { kode: '51020107', nama: 'Selemadeg', kecamatan_kode: '510201' },
  { kode: '51020108', nama: 'Wanagiri', kecamatan_kode: '510201' },
  // Kecamatan Selemadeg Barat (510202)
  { kode: '51020201', nama: 'Antosari', kecamatan_kode: '510202' },
  { kode: '51020202', nama: 'Lalang Linggah', kecamatan_kode: '510202' },
  { kode: '51020203', nama: 'Lumbung', kecamatan_kode: '510202' },
  { kode: '51020204', nama: 'Lumbung Kauh', kecamatan_kode: '510202' },
  { kode: '51020205', nama: 'Manggissari', kecamatan_kode: '510202' },
  { kode: '51020206', nama: 'Mundeh', kecamatan_kode: '510202' },
  { kode: '51020207', nama: 'Mundeh Kangin', kecamatan_kode: '510202' },
  { kode: '51020208', nama: 'Mundeh Kauh', kecamatan_kode: '510202' },
  { kode: '51020209', nama: 'Selanbawak', kecamatan_kode: '510202' },
  { kode: '51020210', nama: 'Tiying Gading', kecamatan_kode: '510202' },
  // Kecamatan Selemadeg Timur (510203)
  { kode: '51020301', nama: 'Bantas', kecamatan_kode: '510203' },
  { kode: '51020302', nama: 'Beraban', kecamatan_kode: '510203' },
  { kode: '51020303', nama: 'Dalang', kecamatan_kode: '510203' },
  { kode: '51020304', nama: 'Gadungan', kecamatan_kode: '510203' },
  { kode: '51020305', nama: 'Gunung Salak', kecamatan_kode: '510203' },
  { kode: '51020306', nama: 'Mambang', kecamatan_kode: '510203' },
  { kode: '51020307', nama: 'Megati', kecamatan_kode: '510203' },
  { kode: '51020308', nama: 'Sangketan', kecamatan_kode: '510203' },
  { kode: '51020309', nama: 'Tangguntiti', kecamatan_kode: '510203' },
  { kode: '51020310', nama: 'Tegalmengkeb', kecamatan_kode: '510203' },
]

// SLS = Satuan Lingkungan Setempat (Dusun/Lingkungan/Banjar)
export const slsData: SLS[] = [
  // Dauh Peken
  { kode: '5102050101', nama: 'Banjar Dauh Peken Kangin', desa_kode: '51020501' },
  { kode: '5102050102', nama: 'Banjar Dauh Peken Kauh', desa_kode: '51020501' },
  { kode: '5102050103', nama: 'Banjar Dauh Peken Kaja', desa_kode: '51020501' },
  // Dajan Peken
  { kode: '5102050201', nama: 'Banjar Dajan Peken', desa_kode: '51020502' },
  { kode: '5102050202', nama: 'Banjar Geria', desa_kode: '51020502' },
  // Kediri
  { kode: '5102060601', nama: 'Banjar Anyar Tengah', desa_kode: '51020606' },
  { kode: '5102060602', nama: 'Banjar Anyar Kaja', desa_kode: '51020606' },
  { kode: '5102060603', nama: 'Banjar Anyar Kelod', desa_kode: '51020606' },
]

// Helper functions
export function getKabKotByProvinsi(provinsiKode: string): KabKot[] {
  return kabKotData.filter(k => k.provinsi_kode === provinsiKode)
}

export function getKecamatanByKabKot(kabkotKode: string): Kecamatan[] {
  return kecamatanData.filter(k => k.kabkot_kode === kabkotKode)
}

export function getDesaByKecamatan(kecamatanKode: string): Desa[] {
  return desaData.filter(d => d.kecamatan_kode === kecamatanKode)
}

export function getSLSByDesa(desaKode: string): SLS[] {
  return slsData.filter(s => s.desa_kode === desaKode)
}
