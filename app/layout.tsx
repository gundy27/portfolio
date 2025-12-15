import type { Metadata } from 'next'
import { Space_Grotesk, Poppins, Lexend_Exa } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-space-grotesk',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-poppins',
})

const lexendExa = Lexend_Exa({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-lexend-exa',
})

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
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${poppins.variable} ${lexendExa.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
