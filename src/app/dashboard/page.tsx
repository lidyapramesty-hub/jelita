'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import StatCards from '@/components/dashboard/StatCards'
import KelasUsahaChart from '@/components/dashboard/KelasUsahaChart'
import CakupanPasarChart from '@/components/dashboard/CakupanPasarChart'
import KecamatanBarChart from '@/components/dashboard/KecamatanBarChart'
import KategoriKBLIChart from '@/components/dashboard/KategoriKBLIChart'
import { staticUsahaData, computeStats } from '@/data/staticUsaha'
import { Button, Group, Title, Text, Stack } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'

const DashboardMap = dynamic(() => import('@/components/dashboard/DashboardMap'), { ssr: false })

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>('pencacah01@bps.go.id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const email = localStorage.getItem('user_email') || 'pencacah01@bps.go.id'
    setUserEmail(email)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const stats = useMemo(() => computeStats(staticUsahaData), [])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar userEmail={userEmail} />

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
              <StatCards stats={stats} />

              {/* Map */}
              <DashboardMap usahaList={staticUsahaData} />

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <KelasUsahaChart stats={stats} />
                <CakupanPasarChart stats={stats} />
                <KecamatanBarChart byKecamatan={stats.byKecamatan} />
              </div>

              {/* KBLI Distribution */}
              <KategoriKBLIChart byKategori={stats.byKategori} total={stats.total} />
            </Stack>
          )}
        </div>
      </main>
    </div>
  )
}
