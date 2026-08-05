'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (pathname?.startsWith('/admin')) return null

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[9.5rem] right-3 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white shadow-card transition-all duration-300 hover:bg-black sm:right-6 lg:bottom-24 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ChevronUp size={20} />
    </button>
  )
}
