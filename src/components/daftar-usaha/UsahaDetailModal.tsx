'use client'

import { Modal, Text, Badge, Group, Stack, Paper, Divider, Anchor } from '@mantine/core'
import { IconTag, IconMapPin, IconDeviceMobile, IconExternalLink, IconCalendar, IconUser, IconPencil } from '@tabler/icons-react'
import { Usaha } from '@/types/usaha'
import { getKbliPathByKelompokKode } from '@/data/kbli2025'

interface UsahaDetailModalProps {
    usaha: Usaha | null
    onClose: () => void
}

const BADGE_KELAS: Record<string, string> = {
    mikro: 'blue',
    kecil: 'yellow',
    menengah: 'green',
    besar: 'teal',
}

const BADGE_PASAR: Record<string, string> = {
    lokal: 'gray',
    regional: 'orange',
    nasional: 'green',
    internasional: 'violet',
}

export default function UsahaDetailModal({ usaha, onClose }: UsahaDetailModalProps) {
    const formatDate = (d: string) => {
        return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    return (
        <Modal
            opened={!!usaha}
            onClose={onClose}
            title="Detail Usaha"
            size="lg"
            radius="lg"
            centered
            styles={{
                title: { fontWeight: 700, fontFamily: 'DM Sans' },
            }}
        >
            {usaha && (
                <Stack gap="md">
                    {/* Header card */}
                    <Paper p="md" radius="md" bg="blue.0" withBorder style={{ borderColor: 'var(--mantine-color-blue-2)' }}>
                        <Text size="xl" fw={700} c="blue.9">{usaha.nama_usaha}</Text>
                        <Text size="sm" c="dimmed" mt={4}>{usaha.nama_pemilik}</Text>
                        <Group mt="sm" gap="xs">
                            {usaha.kelas_usaha && (
                                <Badge variant="light" color={BADGE_KELAS[usaha.kelas_usaha] || 'gray'} tt="capitalize">
                                    {usaha.kelas_usaha}
                                </Badge>
                            )}
                            {usaha.cakupan_pasar && (
                                <Badge variant="light" color={BADGE_PASAR[usaha.cakupan_pasar] || 'gray'} tt="capitalize">
                                    {usaha.cakupan_pasar}
                                </Badge>
                            )}
                        </Group>
                    </Paper>

                    {/* KBLI */}
                    <Paper p="md" radius="md" bg="gray.0">
                        <Group gap="xs" mb="xs">
                            <IconTag size={16} className="text-gray-400" />
                            <Text size="xs" fw={600} c="dimmed" tt="uppercase">KBLI</Text>
                        </Group>
                        <Text size="sm" fw={700}>{usaha.kbli_kelompok_kode || '—'}</Text>
                        <Text size="sm" c="dimmed">{usaha.kbli_kelompok_kode ? (getKbliPathByKelompokKode(usaha.kbli_kelompok_kode)?.kelompok.nama || '—') : '—'}</Text>
                    </Paper>

                    {/* Lokasi */}
                    <Paper p="md" radius="md" bg="gray.0">
                        <Group gap="xs" mb="xs">
                            <IconMapPin size={16} className="text-gray-400" />
                            <Text size="xs" fw={600} c="dimmed" tt="uppercase">Lokasi</Text>
                        </Group>
                        <Text size="sm">
                            {[usaha.sub_sls, usaha.sls_nama, usaha.desa_nama, usaha.kecamatan_nama, 'Tabanan', 'Bali']
                                .filter(Boolean)
                                .join(', ') || '—'}
                        </Text>
                        {usaha.latitude && usaha.longitude && (
                            <Anchor
                                href={`https://maps.google.com/?q=${usaha.latitude},${usaha.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="xs"
                                mt="xs"
                                className="flex items-center gap-1"
                            >
                                <IconExternalLink size={11} /> Lihat di Google Maps
                            </Anchor>
                        )}
                    </Paper>

                    {/* Platform */}
                    {usaha.platforms?.length > 0 && (
                        <Paper p="md" radius="md" bg="gray.0">
                            <Group gap="xs" mb="xs">
                                <IconDeviceMobile size={16} className="text-gray-400" />
                                <Text size="xs" fw={600} c="dimmed" tt="uppercase">Platform Digital</Text>
                            </Group>
                            <Stack gap="xs">
                                {usaha.platforms.map((p, i) => (
                                    <Group key={i} gap="xs">
                                        <Badge size="sm" variant="light" color="blue">{p.platform}</Badge>
                                        <Text size="sm" c="dimmed">{p.nama_akun}</Text>
                                    </Group>
                                ))}
                            </Stack>
                        </Paper>
                    )}

                    <Divider />

                    {/* Metadata */}
                    <Stack gap={6}>
                        {/* Created info */}
                        <Group justify="space-between">
                            <Group gap="xs">
                                <IconCalendar size={14} className="text-gray-400" />
                                <Text size="xs" c="dimmed">Ditambahkan: {formatDate(usaha.created_at)}</Text>
                            </Group>
                            {usaha.creator && (
                                <Group gap="xs">
                                    <IconUser size={14} className="text-gray-400" />
                                    <Text size="xs" c="dimmed">Pelapor: {usaha.creator.name} ({usaha.creator.role})</Text>
                                </Group>
                            )}
                        </Group>

                        {/* Updated info */}
                        {usaha.updated_at && usaha.updater && (
                            <Group justify="space-between">
                                <Group gap="xs">
                                    <IconPencil size={14} className="text-orange-400" />
                                    <Text size="xs" c="orange.7">Diedit: {formatDate(usaha.updated_at)}</Text>
                                </Group>
                                <Group gap="xs">
                                    <IconUser size={14} className="text-orange-400" />
                                    <Text size="xs" c="orange.7">Editor: {usaha.updater.name} ({usaha.updater.role})</Text>
                                </Group>
                            </Group>
                        )}
                    </Stack>
                </Stack>
            )}
        </Modal>
    )
}
