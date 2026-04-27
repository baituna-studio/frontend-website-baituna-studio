import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { MetaPixel } from '@/components/analytics/MetaPixel';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Baituna Studio | Digital Products & Services',
  description: 'Download perlengkapan digital dan template desain premium untuk memajukan bisnis dan branding Anda.',
  keywords: ['studio desain', 'template bisnis', 'produk digital', 'jasa desain UMKM', 'baituna studio'],
  authors: [{ name: 'Baituna Studio' }],
  creator: 'Baituna Studio',
  publisher: 'Baituna Studio',
  metadataBase: new URL('https://baitunastudio.biz.id'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://baitunastudio.biz.id',
    title: 'Baituna Studio | Solusi Kreatif Digital UMKM',
    description: 'Download perlengkapan digital dan template desain premium untuk memajukan bisnis dan branding Anda. Ciptakan kesan profesional dalam hitungan menit.',
    siteName: 'Baituna Studio',
    images: [
      {
        url: '/og-image.png', // TBD: User should provide this
        width: 1200,
        height: 630,
        alt: 'Baituna Studio - Premium Digital Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baituna Studio | Digital Products & Services',
    description: 'Download perlengkapan digital dan template desain premium untuk memajukan bisnis dan branding Anda.',
    creator: '@baitunastudio',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://baitunastudio.biz.id/#organization',
                  name: 'Baituna Studio',
                  url: 'https://baitunastudio.biz.id',
                  description: 'Produk digital premium dan solusi desain untuk UMKM Indonesia.',
                  sameAs: [
                    'https://instagram.com/baitunastudio',
                    'https://lynk.id/baitunastudio',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://baitunastudio.biz.id/#website',
                  url: 'https://baitunastudio.biz.id',
                  name: 'Baituna Studio',
                  publisher: { '@id': 'https://baitunastudio.biz.id/#organization' },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <GoogleAnalytics />
        <MetaPixel />
        <PrimeReactProvider>
          <AppHeader />
          <main className="flex-1">
            {children}
          </main>
          <WhatsAppFloat />
          <AppFooter />
        </PrimeReactProvider>
      </body>
    </html>
  );
}
