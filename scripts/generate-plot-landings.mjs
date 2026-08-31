/**
 * Generates ad landing pages for the six residential plots.
 * Run: node scripts/generate-plot-landings.mjs
 */
import { mkdirSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { renderCorridor, renderHome } from './landing-html.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'landings')

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

const u = (id) => `https://images.unsplash.com/${id}?fm=jpg&q=80&w=1200&auto=format&fit=crop`
const img = (name) => `/images/landings/${name}.jpg`

const VRINDAVAN_HERO = [img('prem-mandir'), img('prem-mandir-night'), img('iskcon-vrindavan')]

const pages = [
  {
    slug: 'hari-shyam-township-jewar',
    code: 'AX-HS-001',
    title: 'Hari Shyam Township',
    location: 'Jewar growth corridor, Yamuna Expressway, near Noida International Airport',
    footerPlace: 'Jewar · Yamuna Expressway, Uttar Pradesh (NCR)',
    metaTitle: 'Hari Shyam Township — Pre-Launch Plots Near Jewar Airport | Aurixxrealty',
    metaDescription: 'Own freehold gated plots at Hari Shyam Township on the Jewar–Yamuna Expressway corridor, near Noida International Airport. Pre-launch from ₹18,000–₹22,000 per gaj. Guided by Aurixxrealty.',
    heroImage: '/images/plots/hari_shyam_township/jawer_plot1.jpeg',
    heroImages: [
      '/images/plots/hari_shyam_township/jawer_plot1.jpeg',
      '/images/plots/hari_shyam_township/jawer_plot3.jpeg',
      img('yamuna-expressway'),
    ],
    eyebrow: 'Jewar · Yamuna Expressway',
    h1: "Own a Plot on the Jewar Growth Corridor. The Airport Is Already Rising.",
    subhead: 'Pre-launch gated plots from ₹18,000–₹22,000 per gaj — 50 to 200 gaj, beside the Yamuna Expressway.',
    chips: ['Freehold', 'Pre-Launch', 'Gated Township', 'By Hari Kripa Buildscape'],
    stats: [
      { word: 'Pre-Launch.', desc: '₹18,000–₹22,000 per gaj today — 50, 100, 150 and 200 gaj plots, before the corridor fully prices in the airport.' },
      { word: 'Airport Belt.', desc: 'Noida International Airport is coming up in Jewar. Land on this stretch is the kind buyers ask about first.' },
    ],
    hook: [
      "Most plots sold near a rising airport aren't actually yours yet — they're leasehold, or waiting on an approval that may never come.",
      'This one is different. Freehold. Gated. Verified before you ever see it.',
    ],
    flagsWarnLabel: 'Typical corridor plots',
    flagsGoodLabel: 'Hari Shyam Township',
    flagsWarn: [
      'Leasehold title, or ownership that still depends on a future NA conversion.',
      'Unverified societies that look finished on a brochure and fail on paper.',
      "Pressure to book before you've walked the land or read the documents.",
    ],
    flagsGood: [
      'Freehold from day one — full title, transferred into your name at registration.',
      'Gated township by Hari Kripa Buildscape, with roads, parks, electricity and water planned in.',
      "Site visit and documentation review before you're asked to commit to anything.",
    ],
    landmarksEyebrow: 'The Corridor',
    landmarksH2: "What's Actually Rising Around This Land",
    landmarksP: 'Airport, expressway, Film City, logistics — and Hari Shyam Township sits inside all of it.',
    landmarks: [
      { tag: 'Noida International Airport', h3: 'Minutes From Where North India Touches Down', p: 'Noida International Airport is going up in Jewar right now. When flights start, plots within reach of it are the ones people look at first.', img: u('photo-1726592058757-3d5c0ba6af29'), alt: 'Aerial view of an airport runway under construction' },
      { tag: 'Yamuna Expressway', h3: 'On the Road That Already Connects Delhi to Agra', p: 'Hari Shyam Township sits on the Yamuna Expressway growth belt — the same corridor that already moves traffic, cargo, and weekend demand between NCR and Agra.', img: img('yamuna-expressway'), alt: 'Yamuna Expressway cutting through open North Indian farmland', reverse: true },
      { tag: 'Film City', h3: "Bollywood's Next Chapter, Planned Down the Road", p: 'A 1,000-acre Film City is planned on this corridor — one of the largest media hubs ever proposed in North India. Land near a project like this rarely stays quiet.', img: u('photo-1471341971476-ae15ff5dd4ea'), alt: 'Camera and lighting set up inside a production studio' },
      { tag: 'Logistics & Commerce', h3: 'A Growing Ecosystem, Not a Quiet Village Plot', p: 'Jewar is drawing logistics parks, warehousing, and commercial demand around the airport. Residential plots here sit next to that job and cargo engine.', img: u('photo-1689942010216-dc412bb1e7a9'), alt: 'Large warehouse filled with stacked pallets', reverse: true },
      { tag: 'Buddh International Circuit', h3: 'The Track That Already Put This Stretch on the Map', p: "Buddh International Circuit, on this corridor, once hosted Formula One in India. It's proof this belt can already draw national attention.", img: u('photo-1557775692-91fa57f514a6'), alt: 'A curved corner of a racing circuit track' },
      { tag: 'Gated Township', h3: 'Wide Roads, Parks, and a Society You Can Lock', p: 'Hari Shyam Township is planned as a gated society with wide roads, greenery, electricity, water, and open parks — a place to build, not a raw khet with a board on it.', img: '/images/plots/hari_shyam_township/jawer_plot3.jpeg', alt: 'Planned gated plot township at Hari Shyam', reverse: true },
    ],
    offerLead: 'Pre-launch residential plots by Hari Kripa Buildscape Pvt. Ltd. — for buyers who want land near Noida’s new airport secured before the Jewar corridor fully builds out.',
    offerItems: [
      'Freehold ownership — full title, in your name',
      'Plot sizes 50, 100, 150 and 200 gaj',
      'Pre-launch ₹18,000–₹22,000 per gaj',
      'Gated township with wide roads, parks, electricity & water',
      'Site visit before you commit to anything',
      'Verified listing, checked by Aurixxrealty before you see it',
    ],
    offerNote: 'Exact plot availability and the current rate band are confirmed per plot — share your details and we’ll send them directly.',
    mapSrc: 'https://www.google.com/maps?q=Noida+International+Airport+Jewar&z=12&hl=en&output=embed',
    mapCaption: 'Jewar growth corridor · Yamuna Expressway · Noida International Airport',
    faqs: [
      { q: 'What does a plot cost at Hari Shyam Township?', a: 'Pre-launch pricing is ₹18,000–₹22,000 per gaj, depending on size and inventory. We’ll confirm the live rate for the plot you want before you book.' },
      { q: 'What sizes are available?', a: 'Plots are offered in 50, 100, 150 and 200 gaj. Inventory is limited at pre-launch — we’ll share what’s open after you share your details.' },
      { q: 'Is this freehold?', a: 'Yes. Hari Shyam Township is positioned as freehold residential land, with title transferred into your name at registration.' },
      { q: 'Can I visit before booking?', a: 'Yes — site visits happen before you’re asked to commit to anything.' },
      { q: 'How far is this from the new airport?', a: 'The township sits on the Jewar–Yamuna Expressway growth corridor, close to Noida International Airport. We’ll walk the exact drive on your site visit.' },
    ],
    closeLead: 'The Corridor Is Being Built',
    closeAccent: 'Right Now.',
    closeSub: 'The airport, expressway traffic, and Jewar’s logistics story are already in motion. Plots along a confirmed catalyst like this typically get harder to access as construction advances. Share your details and Aurixxrealty will call you with sizes, pricing, and a site-visit slot.',
  },
  {
    slug: 'lalita-kunj-nandgaon-barsana',
    code: 'AX-LK-001',
    title: 'Lalita Kunj',
    location: 'Nandgaon–Barsana, Braj, Uttar Pradesh',
    footerPlace: 'Nandgaon–Barsana, Braj, Uttar Pradesh',
    metaTitle: 'Lalita Kunj — Pre-Launch Plots in Nandgaon–Barsana | Aurixxrealty',
    metaDescription: 'Lock Lalita Kunj at ₹32,500 per gaj before the expected launch of ₹45,500. 582 freehold plots across 40 acres in the Braj circuit. Zila Panchayat approved. Guided by Aurixxrealty.',
    heroImage: '/images/plots/lalita-kunj/01.jpg',
    heroImages: [img('radha-rani-barsana'), img('nandgaon'), img('govardhan-parikrama')],
    eyebrow: 'Nandgaon–Barsana · Braj',
    h1: 'Lock Pre-Launch Plots in the Braj Circuit Before the Launch Price.',
    subhead: '₹32,500 per gaj now, against an expected launch of ₹45,500. 582 plots across 40 acres — registration from ₹21,000.',
    chips: ['Freehold', 'Zila Panchayat Approved', '80C Benefit', 'Draw Allotment'],
    stats: [
      { word: '₹32,500 / gaj.', desc: 'Pre-launch rate today. Expected launch is ₹45,500 per gaj — early registration is how you lock the gap.' },
      { word: '40 Acres.', desc: '582 residential plots, Zila Panchayat approved, with 80C benefit and mutation* — allotted through a draw.' },
    ],
    hook: [
      'Most Braj-circuit plots are sold at launch pricing, or as unapproved cuts with no draw and no documents you can actually read.',
      'This one is different. Pre-launch rate. Zila Panchayat approved. Allotted through a draw.',
    ],
    flagsWarnLabel: 'Typical Braj plots',
    flagsGoodLabel: 'Lalita Kunj',
    flagsWarn: [
      'Paying the expected launch rate because you arrived after the pre-launch window.',
      'Unapproved village cuts that look spiritual on Instagram and fail on paper.',
      'No draw, no registration trail, and pressure to book the same day.',
    ],
    flagsGood: [
      'Pre-launch ₹32,500 / gaj against an expected launch of ₹45,500.',
      'Zila Panchayat approved, with 80C benefit and mutation* as marketed.',
      'Plots allotted through a draw. Site visit before you register.',
    ],
    landmarksEyebrow: 'The Circuit',
    landmarksH2: 'Faith Meets a Corridor That’s Being Built Out',
    landmarksP: 'Nandgaon, Barsana, Govardhan, Vrindavan — Lalita Kunj sits inside the Braj map people already travel.',
    landmarks: [
      { tag: 'Nandgaon', h3: 'Five Kilometres From Krishna’s Childhood Town', p: 'Nandgaon is about 5 km away. This is not a speculative pin on a blank map — it’s a plotted township next to a town pilgrims already visit.', img: img('nandgaon'), alt: 'Historic temple town of Nandgaon in the Braj countryside' },
      { tag: 'Shri Radha Rani Temple', h3: 'Ten Kilometres From Barsana’s Main Temple', p: 'Shri Radha Rani Temple in Barsana is about 10 km from the land. Spiritual tourism here is not a future story — the footfall already exists.', img: img('radha-rani-barsana'), alt: 'Golden temple spires of Shri Radha Rani Temple in Barsana', reverse: true },
      { tag: 'Kokilavan', h3: 'Shani Dev Temple, About Six Kilometres Away', p: 'Shani Dev Temple at Kokilavan is roughly 6 km out. Weekend and festival traffic already moves through this belt.', img: '/images/plots/lalita-kunj/02.jpg', alt: 'Open plotted land and parks at Lalita Kunj' },
      { tag: 'Govardhan', h3: 'Fifteen Kilometres From the Parikrama Marg', p: 'Govardhan Parikrama Marg is about 15 km away. Land that sits on the same spiritual circuit tends to hold attention longer than a random outer village.', img: img('govardhan-parikrama'), alt: 'Pilgrims on the Govardhan Parikrama Marg', reverse: true },
      { tag: 'Vrindavan', h3: 'Twenty-Five Kilometres From the Town Everyone Knows', p: 'Vrindavan is about 25 km away — close enough for a second home, far enough that you’re not paying Vrindavan-core prices at pre-launch.', img: img('vrindavan-temples'), alt: 'Temple complex along the Vrindavan spiritual circuit' },
      { tag: 'Tourism Works', h3: 'Roads, Parking, and Amenities Are Being Planned Around Braj', p: 'The Barsana–Nandgaon region is seeing road widening, tourist amenities, parking, and access-road works. RERA for Lalita Kunj is also coming.', img: img('nh2-corridor'), alt: 'Highway stretching through the Braj landscape', reverse: true },
    ],
    offerLead: 'A pre-launch, government-approved residential plot township at Nandgaon–Barsana — for families and investors who want Braj-circuit land before the expected launch price.',
    offerItems: [
      'Pre-launch ₹32,500 / gaj (expected launch ₹45,500)',
      'Registration from ₹21,000 · plots allotted through a draw',
      '40 acres · 582 residential plots',
      'Zila Panchayat approved · 80C benefit · mutation*',
      '52 ft & 35 ft roads, 7 parks, school, community hall, shops',
      'Site visit and paperwork support through Aurixxrealty',
    ],
    offerNote: 'Launch pricing is expected, not guaranteed. We’ll confirm current pre-launch applicability, draw process, and plot options after you share your details.',
    mapSrc: 'https://www.google.com/maps?q=Nandgaon+Barsana+Uttar+Pradesh&z=12&hl=en&output=embed',
    mapCaption: 'Nandgaon–Barsana, Braj, Uttar Pradesh',
    faqs: [
      { q: 'Why is pre-launch cheaper than the expected launch price?', a: 'Lalita Kunj is offering ₹32,500 per gaj at pre-launch against an expected launch of ₹45,500. Early registration is how you lock that rate before inventory moves to launch pricing.' },
      { q: 'How do I get a plot — is it first-come?', a: 'Plots are allotted through a draw. Registration is open from ₹21,000. We’ll walk you through the process before you pay.' },
      { q: 'Is this government-approved?', a: 'Yes — Zila Panchayat approved, with 80C benefit and mutation* as marketed. We’ll share the documents you should review before booking.' },
      { q: 'Can I visit the site first?', a: 'Yes. Site visits happen before you’re asked to commit.' },
      { q: 'Is RERA in place?', a: 'RERA for the project is coming. We’ll be transparent about what’s filed and what’s pending when we speak.' },
    ],
    closeLead: 'The Pre-Launch Window',
    closeAccent: 'Does Not Stay Open.',
    closeSub: '582 plots, one draw, a published gap between pre-launch and expected launch. Share your details and Aurixxrealty will call you with registration steps, current rates, and a site-visit slot.',
  },
  {
    slug: 'nari-semri-plots-vrindavan',
    code: 'AX-NS-001',
    title: 'Nari Semri Plots',
    location: 'Nari Semri, near NH-19 (NH-2) and Sanskriti University, Mathura–Vrindavan',
    footerPlace: 'Nari Semri · Mathura–Vrindavan, Uttar Pradesh',
    metaTitle: 'Nari Semri Plots — Shubh Labh Group Township Near Vrindavan | Aurixxrealty',
    metaDescription: 'Gated residential plots at Nari Semri by Shubh Labh Group. 60–500 sq.yd on the NH-2 belt near Sanskriti University. Price on request. Guided end-to-end by Aurixxrealty.',
    heroImage: '/images/plots/nari-semri/01.jpg',
    heroImages: VRINDAVAN_HERO,
    eyebrow: 'NH-2 · Mathura–Vrindavan',
    h1: 'Gated Plots on the NH-2 Vrindavan Belt. Pricing Shared on Request.',
    subhead: '60–500 sq.yd plots by Shubh Labh Group, near Sanskriti University and the highway into Vrindavan.',
    chips: ['Price on Request', 'Shubh Labh Group', 'Gated Township', 'NH-2 Corridor'],
    stats: [
      { word: '60–500 sq.yd.', desc: 'Typical sizes include 60, 100, 150, 200, 250 and 500 square yards — confirmed after a site discussion.' },
      { word: 'Highway Belt.', desc: 'On the NH-19 / NH-2 corridor near Sanskriti University — the road people already use to reach Mathura–Vrindavan.' },
    ],
    hook: [
      'Most “NH-2 Vrindavan” plots are a khet with a board — no gate, no STP, and a price that only appears after you’ve driven out.',
      'This one is different. A Shubh Labh Group township layout. Sizes on the table. Site visit first.',
    ],
    flagsWarnLabel: 'Typical NH-2 plots',
    flagsGoodLabel: 'Nari Semri Plots',
    flagsWarn: [
      'Unsigned highway-adjacent land with no township infrastructure.',
      'A rate quoted on WhatsApp that doesn’t match the plot you actually walk.',
      'No layout plan until after you’ve paid a token.',
    ],
    flagsGood: [
      'Gated Shubh Labh Group layout near Sanskriti University.',
      'Typical plot sizes 60–500 sq.yd, confirmed after a site discussion.',
      'Layout plan and a walk of the land before you’re asked to commit.',
    ],
    landmarksEyebrow: 'The Belt',
    landmarksH2: 'A Township on the Road Into Vrindavan',
    landmarksP: 'University, highway, temples, expressway access — Nari Semri sits where those already meet.',
    landmarks: [
      { tag: 'Sanskriti University', h3: 'Campus Neighbourhood, Not a Isolated Khet', p: 'Nari Semri plots sit near Sanskriti University. Campuses bring faculty, students, and year-round movement — the kind of demand plotted townships are built next to.', img: img('sanskriti-university'), alt: 'Modern university campus near the Vrindavan highway belt' },
      { tag: 'NH-19 / NH-2', h3: 'On the Highway, Not Hidden Behind a Village Track', p: 'The layout sits on the NH-2 / NH-19 corridor. Access is the first thing serious plot buyers check. This one is on the main road story, not a promise of a future approach.', img: img('nh2-corridor'), alt: 'NH-2 corridor heading toward Mathura–Vrindavan', reverse: true },
      { tag: 'Mathura–Vrindavan', h3: 'Inside the Spiritual Circuit People Already Travel', p: 'This is the Mathura–Vrindavan belt — pilgrimage, weekend homes, and long-stay buyers looking for gated land with a temple-town address.', img: img('mathura-circuit'), alt: 'Temple ghats on the Mathura–Vrindavan spiritual circuit' },
      { tag: 'Township Planning', h3: 'Wide Roads, STP, Parks, Overhead Water', p: 'The Shubh Labh layouts here are marketed with gated entry, roads up to 75 ft at the main gate, STP, 24/7 water via overhead tanks, parks, and CCTV.', img: img('shubh-labh-layout'), alt: 'Gated plotted township with wide internal roads', reverse: true },
      { tag: 'Vrindavan Temples', h3: 'Prem Mandir and ISKCON Are on the Same Circuit', p: 'You’re buying into the Vrindavan approach, not a disconnected outer tehsil. Temple-town demand is already here; the question is which gated layout you enter.', img: img('prem-mandir'), alt: 'Prem Mandir marble temple on the Vrindavan circuit' },
      { tag: 'Yamuna Expressway', h3: 'NCR Access Without Giving Up the Braj Address', p: 'Yamuna Expressway access keeps Delhi NCR in range while you hold land on the Vrindavan highway belt.', img: img('yamuna-expressway'), alt: 'Yamuna Expressway stretching through open land', reverse: true },
    ],
    offerLead: 'Nari Semri plots are part of Shubh Labh Group township layouts near NH-19 and Sanskriti University — for buyers who want gated Vrindavan-belt land with sizes from 60 to 500 sq.yd.',
    offerItems: [
      'Price on request — confirmed after a site discussion',
      'Plot sizes typically 60–500 sq.yd',
      'Near NH-19 and Sanskriti University',
      'Gated township, wide roads, STP, water, parks & CCTV',
      'Layout plan available to download after we speak',
      'Verified listing, checked by Aurixxrealty',
    ],
    offerNote: 'Rates vary by block and launch phase. Share your details and we’ll send current availability and a site-visit slot.',
    mapSrc: 'https://www.google.com/maps?q=Nari+Semri+Vrindavan+NH-2&z=14&hl=en&output=embed',
    mapCaption: 'Nari Semri, near NH-19 (NH-2) and Sanskriti University, Mathura–Vrindavan',
    faqs: [
      { q: 'Why is pricing on request?', a: 'Rates vary by block, size, and launch phase. We’ll share current numbers for the plots that actually fit you — not a stale board rate.' },
      { q: 'Who is the developer?', a: 'Shubh Labh Group. Aurixxrealty verifies the listing and walks the land with you before you commit.' },
      { q: 'What sizes can I buy?', a: 'Typical sizes include 60, 100, 150, 200, 250 and 500 sq.yd. We’ll confirm what’s open on your call.' },
      { q: 'Can I see the layout plan?', a: 'Yes. We share the layout after a short discussion so you know block-wise arrangement before a visit.' },
      { q: 'Can I visit before booking?', a: 'Yes — site visits happen before you’re asked to commit.' },
    ],
    closeLead: 'Highway Land Into Vrindavan',
    closeAccent: 'Does Not Stay Quiet.',
    closeSub: 'NH-2, a university next door, and gated township infrastructure. Share your details and Aurixxrealty will call you with sizes, current pricing, and a time to walk the site.',
  },
  {
    slug: 'radha-krishna-vrindavan-ashram',
    code: 'AX-RK-001',
    title: 'Radha Krishna Vrindavan Ashram',
    location: 'NH-2, near Nari Semri / opposite Sukhdev Dhaba, Vrindavan, Uttar Pradesh',
    footerPlace: 'Vrindavan · NH-2, Uttar Pradesh',
    metaTitle: 'Radha Krishna Vrindavan Ashram — Gated Plots on NH-2 | Aurixxrealty',
    metaDescription: 'Own a gated plot at Radha Krishna Vrindavan Ashram by Shubh Labh Group, on NH-2 opposite Sukhdev Dhaba. Parks, sports courts, temple-circuit access. Price on request. Guided by Aurixxrealty.',
    heroImage: '/images/plots/radha-krishna-vihar/01.jpg',
    heroImages: VRINDAVAN_HERO,
    eyebrow: 'Vrindavan · Opposite Sukhdev Dhaba',
    h1: 'Live Near the Temples. Own a Plot at Radha Krishna Vrindavan Ashram.',
    subhead: 'A gated Shubh Labh Group plotted community on NH-2, opposite Sukhdev Dhaba — ready-to-move and developing plots, pricing on request.',
    chips: ['Price on Request', 'Shubh Labh Group', 'Gated Community', 'NH-2 Vrindavan'],
    stats: [
      { word: 'Ashram Address.', desc: 'Not a generic NH-2 khet. A named gated community — Radha Krishna Vrindavan Ashram — on the Vrindavan approach.' },
      { word: 'On NH-2.', desc: 'Opposite Sukhdev Dhaba, near Nari Semri. Highway access first, temple circuit second — both on the same drive.' },
    ],
    hook: [
      'Most Vrindavan plots are sold as “near the temples” with no gate, no pin you can find, and amenities that exist only in the brochure.',
      'This one is different. A named ashram township on NH-2. Opposite a landmark. Parks and courts in the plan.',
    ],
    flagsWarnLabel: 'Typical Vrindavan plots',
    flagsGoodLabel: 'Vrindavan Ashram',
    flagsWarn: [
      'A “near Prem Mandir” pin that is actually a village track with no society.',
      'Amenities listed in a PDF that aren’t on the ground.',
      'No highway landmark — just a promise of future access.',
    ],
    flagsGood: [
      'Gated Shubh Labh Group community: Radha Krishna Vrindavan Ashram.',
      'NH-2, near Nari Semri, opposite Sukhdev Dhaba — a pin drivers already know.',
      'Parks, sports courts, security and CCTV as marketed — verified on your visit.',
    ],
    landmarksEyebrow: 'The Circuit',
    landmarksH2: 'Temples, Highway, and a Gated Layout in Between',
    landmarksP: 'Prem Mandir, ISKCON, NH-2 — this ashram township sits on the road people already take into Vrindavan.',
    landmarks: [
      { tag: 'Prem Mandir', h3: 'On the Same Circuit as Vrindavan’s Marble Temple', p: 'Prem Mandir is on the Vrindavan circuit this community is built for. You’re not buying “near UP.” You’re buying a plot on the temple-town approach.', img: img('prem-mandir'), alt: 'Historic marble temple monument of Prem Mandir, Vrindavan' },
      { tag: 'ISKCON Temple', h3: 'ISKCON Is Part of the Same Drive, Not a Distant Promise', p: 'ISKCON Temple sits on the same Vrindavan circuit. Second-home and spiritually inclined buyers already know this map.', img: img('iskcon-vrindavan'), alt: 'ISKCON Krishna Balaram Mandir on the Vrindavan circuit', reverse: true },
      { tag: 'Sukhdev Dhaba / NH-2', h3: 'Opposite a Landmark Everyone on This Highway Knows', p: 'The site is described as NH-2 near Nari Semri, opposite Sukhdev Dhaba. That’s a pin you can actually find — not a “upcoming sector” with no road.', img: img('nh2-corridor'), alt: 'NH-2 highway corridor near Vrindavan' },
      { tag: 'Parks & Sports', h3: 'Parks, Power Backup, Badminton and Basketball Courts', p: 'This is planned as a gated community with 24/7 security, CCTV, power backup, parks, and sports courts — an ashram-named township you can live in, not only hold.', img: img('gated-park'), alt: 'Landscaped green park inside a gated community', reverse: true },
      { tag: 'Yamuna Expressway', h3: 'NCR Still in Reach', p: 'Yamuna Expressway access keeps Greater Noida and Delhi in the conversation while you own land on the Vrindavan highway.', img: img('yamuna-expressway'), alt: 'Yamuna Expressway in North India' },
      { tag: 'Shubh Labh Group', h3: 'One Group, Three Layouts on This Belt', p: 'Shubh Labh Group also presents Nari Semri and Radha Krishna Puram on the same corridor. We’ll show you which layout actually fits your size and budget.', img: img('shubh-labh-layout'), alt: 'Gated township layout by Shubh Labh Group', reverse: true },
    ],
    offerLead: 'Radha Krishna Vrindavan Ashram is a gated residential plotted development by Shubh Labh Group on NH-2 — for families and investors who want a Vrindavan-circuit address with society infrastructure.',
    offerItems: [
      'Price on request — confirmed after a site discussion',
      'Gated plotted development on NH-2',
      'Near Nari Semri / opposite Sukhdev Dhaba',
      'Parks, sports courts, security, CCTV, power backup',
      'Access to Prem Mandir and ISKCON on the same circuit',
      'Layout plan and site visit through Aurixxrealty',
    ],
    offerNote: 'Plot sizes vary across the layout. Share your details and we’ll send what’s open, with a time to walk the land.',
    mapSrc: 'https://www.google.com/maps?q=Sukhdev+Dhaba+Nari+Semri+Vrindavan&z=14&hl=en&output=embed',
    mapCaption: 'NH-2, near Nari Semri / opposite Sukhdev Dhaba, Vrindavan, Uttar Pradesh',
    faqs: [
      { q: 'Is this the same as Radha Krishna Vihar?', a: 'The project is listed as Radha Krishna Vrindavan Ashram — the Shubh Labh Group gated layout on NH-2 near Nari Semri. We’ll send the official layout name on your call so the papers match the board.' },
      { q: 'Is pricing published?', a: 'Pricing is on request. Rates depend on plot and phase. We’ll share current numbers after a short discussion.' },
      { q: 'What’s included in the community?', a: 'Gated security, CCTV, power backup, parks, badminton and basketball courts, as marketed. We’ll verify on site with you.' },
      { q: 'How close are the temples?', a: 'Prem Mandir and ISKCON are on the Vrindavan circuit this location is sold on. We’ll time the drive during your visit.' },
      { q: 'Can I visit before booking?', a: 'Yes. No commitment is asked before you’ve seen the land.' },
    ],
    closeLead: 'Vrindavan Plots With a Gate',
    closeAccent: 'Are Not Unlimited.',
    closeSub: 'NH-2, an ashram-named township, and the temple circuit on the same drive. Share your details and Aurixxrealty will call you with plot options, pricing, and a site-visit slot.',
  },
  {
    slug: 'radha-krishna-puram-vrindavan',
    code: 'AX-RP-001',
    title: 'Radha Krishna Puram',
    location: 'Nari Semri Village, NH-2, opposite Sukhdev Dhaba, Chhata Rural, Semri, Mathura 281401',
    footerPlace: 'Nari Semri Village · NH-2, Mathura 281401',
    metaTitle: 'Radha Krishna Puram — Shubh Labh Plots on NH-2 Vrindavan | Aurixxrealty',
    metaDescription: 'Gated colony plots at Radha Krishna Puram by Shubh Labh Group, NH-2 opposite Sukhdev Dhaba. 25–40 ft roads, parks, shops in layout. Price on request. Guided by Aurixxrealty.',
    heroImage: '/images/plots/radha-krishna-puram/01.jpg',
    heroImages: VRINDAVAN_HERO,
    eyebrow: 'NH-2 · Nari Semri Village',
    h1: 'A Gated Colony on NH-2. Shops in the Layout. Pricing on Request.',
    subhead: 'Radha Krishna Puram by Shubh Labh Group — 25–40 ft internal roads, parks, water, power, and commercial shops, opposite Sukhdev Dhaba.',
    chips: ['Price on Request', 'Shubh Labh Group', 'Gated Colony', 'Shops in Layout'],
    stats: [
      { word: 'Gated Colony.', desc: 'Internal roads from 25 ft to 40 ft, dedicated parks, water and electrical lines, 24/7 security — a colony, not a raw parcel.' },
      { word: 'On NH-2.', desc: 'Nari Semri Village, opposite Sukhdev Dhaba, Chhata Rural, Mathura 281401. A postal pin, not a “coming soon” sector.' },
    ],
    hook: [
      'Most highway plots stop at a boundary stone. No internal roads, no shops, no colony you could actually live in.',
      'This one is different. A gated colony. 25–40 ft streets. Shops in the layout. Opposite Sukhdev Dhaba.',
    ],
    flagsWarnLabel: 'Typical highway plots',
    flagsGoodLabel: 'Radha Krishna Puram',
    flagsWarn: [
      'Plots without internal roads wide enough to drive a car comfortably.',
      'No commercial shops — every daily need is a highway run.',
      'A “NH-2” claim that is actually three kilometres down an inner road.',
    ],
    flagsGood: [
      'Gated colony with 25–40 ft internal roads.',
      'Commercial shops planned inside the layout.',
      'Nari Semri Village, NH-2, opposite Sukhdev Dhaba — Mathura 281401.',
    ],
    landmarksEyebrow: 'The Location',
    landmarksH2: 'Highway Frontage With a Colony Behind the Gate',
    landmarksP: 'Sukhdev Dhaba, NH-2, Vrindavan, expressway access — Puram is built for buyers who want shops and streets, not only a plot number.',
    landmarks: [
      { tag: 'Sukhdev Dhaba', h3: 'Opposite a Highway Landmark You Can Actually Find', p: 'The address is Nari Semri Village, NH-2, opposite Sukhdev Dhaba. If a driver can find the dhaba, they can find your colony gate.', img: '/images/plots/radha-krishna-puram/01.jpg', alt: 'Gated colony entrance at Radha Krishna Puram' },
      { tag: 'NH-2', h3: 'Directly on the Highway Corridor', p: 'This is not a three-kilometre inner-road story. The offering is aimed at families building vacation homes and investors watching the Yamuna Expressway belt.', img: img('nh2-corridor'), alt: 'National highway corridor into Vrindavan', reverse: true },
      { tag: 'Internal Roads', h3: '25 to 40 Feet — Streets You Can Drive, Not Lanes You Negotiate', p: 'Gated colony infrastructure with internal roads from 25 ft to 40 ft. Road width is one of the first things we check on a site visit. Here it’s part of the plan.', img: '/images/plots/radha-krishna-puram/02.jpg', alt: 'Internal street and neighborhood park at Radha Krishna Puram' },
      { tag: 'Commercial Shops', h3: 'Shops Inside the Layout, Not a Dead-End Society', p: 'Commercial shopping spaces are planned within the layout — daily needs without leaving the colony gate for every packet of milk.', img: img('colony-shops'), alt: 'Commercial shops along a planned colony street', reverse: true },
      { tag: 'Vrindavan', h3: 'Temple Town Nearby, Highway Under the Gate', p: 'Vrindavan is the demand story. NH-2 is the access story. Puram is sold as both.', img: img('vrindavan-temples'), alt: 'Temple complex in Vrindavan' },
      { tag: 'Yamuna Expressway', h3: 'NCR Buyers Can Still Make the Drive', p: 'Corridor access to the Yamuna Expressway keeps Greater Noida and Delhi in range for weekend and investment buyers.', img: img('yamuna-expressway'), alt: 'Yamuna Expressway for NCR buyers', reverse: true },
    ],
    offerLead: 'Radha Krishna Puram is a residential plotting project by Shubh Labh Group on the NH-2 corridor near Vrindavan — gated colony infrastructure for vacation homes and long-term land.',
    offerItems: [
      'Price on request — confirmed after a site discussion',
      'NH-2, Nari Semri, opposite Sukhdev Dhaba',
      'Gated colony with 25–40 ft internal roads',
      'Parks, water supply lines, electrical connections',
      'Commercial shops planned in the layout',
      'Revised layout plan available through Aurixxrealty',
    ],
    offerNote: 'Pricing is confirmed after a site discussion. Share your details and we’ll send current plot options and a visit slot.',
    mapSrc: 'https://www.google.com/maps?q=Nari+Semri+Village+Chhata+Mathura+281401&z=14&hl=en&output=embed',
    mapCaption: 'Nari Semri Village, NH-2, opposite Sukhdev Dhaba, Chhata Rural, Semri, Mathura 281401',
    faqs: [
      { q: 'How is Puram different from the Ashram layout?', a: 'Both are Shubh Labh Group projects on the NH-2 / Nari Semri belt. Puram is positioned as a gated colony with 25–40 ft roads and commercial shops in the layout. We’ll show both on a visit if you want to compare.' },
      { q: 'Is there a published rate?', a: 'Pricing is on request. We’ll share current figures for the plots that match your size.' },
      { q: 'Are shops really inside the project?', a: 'Commercial shopping spaces are part of the marketed layout. We’ll walk the plan and the ground with you.' },
      { q: 'Is it freehold?', a: 'The offering is residential plotted land with colony infrastructure. We’ll review title and documents before you book.' },
      { q: 'Can I visit first?', a: 'Yes. Site visits happen before commitment.' },
    ],
    closeLead: 'A Colony on a Named Highway',
    closeAccent: 'Is Easier to Explain Later.',
    closeSub: 'Opposite Sukhdev Dhaba, gated streets, shops in the plan. Share your details and Aurixxrealty will call you with plot options, pricing, and a time to see Puram.',
  },
  {
    slug: 'vrinda-vatika-homes-vrindavan',
    code: 'AX-VV-001',
    title: 'Vrinda Vatika Homes: Ultra Luxury Residential Plots',
    location: 'NH-2, Semri, Vrindavan, Uttar Pradesh 281401',
    footerPlace: 'NH-2, Semri, Vrindavan, Uttar Pradesh 281401',
    metaTitle: 'Vrinda Vatika Homes — Ultra Luxury Plots in Vrindavan | Aurixxrealty',
    metaDescription: 'Freehold gated plots at Vrinda Vatika Homes, NH-2 Semri, Vrindavan. From ₹29,900* per sq.yd, 110–255 sq.yd, 80(1) approved. Minutes from Prem Mandir and ISKCON. Guided by Aurixxrealty.',
    heroImage: '/images/plots/vrinda-vatika/cover.png',
    heroImages: VRINDAVAN_HERO,
    eyebrow: 'NH-2 · Semri, Vrindavan',
    h1: 'Ultra-Luxury Freehold Plots in Vrindavan. From ₹29,900* per sq.yd.',
    subhead: '110–255 sq.yd in a government 80(1)-approved gated community on NH-2 — 900 m from Sanskriti University, minutes from Prem Mandir and ISKCON.',
    chips: ['Freehold', '80(1) Approved', 'Gated Community', 'VVH Group'],
    stats: [
      { word: '₹29,900* / sq.yd.', desc: 'Starting rate for 110–255 sq.yd plots. Price is subject to terms — we’ll confirm what applies before you book.' },
      { word: '80(1) Approved.', desc: 'Government 80(1)-approved freehold gated community on NH-2, Semri — not an unapproved village cut.' },
    ],
    hook: [
      'Most Vrindavan “luxury plots” inflate temple distances and skip the approval that actually lets you build.',
      'This one is different. 80(1) approved. 900 m from Sanskriti University. Temples timed in minutes, not slogans.',
    ],
    flagsWarnLabel: 'Typical Vrindavan plots',
    flagsGoodLabel: 'Vrinda Vatika Homes',
    flagsWarn: [
      'Unapproved cuts sold as spiritual-city land.',
      'Temple distances that only work if you ignore traffic.',
      'No gated amenities — a fence and a promise of a clubhouse later.',
    ],
    flagsGood: [
      'Government 80(1)-approved freehold gated community.',
      'On NH-2, 900 m from Sanskriti University; Prem Mandir about 10 minutes.',
      'Club house, pools, parks, CCTV and power backup as listed by VVH Group.',
    ],
    landmarksEyebrow: 'Vrindavan',
    landmarksH2: 'Temples on the Clock. NCR on the Calendar.',
    landmarksP: 'Prem Mandir, ISKCON, Chandrodaya Mandir, Sanskriti University — and Vrinda Vatika sits inside all of it. Delhi is about two hours away.',
    landmarks: [
      { tag: 'Sanskriti University', h3: 'Nine Hundred Metres From Campus', p: 'The site sits on NH-2, just 900 metres from Sanskriti University. That’s a neighbour you can walk, not a brochure distance.', img: img('sanskriti-university'), alt: 'University campus near Vrinda Vatika Homes' },
      { tag: 'Prem Mandir', h3: 'About Ten Minutes From the Marble Temple', p: 'Prem Mandir is about 10 minutes away. This is the Vrindavan people mean when they say they want a second home in the land of Krishna.', img: img('prem-mandir-night'), alt: 'Illuminated Prem Mandir in Vrindavan', reverse: true },
      { tag: 'ISKCON Temple', h3: 'Twelve Minutes From ISKCON', p: 'ISKCON Temple is about 12 minutes. Bankey Bihari is about 15. The temple loop is the lifestyle — the gated plot is how you stay overnight in it.', img: img('iskcon-vrindavan'), alt: 'ISKCON Temple on the Vrindavan circuit' },
      { tag: 'Chandrodaya Mandir', h3: 'Next to a Temple Planned to Touch the Sky', p: 'The upcoming Vrindavan Chandrodaya Mandir — planned at 700 feet as the tallest Krishna temple in the world — sits adjacent in the story of this belt (a proposed ISKCON Bangalore devotees’ project, not a VVH Group project).', img: img('chandrodaya-mandir'), alt: 'Grand soaring temple tower planned for Vrindavan', reverse: true },
      { tag: 'Mathura & Agra', h3: 'Fifteen Minutes to Mathura. Forty-Five to Agra.', p: 'Mathura and the railway station are about 15 minutes. Agra is about 45. This is a Vrindavan address with tourist-circuit connectivity already working.', img: img('mathura-agra'), alt: 'Ceremonial boulevard on the Mathura–Agra circuit' },
      { tag: 'Delhi NCR', h3: 'About Two Hours From New Delhi', p: 'New Delhi about 2 hours, Greater Noida about 1.5, Gurugram about 2. Ultra-luxury plots here are built for NCR families who want Vrindavan without giving up the city.', img: img('yamuna-expressway'), alt: 'Expressway from NCR toward Vrindavan', reverse: true },
    ],
    offerLead: 'Vrinda Vatika Homes (VVH Group) offers freehold residential plots in a gated community on NH-2, Semri — for buyers who want a Vrindavan home with club-house amenities, not only a fenced khet.',
    offerItems: [
      'From ₹29,900* per sq.yd · 110–255 sq.yd',
      'Government 80(1) approved freehold gated community',
      '900 m from Sanskriti University on NH-2',
      '8–15 min from Prem Mandir, ISKCON and Bankey Bihari',
      'Club house, pools, parks, CCTV, solar lighting, power backup',
      'Price list and site visit through Aurixxrealty',
    ],
    offerNote: '*Starting price is subject to terms. Confirm current applicability of ₹29,900 per sq.yd before booking.',
    mapSrc: 'https://www.google.com/maps?q=NH-2+Semri+Vrindavan+Uttar+Pradesh+281401&z=14&hl=en&output=embed',
    mapCaption: 'Vrinda Vatika Homes, NH-2, Semri, Vrindavan, Uttar Pradesh 281401',
    faqs: [
      { q: 'Is the ₹29,900 rate guaranteed?', a: 'It is a starting rate subject to terms. We’ll confirm what applies to the plot size you want before you book.' },
      { q: 'What does 80(1) approved mean here?', a: 'The community is marketed as government 80(1) approved and freehold. We’ll share the documents you should review with us on the call and at site.' },
      { q: 'What amenities are on site?', a: '24x7 CCTV security, gated streets, wide roads, water harvesting, parks, kids’ play, club house, swimming pools, solar lighting and power backup, as listed by the developer.' },
      { q: 'Who is the developer?', a: 'Vrinda Vatika Homes (VVH Group). Aurixxrealty represents the listing and stays with you through visit, docs, and closing.' },
      { q: 'Can I visit before booking?', a: 'Yes. Site visits happen before you’re asked to commit.' },
    ],
    closeLead: 'Vrindavan Land With a Gate and a Rate',
    closeAccent: 'Still Has a Clock.',
    closeSub: '80(1) approved, NH-2, temples in minutes, NCR in hours. Share your details and Aurixxrealty will call you with sizes, current pricing, and a site-visit slot.',
  },
]


mkdirSync(outDir, { recursive: true })
for (const page of pages) {
  writeFileSync(join(outDir, `${page.slug}.html`), renderHome(page), 'utf8')
  writeFileSync(join(outDir, `${page.slug}-the-corridor.html`), renderCorridor(page), 'utf8')
  console.log('wrote', page.slug, '+ corridor')
}

writeFileSync(
  join(__dirname, '..', 'src', 'lib', 'plotLandingSlugs.ts'),
  `export const PLOT_LANDING_SLUGS = ${JSON.stringify(
    pages.map((p) => p.slug),
    null,
    2
  )} as const\n`
)
console.log('done')
