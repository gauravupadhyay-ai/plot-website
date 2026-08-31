import { PLOT_LANDING_SLUGS } from '@/lib/plotLandingSlugs'

/** Routes that use minimal site chrome (no nav, FABs, modals). */
export function isMinimalChromeRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  if (pathname === '/leads' || pathname.startsWith('/admin')) return true
  const first = pathname.replace(/\/$/, '').split('/').filter(Boolean)[0]
  return Boolean(first && (PLOT_LANDING_SLUGS as readonly string[]).includes(first))
}
