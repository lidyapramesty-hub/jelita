'use client'

import { Paper, Text, Group } from '@mantine/core'
import { IconShoppingBag } from '@tabler/icons-react'
import { StatsData } from '@/types/usaha'

interface KelasUsahaChartProps {
    stats: StatsData
}

export default function KelasUsahaChart({ stats }: KelasUsahaChartProps) {
    const total = stats.total || 1

    const items = [
        { label: 'Mikro', value: stats.mikro },
        { label: 'Kecil', value: stats.kecil },
        { label: 'Menengah', value: stats.menengah },
        { label: 'Besar', value: stats.besar },
    ]

    const maxVal = Math.max(...items.map(i => i.value))
    // Sort desc to assign gradient: darkest blue for highest, lightest for lowest
    const sorted = [...items].sort((a, b) => b.value - a.value)
    const blueShades = ['#003087', '#1a5fad', '#4a8fd4', '#8bbceb']

    const getColor = (item: typeof items[0]) => {
        if (item.value === maxVal && maxVal > 0) return '#FFB81C' // yellow for max
        const rank = sorted.findIndex(s => s.label === item.label)
        // Skip rank 0 (that's max/yellow), assign blues to the rest
        const blueRank = rank > 0 ? rank - 1 : 0
        return blueShades[Math.min(blueRank, blueShades.length - 1)]
    }

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconShoppingBag size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Distribusi Usaha Menurut Skala</Text>
            </Group>
            {stats.total === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data</Text>
            ) : (
                <div className="mt-4 space-y-2">
                    {items.map((item) => (
                        <div key={item.label}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700">{item.label}</span>
                                <span className="text-gray-500">{item.value} ({((item.value / total) * 100).toFixed(1)}%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(item.value / total) * 100}%`, backgroundColor: getColor(item) }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Paper>
    )
}
