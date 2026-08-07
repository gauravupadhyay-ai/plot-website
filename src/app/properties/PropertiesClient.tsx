'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { localities } from '@/data/localities'
import {
  MapPin, Maximize, Compass, Heart, ArrowRight, SlidersHorizontal, X,
  Shield, TrendingUp, Landmark, BadgeCheck,
} from 'lucide-react'
import { Property } from '@/types/property'
import { formatCurrency } from '@/lib/utils'
import { categoryMeta, type PropertyCategory } from '@/lib/propertyCategories'

function budgetFromParam(budget: string | null): { min: number; max: number } {
  if (budget === '0-30') return { min: 0, max: 3000000 }
  if (budget === '30-50') return { min: 3000000, max: 5000000 }
  if (budget === '50-75') return { min: 5000000, max: 7500000 }
  if (budget === '75+') return { min: 7500000, max: 50000000 }
  return { min: 0, max: 50000000 }
}

function areaFromParam(area: string | null): { min: number; max: number } {
  if (area === '0-100') return { min: 0, max: 100 }
  if (area === '100-200') return { min: 100, max: 200 }
  if (area === '200+') return { min: 200, max: 5000 }
  return { min: 0, max: 5000 }
}

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

const valuePropsByCategory: Record<
  PropertyCategory,
  { icon: typeof BadgeCheck; title: string; text: string }[]
> = {
  plot: [
    { icon: BadgeCheck, title: 'Clear Titles', text: 'Legally verified land parcels' },
    { icon: Landmark, title: 'Prime NCR Corridors', text: 'Expressway, Greater Noida, Vrindavan' },
    { icon: TrendingUp, title: 'Long-term Growth', text: 'Infrastructure-led appreciation' },
    { icon: Shield, title: 'Loan Support', text: 'Plot & construction finance help' },
  ],
  highrise: [
    { icon: BadgeCheck, title: 'Trusted Developers', text: 'RERA-aware residential projects' },
    { icon: Landmark, title: 'Greater Noida Focus', text: 'Omicron, Yamuna Expressway living' },
    { icon: TrendingUp, title: 'Ready Demand', text: 'End-user & investor friendly stock' },
    { icon: Shield, title: 'Home Loan Help', text: 'Banking partners & paperwork support' },
  ],
  commercial: [
    { icon: BadgeCheck, title: 'Investment Grade', text: 'IT suites, retail & office inventory' },
    { icon: Landmark, title: 'Noida / GN Business Hubs', text: 'Knowledge Park & Sector 153 belt' },
    { icon: TrendingUp, title: 'Rental Potential', text: 'Assets built for occupancy demand' },
    { icon: Shield, title: 'Deal Support', text: 'Site visits, docs & closing guidance' },
  ],
}

