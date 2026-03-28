import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser, unauthorized } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    return NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    })
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
