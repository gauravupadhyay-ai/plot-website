/** Pull a pin from a pasted Google Maps place or Street View link. */
export function coordsFromMapsUrl(url?: string | null): { lat: number; lng: number } | null {
  if (!url) return null
  const precise = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/)
  if (precise) return { lat: Number(precise[1]), lng: Number(precise[2]) }
  const at = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
  if (at) return { lat: Number(at[1]), lng: Number(at[2]) }
  return null
}
