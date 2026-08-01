import Image from 'next/image'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

interface PageHeroProps {
  title: string
  subtitle?: string
  image: string
  breadcrumb: { label: string; href?: string }[]
  /**
   * Tailwind object-position / object-fit classes.
   * Default biases toward the lower portion of the photo so faces/subjects
   * sit in frame instead of empty ceiling/sky.
   */
  imageClassName?: string
  /** Scrim over the image for title contrast */
  overlayClassName?: string
}

/**
 * Server-rendered page hero for fast LCP.
 * Uses a plain next/image (no client parallax / will-change) so the cover
 * can paint in the initial HTML before hydration.
 */
export function PageHero({
  title,
  subtitle,
  image,
  breadcrumb,
  imageClassName = 'object-cover object-[center_88%] md:object-[center_80%]',
  overlayClassName = 'bg-gradient-to-b from-black/55 via-black/30 to-black/40',
}: PageHeroProps) {
  const isLocal = image.startsWith('/')

  return (
    <section className="bg-brand-light px-3 pb-5 pt-20 sm:px-5 sm:pb-8 sm:pt-24 lg:px-6 lg:pt-28">
      {/* Preload LCP cover for this page */}
      {isLocal && (
        <link rel="preload" as="image" href={image} fetchPriority="high" />
      )}

      <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]">
        <div className="relative flex min-h-[48vh] items-start justify-start sm:min-h-[52vh] md:min-h-[56vh] md:items-center md:justify-center lg:min-h-[60vh]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={75}
              className={imageClassName}
            />
          </div>
          <div className={`absolute inset-0 z-[1] ${overlayClassName}`} />

          <div className="relative z-10 w-full px-4 pb-16 pt-6 text-left sm:px-8 sm:pb-20 sm:pt-8 md:px-12 md:py-16 md:text-center lg:px-12 lg:py-16">
            <div className="flex max-w-3xl flex-col items-start md:mx-auto md:items-center">
              <Breadcrumb items={breadcrumb} />
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:mt-4 sm:text-4xl md:text-5xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 max-w-xl text-sm text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:mt-3 sm:text-base md:text-lg">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
