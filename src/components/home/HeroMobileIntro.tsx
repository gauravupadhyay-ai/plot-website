'use client'

import { motion } from 'framer-motion'
import { SITE_NAME } from '@/lib/utils'

export function HeroMobileIntro() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
      }}
      className="relative z-10 flex h-full flex-col justify-end px-4 pb-5"
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
        }}
        className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/95"
      >
        {SITE_NAME}
      </motion.p>
      <motion.h1
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
        }}
        className="font-display text-[1.6rem] font-extrabold leading-[1.12] tracking-tight text-white"
      >
        Find Your Perfect Plot.
      </motion.h1>
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
        }}
        className="mt-1.5 max-w-[17rem] text-[12px] leading-snug text-white/95"
      >
        Verified plots across NCR — clear titles & site visits.
      </motion.p>
    </motion.div>
  )
}
