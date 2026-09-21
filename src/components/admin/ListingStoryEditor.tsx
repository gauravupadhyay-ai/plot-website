'use client'

import { useState } from 'react'
import type { PlotDriveCard, PlotVisualCard, PlotVisualSections } from '@/data/plotVisualSections'
import { AROUND_LAND_STYLES, STOCK_LISTING_IMAGES, TOWNSHIP_STYLES } from '@/lib/listingStory'
import { Plus, Trash2 } from 'lucide-react'

const fieldClass =
  'w-full rounded-2xl border-none bg-gray-50/50 px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-brand-primary/30'
const labelClass = 'block text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary'

function FieldLabel({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="mb-1.5">
      <p className={labelClass}>{label}</p>
      <p className="mt-0.5 text-[11px] font-medium normal-case tracking-normal text-text-muted">({hint})</p>
    </div>
  )
}

function ImagePicker({
  value,
  alt,
  onChange,
  onUpload,
}: {
  value: string
  alt: string
  onChange: (image: string, alt: string) => void
  onUpload: (file: File) => Promise<string>
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const known = STOCK_LISTING_IMAGES.some((image) => image.src === value)
  const selectValue = !value ? '' : known ? value : '__custom__'

  return (
    <div className="space-y-2">
      <FieldLabel label="Image" hint="The photo shown on this card" />
      <select
        value={selectValue}
        onChange={(event) => {
          const next = event.target.value
          if (next === '__custom__') {
            onChange(value && !known ? value : '', alt)
            return
          }
          const stock = STOCK_LISTING_IMAGES.find((image) => image.src === next)
          onChange(next, stock?.label || alt)
        }}
        className={fieldClass}
      >
        <option value="">Choose an image</option>
        {STOCK_LISTING_IMAGES.map((image) => (
          <option key={image.src} value={image.src}>
            {image.label}
          </option>
        ))}
        <option value="__custom__">Custom image URL or upload</option>
      </select>
      {selectValue === '__custom__' ? (
        <input
          type="text"
          value={known ? '' : value}
          onChange={(event) => onChange(event.target.value, alt)}
          className={fieldClass}
          placeholder="https://… or /images/…"
        />
      ) : null}
      <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-brand-primary">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (!file) return
            setUploading(true)
            setError('')
            try {
              const url = await onUpload(file)
              onChange(url, alt || file.name)
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Upload failed')
            } finally {
              setUploading(false)
            }
          }}
        />
        {uploading ? 'Uploading…' : 'Upload a custom image'}
      </label>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

export function ListingStoryEditor({
  value,
  onChange,
  onUpload,
}: {
  value: PlotVisualSections
  onChange: (value: PlotVisualSections) => void
  onUpload: (file: File) => Promise<string>
}) {
  const [open, setOpen] = useState(true)

  const updateCard = (key: 'amenities' | 'connectivity', index: number, patch: Partial<PlotVisualCard>) => {
    const list = value[key].map((card, cardIndex) => (cardIndex === index ? { ...card, ...patch } : card))
    onChange({ ...value, [key]: list })
  }

  const updateDrive = (index: number, patch: Partial<PlotDriveCard>) => {
    const drives = (value.drives || []).map((drive, driveIndex) =>
      driveIndex === index ? { ...drive, ...patch } : drive
    )
    onChange({ ...value, drives })
  }

  return (
    <section className="space-y-8 rounded-[2.5rem] border border-gray-100 bg-white/80 p-6 shadow-sm md:p-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-brand-primary md:text-2xl">Listing story</h3>
          <p className="mt-0.5 text-sm text-text-muted">(The extra blocks that appear under the description on the public page)</p>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">
            Same two blocks as the other listings. Township cards sit under the description. The Corridor
            is the “What’s Actually Rising Around This Land” block: a heading, distance chips, then a
            story for each place. Leave a block empty to hide it.
          </p>
        </div>
        <button type="button" onClick={() => setOpen((current) => !current)} className="text-sm font-semibold text-brand-primary">
          {open ? 'Hide' : 'Show'}
        </button>
      </div>

      {open ? (
        <div className="space-y-10">
          <div className="space-y-4">
            <div>
              <h4 className="font-display text-lg font-bold">Township cards</h4>
              <p className="mt-0.5 text-sm text-text-muted">(Photo cards about what is inside the project, like roads, parks, and shops)</p>
            </div>
            <div>
              <FieldLabel label="Township style" hint="A ready-made heading. Pick Custom heading to write your own." />
              <select
                value={
                  TOWNSHIP_STYLES.find(
                    (style) => style.eyebrow === value.amenitiesEyebrow && style.title === value.amenitiesTitle
                  )?.id || 'custom'
                }
                onChange={(event) => {
                  const style = TOWNSHIP_STYLES.find((item) => item.id === event.target.value)
                  if (!style) return
                  onChange({
                    ...value,
                    amenitiesEyebrow: style.eyebrow,
                    amenitiesTitle: style.title,
                    amenitiesSubtitle: style.subtitle,
                  })
                }}
                className={fieldClass}
              >
                <option value="custom">Custom heading</option>
                {TOWNSHIP_STYLES.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel label="Eyebrow" hint="The small words that sit above the big title" />
                <input
                  value={value.amenitiesEyebrow || ''}
                  onChange={(event) => onChange({ ...value, amenitiesEyebrow: event.target.value })}
                  className={fieldClass}
                  placeholder="40 Acres · 582 Plots"
                />
              </div>
              <div>
                <FieldLabel label="Title" hint="The big heading people read first" />
                <input
                  value={value.amenitiesTitle}
                  onChange={(event) => onChange({ ...value, amenitiesTitle: event.target.value })}
                  className={fieldClass}
                  placeholder="A Township, Not a Scattered Cut"
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel label="Subtitle" hint="One short line under the big heading" />
                <textarea
                  rows={2}
                  value={value.amenitiesSubtitle || ''}
                  onChange={(event) => onChange({ ...value, amenitiesSubtitle: event.target.value })}
                  className={fieldClass}
                  placeholder="Government-approved planning with roads, parks, civic amenities — and RERA on the way."
                />
              </div>
            </div>

            <div className="space-y-4">
              {value.amenities.map((card, index) => (
                <div key={`amenity-${index}`} className="space-y-3 rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Card {index + 1}</p>
                      <p className="mt-0.5 text-[11px] text-text-muted">(One photo card on the public page)</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onChange({ ...value, amenities: value.amenities.filter((_, i) => i !== index) })}
                      className="text-red-500"
                      aria-label="Remove township card"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div>
                    <FieldLabel label="Card title" hint="The short name on the card, like “52 Ft Roads”" />
                    <input
                      value={card.title}
                      onChange={(event) => updateCard('amenities', index, { title: event.target.value })}
                      className={fieldClass}
                      placeholder="52 Ft & 35 Ft Roads"
                    />
                  </div>
                  <div>
                    <FieldLabel label="Card text" hint="One simple sentence about this thing" />
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(event) => updateCard('amenities', index, { description: event.target.value })}
                      className={fieldClass}
                      placeholder="Wide internal roads so the layout stays a township, not a tight village lane."
                    />
                  </div>
                  <ImagePicker
                    value={card.image}
                    alt={card.alt}
                    onUpload={onUpload}
                    onChange={(image, alt) => updateCard('amenities', index, { image, alt })}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    amenities: [...value.amenities, { title: '', description: '', image: '', alt: '' }],
                  })
                }
                className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold"
              >
                <Plus size={16} /> Add township card
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-display text-lg font-bold">The Corridor</h4>
              <p className="mt-0.5 text-sm text-text-muted">(The block about what is coming up around this land)</p>
            </div>
            <div>
              <FieldLabel label="Section style" hint="A ready-made heading, like The Corridor. Pick Custom heading to write your own." />
              <select
                value={
                  AROUND_LAND_STYLES.find(
                    (style) =>
                      style.eyebrow === value.connectivityEyebrow && style.title === value.connectivityTitle
                  )?.id || 'custom'
                }
                onChange={(event) => {
                  const style = AROUND_LAND_STYLES.find((item) => item.id === event.target.value)
                  if (!style) return
                  onChange({
                    ...value,
                    connectivityEyebrow: style.eyebrow,
                    connectivityTitle: style.title,
                    connectivitySubtitle: style.subtitle,
                  })
                }}
                className={fieldClass}
              >
                {AROUND_LAND_STYLES.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
                <option value="custom">Custom heading</option>
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel label="Eyebrow" hint="The small words that sit above the big title, like “The Corridor”" />
                <input
                  value={value.connectivityEyebrow || ''}
                  onChange={(event) => onChange({ ...value, connectivityEyebrow: event.target.value })}
                  className={fieldClass}
                  placeholder="The Corridor"
                />
              </div>
              <div>
                <FieldLabel label="Title" hint="The big heading people read first" />
                <input
                  value={value.connectivityTitle}
                  onChange={(event) => onChange({ ...value, connectivityTitle: event.target.value })}
                  className={fieldClass}
                  placeholder="What's Actually Rising Around This Land"
                />
              </div>
              <div className="md:col-span-2">
                <FieldLabel label="Subtitle" hint="One short line under the big heading" />
                <textarea
                  rows={2}
                  value={value.connectivitySubtitle || ''}
                  onChange={(event) => onChange({ ...value, connectivitySubtitle: event.target.value })}
                  className={fieldClass}
                  placeholder="Nandgaon, Barsana, Govardhan, Vrindavan — the map people already travel."
                />
              </div>
            </div>

            <div className="space-y-3">
              <FieldLabel label="Distance chips" hint="Small tags that say how far a place is, like “25 mins · Jewar Airport”" />
              {(value.drives || []).map((drive, index) => (
                <div key={`drive-${index}`} className="grid gap-2 rounded-2xl border border-border p-3 md:grid-cols-[140px_1fr_1.4fr_auto]">
                  <div>
                    <FieldLabel label="Time" hint="How far, like “25 mins”" />
                    <input
                      value={drive.time}
                      onChange={(event) => updateDrive(index, { time: event.target.value })}
                      className={fieldClass}
                      placeholder="Approx. 5 km"
                    />
                  </div>
                  <div>
                    <FieldLabel label="Place" hint="The place name" />
                    <input
                      value={drive.place}
                      onChange={(event) => updateDrive(index, { place: event.target.value })}
                      className={fieldClass}
                      placeholder="Nandgaon"
                    />
                  </div>
                  <div>
                    <FieldLabel label="Note" hint="A few words about why it matters" />
                    <input
                      value={drive.note || ''}
                      onChange={(event) => updateDrive(index, { note: event.target.value })}
                      className={fieldClass}
                      placeholder="Krishna’s childhood town on the Braj circuit."
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onChange({ ...value, drives: (value.drives || []).filter((_, i) => i !== index) })}
                    className="text-red-500"
                    aria-label="Remove distance chip"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => onChange({ ...value, drives: [...(value.drives || []), { time: '', place: '', note: '' }] })}
                className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold"
              >
                <Plus size={16} /> Add distance
              </button>
            </div>

            <div className="space-y-4">
              <FieldLabel label="Place stories" hint="A photo card with a longer write-up about one nearby place" />
              {value.connectivity.map((card, index) => (
                <div key={`story-${index}`} className="space-y-3 rounded-2xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-text-muted">Story {index + 1}</p>
                      <p className="mt-0.5 text-[11px] text-text-muted">(One nearby place, with a photo)</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({ ...value, connectivity: value.connectivity.filter((_, i) => i !== index) })
                      }
                      className="text-red-500"
                      aria-label="Remove place story"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <FieldLabel label="Tag" hint="A short name on the card, like “Airport”" />
                      <input
                        value={card.tag || ''}
                        onChange={(event) => updateCard('connectivity', index, { tag: event.target.value })}
                        className={fieldClass}
                        placeholder="Nandgaon"
                      />
                    </div>
                    <div>
                      <FieldLabel label="Title" hint="The big line on this card" />
                      <input
                        value={card.title}
                        onChange={(event) => updateCard('connectivity', index, { title: event.target.value })}
                        className={fieldClass}
                        placeholder="Five Kilometres From Krishna’s Childhood Town"
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel label="Card text" hint="A few simple sentences about this place" />
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(event) => updateCard('connectivity', index, { description: event.target.value })}
                      className={fieldClass}
                      placeholder="A plotted township next to a place pilgrims already travel."
                    />
                  </div>
                  <ImagePicker
                    value={card.image}
                    alt={card.alt}
                    onUpload={onUpload}
                    onChange={(image, alt) => updateCard('connectivity', index, { image, alt })}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    connectivity: [...value.connectivity, { tag: '', title: '', description: '', image: '', alt: '' }],
                  })
                }
                className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3 text-sm font-semibold"
              >
                <Plus size={16} /> Add place story
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
