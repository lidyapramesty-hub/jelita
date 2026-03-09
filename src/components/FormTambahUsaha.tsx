'use client'

import { useState, useEffect } from 'react'
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
  getDesaByKecamatan,
} from '@/data/wilayah'
import { Usaha } from '@/types/usaha'

const GeotagMap = dynamic(() => import('./GeotagMap'), { ssr: false })

const PLATFORM_OPTIONS = [
  'Agoda', 'Airbnb', 'Blibli', 'Booking.com', 'Bukalapak',
  'Facebook', 'Gojek', 'Grab', 'Instagram', 'JD.ID',
  'Lazada', 'Shopee', 'TikTok', 'Tokopedia', 'Traveloka',
  'Twitter/X', 'Website Sendiri', 'WhatsApp', 'YouTube', 'Lainnya',
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
  editData?: Usaha | null
}

export default function FormTambahUsaha({ onClose, onSuccess, editData }: Props) {
  const isEdit = !!editData
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [activeStep, setActiveStep] = useState(0)
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]))

  // Pre-fill form if editing
  useEffect(() => {
    if (editData) {
      setForm({
        nama_pemilik: editData.nama_pemilik || '',
        nama_usaha: editData.nama_usaha || '',
        deskripsi_kegiatan: editData.deskripsi_kegiatan || '',
        kbli_kategori_kode: editData.kbli_kategori_kode || '',
        kbli_kategori_nama: editData.kbli_kategori_nama || '',
        kbli_golongan_pokok_kode: editData.kbli_golongan_pokok_kode || '',
        kbli_golongan_pokok_nama: editData.kbli_golongan_pokok_nama || '',
        kbli_golongan_kode: editData.kbli_golongan_kode || '',
        kbli_golongan_nama: editData.kbli_golongan_nama || '',
        kbli_subgolongan_kode: editData.kbli_subgolongan_kode || '',
        kbli_subgolongan_nama: editData.kbli_subgolongan_nama || '',
        kbli_kelompok_kode: editData.kbli_kelompok_kode || '',
        kbli_kelompok_nama: editData.kbli_kelompok_nama || '',
        provinsi_kode: editData.provinsi_kode || '',
        provinsi_nama: editData.provinsi_nama || '',
        kabkot_kode: editData.kabkot_kode || '',
        kabkot_nama: editData.kabkot_nama || '',
        kecamatan_kode: editData.kecamatan_kode || '',
        kecamatan_nama: editData.kecamatan_nama || '',
        desa_kode: editData.desa_kode || '',
        desa_nama: editData.desa_nama || '',
        sls_kode: editData.sls_kode || '',
        sls_nama: editData.sls_nama || '',
        sub_sls: editData.sub_sls || '',
        latitude: editData.latitude,
        longitude: editData.longitude,
        platform_digital: editData.platform_digital?.length > 0 ? editData.platform_digital : [{ platform: '', nama_akun: '' }],
        kelas_usaha: editData.kelas_usaha || '',
        cakupan_pasar: editData.cakupan_pasar || '',
      })
    }
  }, [editData])

  // KBLI derived data
  const golonganPokok = form.kbli_kategori_kode ? getGolonganPokokByKategori(form.kbli_kategori_kode) : []
  const golongan = form.kbli_golongan_pokok_kode ? getGolonganByGolonganPokok(form.kbli_golongan_pokok_kode) : []
  const subgolongan = form.kbli_golongan_kode ? getSubgolonganByGolongan(form.kbli_golongan_kode) : []
  const kelompok = form.kbli_subgolongan_kode ? getKelompokBySubgolongan(form.kbli_subgolongan_kode) : []

  // Wilayah derived data
  const kabKot = form.provinsi_kode ? getKabKotByProvinsi(form.provinsi_kode) : []
  const kecamatan = form.kabkot_kode ? getKecamatanByKabKot(form.kabkot_kode) : []
  const desa = form.kecamatan_kode ? getDesaByKecamatan(form.kecamatan_kode) : []

  const setField = (key: keyof FormData, val: unknown) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => { const e = { ...prev }; delete e[key]; return e })
  }

  // Step validation checks (for red indicator)
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 0: return !!(form.nama_pemilik.trim() && form.nama_usaha.trim())
      case 1: return !!(form.kbli_kategori_kode && form.kbli_golongan_pokok_kode && form.kbli_golongan_kode && form.kbli_subgolongan_kode && form.kbli_kelompok_kode && form.deskripsi_kegiatan.trim())
      case 2: return !!(form.provinsi_kode && form.kabkot_kode && form.kecamatan_kode && form.desa_kode && form.sls_nama.trim())
      case 3: return true // Geo is optional
      case 4: {
        const valid = form.platform_digital.filter((p) => p.platform && p.nama_akun)
        const incomplete = form.platform_digital.some((p) => (p.platform && !p.nama_akun) || (!p.platform && p.nama_akun))
        return valid.length > 0 && !incomplete
      }
      case 5: return !!(form.kelas_usaha && form.cakupan_pasar)
      default: return true
    }
  }

  const stepHasError = (step: number): boolean => {
    // Only show red if user has visited or passed the step and it's incomplete
    return visitedSteps.has(step) && !isStepComplete(step)
  }

  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.nama_pemilik.trim()) e.nama_pemilik = 'Nama pemilik wajib diisi'
    if (!form.nama_usaha.trim()) e.nama_usaha = 'Nama usaha wajib diisi'
    if (!form.deskripsi_kegiatan.trim()) e.deskripsi_kegiatan = 'Deskripsi kegiatan wajib diisi'
    if (!form.kbli_kategori_kode) e.kbli = 'Kategori KBLI wajib dipilih'
    if (!form.kbli_golongan_pokok_kode) e.kbli_gp = 'Golongan Pokok wajib dipilih'
    if (!form.kbli_golongan_kode) e.kbli_g = 'Golongan wajib dipilih'
    if (!form.kbli_subgolongan_kode) e.kbli_sg = 'Subgolongan wajib dipilih'
    if (!form.kbli_kelompok_kode) e.kbli_k = 'Kelompok KBLI wajib dipilih'
    if (!form.provinsi_kode) e.provinsi = 'Provinsi wajib dipilih'
    if (!form.kabkot_kode) e.kabkot = 'Kabupaten/Kota wajib dipilih'
    if (!form.kecamatan_kode) e.kecamatan = 'Kecamatan wajib dipilih'
    if (!form.desa_kode) e.desa = 'Desa/Kelurahan wajib dipilih'
    if (!form.sls_nama.trim()) e.sls_nama = 'SLS wajib diisi'
    if (!form.kelas_usaha) e.kelas_usaha = 'Skala usaha wajib dipilih'
    if (!form.cakupan_pasar) e.cakupan_pasar = 'Cakupan pasar wajib dipilih'
    const validPlatforms = form.platform_digital.filter((p) => p.platform && p.nama_akun)
    if (validPlatforms.length === 0) e.platform = 'Minimal 1 platform dan nama akun wajib diisi'
    if (form.platform_digital.some((p) => (p.platform && !p.nama_akun) || (!p.platform && p.nama_akun))) {
      e.platform = 'Platform dan nama akun harus diisi keduanya'
    }
    setErrors(e)
    // Mark all steps as visited
    setVisitedSteps(new Set([0, 1, 2, 3, 4, 5]))
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      // Navigate to first step with error
      for (let s = 0; s <= 5; s++) {
        if (!isStepComplete(s)) { setActiveStep(s); break }
      }
      return
    }
    setSubmitting(true)
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('user_email') || 'pencacah01@bps.go.id' : 'pencacah01@bps.go.id'
    const now = new Date().toISOString()
    if (isEdit) {
      console.log('Updating usaha:', { ...form, updated_by_email: userEmail, updated_at: now })
    } else {
      console.log('Saving usaha:', { ...form, created_by_email: userEmail, created_at: now, is_active: true })
    }
    setTimeout(() => {
      setSubmitting(false)
      onSuccess()
    }, 800)
  }

  const nextStep = () => {
    const next = Math.min(activeStep + 1, 5)
    setVisitedSteps((prev) => new Set([...prev, next]))
    setActiveStep(next)
  }
  const prevStep = () => setActiveStep((c) => Math.max(c - 1, 0))

  const handleStepClick = (step: number) => {
    setVisitedSteps((prev) => new Set([...prev, step]))
    setActiveStep(step)
  }

  return (
    <Drawer
      opened
      onClose={onClose}
      title={
        <div>
          <Text fw={700} size="lg" style={{ fontFamily: 'DM Sans' }}>{isEdit ? 'Edit Usaha' : 'Tambah Usaha Baru'}</Text>
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
      <style>{`
        .step-error .mantine-Stepper-stepIcon {
          background-color: #fee2e2 !important;
          border-color: #ef4444 !important;
          color: #ef4444 !important;
        }
        .step-error .mantine-Stepper-stepLabel {
          color: #ef4444 !important;
        }
      `}</style>
      <div className="flex flex-col h-full">
        {/* Stepper */}
        <div className="px-4 py-4 border-b border-gray-200 bg-slate-50">
          <Stepper active={activeStep} onStepClick={handleStepClick} size="xs" color="#003087">
            <Stepper.Step label="Nama" className={stepHasError(0) ? 'step-error' : ''} />
            <Stepper.Step label="KBLI" className={stepHasError(1) ? 'step-error' : ''} />
            <Stepper.Step label="Lokasi" className={stepHasError(2) ? 'step-error' : ''} />
            <Stepper.Step label="Geo" className={stepHasError(3) ? 'step-error' : ''} />
            <Stepper.Step label="Platform" className={stepHasError(4) ? 'step-error' : ''} />
            <Stepper.Step label="Kelas" className={stepHasError(5) ? 'step-error' : ''} />
          </Stepper>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {errors.submit && (
            <Alert icon={<IconAlertCircle size={18} />} color="red" radius="md" mb="md">
              {errors.submit}
            </Alert>
          )}

          {/* Step 0: Nama Usaha */}
          {activeStep === 0 && (
            <Stack gap="md">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">1</div>
                <Text fw={700}>Nama Usaha</Text>
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
                required
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
                error={errors.kbli_gp}
                required
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
                error={errors.kbli_g}
                required
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
                error={errors.kbli_sg}
                required
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
                error={errors.kbli_k}
                required
              />

              {form.kbli_kelompok_kode && (
                <Paper p="md" radius="md" bg="blue.0" withBorder style={{ borderColor: 'var(--mantine-color-blue-2)' }}>
                  <Text size="xs" fw={700} c="blue.9" mb="xs">KBLI Terpilih:</Text>
                  <Text size="sm" fw={700}>{form.kbli_kelompok_kode}</Text>
                  <Text size="sm" c="dimmed">{form.kbli_kelompok_nama}</Text>
                  <Text size="xs" c="dimmed" mt="xs">{form.kbli_kategori_nama}</Text>
                </Paper>
              )}

              <Textarea
                label="Deskripsi Kegiatan Usaha"
                placeholder="Jelaskan kegiatan usaha secara singkat"
                value={form.deskripsi_kegiatan}
                onChange={(e) => setField('deskripsi_kegiatan', e.currentTarget.value)}
                error={errors.deskripsi_kegiatan}
                minRows={3}
                required
              />
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
                required
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
                error={errors.kabkot}
                required
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
                error={errors.kecamatan}
                required
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
                error={errors.desa}
                required
              />
              <TextInput
                label="SLS (Dusun / Lingkungan / Banjar)"
                placeholder="Cth: Banjar Anyar Tengah"
                value={form.sls_nama}
                onChange={(e) => setField('sls_nama', e.currentTarget.value)}
                error={errors.sls_nama}
                required
              />
              <TextInput
                label="Sub SLS (opsional)"
                placeholder="Cth: RT 01, Gang Melati, Blok A, dll."
                value={form.sub_sls}
                onChange={(e) => setField('sub_sls', e.currentTarget.value)}
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
              <Text size="sm" c="dimmed">Tambahkan semua platform yang digunakan untuk menjalankan usaha secara digital. Minimal 1 platform wajib diisi.</Text>
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
                        required
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
                        required
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

          {/* Step 5: Kelas (was Skala) */}
          {activeStep === 5 && (
            <Stack gap="lg">
              <Group gap="xs" mb="sm">
                <div className="w-7 h-7 rounded-full bg-[#003087] text-white text-xs font-bold flex items-center justify-center">6</div>
                <Text fw={700}>Klasifikasi Usaha</Text>
              </Group>

              <div>
                <Text size="sm" fw={600} mb="xs">Skala Usaha <span className="text-red-500">*</span></Text>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: 'mikro', label: 'Mikro', desc: 'Hasil penjualan/tahun ≤ Rp2 Miliar' },
                    { val: 'kecil', label: 'Kecil', desc: 'Rp2-15 Miliar' },
                    { val: 'menengah', label: 'Menengah', desc: 'Rp15-50 Miliar' },
                    { val: 'besar', label: 'Besar', desc: '> Rp50 Miliar' },
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
                    { val: 'lokal', label: 'Lokal', desc: 'Kabupaten/kota' },
                    { val: 'regional', label: 'Regional', desc: 'Provinsi' },
                    { val: 'nasional', label: 'Nasional', desc: 'Indonesia' },
                    { val: 'internasional', label: 'Internasional', desc: 'Mancanegara' },
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
                  {isEdit ? 'Simpan Perubahan' : 'Simpan Usaha'}
                </Button>
              )}
            </Group>
          </Group>
        </div>
      </div>
    </Drawer>
  )
}
