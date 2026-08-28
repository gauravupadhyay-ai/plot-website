import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Outfit, Manrope, Space_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { MobileBottomNav } from '@/components/ui/MobileBottomNav'
import { CONTACT_EMAIL, CONTACT_PHONES, SITE_NAME, SITE_URL } from '@/lib/utils'

const WhatsAppFAB = dynamic(
  () => import('@/components/ui/WhatsAppFAB').then((m) => m.WhatsAppFAB),
  { ssr: false }
)
const AIAssistantFAB = dynamic(
  () => import('@/components/ui/AIAssistantFAB').then((m) => m.AIAssistantFAB),
  { ssr: false }
)
const UpcomingProjectModal = dynamic(
  () => import('@/components/ui/UpcomingProjectModal').then((m) => m.UpcomingProjectModal),
  { ssr: false }
)
const BrandSplash = dynamic(
  () => import('@/components/ui/BrandSplash').then((m) => m.BrandSplash),
  { ssr: false }
)
const BackToTop = dynamic(
  () => import('@/components/ui/BackToTop').then((m) => m.BackToTop),
  { ssr: false }
)

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
  preload: true,
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '600', '700'],
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
  // Mono is rarely above-the-fold — keep it off the critical path
  preload: false,
})

export const metadata: Metadata = {
  title: {
    default: 'Aurixxrealty | Real Estate in Greater Noida, Noida & Vrindavan',
    template: '%s | Aurixxrealty',
  },
  description:
    'Aurixxrealty is an NCR real estate partner for residential plots, highrise residences, and commercial properties across Greater Noida, Noida, Yamuna Expressway, and Vrindavan.',
  keywords: [
    'real estate Greater Noida',
    'plots Yamuna Expressway',
    'apartments Greater Noida',
    'commercial Noida',
    'BiiGTecH Knowledge Park 3',
    'Aurixxrealty',
    'buy property NCR',
    'Vrindavan plots',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Aurixxrealty | Real Estate in Greater Noida, Noida & Vrindavan',
    }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Aurixxrealty',
              description:
                'NCR real estate specialists helping buyers find verified plots, residences, and commercial inventory with clear titles.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Greater Noida & Yamuna Expressway corridor',
                addressLocality: 'Greater Noida',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201310',
                addressCountry: 'IN',
              },
              areaServed: ['Greater Noida', 'Noida', 'Yamuna Expressway', 'Vrindavan', 'NCR'],
              telephone: [...CONTACT_PHONES],
              email: CONTACT_EMAIL,
              url: SITE_URL,
              priceRange: '₹₹',
              openingHours: 'Mo-Sa 09:00-19:00',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '132',
              },
            }),
          }}
        />
      </head>
      <body className="bg-brand-light text-text-primary antialiased font-sans pb-16 lg:pb-0">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <BrandSplash />
        {children}
        <WhatsAppFAB />
        <AIAssistantFAB />
        <UpcomingProjectModal />
        <BackToTop />
        <MobileBottomNav />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
