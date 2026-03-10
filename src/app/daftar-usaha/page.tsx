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
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  IconPlus,
  IconSearch,
  IconRefresh,
  IconX,
  IconBuildingStore,
} from '@tabler/icons-react'
import { useGetUsahaListQuery, useDeleteUsahaMutation } from '@/store/services/usahaApi'
import useAuth from '@/hooks/useAuth'

const FormTambahUsaha = dynamic(() => import('@/components/FormTambahUsaha'), { ssr: false })

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

  const { data: usahaResponse, isLoading: loading, refetch } = useGetUsahaListQuery()
  const [deleteUsaha, { isLoading: deleting }] = useDeleteUsahaMutation()

  const usahaList = useMemo(() => usahaResponse?.data || [], [usahaResponse])

  const kecamatanOptions = useMemo(() => {
    const names = Array.from(new Set(usahaList.map((u) => u.kecamatan_nama).filter(Boolean))).sort()
    return names.map((name) => ({ value: name, label: name }))
  }, [usahaList])

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
      notifications.show({
        title: 'Dihapus',
        message: 'Data usaha berhasil dihapus.',
        color: 'red',
      })
    } catch {
      notifications.show({
        title: 'Gagal',
        message: 'Gagal menghapus data usaha.',
        color: 'red',
      })
    }
  }

  const filtered = useMemo(() => {
    return usahaList.filter((u) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        u.nama_usaha?.toLowerCase().includes(q) ||
        u.nama_pemilik?.toLowerCase().includes(q) ||
        u.kbli_kategori_kode?.toLowerCase().includes(q) ||
        u.kecamatan_nama?.toLowerCase().includes(q)
      const matchKelas = !filterKelas || u.kelas_usaha === filterKelas
      const matchPasar = !filterPasar || u.cakupan_pasar === filterPasar
      const matchKecamatan = !filterKecamatan || u.kecamatan_nama === filterKecamatan
      return matchSearch && matchKelas && matchPasar && matchKecamatan
    })
  }, [usahaList, search, filterKelas, filterPasar, filterKecamatan])

  const handleRefresh = () => {
    refetch()
  }

  const hasFilters = search || filterKelas || filterPasar || filterKecamatan

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
                {filtered.length} usaha ditemukan
                {usahaList.length !== filtered.length && ` dari ${usahaList.length} total`}
              </Text>
            </div>
            <Group gap="xs">
              <Button
                variant="default"
                size="sm"
                leftSection={<IconRefresh size={15} className={loading ? 'animate-spin' : ''} />}
                onClick={handleRefresh}
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
                onChange={(e) => setSearch(e.currentTarget.value)}
                style={{ flex: 1, minWidth: 200 }}
                size="sm"
              />
              <Select
                placeholder="Semua Kecamatan"
                data={kecamatanOptions}
                value={filterKecamatan}
                onChange={setFilterKecamatan}
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
                onChange={setFilterKelas}
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
                onChange={setFilterPasar}
                clearable
                size="sm"
                style={{ minWidth: 150 }}
              />
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
          ) : filtered.length === 0 ? (
            <Paper radius="lg" shadow="xs" withBorder py={60} ta="center">
              <Stack align="center" gap="sm">
                <ThemeIcon size={48} variant="light" color="gray" radius="xl">
                  <IconBuildingStore size={24} />
                </ThemeIcon>
                <Text c="dimmed" fw={500}>
                  {usahaList.length === 0 ? 'Belum ada data usaha' : 'Tidak ada usaha yang sesuai filter'}
                </Text>
                <Text size="sm" c="dimmed">
                  {usahaList.length === 0 ? 'Klik "Tambah Usaha" untuk menambahkan data baru' : 'Coba ubah kata kunci pencarian'}
                </Text>
                {usahaList.length === 0 && (
                  <Button
                    size="sm"
                    leftSection={<IconPlus size={16} />}
                    onClick={() => setShowForm(true)}
                    mt="sm"
                    style={{ backgroundColor: '#003087' }}
                  >
                    Tambah Usaha Pertama
                  </Button>
                )}
              </Stack>
            </Paper>
          ) : (
            <UsahaTable
              data={filtered}
              onView={(usaha) => setSelectedUsaha(usaha)}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteId(id)}
              isAdmin={isAdmin}
            />
          )}
        </div>
      </main>

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
