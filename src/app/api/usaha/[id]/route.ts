import { NextRequest, NextResponse } from 'next/server'
import { prisma, serialize } from '@/lib/prisma'
import { getAuthUser, unauthorized } from '@/lib/auth'

function transformUsaha(u: Record<string, unknown>) {
  const { platform_digital, ...rest } = u
  return {
    ...rest,
    platforms: (platform_digital as { platform: string; nama_akun: string }[]) || [],
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const usaha = await prisma.usaha.findUnique({
      where: { id: params.id },
      include: {
        creator: { select: { id: true, name: true, username: true, role: true } },
        updater: { select: { id: true, name: true, username: true, role: true } },
      },
    })

    if (!usaha) {
      return NextResponse.json({ message: 'Usaha tidak ditemukan.' }, { status: 404 })
    }

    return NextResponse.json(serialize({ data: transformUsaha(usaha as unknown as Record<string, unknown>) }))
  } catch (error) {
    console.error('Usaha show error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const existing = await prisma.usaha.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ message: 'Usaha tidak ditemukan.' }, { status: 404 })
    }

    const body = await request.json()
    const { platforms, ...fields } = body

    const updateData: Record<string, unknown> = { ...fields }

    if (platforms !== undefined) {
      updateData.platform_digital = platforms
      delete updateData.platforms
    }

    // Parse numeric fields
    if (updateData.latitude !== undefined) {
      updateData.latitude = updateData.latitude != null ? parseFloat(String(updateData.latitude)) : null
    }
    if (updateData.longitude !== undefined) {
      updateData.longitude = updateData.longitude != null ? parseFloat(String(updateData.longitude)) : null
    }

    // If usaha was declined and is being edited, reset to pending
    if (existing.status === 'declined') {
      updateData.status = 'pending'
    }

    updateData.updated_by = user.id

    const usaha = await prisma.usaha.update({
      where: { id: params.id },
      data: updateData,
      include: {
        creator: { select: { id: true, name: true, username: true, role: true } },
        updater: { select: { id: true, name: true, username: true, role: true } },
      },
    })

    return NextResponse.json(serialize({
      message: 'Usaha berhasil diperbarui.',
      data: transformUsaha(usaha as unknown as Record<string, unknown>),
    }))
  } catch (error) {
    console.error('Usaha update error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const existing = await prisma.usaha.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ message: 'Usaha tidak ditemukan.' }, { status: 404 })
    }

    await prisma.usaha.delete({ where: { id: params.id } })

    return NextResponse.json({ message: 'Usaha berhasil dihapus.' })
  } catch (error) {
    console.error('Usaha delete error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
