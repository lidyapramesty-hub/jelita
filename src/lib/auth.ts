import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'jelita-secret-key-change-in-production')

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createToken(userId: bigint): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString('hex')
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

  await prisma.personalAccessToken.create({
    data: {
      tokenable_id: userId,
      tokenable_type: 'App\\Models\\User',
      name: 'auth-token',
      token: hashedToken,
    },
  })

  // Return JWT that contains the raw token reference + userId as number
  const jwt = await new SignJWT({ userId: Number(userId), token: rawToken })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(JWT_SECRET)

  return jwt
}

export async function verifyToken(jwt: string): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(jwt, JWT_SECRET)
    const rawToken = payload.token as string
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    const tokenRecord = await prisma.personalAccessToken.findUnique({
      where: { token: hashedToken },
    })

    if (!tokenRecord) return null

    // Update last_used_at
    await prisma.personalAccessToken.update({
      where: { id: tokenRecord.id },
      data: { last_used_at: new Date() },
    })

    return { userId: payload.userId as number }
  } catch {
    return null
  }
}

export async function deleteToken(jwt: string): Promise<void> {
  try {
    const { payload } = await jwtVerify(jwt, JWT_SECRET)
    const rawToken = payload.token as string
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')

    await prisma.personalAccessToken.deleteMany({
      where: { token: hashedToken },
    })
  } catch {
    // token invalid, nothing to delete
  }
}

export async function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null

  const token = authHeader.slice(7)
  const result = await verifyToken(token)
  if (!result) return null

  const user = await prisma.user.findUnique({
    where: { id: result.userId },
    select: { id: true, name: true, username: true, phone: true, role: true },
  })

  if (!user) return null

  // Return with id as number for JSON serialization
  return { ...user, id: Number(user.id) }
}

export function unauthorized() {
  return NextResponse.json({ message: 'Unauthenticated.' }, { status: 401 })
}
