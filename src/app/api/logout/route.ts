import { NextRequest, NextResponse } from 'next/server'
import { deleteToken, getAuthUser, unauthorized } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) return unauthorized()

    const authHeader = request.headers.get('Authorization')!
    const token = authHeader.slice(7)
    await deleteToken(token)

    return NextResponse.json({ message: 'Berhasil logout.' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
