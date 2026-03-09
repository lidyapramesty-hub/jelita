'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Alert,
  Stack,
} from '@mantine/core'
import {
  IconLogin,
  IconChartBar,
  IconUser,
  IconBuildingStore,
  IconShoppingCart,
  IconDeviceMobile,
  IconWifi,
  IconGlobe,
  IconCloud,
  IconCreditCard,
  IconArrowLeft,
  IconId,
  IconShield,
  IconDatabase,
  IconChartPie,
  IconBrandTabler,
} from '@tabler/icons-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [loginMethod, setLoginMethod] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (username && password) {
        localStorage.setItem('user_email', username)
        localStorage.setItem('login_method', loginMethod || 'pegawai')
        router.push('/dashboard')
      } else {
        setError('Username dan password wajib diisi.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003087 0%, #001a4d 50%, #0a1628 100%)' }}>
      {/* Animated background particles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
          25% { transform: translateY(-20px) rotate(5deg); opacity: 0.08; }
          50% { transform: translateY(-10px) rotate(-3deg); opacity: 0.04; }
          75% { transform: translateY(-25px) rotate(2deg); opacity: 0.07; }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,184,28,0.2); }
          50% { box-shadow: 0 0 40px rgba(255,184,28,0.4); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        .login-card {
          animation: slideUp 0.6s ease-out;
        }
        .role-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .role-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .role-btn:active {
          transform: translateY(0);
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.15) !important;
        }
        .floating-icon {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Orbiting ring */}
      <div className="absolute top-1/2 left-1/4 hidden lg:block" style={{ animation: 'pulse-ring 4s ease-in-out infinite' }}>
        <div className="w-64 h-64 rounded-full border border-white/5" />
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07] bg-gradient-to-br from-[#FFB81C] to-transparent transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-[0.05] bg-gradient-to-tr from-blue-400 to-transparent transform -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 right-1/4 w-56 h-56 rounded-full opacity-[0.06] bg-[#FFB81C] transform -translate-y-1/2 blur-3xl" />

        {/* Floating icons */}
        {[
          { Icon: IconShoppingCart, top: '12%', right: '15%', size: 48, delay: '0s', duration: '7s' },
          { Icon: IconDeviceMobile, top: '35%', right: '8%', size: 36, delay: '1.2s', duration: '8s' },
          { Icon: IconGlobe, top: '55%', right: '20%', size: 44, delay: '2.4s', duration: '6s' },
          { Icon: IconCloud, top: '25%', right: '30%', size: 40, delay: '0.8s', duration: '9s' },
          { Icon: IconWifi, top: '70%', right: '12%', size: 32, delay: '1.8s', duration: '7.5s' },
          { Icon: IconCreditCard, top: '48%', right: '32%', size: 38, delay: '3s', duration: '6.5s' },
          { Icon: IconDatabase, top: '80%', right: '25%', size: 34, delay: '0.5s', duration: '8.5s' },
          { Icon: IconChartPie, top: '15%', right: '38%', size: 30, delay: '2s', duration: '7.2s' },
        ].map(({ Icon, top, right, size, delay, duration }, i) => (
          <div
            key={i}
            className="absolute floating-icon text-white/[0.06]"
            style={{ top, right, animationDelay: delay, animationDuration: duration }}
          >
            <Icon size={size} />
          </div>
        ))}

        {/* Header */}
        <div className="relative z-10" style={mounted ? { animation: 'slideRight 0.8s ease-out' } : { opacity: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-black/20" style={{ animation: 'glow 3s ease-in-out infinite' }}>
              <IconChartBar className="w-8 h-8 text-[#003087]" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium tracking-[3px] uppercase">Badan Pusat Statistik</p>
              <p className="text-white font-bold text-base">Kabupaten Tabanan</p>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="relative z-10" style={mounted ? { animation: 'slideUp 0.8s ease-out 0.2s both' } : { opacity: 0 }}>
          <div className="inline-block bg-[#FFB81C]/10 border border-[#FFB81C]/20 rounded-full px-4 py-1 mb-6">
            <Text size="xs" c="white" fw={600}>🌐 Sistem Monitoring Digital</Text>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'DM Sans' }}>
            JELITA<br />
            <span className="text-2xl text-[#FFB81C] block mt-2">Jendela Ekonomi Digital<br />Kabupaten Tabanan</span>
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-sm">
            Sistem pendataan dan monitoring ekonomi digital untuk mendukung pembangunan ekonomi daerah
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: 'Kecamatan', value: '10', icon: <IconGlobe size={18} className="text-[#FFB81C]" /> },
              { label: 'Desa/Kelurahan', value: '133', icon: <IconBuildingStore size={18} className="text-[#FFB81C]" /> },
              { label: 'Usaha Digital', value: '18', icon: <IconShoppingCart size={18} className="text-[#FFB81C]" /> },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card bg-white/[0.08] backdrop-blur-sm rounded-2xl p-5 border border-white/[0.08] cursor-default"
                style={mounted ? { animation: `slideUp 0.5s ease-out ${0.4 + i * 0.15}s both` } : { opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {stat.icon}
                  <p className="text-white/50 text-xs font-medium">{stat.label}</p>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/20 text-xs">
            © 2025 BPS Kabupaten Tabanan · Hak Cipta Dilindungi
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center" style={mounted ? { animation: 'slideUp 0.5s ease-out' } : { opacity: 0 }}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <IconChartBar className="w-7 h-7 text-[#003087]" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium">BPS Kabupaten Tabanan</p>
              <p className="text-white font-bold text-lg">JELITA</p>
            </div>
          </div>

          <Paper radius="xl" shadow="xl" p="xl" className="login-card" style={{ backdropFilter: 'blur(10px)' }}>
            {loginMethod === null ? (
              /* Step 1: Role Selection */
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#003087] to-[#001a4d] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <IconBrandTabler className="w-8 h-8 text-white" />
                  </div>
                  <Title order={2} style={{ fontFamily: 'DM Sans' }}>Selamat Datang</Title>
                  <Text size="sm" c="dimmed" mt={4}>Pilih peran Anda untuk masuk ke sistem</Text>
                </div>

                <Stack gap="md">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('pegawai')}
                    className="role-btn w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#003087]/20 to-[#003087]/5">
                        <IconShield size={28} className="text-[#003087]" />
                      </div>
                      <div className="flex-1">
                        <Text fw={700} size="md">Pegawai BPS</Text>
                        <Text size="xs" c="dimmed">Masuk sebagai pegawai Badan Pusat Statistik</Text>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <IconArrowLeft size={16} className="text-gray-400 rotate-180" />
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLoginMethod('mitra')}
                    className="role-btn w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-[#FFB81C] hover:bg-amber-50/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FFB81C]/20 to-[#FFB81C]/5">
                        <IconId size={28} className="text-[#d97706]" />
                      </div>
                      <div className="flex-1">
                        <Text fw={700} size="md">Mitra BPS</Text>
                        <Text size="xs" c="dimmed">Masuk sebagai mitra statistik</Text>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <IconArrowLeft size={16} className="text-gray-400 rotate-180" />
                      </div>
                    </div>
                  </button>
                </Stack>
              </>
            ) : (
              /* Step 2: Credentials Form */
              <div style={mounted ? { animation: 'slideUp 0.4s ease-out' } : {}}>
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => { setLoginMethod(null); setError(''); setUsername(''); setPassword('') }}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#003087] mb-4 transition-colors cursor-pointer group"
                  >
                    <IconArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Kembali
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${loginMethod === 'mitra' ? 'bg-gradient-to-br from-[#FFB81C]/20 to-[#FFB81C]/5' : 'bg-gradient-to-br from-[#003087]/20 to-[#003087]/5'}`}>
                      {loginMethod === 'mitra' ? <IconId size={24} className="text-[#d97706]" /> : <IconShield size={24} className="text-[#003087]" />}
                    </div>
                    <div>
                      <Title order={3} style={{ fontFamily: 'DM Sans' }}>
                        {loginMethod === 'mitra' ? 'Masuk sebagai Mitra' : 'Masuk sebagai Pegawai'}
                      </Title>
                      <Text size="xs" c="dimmed">Masukkan kredensial Anda</Text>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert color="red" radius="md" mb="md" variant="light">
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleLogin}>
                  <Stack gap="md">
                    <TextInput
                      label="Username"
                      placeholder={loginMethod === 'mitra' ? 'Masukkan username mitra' : 'Masukkan username pegawai'}
                      value={username}
                      onChange={(e) => setUsername(e.currentTarget.value)}
                      required
                      autoComplete="username"
                      size="md"
                      leftSection={<IconUser size={16} />}
                      radius="md"
                    />

                    <PasswordInput
                      label="Password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      required
                      autoComplete="current-password"
                      size="md"
                      radius="md"
                    />

                    <Button
                      type="submit"
                      loading={loading}
                      fullWidth
                      size="md"
                      mt="xs"
                      radius="md"
                      leftSection={<IconLogin size={18} />}
                      style={{ backgroundColor: loginMethod === 'mitra' ? '#d97706' : '#003087', height: 48 }}
                      styles={{ root: { '&:hover': { backgroundColor: loginMethod === 'mitra' ? '#b45309' : '#002060' }, transition: 'all 0.3s ease', fontWeight: 600 } }}
                    >
                      {loginMethod === 'mitra' ? 'Masuk sebagai Mitra' : 'Masuk sebagai Pegawai BPS'}
                    </Button>
                  </Stack>
                </form>
              </div>
            )}

            <Text size="xs" c="dimmed" ta="center" mt="xl" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              Hubungi administrator BPS jika mengalami masalah akses
            </Text>
          </Paper>

          <Text size="xs" c="white" ta="center" mt="lg" opacity={0.25}>
            Sistem Informasi Ekonomi Digital — BPS Tabanan 2025
          </Text>
        </div>
      </div>
    </div>
  )
}
