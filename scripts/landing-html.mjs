/** HTML shells for the plot landing pages. */

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>`
const CHEV = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>`
const PHONE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.91-1.26-4.81-4.18-4.96-4.38-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.11.32.02.52-.09.2-.14.32-.27.49-.14.17-.29.38-.41.51-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.68-.17 1.36z"/></svg>`
const WARN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`
const GOOD_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>`
const LOAN_ITEM =
  'Bank and government-supported home loans are available on this property. We help with the paperwork.'
const LOAN_FAQ = {
  q: 'Can I get a loan to buy this property?',
  a: 'Yes. Bank and government-supported home loans are available on these properties. Aurixxrealty helps with documentation, lender coordination, and paperwork so you can buy with financing, not only cash.',
}
const BADGES = `<div class="badges-row reveal">
    <div class="wrap">
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z"/></svg>Title Verified</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>NAR Certified</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11ZM12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>Government-Approved</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>Bank &amp; Govt Loans</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>CREDAI Member</div>
    </div>
  </div>`
const LOGO = `<img src="/images/brand/aurixx-logo.png" alt="Aurixxrealty" width="160" height="48">`
const GOOGLE_G = `<svg class="g-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`
const STAR_PATH = `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`

const LANDING_REVIEWS = [
  {
    name: 'Sarvadnya Rajendra Awaghad',
    type: 'Buyer',
    timeLabel: '2 months ago',
    rating: 5,
    quote:
      'We were looking around Greater Noida and most people just dumped PDFs on WhatsApp. Aurixxrealty actually sat with us, asked what size we needed, and went through the papers without rushing. Took a bit of back and forth, but we left knowing what we were signing.',
  },
  {
    name: 'Anil',
    type: 'Buyer',
    timeLabel: '3 weeks ago',
    rating: 5,
    quote:
      'Needed a residential plot, not random farm listings mixed in. Aurixxrealty shortlisted three options, we visited two, and that was it. No drama, no sir you have to book today talk. Quite professional, and Aurixxrealty replied when promised.',
  },
  {
    name: 'Shaik Nagur',
    type: 'Buyer',
    timeLabel: '1 month ago',
    rating: 5,
    quote:
      'I had a lot of questions about NA and title. Aurixxrealty explained it in simple language, even sketched it once so it made sense. We took a week to decide and nobody pushed us. That honesty is why we went ahead with Aurixxrealty.',
  },
  {
    name: 'Sumit Basak',
    type: 'Buyer',
    timeLabel: '2 months ago',
    rating: 5,
    quote:
      'Site visit was organised properly, pickup and all. After we booked, Aurixxrealty actually followed up on the documents instead of disappearing, which is rare in this line. Registration was slower than I hoped but Aurixxrealty kept us posted the whole way.',
  },
  {
    name: 'Chaman Yadav',
    type: 'Buyer',
    timeLabel: '4 months ago',
    rating: 5,
    quote:
      'From the first call to registration it was pretty smooth. Aurixxrealty handled the plot papers end to end. We only had to show up and sign when Aurixxrealty said the file was ready. Would recommend if you do not want to chase every office yourself.',
  },
  {
    name: 'Rajesh Shriram Hajarnavis',
    type: 'Investor',
    timeLabel: '5 months ago',
    rating: 5,
    quote:
      'I was looking at this more as a land investment than a house. Aurixxrealty did not oversell. Walked me through the location, what is coming up nearby, and the risks too. Would use Aurixxrealty again if I pick up another plot.',
  },
  {
    name: 'Nave',
    type: 'Seller',
    timeLabel: '3 months ago',
    rating: 5,
    quote:
      'Selling our plot through Aurixxrealty was straightforward. Clear communication, no confusing jargon, and it closed faster than we expected. Relieved it is done. If you are on the selling side, Aurixxrealty keeps both parties in the loop.',
  },
]

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function googleStars(rating) {
  return Array.from({ length: 5 }, (_, i) => {
    const fill = i < rating ? '#FABB05' : '#e8eaed'
    return `<svg class="g-star" viewBox="0 0 24 24" fill="${fill}" aria-hidden="true">${STAR_PATH}</svg>`
  }).join('')
}

function googleReviewCard(review) {
  const meta = review.type ? `${esc(review.type)} · ` : ''
  return `<article class="g-review-card">
          <div class="g-review-top">
            <div class="g-review-who">
              <div class="g-avatar" aria-hidden="true">${esc(initials(review.name))}</div>
              <div>
                <p class="g-name">${esc(review.name)}</p>
                <p class="g-meta">${meta}${esc(review.timeLabel)}</p>
              </div>
            </div>
            ${GOOGLE_G}
          </div>
          <div class="g-stars" role="img" aria-label="${review.rating} out of 5 stars">${googleStars(review.rating)}</div>
          <p class="g-quote">${esc(review.quote)}</p>
          <p class="g-posted">Posted on Google</p>
        </article>`
}

