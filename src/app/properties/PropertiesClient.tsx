'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { getProperties } from '@/data/properties'
import { localities } from '@/data/localities'
import {
  MapPin, Maximize, Compass, Heart, ArrowRight, SlidersHorizontal, X,
  Shield, TrendingUp, Landmark, BadgeCheck,
} from 'lucide-react'
import { Property } from '@/types/property'
import { formatCurrency } from '@/lib/utils'

const PlotsMap = dynamic(() => import('@/components/property/PlotsMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[320px] items-center justify-center rounded-3xl border border-border bg-white text-sm font-semibold text-text-secondary sm:h-[420px]">
      Loading map…
    </div>
  ),
})

const facingOptions = ['North', 'East', 'South', 'West']
const amenityOptions = [
  'Gated Community',
  '24/7 Security',
  'Park & Green Spaces',
  'Wide Roads',
  'Underground Utilities',
]

const valueProps = [
  { icon: BadgeCheck, title: 'Clear Titles', text: '100% legal verified plots' },
  { icon: Landmark, title: 'Prime Locations', text: 'Well-connected & growing' },
  { icon: TrendingUp, title: 'High Appreciation', text: 'Best long-term returns' },
  { icon: Shield, title: 'Easy Financing', text: 'Loan assistance available' },
]

