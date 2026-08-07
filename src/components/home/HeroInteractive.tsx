'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Search, MapPin, Wallet, Layers, Ruler, ChevronDown, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { searchLocalities, heroPlotImages } from '@/data/localities'
import { SITE_NAME } from '@/lib/utils'

const budgets = [
  { label: 'Any budget', value: '' },
  { label: 'Under ₹30L', value: '0-30' },
  { label: '₹30L – ₹50L', value: '30-50' },
  { label: '₹50L – ₹75L', value: '50-75' },
  { label: '₹75L+', value: '75+' },
]
const plotTypes = [
  { label: 'All listings', value: '' },
  { label: 'Residential plot', value: 'Plot' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Apartment', value: 'Flat / Apartment' },
]
const areas = [
  { label: 'Any size', value: '' },
  { label: 'Up to 100 sq.yd', value: '0-100' },
  { label: '100 – 200 sq.yd', value: '100-200' },
  { label: '200+ sq.yd', value: '200+' },
]

function useHeroSlide() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (heroPlotImages.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroPlotImages.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [])
  return heroPlotImages[index] || heroPlotImages[0]
}

/** Client-only filters + desktop hero (mobile LCP media is server-rendered). */
export function HeroMobileFilters() {
  const router = useRouter()
  const [locality, setLocality] = useState('')
  const [budget, setBudget] = useState('')
  const [plotType, setPlotType] = useState('')
  const [area, setArea] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (plotType) params.set('type', plotType)
    if (locality) params.set('locality', locality)
    if (budget) params.set('budget', budget)
    if (area) params.set('area', area)
    params.set('filters', '1')
    const path =
      plotType === 'Flat / Apartment'
        ? '/highrise'
        : plotType === 'Commercial'
          ? '/commercial'
          : '/properties'
    router.push(`${path}?${params.toString()}#plot-filters`)
  }

  return (
    <div className="relative z-20 -mt-3 mx-0.5 rounded-2xl border border-black/5 bg-white p-3 shadow-filter">
      <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-text-secondary">
        Filter listings
      </p>
      <p className="mb-2.5 font-display text-[15px] font-bold text-text-primary">
        Find your property
      </p>
      <div className="grid grid-cols-1 gap-2">
        {renderSelects('hero-mobile', {
          locality, setLocality, budget, setBudget, plotType, setPlotType, area, setArea,
        })}
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className="mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-primary text-sm font-semibold text-white shadow-cta"
      >
        <Search size={16} />
        Search listings
      </button>
    </div>
  )
}

