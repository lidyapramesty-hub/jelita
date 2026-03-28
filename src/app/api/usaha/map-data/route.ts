import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthUser, unauthorized } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const usaha = await prisma.usaha.findMany({
      where: {
        is_active: true,
        status: 'approved',
        latitude: { not: null },
        longitude: { not: null },
      },
      select: {
        id: true,
        nama_usaha: true,
        nama_pemilik: true,
        latitude: true,
        longitude: true,
        kbli_kategori_kode: true,
        kbli_kategori_nama: true,
        kelas_usaha: true,
        cakupan_pasar: true,
        kecamatan_nama: true,
      },
    })

    return NextResponse.json({ data: usaha })
  } catch (error) {
    console.error('Map data error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
