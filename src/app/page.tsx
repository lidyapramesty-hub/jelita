'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // For now, directly redirect to login
    // In future, check auth status via API
    router.push('/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003087]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-white/70 text-sm">Memuat...</p>
      </div>
    </div>
  )
}
