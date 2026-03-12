'use client'

import { useState, useEffect } from 'react'
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
  IconUser,
  IconArrowLeft,
} from '@tabler/icons-react'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loginMethod, setLoginMethod] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError(loginMethod === 'mitra' ? 'Nomor telepon dan password wajib diisi.' : 'Username dan password wajib diisi.')
      return
    }

    try {
      const role = loginMethod === 'mitra' ? 'mitra' : 'pegawai'
      await login(username, password, role)
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string; errors?: Record<string, string[]> } }
      if (apiError?.data?.errors?.phone) {
        setError(apiError.data.errors.phone[0])
      } else if (apiError?.data?.errors?.username) {
        setError(apiError.data.errors.username[0])
      } else if (apiError?.data?.message) {
        setError(apiError.data.message)
      } else {
        setError('Terjadi kesalahan sistem. Silakan coba lagi.')
      }
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #003087 0%, #001a4d 50%, #0a1628 100%)' }}>
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
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
        .jelita-title {
          font-family: 'Madimi One', sans-serif;
          background: linear-gradient(to bottom right, #FFD83D, #FFA600);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Asset2: full-screen background overlay at 20% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/asset2.png"
          alt=""
          fill
          style={{ objectFit: 'cover', opacity: 0.2 }}
          priority
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col p-12 relative overflow-hidden z-10 min-h-screen">

        {/* BPS Logo */}
        <div
          className="flex-shrink-0"
          style={mounted ? { animation: 'slideRight 0.8s ease-out' } : { opacity: 0 }}
        >
          <Image
            src="/assets/asset4.png"
            alt="BPS Kabupaten Tabanan"
            width={340}
            height={92}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
          />
        </div>

        {/* Main Title — sits just below logo */}
        <div
          className="flex-shrink-0 mt-10"
          style={mounted ? { animation: 'slideUp 0.8s ease-out 0.2s both' } : { opacity: 0 }}
        >
          <h1 className="jelita-title leading-none mb-5" style={{ fontSize: '5.5rem' }}>
            JELITA
          </h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.65rem', color: '#FFBB00', lineHeight: 1.3, marginBottom: '0.25rem' }}>
            Jendela Ekonomi Digital
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.65rem', color: '#FFFFFF', lineHeight: 1.3, marginBottom: '1.5rem' }}>
            Kabupaten Tabanan
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: '30rem' }}>
            Sistem pendataan dan monitoring ekonomi digital untuk mendukung pembangunan ekonomi daerah
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Asset1: bottom-left illustration (bigger) */}
        <div className="absolute bottom-0 left-[16%] z-10 pointer-events-none" style={{ width: '70%' }}>
          <Image
            src="/assets/asset1.png"
            alt=""
            width={560}
            height={400}
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col lg:items-center lg:justify-center relative z-10">
        {/* Mobile/Tablet Branding */}
        <div className="lg:hidden px-6 pt-10 pb-4">
          <div className="mb-6" style={mounted ? { animation: 'slideRight 0.6s ease-out' } : { opacity: 0 }}>
            <Image
              src="/assets/asset4.png"
              alt="BPS Kabupaten Tabanan"
              width={220}
              height={60}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </div>
          <div style={mounted ? { animation: 'slideUp 0.6s ease-out 0.1s both' } : { opacity: 0 }}>
            <h1 className="jelita-title leading-none mb-3" style={{ fontSize: '3.5rem' }}>
              JELITA
            </h1>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#FFBB00', lineHeight: 1.3, marginBottom: '0.15rem' }}>
              Jendela Ekonomi Digital
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF', lineHeight: 1.3, marginBottom: '0.8rem' }}>
              Kabupaten Tabanan
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Sistem pendataan dan monitoring ekonomi digital untuk mendukung pembangunan ekonomi daerah
            </p>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto px-6 pb-8 lg:px-0 lg:pb-0">
          <Paper radius="xl" shadow="xl" p={{ base: 'md', sm: 'xl' }} className="login-card" style={{ backdropFilter: 'blur(10px)' }}>
            {loginMethod === null ? (
              /* Step 1: Role Selection */
              <>
                <div className="text-center mb-8">
                  <div className="mx-auto mb-4 flex items-center justify-center" style={{ width: 72, height: 72 }}>
                    <Image src="/assets/asset14.png" alt="JELITA" width={72} height={72} style={{ objectFit: 'contain' }} />
                  </div>
                  <Title order={2} style={{ fontFamily: 'Montserrat, sans-serif' }}>Selamat Datang</Title>
                  <Text size="sm" c="dimmed" mt={4}>Pilih peran Anda untuk masuk ke sistem</Text>
                </div>

                <Stack gap="md">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('pegawai')}
                    className="role-btn w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-[#003087] hover:bg-blue-50/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#003087]/10 to-[#003087]/5 flex-shrink-0">
                        <Image src="/assets/asset7.png" alt="Pegawai" width={44} height={44} style={{ objectFit: 'contain' }} />
                      </div>
                      <div className="flex-1">
                        <Text fw={700} size="md">Pegawai BPS</Text>
                        <Text size="xs" c="dimmed">
                          Masuk sebagai pegawai<br />Badan Pusat Statistik
                        </Text>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#FFB81C]/20 to-[#FFB81C]/5 flex-shrink-0">
                        <Image src="/assets/asset6.png" alt="Mitra" width={44} height={44} style={{ objectFit: 'contain' }} />
                      </div>
                      <div className="flex-1">
                        <Text fw={700} size="md">Mitra BPS</Text>
                        <Text size="xs" c="dimmed">Masuk sebagai mitra statistik</Text>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
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
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 flex-shrink-0">
                      <Image
                        src={loginMethod === 'mitra' ? '/assets/asset6.png' : '/assets/asset7.png'}
                        alt=""
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div>
                      <Title order={3} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        {loginMethod === 'mitra' ? 'Masuk sebagai Mitra' : 'Masuk sebagai Pegawai'}
                      </Title>
                      <Text size="xs" c="dimmed">
                        {loginMethod === 'mitra'
                          ? 'Masukkan nomor telepon dan password Anda'
                          : 'Masukkan username dan password Anda'}
                      </Text>
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
                    {loginMethod === 'mitra' ? (
                      <TextInput
                        label="Nomor Telepon"
                        placeholder="xxxxx"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        required
                        autoComplete="tel"
                        size="md"
                        leftSection={<Text size="sm" fw={600} c="dimmed" style={{ whiteSpace: 'nowrap', paddingLeft: 4 }}>+62</Text>}
                        leftSectionWidth={48}
                        radius="md"
                      />
                    ) : (
                      <TextInput
                        label="Username"
                        placeholder="Masukkan username pegawai"
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        required
                        autoComplete="username"
                        size="md"
                        leftSection={<IconUser size={16} />}
                        radius="md"
                      />
                    )}

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
                      loading={isLoggingIn}
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

          <Text size="xs" c="white" ta="center" mt="lg" opacity={0.25} style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Sistem Informasi Ekonomi Digital — BPS Tabanan 2025
          </Text>
        </div>
      </div>

      {/* Copyright — absolute bottom-right of the whole page */}
      <div className="absolute bottom-5 right-6 z-20">
        <p className="text-white/20 text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          © 2025 BPS Kabupaten Tabanan · Hak Cipta Dilindungi
        </p>
      </div>
    </div>
  )
}
