/** Routes that use minimal site chrome (no nav, FABs, modals). */
export function isMinimalChromeRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false
  return pathname === '/leads' || pathname.startsWith('/admin')
}
