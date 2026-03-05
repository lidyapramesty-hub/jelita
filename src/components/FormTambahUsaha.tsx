'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Drawer, Stepper, TextInput, Select, Button, Group, Stack,
  Paper, Text, ActionIcon, Textarea, Alert,
} from '@mantine/core'
import {
  IconX, IconPlus, IconTrash, IconDeviceFloppy, IconAlertCircle,
  IconChevronLeft, IconChevronRight,
} from '@tabler/icons-react'
import {
  kbliKategori, getGolonganPokokByKategori, getGolonganByGolonganPokok,
  getSubgolonganByGolongan, getKelompokBySubgolongan,
} from '@/data/kbli2025'
import {
  provinsiData, getKabKotByProvinsi, getKecamatanByKabKot,
  getDesaByKecamatan, getSLSByDesa,
} from '@/data/wilayah'

const GeotagMap = dynamic(() => import('./GeotagMap'), { ssr: false })

const PLATFORM_OPTIONS = [
  'Instagram', 'Facebook', 'TikTok', 'YouTube', 'Twitter/X',
  'WhatsApp', 'Tokopedia', 'Shopee', 'Lazada', 'Bukalapak',
  'Blibli', 'JD.ID', 'Gojek', 'Grab', 'Website Sendiri',
  'Airbnb', 'Booking.com', 'Traveloka', 'Agoda', 'Lainnya',
]

interface Platform {
  platform: string
  nama_akun: string
}

interface FormData {
  nama_pemilik: string
  nama_usaha: string
  deskripsi_kegiatan: string
  kbli_kategori_kode: string
  kbli_kategori_nama: string
  kbli_golongan_pokok_kode: string
  kbli_golongan_pokok_nama: string
  kbli_golongan_kode: string
  kbli_golongan_nama: string
  kbli_subgolongan_kode: string
  kbli_subgolongan_nama: string
  kbli_kelompok_kode: string
  kbli_kelompok_nama: string
  provinsi_kode: string
  provinsi_nama: string
  kabkot_kode: string
  kabkot_nama: string
  kecamatan_kode: string
  kecamatan_nama: string
  desa_kode: string
  desa_nama: string
  sls_kode: string
  sls_nama: string
  sub_sls: string
  latitude: number | null
  longitude: number | null
  platform_digital: Platform[]
  kelas_usaha: string
  cakupan_pasar: string
}

const initialForm: FormData = {
  nama_pemilik: '', nama_usaha: '', deskripsi_kegiatan: '',
  kbli_kategori_kode: '', kbli_kategori_nama: '',
  kbli_golongan_pokok_kode: '', kbli_golongan_pokok_nama: '',
  kbli_golongan_kode: '', kbli_golongan_nama: '',
  kbli_subgolongan_kode: '', kbli_subgolongan_nama: '',
  kbli_kelompok_kode: '', kbli_kelompok_nama: '',
  provinsi_kode: '', provinsi_nama: '',
  kabkot_kode: '', kabkot_nama: '',
  kecamatan_kode: '', kecamatan_nama: '',
  desa_kode: '', desa_nama: '',
  sls_kode: '', sls_nama: '',
  sub_sls: '',
  latitude: null, longitude: null,
  platform_digital: [{ platform: '', nama_akun: '' }],
  kelas_usaha: '', cakupan_pasar: '',
}

interface Props {
  onClose: () => void
  onSuccess: () => void
}

