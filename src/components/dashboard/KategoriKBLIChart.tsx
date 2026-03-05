'use client'

import { Paper, Text, Group, SimpleGrid, Badge } from '@mantine/core'
import { IconChartBar } from '@tabler/icons-react'

interface KategoriKBLIChartProps {
    byKategori: Record<string, number>
    total: number
}

export default function KategoriKBLIChart({ byKategori, total }: KategoriKBLIChartProps) {
    const sorted = Object.entries(byKategori)
        .sort((a, b) => b[1] - a[1])

    const maxCount = sorted[0]?.[1] || 1

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconChartBar size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Distribusi Kategori KBLI</Text>
            </Group>

            {sorted.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data usaha terdaftar</Text>
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                    {sorted.map(([kat, count]) => (
                        <div key={kat} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <Text size="xs" fw={600} c="dimmed" tt="uppercase" lineClamp={1} mb="xs">{kat}</Text>
                            <div className="flex items-end gap-3">
                                <Text size="xl" fw={700} c="#003087">{count}</Text>
                                <div className="flex-1 mb-1">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#FFB81C] rounded-full"
                                            style={{ width: `${(count / maxCount) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Text size="xs" c="dimmed" mt={4}>{((count / (total || 1)) * 100).toFixed(1)}% dari total</Text>
                        </div>
                    ))}
                </SimpleGrid>
            )}
        </Paper>
    )
}
