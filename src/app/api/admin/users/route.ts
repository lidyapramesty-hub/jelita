import { NextRequest, NextResponse } from 'next/server'
import { prisma, serialize } from '@/lib/prisma'
import { getAuthUser, unauthorized, hashPassword } from '@/lib/auth'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const role = searchParams.get('role')
    const sort_by = searchParams.get('sort_by') || 'role'
    const sort_dir = searchParams.get('sort_dir') || 'asc'
    const page = parseInt(searchParams.get('page') || '1')
    const per_page = parseInt(searchParams.get('per_page') || '20')

    const where: Prisma.UserWhereInput = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (role) where.role = role

    const [total, data] = await Promise.all([
      prisma.user.count({ where }),
      prisma.$queryRawUnsafe<Array<{
        id: number
        name: string
        username: string | null
        phone: string | null
        role: string
        created_at: Date
        updated_at: Date
      }>>(
        buildUserListQuery(where, sort_by, sort_dir, page, per_page, search, role)
      ),
    ])

    // Hide password from results
    const safeData = data.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      phone: u.phone,
      role: u.role,
      created_at: u.created_at,
      updated_at: u.updated_at,
    }))

    return NextResponse.json(serialize({
      data: safeData,
      current_page: page,
      last_page: Math.ceil(total / per_page) || 1,
      per_page,
      total,
    }))
  } catch (error) {
    console.error('Admin users index error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}

function buildUserListQuery(
  _where: Prisma.UserWhereInput,
  sort_by: string,
  sort_dir: string,
  page: number,
  per_page: number,
  search: string | null,
  role: string | null,
): string {
  const conditions: string[] = []
  const dir = sort_dir === 'desc' ? 'DESC' : 'ASC'

  if (search) {
    const escaped = search.replace(/'/g, "''")
    conditions.push(`(name ILIKE '%${escaped}%' OR username ILIKE '%${escaped}%' OR phone ILIKE '%${escaped}%')`)
  }
  if (role) {
    conditions.push(`role = '${role.replace(/'/g, "''")}'`)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  let orderClause: string
  if (sort_by === 'role') {
    orderClause = `ORDER BY CASE WHEN role='admin' THEN 0 WHEN role='pegawai' THEN 1 ELSE 2 END ${dir}, name ASC`
  } else if (sort_by === 'name') {
    orderClause = `ORDER BY name ${dir}, CASE WHEN role='admin' THEN 0 WHEN role='pegawai' THEN 1 ELSE 2 END ASC`
  } else {
    const allowedFields = ['name', 'username', 'role', 'created_at']
    const field = allowedFields.includes(sort_by) ? sort_by : 'role'
    orderClause = `ORDER BY ${field} ${dir}`
  }

  const offset = (page - 1) * per_page

  return `SELECT id, name, username, phone, role, created_at, updated_at FROM users ${whereClause} ${orderClause} LIMIT ${per_page} OFFSET ${offset}`
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const body = await request.json()
    const { name, password, role, username, phone } = body

    if (!name || !password || !role) {
      return NextResponse.json(
        { message: 'Name, password, dan role wajib diisi.' },
        { status: 422 }
      )
    }

    if (!['pegawai', 'mitra', 'admin'].includes(role)) {
      return NextResponse.json(
        { message: 'Role harus salah satu dari: pegawai, mitra, admin.' },
        { status: 422 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password minimal 6 karakter.' },
        { status: 422 }
      )
    }

    if (role === 'mitra') {
      if (!phone) {
        return NextResponse.json(
          { message: 'Nomor telepon wajib untuk mitra.' },
          { status: 422 }
        )
      }
      const existingPhone = await prisma.user.findUnique({ where: { phone } })
      if (existingPhone) {
        return NextResponse.json(
          { message: 'Nomor telepon sudah digunakan.' },
          { status: 422 }
        )
      }
    } else {
      if (!username) {
        return NextResponse.json(
          { message: 'Username wajib untuk pegawai/admin.' },
          { status: 422 }
        )
      }
      const existingUsername = await prisma.user.findUnique({ where: { username } })
      if (existingUsername) {
        return NextResponse.json(
          { message: 'Username sudah digunakan.' },
          { status: 422 }
        )
      }
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        name,
        username: role === 'mitra' ? null : username,
        phone: role === 'mitra' ? phone : null,
        password: hashedPassword,
        role,
      },
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

    return NextResponse.json(
      serialize({ message: 'User berhasil dibuat.', data: newUser }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin user create error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
