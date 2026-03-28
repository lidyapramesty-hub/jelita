import { NextRequest, NextResponse } from 'next/server'
import { prisma, serialize } from '@/lib/prisma'
import { getAuthUser, unauthorized } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    // Get distinct creator IDs from active usaha
    const creatorIds = await prisma.usaha.findMany({
      where: { is_active: true, created_by: { not: null } },
      select: { created_by: true },
      distinct: ['created_by'],
    })

    const ids = creatorIds.map((c) => c.created_by!).filter(Boolean)

    if (ids.length === 0) {
      return NextResponse.json([])
    }

    const creators = await prisma.user.findMany({
      where: { id: { in: ids } },
      select: { id: true, name: true, username: true, role: true, phone: true },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(serialize(creators))
  } catch (error) {
    console.error('Creators error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
