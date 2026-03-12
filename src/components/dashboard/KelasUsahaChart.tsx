'use client'

import { Paper, Text, Group } from '@mantine/core'
import { IconShoppingBag } from '@tabler/icons-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { StatsData } from '@/types/usaha'

interface KelasUsahaChartProps {
    stats: StatsData
}

export default function KelasUsahaChart({ stats }: KelasUsahaChartProps) {
    const total = stats.total || 1

    const items = [
        { name: 'Mikro', value: stats.mikro },
        { name: 'Kecil', value: stats.kecil },
        { name: 'Menengah', value: stats.menengah },
        { name: 'Besar', value: stats.besar },
    ].filter(i => i.value > 0)
        .sort((a, b) => b.value - a.value)

    const getColor = (index: number) => {
        if (index === 0 && items.length > 0) return '#FFB81C' // Kuning untuk mayoritas
        // Biru gradasi: semakin kecil semakin muda
        const shades = ['#003087', '#336AB5', '#6694D0', '#99BEEB']
        return shades[index - 1] || shades[shades.length - 1]
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
                <div>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie
                                data={items}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={3}
                                dataKey="value"
                                strokeWidth={0}
                            >
                                {items.map((item, idx) => (
                                    <Cell key={item.name} fill={getColor(idx)} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number, name: string) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]}
                                contentStyle={{ borderRadius: 8, fontSize: 12 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        {items.map((item, idx) => (
                            <div key={item.name} className="flex items-center gap-1.5 text-xs">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getColor(idx) }} />
                                <span className="text-gray-600">{item.name}</span>
                                <span className="text-gray-400 font-medium">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}
