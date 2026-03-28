import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, unauthorized } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const usahaList = await prisma.usaha.findMany({
      where: { is_active: true, status: 'approved' },
    })

    const total = usahaList.length

    const byKelas = {
      mikro: usahaList.filter((u) => u.kelas_usaha === 'mikro').length,
      kecil: usahaList.filter((u) => u.kelas_usaha === 'kecil').length,
      menengah: usahaList.filter((u) => u.kelas_usaha === 'menengah').length,
      besar: usahaList.filter((u) => u.kelas_usaha === 'besar').length,
    }

    const byPasar = {
      lokal: usahaList.filter((u) => u.cakupan_pasar === 'lokal').length,
      regional: usahaList.filter((u) => u.cakupan_pasar === 'regional').length,
      nasional: usahaList.filter((u) => u.cakupan_pasar === 'nasional').length,
      internasional: usahaList.filter((u) => u.cakupan_pasar === 'internasional').length,
    }

    const byKecamatan: Record<string, number> = {}
    usahaList.forEach((u) => {
      if (u.kecamatan_nama) {
        byKecamatan[u.kecamatan_nama] = (byKecamatan[u.kecamatan_nama] || 0) + 1
      }
    })

    const byKategori: Record<string, number> = {}
    usahaList.forEach((u) => {
      if (u.kbli_kategori_kode) {
        byKategori[u.kbli_kategori_kode] = (byKategori[u.kbli_kategori_kode] || 0) + 1
      }
    })

    const byPlatform: Record<string, number> = {}
    usahaList.forEach((u) => {
      let platforms = u.platform_digital as { platform: string; nama_akun: string }[]
      if (typeof platforms === 'string') {
        try { platforms = JSON.parse(platforms) } catch { platforms = [] }
      }
      if (Array.isArray(platforms)) {
        platforms.forEach((p) => {
          if (p?.platform) {
            byPlatform[p.platform] = (byPlatform[p.platform] || 0) + 1
          }
        })
      }
    })

    // Sort byPlatform descending
    const sortedByPlatform = Object.fromEntries(
      Object.entries(byPlatform).sort(([, a], [, b]) => b - a)
    )

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentCount = usahaList.filter((u) => u.created_at && u.created_at >= thirtyDaysAgo).length

    return NextResponse.json({
      total,
      mikro: byKelas.mikro,
      kecil: byKelas.kecil,
      menengah: byKelas.menengah,
      besar: byKelas.besar,
      lokal: byPasar.lokal,
      regional: byPasar.regional,
      nasional: byPasar.nasional,
      internasional: byPasar.internasional,
      byKecamatan,
      byKategori,
      byPlatform: sortedByPlatform,
      recentCount,
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
