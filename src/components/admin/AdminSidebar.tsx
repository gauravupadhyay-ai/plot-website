'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Map,
  Users,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { LogoutButton } from '@/app/admin/(dashboard)/LogoutButton'
import { SITE_NAME } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Plots', href: '/admin/properties', icon: Map },
  { name: 'Leads', href: '/admin/leads', icon: Users },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <h2 className="text-xl font-bold font-display text-brand-primary leading-none">
          {SITE_NAME} Admin
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 text-brand-primary hover:bg-brand-light rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 right-0 z-50 w-72 bg-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:left-0 lg:right-auto lg:translate-x-0 lg:border-r lg:shadow-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-brand-primary leading-tight">
                Gaurav
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold">
                Plots Admin
              </p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10 scale-[1.02]'
                      : 'text-gray-600 hover:bg-brand-light hover:text-brand-primary'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={20}
                    className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-primary'}
                  />
                  <span className="font-semibold font-sans">{item.name}</span>
                </div>
                {isActive ? (
                  <ChevronRight size={16} className="text-white/60" />
                ) : (
                  <ChevronRight
                    size={16}
                    className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t mt-auto">
          <div className="bg-brand-light rounded-2xl p-4 border border-border mb-4 hidden lg:block">
            <p className="text-[10px] uppercase font-bold text-text-muted tracking-wider mb-1">
              Session Info
            </p>
            <p className="text-xs text-brand-primary/70 font-medium font-sans">
              Administrator Access
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>
    </>
  )
}
