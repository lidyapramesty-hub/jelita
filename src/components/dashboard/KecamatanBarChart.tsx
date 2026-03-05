'use client'

import { Paper, Text, Group } from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { IconMapPin } from '@tabler/icons-react'

interface KecamatanBarChartProps {
    byKecamatan: Record<string, number>
}

export default function KecamatanBarChart({ byKecamatan }: KecamatanBarChartProps) {
    const sortedEntries = Object.entries(byKecamatan)
        .sort((a, b) => b[1] - a[1])

    const data = sortedEntries.map(([name, count]) => ({
        kecamatan: name,
        'Jumlah Usaha': count,
    }))

    return (
        <Paper radius="lg" p="lg" shadow="xs" withBorder>
            <Group gap="xs" mb="md">
                <IconMapPin size={17} className="text-[#003087]" />
                <Text fw={700} size="sm">Jumlah Usaha per Kecamatan</Text>
            </Group>

            {data.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="xl">Belum ada data</Text>
            ) : (
                <BarChart
                    h={300}
                    data={data}
                    dataKey="kecamatan"
                    series={[{ name: 'Jumlah Usaha', color: '#003087' }]}
                    withTooltip
                    withBarValueLabel
                    barProps={{ radius: 4 }}
                    gridAxis="y"
                />
            )}
        </Paper>
    )
}
