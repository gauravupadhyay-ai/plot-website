/** HTML shells matching Expressway Residency (home) + The Corridor (story). */

const CHECK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>`
const CHEV = `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>`
const PHONE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.91-1.26-4.81-4.18-4.96-4.38-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.11.32.02.52-.09.2-.14.32-.27.49-.14.17-.29.38-.41.51-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.61-.07.16-.2.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.55.73 1.82.86.27.14.44.2.51.31.07.12.07.68-.17 1.36z"/></svg>`
const WARN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`
const GOOD_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>`
const BADGES = `<div class="badges-row">
    <div class="wrap">
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z"/></svg>Title Verified</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>NA Guidance</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11ZM12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>Site Visits</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/></svg>Loan Support</div>
      <div class="badge-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>Clear Docs</div>
    </div>
  </div>`

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

function nav(p, active) {
  const home = `/${p.slug}`
  const corridor = `/${p.slug}/the-corridor`
  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${home}"><span class="dot"></span>Aurixxrealty</a>
    <div class="header-right">
      <nav class="site-nav" aria-label="Primary">
        <a href="${home}"${active === 'home' ? ' class="is-active"' : ''}>Home</a>
        <a href="${corridor}"${active === 'corridor' ? ' class="is-active"' : ''}>The Corridor</a>
        <a href="#lead-form-card">Get Pricing</a>
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
  return `<div class="form-card" id="lead-form-card">
        <h2>Get Exact Pricing &amp; Plot Sizes</h2>
        <p class="sub">Sent directly by Aurixxrealty, usually within a few hours.</p>
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
          <button type="submit" class="btn btn-gold btn-block">Get Pricing &amp; Availability</button>
        </form>
        <p class="form-note">We'll only use this to share plot details. No spam.</p>
        <p id="form-status" class="form-status" hidden></p>
      </div>`
}

