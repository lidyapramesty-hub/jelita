'use client'

import { Paper, Text, Group } from '@mantine/core'
import { IconMapPin } from '@tabler/icons-react'
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LabelList,
} from 'recharts'

interface KecamatanBarChartProps {
    byKecamatan: Record<string, number>
}

export default function KecamatanBarChart({ byKecamatan }: KecamatanBarChartProps) {
    const sortedEntries = Object.entries(byKecamatan).sort((a, b) => b[1] - a[1])

    const data = sortedEntries.map(([name, count]) => ({
        kecamatan: name,
        value: count,
    }))

    const maxVal = data.length > 0 ? Math.max(...data.map(d => d.value)) : 0
    const minVal = data.length > 0 ? Math.min(...data.map(d => d.value)) : 0

    const getColor = (value: number) => {
        if (value === maxVal && maxVal > 0) return '#FFB81C' // yellow for max
        if (maxVal === minVal) return '#003087'
        // Gradient: darker blue for higher values, lighter for lower
        const ratio = (value - minVal) / (maxVal - minVal)
        // Interpolate between light blue (#8bbceb) and dark blue (#003087)
        const r = Math.round(139 + (0 - 139) * ratio)
        const g = Math.round(188 + (48 - 188) * ratio)
        const b = Math.round(235 + (135 - 235) * ratio)
        return `rgb(${r}, ${g}, ${b})`
    }

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconMapPin size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Jumlah Usaha Menurut Kecamatan</Text>
            </Group>
            {data.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data</Text>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={data} margin={{ top: 20, right: 10, bottom: 5, left: -10 }}>
                        <XAxis
                            dataKey="kecamatan"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#868e96', fontSize: 12 }}
                            interval={0}
                            angle={-35}
                            textAnchor="end"
                            height={60}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13 }}
                            formatter={(value: number) => [`${value}`, 'Jumlah Usaha']}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            <LabelList dataKey="value" position="top" style={{ fill: '#374151', fontSize: 12, fontWeight: 600 }} />
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                            ))}
                        </Bar>
                    </RechartsBarChart>
                </ResponsiveContainer>
            )}
        </Paper>
    )
}