function PlotCards({ plots }: { plots: Property[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {plots.map((plot, i) => (
        <article
          key={plot.code}
          className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-card"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
            <Image
              src={plot.images[0] || '/images/hero/hero-plots.jpg'}
              alt={plot.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 45vw, 30vw"
                        quality={45}
                        priority={i < 2}
                        loading={i < 2 ? 'eager' : 'lazy'}
              className="object-cover object-center"
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
            <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-lg font-bold leading-snug text-text-primary">
              {plot.title}
            </h3>
            <p className="mt-1 truncate font-display text-2xl font-bold tracking-tight">
              {plot.priceOnRequest || plot.priceLabel === 'Price on Request'
                ? 'Price on Request'
                : plot.priceLabel}
            </p>
            <p className="mt-1 truncate text-sm text-text-secondary">
              {plot.areaLabel ||
                (plot.area > 0
                  ? `${plot.area} ${plot.areaUnit}${plot.pricePerUnit ? ` · ${plot.pricePerUnit}` : ''}`
                  : plot.type === 'Commercial'
                    ? 'Commercial · Freehold'
                    : 'Villa plots · Freehold')}
            </p>
            <div className="mt-2 flex h-5 items-center gap-1.5 text-sm text-text-secondary">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{plot.locality || plot.location}</span>
            </div>
            <div className="mt-3 flex h-7 items-center gap-2 text-xs text-text-muted">
              {plot.facing ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1">
                  <Compass size={12} /> {plot.facing} Facing
                </span>
              ) : (
                <span className="invisible inline-flex items-center gap-1 rounded-full bg-brand-light px-2.5 py-1">
                  <Compass size={12} /> Facing
                </span>
              )}
              <span className="inline-flex max-w-[60%] items-center gap-1 truncate rounded-full bg-brand-light px-2.5 py-1">
                <Maximize size={12} className="shrink-0" />
                <span className="truncate">
                  {plot.areaLabel || (plot.area > 0 ? `${plot.area} ${plot.areaUnit}` : 'Sizes on request')}
                </span>
              </span>
            </div>
            <div className="mt-auto pt-5">
              <Link
                href={`/properties/${plot.slug}`}
                className="btn-primary w-full justify-center !rounded-2xl"
                aria-label={`View details for ${plot.title}`}
              >
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function PropertiesClient({
  initialPlots,
  category = 'plot',
}: {
  initialPlots: Property[]
  category?: PropertyCategory
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialBudget = budgetFromParam(searchParams.get('budget'))
  const initialArea = areaFromParam(searchParams.get('area'))
  const meta = categoryMeta(category)
  const valueProps = valuePropsByCategory[category]
  const listingWord =
    category === 'highrise' ? 'residences' : category === 'commercial' ? 'properties' : 'plots'

  const [plots] = useState<Property[]>(initialPlots)
  const [localityFilter, setLocalityFilter] = useState(searchParams.get('locality') || 'All')
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All')
  const [facingFilter, setFacingFilter] = useState<string[]>([])
  const [amenityFilter, setAmenityFilter] = useState<string[]>([])
  const [minArea, setMinArea] = useState(initialArea.min)
  const [maxArea, setMaxArea] = useState(initialArea.max)
  const [minPrice, setMinPrice] = useState(initialBudget.min)
  const [maxPrice, setMaxPrice] = useState(initialBudget.max)
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [view, setView] = useState<'grid' | 'map'>('grid')

  useEffect(() => {
    const locality = searchParams.get('locality')
    const type = searchParams.get('type')
    const budget = budgetFromParam(searchParams.get('budget'))
    const area = areaFromParam(searchParams.get('area'))
    setLocalityFilter(locality || 'All')
    setTypeFilter(type || 'All')
    setMinPrice(budget.min)
    setMaxPrice(budget.max)
    setMinArea(area.min)
    setMaxArea(area.max)
    if (searchParams.get('filters') === '1' && typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowFilters(true)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...plots]
    if (localityFilter !== 'All') {
      result = result.filter((p) => p.locality === localityFilter)
    }
    if (typeFilter !== 'All' && typeFilter) {
      result = result.filter((p) => p.type === typeFilter)
    }
    // Area: skip when size is "on request" (area 0 / areaLabel)
    result = result.filter((p) => {
      if (p.type !== 'Plot') return true
      if (!p.area || p.area <= 0 || p.areaLabel) return true
      return p.area >= minArea && p.area <= maxArea
    })
    // Price: price-on-request listings match any budget
    result = result.filter((p) => {
      if (p.priceOnRequest || p.priceLabel === 'Price on Request' || !p.price) return true
      return p.price >= minPrice && p.price <= maxPrice
    })
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
  }, [plots, localityFilter, typeFilter, minArea, maxArea, minPrice, maxPrice, facingFilter, amenityFilter, sortBy])

  const clearFilters = () => {
    setLocalityFilter('All')
    setTypeFilter('All')
    setFacingFilter([])
    setAmenityFilter([])
    setMinArea(0)
    setMaxArea(5000)
    setMinPrice(0)
    setMaxPrice(50000000)
    setSortBy('relevance')
    router.replace(meta.href, { scroll: false })
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
        <input type="range" min={0} max={5000} value={Math.min(maxArea, 5000)} onChange={(e) => setMaxArea(Number(e.target.value))} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">Price Range</label>
        <div className="mb-2 flex gap-2 text-xs text-text-secondary">
          <span>{formatCurrency(minPrice)}</span>
          <span className="ml-auto">{formatCurrency(maxPrice)}</span>
        </div>
        <input type="range" min={0} max={50000000} step={100000} value={Math.min(maxPrice, 50000000)} onChange={(e) => setMaxPrice(Number(e.target.value))} />
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
                {filtered.length} {listingWord} available in NCR
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
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select !h-10 !w-auto !rounded-full !text-sm" aria-label={`Sort ${listingWord}`}>
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
                {filtered.length} {listingWord} found
              </p>

              {filtered.length === 0 ? (
                <div className="space-y-8">
                  <div className="rounded-3xl border border-border bg-white px-6 py-10 text-center shadow-card">
                    <p className="font-display text-2xl font-bold text-text-primary">
                      Nothing matches that filter right now
                    </p>
                    <p className="mx-auto mt-2 max-w-lg text-sm text-text-secondary">
                      We don&apos;t have {listingWord} for that selection. Browse what&apos;s available in{' '}
                      {meta.label.toLowerCase()} below, or explore other inventory.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="btn-primary inline-flex justify-center !rounded-2xl"
                      >
                        Clear filters
                      </button>
                      <a href="/properties" className="btn-secondary inline-flex justify-center !rounded-2xl">
                        Plots
                      </a>
                      <a href="/highrise" className="btn-secondary inline-flex justify-center !rounded-2xl">
                        Highrise
                      </a>
                      <a href="/commercial" className="btn-secondary inline-flex justify-center !rounded-2xl">
                        Commercial
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="mb-4 text-sm font-semibold text-text-secondary">
                      Available {listingWord} right now
                    </p>
                    <PlotCards plots={plots} />
                  </div>
                </div>
              ) : (
                <PlotCards plots={filtered} />
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
