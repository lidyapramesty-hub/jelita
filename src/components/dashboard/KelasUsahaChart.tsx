'use client'

import { Paper, Text, Group } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { IconShoppingBag } from '@tabler/icons-react'
import { StatsData } from '@/types/usaha'

interface KelasUsahaChartProps {
    stats: StatsData
}

export default function KelasUsahaChart({ stats }: KelasUsahaChartProps) {
    const data = [
        {
            name: 'Distribusi',
            Mikro: stats.mikro,
            Kecil: stats.kecil,
            Menengah: stats.menengah,
            Besar: stats.besar,
        },
    ]

    const total = stats.total || 1

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconShoppingBag size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Distribusi Kelas Usaha</Text>
            </Group>

            {stats.total === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data</Text>
            ) : (
                <>
                    <div className="mt-4 space-y-2">
                        {[
                            { label: 'Mikro', value: stats.mikro, color: '#003087' },
                            { label: 'Kecil', value: stats.kecil, color: '#FFB81C' },
                            { label: 'Menengah', value: stats.menengah, color: '#C8102E' },
                            { label: 'Besar', value: stats.besar, color: '#059669' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{item.label}</span>
                                    <span className="text-gray-500">{item.value} ({((item.value / total) * 100).toFixed(1)}%)</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${(item.value / total) * 100}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Paper>
    )
}