function googleReviewsHeader() {
  return `<div class="g-reviews-head">
        <div class="g-reviews-kicker">${GOOGLE_G}<span>Google Reviews</span></div>
        <h2>What plot buyers say</h2>
        <div class="g-score-row">
          <span class="g-score">4.9</span>
          <div>
            <div class="g-stars" role="img" aria-label="4.9 out of 5 stars">${googleStars(5)}</div>
            <p class="g-score-note">Based on buyer feedback</p>
          </div>
        </div>
      </div>`
}

function heroTrust(p) {
  const review = p.heroReview || LANDING_REVIEWS[0]
  return `<div class="hero-trust reveal">
        ${googleReviewsHeader()}
        ${googleReviewCard(review)}
        <button type="button" class="btn btn-gold btn-block js-open-lead">Get Pricing &amp; Availability</button>
      </div>`
}

const ICON_X_CIRCLE = `<svg class="book-mark-svg" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#E24B4B"/><path class="book-mark-stroke" d="M16 16l16 16M32 16 16 32" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"/></svg>`
const ICON_CHECK_CIRCLE = `<svg class="book-mark-svg" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#2F9B5A"/><path class="book-mark-stroke book-tick-path" d="M13.5 24.5 20.5 31.5 34.5 16.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const ICON_X_SM = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#E24B4B"/><path d="M6.4 6.4l7.2 7.2M13.6 6.4l-7.2 7.2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>`
const ICON_CHECK_SM = `<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#2F9B5A"/><path class="book-tick-path" d="M5.4 10.2 8.4 13.2 14.6 6.6" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const ICON_RUPEE = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M7 7h10M7 11h10M7 7c4 0 7 2 7 5H7l8 7"/></svg>`
const ICON_PIN = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>`
const ICON_HOME = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"/></svg>`
const HL_ICONS = [ICON_RUPEE, ICON_PIN, ICON_HOME]
const HL_TONES = ['rupee', 'pin', 'home']

function bookMedia(img, alt, stamp, stampClass) {
  const photo = img
    ? `<img src="${esc(img)}" alt="${esc(alt)}" loading="lazy">`
    : ''
  const badge = stamp ? `<span class="book-stamp ${stampClass}">${esc(stamp)}</span>` : ''
  return `<div class="book-media${img ? '' : ' is-empty'}">${photo}${badge}</div>`
}

function comparisonStorySection(p) {
  const warnList = p.flagsWarn
    .map((t) => `<li><span class="book-li-icon">${ICON_X_SM}</span><span>${esc(t)}</span></li>`)
    .join('\n            ')
  const goodList = p.flagsGood
    .map((t) => `<li><span class="book-li-icon">${ICON_CHECK_SM}</span><span>${esc(t)}</span></li>`)
    .join('\n            ')
  const highlights = (p.stats || [])
    .map((s, i) => {
      const tone = HL_TONES[i % HL_TONES.length]
      return `<div class="book-hl-item">
          <span class="book-hl-icon tone-${tone}">${HL_ICONS[i % HL_ICONS.length]}</span>
          <div>
            <div class="book-hl-value">${esc(s.word)}</div>
            <p>${esc(s.desc)}</p>
          </div>
        </div>`
    })
    .join('\n        ')
  const warnImg = p.compareWarnImg || ''
  const goodImg = p.compareGoodImg || ''
  return `
  <section class="book-section" id="why-this">
    <div class="wrap">
      <div class="book-head reveal">
        <div class="book-pill-row">
          <span class="book-line" aria-hidden="true"></span>
          <span class="book-pill">Before you book</span>
          <span class="book-line" aria-hidden="true"></span>
        </div>
        <h2>What most listings look like vs. what we show you</h2>
        <p>${esc(p.hook[0])} ${esc(p.hook[1])}</p>
      </div>

      <article class="book-card book-card-warn reveal reveal-left">
        <div class="book-card-copy">
          <div class="book-mark">${ICON_X_CIRCLE}</div>
          <h3>${esc(p.flagsWarnLabel)}</h3>
          <p class="book-lead">This is what we filter out before a plot reaches you.</p>
          <ul class="book-list">${warnList}</ul>
        </div>
        ${bookMedia(warnImg, p.compareWarnAlt || p.flagsWarnLabel, p.compareWarnStamp || 'Not approved', 'stamp-warn')}
      </article>

      <article class="book-card book-card-good reveal reveal-right">
        <div class="book-card-copy">
          <div class="book-mark">${ICON_CHECK_CIRCLE}</div>
          <h3>${esc(p.flagsGoodLabel)}</h3>
          <p class="book-lead">This is what we walk on a site visit.</p>
          <ul class="book-list book-list-good">${goodList}</ul>
        </div>
        ${bookMedia(goodImg, p.flagsGoodLabel, p.compareGoodBadge, 'stamp-good')}
      </article>

      <div class="book-highlights reveal">
        <div class="book-hl-intro">
          <h3>Key Highlights at a Glance</h3>
          <span class="book-hl-rule" aria-hidden="true"></span>
          <p>Clear numbers. No guesswork.</p>
        </div>
        ${highlights}
      </div>
    </div>
  </section>`
}

