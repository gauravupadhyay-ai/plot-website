'use client'

import Image from 'next/image'
import type { PlotVisualSections as PlotVisualSectionsData } from '@/data/plotVisualSections'

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 font-display text-2xl font-bold text-text-primary md:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{subtitle}</p> : null}
    </div>
  )
}

export function PlotVisualSections({ sections }: { sections: PlotVisualSectionsData }) {
  return (
    <div className="space-y-8">
      {/* Amenities */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
        <SectionHead
          eyebrow={sections.amenitiesEyebrow}
          title={sections.amenitiesTitle}
          subtitle={sections.amenitiesSubtitle}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sections.amenities.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-border bg-brand-light/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  quality={55}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-display text-lg font-bold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Connectivity */}
      <section className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-8">
        <SectionHead
          eyebrow={sections.connectivityEyebrow}
          title={sections.connectivityTitle}
          subtitle={sections.connectivitySubtitle}
        />

        {sections.drives?.length ? (
          <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sections.drives.map((drive) => (
              <div
                key={`${drive.place}-${drive.time}`}
                className="rounded-2xl border border-border bg-brand-light px-4 py-4"
              >
                <p className="font-display text-xl font-bold text-brand-primary">{drive.time}</p>
                <p className="mt-1 text-sm font-bold text-text-primary">{drive.place}</p>
                {drive.note ? (
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">{drive.note}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <div className="space-y-10">
          {sections.connectivity.map((item, index) => {
            const reverse = index % 2 === 1
            return (
              <article
                key={item.title}
                className={`grid items-center gap-6 border-t border-border pt-10 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-10 ${
                  reverse ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={55}
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div>
                  {item.tag ? (
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-primary">{item.tag}</p>
                  ) : null}
                  <h3 className="mt-2 font-display text-xl font-bold text-text-primary md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">{item.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
