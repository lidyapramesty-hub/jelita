'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import UsahaTable from '@/components/daftar-usaha/UsahaTable'
import UsahaDetailModal from '@/components/daftar-usaha/UsahaDetailModal'
import DeleteConfirmModal from '@/components/daftar-usaha/DeleteConfirmModal'
import { Usaha } from '@/types/usaha'
import {
  Button,
  Title,
  Text,
  TextInput,
  Select,
  Group,
  Stack,
  Paper,
  ThemeIcon,
  Autocomplete,
  Modal,
  Divider,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  IconPlus,
  IconSearch,
  IconRefresh,
  IconX,
  IconCheck,
  IconBuildingStore,
  IconChevronLeft,
  IconChevronRight,
  IconUser,
  IconDownload,
  IconFileSpreadsheet,
  IconShieldCheck,
} from '@tabler/icons-react'
import { useGetUsahaListQuery, useLazyGetUsahaListQuery, useDeleteUsahaMutation, useGetUsahaCreatorsQuery, useVerifyUsahaMutation } from '@/store/services/usahaApi'
import useAuth from '@/hooks/useAuth'
import { kbliKategori, kbliKelompok } from '@/data/kbli2025'

const kbliKategoriMap: Record<string, string> = Object.fromEntries(kbliKategori.map(k => [k.kode, k.nama]))
const kbliKelompokMap: Record<string, string> = Object.fromEntries(kbliKelompok.map(k => [k.kode, k.nama]))

const FormTambahUsaha = dynamic(() => import('@/components/FormTambahUsaha'), { ssr: false })

const PER_PAGE = 10