export function PropertiesClient() {
  const searchParams = useSearchParams()
  const [plots, setPlots] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [localityFilter, setLocalityFilter] = useState('All')
  const [facingFilter, setFacingFilter] = useState<string[]>([])
  const [amenityFilter, setAmenityFilter] = useState<string[]>([])
  const [minArea, setMinArea] = useState(0)
  const [maxArea, setMaxArea] = useState(500)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(20000000)
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [view, setView] = useState<'grid' | 'map'>('grid')

  useEffect(() => {
    const locality = searchParams.get('locality')
    const budget = searchParams.get('budget')
    const area = searchParams.get('area')
    if (locality) setLocalityFilter(locality)
    if (budget === '0-30') { setMinPrice(0); setMaxPrice(3000000) }
    if (budget === '30-50') { setMinPrice(3000000); setMaxPrice(5000000) }
    if (budget === '50-75') { setMinPrice(5000000); setMaxPrice(7500000) }
    if (budget === '75+') { setMinPrice(7500000); setMaxPrice(50000000) }
    if (area === '0-100') { setMinArea(0); setMaxArea(100) }
    if (area === '100-200') { setMinArea(100); setMaxArea(200) }
    if (area === '200+') { setMinArea(200); setMaxArea(2000) }
    if (searchParams.get('filters') === '1' && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowFilters(true)
    }
  }, [searchParams])

  useEffect(() => {
    getProperties().then((data) => {
      setPlots(data.filter((p) => p.type === 'Plot'))
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let result = [...plots]
    if (localityFilter !== 'All') result = result.filter((p) => p.locality === localityFilter)
    result = result.filter((p) => p.area >= minArea && p.area <= maxArea)
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice)
    if (facingFilter.length) {
      result = result.filter((p) => p.facing && facingFilter.includes(p.facing))
    }
    if (amenityFilter.length) {
      result = result.filter((p) => amenityFilter.every((a) => p.amenities?.includes(a)))
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'area-desc': result.sort((a, b) => b.area - a.area); break
      default: result.sort((a, b) => Number(b.featured) - Number(a.featured)); break
    }
    return result
  }, [plots, localityFilter, minArea, maxArea, minPrice, maxPrice, facingFilter, amenityFilter, sortBy])

  const clearFilters = () => {
    setLocalityFilter('All')
    setFacingFilter([])
    setAmenityFilter([])
    setMinArea(0)
    setMaxArea(500)
    setMinPrice(0)
    setMaxPrice(20000000)
    setSortBy('relevance')
  }

  const toggleFacing = (f: string) => {
    setFacingFilter((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
  }
  const toggleAmenity = (a: string) => {
    setAmenityFilter((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]))
  }

  const FilterPanel = (
    <div className="space-y-6 rounded-3xl border border-border bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold">Filters</h3>
        <button type="button" onClick={clearFilters} className="text-xs font-semibold text-text-muted hover:text-text-primary">
          Clear All
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Location</label>
        <select value={localityFilter} onChange={(e) => setLocalityFilter(e.target.value)} className="select !h-11 !text-sm">
          <option value="All">All localities</option>
          {localities.map((loc) => (
            <option key={loc.slug} value={loc.name}>{loc.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Plot Area (sq.yd)</label>
        <div className="mb-2 flex gap-2">
          <input type="number" value={minArea} onChange={(e) => setMinArea(Number(e.target.value) || 0)} className="input !h-10 !text-sm" placeholder="Min" />
          <input type="number" value={maxArea} onChange={(e) => setMaxArea(Number(e.target.value) || 0)} className="input !h-10 !text-sm" placeholder="Max" />
        </div>
        <input type="range" min={0} max={500} value={maxArea} onChange={(e) => setMaxArea(Number(e.target.value))} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Price Range</label>
        <div className="mb-2 flex gap-2 text-xs text-text-secondary">
          <span>{formatCurrency(minPrice)}</span>
          <span className="ml-auto">{formatCurrency(maxPrice)}</span>
        </div>
        <input type="range" min={0} max={20000000} step={100000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Facing</label>
        <div className="grid grid-cols-2 gap-2">
          {facingOptions.map((f) => (
            <label key={f} className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
              <input type="checkbox" checked={facingFilter.includes(f)} onChange={() => toggleFacing(f)} className="accent-brand-primary" />
              {f}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Amenities</label>
        <div className="space-y-2">
          {amenityOptions.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-text-secondary">
              <input type="checkbox" checked={amenityFilter.includes(a)} onChange={() => toggleAmenity(a)} className="accent-brand-primary" />
              {a}
            </label>
          ))}
        </div>
      </div>

      <button type="button" onClick={() => setShowFilters(false)} className="btn-primary w-full lg:hidden">
        Apply Filters
      </button>
    </div>
  )

  return (
    <section className="bg-brand-light px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-text-secondary">
                {loading ? 'Loading plots…' : `${filtered.length} plots available`}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setView(view === 'grid' ? 'map' : 'grid')}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold"
              >
                {view === 'grid' ? 'View on Map' : 'Grid View'}
              </button>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select !h-10 !w-auto !rounded-full !text-sm" aria-label="Sort plots">
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest</option>
              </select>
              <button
                type="button"
                onClick={() => setShowFilters(true)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>
          </div>

          <div id="plot-filters" className="grid scroll-mt-28 gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">{FilterPanel}</aside>

            {showFilters && (
              <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setShowFilters(false)}>
                <div className="absolute bottom-0 right-0 top-0 w-full max-w-sm overflow-y-auto bg-brand-light p-4" onClick={(e) => e.stopPropagation()}>
                  <button type="button" className="mb-3 ml-auto flex rounded-full p-2" onClick={() => setShowFilters(false)}>
                    <X size={18} />
                  </button>
                  {FilterPanel}
                </div>
              </div>
            )}

            <div className="space-y-6">
              {view === 'map' && <PlotsMap plots={filtered} />}

              <p className="text-sm font-semibold text-text-secondary">
                {loading ? 'Loading…' : `${filtered.length} plots found`}
              </p>

              {loading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-[420px] animate-pulse rounded-3xl bg-white" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((plot, i) => (
                    <motion.article
                      key={plot.code}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.04, 0.24) }}
                      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-card"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={plot.images[0] || '/images/hero/hero-plots.jpg'}
                          alt={plot.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          quality={75}
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {plot.featured && (
                          <span className="absolute left-3 top-3 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                            Featured
                          </span>
                        )}
                        <button type="button" className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-text-secondary" aria-label="Save">
                          <Heart size={16} />
                        </button>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-lg font-bold text-text-primary">{plot.title}</h3>
                        <p className="mt-1 font-display text-2xl font-bold tracking-tight">{plot.priceLabel}</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {plot.area} {plot.areaUnit}
                          {plot.pricePerUnit ? ` · ${plot.pricePerUnit}` : ''}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-text-secondary">
                          <MapPin size={14} />
                          {plot.location}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                          {plot.facing && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1">
                              <Compass size={12} /> {plot.facing} Facing
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1">
                            <Maximize size={12} /> {plot.area} {plot.areaUnit}
                          </span>
                        </div>
                        <Link
                          href={`/properties/${plot.slug}`}
                          className="btn-primary mt-5 w-full justify-center !rounded-2xl"
                          aria-label={`View details for ${plot.title}`}
                        >
                          View Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 rounded-3xl border border-border bg-white p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="rounded-2xl bg-brand-light p-3">
                  <item.icon size={20} className="text-brand-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{item.title}</p>
                  <p className="text-sm text-text-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}
