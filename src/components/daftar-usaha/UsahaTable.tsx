'use client'

import { useMemo, useState } from 'react'
import { DataTable, type DataTableSortStatus } from 'mantine-datatable'
import { Badge, Text, Group, ActionIcon, Tooltip } from '@mantine/core'
import { IconEye, IconExternalLink, IconTrash, IconPencil, IconShieldCheck } from '@tabler/icons-react'
import { Usaha } from '@/types/usaha'
import { kbliKategori } from '@/data/kbli2025'

const kategoriNamaMap: Record<string, string> = Object.fromEntries(kbliKategori.map(k => [k.kode, k.nama]))

interface UsahaTableProps {
    data: Usaha[]
    onView: (usaha: Usaha) => void
    onEdit: (usaha: Usaha) => void
    onDelete: (id: string) => void
    onVerifyRequest?: (usaha: Usaha) => void
    isAdmin?: boolean
}

const BADGE_KELAS: Record<string, { color: string }> = {
    mikro: { color: 'blue' },
    kecil: { color: 'yellow' },
    menengah: { color: 'green' },
    besar: { color: 'teal' },
}

const BADGE_PASAR: Record<string, { color: string }> = {
    lokal: { color: 'gray' },
    regional: { color: 'orange' },
    nasional: { color: 'green' },
    internasional: { color: 'violet' },
}

const BADGE_STATUS: Record<string, { color: string; label: string }> = {
    pending: { color: 'yellow', label: 'Pending' },
    approved: { color: 'green', label: 'Disetujui' },
    declined: { color: 'red', label: 'Ditolak' },
}

export default function UsahaTable({ data, onView, onEdit, onDelete, onVerifyRequest, isAdmin }: UsahaTableProps) {
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Usaha>>({
        columnAccessor: 'nama_usaha',
        direction: 'asc',
    })

    const sortedData = useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            const accessor = sortStatus.columnAccessor as keyof Usaha
            const aVal = a[accessor] ?? ''
            const bVal = b[accessor] ?? ''
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortStatus.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal)
            }
            return 0
        })
        return sorted
    }, [data, sortStatus])

    return (
        <DataTable
            withTableBorder
            borderRadius="lg"
            shadow="xs"
            striped
            highlightOnHover
            records={sortedData}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            minHeight={200}
            noRecordsText="Tidak ada data yang ditemukan"
            columns={[
                {
                    accessor: 'index',
                    title: 'No',
                    textAlign: 'center',
                    width: 50,
                    render: (_record, index) => <Text size="sm" c="dimmed">{index + 1}</Text>,
                },
                {
                    accessor: 'nama_usaha',
                    title: 'Nama Usaha',
                    sortable: true,
                    render: (record) => (
                        <div>
                            <Text size="sm" fw={600}>{record.nama_usaha}</Text>
                            <Text size="xs" c="dimmed">{record.nama_pemilik}</Text>
                        </div>
                    ),
                },
                {
                    accessor: 'kbli_kategori_kode',
                    title: 'Kategori',
                    sortable: true,
                    render: (record) => (
                        <div>
                            <Text size="xs" fw={500}>{record.kbli_kelompok_kode || '—'}</Text>
                            <Text size="xs" c="dimmed" lineClamp={1} style={{ maxWidth: 180 }}>
                                {record.kbli_kategori_kode
                                    ? `${record.kbli_kategori_kode} — ${kategoriNamaMap[record.kbli_kategori_kode] || ''}`
                                    : '—'}
                            </Text>
                        </div>
                    ),
                },
                {
                    accessor: 'kelas_usaha',
                    title: 'Skala',
                    sortable: true,
                    textAlign: 'center',
                    render: (record) => (
                        <Badge size="sm" variant="light" color={BADGE_KELAS[record.kelas_usaha]?.color || 'gray'} tt="capitalize">
                            {record.kelas_usaha || '—'}
                        </Badge>
                    ),
                },
                {
                    accessor: 'cakupan_pasar',
                    title: 'Pasar',
                    sortable: true,
                    textAlign: 'center',
                    render: (record) => (
                        <Badge size="sm" variant="light" color={BADGE_PASAR[record.cakupan_pasar]?.color || 'gray'} tt="capitalize">
                            {record.cakupan_pasar || '—'}
                        </Badge>
                    ),
                },
                {
                    accessor: 'kecamatan_nama',
                    title: 'Kecamatan',
                    sortable: true,
                    render: (record) => <Text size="xs">{record.kecamatan_nama || '—'}</Text>,
                },
                {
                    accessor: 'status',
                    title: 'Status',
                    sortable: true,
                    textAlign: 'center',
                    render: (record) => {
                        const s = BADGE_STATUS[record.status] || { color: 'gray', label: record.status }
                        return <Badge size="sm" variant="light" color={s.color}>{s.label}</Badge>
                    },
                },
                {
                    accessor: 'actions',
                    title: 'Aksi',
                    textAlign: 'right',
                    width: isAdmin ? 170 : 130,
                    render: (record) => (
                        <Group gap={4} justify="flex-end" wrap="nowrap">
                            <Tooltip label="Lihat Detail">
                                <ActionIcon variant="subtle" color="blue" onClick={(e) => { e.stopPropagation(); onView(record) }}>
                                    <IconEye size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit">
                                <ActionIcon variant="subtle" color="yellow" onClick={(e) => { e.stopPropagation(); onEdit(record) }}>
                                    <IconPencil size={16} />
                                </ActionIcon>
                            </Tooltip>
                            {record.latitude && record.longitude && (
                                <Tooltip label="Buka di Maps">
                                    <ActionIcon
                                        variant="subtle"
                                        color="green"
                                        component="a"
                                        href={`https://maps.google.com/?q=${record.latitude},${record.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                    >
                                        <IconExternalLink size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            {isAdmin && onVerifyRequest && (
                                <Tooltip label="Verifikasi">
                                    <ActionIcon variant="subtle" color="violet" onClick={(e) => { e.stopPropagation(); onVerifyRequest(record) }}>
                                        <IconShieldCheck size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            {isAdmin && (
                                <Tooltip label="Hapus">
                                    <ActionIcon variant="subtle" color="red" onClick={(e) => { e.stopPropagation(); onDelete(record.id) }}>
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </Group>
                    ),
                },
            ]}
            onRowClick={({ record }) => onView(record)}
            rowStyle={() => ({ cursor: 'pointer' })}
        />
    )
}
