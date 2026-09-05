import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PageHero } from '@/components/layout/PageHero'
import { CTABanner } from '@/components/home/CTABanner'
import { StatsBar } from '@/components/home/StatsBar'
import { Eye, Target, Heart, Award, Quote, Linkedin } from 'lucide-react'
import { SITE_NAME } from '@/lib/utils'
import { founders } from '@/data/team'

export const metadata: Metadata = {
  title: `About ${SITE_NAME} | Real Estate Specialists in NCR`,
  description: `Learn about ${SITE_NAME} — NCR's trusted real-estate specialists helping families and investors find verified plots, highrise, and commercial property with transparent guidance.`,
}

const credentials = [
  'NAR Certified',
  'CREDAI Member',
  'NCR Network Member',
  'eXp Realty Certified',
  'Digital Certified',
]

const galleryEvents = [
  { src: '/images/gallery-images/6.jpg', caption: 'Investor Meet 2024' },
  { src: '/images/gallery-images/7.jpg', caption: 'Exhibition Stall' },
  { src: '/images/gallery-images/8.jpg', caption: 'At CREDAI Conference' },
  { src: '/images/gallery-images/9.jpg', caption: 'Team Photo' },
  { src: '/images/gallery-images/10.jpg', caption: 'NCR Partner Visit' },
  { src: '/images/gallery-images/11.jpg', caption: 'Office' },
]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      <PageHero
        title={`About ${SITE_NAME}`}
        subtitle="Real-estate specialists helping NCR families invest with clarity."
        image="/images/hero/hero-about.jpg"
        breadcrumb={[{ label: 'About' }]}
        imageClassName="object-cover object-[center_40%] md:object-[center_40%]"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="/images/gallery-images/6.jpg"
                  alt={`The ${SITE_NAME} team`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-2xl shadow-card-hover p-6 max-w-[180px] border border-border/50">
                <div className="font-mono font-bold text-3xl text-brand-primary">5+</div>
                <div className="text-text-secondary text-sm mt-1 font-sans">Years serving NCR</div>
              </div>
            </div>

            <div>
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title text-3xl md:text-4xl mb-6 font-display">
                From Local Expertise to NCR&apos;s{' '}
                <span className="text-brand-primary">Real Estate Specialists</span>
              </h2>
              <div className="text-text-secondary text-lg leading-relaxed space-y-6 font-sans">
                <p>
                  {SITE_NAME} was founded with a clear focus: help people buy property across
                  Greater Noida, Noida, Yamuna Expressway, and Vrindavan with transparency, local
                  insight, and zero pressure. Based at Urbtech Trade Centre, Sector 132, Noida,
                  we guide buyers through verified plots, highrise, and commercial
                  options — so every decision feels informed and secure.
                </p>
                <p>
                  Whether you are buying your first plot to build a home, looking for a highrise
                  apartment, exploring commercial space, or comparing localities across NCR, our
                  team stays with you from shortlist to registration.
                </p>
              </div>

              <div className="mt-8 pl-6 border-l-2 border-brand-primary/30 relative">
                <Quote size={24} className="text-brand-primary/20 absolute -left-3 -top-1" />
                <p className="text-text-secondary italic text-[15px] leading-relaxed font-sans">
                  &ldquo;We don&apos;t just list properties. We help families secure the space where their next
                  chapter begins.&rdquo;
                </p>
                <p className="text-text-primary font-semibold text-sm mt-2 font-sans">
                  — Aryan Yadav &amp; Sukhpreet Singh Kajal, Founders
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-16 md:py-24">
        <div className="section-container">
          <div className="mb-12 text-center">
            <p className="section-eyebrow justify-center">Leadership</p>
            <h2 className="section-title font-display text-3xl md:text-4xl">Meet Our Founders</h2>
            <p className="mx-auto mt-3 max-w-2xl text-text-secondary">
              The partners behind {SITE_NAME} — building a transparent real-estate practice across NCR.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {founders.map((founder) => {
              const initials = founder.name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() || '')
                .join('')
              return (
                <article
                  key={founder.name}
                  className="card-static flex flex-col items-center p-8 text-center !rounded-2xl md:p-10"
                >
                  {founder.image ? (
                    <div className="relative mb-5 h-28 w-28 overflow-hidden rounded-full shadow-lg shadow-brand-primary/15 ring-4 ring-white">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        sizes="112px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-brand-primary font-display text-2xl font-bold text-white shadow-lg shadow-brand-primary/20">
                      {initials}
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-bold text-text-primary">{founder.name}</h3>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wider text-brand-primary">
                    {founder.role}
                  </p>
                  <p className="mt-4 font-sans leading-relaxed text-text-secondary">{founder.bio}</p>
                  {founder.linkedin && (
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-bold text-brand-primary transition hover:bg-brand-primary hover:text-white"
                      aria-label={`${founder.name} on LinkedIn`}
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                content:
                  'Make property buying in NCR clear and trustworthy — so every family feels secure about the home or land they choose.',
              },
              {
                icon: Target,
                title: 'Our Mission',
                content:
                  'Guide every buyer with honest advice, verified listings, and a simple process from enquiry to registration.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                content:
                  'Transparency first. We prioritise clear titles, fair pricing, and support before, during, and after every transaction.',
              },
            ].map((item) => (
              <div key={item.title} className="card-static p-8 text-center !rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon size={28} className="text-brand-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-text-primary mb-4">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed font-sans">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-16 md:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">Credentials</p>
            <h2 className="section-title text-3xl md:text-4xl font-display">
              Our Certifications & Associations
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {credentials.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 px-6 py-4 bg-brand-light rounded-2xl border border-border/50"
              >
                <Award size={20} className="text-brand-primary" />
                <span className="font-semibold text-text-primary font-sans">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="py-16 md:py-24 bg-brand-light">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-eyebrow justify-center">Gallery</p>
            <h2 className="section-title text-3xl md:text-4xl font-display">Our Journey in Pictures</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryEvents.map((photo, i) => (
              <div
                key={photo.caption}
                className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`relative ${i === 0 ? 'h-64 md:h-full' : 'h-48 md:h-56'}`}>
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
                    quality={70}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <span className="text-white text-sm font-medium font-sans">{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
