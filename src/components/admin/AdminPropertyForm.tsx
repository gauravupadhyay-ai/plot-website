'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import {
  Info,
  TrendingUp,
  Plus,
  Tag,
  ChevronRight,
  Trash2,
  Video,
  Image as ImageIcon,
  MapPin,
  Globe2,
} from 'lucide-react'

export type AdminPropertyRecord = {
  id?: string
  slug?: string
  code: string
  title: string
  type: string
  location: string
  locality: string
  price: number | string
  price_label: string
  bhk?: string
  bedrooms?: number | string
  bathrooms?: number | string
  area: number | string
  area_unit?: string
  description: string
  badge?: string
  images?: string[]
  videos?: string[]
  map_embed_url?: string | null
  lat?: number | string | null
  lng?: number | string | null
  panorama_url?: string | null
  panorama_link?: string | null
  highlights?: string[]
  amenities?: string[]
  status?: string
  facing?: string
  ownership?: string
}

export function AdminPropertyForm({
  mode,
  initial,
}: {
  mode: 'add' | 'edit'
  initial?: AdminPropertyRecord
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [code, setCode] = useState(initial?.code || `AX-${Math.floor(Math.random() * 10000)}`)
  const [title, setTitle] = useState(initial?.title || '')
  const [type, setType] = useState(initial?.type || 'Plot')
  const [location, setLocation] = useState(initial?.location || '')
  const [locality, setLocality] = useState(initial?.locality || '')
  const [price, setPrice] = useState(String(initial?.price ?? ''))
  const [priceLabel, setPriceLabel] = useState(initial?.price_label || 'Price on Request')
  const [bhk, setBhk] = useState(initial?.bhk || 'N/A')
  const [bedrooms, setBedrooms] = useState(String(initial?.bedrooms ?? '0'))
  const [bathrooms, setBathrooms] = useState(String(initial?.bathrooms ?? '0'))
  const [area, setArea] = useState(String(initial?.area ?? ''))
  const [areaUnit, setAreaUnit] = useState(initial?.area_unit || 'sq.yd')
  const [description, setDescription] = useState(initial?.description || '')
  const [badge, setBadge] = useState(initial?.badge || 'For Sale')
  const [mapEmbedUrl, setMapEmbedUrl] = useState(initial?.map_embed_url || '')
  const [lat, setLat] = useState(initial?.lat != null ? String(initial.lat) : '')
  const [lng, setLng] = useState(initial?.lng != null ? String(initial.lng) : '')
  const [panoramaUrl, setPanoramaUrl] = useState(initial?.panorama_url || '')
  const [panoramaLink, setPanoramaLink] = useState(initial?.panorama_link || '')
  const [highlightsText, setHighlightsText] = useState((initial?.highlights || []).join('\n'))
  const [amenitiesText, setAmenitiesText] = useState((initial?.amenities || []).join('\n'))
  const [status, setStatus] = useState(initial?.status || 'Available')
  const [facing, setFacing] = useState(initial?.facing || '')
  const [ownership, setOwnership] = useState(initial?.ownership || 'Freehold')

  const [existingImages, setExistingImages] = useState<string[]>(initial?.images || [])
  const [existingVideos, setExistingVideos] = useState<string[]>(initial?.videos || [])
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [videoFiles, setVideoFiles] = useState<File[]>([])

  const coverPreview = coverFile
    ? URL.createObjectURL(coverFile)
    : existingImages[0] || null
  const galleryPreviews = [
    ...existingImages.slice(coverFile || !existingImages.length ? 0 : 1).map((url) => ({ type: 'url' as const, src: url })),
    ...galleryFiles.map((file) => ({ type: 'file' as const, src: URL.createObjectURL(file), file })),
  ]

  const isPlot = type === 'Plot'

  const handleTypeChange = (nextType: string) => {
    setType(nextType)
    if (nextType === 'Plot') {
      setBhk('N/A')
      setBedrooms('0')
      setBathrooms('0')
      setAreaUnit('sq.yd')
    } else {
      setAreaUnit('sq.ft')
      if (bhk === 'N/A') setBhk('')
      if (bedrooms === '0') setBedrooms('1')
      if (bathrooms === '0') setBathrooms('1')
    }
  }

  const uploadFiles = async (files: File[], prefix: string) => {
    const urls: string[] = []
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${prefix}-${index}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: uploadError } = await supabase.storage.from('properties').upload(fileName, file)
      if (uploadError) throw uploadError
      const { data: pubData } = supabase.storage.from('properties').getPublicUrl(fileName)
      urls.push(pubData.publicUrl)
    }
    return urls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let imageUrls = [...existingImages]
      if (coverFile) {
        const [coverUrl] = await uploadFiles([coverFile], 'cover')
        imageUrls = [coverUrl, ...existingImages.slice(1)]
      }
      if (galleryFiles.length) {
        const galleryUrls = await uploadFiles(galleryFiles, 'gallery')
        imageUrls = [...imageUrls, ...galleryUrls]
      }
      if (!imageUrls.length) throw new Error('Please add at least one cover image')

      let videoUrls = [...existingVideos]
      if (videoFiles.length) {
        videoUrls = [...videoUrls, ...(await uploadFiles(videoFiles, 'video'))]
      }

      const slug =
        mode === 'edit' && initial?.slug
          ? initial.slug
          : `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.random().toString(36).slice(2, 6)}`

      const highlights = highlightsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
      const amenities = amenitiesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      const payload = {
        slug,
        code,
        title,
        type,
        location,
        locality,
        price: Number(price) || 0,
        price_label: priceLabel,
        bhk: isPlot ? bhk || 'N/A' : bhk,
        bedrooms: Number(bedrooms || 0),
        bathrooms: Number(bathrooms || 0),
        area: Number(area) || 0,
        area_unit: areaUnit,
        description,
        badge,
        status,
        facing: facing.trim() || null,
        ownership: ownership.trim() || null,
        highlights,
        amenities,
        images: imageUrls,
        videos: videoUrls,
        featured: true,
        map_embed_url: mapEmbedUrl.trim() || null,
        lat: lat.trim() ? Number(lat) : null,
        lng: lng.trim() ? Number(lng) : null,
        panorama_url: panoramaUrl.trim() || null,
        panorama_link: panoramaLink.trim() || null,
      }

      const saveErrorHint = (message: string) => {
        if (/column|schema|panorama|map_embed|lat|lng/i.test(message)) {
          return `${message} — run supabase_admin_location_360.sql in the Supabase SQL Editor, then try again.`
        }
        return message
      }

      if (mode === 'edit' && initial?.id) {
        const { error: dbError } = await supabase.from('properties').update(payload).eq('id', initial.id)
        if (dbError) throw new Error(saveErrorHint(dbError.message))
      } else if (mode === 'edit') {
        const { data: existing } = await supabase
          .from('properties')
          .select('id')
          .eq('code', code)
          .maybeSingle()
        if (existing?.id) {
          const { error: dbError } = await supabase.from('properties').update(payload).eq('id', existing.id)
          if (dbError) throw new Error(saveErrorHint(dbError.message))
        } else {
          const { error: dbError } = await supabase.from('properties').insert([payload])
          if (dbError) throw new Error(saveErrorHint(dbError.message))
        }
      } else {
        // Adding an extra plot — reject duplicate codes so Edit is used for previous listings
        const { data: existing } = await supabase
          .from('properties')
          .select('id')
          .eq('code', code)
          .maybeSingle()
        if (existing?.id) {
          throw new Error(
            `Listing code ${code} already exists. Open Plots → Edit to update that previous listing.`
          )
        }
        const { error: dbError } = await supabase.from('properties').insert([payload])
        if (dbError) throw new Error(saveErrorHint(dbError.message))
      }

      router.push('/admin/properties')
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error saving plot'
      setError(message)
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-6 py-4 bg-gray-50/50 border-none rounded-2xl focus:ring-2 focus:ring-brand-primary/30 text-sm font-medium'
  const labelClass =
    'text-[10px] font-bold text-brand-primary block uppercase tracking-[0.2em] ml-1'

  return (
    <div className="mx-auto mb-20 max-w-4xl">
      <header className="mb-8 space-y-2">
        <h1 className="font-display text-3xl font-bold text-brand-primary">
          {mode === 'edit' ? 'Edit existing listing' : 'Add new plot'}
        </h1>
        <p className="text-sm text-text-secondary">
          {mode === 'edit'
            ? 'Update a previously saved listing — title, price, media, map location, and 360° links.'
            : 'Create an extra plot listing. Include map location and a 360° / Street View link below.'}
        </p>
      </header>

      {error && <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-8 rounded-[2.5rem] border border-gray-100 bg-white/80 p-6 shadow-sm md:p-12">
          <div className="mb-2 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-primary shadow-inner">
              <Info size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brand-primary md:text-2xl">Plot Identity</h3>
              <p className="text-xs text-gray-500 md:text-sm">Foundational listing identifiers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="col-span-1 md:col-span-2">
              <label className={`${labelClass} mb-2`}>Plot Title *</label>
              <div className="relative">
                <Tag size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border-2 border-transparent bg-gray-50/50 py-4 pl-14 pr-6 text-lg shadow-inner focus:border-brand-primary/20 focus:bg-white focus:ring-0"
                  placeholder="e.g. Eldeco 7 Peaks Residence"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Listing Code</label>
              <input required type="text" value={code} onChange={(e) => setCode(e.target.value)} className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Inventory Type</label>
              <select
                required
                value={type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full appearance-none rounded-2xl border-none bg-gray-50/50 px-6 py-4 font-semibold text-brand-primary focus:ring-2 focus:ring-brand-primary/30"
              >
                <option value="Plot">Plot</option>
                <option value="Flat / Apartment">Flat / Apartment</option>
                <option value="Independent House">Independent House</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>City / Address area</label>
              <input
                required
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputClass}
                placeholder="e.g. Greater Noida, Uttar Pradesh"
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Neighborhood / Locality</label>
              <input
                required
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className={inputClass}
                placeholder="e.g. Omicron 1A, Greater Noida"
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Badge</label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full rounded-2xl border-none bg-gray-50/50 px-6 py-4 font-semibold focus:ring-2 focus:ring-brand-primary/30"
              >
                <option value="For Sale">For Sale</option>
                <option value="Hot Deal">Hot Deal</option>
                <option value="New">New</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border-none bg-gray-50/50 px-6 py-4 font-semibold focus:ring-2 focus:ring-brand-primary/30"
              >
                <option value="Available">Available</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Facing</label>
              <input
                type="text"
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                className={inputClass}
                placeholder="e.g. East, North-East"
              />
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Ownership</label>
              <input
                type="text"
                value={ownership}
                onChange={(e) => setOwnership(e.target.value)}
                className={inputClass}
                placeholder="Freehold"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className={labelClass}>Highlights (one per line)</label>
              <textarea
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                rows={4}
                className={inputClass}
                placeholder="Authority-approved villa plots&#10;Near Jewar Airport"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className={labelClass}>Amenities (one per line)</label>
              <textarea
                value={amenitiesText}
                onChange={(e) => setAmenitiesText(e.target.value)}
                rows={4}
                className={inputClass}
                placeholder="Clubhouse&#10;24x7 Security"
              />
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-[2.5rem] border-2 border-brand-primary/15 bg-brand-light/40 p-6 shadow-sm md:p-12">
          <div className="mb-2 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-inner">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brand-primary md:text-2xl">
                Location &amp; 360° view
              </h3>
              <p className="text-xs text-gray-600 md:text-sm">
                {mode === 'add'
                  ? 'Add map coordinates and a 360° / Street View link for this new plot.'
                  : 'Update map location and 360° links for this existing listing.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-2 md:col-span-2">
              <label className={labelClass}>Google Map Embed URL</label>
              <input
                type="text"
                value={mapEmbedUrl}
                onChange={(e) => setMapEmbedUrl(e.target.value)}
                className={inputClass}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Latitude</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className={inputClass}
                placeholder="28.4744"
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Longitude</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className={inputClass}
                placeholder="77.5040"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className={`${labelClass} flex items-center gap-2`}>
                <Globe2 size={12} /> 360° Embed URL (iframe src)
              </label>
              <input
                type="text"
                value={panoramaUrl}
                onChange={(e) => setPanoramaUrl(e.target.value)}
                className={inputClass}
                placeholder="Paste Google Street View / photosphere embed URL"
              />
              <p className="ml-1 text-[11px] text-text-muted">
                From Google Maps → Share → Embed a map → copy the iframe <code>src</code>.
              </p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className={labelClass}>360° Open Link (button on listing page)</label>
              <input
                type="text"
                value={panoramaLink}
                onChange={(e) => setPanoramaLink(e.target.value)}
                className={inputClass}
                placeholder="https://maps.app.goo.gl/... or Street View share link"
              />
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-[2.5rem] border border-gray-100 bg-white/80 p-6 shadow-sm md:p-12">
          <div className="mb-2 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-primary shadow-inner">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brand-primary md:text-2xl">
                Valuation &amp; Metrics
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-2">
              <label className={labelClass}>Hard Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass}
                placeholder="0 for Price on Request"
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Marketing Label</label>
              <input
                required
                type="text"
                value={priceLabel}
                onChange={(e) => setPriceLabel(e.target.value)}
                className={inputClass}
                placeholder="Price on Request"
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>{isPlot ? 'Plot Area' : 'Floor Area'}</label>
              <div className="flex overflow-hidden rounded-2xl bg-gray-50/50 focus-within:ring-2 focus-within:ring-brand-primary/30">
                <input
                  required
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="flex-1 border-none bg-transparent px-6 py-4 font-bold focus:ring-0"
                />
                <input
                  type="text"
                  value={areaUnit}
                  onChange={(e) => setAreaUnit(e.target.value)}
                  className="w-24 bg-brand-primary text-center text-[10px] font-black uppercase tracking-widest text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>BHK / Config</label>
              <input type="text" value={bhk} onChange={(e) => setBhk(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Bedrooms</label>
              <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Bathrooms</label>
              <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} className={inputClass} />
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-[2.5rem] border border-gray-100 bg-white/80 p-6 shadow-sm md:p-12">
          <div className="mb-2 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-primary shadow-inner">
              <ImageIcon size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brand-primary md:text-2xl">Visual Assets</h3>
            </div>
          </div>

          <div className="space-y-4">
            <label className={labelClass}>Main Cover Image {mode === 'add' ? '*' : ''}</label>
            <div className="relative aspect-[4/3] max-w-sm overflow-hidden rounded-3xl border-2 border-dashed border-border bg-gray-50/30">
              {coverPreview ? (
                <>
                  <Image src={coverPreview} alt="Cover" fill unoptimized className="object-cover" sizes="400px" />
                  <button
                    type="button"
                    onClick={() => {
                      setCoverFile(null)
                      if (existingImages.length) setExistingImages((prev) => prev.slice(1))
                    }}
                    className="absolute right-3 top-3 rounded-xl bg-white/90 p-2 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <label className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center">
                  <input
                    required={mode === 'add' && !existingImages.length}
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  />
                  <Plus size={20} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Select Cover</span>
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <label className={labelClass}>Gallery</label>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {galleryPreviews.map((item, index) => (
                <div key={`${item.src}-${index}`} className="relative aspect-square overflow-hidden rounded-2xl border">
                  <Image src={item.src} alt="" fill unoptimized className="object-cover" sizes="160px" />
                  <button
                    type="button"
                    onClick={() => {
                      if (item.type === 'file') {
                        setGalleryFiles((prev) => prev.filter((f) => f !== item.file))
                      } else {
                        setExistingImages((prev) => prev.filter((url) => url !== item.src))
                      }
                    }}
                    className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <label className="relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => {
                    if (!e.target.files) return
                    setGalleryFiles((prev) => [...prev, ...Array.from(e.target.files!)])
                  }}
                />
                <Plus size={18} />
                <span className="mt-1 text-[10px] font-bold uppercase">Add</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <label className={`${labelClass} flex items-center gap-2`}>
              <Video size={14} /> Videos
            </label>
            <div className="space-y-2">
              {existingVideos.map((url) => (
                <div key={url} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-xs">
                  <span className="truncate">{url.split('/').pop()}</span>
                  <button type="button" onClick={() => setExistingVideos((prev) => prev.filter((v) => v !== url))} className="text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {videoFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-xs">
                  <span className="truncate">{file.name}</span>
                  <button type="button" onClick={() => setVideoFiles((prev) => prev.filter((_, i) => i !== index))} className="text-red-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-6 text-sm font-bold">
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (!e.target.files) return
                    setVideoFiles((prev) => [...prev, ...Array.from(e.target.files!)])
                  }}
                />
                <Plus size={16} /> Add Videos
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-gray-100 bg-white/80 p-6 shadow-sm md:p-12">
          <label className="mb-6 block font-display text-xl font-bold text-brand-primary md:text-2xl">
            Plot Description
          </label>
          <textarea
            required
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-[2rem] border-none bg-gray-50/50 px-6 py-6 text-base leading-relaxed focus:ring-2 focus:ring-brand-primary/30 md:px-8"
          />
        </section>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-4 rounded-[2rem] bg-brand-primary py-6 text-xl font-bold text-white shadow-2xl transition hover:bg-black/90 disabled:opacity-50"
        >
          {loading ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Publish Plot Listing'}
          <ChevronRight size={24} className="text-white/60" />
        </button>
      </form>
    </div>
  )
}
