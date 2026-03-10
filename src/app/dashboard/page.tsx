'use client'

import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import StatCards from '@/components/dashboard/StatCards'
import KelasUsahaChart from '@/components/dashboard/KelasUsahaChart'
import CakupanPasarChart from '@/components/dashboard/CakupanPasarChart'
import KecamatanBarChart from '@/components/dashboard/KecamatanBarChart'
import KategoriKBLIChart from '@/components/dashboard/KategoriKBLIChart'
import { useGetUsahaStatsQuery, useGetUsahaListQuery } from '@/store/services/usahaApi'
import { Button, Title, Text, Stack } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'

const DashboardMap = dynamic(() => import('@/components/dashboard/DashboardMap'), { ssr: false })

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useGetUsahaStatsQuery()
  const { data: usahaData, isLoading: usahaLoading, refetch: refetchUsaha } = useGetUsahaListQuery()

  const loading = statsLoading || usahaLoading

  const handleRefresh = () => {
    refetchStats()
    refetchUsaha()
  }

  const defaultStats = {
    total: 0,
    mikro: 0,
    kecil: 0,
    menengah: 0,
    besar: 0,
    lokal: 0,
    regional: 0,
    nasional: 0,
    internasional: 0,
    byKecamatan: {} as Record<string, number>,
    byKategori: {} as Record<string, number>,
    recentCount: 0,
  }

  const currentStats = stats || defaultStats
  const usahaList = usahaData?.data || []

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="lg:ml-64 pt-14 lg:pt-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <Title order={3} style={{ fontFamily: 'DM Sans' }}>Dashboard</Title>
              <Text size="sm" c="dimmed" mt={2}>Statistik Ekonomi Digital Kabupaten Tabanan</Text>
            </div>
            <Button
              variant="default"
              size="sm"
              leftSection={<IconRefresh size={15} className={loading ? 'animate-spin' : ''} />}
              onClick={handleRefresh}
            >
              Perbarui
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-[#003087]/20 border-t-[#003087] rounded-full animate-spin" />
                <Text size="sm" c="dimmed">Memuat data...</Text>
              </div>
            </div>
          ) : (
            <Stack gap="lg">
              {/* Stat Cards */}
              <StatCards stats={currentStats} />

              {/* Map */}
              <DashboardMap usahaList={usahaList} />

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <KelasUsahaChart stats={currentStats} />
                <CakupanPasarChart stats={currentStats} />
                <KecamatanBarChart byKecamatan={currentStats.byKecamatan} />
              </div>

              {/* KBLI Distribution */}
              <KategoriKBLIChart byKategori={currentStats.byKategori} total={currentStats.total} />
            </Stack>
          )}
        </div>
      </main>
    </div>
  )
}
