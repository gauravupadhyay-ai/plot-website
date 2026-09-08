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
const BADGES = `<div class="badges-row">
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
  return `<div class="hero-trust">
        ${googleReviewsHeader()}
        ${googleReviewCard(review)}
        <button type="button" class="btn btn-gold btn-block js-open-lead">Get Pricing &amp; Availability</button>
      </div>`
}

function googleReviewsSection() {
  const cards = LANDING_REVIEWS.map(googleReviewCard).join('\n        ')
  return `
  <section class="g-reviews-section" id="google-reviews">
    <div class="wrap">
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

function landmarkRows(p) {
  return p.landmarks
    .map((row, i) => {
      const reverse = row.reverse || i % 2 === 1
      const id = landmarkId(row)
      return `<div class="landmark-row${reverse ? ' reverse' : ''} reveal" id="${esc(id)}">
        <div class="landmark-media">
          <img src="${esc(row.img)}" alt="${esc(row.alt)}" loading="lazy">
        </div>
        <div class="landmark-copy">
          <span class="tag">${esc(row.tag)}</span>
          <h3>${esc(row.h3)}</h3>
          <p>${esc(row.p)}</p>
        </div>
      </div>`
    })
    .join('\n\n      ')
}

function faqSection(p) {
  const faqs = faqList(p)
    .map(
      (f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary>${esc(f.q)}${CHEV}</summary>
        <div class="faq-answer">${esc(f.a)}</div>
      </details>`
    )
    .join('\n      ')
  return `
  <section class="section faq-section" id="faqs">
    <div class="wrap-narrow">
      <div class="section-head" style="margin-bottom:32px;">
        <h2 style="font-size:clamp(24px,3vw,30px);">Before You Ask</h2>
      </div>
      ${faqs}
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
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://www.aurixxrealty.com${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="https://www.aurixxrealty.com${p.heroImage}">
<link rel="icon" href="/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
    <div class="form-card" id="lead-form-card">
      <div id="lead-form-panel">
        <h2 id="lead-form-title">Get Pricing, Availability &amp; Loan Help</h2>
        <p class="sub">NAR certified. CREDAI member. Bank and government-supported home loans available.</p>
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
      <div id="lead-thanks" class="lead-thanks" hidden>
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

function extrasInner(p) {
  const blocks = []
  if (p.priceGap) {
    const g = p.priceGap
    blocks.push(`<div class="extras-block">
        <div class="price-gap reveal">
          <div class="now">
            <div class="lbl">${esc(g.nowLbl)}</div>
            <div class="amt">${esc(g.nowAmt)}</div>
            ${g.nowHint ? `<p class="hint">${esc(g.nowHint)}</p>` : ''}
          </div>
          <div class="arrow" aria-hidden="true">→</div>
          <div class="later">
            <div class="lbl">${esc(g.laterLbl)}</div>
            <div class="amt">${esc(g.laterAmt)}</div>
            ${g.laterHint ? `<p class="hint">${esc(g.laterHint)}</p>` : ''}
          </div>
        </div>
      </div>`)
  }
  if (p.drives && p.drives.length) {
    const cards = p.drives
      .map(
        (d) => `<div class="drive-card">
          <div class="time">${esc(d.time)}</div>
          <div class="place">${esc(d.place)}</div>
          ${d.note ? `<p class="note">${esc(d.note)}</p>` : ''}
        </div>`
      )
      .join('\n        ')
    blocks.push(`<div class="extras-block">
        <div class="section-head">
          <h2>${esc(p.drivesH2 || 'How Close This Land Actually Is')}</h2>
          ${p.drivesP ? `<p>${esc(p.drivesP)}</p>` : ''}
        </div>
        <div class="drive-grid reveal">${cards}</div>
      </div>`)
  }
  if (p.sizes && p.sizes.length) {
    const cards = p.sizes
      .map(
        (s) => `<div class="size-card">
          <div class="num">${esc(s.num)}</div>
          <span class="unit">${esc(s.unit || 'Gaj')}</span>
        </div>`
      )
      .join('\n        ')
    blocks.push(`<div class="extras-block">
        <div class="section-head">
          <h2>${esc(p.sizesH2 || 'Plot Sizes Available')}</h2>
          ${p.sizesP ? `<p>${esc(p.sizesP)}</p>` : ''}
        </div>
        <div class="size-grid reveal">${cards}</div>
      </div>`)
  }
  if (p.amenities && p.amenities.length) {
    const cards = p.amenities
      .map((a) => {
        const media = a.img
          ? `<div class="amenity-media"><img src="${esc(a.img)}" alt="${esc(a.alt || a.title)}" loading="lazy"></div>`
          : ''
        return `<div class="amenity-card${a.img ? ' has-media' : ''}">
          ${media}
          <h3>${esc(a.title)}</h3>
          <p>${esc(a.p)}</p>
        </div>`
      })
      .join('\n        ')
    blocks.push(`<div class="extras-block">
        <div class="section-head">
          <h2>${esc(p.amenitiesH2 || 'What You Are Actually Buying Into')}</h2>
          ${p.amenitiesP ? `<p>${esc(p.amenitiesP)}</p>` : ''}
        </div>
        <div class="amenity-grid reveal">${cards}</div>
      </div>`)
  }
  return blocks.join('\n      ')
}

function extrasSection(p) {
  const inner = extrasInner(p)
  if (!inner) return ''
  return `
  <section class="section extras-section">
    <div class="wrap">
      ${inner}
    </div>
  </section>`
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
  const stats = p.stats
    .map(
      (s) => `<div class="stat">
          <div class="stat-word">${esc(s.word)}</div>
          <div class="stat-desc">${esc(s.desc)}</div>
        </div>`
    )
    .join('\n        ')
  const warn = p.flagsWarn
    .map(
      (t) => `<div class="flag-card flag-warn">
            ${WARN_ICON}
            <p>${esc(t)}</p>
          </div>`
    )
    .join('\n          ')
  const good = p.flagsGood
    .map(
      (t) => `<div class="flag-card flag-good">
            ${GOOD_ICON}
            <p>${esc(t)}</p>
          </div>`
    )
    .join('\n          ')

  return `${head(p, { title: p.metaTitle, description: p.metaDescription, path: home })}
<body>

${nav(p)}

<main>

  <section class="hero">
    ${heroMedia(p, heroShade)}
    <div class="hero-inner">
      <div class="hero-copy">
        <h1>${esc(p.h1)}</h1>
        <p class="subhead">${esc(p.subhead)}</p>
        <ul class="trust-chips">
          ${chips}
        </ul>
        <div class="hero-links">
          <a href="#landmarks" class="btn btn-outline">See What's Rising Around It</a>
          <button type="button" class="btn btn-gold js-open-lead">Get Pricing</button>
        </div>
      </div>
      ${heroTrust(p)}
    </div>
  </section>

  <section class="section hook-section">
    <div class="wrap">
      <div class="hook-copy">
        <p>${esc(p.hook[0])}</p>
        <p class="truth-line">${esc(p.hook[1])}</p>
      </div>

      <div class="flag-grid reveal">
        <div>
          <span class="flag-col-label flag-label-warn">${esc(p.flagsWarnLabel)}</span>
          ${warn}
        </div>
        <div>
          <span class="flag-col-label flag-label-good">${esc(p.flagsGoodLabel)}</span>
          ${good}
        </div>
      </div>

      <div class="stat-band reveal${p.stats.length > 2 ? ' three' : ''}">
        ${stats}
      </div>
    </div>
  </section>
${extrasSection(p)}
  <section class="landmarks-section" id="landmarks">
    <div class="wrap">
      <div class="section-head">
        <h2>${esc(p.landmarksH2)}</h2>
        <p>${esc(p.landmarksP)}</p>
      </div>
      ${landmarkRows(p)}
    </div>
  </section>

  <section class="section offer-section" id="offer">
    <div class="wrap two-col">
      <div class="offer-copy">
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
      <div class="offer-map" id="site-map">
        <iframe src="${esc(p.mapSrc)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(p.title)} site location"></iframe>
        <p class="map-caption">${esc(p.mapCaption)}</p>
      </div>
    </div>
  </section>
${googleReviewsSection()}
${faqSection(p)}
  <section class="section trust-section">
    <div class="wrap">
      <div class="section-head">
        <h2>Buyers Go Through Us for a Reason</h2>
        <p>The same process, every time, before a plot ever reaches you.</p>
      </div>
      <div class="process-row">
        <div class="process-step"><span class="p-num">Step 1</span><h3>Share Your Requirements</h3><p>Budget, timeline, and what you want to do with the plot.</p></div>
        <div class="process-step"><span class="p-num">Step 2</span><h3>We Shortlist Options</h3><p>Only plots with clear titles and location fit reach you.</p></div>
        <div class="process-step"><span class="p-num">Step 3</span><h3>Site Visits &amp; Checks</h3><p>We walk the land with you and flag boundaries, access, paperwork.</p></div>
        <div class="process-step"><span class="p-num">Step 4</span><h3>Close with Confidence</h3><p>Support through documentation, registration, and loan coordination.</p></div>
      </div>
      <div class="credentials-row">
        <span>NAR Certified</span><span>CREDAI Member</span><span>Government-Approved Projects</span><span>4.9★ Google Reviews</span><span>132+ Properties Guided &amp; Sold</span>
      </div>
    </div>
  </section>

  ${BADGES}

  <section class="close-band">
    <div class="wrap-narrow">
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
