'use client'

import { Paper, Group, Text, ThemeIcon, SimpleGrid } from '@mantine/core'
import {
    IconBuildingStore,
    IconUsers,
    IconTrendingUp,
    IconWorld,
} from '@tabler/icons-react'
import { StatsData } from '@/types/usaha'
import { kbliKategori } from '@/data/kbli2025'

interface StatCardsProps {
    stats: StatsData
}

export default function StatCards({ stats }: StatCardsProps) {
    const dominantKelas = (() => {
        const counts = { mikro: stats.mikro, kecil: stats.kecil, menengah: stats.menengah, besar: stats.besar }
        const max = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
        return max ? { name: max[0], count: max[1], pct: ((max[1] / (stats.total || 1)) * 100).toFixed(1) } : null
    })()

    const dominantKBLI = (() => {
        const kategoriMap: Record<string, string> = Object.fromEntries(kbliKategori.map(k => [k.kode, k.nama]))
        const sorted = Object.entries(stats.byKategori).sort((a, b) => b[1] - a[1])
        const top = sorted[0]
        return top ? { name: kategoriMap[top[0]] ? `${top[0]} — ${kategoriMap[top[0]]}` : top[0], count: top[1], pct: ((top[1] / (stats.total || 1)) * 100).toFixed(1) } : null
    })()

    const dominantCakupan = (() => {
        const counts = { lokal: stats.lokal, regional: stats.regional, nasional: stats.nasional, internasional: stats.internasional }
        const max = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
        return max ? { name: max[0], count: max[1], pct: ((max[1] / (stats.total || 1)) * 100).toFixed(1) } : null
    })()

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

    const cards = [
        {
            label: 'Total Usaha',
            value: stats.total.toString(),
            icon: <IconBuildingStore size={22} />,
            bg: '#003087',
            iconBg: 'rgba(0,48,135,0.1)',
            sub: `+${stats.recentCount} bulan ini`,
        },
        {
            label: dominantKelas ? `Usaha ${capitalize(dominantKelas.name)}` : 'Skala Dominan',
            value: dominantKelas ? `${dominantKelas.count}` : '0',
            icon: <IconUsers size={22} />,
            bg: '#d97706',
            iconBg: 'rgba(217,119,6,0.1)',
            sub: dominantKelas ? `${dominantKelas.pct}% dari total usaha` : '-',
        },
        {
            label: dominantCakupan ? `Usaha ${capitalize(dominantCakupan.name)}` : 'Cakupan Pasar',
            value: dominantCakupan ? `${dominantCakupan.count}` : '0',
            icon: <IconTrendingUp size={22} />,
            bg: '#059669',
            iconBg: 'rgba(5,150,105,0.1)',
            sub: dominantCakupan ? `${dominantCakupan.pct}% dari total usaha` : '-',
        },
        {
            label: dominantKBLI ? `Usaha ${dominantKBLI.name.length > 25 ? dominantKBLI.name.slice(0, 25) + '...' : dominantKBLI.name}` : 'KBLI Dominan',
            value: dominantKBLI ? `${dominantKBLI.count}` : '0',
            icon: <IconWorld size={22} />,
            bg: '#7c3aed',
            iconBg: 'rgba(124,58,237,0.1)',
            sub: dominantKBLI ? `${dominantKBLI.pct}% dari total usaha` : '-',
        },
    ]

    return (
        <SimpleGrid cols={{ base: 2, lg: 4 }} spacing="md">
            {cards.map((card) => (
                <Paper key={card.label} radius="lg" p="lg" shadow="xs" withBorder className="hover:shadow-md transition-shadow">
                    <Group gap="md" wrap="nowrap">
                        <ThemeIcon
                            size={44}
                            radius="lg"
                            variant="light"
                            style={{ backgroundColor: card.iconBg, color: card.bg }}
                        >
                            {card.icon}
                        </ThemeIcon>
                        <div>
                            <Text size="xl" fw={700} lh={1.2}>{card.value}</Text>
                            <Text size="sm" fw={500} c="dimmed">{card.label}</Text>
                            <Text size="xs" c="dimmed">{card.sub}</Text>
                        </div>
                    </Group>
                </Paper>
            ))}
        </SimpleGrid>
    )
}
