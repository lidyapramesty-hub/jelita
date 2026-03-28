import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password, role = 'pegawai' } = body

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username dan password wajib diisi.', errors: { username: ['Username dan password wajib diisi.'] } },
        { status: 422 }
      )
    }

    let user

    if (role === 'mitra') {
      user = await prisma.user.findFirst({
        where: { phone: username, role: 'mitra' },
      })

      if (!user || !(await verifyPassword(password, user.password))) {
        return NextResponse.json(
          { message: 'Nomor telepon atau password salah.', errors: { phone: ['Nomor telepon atau password salah.'] } },
          { status: 422 }
        )
      }
    } else {
      user = await prisma.user.findFirst({
        where: { username },
      })

      if (!user || !(await verifyPassword(password, user.password))) {
        return NextResponse.json(
          { message: 'Username atau password salah.', errors: { username: ['Username atau password salah.'] } },
          { status: 422 }
        )
      }
    }

    const token = await createToken(user.id)

    return NextResponse.json({
      user: {
        id: Number(user.id),
        name: user.name,
        username: user.username,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
