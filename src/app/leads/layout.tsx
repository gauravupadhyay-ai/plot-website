import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Find Your Plot in NCR | ${SITE_NAME}`,
  description: `Get a free callback from ${SITE_NAME} for verified residential plots and property across Greater Noida, Noida, and Yamuna Expressway.`,
  robots: { index: false, follow: false },
}

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  return children
}
