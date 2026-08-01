'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface ParallaxImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
  sizes?: string
  /** Prefer Tailwind object-* classes via className for responsive positioning */
  objectPosition?: string
  /** Starting scale (1 = no crop from zoom). Default 1.02 */
  baseScale?: number
  /** Extra zoom amount over scroll. Default 0.08 */
  maxZoom?: number
}

/** Subtle zoom-in as the section scrolls through the viewport */
export function ParallaxImage({
  src,
  alt,
  priority,
  className = '',
  sizes = '100vw',
  objectPosition,
  baseScale = 1.02,
  maxZoom = 0.08,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(baseScale)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const view = window.innerHeight || 1
        const progress = 1 - Math.min(Math.max((rect.top + rect.height) / (view + rect.height), 0), 1)
        setScale(baseScale + progress * maxZoom)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [baseScale, maxZoom])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={priority ? 80 : 70}
        className={`will-change-transform object-cover ${className}`}
        style={{
          ...(objectPosition ? { objectPosition } : {}),
          transform: `scale(${scale})`,
          transition: 'transform 80ms linear',
        }}
      />
    </div>
  )
}
