import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from '@/context/user-context'
import { ToastProvider } from '@/components/toast-provider'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'StudyAI - Estudia Mejor con IA',
  description: 'Sube PDFs, obtén resúmenes con IA y pon a prueba tus conocimientos con cuestionarios inteligentes. Transforma tu forma de aprender.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">

      <body className="font-sans antialiased">
        <UserProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </UserProvider>
        <Analytics />
      </body>

    </html>
  )
}
