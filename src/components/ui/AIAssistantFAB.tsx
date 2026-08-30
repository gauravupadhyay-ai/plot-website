'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X, ExternalLink } from 'lucide-react'
import { seedPlots } from '@/data/seedPlots'
import { categoryFromType, PROPERTY_CATEGORIES } from '@/lib/propertyCategories'
import { isMinimalChromeRoute } from '@/lib/routes'

type ChatMessage = {
  role: 'user' | 'assistant'
  text: string
  links?: { label: string; href: string }[]
}

function inventorySummary() {
  const plots = seedPlots.filter((p) => p.type === 'Plot')
  const highrise = seedPlots.filter((p) => p.type === 'Flat / Apartment' || p.type === 'Independent House')
  const commercial = seedPlots.filter((p) => p.type === 'Commercial')
  return { plots, highrise, commercial }
}

function matchProperties(q: string) {
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2)
  return seedPlots
    .map((p) => {
      const hay = `${p.title} ${p.locality} ${p.location} ${p.type} ${p.code} ${(p.highlights || []).join(' ')}`.toLowerCase()
      const score = words.reduce((acc, w) => (hay.includes(w) ? acc + 1 : acc), 0)
      // Boost direct name hits
      if (q.includes('eldeco') && p.code === 'AX-E7-001') return { p, score: score + 5 }
      if ((q.includes('hari shyam') || q.includes('jewar') || q.includes('hari kripa')) && p.code === 'AX-HS-001')
        return { p, score: score + 5 }
      if ((q.includes('lalita') || q.includes('nandgaon') || q.includes('barsana')) && p.code === 'AX-LK-001')
        return { p, score: score + 5 }
      if ((q.includes('nari') || q.includes('semri') || q.includes('radha rani township')) && p.code === 'AX-NS-001')
        return { p, score: score + 5 }
      if ((q.includes('radha krishna vihar') || q.includes('vrindavan ashram') || q.includes('ashram') || q.includes('asharam')) && p.code === 'AX-RK-001')
        return { p, score: score + 5 }
      if ((q.includes('radha krishna puram') || q.includes('puram')) && p.code === 'AX-RP-001')
        return { p, score: score + 5 }
      if ((q.includes('shubh labh') || q.includes('sukhdev')) && (p.code === 'AX-NS-001' || p.code === 'AX-RK-001' || p.code === 'AX-RP-001'))
        return { p, score: score + 4 }
      if ((q.includes('vrinda') || q.includes('vrindavan')) && p.code === 'AX-VV-001')
        return { p, score: score + 5 }
      if ((q.includes('gaur') || q.includes('chrysalis') || q.includes('aero')) && p.code === 'AX-GC-001')
        return { p, score: score + 5 }
      if ((q.includes('biig') || q.includes('bigtech') || q.includes('knowledge')) && p.code === 'AX-BT-001')
        return { p, score: score + 5 }
      if ((q.includes('urbtech') || q.includes('business suite') || q.includes('npx')) &&
        (p.code === 'AX-UB-001' || p.code === 'AX-NX-001'))
        return { p, score: score + 4 }
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)
}

function detectWantedCategory(q: string): 'plot' | 'highrise' | 'commercial' | null {
  if (/\b(apartment|flat|highrise|high rise|residence|residential tower|2bhk|3bhk|4bhk)\b/.test(q))
    return 'highrise'
  if (/\b(commercial|office|retail|it suite|shop|workspace)\b/.test(q)) return 'commercial'
  if (/\b(plot|land|villa plot|katha|sq\.?\s*yd)\b/.test(q)) return 'plot'
  return null
}

