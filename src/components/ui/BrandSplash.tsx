'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { SITE_NAME } from '@/lib/utils'
import { isMinimalChromeRoute } from '@/lib/routes'

export function BrandSplash() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'hold' | 'open' | 'done'>('idle')
  const skip =
    pathname?.startsWith('/properties') ||
    isMinimalChromeRoute(pathname)

  useEffect(() => {
    if (skip) {
      setPhase('done')
      return
    }
    // Full document loads only (layout mount) — not client-side route changes
    setPhase('hold')
    const openTimer = window.setTimeout(() => setPhase('open'), 1200)
    const doneTimer = window.setTimeout(() => setPhase('done'), 2500)
    return () => {
      window.clearTimeout(openTimer)
      window.clearTimeout(doneTimer)
    }
  }, [skip])

  if (skip || phase === 'idle' || phase === 'done') return null

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#070707]" />

      {/* Left curtain */}
      <motion.div
        className="absolute inset-y-0 left-0 z-20 w-1/2"
        style={{
          background: 'linear-gradient(90deg, #050505 0%, #121212 78%, #1c1c1c 100%)',
          boxShadow: 'inset -16px 0 48px rgba(0,0,0,0.65)',
        }}
        initial={{ x: '0%' }}
        animate={{ x: phase === 'open' ? '-102%' : '0%' }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
      >
        <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#c9a227] to-transparent opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 22px, rgba(201,162,39,0.4) 22px 23px)',
          }}
        />
      </motion.div>

      {/* Right curtain */}
      <motion.div
        className="absolute inset-y-0 right-0 z-20 w-1/2"
        style={{
          background: 'linear-gradient(270deg, #050505 0%, #121212 78%, #1c1c1c 100%)',
          boxShadow: 'inset 16px 0 48px rgba(0,0,0,0.65)',
        }}
        initial={{ x: '0%' }}
        animate={{ x: phase === 'open' ? '102%' : '0%' }}
        transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
      >
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#c9a227] to-transparent opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0 22px, rgba(201,162,39,0.4) 22px 23px)',
          }}
        />
      </motion.div>

      {/* Logo sits above closed curtains, fades as they open */}
      <motion.div
        className="absolute inset-0 z-40 flex flex-col items-center justify-center px-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: phase === 'hold' ? 1 : 0,
          scale: phase === 'hold' ? 1 : 1.08,
          filter: phase === 'open' ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/brand/aurixx-logo.png"
          alt={SITE_NAME}
          width={560}
          height={560}
          priority
          className="h-auto w-[min(78vw,340px)] object-contain drop-shadow-[0_10px_48px_rgba(201,162,39,0.28)]"
        />
        <motion.p
          className="mt-5 text-[11px] font-bold uppercase tracking-[0.38em] text-[#c9a227]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
        >
          Elevating Excellence
        </motion.p>
      </motion.div>
    </div>
  )
}
