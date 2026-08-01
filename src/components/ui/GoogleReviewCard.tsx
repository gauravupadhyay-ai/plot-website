import { Star } from 'lucide-react'

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function GoogleMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

export function GoogleStars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, j) => (
        <Star
          key={j}
          size={14}
          className={j < full ? 'fill-[#FABB05] text-[#FABB05]' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  )
}

export interface GoogleReviewCardProps {
  name: string
  quote: string
  rating: number
  meta?: string
  timeLabel?: string
}

export function GoogleReviewCard({
  name,
  quote,
  rating,
  meta,
  timeLabel = '2 months ago',
}: GoogleReviewCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#e8eaed] bg-white p-5 shadow-[0_1px_2px_rgba(60,64,67,.12),0_1px_3px_1px_rgba(60,64,67,.08)] transition hover:shadow-[0_1px_3px_rgba(60,64,67,.16),0_4px_8px_3px_rgba(60,64,67,.1)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a73e8] text-sm font-semibold text-white">
            {initials(name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#202124]">{name}</p>
            <p className="text-xs text-[#70757a]">
              {meta ? `${meta} · ` : ''}
              {timeLabel}
            </p>
          </div>
        </div>
        <GoogleMark />
      </div>
      <GoogleStars rating={rating} />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#3c4043] line-clamp-5">{quote}</p>
      <p className="mt-4 text-xs font-medium text-[#1a73e8]">Posted on Google</p>
    </article>
  )
}

export function GoogleReviewsHeader({
  title = 'What plot buyers say',
  score = '4.9',
}: {
  title?: string
  score?: string
}) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="mb-2 flex items-center gap-2">
        <GoogleMark size={20} />
        <p className="text-sm font-semibold text-[#70757a]">Google Reviews</p>
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-[#202124] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-3xl font-bold text-[#202124]">{score}</span>
        <div>
          <GoogleStars rating={5} />
          <p className="mt-0.5 text-xs text-[#70757a]">Based on buyer feedback</p>
        </div>
      </div>
    </div>
  )
}
