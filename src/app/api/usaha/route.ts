import { NextRequest, NextResponse } from 'next/server'
import { prisma, serialize } from '@/lib/prisma'
import { getAuthUser, unauthorized } from '@/lib/auth'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const kelas_usaha = searchParams.get('kelas_usaha')
    const cakupan_pasar = searchParams.get('cakupan_pasar')
    const kecamatan_nama = searchParams.get('kecamatan_nama')
    const kbli_kategori_kode = searchParams.get('kbli_kategori_kode')
    const status = searchParams.get('status')
    const created_by = searchParams.get('created_by')
    const sort_by = searchParams.get('sort_by') || 'created_at'
    const sort_dir = searchParams.get('sort_dir') || 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '10')

    const where: Prisma.UsahaWhereInput = { is_active: true }

    if (search) {
      where.OR = [
        { nama_usaha: { contains: search, mode: 'insensitive' } },
        { nama_pemilik: { contains: search, mode: 'insensitive' } },
        { kbli_kategori_nama: { contains: search, mode: 'insensitive' } },
        { kecamatan_nama: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (kelas_usaha) where.kelas_usaha = kelas_usaha
    if (cakupan_pasar) where.cakupan_pasar = cakupan_pasar
    if (kecamatan_nama) where.kecamatan_nama = kecamatan_nama
    if (kbli_kategori_kode) where.kbli_kategori_kode = kbli_kategori_kode
    if (status) where.status = status
    if (created_by) where.created_by = parseInt(created_by)

    const allowedSortFields = ['created_at', 'nama_usaha', 'nama_pemilik', 'kelas_usaha', 'status']
    const orderField = allowedSortFields.includes(sort_by) ? sort_by : 'created_at'
    const orderDir = sort_dir === 'asc' ? 'asc' : 'desc'

    const [total, data] = await Promise.all([
      prisma.usaha.count({ where }),
      prisma.usaha.findMany({
        where,
        include: {
          creator: { select: { id: true, name: true, username: true, role: true } },
          updater: { select: { id: true, name: true, username: true, role: true } },
        },
        orderBy: { [orderField]: orderDir },
        skip: (page - 1) * per_page,
        take: per_page,
      }),
    ])

    // Transform: hide platform_digital, expose platforms
    const transformed = data.map((u) => {
      const { platform_digital, ...rest } = u
      return {
        ...rest,
        platforms: (platform_digital as { platform: string; nama_akun: string }[]) || [],
      }
    })

    return NextResponse.json(serialize({
      data: transformed,
      current_page: page,
      last_page: Math.ceil(total / per_page) || 1,
      per_page,
      total,
    }))
  } catch (error) {
    console.error('Usaha index error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const body = await request.json()

    const { platforms, ...fields } = body

    const data: Prisma.UsahaCreateInput = {
      nama_pemilik: fields.nama_pemilik,
      nama_usaha: fields.nama_usaha,
      deskripsi_kegiatan: fields.deskripsi_kegiatan || null,
      kbli_kategori_kode: fields.kbli_kategori_kode || null,
      kbli_kategori_nama: fields.kbli_kategori_nama || null,
      kbli_golongan_pokok_kode: fields.kbli_golongan_pokok_kode || null,
      kbli_golongan_pokok_nama: fields.kbli_golongan_pokok_nama || null,
      kbli_golongan_kode: fields.kbli_golongan_kode || null,
      kbli_golongan_nama: fields.kbli_golongan_nama || null,
      kbli_subgolongan_kode: fields.kbli_subgolongan_kode || null,
      kbli_subgolongan_nama: fields.kbli_subgolongan_nama || null,
      kbli_kelompok_kode: fields.kbli_kelompok_kode || null,
      kbli_kelompok_nama: fields.kbli_kelompok_nama || null,
      provinsi_kode: fields.provinsi_kode || null,
      provinsi_nama: fields.provinsi_nama || null,
      kabkot_kode: fields.kabkot_kode || null,
      kabkot_nama: fields.kabkot_nama || null,
      kecamatan_kode: fields.kecamatan_kode || null,
      kecamatan_nama: fields.kecamatan_nama || null,
      desa_kode: fields.desa_kode || null,
      desa_nama: fields.desa_nama || null,
      sls_kode: fields.sls_kode || null,
      sls_nama: fields.sls_nama || null,
      sub_sls: fields.sub_sls || null,
      latitude: fields.latitude != null ? parseFloat(fields.latitude) : null,
      longitude: fields.longitude != null ? parseFloat(fields.longitude) : null,
      platform_digital: platforms || [],
      kelas_usaha: fields.kelas_usaha || null,
      cakupan_pasar: fields.cakupan_pasar || null,
      is_active: true,
      status: 'pending',
      creator: { connect: { id: user.id } },
    }

    const usaha = await prisma.usaha.create({
      data,
      include: {
        creator: { select: { id: true, name: true, username: true, role: true } },
      },
    })

    const { platform_digital, ...rest } = usaha

    return NextResponse.json(
      serialize({
        message: 'Usaha berhasil ditambahkan.',
        data: { ...rest, platforms: (platform_digital as { platform: string; nama_akun: string }[]) || [] },
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Usaha store error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
