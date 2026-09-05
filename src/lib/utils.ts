import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  if (amount >= 100000) {
    const lac = amount / 100000
    return `₹${lac % 1 === 0 ? lac.toFixed(0) : lac.toFixed(2)} Lac`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatIndianNumber(num: number): string {
  return num.toLocaleString('en-IN')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919458454789'
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE || '+91 94584 54789'
export const SECONDARY_PHONE_NUMBER = process.env.NEXT_PUBLIC_SECONDARY_PHONE || '+91 97117 60199'
export const CONTACT_PHONES = [PHONE_NUMBER, SECONDARY_PHONE_NUMBER] as const
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aurixxrealty.com'
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Aurixxrealty'

export const OFFICE_ADDRESS =
  'Office No. 701, 7th Floor, Tower A, Urbtech Trade Centre (UTC), Plot No. B-35, Sector 132, Noida, Gautam Buddha Nagar, Uttar Pradesh – 201304, India'

export const OFFICE_ADDRESS_SCHEMA = {
  streetAddress:
    'Office No. 701, 7th Floor, Tower A, Urbtech Trade Centre (UTC), Plot No. B-35, Sector 132',
  addressLocality: 'Noida',
  addressRegion: 'Uttar Pradesh',
  postalCode: '201304',
  addressCountry: 'IN',
} as const

export const OFFICE_MAPS_EMBED =
  'https://www.google.com/maps?q=Urbtech+Trade+Centre+UTC+Plot+B-35+Sector+132+Noida+201304&output=embed'

/** Public / department email aliases */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'contact@aurixxrealty.com'
export const INFO_EMAIL = 'info@aurixxrealty.com'
export const SALES_EMAIL = 'sales@aurixxrealty.com'
export const SUPPORT_EMAIL = 'support@aurixxrealty.com'
export const SOCIALS_EMAIL = 'socials@aurixxrealty.com'
export const ADMIN_EMAIL = 'admin@aurixxrealty.com'

export const EMAIL_ALIASES = [
  { label: 'General', email: CONTACT_EMAIL },
  { label: 'Info', email: INFO_EMAIL },
  { label: 'Sales', email: SALES_EMAIL },
  { label: 'Support', email: SUPPORT_EMAIL },
  { label: 'Socials', email: SOCIALS_EMAIL },
  { label: 'Admin', email: ADMIN_EMAIL },
] as const

export function getWhatsAppUrl(message?: string): string {
  const msg =
    message ||
    "Hello! I found Aurixxrealty and I'm interested in real estate opportunities in NCR (Greater Noida / Noida / Vrindavan)."
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

export function getTelUrl(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`
}

export function getCallUrl(): string {
  return getTelUrl(PHONE_NUMBER)
}

export function getSecondaryCallUrl(): string {
  return getTelUrl(SECONDARY_PHONE_NUMBER)
}
