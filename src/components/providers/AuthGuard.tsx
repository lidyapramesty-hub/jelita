'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

const PUBLIC_PATHS = ['/login']

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, checkAuth } = useAuth()
  const [checking, setChecking] = useState(true)

  const isPublic = PUBLIC_PATHS.includes(pathname)

  useEffect(() => {
    const verify = async () => {
      const authed = await checkAuth()
      if (!authed && !isPublic) {
        router.push('/login')
      } else if (authed && isPublic) {
        router.push('/dashboard')
      }
      setChecking(false)
    }
    verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#003087]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-white/70 text-sm">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && !isPublic) {
    return null
  }

  return <>{children}</>
}