function storyPanel(title, body, { reverse = false, img, alt, tone = 'neutral' } = {}) {
  const media = img
    ? `<div class="story-media"><img src="${esc(img)}" alt="${esc(alt || title)}" loading="lazy"></div>`
    : ''
  return `<article class="story-panel tone-${tone} reveal">
    <div class="story-panel-inner${reverse ? ' reverse' : ''}">
      <div class="story-copy">
        <h3>${esc(title)}</h3>
        ${body}
      </div>
      ${media}
    </div>
  </article>`
}

function locIcon(label) {
  const t = String(label).toLowerCase()
  if (/university|campus|school/.test(t)) return ICON_CAP
  if (/airport/.test(t)) return ICON_PLANE
  if (/temple|mandir|dham|ashram|faith/.test(t)) return ICON_TEMPLE
  if (/metro|rail|station|train/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="6" y="4" width="12" height="14" rx="2"/><path d="M6 10h12M9 18v2M15 18v2M8 14h.01M16 14h.01"/></svg>`
  if (/expressway|highway|nh-|road|noida/.test(t)) return ICON_ROAD
  if (/delhi|gurugram|gurgaon|skyline|industrial|it hub/.test(t)) return WHY_ICONS.building
  if (/film/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="m10 10 5 2.5-5 2.5V10Z"/></svg>`
  if (/formula|f1|circuit|olympic/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19V6l7 3 7-3v13"/><path d="M5 10h14"/></svg>`
  if (/hospital|medical/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v8M8 12h8"/></svg>`
  if (/park|green/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21V11"/><path d="M12 11c-4 0-7-2.4-7-6 3 0 7 2 7 6 0-4 4-6 7-6 0 3.6-3 6-7 6Z"/></svg>`
  if (/gated|security|society/.test(t)) return WHY_ICONS.shield
  if (/water|electric|power/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 3 6 14h6l-1 7 7-11h-6l1-7Z"/></svg>`
  if (/shop|commercial/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9h16l-1 11H5L4 9Z"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/></svg>`
  if (/rera|document/.test(t)) return WHY_ICONS.seal
  if (/agra|taj/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h16M6 20V12l6-5 6 5v8"/><path d="M12 7V4"/></svg>`
  if (/size|gaj|plot/.test(t)) return WHY_ICONS.house
  if (/price|₹|launch/.test(t))
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 7h10M7 11h10M7 7c4 0 7 2 7 5H7l8 7"/></svg>`
  return ICON_PIN_SM
}

function locCard({ img, alt, badge, title, body, iconLabel }) {
  const media = img
    ? `<div class="loc-media"><img src="${esc(img)}" alt="${esc(alt || title)}" loading="lazy"></div>`
    : `<div class="loc-media is-empty" aria-hidden="true"></div>`
  const badgeHtml = badge ? `<span class="loc-badge">${esc(badge)}</span>` : ''
  return `<article class="loc-card reveal">
        ${media}
        <div class="loc-copy">
          <div class="loc-top"><span class="loc-ico">${locIcon(iconLabel || title)}</span>${badgeHtml}</div>
          <h3>${esc(title)}</h3>
          ${body ? `<p>${esc(body)}</p>` : ''}
        </div>
      </article>`
}

function locBlock({ kicker, h2, p, cards }) {
  if (!cards.length) return ''
  return `
  <section class="loc-section">
    <div class="wrap">
      <div class="loc-head reveal">
        ${kicker ? `<p class="loc-kicker">${esc(kicker)}</p>` : ''}
        <h2>${esc(h2)}</h2>
        ${p ? `<p>${esc(p)}</p>` : ''}
      </div>
      <div class="loc-grid">
      ${cards.join('\n      ')}
      </div>
      <div class="loc-ornament" aria-hidden="true">${FAQ_LOTUS}</div>
    </div>
  </section>`
}

function extrasStorySection(p) {
  const sections = []

  if (p.priceGap) {
    const g = p.priceGap
    sections.push(
      locBlock({
        kicker: 'Pricing window',
        h2: 'Pricing window',
        p: '',
        cards: [
          locCard({ img: g.nowImg, alt: g.nowAlt || g.nowLbl, badge: g.nowAmt, title: g.nowLbl, body: g.nowHint || '', iconLabel: 'price' }),
          locCard({ img: g.laterImg, alt: g.laterAlt || g.laterLbl, badge: g.laterAmt, title: g.laterLbl, body: g.laterHint || '', iconLabel: 'price' }),
        ],
      })
    )
  }

  if (p.sizes && p.sizes.length) {
    sections.push(
      locBlock({
        kicker: p.sizesEyebrow || 'Plot Sizes',
        h2: p.sizesH2 || 'Plot sizes',
        p: p.sizesP || '',
        cards: p.sizes.map((s) =>
          locCard({
            img: s.img,
            alt: s.alt || `${s.num} ${s.unit || 'Gaj'}`,
            badge: `${s.num} ${s.unit || 'Gaj'}`,
            title: `${s.num} ${s.unit || 'Gaj'}`,
            body: '',
            iconLabel: 'plot sizes',
          })
        ),
      })
    )
  }

  if (p.drives && p.drives.length) {
    sections.push(
      locBlock({
        kicker: p.drivesEyebrow || 'Location Advantage',
        h2: p.drivesH2 || 'How close this land actually is',
        p: p.drivesP || '',
        cards: p.drives.map((d) =>
          locCard({
            img: d.img,
            alt: d.alt || d.place,
            badge: d.time,
            title: d.place,
            body: d.note || '',
          })
        ),
      })
    )
  }

  if (p.amenities && p.amenities.length) {
    sections.push(
      locBlock({
        kicker: p.amenitiesEyebrow || 'Township',
        h2: p.amenitiesH2 || 'What you are buying into',
        p: p.amenitiesP || '',
        cards: p.amenities.map((a) =>
          locCard({
            img: a.img,
            alt: a.alt || a.title,
            title: a.title,
            body: a.p,
          })
        ),
      })
    )
  }

  return sections.join('\n')
}

const WHY_ICONS = {
  clip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="4.5" width="12" height="16" rx="1.6"/><path d="M10 4.5V3.2h6V4.5"/><circle cx="13" cy="11.2" r="2.1"/><path d="M9.6 16.6c.9-1.9 5.9-1.9 6.8 0"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.2 9.2 6l5.4 2.4L20 6.2v11.2L14.6 19.6 9.2 17.2 4 19.4V8.2Z"/><path d="M9.2 6.2v11M14.6 8.4v11"/><circle cx="14.2" cy="12.2" r="2.1"/><path d="M14.2 14.3V17"/></svg>`,
  land: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 17.2 8 11.5l3.6 4.2 3.1-3.8 5.8 6.3H3.5Z"/><path d="M4 19.5h16"/><circle cx="16.2" cy="8.2" r="1.8"/></svg>`,
  seal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 3.8h9A1.5 1.5 0 0 1 18 5.3v13.4a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.7V5.3A1.5 1.5 0 0 1 7.5 3.8Z"/><path d="M9 8.2h6M9 11.4h6"/><circle cx="15" cy="16.6" r="2.4"/><path d="M13.6 18.4 15 19.6l2.2-2.4"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 5 6.2v5.4c0 4.2 2.8 7.4 7 8.6 4.2-1.2 7-4.4 7-8.6V6.2L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  person: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="3"/><path d="M6.5 19c.8-3.4 3-5 5.5-5s4.7 1.6 5.5 5"/></svg>`,
  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M6 20V10l6-5 6 5v10"/><path d="M10 20v-5h4v5M9 12h1M14 12h1M9 15h1M14 15h1"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="m12 3.5 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.2 7.2 18.4l.9-5.4-3.9-3.8 5.4-.8L12 3.5Z"/></svg>`,
  house: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"/></svg>`,
}

function processStorySection() {
  const steps = [
    ['01', 'STEP 1', 'Share your requirements', 'Budget, timeline, and what you want to do with the plot.', WHY_ICONS.clip],
    ['02', 'STEP 2', 'We shortlist options', 'Only plots with clear titles and a location fit reach you.', WHY_ICONS.map],
    ['03', 'STEP 3', 'Site visit and checks', 'We walk the land with you and flag boundaries, access, and paperwork.', WHY_ICONS.land],
    ['04', 'STEP 4', 'Close with confidence', 'Support through documentation, registration, and loan coordination.', WHY_ICONS.seal],
  ]
  const cards = steps
    .map(
      ([num, step, title, body, icon], i) => `${i ? `
      <span class="why-arrow" aria-hidden="true">${WHY_ICONS.arrow}</span>` : ''}
      <article class="why-card reveal">
        <div class="why-icon-wrap">
          <span class="why-icon">${icon}</span>
          <span class="why-num">${num}</span>
        </div>
        <p class="why-step">${esc(step)}</p>
        <h3>${esc(title)}</h3>
        <p>${esc(body)}</p>
        <span class="why-rule" aria-hidden="true"></span>
      </article>`
    )
    .join('')
  const trust = [
    [WHY_ICONS.shield, 'NAR Certified'],
    [WHY_ICONS.person, 'CREDAI Member'],
    [WHY_ICONS.building, 'Government-Approved Projects'],
    [WHY_ICONS.star, '4.9★ Google Reviews'],
    [WHY_ICONS.house, '132+ Properties Guided & Sold'],
  ]
    .map(
      ([icon, label]) => `<div class="why-trust-item"><span class="why-trust-icon">${icon}</span><span>${esc(label)}</span></div>`
    )
    .join('')
  return `
  <section class="why-section">
    <div class="wrap">
      <div class="why-head reveal">
        <p class="why-kicker">Why Aurixxrealty</p>
        <h2>Buyers go through us for a reason</h2>
        <p>The same process, every time, before a plot ever reaches you.</p>
      </div>
      <div class="why-steps">${cards}
      </div>
    </div>
    <div class="why-trust reveal">${trust}</div>
  </section>`
}

function googleReviewsSection() {
  const cards = LANDING_REVIEWS.map(googleReviewCard).join('\n        ')
  return `
  <section class="g-reviews-section" id="google-reviews">
    <div class="wrap reveal">
      ${googleReviewsHeader()}
    </div>
    <div class="g-marquee" aria-label="Google reviews">
      <div class="g-marquee-track">
        <div class="g-marquee-set">${cards}</div>
        <div class="g-marquee-set" aria-hidden="true">${cards}</div>
      </div>
    </div>
  </section>`
}

const ICON_CAL = `<svg class="cal-head-icon" viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="24" height="22" rx="4" fill="#C23B3B"/><path d="M4 12h24" stroke="#fff" stroke-width="2"/><circle cx="11" cy="5" r="2" fill="#fff"/><circle cx="21" cy="5" r="2" fill="#fff"/><rect x="9" y="16" width="4" height="4" rx="1" fill="#fff"/><rect x="14" y="16" width="4" height="4" rx="1" fill="#fff"/><rect x="19" y="16" width="4" height="4" rx="1" fill="#fff"/></svg>`
const ICON_PIN_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>`
const ICON_CAR_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13h14l-1.2-4.2A2 2 0 0 0 15.9 7H8.1a2 2 0 0 0-1.9 1.8L5 13Z"/><path d="M5 13v4h2.2M17 17h2v-4"/><circle cx="8" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/></svg>`
const ICON_CLOCK_SM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M12 8v4.5L15 15"/></svg>`
const ICON_CAP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10 12 6l9 4-9 4-9-4Z"/><path d="M7 12v4c2 1.4 8 1.4 10 0v-4"/></svg>`
const ICON_TEMPLE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 5 9h14L12 3Z"/><path d="M6 9v10h12V9"/><path d="M10 19v-5h4v5"/></svg>`
const ICON_PLANE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 13 21 7l-3 10-6-2-4 5-2-1 2-5-5-1Z"/></svg>`
const ICON_ROAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 4 5 20M16 4l3 16M12 6v3M12 12v3M12 18v2"/></svg>`

function landmarkBadge(tag) {
  const t = String(tag).toLowerCase()
  if (/university|campus/.test(t)) return { label: 'University Visit', tone: 'uni', icon: ICON_CAP }
  if (/airport/.test(t)) return { label: 'Airport', tone: 'air', icon: ICON_PLANE }
  if (/expressway|nh-|highway|metro|rail/.test(t)) return { label: 'Highway', tone: 'road', icon: ICON_ROAD }
  if (/temple|mandir|dham|iskcon|govardhan|nandgaon|barsana|kokilavan|vrindavan|mathura|parikrama|shani|braj/.test(t)) {
    return { label: 'Temple Visit', tone: 'temple', icon: ICON_TEMPLE }
  }
  if (/film|circuit|formula|f1/.test(t)) return { label: 'On corridor', tone: 'road', icon: ICON_ROAD }
  return { label: tag, tone: 'place', icon: ICON_PIN_SM }
}

function driveFromHeading(h3) {
  const match = String(h3).match(/^(.+?)\s+From\s/i)
  return match ? match[1] : ''
}

function landmarkRows(p) {
  return p.landmarks
    .map((row, i) => {
      const id = landmarkId(row)
      const badge = landmarkBadge(row.tag)
      const drive = driveFromHeading(row.h3)
      const clock = p.landmarksEyebrow || row.tag
      return `<article class="cal-card reveal${i % 2 ? ' reveal-right' : ' reveal-left'}" id="${esc(id)}">
        <div class="cal-media">
          <img src="${esc(row.img)}" alt="${esc(row.alt)}" loading="lazy">
          <span class="cal-badge tone-${esc(badge.tone)}">${badge.icon}<span>${esc(badge.label)}</span></span>
        </div>
        <div class="cal-copy">
          <p class="cal-tag">${ICON_PIN_SM}<span>${esc(row.tag)}</span></p>
          <h3>${esc(row.h3)}</h3>
          <p class="cal-body">${esc(row.p)}</p>
          <div class="cal-meta">
            <span>${ICON_PIN_SM}${esc(row.tag)}</span>
            ${drive ? `<span>${ICON_CAR_SM}${esc(drive)}</span>` : ''}
            <span>${ICON_CLOCK_SM}${esc(clock)}</span>
            <a class="cal-more js-open-lead" href="#lead-form-card">Learn More →</a>
          </div>
        </div>
      </article>`
    })
    .join('\n\n      ')
}

const FAQ_SHIELD = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path fill="#fff" d="M12 3.2 5.2 6.2v5.3c0 4 2.7 7 6.8 8.3 4.1-1.3 6.8-4.3 6.8-8.3V6.2L12 3.2Z"/><path fill="#8B1D2E" d="m10.1 12.1 1.4 1.4 3.2-3.3.9.9-4.1 4.2-2.3-2.3.9-.9Z"/></svg>`
const FAQ_LOTUS = `<svg class="faq-lotus" viewBox="0 0 32 24" fill="none" aria-hidden="true"><path fill="#8B1D2E" d="M16 21c-2.2-2.4-6.8-3.4-9.6-3.2 1.4-2.2 4.8-3.4 7.2-3.2C11.8 12.4 10 8 10 5.6c2.4 1 5 4.2 6 6.8 1-2.6 3.6-5.8 6-6.8 0 2.4-1.8 6.8-3.6 9-2.4-.2 5.8 1 7.2 3.2-2.8-.2-7.4.8-9.6 3.2Z"/><path fill="#8B1D2E" d="M16 21c0-4.4-1.2-8.2 0-12.4 1.2 4.2 0 8 0 12.4Z"/></svg>`

function faqSection(p) {
  const faqs = faqList(p)
    .map((f, i) => {
      const num = String(i + 1).padStart(2, '0')
      return `<details class="faq-item reveal"${i === 0 ? ' open' : ''}>
        <summary>
          <span class="faq-num">${num}</span>
          <span class="faq-split" aria-hidden="true"></span>
          <span class="faq-q">${esc(f.q)}</span>
          ${CHEV}
        </summary>
        <div class="faq-answer">
          <span class="faq-shield">${FAQ_SHIELD}</span>
          <p>${esc(f.a)}</p>
        </div>
      </details>`
    })
    .join('\n      ')
  return `
  <section class="faq-section" id="faqs">
    <div class="wrap-narrow">
      <div class="faq-head reveal">
        <p class="faq-kicker">FAQ</p>
        <h2>Before You Ask</h2>
      </div>
      <div class="faq-list">
      ${faqs}
      </div>
      <div class="faq-ornament" aria-hidden="true">${FAQ_LOTUS}</div>
    </div>
  </section>`
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function waPrefill(p) {
  return encodeURIComponent(
    `Hi! I'm interested in ${p.title} (${p.code}) at ${p.location}. Please share availability and pricing.`
  )
}

function landmarkId(row) {
  return (row.id || row.tag).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function head(p, { title, description, path }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://www.aurixxrealty.com${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="https://www.aurixxrealty.com${p.heroImage}">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/landings/landing.css">
</head>`
}

function nav(p) {
  const home = `/${p.slug}`
  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${home}">${LOGO}</a>
    <div class="header-right">
      <nav class="site-nav" aria-label="Primary">
        <a href="${home}" class="is-active">Home</a>
        <a href="#google-reviews">Reviews</a>
        <a href="#faqs">FAQs</a>
        <a href="#lead-form-card" class="js-open-lead">Get Pricing</a>
      </nav>
      <a class="header-phone" href="tel:+919458454789">
        ${PHONE_ICON}
        <span class="txt">+91 94584 54789</span>
      </a>
    </div>
  </div>
</header>`
}

function leadForm(p) {
  return `<div class="lead-modal" id="lead-modal" hidden>
  <div class="lead-modal-backdrop js-close-lead"></div>
  <div class="lead-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="lead-form-title">
    <button type="button" class="lead-modal-close js-close-lead" aria-label="Close form">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <div class="form-card lead-form-card" id="lead-form-card">
      <div id="lead-form-panel">
        <div class="lead-form-head">
          <p class="lead-form-eyebrow">Aurixxrealty · NAR Certified</p>
          <h2 id="lead-form-title">Get Pricing, Availability &amp; Loan Help</h2>
        </div>
        <div class="lead-form-body">
          <p class="sub">Share your details for ${esc(p.title)}. Bank and government-supported home loans available.</p>
          <form id="lead-form" novalidate data-title="${esc(p.title)}" data-code="${esc(p.code)}" data-location="${esc(p.location)}">
            <div class="field">
              <label for="lead-name">Full Name</label>
              <input type="text" id="lead-name" name="name" required autocomplete="name">
            </div>
            <div class="field">
              <label for="lead-phone">Phone Number</label>
              <input type="tel" id="lead-phone" name="phone" required autocomplete="tel" inputmode="tel" placeholder="+91">
            </div>
            <div class="field">
              <label for="lead-email">Email <span class="optional">(optional)</span></label>
              <input type="email" id="lead-email" name="email" autocomplete="email">
            </div>
            <button type="submit" class="btn btn-gold btn-block" id="lead-submit">Get Pricing &amp; Availability</button>
          </form>
          <p class="form-note">We'll only use this to share plot details. No spam.</p>
          <p id="form-status" class="form-status" hidden></p>
        </div>
      </div>
      <div id="lead-thanks" class="lead-thanks lead-form-body" hidden>
        <div class="lead-thanks-tick" aria-hidden="true">
          <svg viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="36" fill="#188038"/>
            <path d="M20 37.5 31 48.5 52 24.5" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h2>Thank you</h2>
        <p>We've received your details. Our team will call you shortly with pricing and a site-visit slot.</p>
        <button type="button" class="btn btn-dark btn-block js-close-lead">Done</button>
      </div>
    </div>
  </div>
</div>`
}

function offerList(p) {
  const items = p.offerItems.some((item) => /loan/i.test(item))
    ? p.offerItems
    : [...p.offerItems, LOAN_ITEM]
  return items.map((item) => `<li>${CHECK}${esc(item)}</li>`).join('\n          ')
}

function faqList(p) {
  const faqs = p.faqs.some((f) => /loan/i.test(`${f.q} ${f.a}`))
    ? p.faqs
    : [...p.faqs, LOAN_FAQ]
  return faqs
}

function extrasSection(p) {
  return extrasStorySection(p)
}

function heroImageList(p) {
  return p.heroImages && p.heroImages.length ? p.heroImages : [p.heroImage]
}

function heroMedia(p, shade) {
  const slides = heroImageList(p)
    .map(
      (src, i) =>
        `<div class="hero-slide${i === 0 ? ' is-active' : ''}" style="background-image:url('${esc(src)}')"></div>`
    )
    .join('\n    ')
  return `<div class="hero-media" aria-hidden="true">
    ${slides}
    <div class="hero-shade" style="background:${shade}"></div>
  </div>`
}

function footer(p) {
  return `<footer class="site-footer">
  <div class="wrap">
    <span class="footer-brand">${LOGO}</span>
    <nav class="footer-nav" aria-label="Footer">
      <a href="/${p.slug}">Home</a>
      <a href="#google-reviews">Reviews</a>
      <a href="#faqs">FAQs</a>
      <a href="#lead-form-card" class="js-open-lead">Get Pricing</a>
    </nav>
    <span>${esc(p.footerPlace)}</span>
    <span>Office No. 701, 7th Floor, Tower A, Urbtech Trade Centre (UTC), Plot No. B-35, Sector 132, Noida, Gautam Buddha Nagar, Uttar Pradesh – 201304, India</span>
    <span><a href="mailto:contact@aurixxrealty.com">contact@aurixxrealty.com</a></span>
    <span>© 2026 Aurixxrealty. All Rights Reserved.</span>
  </div>
</footer>

<div class="mobile-bar">
  <div class="mobile-bar-inner">
    <a class="mobile-bar-icon" href="tel:+919458454789" aria-label="Call Aurixxrealty">${PHONE_ICON}</a>
    <a class="mobile-bar-icon" href="https://wa.me/919458454789?text=${waPrefill(p)}" target="_blank" rel="noopener" aria-label="WhatsApp Aurixxrealty">${WA_ICON}</a>
    <a href="#lead-form-card" class="btn btn-dark js-open-lead">Get Pricing</a>
  </div>
</div>

${leadForm(p)}
<script src="/landings/landing.js"></script>
</body>
</html>`
}

export function renderHome(p) {
  const home = `/${p.slug}`
  const heroShade =
    'linear-gradient(100deg, rgba(14,14,13,.94) 0%, rgba(14,14,13,.82) 42%, rgba(14,14,13,.4) 75%, rgba(14,14,13,.15) 100%)'
  const chipSource = p.chips.some((c) => /loan/i.test(c))
    ? p.chips
    : [...p.chips, 'Bank & Govt Loans']
  const chips = chipSource.map((c) => `<li>${esc(c)}</li>`).join('\n          ')

  return `${head(p, { title: p.metaTitle, description: p.metaDescription, path: home })}
<body class="landing-page">

${nav(p)}

<main>

  <section class="hero">
    ${heroMedia(p, heroShade)}
    <div class="hero-inner">
      <div class="hero-copy reveal">
        <h1>${esc(p.h1)}</h1>
        <p class="subhead">${esc(p.subhead)}</p>
        <ul class="trust-chips">
          ${chips}
        </ul>
        <div class="hero-links">
          <a href="#landmarks" class="btn btn-outline">See what's around this land</a>
          <button type="button" class="btn btn-gold js-open-lead">Get Pricing</button>
        </div>
      </div>
      ${heroTrust(p)}
    </div>
  </section>

  ${comparisonStorySection(p)}
${extrasSection(p)}
  <section class="cal-section" id="landmarks">
    <div class="wrap">
      <div class="cal-head reveal">
        ${ICON_CAL}
        <h2>${esc(p.landmarksH2)}</h2>
        <p>${esc(p.landmarksP)}</p>
      </div>
      <div class="cal-stack">
      ${landmarkRows(p)}
      </div>
    </div>
  </section>

  <section class="section offer-section" id="offer">
    <div class="wrap two-col">
      <div class="offer-copy reveal">
        <h2>Introducing ${esc(p.title)}</h2>
        <p class="lead">${esc(p.offerLead)}</p>
        <ul class="offer-list">
          ${offerList(p)}
        </ul>
        <p class="offer-price-note">${esc(p.offerNote)}</p>
        <div class="offer-actions">
          <a href="#lead-form-card" class="btn btn-dark js-open-lead">Get Pricing &amp; Availability</a>
          <a href="#site-map" class="btn btn-outline-dark">See Location &amp; Details</a>
        </div>
      </div>
      <div class="offer-map reveal" id="site-map">
        <iframe src="${esc(p.mapSrc)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(p.title)} site location"></iframe>
        <p class="map-caption">${esc(p.mapCaption)}</p>
      </div>
    </div>
  </section>
${googleReviewsSection()}
${faqSection(p)}
  ${processStorySection()}

  ${BADGES}

  <section class="close-band">
    <div class="wrap-narrow reveal">
      <h2>${esc(p.closeLead)} <span class="accent">${esc(p.closeAccent)}</span></h2>
      <p class="sub">${esc(p.closeSub)}</p>
      ${p.sellLine ? `<p class="sell-line">${esc(p.sellLine)}</p>` : ''}
      <div class="close-actions">
        <a href="#lead-form-card" class="btn btn-gold btn-lg js-open-lead">Get Exact Pricing &amp; Plot Sizes</a>
        <a href="tel:+919458454789" class="btn btn-outline btn-lg">Call Us Instead</a>
      </div>
      <p class="phone-line">Mon–Sat, 9AM–7PM · <a href="tel:+919458454789">+91 94584 54789</a> · <a href="tel:+919711760199">+91 97117 60199</a></p>
    </div>
  </section>

</main>

${footer(p)}`
}
