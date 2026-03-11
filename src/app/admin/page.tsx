'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import {
  Button, Title, Text, TextInput, Select, Group, Stack, Paper,
  ThemeIcon, Modal, PasswordInput, Badge, ActionIcon, Tooltip,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import {
  IconPlus, IconSearch, IconTrash, IconPencil,
  IconUsers, IconShieldCheck, IconRefresh, IconX,
} from '@tabler/icons-react'
import {
  useGetAdminUsersQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
} from '@/store/services/adminApi'
import useAuth from '@/hooks/useAuth'

const ROLE_COLORS: Record<string, string> = {
  admin: 'red',
  pegawai: 'blue',
  mitra: 'orange',
}

export default function AdminPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [showCreate, setShowCreate] = useState(false)
  const [editUser, setEditUser] = useState<{ id: number; name: string; username: string | null; phone: string | null; role: string } | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [sortCol, setSortCol] = useState<string>('role')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const [formName, setFormName] = useState('')
  const [formUsername, setFormUsername] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [formRole, setFormRole] = useState<string | null>('pegawai')

  const { data: usersData, isLoading, refetch } = useGetAdminUsersQuery({
    search: search || undefined,
    role: filterRole || undefined,
    per_page: 20,
    page,
    sort_by: sortCol,
    sort_dir: sortDir,
  })
  const [createUser, { isLoading: creating }] = useCreateAdminUserMutation()
  const [updateUser, { isLoading: updating }] = useUpdateAdminUserMutation()
  const [deleteUser, { isLoading: deleting }] = useDeleteAdminUserMutation()

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Paper p="xl" radius="lg" shadow="md" ta="center">
          <ThemeIcon size={48} radius="xl" color="red" variant="light" mx="auto" mb="md">
            <IconShieldCheck size={24} />
          </ThemeIcon>
          <Text fw={700} size="lg">Akses Ditolak</Text>
          <Text c="dimmed" size="sm" mt="xs">Halaman ini hanya untuk administrator.</Text>
        </Paper>
      </div>
    )
  }

  const resetForm = () => {
    setFormName('')
    setFormUsername('')
    setFormPhone('')
    setFormPassword('')
    setFormRole('pegawai')
  }

  const handleCreate = async () => {
    if (!formName || !formPassword || !formRole) return
    if (formRole === 'mitra' && !formPhone) return
    if (formRole !== 'mitra' && !formUsername) return
    try {
      const payload = formRole === 'mitra'
        ? { name: formName, phone: formPhone, password: formPassword, role: formRole as 'pegawai' | 'mitra' }
        : { name: formName, username: formUsername, password: formPassword, role: formRole as 'pegawai' | 'mitra' }
      await createUser(payload).unwrap()
      notifications.show({ title: 'Berhasil', message: 'User berhasil dibuat.', color: 'green' })
      setShowCreate(false)
      resetForm()
    } catch {
      notifications.show({ title: 'Gagal', message: 'Gagal membuat user.', color: 'red' })
    }
  }

  const handleUpdate = async () => {
    if (!editUser) return
    try {
      const data: Record<string, string> = {}
      if (formName) data.name = formName
      if (editUser.role === 'mitra') {
        if (formPhone) data.phone = formPhone
      } else {
        if (formUsername) data.username = formUsername
      }
      if (formPassword) data.password = formPassword
      if (formRole && editUser.role !== 'admin') data.role = formRole
      await updateUser({ id: editUser.id, data }).unwrap()
      notifications.show({ title: 'Berhasil', message: 'User berhasil diperbarui.', color: 'green' })
      setEditUser(null)
      resetForm()
    } catch {
      notifications.show({ title: 'Gagal', message: 'Gagal memperbarui user.', color: 'red' })
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteUser(deleteId).unwrap()
      notifications.show({ title: 'Berhasil', message: 'User berhasil dihapus.', color: 'red' })
      setDeleteId(null)
    } catch {
      notifications.show({ title: 'Gagal', message: 'Gagal menghapus user.', color: 'red' })
    }
  }

  const openEdit = (u: { id: number; name: string; username: string | null; phone: string | null; role: string }) => {
    setEditUser(u)
    setFormName(u.name)
    setFormUsername(u.username || '')
    setFormPhone(u.phone || '')
    setFormPassword('')
    setFormRole(u.role)
  }

  const users = usersData?.data || []
  const totalPages = usersData?.last_page || 1

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortCol(col)
      setSortDir('asc')
    }
    setPage(1)
  }

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <span className="text-gray-300 ml-1">↕</span>
    return <span className="text-[#003087] ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="lg:ml-64 pt-14 lg:pt-0">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <Title order={3} style={{ fontFamily: 'DM Sans' }}>Admin Panel</Title>
              <Text size="sm" c="dimmed" mt={2}>Kelola pengguna dan data sistem</Text>
            </div>
            <Group gap="xs">
              <Button variant="default" size="sm" leftSection={<IconRefresh size={15} />} onClick={() => refetch()}>
                Perbarui
              </Button>
              <Button size="sm" leftSection={<IconPlus size={16} />} onClick={() => { resetForm(); setShowCreate(true) }} style={{ backgroundColor: '#003087' }}>
                Tambah User
              </Button>
            </Group>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Paper radius="lg" p="md" mb="md" shadow="xs" withBorder>
            <Group gap="sm" wrap="wrap">
              <TextInput
                placeholder="Cari nama atau username..."
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={(e) => { setSearch(e.currentTarget.value); setPage(1) }}
                style={{ flex: 1, minWidth: 200 }}
                size="sm"
              />
              <Select
                placeholder="Semua Role"
                data={[
                  { value: 'pegawai', label: 'Pegawai' },
                  { value: 'mitra', label: 'Mitra' },
                  { value: 'admin', label: 'Admin' },
                ]}
                value={filterRole}
                onChange={(v) => { setFilterRole(v); setPage(1) }}
                clearable
                size="sm"
                style={{ minWidth: 130 }}
              />
              {(search || filterRole) && (
                <Button variant="subtle" color="gray" size="sm" leftSection={<IconX size={14} />} onClick={() => { setSearch(''); setFilterRole(null); setPage(1) }}>
                  Reset
                </Button>
              )}
            </Group>
          </Paper>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-[#003087]/20 border-t-[#003087] rounded-full animate-spin" />
                <Text size="sm" c="dimmed">Memuat data...</Text>
              </div>
            </div>
          ) : (
            <>
              <Paper radius="lg" shadow="xs" withBorder>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">No</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort('name')}>
                          Nama <SortIcon col="name" />
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort('username')}>
                          Username / No. Telp <SortIcon col="username" />
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600 cursor-pointer select-none" onClick={() => handleSort('role')}>
                          Role <SortIcon col="role" />
                        </th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, idx) => (
                        <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-400">{(page - 1) * 20 + idx + 1}</td>
                          <td className="px-4 py-3 font-medium">{u.name}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {u.role === 'mitra' ? (u.phone ? `+62${u.phone}` : '-') : (u.username || '-')}
                          </td>
                          <td className="px-4 py-3">
                            <Badge size="sm" variant="light" color={ROLE_COLORS[u.role] || 'gray'} tt="capitalize">
                              {u.role}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Group gap={4} justify="flex-end" wrap="nowrap">
                              <Tooltip label="Edit">
                                <ActionIcon variant="subtle" color="yellow" onClick={() => openEdit({ id: u.id, name: u.name, username: u.username, phone: u.phone, role: u.role })}>
                                  <IconPencil size={16} />
                                </ActionIcon>
                              </Tooltip>
                              {u.role !== 'admin' && (
                                <Tooltip label="Hapus">
                                  <ActionIcon variant="subtle" color="red" onClick={() => setDeleteId(u.id)}>
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </Group>
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                            <IconUsers size={32} className="mx-auto mb-2 opacity-30" />
                            Tidak ada data user ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Paper>

              {totalPages > 1 && (
                <Group justify="center" mt="md" gap="xs">
                  <Button variant="default" size="xs" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</Button>
                  <Text size="sm" c="dimmed">Halaman {page} dari {totalPages}</Text>
                  <Button variant="default" size="xs" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
                </Group>
              )}
            </>
          )}
        </div>
      </main>

      {/* Create User Modal */}
      <Modal opened={showCreate} onClose={() => setShowCreate(false)} title="Tambah User Baru" radius="lg" centered>
        <Stack gap="md">
          <Select
            label="Role"
            data={[{ value: 'pegawai', label: 'Pegawai BPS' }, { value: 'mitra', label: 'Mitra BPS' }]}
            value={formRole}
            onChange={(v) => { setFormRole(v); setFormUsername(''); setFormPhone('') }}
            required
          />
          <TextInput label="Nama Lengkap" placeholder="Nama lengkap" value={formName} onChange={(e) => setFormName(e.currentTarget.value)} required />
          {formRole === 'mitra' ? (
            <TextInput
              label="Nomor Telepon"
              placeholder="812xxxxxxxx"
              value={formPhone}
              onChange={(e) => setFormPhone(e.currentTarget.value)}
              required
              leftSection={<Text size="sm" fw={600} c="dimmed" style={{ whiteSpace: 'nowrap', paddingLeft: 4 }}>+62</Text>}
              leftSectionWidth={48}
            />
          ) : (
            <TextInput label="Username" placeholder="Username untuk login" value={formUsername} onChange={(e) => setFormUsername(e.currentTarget.value)} required />
          )}
          <PasswordInput label="Password" placeholder="Minimal 6 karakter" value={formPassword} onChange={(e) => setFormPassword(e.currentTarget.value)} required />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => setShowCreate(false)}>Batal</Button>
            <Button onClick={handleCreate} loading={creating} style={{ backgroundColor: '#003087' }}>Simpan</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Edit User Modal */}
      <Modal opened={!!editUser} onClose={() => { setEditUser(null); resetForm() }} title="Edit User" radius="lg" centered>
        <Stack gap="md">
          <TextInput label="Nama Lengkap" placeholder="Nama lengkap" value={formName} onChange={(e) => setFormName(e.currentTarget.value)} />
          {editUser?.role === 'mitra' ? (
            <TextInput
              label="Nomor Telepon"
              placeholder="812xxxxxxxx"
              value={formPhone}
              onChange={(e) => setFormPhone(e.currentTarget.value)}
              leftSection={<Text size="sm" fw={600} c="dimmed" style={{ whiteSpace: 'nowrap', paddingLeft: 4 }}>+62</Text>}
              leftSectionWidth={48}
            />
          ) : (
            <TextInput label="Username" placeholder="Username" value={formUsername} onChange={(e) => setFormUsername(e.currentTarget.value)} />
          )}
          <PasswordInput label="Password Baru" placeholder="Kosongkan jika tidak diubah" value={formPassword} onChange={(e) => setFormPassword(e.currentTarget.value)} />
          {editUser?.role !== 'admin' && (
            <Select label="Role" data={[{ value: 'pegawai', label: 'Pegawai BPS' }, { value: 'mitra', label: 'Mitra BPS' }]} value={formRole} onChange={setFormRole} />
          )}
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => { setEditUser(null); resetForm() }}>Batal</Button>
            <Button onClick={handleUpdate} loading={updating} style={{ backgroundColor: '#003087' }}>Simpan</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal opened={!!deleteId} onClose={() => setDeleteId(null)} title="" size="sm" radius="lg" centered withCloseButton={false}>
        <Stack align="center" gap="md" py="md">
          <ThemeIcon size={56} radius="xl" variant="light" color="red">
            <IconTrash size={28} />
          </ThemeIcon>
          <div className="text-center">
            <Text size="lg" fw={700}>Hapus User?</Text>
            <Text size="sm" c="dimmed" mt="xs">Tindakan ini tidak dapat dibatalkan.</Text>
          </div>
          <Group gap="md" mt="sm">
            <Button variant="default" onClick={() => setDeleteId(null)} radius="lg" disabled={deleting}>Batal</Button>
            <Button color="red" onClick={handleDelete} loading={deleting} radius="lg" leftSection={<IconTrash size={16} />}>Hapus</Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  )
}
