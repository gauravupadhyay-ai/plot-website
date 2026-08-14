import { Phone } from 'lucide-react'
import { CONTACT_PHONES, getTelUrl } from '@/lib/utils'

type ContactPhoneLinksProps = {
  variant?: 'default' | 'footer'
  iconSize?: number
  asListItems?: boolean
}

export function ContactPhoneLinks({
  variant = 'default',
  iconSize = 20,
  asListItems = false,
}: ContactPhoneLinksProps) {
  const linkClass =
    variant === 'footer'
      ? 'flex items-center gap-3 text-[15px] text-white/60 transition-colors hover:text-white'
      : 'flex items-center gap-3 text-text-secondary text-sm transition hover:text-brand-primary font-sans'

  const iconClass = variant === 'footer' ? 'flex-shrink-0 text-white' : 'text-brand-primary flex-shrink-0'

  return (
    <>
      {CONTACT_PHONES.map((phone) => {
        const link = (
          <a key={phone} href={getTelUrl(phone)} className={linkClass}>
            <Phone size={iconSize} className={iconClass} />
            {phone}
          </a>
        )

        return asListItems ? <li key={phone}>{link}</li> : link
      })}
    </>
  )
}
