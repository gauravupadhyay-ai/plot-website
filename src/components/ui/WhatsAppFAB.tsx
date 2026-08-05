'use client'
import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { getWhatsAppUrl } from '@/lib/utils'

export function WhatsAppFAB() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[4.75rem] right-3 z-50 group sm:right-6 lg:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
        <MessageCircle size={28} className="text-white" fill="white" />
      </div>
      <div className="pointer-events-none absolute bottom-full right-0 mb-3 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-medium text-text-primary shadow-card">
          Chat on WhatsApp
        </div>
      </div>
    </a>
  )
}
