import { NextRequest, NextResponse } from 'next/server'
import { prisma, serialize } from '@/lib/prisma'
import { getAuthUser, unauthorized } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const existing = await prisma.usaha.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ message: 'Usaha tidak ditemukan.' }, { status: 404 })
    }

    const body = await request.json()
    const { status } = body

    if (!['pending', 'approved', 'declined'].includes(status)) {
      return NextResponse.json(
        { message: 'Status harus salah satu dari: pending, approved, declined.' },
        { status: 422 }
      )
    }

    const usaha = await prisma.usaha.update({
      where: { id: params.id },
      data: { status },
    })

    const { platform_digital, ...rest } = usaha

    return NextResponse.json(serialize({
      message: 'Status usaha diperbarui.',
      data: {
        ...rest,
        platforms: (platform_digital as { platform: string; nama_akun: string }[]) || [],
      },
    }))
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
