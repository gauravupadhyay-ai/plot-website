'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, CheckCircle2, Download, MapPin,
  MessageCircle, Phone, ShieldCheck, Star, Maximize2, X, ZoomIn, ZoomOut,
} from 'lucide-react'
import { Property } from '@/types/property'
import { getCallUrl, getSecondaryCallUrl, getTelUrl, getWhatsAppUrl, CONTACT_PHONES, SITE_NAME } from '@/lib/utils'
import { GoogleReviewCard, GoogleMark, GoogleStars } from '@/components/ui/GoogleReviewCard'

export function PlotDetailView({
  property,
  similar,
}: {
  property: Property
  similar: Property[]
}) {
  type MediaItem = { type: 'image' | 'video'; src: string }

  const media = useMemo<MediaItem[]>(() => {
    const seen = new Set<string>()
    const items: MediaItem[] = []
    const push = (type: 'image' | 'video', src: string) => {
      const key = `${type}:${src.split('?')[0]}`
      const base = src.split('/').pop()?.toLowerCase() || src
      if (seen.has(key) || seen.has(base)) return
      seen.add(key)
      seen.add(base)
      items.push({ type, src })
    }
    // Videos first, then images
    ;(property.videos || []).forEach((src) => push('video', src))
    ;(property.images?.length ? property.images : ['/images/hero/hero-plots.jpg']).forEach((src) =>
      push('image', src)
    )
    return items
  }, [property.images, property.videos])

  // Start on first image for fast LCP (videos stay first in the thumb strip)
  const initialActive = useMemo(() => {
    const imgIdx = media.findIndex((m) => m.type === 'image')
    return imgIdx >= 0 ? imgIdx : 0
  }, [media])
  const [active, setActive] = useState(initialActive)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [showAllThumbs, setShowAllThumbs] = useState(false)
  const [loadPanorama, setLoadPanorama] = useState(false)
  const current = media[active] || media[0]
  const thumbEntries = useMemo(
    () => (showAllThumbs ? media : media.slice(0, 8)).map((item, i) => ({ item, idx: i })),
    [media, showAllThumbs]
  )
  const isLcp =
    current?.type === 'image' &&
    current.src === (property.images?.[0] || media.find((m) => m.type === 'image')?.src)
  const priceDocuments = useMemo(() => {
    return (property.documents || []).filter((doc) => {
      const text = `${doc.label} ${doc.url}`.toLowerCase()
      if (/brochure|flyer|sales[\s_-]?ppt|sales[\s_-]?plan|floor[\s_-]?plan|\.pptx?\b/.test(text)) {
        return false
      }
      return /price/.test(text)
    })
  }, [property.documents])
  const priceOnRequest = Boolean(property.priceOnRequest) || property.priceLabel === 'Price on Request'
  const pricePer = property.pricePerUnit || `₹${Math.round(property.price / Math.max(property.area, 1)).toLocaleString('en-IN')} / ${property.areaUnit}`

  const whatsappMsg = priceOnRequest
    ? `Hi! I'm interested in ${property.title} (${property.code}) at ${property.location}. Please share availability and pricing via ${SITE_NAME}.`
    : `Hi! I'm interested in the plot ${property.title} (${property.code}) priced at ${property.priceLabel}. Please share more details via ${SITE_NAME}.`

  const specs = useMemo(() => {
    const rows = [
      {
        label:
          property.type === 'Commercial'
            ? 'Area'
            : property.type === 'Flat / Apartment'
              ? 'Unit Size'
              : 'Plot Area',
        value:
          property.areaLabel ||
          (property.area > 0 ? `${property.area} ${property.areaUnit}` : 'On request'),
      },
      { label: 'Ownership', value: property.ownership || 'Freehold' },
      { label: 'Status', value: property.status || 'Available' },
    ]
    if (property.facing) rows.splice(1, 0, { label: 'Facing', value: property.facing })
    return rows
  }, [property])

  const next = () => setActive((i) => (i + 1) % media.length)
  const prev = () => setActive((i) => (i - 1 + media.length) % media.length)

  const openPreview = () => {
    if (current?.type !== 'image') return
    setZoom(1)
    setPreviewOpen(true)
  }
  const closePreview = () => {
    setPreviewOpen(false)
    setZoom(1)
  }
  const zoomIn = () => setZoom((z) => Math.min(3, Math.round((z + 0.25) * 100) / 100))
  const zoomOut = () => setZoom((z) => Math.max(1, Math.round((z - 0.25) * 100) / 100))

  useEffect(() => {
    if (!previewOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview()
      if (e.key === '+' || e.key === '=') zoomIn()
      if (e.key === '-') zoomOut()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [previewOpen])

  const categoryLabel =
    property.type === 'Commercial'
      ? 'Commercial'
      : property.type === 'Flat / Apartment'
        ? 'Apartment'
        : 'Residential Plot'
  const panoramaEmbed = property.panoramaUrl || ''

  return (
    <div className="bg-brand-light px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-[90rem]">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <Link href="/" className="hover:text-text-primary">Home</Link>
          <span>›</span>
          <Link href="/properties" className="hover:text-text-primary">Plots</Link>
          <span>›</span>
          <span className="text-text-secondary">{categoryLabel}</span>
          <span>›</span>
          <span className="font-medium text-text-primary">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-8">
          {/* Left */}
          <div className="min-w-0 space-y-8">
            <div>
              <div className="relative aspect-[16/10] max-h-[380px] w-full overflow-hidden rounded-3xl bg-neutral-950 shadow-card sm:max-h-[420px] lg:max-h-[460px]">
                {current?.type === 'video' ? (
                  <video
                    key={current.src}
                    controls
                    playsInline
                    preload="none"
                    className="absolute inset-0 h-full w-full object-contain"
                    src={current.src}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={openPreview}
                    className="absolute inset-0 cursor-zoom-in"
                    aria-label="Preview image"
                  >
                    <Image
                      src={current?.src || '/images/hero/hero-plots.jpg'}
                      alt={property.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      quality={60}
                      className="object-contain object-center"
                      priority={isLcp}
                      fetchPriority={isLcp ? 'high' : 'auto'}
                    />
                  </button>
                )}
                <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                  {property.featured && (
                    <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white">★ Featured</span>
                  )}
                  {property.status && (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-text-primary">{property.status}</span>
                  )}
                  {current?.type === 'video' && (
                    <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">Video</span>
                  )}
                </div>
                {current?.type === 'image' && (
                  <button
                    type="button"
                    onClick={openPreview}
                    className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-text-primary shadow-card"
                    aria-label="Open image preview"
                  >
                    <Maximize2 size={14} /> Preview
                  </button>
                )}
                <div className="absolute bottom-4 left-4 z-10 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                  Verified Listing
                </div>
                <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {active + 1}/{media.length}
                </div>
                {media.length > 1 && (
                  <>
                    <button type="button" onClick={prev} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-card" aria-label="Previous">
                      <ArrowLeft size={18} />
                    </button>
                    <button type="button" onClick={next} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-card" aria-label="Next">
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {previewOpen && current?.type === 'image' && (
                <div
                  className="fixed inset-0 z-[120] flex flex-col bg-black"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Image preview"
                >
                  <div className="relative z-20 flex shrink-0 items-center justify-between gap-3 border-b border-white/15 bg-black px-4 py-3 shadow-lg sm:px-6">
                    <p className="min-w-0 truncate text-sm font-semibold text-white">{property.title}</p>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={zoomOut}
                        disabled={zoom <= 1}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Zoom out"
                      >
                        <ZoomOut size={18} />
                      </button>
                      <span className="min-w-[3.25rem] rounded-full bg-white/20 px-2 py-1 text-center text-xs font-bold text-white">
                        {Math.round(zoom * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={zoomIn}
                        disabled={zoom >= 3}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Zoom in"
                      >
                        <ZoomIn size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={closePreview}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-md"
                        aria-label="Close preview"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                  <div
                    className="relative z-10 flex min-h-0 flex-1 items-center justify-center overflow-auto overscroll-contain px-4 py-6"
                    onClick={closePreview}
                  >
                    <div
                      className="relative mx-auto h-[min(70vh,720px)] w-full max-w-5xl transition-transform duration-200 will-change-transform"
                      style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image
                        src={current.src}
                        alt={`${property.title} preview`}
                        fill
                        sizes="100vw"
                        quality={90}
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="relative z-20 flex shrink-0 items-center justify-center gap-3 border-t border-white/15 bg-black px-4 py-3 sm:hidden">
                    <button
                      type="button"
                      onClick={zoomOut}
                      disabled={zoom <= 1}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-bold text-black disabled:opacity-40"
                    >
                      <ZoomOut size={18} /> Zoom out
                    </button>
                    <button
                      type="button"
                      onClick={zoomIn}
                      disabled={zoom >= 3}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-bold text-black disabled:opacity-40"
                    >
                      <ZoomIn size={18} /> Zoom in
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {thumbEntries.map(({ item, idx }) => (
                  <button
                    key={`${item.type}-${item.src}-${idx}`}
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 bg-neutral-900 ${
                      active === idx ? 'border-brand-primary' : 'border-transparent'
                    }`}
                  >
                    {item.type === 'video' ? (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-white">
                        Video
                      </span>
                    ) : (
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="96px"
                        quality={35}
                        loading="lazy"
                        className="object-contain object-center"
                      />
                    )}
                  </button>
                ))}
              </div>
              {media.length > 8 && !showAllThumbs && (
                <button
                  type="button"
                  onClick={() => setShowAllThumbs(true)}
                  className="mt-2 text-sm font-bold text-text-secondary underline-offset-2 hover:underline"
                >
                  Show all {media.length} media
                </button>
              )}
            </div>

            {property.highlights?.length > 0 && (
              <section>
                <h2 className="mb-4 font-display text-2xl font-bold">Key Highlights</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {property.highlights.slice(0, 6).map((h) => (
                    <div key={h} className="rounded-2xl border border-border bg-white p-4 text-sm font-semibold text-text-primary shadow-card">
                      <CheckCircle2 size={16} className="mb-2 text-emerald-600" />
                      {h}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="grid gap-6 lg:grid-cols-1">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-card">
                <h2 className="mb-3 font-display text-2xl font-bold">Description</h2>
                {property.description.split('\n\n').map((para) => (
                  <p key={para.slice(0, 24)} className="mt-3 text-[15px] leading-relaxed text-text-secondary first:mt-0">
                    {para}
                  </p>
                ))}
                {property.amenities && property.amenities.length > 0 && (
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {property.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-2 text-sm text-text-primary">
                        <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {(property.nearbyPlaces?.length || 0) > 0 && (
              <section className="rounded-3xl border border-border bg-white p-6 shadow-card">
                <h2 className="mb-4 font-display text-2xl font-bold">Location and Connectivity</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.nearbyPlaces!.map((place) => (
                    <div
                      key={`${place.name}-${place.distance}`}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-brand-light px-4 py-3"
                    >
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
                        <MapPin size={14} className="shrink-0 text-brand-primary" />
                        {place.name}
                      </span>
                      <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-text-muted">
                        {place.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(property.panoramaUrl || property.panoramaLink) && (
              <section className="rounded-3xl border border-border bg-white p-5 shadow-card sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl font-bold">360° Preview</h2>
                  {property.panoramaLink && (
                    <a
                      href={property.panoramaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2 !px-4 text-sm"
                    >
                      Open full 360°
                    </a>
                  )}
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-brand-light">
                  {panoramaEmbed ? (
                    loadPanorama ? (
                      <iframe
                        title={`${property.title} 360 degree preview`}
                        src={panoramaEmbed}
                        className="absolute inset-0 h-full w-full border-0"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setLoadPanorama(true)}
                        className="absolute inset-0 flex items-center justify-center bg-brand-light text-sm font-bold text-text-primary"
                      >
                        Load 360° preview
                      </button>
                    )
                  ) : (
                    <a
                      href={property.panoramaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-text-primary underline"
                    >
                      View 360° photosphere
                    </a>
                  )}
                </div>
              </section>
            )}

            {(property.reviews?.length || 0) > 0 && (
              <section className="rounded-3xl border border-[#e8eaed] bg-[#f8f9fa] p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <GoogleMark />
                    <h2 className="font-display text-xl font-bold text-[#202124] sm:text-2xl">Google reviews</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#202124]">
                      {property.ratingAvg?.toFixed(1) || '4.5'}
                    </span>
                    <GoogleStars rating={Math.round(property.ratingAvg || 5)} />
                    <span className="text-xs text-[#70757a]">
                      ({property.ratingCount || property.reviews?.length})
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {property.reviews!.map((review) => (
                    <GoogleReviewCard
                      key={review.id}
                      name={review.author}
                      quote={review.comment}
                      rating={Math.round(review.rating)}
                      timeLabel={review.date ? new Date(review.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recently'}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="min-w-0 space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-border bg-white p-5 shadow-card sm:p-6">
              <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-text-secondary">
                {categoryLabel}
              </span>
              <h1 className="mt-3 font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl lg:text-[1.35rem] lg:leading-snug xl:text-2xl">
                {property.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                {priceDocuments.length ? (
                  <>
                    <p className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                      {property.priceLabel}
                    </p>
                    {property.pricePerUnit && (
                      <p className="pb-1 text-sm text-text-secondary">Starting rate</p>
                    )}
                  </>
                ) : priceOnRequest ? (
                  <p className="font-display text-2xl font-bold text-text-primary sm:text-3xl">Price on Request</p>
                ) : (
                  <>
                    <p className="font-display text-3xl font-bold">{property.priceLabel}</p>
                    <p className="pb-1 text-sm text-text-secondary">{pricePer}</p>
                  </>
                )}
              </div>
              {!priceOnRequest && !priceDocuments.length && (
                <Link href="/tools/emi-calculator" className="mt-2 inline-block text-sm font-semibold text-text-primary underline-offset-2 hover:underline">
                  EMI Calculator
                </Link>
              )}

              {(property.documents?.length ? (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Downloads</p>
                  <div className="flex flex-col gap-2">
                    {property.documents.map((doc) => (
                      <a
                        key={doc.url}
                        href={doc.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 rounded-2xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Download size={16} strokeWidth={2.25} />
                          {doc.label}
                        </span>
                        <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                          {doc.url.split('.').pop()?.toUpperCase() || 'FILE'}
                        </span>
                      </a>
                    ))}
                  </div>
                  <p className="pt-1 text-xs leading-relaxed text-text-muted">
                    *Price subject to terms. Confirm current starting price before booking.
                  </p>
                </div>
              ) : null)}

              <div className="mt-5 grid grid-cols-2 gap-3">
                {specs.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-brand-light p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">{s.label}</p>
                    <p className="mt-1 text-sm font-semibold text-text-primary">{s.value}</p>
                  </div>
                ))}
              </div>

              {priceOnRequest ? (
                <>
                  <Link href="/contact" className="btn-primary mt-5 w-full justify-center !rounded-2xl">
                    Contact Us <ArrowRight size={16} />
                  </Link>
                  <a href={getCallUrl()} className="btn-secondary mt-3 w-full justify-center !rounded-2xl">
                    <Phone size={16} /> Call Us
                  </a>
                  <a href={getSecondaryCallUrl()} className="btn-secondary mt-3 w-full justify-center !rounded-2xl">
                    <Phone size={16} /> Call {CONTACT_PHONES[1]}
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={getWhatsAppUrl(whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-5 w-full justify-center !rounded-2xl"
                  >
                    Book a Site Visit <ArrowRight size={16} />
                  </a>
                  <a href={getCallUrl()} className="btn-secondary mt-3 w-full justify-center !rounded-2xl">
                    <Phone size={16} /> Get Callback
                  </a>
                  <a href={getSecondaryCallUrl()} className="btn-secondary mt-3 w-full justify-center !rounded-2xl">
                    <Phone size={16} /> Call {CONTACT_PHONES[1]}
                  </a>
                </>
              )}
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
                  A
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Aurixxrealty Advisor</p>
                  <p className="text-xs text-text-secondary">Plot Consultant · NCR</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-sm font-semibold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {property.ratingAvg?.toFixed(1) || '4.8'}
                <span className="text-text-muted">({property.ratingCount || 120}+ Reviews)</span>
              </div>
              <a
                href={getWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-text-primary"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <div className="mt-3 space-y-2">
                {CONTACT_PHONES.map((phone) => (
                  <a
                    key={phone}
                    href={getTelUrl(phone)}
                    className="flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-brand-primary"
                  >
                    <Phone size={16} /> {phone}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white p-5 shadow-card">
              <h3 className="font-display text-lg font-bold">Location</h3>
              <p className="mt-2 flex items-start gap-2 text-sm text-text-secondary">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>
                  <span className="font-semibold text-text-primary">Site office</span>
                  <br />
                  {property.location}
                </span>
              </p>
              {property.slug.includes('vrinda-vatika') && (
                <p className="mt-3 text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">Head office</span>
                  <br />
                  1502B, Supertech Astralis Supernova, Sector-94, Noida – 201313
                </p>
              )}
              <div className="relative mt-4 h-36 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#e8eaed,#f3f4f6)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-brand-primary px-3 py-1.5 text-xs font-bold text-white shadow-cta">
                    Exact plot after enquiry
                  </div>
                </div>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-text-muted">
                <ShieldCheck size={14} /> Verified listing by {SITE_NAME}
              </p>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 font-display text-2xl font-bold">Similar Plots</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {similar.map((p) => (
                <Link
                  key={p.code}
                  href={`/properties/${p.slug}`}
                  className="w-[260px] shrink-0 overflow-hidden rounded-3xl border border-border bg-white shadow-card"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.images[0] || '/images/hero/hero-plots.jpg'}
                      alt={p.title}
                      fill
                      sizes="260px"
                      quality={40}
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-1 font-semibold text-text-primary">{p.title}</p>
                    <p className="mt-1 font-display text-lg font-bold">
                      {p.priceOnRequest || p.priceLabel === 'Price on Request' ? 'Price on Request' : p.priceLabel}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {p.area > 0 ? `${p.area} ${p.areaUnit}` : 'Villa plots'}
                      {p.facing ? ` · ${p.facing}` : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
