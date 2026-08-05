import Image from 'next/image'
import { heroPlotImages } from '@/data/localities'
import { HeroDesktop, HeroMobileFilters } from '@/components/home/HeroInteractive'
import { HeroMobileIntro } from '@/components/home/HeroMobileIntro'

/**
 * Server Component hero shell.
 * Mobile LCP uses first plot cover; desktop rotates covers in HeroDesktop.
 */
export function HeroSection() {
  const first = heroPlotImages[0]

  return (
    <>
      <section className="bg-brand-light px-2 pb-3 pt-[4.25rem] sm:hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[38dvh] min-h-[240px]">
            <Image
              src={first.src}
              alt={`${first.title} — ${first.locality}`}
              fill
              priority
              sizes="100vw"
              quality={65}
              className="object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 z-[1] bg-black/55" />
            <HeroMobileIntro />
          </div>
        </div>

        <HeroMobileFilters />
      </section>

      <HeroDesktop />
    </>
  )
}
