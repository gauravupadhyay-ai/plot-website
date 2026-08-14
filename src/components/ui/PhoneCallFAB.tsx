'use client'
import { Phone } from 'lucide-react'
import { CONTACT_PHONES, getCallUrl, getSecondaryCallUrl } from '@/lib/utils'

export function PhoneCallFAB() {
  return (
    <div className="fixed bottom-20 left-6 z-50 flex flex-col gap-2 lg:hidden">
      {CONTACT_PHONES.map((phone, index) => (
        <a
          key={phone}
          href={index === 0 ? getCallUrl() : getSecondaryCallUrl()}
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-primary shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label={`Call ${phone}`}
          title={phone}
        >
          <Phone size={24} className="text-white" />
        </a>
      ))}
    </div>
  )
}
