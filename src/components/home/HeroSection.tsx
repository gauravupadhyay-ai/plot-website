import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { HeroDesktop, HeroMobileFilters } from '@/components/home/HeroInteractive'

/**
 * Server Component hero shell.
 * Mobile LCP image paints first; ParallaxImage enables scroll motion after paint.
 */
export function HeroSection() {
  return (
    <>
      {/* ══════════════ MOBILE LCP ══════════════ */}
      <section className="bg-brand-light px-2 pb-3 pt-[4.25rem] sm:hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[38dvh] min-h-[240px]">
            <ParallaxImage
              src="/images/hero/home-hero-bg-mobile.jpg"
              alt="Premium residential plots in Vadodara"
              priority
              sizes="100vw"
              className="object-[center_35%]"
              baseScale={1.04}
              maxZoom={0.1}
              maxShift={28}
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/25 to-black/55" />
            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
                Aurixrealty
              </p>
              <h1 className="font-display text-[1.6rem] font-extrabold leading-[1.12] tracking-tight text-white">
                Find Your Perfect Plot.
              </h1>
              <p className="mt-1.5 max-w-[17rem] text-[12px] leading-snug text-white/90">
                Verified plots in Vadodara — clear titles & site visits.
              </p>
            </div>
          </div>
        </div>

        <HeroMobileFilters />
      </section>

      <HeroDesktop />
    </>
  )
}