function findAnswer(input: string): ChatMessage {
  const q = input.toLowerCase().trim()
  const { plots, highrise, commercial } = inventorySummary()
  const availableBits = [
    plots.length ? `${plots.length} residential plot listing(s)` : null,
    highrise.length ? `${highrise.length} highrise residence(s)` : null,
    commercial.length ? `${commercial.length} commercial propert(ies)` : null,
  ].filter(Boolean)

  // Coverage / areas
  if (/where|area|localit|cover|noida|vrindavan|greater noida|ncr|expressway/.test(q)) {
    return {
      role: 'assistant',
      text:
        'We focus on NCR — Greater Noida, Noida, Yamuna Expressway, and Vrindavan. Browse plots, highrise residences, and commercial inventory below.',
      links: [
        { label: 'Residential Plots', href: '/properties' },
        { label: 'Highrise', href: '/highrise' },
        { label: 'Commercial', href: '/commercial' },
      ],
    }
  }

  const wanted = detectWantedCategory(q)
  const matched = matchProperties(q)

  if (matched.length) {
    const top = matched.slice(0, 3)
    return {
      role: 'assistant',
      text: `Here ${top.length === 1 ? 'is a match' : 'are matches'} from our live NCR inventory:`,
      links: top.map((p) => ({
        label: `${p.title} · ${p.locality}`,
        href: `/properties/${p.slug}`,
      })),
    }
  }

  if (wanted) {
    const bucket =
      wanted === 'plot' ? plots : wanted === 'highrise' ? highrise : commercial
    if (!bucket.length) {
      const alts = PROPERTY_CATEGORIES.filter((c) => c.id !== wanted)
      return {
        role: 'assistant',
        text: `We don’t currently list that ${wanted} type. Try these available categories instead: ${availableBits.join(', ')}.`,
        links: alts.map((c) => ({ label: c.label, href: c.href })),
      }
    }
    return {
      role: 'assistant',
      text: `We have ${bucket.length} ${wanted === 'plot' ? 'plot' : wanted} option(s). Open a listing or browse the full category:`,
      links: [
        ...bucket.slice(0, 3).map((p) => ({
          label: p.title,
          href: `/properties/${p.slug}`,
        })),
        {
          label: `Browse all ${wanted}`,
          href: categoryFromType(bucket[0].type) === 'highrise'
            ? '/highrise'
            : categoryFromType(bucket[0].type) === 'commercial'
              ? '/commercial'
              : '/properties',
        },
      ],
    }
  }

  if (/buy|purchase|how|process|register|loan|verify|title/.test(q)) {
    return {
      role: 'assistant',
      text:
        'Aurixxrealty helps with end-to-end real estate in NCR — plots, apartments, and commercial assets. We assist with shortlisting, site visits, documentation, and loan guidance. Tell me a locality or project name (e.g. Eldeco, Vrinda Vatika, Urbtech) and I’ll link you there.',
      links: [
        { label: 'Projects', href: '/projects' },
        { label: 'Contact us', href: '/contact' },
      ],
    }
  }

  return {
    role: 'assistant',
    text: `I can help you explore our NCR real estate inventory. Right now we have ${availableBits.join(', ')}. Ask for a project name, locality, or type (plot / highrise / commercial).`,
    links: [
      { label: 'Plots', href: '/properties' },
      { label: 'Highrise', href: '/highrise' },
      { label: 'Commercial', href: '/commercial' },
    ],
  }
}

export function AIAssistantFAB() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hi! I’m the Aurixxrealty assistant for NCR real estate — plots, highrise residences, and commercial properties in Greater Noida, Noida, and Vrindavan. Ask for a project or property type.',
      links: [
        { label: 'Plots', href: '/properties' },
        { label: 'Highrise', href: '/highrise' },
        { label: 'Commercial', href: '/commercial' },
      ],
    },
  ])

  const suggestions = useMemo(
    () => [
      'Show highrise in Greater Noida',
      'Any commercial in Noida?',
      'Plots in Vrindavan',
      'Tell me about Eldeco 7 Peaks',
    ],
    []
  )

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const reply = findAnswer(trimmed)
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }, reply])
    setInput('')
  }

  if (isMinimalChromeRoute(pathname)) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed bottom-[4.75rem] right-[4.35rem] z-50 sm:right-[5.5rem] lg:bottom-6"
        aria-label="Chat with AI assistant"
      >
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-primary/30" />
        <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-primary text-white shadow-cta transition-transform hover:scale-110">
          <Bot size={26} />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-[7.5rem] right-3 z-[60] flex h-[min(62vh,520px)] w-[min(94vw,380px)] flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-filter sm:right-6 lg:bottom-24"
          >
            <div className="flex items-center justify-between border-b border-border bg-brand-primary px-4 py-3 text-white">
              <div>
                <p className="text-sm font-bold">Aurixxrealty AI</p>
                <p className="text-xs text-white/70">NCR property guide</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={`${msg.role}-${i}`} className="space-y-2">
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'ml-auto bg-brand-primary text-white'
                        : 'bg-brand-light text-text-primary'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.links?.length ? (
                    <div className="flex max-w-[95%] flex-col gap-1.5">
                      {msg.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => {
                            setOpen(false)
                            router.push(link.href)
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-brand-primary/20 bg-white px-3 py-2 text-xs font-bold text-brand-primary hover:bg-brand-light"
                        >
                          <ExternalLink size={12} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about plots, highrise, commercial…"
                className="h-11 flex-1 rounded-full border border-border bg-brand-light px-4 text-sm outline-none focus:border-brand-primary"
              />
              <button
                type="submit"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
