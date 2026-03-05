'use client'

import { Paper, Text, Group } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { IconWorld } from '@tabler/icons-react'
import { StatsData } from '@/types/usaha'

interface CakupanPasarChartProps {
    stats: StatsData
}

export default function CakupanPasarChart({ stats }: CakupanPasarChartProps) {
    const total = stats.total || 1

    const data = [
        {
            name: 'Distribusi',
            Lokal: stats.lokal,
            Regional: stats.regional,
            Nasional: stats.nasional,
            Internasional: stats.internasional,
        },
    ]

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconWorld size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Cakupan Pasar</Text>
            </Group>

            {stats.total === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data</Text>
            ) : (
                <>
                    <BarChart
                        h={60}
                        data={data}
                        dataKey="name"
                        type="stacked"
                        orientation="horizontal"
                        series={[
                            { name: 'Lokal', color: '#0ea5e9' },
                            { name: 'Regional', color: '#f59e0b' },
                            { name: 'Nasional', color: '#10b981' },
                            { name: 'Internasional', color: '#8b5cf6' },
                        ]}
                        withLegend
                        legendProps={{ verticalAlign: 'bottom' }}
                        withTooltip
                        withXAxis={false}
                        withYAxis={false}
                        gridAxis="none"
                        barProps={{ radius: 4 }}
                    />
                    <div className="mt-4 space-y-2">
                        {[
                            { label: 'Lokal', value: stats.lokal, color: '#0ea5e9' },
                            { label: 'Regional', value: stats.regional, color: '#f59e0b' },
                            { label: 'Nasional', value: stats.nasional, color: '#10b981' },
                            { label: 'Internasional', value: stats.internasional, color: '#8b5cf6' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{item.label}</span>
                                    <span className="text-gray-500">{item.value} usaha</span>
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