function offerList(p) {
  return p.offerItems.map((item) => `<li>${CHECK}${esc(item)}</li>`).join('\n          ')
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
    <span class="footer-brand">Aurixxrealty</span>
    <nav class="footer-nav" aria-label="Footer">
      <a href="/${p.slug}">Home</a>
      <a href="/${p.slug}/the-corridor">The Corridor</a>
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
    <a href="#lead-form-card" class="btn btn-dark">Get Pricing</a>
  </div>
</div>

<script src="/landings/landing.js"></script>
</body>
</html>`
}

export function renderHome(p) {
  const home = `/${p.slug}`
  const corridor = `/${p.slug}/the-corridor`
  const heroShade =
    'linear-gradient(100deg, rgba(14,14,13,.94) 0%, rgba(14,14,13,.82) 42%, rgba(14,14,13,.4) 75%, rgba(14,14,13,.15) 100%)'
  const chips = p.chips.map((c) => `<li>${esc(c)}</li>`).join('\n          ')
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
  const previews = p.landmarks
    .map((row) => {
      const id = landmarkId(row)
      const img = row.img.includes('unsplash.com') ? row.img.replace('w=1200', 'w=800') : row.img
      const blurb = row.preview || row.p.split(/[.!?]/)[0] + '.'
      return `<a class="preview-card" href="${corridor}#${id}">
          <img src="${esc(img)}" alt="${esc(row.alt)}">
          <div class="body">
            <span class="tag">${esc(row.tag)}</span>
            <h3>${esc(row.h3)}</h3>
            <p>${esc(blurb)}</p>
          </div>
        </a>`
    })
    .join('\n        ')

  return `${head(p, { title: p.metaTitle, description: p.metaDescription, path: home })}
<body>

${nav(p, 'home')}

<main>

  <section class="hero">
    ${heroMedia(p, heroShade)}
    <div class="hero-inner">
      <div class="hero-copy">
        <span class="eyebrow-pill">${esc(p.eyebrow)}</span>
        <h1>${esc(p.h1)}</h1>
        <p class="subhead">${esc(p.subhead)}</p>
        <ul class="trust-chips">
          ${chips}
        </ul>
        <div class="hero-links">
          <a href="${corridor}" class="btn btn-outline">See What's Rising Around It</a>
        </div>
      </div>
      ${leadForm(p)}
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

      <div class="stat-band reveal">
        ${stats}
      </div>
    </div>
  </section>

  <section class="landmarks-section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow-pill">${esc(p.landmarksEyebrow)}</span>
        <h2>${esc(p.landmarksH2)}</h2>
        <p>${esc(p.landmarksP)}</p>
      </div>

      <div class="preview-grid">
        ${previews}
      </div>

      <div class="preview-cta">
        <a href="${corridor}" class="btn btn-dark">Read the Full Corridor Story</a>
      </div>
    </div>
  </section>

  <section class="section offer-section">
    <div class="wrap two-col">
      <div class="offer-copy">
        <h2>Introducing ${esc(p.title)}</h2>
        <p class="lead">${esc(p.offerLead)}</p>
        <ul class="offer-list">
          ${offerList(p)}
        </ul>
        <p class="offer-price-note">Exact plot sizes, current pricing, and the site map are on the corridor page — or share your details and we'll send them directly.</p>
        <div class="offer-actions">
          <a href="#lead-form-card" class="btn btn-dark">Get Pricing &amp; Availability</a>
          <a href="${corridor}#offer" class="btn btn-outline-dark">See Location &amp; Details</a>
        </div>
      </div>
      <div class="offer-map">
        <iframe src="${esc(p.mapSrc)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(p.title)} site location"></iframe>
        <p class="map-caption">${esc(p.mapCaption)}</p>
      </div>
    </div>
  </section>

  <section class="section trust-section">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow-pill">Why Aurixxrealty</span>
        <h2>Buyers Go Through Us for a Reason</h2>
        <p>The same process, every time — before a plot ever reaches you.</p>
      </div>
      <div class="process-row">
        <div class="process-step"><span class="p-num">Step 1</span><h3>Share Your Requirements</h3><p>Budget, timeline, and what you want to do with the plot.</p></div>
        <div class="process-step"><span class="p-num">Step 2</span><h3>We Shortlist Options</h3><p>Only plots with clear titles and location fit reach you.</p></div>
        <div class="process-step"><span class="p-num">Step 3</span><h3>Site Visits &amp; Checks</h3><p>We walk the land with you and flag boundaries, access, paperwork.</p></div>
        <div class="process-step"><span class="p-num">Step 4</span><h3>Close with Confidence</h3><p>Support through documentation, registration, and loan coordination.</p></div>
      </div>
      <div class="testimonial-row">
        <div class="testimonial-card"><p>"Solid guidance for a land investment decision. Would use Aurixxrealty again for future plot purchases."</p><div class="t-name">Rajesh Shriram Hajarnavis</div><div class="t-role">Investor</div></div>
        <div class="testimonial-card"><p>"Explained NA status and title points in simple language. Never pushed us into a rushed decision."</p><div class="t-name">Shaik Nagur</div><div class="t-role">Buyer</div></div>
        <div class="testimonial-card"><p>"Clear advice on plot size, location, and paperwork."</p><div class="t-name">Sarvadnya Rajendra Awaghad</div><div class="t-role">Buyer</div></div>
      </div>
      <div class="credentials-row">
        <span>NAR India</span><span>CREDAI</span><span>4.9★ Google Reviews</span><span>132+ Properties Guided &amp; Sold</span>
      </div>
    </div>
  </section>

  ${BADGES}

  <section class="close-band">
    <div class="wrap-narrow">
      <h2>${esc(p.closeLead)} <span class="accent">${esc(p.closeAccent)}</span></h2>
      <p class="sub">${esc(p.closeSub)}</p>
      <div class="close-actions">
        <a href="#lead-form-card" class="btn btn-gold btn-lg">Get Exact Pricing &amp; Plot Sizes</a>
        <a href="tel:+919458454789" class="btn btn-outline btn-lg">Call Us Instead</a>
      </div>
      <p class="phone-line">Mon–Sat, 9AM–7PM · <a href="tel:+919458454789">+91 94584 54789</a> · <a href="tel:+919711760199">+91 97117 60199</a></p>
    </div>
  </section>

</main>

${footer(p)}`
}

export function renderCorridor(p) {
  const corridor = `/${p.slug}/the-corridor`
  const heroShade =
    'linear-gradient(180deg, rgba(14,14,13,.88) 0%, rgba(14,14,13,.72) 55%, rgba(14,14,13,.55) 100%)'
  const rows = p.landmarks
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
  const faqs = p.faqs
    .map(
      (f) => `<details class="faq-item">
        <summary>${esc(f.q)}${CHEV}</summary>
        <div class="faq-answer">${esc(f.a)}</div>
      </details>`
    )
    .join('\n      ')

  return `${head(p, {
    title: `The Corridor — ${p.title} | Aurixxrealty`,
    description: p.landmarksP + ' ' + p.metaDescription,
    path: corridor,
  })}
<body>

${nav(p, 'corridor')}

<main>

  <section class="page-hero">
    ${heroMedia(p, heroShade)}
    <div class="page-hero-inner wrap">
      <span class="eyebrow-pill">${esc(p.eyebrow)}</span>
      <h1>${esc(p.landmarksH2)}</h1>
      <p class="subhead">${esc(p.landmarksP)}</p>
      <div class="hero-links">
        <a href="#lead-form-card" class="btn btn-gold">Get Pricing &amp; Plot Sizes</a>
        <a href="#offer" class="btn btn-outline">See the Plot &amp; Map</a>
      </div>
    </div>
  </section>

  <section class="landmarks-section">
    <div class="wrap">
      ${rows}
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
        <a href="#lead-form-card" class="btn btn-dark">Get Pricing &amp; Availability</a>
      </div>
      <div class="offer-map">
        <iframe src="${esc(p.mapSrc)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(p.title)} site location"></iframe>
        <p class="map-caption">${esc(p.mapCaption)}</p>
      </div>
    </div>
  </section>

  <section class="section faq-section">
    <div class="wrap-narrow">
      <div class="section-head" style="margin-bottom:32px;">
        <h2 style="font-size:clamp(24px,3vw,30px);">Before You Ask</h2>
      </div>
      ${faqs}
    </div>
  </section>

  ${BADGES}

  <section class="close-band">
    <div class="wrap-narrow">
      <h2>${esc(p.closeLead)} <span class="accent">${esc(p.closeAccent)}</span></h2>
      <p class="sub">${esc(p.closeSub)}</p>
      ${leadForm(p)}
      <p class="phone-line">Mon–Sat, 9AM–7PM · <a href="tel:+919458454789">+91 94584 54789</a> · <a href="tel:+919711760199">+91 97117 60199</a></p>
    </div>
  </section>

</main>

${footer(p)}`
}
