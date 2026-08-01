'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X } from 'lucide-react'
import { generalFaqs, buyingFaqs, homeLoanFaqs } from '@/data/faqs'

type ChatMessage = { role: 'user' | 'assistant'; text: string }

const ALL_FAQS = [...generalFaqs, ...buyingFaqs, ...homeLoanFaqs]

function findAnswer(input: string): string {
  const q = input.toLowerCase()
  const scored = ALL_FAQS.map((faq) => {
    const hay = `${faq.question} ${faq.answer}`.toLowerCase()
    const words = q.split(/\s+/).filter((w) => w.length > 2)
    const score = words.reduce((acc, w) => (hay.includes(w) ? acc + 1 : acc), 0)
    return { faq, score }
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored[0]?.score) return scored[0].faq.answer

  return (
    'I can help with plot FAQs — NA status, documentation, localities, budgets, and site visits. ' +
    'Try asking about verification, registration, or plots in Waghodia Road. For a human agent, use the WhatsApp button.'
  )
}

export function AIAssistantFAB() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hi! I’m the Gaurav Plots assistant. Ask me anything about buying plots in Vadodara.',
    },
  ])

  const suggestions = useMemo(
    () => [
      'Do you verify plot titles?',
      'Which areas do you cover?',
      'How do I buy a plot?',
    ],
    []
  )

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: findAnswer(trimmed) },
    ])
    setInput('')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[4.75rem] right-[4.35rem] z-50 group sm:right-[5.5rem] lg:bottom-6"
        aria-label="Chat with AI assistant"
      >
        <span className="absolute inset-0 rounded-full bg-brand-primary/30 animate-pulse-ring" />
        <div className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-brand-primary text-white shadow-cta transition-transform hover:scale-110">
          <Bot size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-full right-0 mb-3 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-medium text-text-primary shadow-card">
            AI assistant
          </div>
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
                <p className="text-sm font-bold">Gaurav Plots AI</p>
                <p className="text-xs text-white/70">FAQ assistant</p>
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
                <div
                  key={`${msg.role}-${i}`}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'ml-auto bg-brand-primary text-white'
                      : 'bg-brand-light text-text-primary'
                  }`}
                >
                  {msg.text}
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
                placeholder="Ask about plots..."
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
