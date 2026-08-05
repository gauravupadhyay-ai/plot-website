import fs from 'node:fs'
import path from 'node:path'

const root = 'c:/Users/gaura/Downloads/morin-propertys-main'
const p = path.join(root, 'seed-media/listings.json')
const listings = JSON.parse(fs.readFileSync(p, 'utf8')).filter((l) => l.code !== 'AX-BT-001')

const imgDir = path.join(root, 'public/images/plots/biigtech')
const files = fs
  .readdirSync(imgDir)
  .filter((f) => f.endsWith('.jpg'))
  .sort((a, b) => {
    if (a.startsWith('cover')) return -1
    if (b.startsWith('cover')) return 1
    return a.localeCompare(b, undefined, { numeric: true })
  })
const localImages = files.map((f) => `public/images/plots/biigtech/${f}`)

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
  areaLabel: 'Retail / F&B / Office units',
  ownership: 'Freehold',
  status: 'Available for Sale',
  age: 'New',
  description:
    'BiiGTecH - Marking Your Territory is a premium commercial project at Plot No. 21, Knowledge Park 3 (I.T. Park KP-21), Greater Noida. Mixed-use hub with food court, gaming zone, retail, offices, and studio apartments. Near Aqua Line metro and Yamuna / Noida-Greater Noida Expressways. RERA UPRERAPRJ656513/08/2025.',
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
    'Multiplex / entertainment',
    'Business lounges',
    'Ample parking',
    'Wide passages and atriums',
    'Energy-efficient systems',
    'Metro and expressway connectivity',
  ],
  featured: true,
  badge: 'New',
  nearbyPlaces: [
    { name: 'Sharda University & Hospital', distance: '~1.2 km' },
    { name: 'India Expo Mart / LG Chowk', distance: '~2 km' },
    { name: 'Knowledge Park Metro Station', distance: '~2 km' },
    { name: 'Pari Chowk / Jaypee Golf', distance: '~3 km' },
    { name: 'Yamuna & Eastern Peripheral Expressway', distance: '~5 km' },
    { name: 'Jewar International Airport', distance: '~44 km' },
  ],
  mapEmbedUrl: 'https://www.google.com/maps?q=28.4800882,77.4822992&z=17&hl=en&output=embed',
  panoramaUrl:
    'https://maps.google.com/maps?layer=c&panoid=82kLX9lPmZjt8KBnPcAz9A&ie=UTF8&source=embed&output=svembed&cbp=13,323.87,,0,0',
  localImages,
  localVideos: [
    'public/videos/plots/biigtech/01.mp4',
    'public/videos/plots/biigtech/02.mp4',
    'public/videos/plots/biigtech/03.mp4',
    'public/videos/plots/biigtech/04.mp4',
  ],
  documents: [
    { label: 'Download Retail Shops Price List', url: '/docs/biigtech/price-list-retail-shops.pdf' },
    {
      label: 'Download Food & Entertainment Price List',
      url: '/docs/biigtech/price-list-food-entertainment.pdf',
    },
    { label: 'Download Gaming Zone Price List', url: '/docs/biigtech/price-list-gaming-zone.pdf' },
    { label: 'Download Office Price List', url: '/docs/biigtech/price-list-office.pdf' },
  ],
})

fs.writeFileSync(p, JSON.stringify(listings, null, 2))
console.log('images', localImages.length)
console.log(listings.map((l) => l.code).join(', '))
