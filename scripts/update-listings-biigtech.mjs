import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const p = path.join(root, 'seed-media/listings.json')
const listings = JSON.parse(fs.readFileSync(p, 'utf8')).filter((l) => l.code !== 'AX-BT-001')
const localImages = [
  'public/images/plots/biigtech/cover.jpg',
  ...Array.from({ length: 18 }, (_, i) => `public/images/plots/biigtech/${String(i + 2).padStart(2, '0')}.jpg`),
]
listings.push({
  code: 'AX-BT-001',
  folder: 'plots',
  slug: 'biigtech-knowledge-park-3-greater-noida',
  type: 'Commercial',
  title: 'BiiGTecH: Marking Your Territory',
  location: 'Plot No. 21, Knowledge Park 3, Greater Noida, Uttar Pradesh 201308',
  locality: 'Knowledge Park 3, Greater Noida',
  price: 0,
  priceLabel: 'Price on Request',
  priceOnRequest: true,
  area: 0,
  areaUnit: 'sq.ft',
  ownership: 'Freehold',
  status: 'Available for Sale',
  age: 'New',
  description:
    'BiiGTecH premium commercial project at Knowledge Park 3, Greater Noida - retail, food court, gaming, offices and studio apartments.',
  highlights: [
    'Knowledge Park 3, Greater Noida',
    'Retail, F&B, gaming, offices',
    'Near Aqua Line metro',
    'High footfall mixed-use hub',
    'Bank loan / CLP options',
    'Fully paid-up land',
  ],
  amenities: [
    'Food court',
    'Gaming zone',
    'Retail shops',
    'Premium office suites',
    'Studio apartments',
    'Multipurpose entertainment',
    'Business lounges',
    'Ample parking',
  ],
  featured: true,
  badge: 'New',
  nearbyPlaces: [
    { name: 'Sharda University & Hospital', distance: '~1.2 km' },
    { name: 'Knowledge Park Metro Station', distance: '~2 km' },
    { name: 'Pari Chowk', distance: '~3 km' },
  ],
  panoramaUrl:
    'https://maps.google.com/maps?layer=c&panoid=82kLX9lPmZjt8KBnPcAz9A&ie=UTF8&source=embed&output=svembed&cbp=13,323.87,,0,0',
  mapEmbedUrl: 'https://www.google.com/maps?q=28.4800882,77.4822992&z=17&hl=en&output=embed',
  localImages,
  localVideos: [
    'public/videos/plots/biigtech/01.mp4',
    'public/videos/plots/biigtech/02.mp4',
    'public/videos/plots/biigtech/03.mp4',
    'public/videos/plots/biigtech/04.mp4',
  ],
  documents: [
    { label: 'Download Retail Shops Price List', url: '/docs/biigtech/price-list-retail-shops.pdf' },
    { label: 'Download Food & Entertainment Price List', url: '/docs/biigtech/price-list-food-entertainment.pdf' },
    { label: 'Download Gaming Zone Price List', url: '/docs/biigtech/price-list-gaming-zone.pdf' },
    { label: 'Download Office Price List', url: '/docs/biigtech/price-list-office.pdf' },
  ],
})
fs.writeFileSync(p, JSON.stringify(listings, null, 2))
console.log(listings.map((l) => l.code).join(', '))
