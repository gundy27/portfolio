import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dan Gunderson | Product Manager & Developer',
  description: 'Portfolio showcasing my work in product management, full-stack development, and AI innovation.',
  keywords: ['Product Manager', 'Full-Stack Developer', 'AI', 'Portfolio', 'Dan Gunderson'],
  authors: [{ name: 'Dan Gunderson', url: 'https://gundy.io' }],
  openGraph: {
    title: 'Dan Gunderson | Product Manager & Developer',
    description: 'Portfolio showcasing my work in product management, full-stack development, and AI innovation.',
    url: 'https://gundy.io',
    siteName: 'Dan Gunderson Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Gunderson | Product Manager & Developer',
    description: 'Portfolio showcasing my work in product management, full-stack development, and AI innovation.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
