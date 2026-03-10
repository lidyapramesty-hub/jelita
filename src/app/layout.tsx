import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import ReduxProvider from '@/components/providers/ReduxProvider'
import AuthGuard from '@/components/providers/AuthGuard'
import './globals.css'

const theme = createTheme({
  primaryColor: 'bps-blue',
  colors: {
    'bps-blue': [
      '#e8f0f7',
      '#b3cde6',
      '#7faad5',
      '#4b87c4',
      '#1a64b3',
      '#003087',
      '#00276d',
      '#001e54',
      '#00153a',
      '#000c21',
    ],
  },
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  headings: {
    fontFamily: 'DM Sans, sans-serif',
  },
})

export const metadata: Metadata = {
  title: 'Dashboard Ekonomi Digital Kabupaten Tabanan | BPS',
  description: 'Sistem Informasi Ekonomi Digital Kabupaten Tabanan - Badan Pusat Statistik',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" />
            <AuthGuard>
              {children}
            </AuthGuard>
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
