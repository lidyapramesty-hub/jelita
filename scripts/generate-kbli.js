const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/KBLI_2025.json'), 'utf8'));

const kategori = [];
const golonganPokok = [];
const golongan = [];
const subgolongan = [];
const kelompok = [];

for (const cat of data.kbli_2025) {
  kategori.push({ kode: cat.kode, nama: cat.nama });
  for (const gp of (cat.golongan_pokok || [])) {
    golonganPokok.push({ kode: gp.kode, nama: gp.nama, kategori_kode: cat.kode });
    for (const g of (gp.golongan || [])) {
      golongan.push({ kode: g.kode, nama: g.nama, golongan_pokok_kode: gp.kode });
      for (const sg of (g.subgolongan || [])) {
        subgolongan.push({ kode: sg.kode, nama: sg.nama, golongan_kode: g.kode });
        for (const k of (sg.kelompok || [])) {
          kelompok.push({ kode: k.kode, nama: k.nama, subgolongan_kode: sg.kode });
        }
      }
    }
  }
}

function esc(s) { return s.replace(/'/g, "\\'"); }

function toTS(arr, fields) {
  let lines = [];
  for (const item of arr) {
    const parts = fields.map(f => f + ": '" + esc(item[f]) + "'");
    lines.push('  { ' + parts.join(', ') + ' },');
  }
  return lines.join('\n');
}

let output = `// Auto-generated from KBLI_2025.json — DO NOT EDIT MANUALLY
// Total: ${kategori.length} kategori, ${golonganPokok.length} golongan pokok, ${golongan.length} golongan, ${subgolongan.length} subgolongan, ${kelompok.length} kelompok

export interface KBLIKategori { kode: string; nama: string }
export interface KBLIGolonganPokok { kode: string; nama: string; kategori_kode: string }
export interface KBLIGolongan { kode: string; nama: string; golongan_pokok_kode: string }
export interface KBLISubgolongan { kode: string; nama: string; golongan_kode: string }
export interface KBLIKelompok { kode: string; nama: string; subgolongan_kode: string }

export const kbliKategori: KBLIKategori[] = [
${toTS(kategori, ['kode','nama'])}
]

export const kbliGolonganPokok: KBLIGolonganPokok[] = [
${toTS(golonganPokok, ['kode','nama','kategori_kode'])}
]

export const kbliGolongan: KBLIGolongan[] = [
${toTS(golongan, ['kode','nama','golongan_pokok_kode'])}
]

export const kbliSubgolongan: KBLISubgolongan[] = [
${toTS(subgolongan, ['kode','nama','golongan_kode'])}
]

export const kbliKelompok: KBLIKelompok[] = [
${toTS(kelompok, ['kode','nama','subgolongan_kode'])}
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

// Reverse lookup: find full KBLI path from kelompok kode
export function getKbliPathByKelompokKode(kelompokKode: string) {
  const kel = kbliKelompok.find(k => k.kode === kelompokKode)
  if (!kel) return null
  const sg = kbliSubgolongan.find(s => s.kode === kel.subgolongan_kode)
  if (!sg) return null
  const gol = kbliGolongan.find(g => g.kode === sg.golongan_kode)
  if (!gol) return null
  const gp = kbliGolonganPokok.find(g => g.kode === gol.golongan_pokok_kode)
  if (!gp) return null
  const kat = kbliKategori.find(k => k.kode === gp.kategori_kode)
  if (!kat) return null
  return {
    kategori: kat,
    golongan_pokok: gp,
    golongan: gol,
    subgolongan: sg,
    kelompok: kel,
  }
}
`;

fs.writeFileSync(path.join(__dirname, '../src/data/kbli2025.ts'), output);
console.log(`Generated kbli2025.ts: ${kategori.length} kategori, ${golonganPokok.length} GP, ${golongan.length} G, ${subgolongan.length} SG, ${kelompok.length} K`);