export default function FormTambahUsaha({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeStep, setActiveStep] = useState(0)

  // KBLI derived data
  const golonganPokok = form.kbli_kategori_kode ? getGolonganPokokByKategori(form.kbli_kategori_kode) : []
  const golongan = form.kbli_golongan_pokok_kode ? getGolonganByGolonganPokok(form.kbli_golongan_pokok_kode) : []
  const subgolongan = form.kbli_golongan_kode ? getSubgolonganByGolongan(form.kbli_golongan_kode) : []
  const kelompok = form.kbli_subgolongan_kode ? getKelompokBySubgolongan(form.kbli_subgolongan_kode) : []

  // Wilayah derived data
  const kabKot = form.provinsi_kode ? getKabKotByProvinsi(form.provinsi_kode) : []
  const kecamatan = form.kabkot_kode ? getKecamatanByKabKot(form.kabkot_kode) : []
  const desa = form.kecamatan_kode ? getDesaByKecamatan(form.kecamatan_kode) : []
  const sls = form.desa_kode ? getSLSByDesa(form.desa_kode) : []

  const setField = (key: keyof FormData, val: unknown) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => { const e = { ...prev }; delete e[key]; return e })
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.nama_pemilik.trim()) e.nama_pemilik = 'Nama pemilik wajib diisi'
    if (!form.nama_usaha.trim()) e.nama_usaha = 'Nama usaha wajib diisi'
    if (!form.kbli_kategori_kode) e.kbli = 'Kategori KBLI wajib dipilih'
    if (!form.provinsi_kode) e.provinsi = 'Provinsi wajib dipilih'
    if (!form.kelas_usaha) e.kelas_usaha = 'Kelas usaha wajib dipilih'
    if (!form.cakupan_pasar) e.cakupan_pasar = 'Cakupan pasar wajib dipilih'
    if (form.platform_digital.some((p) => p.platform && !p.nama_akun)) e.platform = 'Nama akun wajib diisi untuk setiap platform'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      setActiveStep(0)
      return
    }
    setSubmitting(true)
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false)
      onSuccess()
    }, 800)
  }

  const nextStep = () => setActiveStep((c) => Math.min(c + 1, 5))
  const prevStep = () => setActiveStep((c) => Math.max(c - 1, 0))

  return (
    <Drawer
      opened
      onClose={onClose}
      title={
        <div>
          <Text fw={700} size="lg" style={{ fontFamily: 'DM Sans' }}>Tambah Usaha Baru</Text>
          <Text size="xs" c="dimmed">Ekonomi Digital Kabupaten Tabanan</Text>
        </div>
      }
      position="right"
      size="lg"
      styles={{
        header: { backgroundColor: '#003087', padding: '16px 24px' },
        title: { color: 'white' },
        close: { color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Stepper */}
        <div className="px-4 py-4 border-b border-gray-200 bg-slate-50">
          <Stepper active={activeStep} onStepClick={setActiveStep} size="xs" color="#003087">
            <Stepper.Step label="Data" />
            <Stepper.Step label="KBLI" />
            <Stepper.Step label="Lokasi" />
            <Stepper.Step label="Geo" />
            <Stepper.Step label="Platform" />
            <Stepper.Step label="Kelas" />
          </Stepper>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {errors.submit && (
            <Alert icon={<IconAlertCircle size={18} />} color="red" radius="md" mb="md">
              {errors.submit}
            </Alert>
          )}

          {/* Step 0: Data Usaha */}
          {activeStep === 0 && (
            <Stack gap="md">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">1</div>
                <Text fw={700}>Data Dasar Usaha</Text>
              </Group>
              <TextInput
                label="Nama Pemilik / Penanggung Jawab"
                placeholder="Nama lengkap pemilik usaha"
                value={form.nama_pemilik}
                onChange={(e) => setField('nama_pemilik', e.currentTarget.value)}
                error={errors.nama_pemilik}
                required
              />
              <TextInput
                label="Nama Usaha"
                placeholder="Nama usaha / toko"
                value={form.nama_usaha}
                onChange={(e) => setField('nama_usaha', e.currentTarget.value)}
                error={errors.nama_usaha}
                required
              />
              <Textarea
                label="Deskripsi Kegiatan Usaha"
                placeholder="Jelaskan kegiatan usaha secara singkat"
                value={form.deskripsi_kegiatan}
                onChange={(e) => setField('deskripsi_kegiatan', e.currentTarget.value)}
                minRows={3}
              />
            </Stack>
          )}

          {/* Step 1: KBLI */}
          {activeStep === 1 && (
            <Stack gap="md">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">2</div>
                <Text fw={700}>Klasifikasi KBLI 2025</Text>
              </Group>
              {errors.kbli && <Text size="xs" c="red">{errors.kbli}</Text>}
              <Select
                label="Kategori (Huruf)"
                placeholder="Pilih Kategori"
                data={kbliKategori.map((k) => ({ value: k.kode, label: `${k.kode} — ${k.nama}` }))}
                value={form.kbli_kategori_kode || null}
                onChange={(val) => {
                  const item = kbliKategori.find((k) => k.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    kbli_kategori_kode: val || '', kbli_kategori_nama: item?.nama || '',
                    kbli_golongan_pokok_kode: '', kbli_golongan_pokok_nama: '',
                    kbli_golongan_kode: '', kbli_golongan_nama: '',
                    kbli_subgolongan_kode: '', kbli_subgolongan_nama: '',
                    kbli_kelompok_kode: '', kbli_kelompok_nama: '',
                  }))
                }}
                searchable
                error={errors.kbli}
              />
              <Select
                label="Golongan Pokok (2 digit)"
                placeholder={form.kbli_kategori_kode ? 'Pilih Golongan Pokok' : 'Pilih Kategori dahulu'}
                data={golonganPokok.map((g) => ({ value: g.kode, label: `${g.kode} — ${g.nama}` }))}
                value={form.kbli_golongan_pokok_kode || null}
                onChange={(val) => {
                  const item = golonganPokok.find((g) => g.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    kbli_golongan_pokok_kode: val || '', kbli_golongan_pokok_nama: item?.nama || '',
                    kbli_golongan_kode: '', kbli_golongan_nama: '',
                    kbli_subgolongan_kode: '', kbli_subgolongan_nama: '',
                    kbli_kelompok_kode: '', kbli_kelompok_nama: '',
                  }))
                }}
                disabled={!form.kbli_kategori_kode}
                searchable
              />
              <Select
                label="Golongan (3 digit)"
                placeholder={form.kbli_golongan_pokok_kode ? 'Pilih Golongan' : 'Pilih Golongan Pokok dahulu'}
                data={golongan.map((g) => ({ value: g.kode, label: `${g.kode} — ${g.nama}` }))}
                value={form.kbli_golongan_kode || null}
                onChange={(val) => {
                  const item = golongan.find((g) => g.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    kbli_golongan_kode: val || '', kbli_golongan_nama: item?.nama || '',
                    kbli_subgolongan_kode: '', kbli_subgolongan_nama: '',
                    kbli_kelompok_kode: '', kbli_kelompok_nama: '',
                  }))
                }}
                disabled={!form.kbli_golongan_pokok_kode}
                searchable
              />
              <Select
                label="Subgolongan (4 digit)"
                placeholder={form.kbli_golongan_kode ? 'Pilih Subgolongan' : 'Pilih Golongan dahulu'}
                data={subgolongan.map((g) => ({ value: g.kode, label: `${g.kode} — ${g.nama}` }))}
                value={form.kbli_subgolongan_kode || null}
                onChange={(val) => {
                  const item = subgolongan.find((g) => g.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    kbli_subgolongan_kode: val || '', kbli_subgolongan_nama: item?.nama || '',
                    kbli_kelompok_kode: '', kbli_kelompok_nama: '',
                  }))
                }}
                disabled={!form.kbli_golongan_kode}
                searchable
              />
              <Select
                label="Kelompok / Kode KBLI (5 digit)"
                placeholder={form.kbli_subgolongan_kode ? 'Pilih Kelompok KBLI' : 'Pilih Subgolongan dahulu'}
                data={kelompok.map((g) => ({ value: g.kode, label: `${g.kode} — ${g.nama}` }))}
                value={form.kbli_kelompok_kode || null}
                onChange={(val) => {
                  const item = kelompok.find((g) => g.kode === val)
                  setForm((prev) => ({ ...prev, kbli_kelompok_kode: val || '', kbli_kelompok_nama: item?.nama || '' }))
                }}
                disabled={!form.kbli_subgolongan_kode}
                searchable
              />

              {form.kbli_kelompok_kode && (
                <Paper p="md" radius="md" bg="blue.0" withBorder style={{ borderColor: 'var(--mantine-color-blue-2)' }}>
                  <Text size="xs" fw={700} c="blue.9" mb="xs">KBLI Terpilih:</Text>
                  <Text size="sm" fw={700}>{form.kbli_kelompok_kode}</Text>
                  <Text size="sm" c="dimmed">{form.kbli_kelompok_nama}</Text>
                  <Text size="xs" c="dimmed" mt="xs">{form.kbli_kategori_nama}</Text>
                </Paper>
              )}
            </Stack>
          )}

          {/* Step 2: Lokasi */}
          {activeStep === 2 && (
            <Stack gap="md">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">3</div>
                <Text fw={700}>Lokasi Usaha</Text>
              </Group>
              <Select
                label="Provinsi"
                placeholder="Pilih Provinsi"
                data={provinsiData.map((p) => ({ value: p.kode, label: `${p.kode} — ${p.nama}` }))}
                value={form.provinsi_kode || null}
                onChange={(val) => {
                  const item = provinsiData.find((p) => p.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    provinsi_kode: val || '', provinsi_nama: item?.nama || '',
                    kabkot_kode: '', kabkot_nama: '',
                    kecamatan_kode: '', kecamatan_nama: '',
                    desa_kode: '', desa_nama: '',
                    sls_kode: '', sls_nama: '',
                  }))
                }}
                searchable
                error={errors.provinsi}
              />
              <Select
                label="Kabupaten / Kota"
                placeholder={form.provinsi_kode ? 'Pilih Kab/Kota' : 'Pilih Provinsi dahulu'}
                data={kabKot.map((k) => ({ value: k.kode, label: `${k.kode} — ${k.nama}` }))}
                value={form.kabkot_kode || null}
                onChange={(val) => {
                  const item = kabKot.find((k) => k.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    kabkot_kode: val || '', kabkot_nama: item?.nama || '',
                    kecamatan_kode: '', kecamatan_nama: '',
                    desa_kode: '', desa_nama: '',
                    sls_kode: '', sls_nama: '',
                  }))
                }}
                disabled={!form.provinsi_kode}
                searchable
              />
              <Select
                label="Kecamatan"
                placeholder={form.kabkot_kode ? 'Pilih Kecamatan' : 'Pilih Kab/Kota dahulu'}
                data={kecamatan.map((k) => ({ value: k.kode, label: `${k.kode} — ${k.nama}` }))}
                value={form.kecamatan_kode || null}
                onChange={(val) => {
                  const item = kecamatan.find((k) => k.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    kecamatan_kode: val || '', kecamatan_nama: item?.nama || '',
                    desa_kode: '', desa_nama: '',
                    sls_kode: '', sls_nama: '',
                  }))
                }}
                disabled={!form.kabkot_kode}
                searchable
              />
              <Select
                label="Desa / Kelurahan"
                placeholder={form.kecamatan_kode ? 'Pilih Desa/Kelurahan' : 'Pilih Kecamatan dahulu'}
                data={desa.map((d) => ({ value: d.kode, label: `${d.kode} — ${d.nama}` }))}
                value={form.desa_kode || null}
                onChange={(val) => {
                  const item = desa.find((d) => d.kode === val)
                  setForm((prev) => ({
                    ...prev,
                    desa_kode: val || '', desa_nama: item?.nama || '',
                    sls_kode: '', sls_nama: '',
                  }))
                }}
                disabled={!form.kecamatan_kode}
                searchable
              />
              <Select
                label="SLS (Dusun / Lingkungan / Banjar)"
                placeholder={form.desa_kode ? (sls.length > 0 ? 'Pilih SLS' : 'Tidak ada data SLS') : 'Pilih Desa dahulu'}
                data={sls.map((s) => ({ value: s.kode, label: `${s.kode} — ${s.nama}` }))}
                value={form.sls_kode || null}
                onChange={(val) => {
                  const item = sls.find((s) => s.kode === val)
                  setForm((prev) => ({ ...prev, sls_kode: val || '', sls_nama: item?.nama || '' }))
                }}
                disabled={!form.desa_kode || sls.length === 0}
                searchable
              />
              <TextInput
                label="Sub SLS (opsional)"
                placeholder="Cth: RT 01, Gang Melati, Blok A, dll."
                value={form.sub_sls}
                onChange={(e) => setField('sub_sls', e.currentTarget.value)}
                description="Isi manual jika tidak ada dalam daftar"
              />
            </Stack>
          )}

          {/* Step 3: Geotagging */}
          {activeStep === 3 && (
            <Stack gap="md">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">4</div>
                <Text fw={700}>Geotagging Lokasi Usaha</Text>
              </Group>
              <Alert variant="light" color="blue" radius="md">
                Klik tombol &quot;Ambil Lokasi&quot; untuk GPS otomatis, atau klik langsung pada peta untuk menentukan titik koordinat usaha.
              </Alert>
              <GeotagMap
                latitude={form.latitude}
                longitude={form.longitude}
                onChange={(lat, lng) => setForm((prev) => ({ ...prev, latitude: lat, longitude: lng }))}
              />
              {form.latitude && form.longitude && (
                <Group grow>
                  <TextInput
                    label="Latitude"
                    type="number"
                    step="0.000001"
                    value={form.latitude?.toString() || ''}
                    onChange={(e) => setField('latitude', parseFloat(e.currentTarget.value))}
                  />
                  <TextInput
                    label="Longitude"
                    type="number"
                    step="0.000001"
                    value={form.longitude?.toString() || ''}
                    onChange={(e) => setField('longitude', parseFloat(e.currentTarget.value))}
                  />
                </Group>
              )}
            </Stack>
          )}

          {/* Step 4: Platform */}
          {activeStep === 4 && (
            <Stack gap="md">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">5</div>
                <Text fw={700}>Platform Digital yang Digunakan</Text>
              </Group>
              <Text size="sm" c="dimmed">Tambahkan semua platform yang digunakan untuk menjalankan usaha secara digital.</Text>
              {errors.platform && <Text size="xs" c="red">{errors.platform}</Text>}

              {form.platform_digital.map((item, idx) => (
                <Paper key={idx} p="md" radius="md" bg="gray.0" withBorder>
                  <Group align="start" gap="sm">
                    <Stack gap="sm" style={{ flex: 1 }}>
                      <Select
                        label="Platform"
                        placeholder="Pilih Platform"
                        data={PLATFORM_OPTIONS}
                        value={item.platform || null}
                        onChange={(val) => {
                          const updated = [...form.platform_digital]
                          updated[idx] = { ...updated[idx], platform: val || '' }
                          setField('platform_digital', updated)
                        }}
                        searchable
                        size="sm"
                      />
                      <TextInput
                        label="Nama Akun"
                        placeholder="@nama_akun / URL / nomor"
                        value={item.nama_akun}
                        onChange={(e) => {
                          const updated = [...form.platform_digital]
                          updated[idx] = { ...updated[idx], nama_akun: e.currentTarget.value }
                          setField('platform_digital', updated)
                        }}
                        size="sm"
                      />
                    </Stack>
                    {form.platform_digital.length > 1 && (
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        mt={28}
                        onClick={() => {
                          const updated = form.platform_digital.filter((_, i) => i !== idx)
                          setField('platform_digital', updated)
                        }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Paper>
              ))}

              <Button
                variant="outline"
                color="gray"
                fullWidth
                leftSection={<IconPlus size={16} />}
                onClick={() => setField('platform_digital', [...form.platform_digital, { platform: '', nama_akun: '' }])}
                styles={{ root: { borderStyle: 'dashed' } }}
              >
                Tambah Platform Lain
              </Button>
            </Stack>
          )}

          {/* Step 5: Klasifikasi */}
          {activeStep === 5 && (
            <Stack gap="lg">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">6</div>
                <Text fw={700}>Klasifikasi Usaha</Text>
              </Group>

              <div>
                <Text size="sm" fw={600} mb="xs">Kelas Usaha <span className="text-red-500">*</span></Text>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: 'mikro', label: 'Mikro', desc: 'Aset ≤ Rp50 Juta' },
                    { val: 'kecil', label: 'Kecil', desc: 'Rp50–500 Juta' },
                    { val: 'menengah', label: 'Menengah', desc: 'Rp500 Juta–10 M' },
                    { val: 'besar', label: 'Besar', desc: '> Rp10 M' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setField('kelas_usaha', opt.val)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${form.kelas_usaha === opt.val
                          ? 'border-[#003087] bg-[#003087]/5'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <p className={`font-bold text-sm ${form.kelas_usaha === opt.val ? 'text-[#003087]' : 'text-gray-700'}`}>{opt.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                {errors.kelas_usaha && <Text size="xs" c="red" mt="xs">{errors.kelas_usaha}</Text>}
              </div>

              <div>
                <Text size="sm" fw={600} mb="xs">Cakupan Pasar <span className="text-red-500">*</span></Text>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: 'lokal', label: 'Lokal', desc: 'Kab/Kota & sekitar' },
                    { val: 'regional', label: 'Regional', desc: 'Provinsi' },
                    { val: 'nasional', label: 'Nasional', desc: 'Seluruh Indonesia' },
                    { val: 'internasional', label: 'Internasional', desc: 'Luar negeri' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setField('cakupan_pasar', opt.val)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${form.cakupan_pasar === opt.val
                          ? 'border-[#003087] bg-[#003087]/5'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <p className={`font-bold text-sm ${form.cakupan_pasar === opt.val ? 'text-[#003087]' : 'text-gray-700'}`}>{opt.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                {errors.cakupan_pasar && <Text size="xs" c="red" mt="xs">{errors.cakupan_pasar}</Text>}
              </div>

              {/* Summary */}
              <Paper p="md" radius="md" bg="gray.0" withBorder>
                <Text size="sm" fw={700} mb="sm">Ringkasan Data</Text>
                <Stack gap={4}>
                  {[
                    { label: 'Nama Usaha', val: form.nama_usaha || '-' },
                    { label: 'Pemilik', val: form.nama_pemilik || '-' },
                    { label: 'KBLI', val: form.kbli_kelompok_kode ? `${form.kbli_kelompok_kode} — ${form.kbli_kelompok_nama}` : (form.kbli_kategori_nama || '-') },
                    { label: 'Lokasi', val: [form.desa_nama, form.kecamatan_nama, form.kabkot_nama].filter(Boolean).join(', ') || '-' },
                    { label: 'Platform', val: form.platform_digital.filter((p) => p.platform).map((p) => `${p.platform}`).join(', ') || '-' },
                    { label: 'Koordinat', val: form.latitude ? `${form.latitude.toFixed(6)}, ${form.longitude?.toFixed(6)}` : '-' },
                  ].map((row) => (
                    <Group key={row.label} gap="sm">
                      <Text size="sm" c="dimmed" w={90}>{row.label}</Text>
                      <Text size="sm" fw={500}>{row.val}</Text>
                    </Group>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-200 bg-slate-50">
          <Group justify="space-between">
            <Group>
              {activeStep > 0 && (
                <Button variant="default" onClick={prevStep} leftSection={<IconChevronLeft size={16} />}>
                  Sebelumnya
                </Button>
              )}
            </Group>
            <Group>
              <Button variant="default" onClick={onClose}>Batal</Button>
              {activeStep < 5 ? (
                <Button onClick={nextStep} rightSection={<IconChevronRight size={16} />} style={{ backgroundColor: '#003087' }}>
                  Selanjutnya
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  loading={submitting}
                  leftSection={<IconDeviceFloppy size={16} />}
                  style={{ backgroundColor: '#003087' }}
                >
                  Simpan Usaha
                </Button>
              )}
            </Group>
          </Group>
        </div>
      </div>
    </Drawer>
  )
}
