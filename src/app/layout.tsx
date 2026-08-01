import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Outfit, Manrope, Space_Mono } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import { MobileBottomNav } from '@/components/ui/MobileBottomNav'
import { PHONE_NUMBER, SITE_NAME, SITE_URL } from '@/lib/utils'

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
    default: 'Aurixrealty — Premium Residential Plots in Vadodara',
    template: '%s | Aurixrealty',
  },
  description:
    'Aurixrealty specializes in verified residential plots across Vadodara. Find NA plots, clear-title land, and upcoming plotted projects in Waghodia Road, Ajwa Road, Subhanpura & more.',
  keywords: [
    'plots in Vadodara',
    'residential plots Vadodara',
    'NA plots Vadodara',
    'plot for sale Waghodia Road',
    'Aurixrealty',
    'buy plot Vadodara',
    'land for sale Vadodara',
    'Gujarat plots',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'Aurixrealty — Premium Residential Plots in Vadodara',
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
              name: 'Aurixrealty',
              description:
                'Vadodara plot specialists helping buyers find verified residential land with clear titles.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Kubereshwar Rd, Goverdhan Twp, Kendranagar',
                addressLocality: 'Vadodara',
                addressRegion: 'Gujarat',
                postalCode: '390025',
                addressCountry: 'IN',
              },
              telephone: PHONE_NUMBER,
              email: 'contact@aurixrealty.com',
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
