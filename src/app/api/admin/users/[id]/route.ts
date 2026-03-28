import { NextRequest, NextResponse } from 'next/server'
import { prisma, serialize } from '@/lib/prisma'
import { getAuthUser, unauthorized, hashPassword } from '@/lib/auth'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser(request)
    if (!authUser) return unauthorized()

    const id = parseInt(params.id)
    const existing = await prisma.user.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 })
    }

    const body = await request.json()
    const { name, password, role, username, phone } = body

    const effectiveRole = role || existing.role

    const updateData: Record<string, unknown> = {}

    if (name !== undefined) updateData.name = name
    if (role !== undefined) updateData.role = role

    if (effectiveRole === 'mitra') {
      if (phone !== undefined) {
        const existingPhone = await prisma.user.findFirst({
          where: { phone, id: { not: id } },
        })
        if (existingPhone) {
          return NextResponse.json(
            { message: 'Nomor telepon sudah digunakan.' },
            { status: 422 }
          )
        }
        updateData.phone = phone
      }
    } else {
      if (username !== undefined) {
        const existingUsername = await prisma.user.findFirst({
          where: { username, id: { not: id } },
        })
        if (existingUsername) {
          return NextResponse.json(
            { message: 'Username sudah digunakan.' },
            { status: 422 }
          )
        }
        updateData.username = username
      }
    }

    if (password && password !== '') {
      updateData.password = await hashPassword(password)
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    })

    return NextResponse.json(serialize({
      message: 'User berhasil diperbarui.',
      data: updated,
    }))
  } catch (error) {
    console.error('Admin user update error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser(request)
    if (!authUser) return unauthorized()

    const id = parseInt(params.id)
    const existing = await prisma.user.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 })
    }

    if (existing.role === 'admin') {
      return NextResponse.json({ message: 'Admin tidak dapat dihapus.' }, { status: 403 })
    }

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ message: 'User berhasil dihapus.' })
  } catch (error) {
    console.error('Admin user delete error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
