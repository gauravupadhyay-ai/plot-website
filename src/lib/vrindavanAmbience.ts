import type { Property } from '@/types/property'

export const VRINDAVAN_AMBIENCE_TRACKS = [
  '/audio/vrindavan/flute.mp3',
  '/audio/vrindavan/krishna.mp3',
  '/audio/vrindavan/sitar.mp3',
]

const VRINDAVAN_CODES = new Set(['AX-VV-001', 'AX-NS-001', 'AX-RK-001', 'AX-RP-001'])

export function isVrindavanAmbienceProperty(property: Property): boolean {
  if (property.ambientAudio?.length) return true
  if (VRINDAVAN_CODES.has(property.code)) return true
  return /vrindavan/i.test(property.locality || '')
}

export function ambienceTracksFor(property: Property): string[] {
  if (property.ambientAudio?.length) return property.ambientAudio
  return isVrindavanAmbienceProperty(property) ? VRINDAVAN_AMBIENCE_TRACKS : []
}
