'use client'

import { Paper, Text, Group } from '@mantine/core'
import { IconChartBar } from '@tabler/icons-react'
import { kbliKategori } from '@/data/kbli2025'

interface KategoriKBLIChartProps {
    byKategori: Record<string, number>
    total: number
}

const kategoriNamaMap: Record<string, string> = Object.fromEntries(
    kbliKategori.map(k => [k.kode, k.nama])
)

export default function KategoriKBLIChart({ byKategori, total }: KategoriKBLIChartProps) {
    const sorted = Object.entries(byKategori)
        .map(([kode, count]) => [
            kategoriNamaMap[kode] ? `${kode} — ${kategoriNamaMap[kode]}` : kode,
            count,
        ] as [string, number])
        .sort((a, b) => b[1] - a[1])
    const denominator = total || 1
    const maxVal = sorted.length > 0 ? sorted[0][1] : 0
    const minVal = sorted.length > 0 ? sorted[sorted.length - 1][1] : 0

    const getColor = (count: number) => {
        if (count === maxVal && maxVal > 0) return '#FFB81C'
        if (maxVal === minVal) return '#003087'
        const ratio = (count - minVal) / (maxVal - minVal)
        const r = Math.round(139 + (0 - 139) * ratio)
        const g = Math.round(188 + (48 - 188) * ratio)
        const b = Math.round(235 + (135 - 235) * ratio)
        return `rgb(${r}, ${g}, ${b})`
    }

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconChartBar size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Distribusi Usaha Menurut KBLI</Text>
            </Group>
            {sorted.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data usaha terdaftar</Text>
            ) : (
                <div className="mt-4 space-y-2">
                    {sorted.map(([kat, count]) => (
                        <div key={kat}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-gray-700 truncate mr-2" title={kat}>{kat}</span>
                                <span className="text-gray-500 whitespace-nowrap">{count} ({((count / denominator) * 100).toFixed(1)}%)</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(count / denominator) * 100}%`, backgroundColor: getColor(count) }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Paper>
    )
}
