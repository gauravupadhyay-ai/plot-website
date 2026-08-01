'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Layers, Map, Phone } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Layers, label: 'Plots', href: '/properties' },
  { icon: Map, label: 'Projects', href: '/projects' },
  { icon: Phone, label: 'Contact', href: '/contact' },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-full transition-colors ${
                isActive ? 'text-brand-primary' : 'text-text-secondary'
              }`}
              aria-label={item.label}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} aria-hidden="true" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
