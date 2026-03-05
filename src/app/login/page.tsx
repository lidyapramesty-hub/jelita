'use client'

import { useState } from 'react'
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
} from '@tabler/icons-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Static login for UI demo — accept any credentials
    // In future, replace with Supabase / API auth
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('user_email', email)
        router.push('/dashboard')
      } else {
        setError('Email dan password wajib diisi.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #003087 0%, #001a4d 50%, #0a1628 100%)' }}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 bg-white transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 bg-white transform -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-5 bg-[#FFB81C] transform -translate-y-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <IconChartBar className="w-7 h-7 text-[#003087]" />
            </div>
            <div>
              <p className="text-white/60 text-xs font-medium tracking-widest uppercase">Badan Pusat Statistik</p>
              <p className="text-white font-bold text-sm">Kabupaten Tabanan</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'DM Sans' }}>
            Dashboard<br />
            <span className="text-[#FFB81C]">Ekonomi Digital</span><br />
            Kabupaten Tabanan
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Sistem pendataan dan monitoring usaha ekonomi digital berbasis teknologi informasi untuk mendukung kebijakan pembangunan ekonomi daerah.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { label: 'Kecamatan', value: '10' },
              { label: 'Desa', value: '133' },
              { label: 'Platform', value: '20+' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/50 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/30 text-xs">
            © 2025 BPS Kabupaten Tabanan. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <IconChartBar className="w-6 h-6 text-[#003087]" />
            </div>
            <div>
              <p className="text-white/60 text-xs">BPS Kabupaten Tabanan</p>
              <p className="text-white font-bold text-sm">Ekonomi Digital</p>
            </div>
          </div>

          <Paper radius="lg" shadow="xl" p="xl">
            <div className="mb-8">
              <Title order={2} style={{ fontFamily: 'DM Sans' }}>Masuk ke Sistem</Title>
              <Text size="sm" c="dimmed" mt={4}>Masukkan kredensial akun BPS Anda</Text>
            </div>

            {error && (
              <Alert color="red" radius="md" mb="md" variant="light">
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  placeholder="nama@bps.go.id"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                  autoComplete="email"
                  size="md"
                />

                <PasswordInput
                  label="Password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                  autoComplete="current-password"
                  size="md"
                />

                <Button
                  type="submit"
                  loading={loading}
                  fullWidth
                  size="md"
                  mt="xs"
                  leftSection={<IconLogin size={18} />}
                  style={{ backgroundColor: '#003087' }}
                  styles={{ root: { '&:hover': { backgroundColor: '#002060' } } }}
                >
                  Masuk
                </Button>
              </Stack>
            </form>

            <Text size="xs" c="dimmed" ta="center" mt="xl" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              Hubungi administrator BPS jika mengalami masalah akses
            </Text>
          </Paper>

          <Text size="xs" c="white" ta="center" mt="lg" opacity={0.3}>
            Sistem Informasi Ekonomi Digital — BPS Tabanan 2025
          </Text>
        </div>
      </div>
    </div>
  )
}