export default function DaftarUsahaPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [showForm, setShowForm] = useState(false)
  const [editUsaha, setEditUsaha] = useState<Usaha | null>(null)
  const [search, setSearch] = useState('')
  const [filterKelas, setFilterKelas] = useState<string | null>(null)
  const [filterPasar, setFilterPasar] = useState<string | null>(null)
  const [filterKecamatan, setFilterKecamatan] = useState<string | null>(null)
  const [selectedUsaha, setSelectedUsaha] = useState<Usaha | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterCreatedBy, setFilterCreatedBy] = useState<number | null>(null)
  const [pelaporSearch, setPelaporSearch] = useState('')
  const [showMineOnly, setShowMineOnly] = useState(false)

  // Verify modal
  const [verifyTarget, setVerifyTarget] = useState<Usaha | null>(null)

  // Export modal
  const [exportOpened, setExportOpened] = useState(false)
  const [exportType, setExportType] = useState<'xlsx' | 'pdf'>('xlsx')
  const [expKecamatan, setExpKecamatan] = useState<string | null>(null)
  const [expKelas, setExpKelas] = useState<string | null>(null)
  const [expPasar, setExpPasar] = useState<string | null>(null)
  const [expPlatform, setExpPlatform] = useState('')
  const [expKbli, setExpKbli] = useState<string | null>(null)
  const [expStatus, setExpStatus] = useState<string | null>(null)

  const queryParams = useMemo(() => ({
    search: search || undefined,
    kelas_usaha: filterKelas || undefined,
    cakupan_pasar: filterPasar || undefined,
    kecamatan_nama: filterKecamatan || undefined,
    status: filterStatus || undefined,
    created_by: showMineOnly ? (user?.id ?? undefined) : (filterCreatedBy ?? undefined),
    page,
    per_page: PER_PAGE,
  }), [search, filterKelas, filterPasar, filterKecamatan, filterStatus, filterCreatedBy, showMineOnly, user?.id, page])

  const { data: usahaResponse, isLoading: loading, refetch } = useGetUsahaListQuery(queryParams)
  const [deleteUsaha, { isLoading: deleting }] = useDeleteUsahaMutation()
  const [verifyUsaha, { isLoading: verifying }] = useVerifyUsahaMutation()
  const { data: creators = [] } = useGetUsahaCreatorsQuery()
  const [fetchAllForExport] = useLazyGetUsahaListQuery()

  const usahaList = usahaResponse?.data || []
  const totalPages = usahaResponse?.last_page || 1
  const totalItems = usahaResponse?.total || 0

  const resetPage = () => setPage(1)

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, 6, 7]
    if (page >= totalPages - 3) return Array.from({ length: 7 }, (_, i) => totalPages - 6 + i)
    return Array.from({ length: 7 }, (_, i) => page - 3 + i)
  }, [totalPages, page])

  const handleSuccess = () => {
    setShowForm(false)
    setEditUsaha(null)
    notifications.show({
      title: 'Berhasil',
      message: editUsaha ? 'Usaha berhasil diperbarui!' : 'Usaha berhasil ditambahkan!',
      color: 'green',
    })
  }

  const handleEdit = (usaha: Usaha) => {
    setEditUsaha(usaha)
    setShowForm(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteUsaha(deleteId).unwrap()
      setDeleteId(null)
      notifications.show({ title: 'Dihapus', message: 'Data usaha berhasil dihapus.', color: 'red' })
    } catch {
      notifications.show({ title: 'Gagal', message: 'Gagal menghapus data usaha.', color: 'red' })
    }
  }

  const handleVerify = async (status: 'approved' | 'declined') => {
    if (!verifyTarget) return
    try {
      await verifyUsaha({ id: verifyTarget.id, status }).unwrap()
      setVerifyTarget(null)
      notifications.show({ title: 'Berhasil', message: `Usaha berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}.`, color: status === 'approved' ? 'green' : 'red' })
    } catch {
      notifications.show({ title: 'Gagal', message: 'Gagal memperbarui status.', color: 'red' })
    }
  }

  const runExport = async (type: 'xlsx' | 'pdf') => {
    const expParams = {
      search: queryParams.search,
      kelas_usaha: expKelas || undefined,
      cakupan_pasar: expPasar || undefined,
      kecamatan_nama: expKecamatan || undefined,
      kbli_kategori_kode: expKbli || undefined,
      status: expStatus || undefined,
      created_by: queryParams.created_by,
      sort_by: 'nama_usaha',
      sort_dir: 'asc' as const,
      page: 1,
      per_page: 99999,
    }
    try {
      notifications.show({ id: 'export', title: 'Mengambil data...', message: 'Harap tunggu.', color: 'blue', loading: true, autoClose: false })
      const result = await fetchAllForExport(expParams).unwrap()
      let allData = result.data
      if (expPlatform.trim()) {
        const pf = expPlatform.trim().toLowerCase()
        allData = allData.filter(u => u.platforms?.some((p: { platform: string }) => p.platform.toLowerCase().includes(pf)))
      }

      if (type === 'xlsx') {
        const XLSX = await import('xlsx')
        const exportData = allData.map((u, i) => ({
          No: i + 1,
          'Nama Usaha': u.nama_usaha,
          'Nama Pemilik': u.nama_pemilik,
          'Deskripsi': u.deskripsi_kegiatan || '',
          'KBLI Kategori Kode': u.kbli_kategori_kode || '',
          'KBLI Kategori Nama': u.kbli_kategori_kode ? (kbliKategoriMap[u.kbli_kategori_kode] || '') : '',
          'KBLI Kelompok Kode': u.kbli_kelompok_kode || '',
          'KBLI Kelompok Nama': u.kbli_kelompok_kode ? (kbliKelompokMap[u.kbli_kelompok_kode] || '') : '',
          'Platform Digital': u.platforms?.length ? u.platforms.map((p: { platform: string; nama_akun: string }) => `${p.platform}: ${p.nama_akun}`).join('; ') : '',
          'Provinsi': 'Bali',
          'Kabupaten': 'Tabanan',
          'Kecamatan': u.kecamatan_nama || '',
          'Desa': u.desa_nama || '',
          'SLS': u.sls_nama || '',
          'Sub SLS': u.sub_sls || '',
          'Latitude': u.latitude || '',
          'Longitude': u.longitude || '',
          'Skala Usaha': u.kelas_usaha || '',
          'Cakupan Pasar': u.cakupan_pasar || '',
          'Status': u.status || '',
          'Pelapor': u.creator ? (u.creator.role === 'mitra' ? u.creator.name : u.creator.username) : '',
          'Waktu Ditambahkan': u.created_at ? new Date(u.created_at).toLocaleString('id-ID') : '',
          'Editor': u.updater ? (u.updater.role === 'mitra' ? u.updater.name : u.updater.username) : '',
          'Waktu Diedit': u.updated_at ? new Date(u.updated_at).toLocaleString('id-ID') : '',
        }))
        const ws = XLSX.utils.json_to_sheet(exportData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Daftar Usaha')
        XLSX.writeFile(wb, 'daftar-usaha.xlsx')
      } else {
        const { default: jsPDF } = await import('jspdf')
        const { default: autoTable } = await import('jspdf-autotable')
        const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
        doc.setFontSize(14)
        doc.text('Daftar Usaha Digital - BPS Kabupaten Tabanan', 14, 15)
        autoTable(doc, {
          startY: 22,
          head: [['No', 'Nama Usaha', 'Pemilik', 'Deskripsi', 'Kategori KBLI', 'Kelompok KBLI', 'Platform', 'Kecamatan', 'Desa', 'SLS', 'Lat', 'Lng', 'Skala', 'Pasar', 'Status', 'Pelapor', 'Tgl Ditambah']],
          body: allData.map((u, i) => [
            i + 1,
            u.nama_usaha,
            u.nama_pemilik,
            u.deskripsi_kegiatan || '—',
            u.kbli_kategori_kode ? `${u.kbli_kategori_kode} — ${kbliKategoriMap[u.kbli_kategori_kode] || ''}` : '—',
            u.kbli_kelompok_kode ? `${u.kbli_kelompok_kode} — ${kbliKelompokMap[u.kbli_kelompok_kode] || ''}` : '—',
            u.platforms?.length ? u.platforms.map((p: { platform: string; nama_akun: string }) => `${p.platform}: ${p.nama_akun}`).join(', ') : '—',
            u.kecamatan_nama || '—',
            u.desa_nama || '—',
            u.sls_nama || '—',
            u.latitude || '—',
            u.longitude || '—',
            u.kelas_usaha || '—',
            u.cakupan_pasar || '—',
            u.status || '—',
            u.creator ? (u.creator.role === 'mitra' ? u.creator.name : u.creator.username) : '—',
            u.created_at ? new Date(u.created_at).toLocaleDateString('id-ID') : '—',
          ]),
          styles: { fontSize: 5.5, cellPadding: 1.5 },
          headStyles: { fillColor: [0, 48, 135] },
          didParseCell: (data) => {
            if (data.section === 'body') {
              const rowData = allData[data.row.index]
              if (rowData?.status === 'declined') {
                data.cell.styles.textColor = [220, 38, 38]
              } else if (rowData?.status === 'pending') {
                data.cell.styles.textColor = [234, 88, 12]
              }
            }
          },
        })
        doc.save('daftar-usaha.pdf')
      }

      notifications.hide('export')
      notifications.show({ title: 'Berhasil', message: `${allData.length} data diekspor ke ${type.toUpperCase()}.`, color: 'green' })
      setExportOpened(false)
    } catch {
      notifications.hide('export')
      notifications.show({ title: 'Error', message: `Gagal mengekspor ke ${type.toUpperCase()}.`, color: 'red' })
    }
  }

  const hasFilters = search || filterKelas || filterPasar || filterKecamatan || filterStatus || filterCreatedBy || showMineOnly

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="lg:ml-64 pt-14 lg:pt-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div>
              <Title order={3} style={{ fontFamily: 'DM Sans' }}>Daftar Usaha</Title>
              <Text size="sm" c="dimmed" mt={2}>
                {loading ? 'Memuat...' : `${totalItems} usaha ditemukan`}
              </Text>
            </div>
            <Group gap="xs">
              <Button
                variant="default"
                size="sm"
                leftSection={<IconRefresh size={15} className={loading ? 'animate-spin' : ''} />}
                onClick={() => refetch()}
                visibleFrom="sm"
              >
                Perbarui
              </Button>
              <Button
                size="sm"
                leftSection={<IconPlus size={16} />}
                onClick={() => { setEditUsaha(null); setShowForm(true) }}
                style={{ backgroundColor: '#003087' }}
              >
                Tambah Usaha
              </Button>
              <Button
                size="sm"
                variant="default"
                leftSection={<IconFileSpreadsheet size={16} />}
                onClick={() => { setExportType('xlsx'); setExportOpened(true) }}
                visibleFrom="sm"
              >
                XLSX
              </Button>
              <Button
                size="sm"
                variant="default"
                leftSection={<IconDownload size={16} />}
                onClick={() => { setExportType('pdf'); setExportOpened(true) }}
                visibleFrom="sm"
              >
                PDF
              </Button>
            </Group>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Filters */}
          <Paper radius="lg" p="md" mb="md" shadow="xs" withBorder>
            <Group gap="sm" wrap="wrap">
              <TextInput
                placeholder="Cari nama usaha, pemilik, kecamatan..."
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={(e) => { setSearch(e.currentTarget.value); resetPage() }}
                style={{ flex: 1, minWidth: 200 }}
                size="sm"
              />
              <Select
                placeholder="Semua Kecamatan"
                data={[
                  'Selemadeg', 'Selemadeg Barat', 'Selemadeg Timur', 'Kerambitan',
                  'Tabanan', 'Kediri', 'Marga', 'Penebel', 'Baturiti', 'Pupuan',
                ].map((v) => ({ value: v, label: v }))}
                value={filterKecamatan}
                onChange={(v) => { setFilterKecamatan(v); resetPage() }}
                clearable
                searchable
                size="sm"
                style={{ minWidth: 160 }}
              />
              <Select
                placeholder="Semua Skala"
                data={[
                  { value: 'mikro', label: 'Mikro' },
                  { value: 'kecil', label: 'Kecil' },
                  { value: 'menengah', label: 'Menengah' },
                  { value: 'besar', label: 'Besar' },
                ]}
                value={filterKelas}
                onChange={(v) => { setFilterKelas(v); resetPage() }}
                clearable
                size="sm"
                style={{ minWidth: 140 }}
              />
              <Select
                placeholder="Semua Pasar"
                data={[
                  { value: 'lokal', label: 'Lokal' },
                  { value: 'regional', label: 'Regional' },
                  { value: 'nasional', label: 'Nasional' },
                  { value: 'internasional', label: 'Internasional' },
                ]}
                value={filterPasar}
                onChange={(v) => { setFilterPasar(v); resetPage() }}
                clearable
                size="sm"
                style={{ minWidth: 150 }}
              />
              <Select
                placeholder="Semua Status"
                data={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'approved', label: 'Disetujui' },
                  { value: 'declined', label: 'Ditolak' },
                ]}
                value={filterStatus}
                onChange={(v) => { setFilterStatus(v); resetPage() }}
                clearable
                size="sm"
                style={{ minWidth: 140 }}
              />
              <Button
                size="sm"
                variant={showMineOnly ? 'filled' : 'default'}
                leftSection={<IconUser size={14} />}
                onClick={() => { setShowMineOnly(!showMineOnly); setFilterCreatedBy(null); setPelaporSearch(''); resetPage() }}
                style={showMineOnly ? { backgroundColor: '#003087' } : {}}
              >
                Daftar Saya
              </Button>
              {isAdmin && !showMineOnly && (
                <Autocomplete
                  placeholder="Filter pelapor..."
                  data={creators.map(c => ({ value: String(c.id), label: (c.role === 'mitra' ? c.name : c.username) || c.name || String(c.id) }))}
                  value={pelaporSearch}
                  onChange={(val) => {
                    setPelaporSearch(val)
                    const found = creators.find(c => ((c.role === 'mitra' ? c.name : c.username) || c.name) === val)
                    setFilterCreatedBy(found ? found.id : null)
                    resetPage()
                  }}
                  size="sm"
                  style={{ minWidth: 180 }}
                  clearable
                />
              )}
              {hasFilters && (
                <Button
                  variant="subtle"
                  color="gray"
                  size="sm"
                  leftSection={<IconX size={14} />}
                  onClick={() => {
                    setSearch('')
                    setFilterKelas(null)
                    setFilterPasar(null)
                    setFilterKecamatan(null)
                    setFilterStatus(null)
                    setFilterCreatedBy(null)
                    setPelaporSearch('')
                    setShowMineOnly(false)
                    setPage(1)
                  }}
                >
                  Reset
                </Button>
              )}
            </Group>
          </Paper>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-[#003087]/20 border-t-[#003087] rounded-full animate-spin" />
                <Text size="sm" c="dimmed">Memuat data...</Text>
              </div>
            </div>
          ) : usahaList.length === 0 ? (
            <Paper radius="lg" shadow="xs" withBorder py={60} ta="center">
              <Stack align="center" gap="sm">
                <ThemeIcon size={48} variant="light" color="gray" radius="xl">
                  <IconBuildingStore size={24} />
                </ThemeIcon>
                <Text c="dimmed" fw={500}>
                  {totalItems === 0 ? 'Belum ada data usaha' : 'Tidak ada usaha yang sesuai filter'}
                </Text>
                <Text size="sm" c="dimmed">
                  {totalItems === 0 ? 'Klik "Tambah Usaha" untuk menambahkan data baru' : 'Coba ubah kata kunci pencarian'}
                </Text>
                {totalItems === 0 && (
                  <Button size="sm" leftSection={<IconPlus size={16} />} onClick={() => setShowForm(true)} mt="sm" style={{ backgroundColor: '#003087' }}>
                    Tambah Usaha Pertama
                  </Button>
                )}
              </Stack>
            </Paper>
          ) : (
            <>
              <UsahaTable
                data={usahaList}
                onView={(usaha) => setSelectedUsaha(usaha)}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onVerifyRequest={isAdmin ? (usaha) => setVerifyTarget(usaha) : undefined}
                isAdmin={isAdmin}
              />

              {totalPages > 1 && (
                <Group justify="space-between" mt="md" align="center">
                  <Text size="sm" c="dimmed">
                    Halaman {page} dari {totalPages} · {totalItems} data
                  </Text>
                  <Group gap="xs">
                    <Button variant="default" size="sm" leftSection={<IconChevronLeft size={14} />} disabled={page <= 1} onClick={() => setPage(page - 1)}>
                      Prev
                    </Button>
                    {pageNumbers.map((p) => (
                      <Button key={p} variant={p === page ? 'filled' : 'default'} size="sm" style={p === page ? { backgroundColor: '#003087' } : {}} onClick={() => setPage(p)}>
                        {p}
                      </Button>
                    ))}
                    <Button variant="default" size="sm" rightSection={<IconChevronRight size={14} />} disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                      Next
                    </Button>
                  </Group>
                </Group>
              )}
            </>
          )}
        </div>
      </main>

      {/* Verify Modal */}
      <Modal
        opened={!!verifyTarget}
        onClose={() => setVerifyTarget(null)}
        title="Verifikasi Usaha"
        centered
        size="sm"
      >
        {verifyTarget && (
          <Stack gap="md">
            <Text size="sm">Pilih tindakan untuk:</Text>
            <Paper radius="md" p="sm" withBorder>
              <Text fw={600} size="sm">{verifyTarget.nama_usaha}</Text>
              <Text size="xs" c="dimmed">{verifyTarget.nama_pemilik}</Text>
            </Paper>
            <Group justify="space-between" mt="sm">
              <Button color="red" variant="light" leftSection={<IconX size={14} />} onClick={() => handleVerify('declined')} loading={verifying}>
                Tolak
              </Button>
              <Button color="green" leftSection={<IconCheck size={14} />} onClick={() => handleVerify('approved')} loading={verifying} style={{ backgroundColor: '#16a34a' }}>
                Setujui
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Export Filter Modal */}
      <Modal
        opened={exportOpened}
        onClose={() => setExportOpened(false)}
        title={`Opsi Unduh ${exportType.toUpperCase()}`}
        centered
        size="lg"
      >
        <Stack gap="sm">
          <Text size="sm" c="dimmed">Filter data yang akan diunduh (opsional). Kosongkan untuk mengunduh semua data.</Text>
          <Divider />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Kecamatan"
              placeholder="Semua Kecamatan"
              data={['Selemadeg', 'Selemadeg Barat', 'Selemadeg Timur', 'Kerambitan', 'Tabanan', 'Kediri', 'Marga', 'Penebel', 'Baturiti', 'Pupuan'].map(v => ({ value: v, label: v }))}
              value={expKecamatan}
              onChange={setExpKecamatan}
              clearable
              searchable
              size="sm"
            />
            <Select
              label="Skala Usaha"
              placeholder="Semua Skala"
              data={[{ value: 'mikro', label: 'Mikro' }, { value: 'kecil', label: 'Kecil' }, { value: 'menengah', label: 'Menengah' }, { value: 'besar', label: 'Besar' }]}
              value={expKelas}
              onChange={setExpKelas}
              clearable
              size="sm"
            />
            <Select
              label="Cakupan Pasar"
              placeholder="Semua Pasar"
              data={[{ value: 'lokal', label: 'Lokal' }, { value: 'regional', label: 'Regional' }, { value: 'nasional', label: 'Nasional' }, { value: 'internasional', label: 'Internasional' }]}
              value={expPasar}
              onChange={setExpPasar}
              clearable
              size="sm"
            />
            <Select
              label="Platform Digital"
              placeholder="Semua Platform"
              data={[
                'Agoda', 'Airbnb', 'Blibli', 'Booking.com', 'Bukalapak',
                'Facebook', 'Gojek', 'Grab', 'Instagram', 'JD.ID',
                'Lazada', 'Shopee', 'TikTok', 'Tokopedia', 'Traveloka',
                'Twitter/X', 'Website Sendiri', 'WhatsApp', 'YouTube', 'Lainnya',
              ].map(v => ({ value: v, label: v }))}
              value={expPlatform || null}
              onChange={(v) => setExpPlatform(v || '')}
              clearable
              searchable
              size="sm"
            />
            <Select
              label="Kategori KBLI"
              placeholder="Semua Kategori"
              data={kbliKategori.map(k => ({ value: k.kode, label: `${k.kode} — ${k.nama}` }))}
              value={expKbli}
              onChange={setExpKbli}
              clearable
              searchable
              size="sm"
            />
            <Select
              label="Status"
              placeholder="Semua Status"
              data={[{ value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Disetujui' }, { value: 'declined', label: 'Ditolak' }]}
              value={expStatus}
              onChange={setExpStatus}
              clearable
              size="sm"
            />
          </div>
          <Divider />
          <Group justify="space-between" mt="xs">
            <Button variant="subtle" color="gray" onClick={() => { setExpKecamatan(null); setExpKelas(null); setExpPasar(null); setExpPlatform(''); setExpKbli(null); setExpStatus(null) }}>
              Reset Filter
            </Button>
            {exportType === 'xlsx' ? (
              <Button
                leftSection={<IconFileSpreadsheet size={15} />}
                onClick={() => runExport('xlsx')}
                style={{ backgroundColor: '#003087' }}
              >
                Unduh XLSX
              </Button>
            ) : (
              <Button
                leftSection={<IconDownload size={15} />}
                onClick={() => runExport('pdf')}
                style={{ backgroundColor: '#003087' }}
              >
                Unduh PDF
              </Button>
            )}
          </Group>
        </Stack>
      </Modal>

      {/* Form Modal */}
      {showForm && (
        <FormTambahUsaha
          onClose={() => { setShowForm(false); setEditUsaha(null) }}
          onSuccess={handleSuccess}
          editData={editUsaha}
        />
      )}

      {/* Detail Modal */}
      <UsahaDetailModal usaha={selectedUsaha} onClose={() => setSelectedUsaha(null)} />

      {/* Delete Confirm */}
      <DeleteConfirmModal
        opened={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </div>
  )
}
