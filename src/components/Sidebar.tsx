'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Text,
  ActionIcon,
} from '@mantine/core'
import {
  IconChartBar,
  IconBuildingStore,
  IconLogout,
  IconMenu2,
  IconX,
  IconChevronRight,
  IconShieldCheck,
} from '@tabler/icons-react'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  description?: string
  adminOnly?: boolean
}

export default function Sidebar() {
  const pathname = usePathname()
  const { user, logout, isLoggingOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const displayName = user?.role === 'mitra' ? user?.name : user?.username
  const isAdmin = user?.role === 'admin'

  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: <IconChartBar size={20} />, description: 'Statistik & Peta' },
    { href: '/daftar-usaha', label: 'Daftar Usaha', icon: <IconBuildingStore size={20} />, description: 'Kelola Data Usaha' },
    { href: '/admin', label: 'Admin Panel', icon: <IconShieldCheck size={20} />, description: 'Kelola Pengguna', adminOnly: true },
  ].filter(item => !item.adminOnly || isAdmin)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/asset12.png"
            alt="BPS"
            width={38}
            height={38}
            style={{ objectFit: 'contain', flexShrink: 0 }}
          />
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight">BPS</p>
            <p className="text-white/60 text-xs leading-tight">Kabupaten Tabanan</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-white/30 text-xs font-semibold tracking-widest uppercase px-3 mb-3">Menu Utama</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group relative ${isActive
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFB81C] rounded-r-full" />
              )}
              <span className={isActive ? 'text-[#FFB81C]' : ''}>{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className={`text-xs ${isActive ? 'text-white/60' : 'text-white/30'}`}>{item.description}</p>
              </div>
              {isActive && <IconChevronRight size={14} className="text-white/40" />}
            </Link>
          )
        })}
      </nav>

      {/* User & Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#FFB81C] flex items-center justify-center text-[#003087] font-bold text-sm flex-shrink-0">
            {displayName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">{displayName || user?.name || 'Pengguna'}</p>
            <p className="text-white/40 text-xs">{user?.role === 'admin' ? 'Administrator' : user?.role === 'mitra' ? 'Mitra BPS' : 'Pegawai BPS'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          {isLoggingOut ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <IconLogout size={18} />
          )}
          Keluar
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 z-30"
        style={{ background: 'linear-gradient(180deg, #003087 0%, #001a4d 100%)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-1.5 shadow-md"
        style={{ background: '#003087' }}
      >
        <div className="flex items-center">
          <Image src="/assets/asset3.png" alt="BPS Kabupaten Tabanan" width={95} height={22} style={{ objectFit: 'contain' }} />
        </div>
        <ActionIcon variant="transparent" color="white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </ActionIcon>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-20"
          onClick={() => setMobileOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-72 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ background: 'linear-gradient(180deg, #003087 0%, #001a4d 100%)' }}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
