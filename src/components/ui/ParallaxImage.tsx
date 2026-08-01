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
  /** Starting scale (1 = no crop from zoom). Default 1.06 */
  baseScale?: number
  /** Extra zoom amount over scroll. Default 0.12 */
  maxZoom?: number
  /** Max upward drift in px as the section scrolls. Default 48 */
  maxShift?: number
  /**
   * Skip the /_next/image optimizer (faster LCP for already-compressed local heroes).
   */
  unoptimized?: boolean
}

/** Subtle zoom + Y drift as the section scrolls through the viewport */
export function ParallaxImage({
  src,
  alt,
  priority,
  className = '',
  sizes = '100vw',
  objectPosition,
  baseScale = 1.06,
  maxZoom = 0.12,
  maxShift = 48,
  unoptimized = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Priority LCP images paint flat until after first paint, then motion enables
  const [scale, setScale] = useState(priority ? 1 : baseScale)
  const [shift, setShift] = useState(0)
  const [motionReady, setMotionReady] = useState(!priority)

  useEffect(() => {
    if (!priority) return
    const id = window.setTimeout(() => {
      setMotionReady(true)
      setScale(baseScale)
    }, 400)
    return () => window.clearTimeout(id)
  }, [priority, baseScale])

  useEffect(() => {
    if (!motionReady) return
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
        setShift(progress * maxShift)
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
  }, [baseScale, maxZoom, maxShift, motionReady])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        fetchPriority={priority ? 'high' : undefined}
        sizes={sizes}
        quality={priority ? 75 : 70}
        unoptimized={unoptimized}
        className={`object-cover ${motionReady ? 'will-change-transform' : ''} ${className}`}
        style={{
          ...(objectPosition ? { objectPosition } : {}),
          transform: `translate3d(0, ${shift}px, 0) scale(${scale})`,
          transition: motionReady ? 'transform 80ms linear' : undefined,
        }}
      />
    </div>
  )
}
