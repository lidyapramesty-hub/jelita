'use client'

import { Paper, Group, Text, ThemeIcon, SimpleGrid } from '@mantine/core'
import {
    IconBuildingStore,
    IconUsers,
    IconTrendingUp,
    IconWorld,
} from '@tabler/icons-react'
import { StatsData } from '@/types/usaha'

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
        const sorted = Object.entries(stats.byKategori).sort((a, b) => b[1] - a[1])
        const top = sorted[0]
        return top ? { name: top[0], count: top[1], pct: ((top[1] / (stats.total || 1)) * 100).toFixed(1) } : null
    })()

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
            label: 'Kelas Dominan',
            value: dominantKelas ? `${dominantKelas.count}` : '0',
            icon: <IconUsers size={22} />,
            bg: '#d97706',
            iconBg: 'rgba(217,119,6,0.1)',
            sub: dominantKelas ? `${dominantKelas.name.charAt(0).toUpperCase() + dominantKelas.name.slice(1)} (${dominantKelas.pct}%)` : '-',
        },
        {
            label: 'Pasar Nas/Intl',
            value: (stats.nasional + stats.internasional).toString(),
            icon: <IconTrendingUp size={22} />,
            bg: '#059669',
            iconBg: 'rgba(5,150,105,0.1)',
            sub: `${stats.nasional} nasional, ${stats.internasional} internasional`,
        },
        {
            label: 'KBLI Dominan',
            value: dominantKBLI ? `${dominantKBLI.count}` : '0',
            icon: <IconWorld size={22} />,
            bg: '#7c3aed',
            iconBg: 'rgba(124,58,237,0.1)',
            sub: dominantKBLI ? `${dominantKBLI.name.length > 30 ? dominantKBLI.name.slice(0, 30) + '...' : dominantKBLI.name} (${dominantKBLI.pct}%)` : '-',
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
