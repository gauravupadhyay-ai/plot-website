'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Property } from '@/types/property'

const localityCoords: Record<string, [number, number]> = {
  'Waghodia Road': [22.2975, 73.248],
  'Ajwa Road': [22.33, 73.22],
  Jarod: [22.4167, 73.35],
  Subhanpura: [22.32, 73.16],
  Vadodara: [22.3072, 73.1812],
}

function getCoords(plot: Property, index: number): [number, number] {
  if (plot.lat != null && plot.lng != null) return [plot.lat, plot.lng]
  const base = localityCoords[plot.locality] || localityCoords.Vadodara
  // Slight offset so pins don't stack
  const ox = ((index % 3) - 1) * 0.008
  const oy = (Math.floor(index / 3) - 1) * 0.006
  return [base[0] + oy, base[1] + ox]
}

const priceIcon = (label: string) =>
  L.divIcon({
    className: '',
    html: `<div style="background:#0A0A0A;color:#fff;padding:6px 10px;border-radius:999px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 8px 20px rgba(0,0,0,.25)">${label}</div>`,
    iconSize: [90, 28],
    iconAnchor: [45, 14],
  })

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) {
      map.setView(points[0], 13)
      return
    }
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40] })
  }, [map, points])
  return null
}

export default function PlotsMap({ plots }: { plots: Property[] }) {
  const markers = useMemo(
    () =>
      plots.map((plot, i) => ({
        plot,
        position: getCoords(plot, i),
      })),
    [plots]
  )

  const points = markers.map((m) => m.position)
  const center = points[0] || localityCoords.Vadodara

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-border bg-white shadow-card sm:h-[420px] lg:h-[480px]">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {markers.map(({ plot, position }) => (
          <Marker key={plot.code} position={position} icon={priceIcon(plot.priceLabel)}>
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-semibold text-sm">{plot.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{plot.location}</p>
                <p className="text-sm font-bold mt-1">{plot.priceLabel}</p>
                <Link href={`/properties/${plot.slug}`} className="text-xs font-semibold underline mt-2 inline-block">
                  View details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {!plots.length && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm font-semibold text-text-secondary">
          No plots to show on the map
        </div>
      )}
    </div>
  )
}
