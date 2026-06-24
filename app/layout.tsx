import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/context/language-context'
import { CartProvider } from '@/context/cart-context'
import { AuthProvider } from '@/context/auth-context'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingContactButtons from '@/components/layout/FloatingContactButtons'
import { DynamicNotificationToast } from '@/components/layout/DynamicNotificationToast'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AN GIA GREEN - Dược liệu sạch, Chăm sóc sức khỏe chủ động',
  description: 'AN GIA GREEN - Hệ sinh thái chăm sóc sức khỏe từ dược liệu sạch và nông sản chất lượng. Nguồn gốc minh bạch, quy trình hiện đại, giá trị truyền thống.',
  keywords: 'dược liệu, thảo dược, sức khỏe, nông sản sạch, tư vấn y sĩ, AN GIA GREEN',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/3956976912911290196.jpg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/3956976912911290196.jpg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/3956976912911290196.jpg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/3956976912911290196.jpg',
  },
  openGraph: {
    title: 'AN GIA GREEN - Dược liệu sạch',
    description: 'Hệ sinh thái chăm sóc sức khỏe từ dược liệu sạch và nông sản chất lượng',
    type: 'website',
    locale: 'vi_VN',
  },
}

export const viewport: Viewport = {
  themeColor: '#4FAE4E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="bg-background">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingContactButtons />
              <DynamicNotificationToast />
              <Toaster position="top-right" richColors />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
