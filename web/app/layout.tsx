import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import LanguageBoot from '@/components/LanguageBoot'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.globewithlocals.com'),
  title: 'GlobeWithLocals - Local Tours & Experiences',
  description:
    'Discover local tours and experiences with local guides.',
  keywords:
    'local tours, local guides, travel experiences, walking tours, food tours, private day trips',
  authors: [{ name: 'GlobeWithLocals' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  other: {
    'language': 'en',
    'revisit-after': '7 days',
    'distribution': 'global',
    'rating': 'general',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'GlobeWithLocals',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.globewithlocals.com/',
    title: 'GlobeWithLocals - Local Tours & Experiences',
    description:
      'Discover local tours and experiences with local guides.',
    siteName: 'GlobeWithLocals',
    locale: 'en_US',
    alternateLocale: ['en_GB'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlobeWithLocals - Local Tours & Experiences',
    description:
      'Discover local tours and experiences with local guides.',
    creator: '@globewithlocals',
    site: '@globewithlocals',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#10B981',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'TravelAgency'],
  '@id': 'https://www.globewithlocals.com/#organization',
  name: 'GlobeWithLocals',
  description: 'Local tours and experiences with local guides.',
  url: 'https://www.globewithlocals.com',
  email: 'info@globewithlocals.com',
  telephone: '+971521813249',
  taxID: '09BPLPK5079QIZU',
  legalName: 'TajTourGuide',
  parentOrganization: { '@type': 'Organization', name: 'TajTourGuide' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '118 Rani Bagh, Indirapuram',
    addressLocality: 'Agra',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" itemScope itemType="https://schema.org/TravelAgency">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`}</Script>
          </>
        )}
        <LanguageBoot />
        <div id="app-root">
          {children}
          <Footer />
        </div>
        <WhatsAppFloat />
      </body>
    </html>
  )
}
