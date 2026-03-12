'use client'

import { Paper, Text, Group } from '@mantine/core'
import { IconDeviceMobile } from '@tabler/icons-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface PlatformChartProps {
    byPlatform: Record<string, number>
    total: number
}

export default function PlatformChart({ byPlatform, total }: PlatformChartProps) {
    const sorted = Object.entries(byPlatform)
        .sort((a, b) => b[1] - a[1])
        .map(([platform, count]) => ({ platform, count }))

    const maxVal = sorted.length > 0 ? sorted[0].count : 0
    const minVal = sorted.length > 0 ? sorted[sorted.length - 1].count : 0

    const getColor = (count: number) => {
        if (count === maxVal && maxVal > 0) return '#FFB81C'
        if (maxVal === minVal) return '#003087'
        const ratio = (count - minVal) / (maxVal - minVal)
        const r = Math.round(139 + (0 - 139) * ratio)
        const g = Math.round(188 + (48 - 188) * ratio)
        const b = Math.round(235 + (135 - 235) * ratio)
        return `rgb(${r}, ${g}, ${b})`
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload?.length) {
            const { platform, count } = payload[0].payload
            const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0'
            return (
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-xs">
                    <p className="font-semibold text-gray-700">{platform}</p>
                    <p className="text-gray-500">{count} usaha ({pct}%)</p>
                </div>
            )
        }
        return null
    }

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconDeviceMobile size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Jumlah Usaha Menurut Platform</Text>
            </Group>
            {sorted.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data platform terdaftar</Text>
            ) : (
                <ResponsiveContainer width="100%" height={sorted.length * 28 + 20}>
                    <BarChart
                        data={sorted}
                        layout="vertical"
                        margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
                        barSize={12}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="platform"
                            width={110}
                            tick={{ fontSize: 11, fill: '#374151' }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {sorted.map((entry) => (
                                <Cell key={entry.platform} fill={getColor(entry.count)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </Paper>
    )
}
