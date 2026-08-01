'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import { getCallUrl, PHONE_NUMBER } from '@/lib/utils'


const navLinks = [
  { label: 'Plots', href: '/properties' },
  {
    label: 'Our services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Buying a Plot', href: '/services/buying-property' },
      { label: 'Plot Consulting', href: '/services/real-estate-consultant' },
      { label: 'Loan Assistance', href: '/services/home-loan' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'About us', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const toggleDropdown = useCallback((label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label))
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white shadow-nav">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <Link href="/" className="z-10 flex min-w-0 items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white sm:h-9 sm:w-9">
                A
              </span>
              <span className="truncate font-display text-lg font-bold tracking-tight text-text-primary sm:text-xl">
                Aurixrealty
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <div key={link.label} className="group relative">
                  {link.children ? (
                    <button
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-medium transition-all ${
                        isActive(link.href)
                          ? 'text-text-primary'
                          : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-[15px] font-medium transition-all ${
                        isActive(link.href)
                          ? 'text-text-primary'
                          : 'text-text-secondary hover:bg-black/5 hover:text-text-primary'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.children && (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="min-w-[220px] rounded-2xl border border-border bg-white py-2 shadow-card-hover">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-[14px] text-text-secondary transition-colors hover:bg-brand-light hover:text-text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-sm">
                Contact us
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="z-10 rounded-xl p-2 text-text-primary transition-all lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 right-0 top-0 w-[70vw] max-w-[70vw] overflow-y-auto bg-white shadow-card-hover"
            >
              <div className="p-6 pt-24">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      {link.children ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(link.label)}
                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-lg font-semibold text-text-primary"
                          >
                            {link.label}
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === link.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4"
                              >
                                {link.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-lg px-4 py-2.5 text-[15px] text-text-secondary"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl px-4 py-3 text-lg font-semibold text-text-primary"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3 border-t border-border pt-6">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full justify-center"
                  >
                    Contact us
                  </Link>
                  <a href={getCallUrl()} className="btn-secondary w-full justify-center">
                    <Phone size={18} />
                    {PHONE_NUMBER}
                  </a>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