export function HeroDesktop() {
  const router = useRouter()
  const slide = useHeroSlide()
  const [expanded, setExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [locality, setLocality] = useState('')
  const [budget, setBudget] = useState('')
  const [plotType, setPlotType] = useState('')
  const [area, setArea] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [expanded])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (panelRef.current && !panelRef.current.contains(target)) {
        setExpanded(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [expanded])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (plotType) params.set('type', plotType)
    if (locality) params.set('locality', locality)
    if (budget) params.set('budget', budget)
    if (area) params.set('area', area)
    params.set('filters', '1')
    setExpanded(false)
    const path =
      plotType === 'Flat / Apartment'
        ? '/highrise'
        : plotType === 'Commercial'
          ? '/commercial'
          : '/properties'
    router.push(`${path}?${params.toString()}#plot-filters`)
  }

  const filterState = {
    locality, setLocality, budget, setBudget, plotType, setPlotType, area, setArea,
  }

  return (
    <LayoutGroup>
      <section className="relative hidden overflow-hidden bg-brand-light px-4 pb-8 pt-24 sm:block lg:px-5 lg:pb-10 lg:pt-28">
        <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[2rem] bg-white lg:rounded-[2.5rem]">
          <div className="relative min-h-[74vh] lg:min-h-[80vh]">
            <AnimatePresence mode="sync">
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              >
                <Image
                  src={slide.src}
                  alt={`${slide.title} — ${slide.locality}`}
                  fill
                  sizes="100vw"
                  quality={70}
                  priority
                  className={`object-cover object-center transition-[filter] duration-300 ${expanded ? 'blur-md' : ''}`}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 z-[1] bg-black/55" />

            <div className="relative z-10 flex min-h-[74vh] flex-col justify-between gap-6 px-5 py-7 md:gap-8 md:px-8 md:py-8 lg:min-h-[80vh] lg:px-12 lg:py-10">
              <motion.div
                initial="hidden"
                animate={expanded ? 'dimmed' : 'show'}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
                  dimmed: { opacity: 0.2, transition: { duration: 0.25 } },
                }}
                className="relative mx-auto w-full max-w-3xl pt-6 text-center md:pt-10 lg:pt-14"
              >
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-white"
                >
                  {SITE_NAME}
                </motion.p>
                <motion.h1
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
                >
                  Find Your Perfect Property in NCR.
                </motion.h1>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="mx-auto mt-3 max-w-xl text-sm text-white/95 md:mt-4 md:text-base lg:text-lg"
                >
                  Verified plots and commercial inventory across NCR — Yamuna Expressway, Noida, Greater Noida & Vrindavan.
                </motion.p>
                <motion.p
                  key={slide.title}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/85"
                >
                  Now showing · {slide.title}
                </motion.p>
              </motion.div>

              {!expanded && (
                <motion.div
                  layoutId="plot-filter-panel"
                  onClick={() => setExpanded(true)}
                  className="relative z-30 mx-auto mb-1 w-full max-w-5xl cursor-pointer px-0 sm:w-[96%] lg:w-[80%]"
                >
                  <div className="rounded-3xl border border-black/5 bg-white p-3 shadow-filter md:p-4">
                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-3">
                      <FilterField icon={<MapPin size={18} />} label="Location" expanded={false}>
                        <span className="block truncate text-sm font-semibold text-text-primary">{locality || 'All locations'}</span>
                      </FilterField>
                      <FilterField icon={<Wallet size={18} />} label="Price" expanded={false}>
                        <span className="block truncate text-sm font-semibold text-text-primary">
                          {budgets.find((b) => b.value === budget)?.label || 'Any budget'}
                        </span>
                      </FilterField>
                      <FilterField icon={<Layers size={18} />} label="Type" expanded={false}>
                        <span className="block truncate text-sm font-semibold text-text-primary">
                          {plotTypes.find((t) => t.value === plotType)?.label || 'All listings'}
                        </span>
                      </FilterField>
                      <FilterField icon={<Ruler size={18} />} label="Size" expanded={false}>
                        <span className="block truncate text-sm font-semibold text-text-primary">
                          {areas.find((a) => a.value === area)?.label || 'Any size'}
                        </span>
                      </FilterField>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpanded(true)
                        }}
                        className="col-span-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 text-sm font-semibold text-white shadow-cta lg:col-span-1 lg:h-12 lg:w-auto lg:px-8"
                      >
                        <Search size={16} />
                        Search
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {expanded && (
              <motion.div
                className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  type="button"
                  aria-label="Close filters"
                  className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-[1px]"
                  onClick={() => setExpanded(false)}
                />
                <motion.div
                  ref={panelRef}
                  layoutId="plot-filter-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="plot-filter-title"
                  initial={{ scale: 0.94, opacity: 0.95 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  className="relative z-10 flex max-h-[min(85vh,720px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/95 p-6 shadow-filter backdrop-blur-xl sm:p-7 lg:w-[80%] lg:p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mb-5 flex shrink-0 items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">Filter listings</p>
                      <h2 id="plot-filter-title" className="font-display text-2xl font-bold text-text-primary">
                        Find your property
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded(false)}
                      className="rounded-full bg-brand-light p-2 text-text-secondary hover:text-text-primary"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="grid flex-1 grid-cols-2 content-center gap-5 overflow-y-auto">
                    {renderSelects('hero-desktop', filterState)}
                  </div>
                  <p className="mt-4 shrink-0 text-sm text-text-secondary">
                    Search opens the matching listings page with these filters applied. Click outside to close.
                  </p>
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="mt-4 inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-brand-primary px-8 text-sm font-semibold text-white shadow-cta"
                  >
                    <Search size={16} />
                    Search listings
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </LayoutGroup>
  )
}

type FilterState = {
  locality: string
  setLocality: (v: string) => void
  budget: string
  setBudget: (v: string) => void
  plotType: string
  setPlotType: (v: string) => void
  area: string
  setArea: (v: string) => void
}

function renderSelects(idPrefix: string, state: FilterState) {
  const { locality, setLocality, budget, setBudget, plotType, setPlotType, area, setArea } = state
  return (
    <>
      <FilterField icon={<MapPin size={16} />} label="Location" htmlFor={`${idPrefix}-locality`} expanded>
        <select
          id={`${idPrefix}-locality`}
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm font-semibold text-text-primary outline-none"
        >
          <option value="">All locations</option>
          {searchLocalities.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </FilterField>
      <FilterField icon={<Wallet size={16} />} label="Price" htmlFor={`${idPrefix}-budget`} expanded>
        <select
          id={`${idPrefix}-budget`}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm font-semibold text-text-primary outline-none"
        >
          {budgets.map((b) => (
            <option key={b.label} value={b.value}>{b.label}</option>
          ))}
        </select>
      </FilterField>
      <FilterField icon={<Layers size={16} />} label="Type" htmlFor={`${idPrefix}-plot-type`} expanded>
        <select
          id={`${idPrefix}-plot-type`}
          value={plotType}
          onChange={(e) => setPlotType(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm font-semibold text-text-primary outline-none"
        >
          {plotTypes.map((t) => (
            <option key={t.label} value={t.value}>{t.label}</option>
          ))}
        </select>
      </FilterField>
      <FilterField icon={<Ruler size={16} />} label="Size" htmlFor={`${idPrefix}-area`} expanded>
        <select
          id={`${idPrefix}-area`}
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm font-semibold text-text-primary outline-none"
        >
          {areas.map((a) => (
            <option key={a.label} value={a.value}>{a.label}</option>
          ))}
        </select>
      </FilterField>
    </>
  )
}

function FilterField({
  icon,
  label,
  htmlFor,
  expanded,
  children,
}: {
  icon: React.ReactNode
  label: string
  htmlFor?: string
  expanded: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`relative min-w-0 rounded-2xl border px-3 py-2.5 transition ${
        expanded ? 'border-border bg-brand-light/80' : 'border-transparent hover:bg-brand-light/60'
      }`}
    >
      <div className="mb-0.5 flex min-w-0 items-center gap-1.5 text-text-secondary">
        <span className="shrink-0">{icon}</span>
        {htmlFor ? (
          <label htmlFor={htmlFor} className="truncate text-[10px] font-bold uppercase tracking-wider">
            {label}
          </label>
        ) : (
          <span className="truncate text-[10px] font-bold uppercase tracking-wider">{label}</span>
        )}
        <ChevronDown size={12} className="ml-auto shrink-0 opacity-50" aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
