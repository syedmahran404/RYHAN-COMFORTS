import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { BRAND } from '@/lib/data/brand';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import QueryProvider from '@/lib/providers/QueryProvider';
import SmoothScrollProvider from '@/lib/providers/SmoothScrollProvider';
import { PageTransition } from '@/components/motion/PageTransition';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap'
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
});

export const viewport: Viewport = {
  themeColor: '#faf6ee',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ryhancomforts.com'),
  title: {
    default: `${BRAND.name} — Bespoke Luxury Furniture`,
    template: `%s · ${BRAND.name}`
  },
  description: BRAND.description,
  keywords: [
    'luxury furniture',
    'custom sofa',
    'carved wooden beds',
    'bespoke mattress',
    'luxury curtains',
    'Bengaluru',
    'Ryhan Comforts',
    BRAND.owner,
    BRAND.subManager
  ],
  authors: [{ name: BRAND.owner }, { name: BRAND.subManager }],
  creator: BRAND.owner,
  openGraph: {
    title: `${BRAND.name} — Bespoke Luxury Furniture`,
    description: BRAND.description,
    type: 'website',
    locale: 'en_IN',
    siteName: BRAND.name
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND.name,
    description: BRAND.tagline
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-svh bg-ivory-100 text-pewter-700 antialiased">
        <QueryProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="relative">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <FloatingWhatsApp />
          </SmoothScrollProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
