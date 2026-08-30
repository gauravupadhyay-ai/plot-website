import { Locality } from '@/types/property'

/** Localities aligned with live seedPlots inventory (exact `locality` name match). */
export const localities: Locality[] = [
  {
    slug: 'jewar-yamuna-expressway',
    name: 'Jewar / Yamuna Expressway',
    description:
      'Pre-launch gated plots on the Jewar growth corridor — Yamuna Expressway access, Noida International Airport, and Film City-led infrastructure.',
    propertyCount: 1,
    image: '/images/plots/hari_shyam_township/jawer_plot1.jpeg',
  },
  {
    slug: 'nandgaon-barsana',
    name: 'Nandgaon / Barsana',
    description:
      'Pre-launch government-approved plots in the Braj spiritual circuit — Nandgaon, Barsana, Govardhan, and Vrindavan connectivity.',
    propertyCount: 1,
    image: '/images/plots/lalita-kunj/01.jpg',
  },
  {
    slug: 'nari-semri-vrindavan',
    name: 'Nari Semri / Vrindavan',
    description:
      'Shubh Labh Group plotted townships on NH-2 near Sanskriti University — Nari Semri Plots, Radha Krishna Vrindavan Ashram, and Radha Krishna Puram.',
    propertyCount: 3,
    image: '/images/plots/nari-semri/01.jpg',
  },
  {
    slug: 'vrindavan',
    name: 'Vrindavan',
    description:
      'Ultra-luxury residential plots near temples and planned infrastructure. Ideal for buyers seeking spiritual-city living with gated community layouts.',
    propertyCount: 1,
    image: '/images/plots/vrinda-vatika/cover.png',
  },
  {
    slug: 'sector-153-noida',
    name: 'Sector 153, Noida',
    description:
      'Commercial and IT office suites on the Noida Expressway belt with on-site retail and strong corporate footfall.',
    propertyCount: 2,
    image: '/images/plots/urbtech-business-suites/cover.jpg',
  },
  {
    slug: 'gaur-yamuna-city',
    name: 'Yamuna Expressway / Gaur Yamuna City',
    description:
      'Gaurs Group residences and suites on the Yamuna Expressway — Chrysalis and Aero Suites for end-users and investors.',
    propertyCount: 1,
    image: '/images/plots/gaur-chrysalis/cover.jpg',
  },
  {
    slug: 'omicron-1a-greater-noida',
    name: 'Omicron 1A, Greater Noida',
    description:
      'Eldeco 7 Peaks Residence in Omicron 1A — connected apartments with strong Greater Noida West / Expressway access.',
    propertyCount: 1,
    image: '/images/plots/eldeco-7-peaks/cover.jpg',
  },
  {
    slug: 'knowledge-park-3',
    name: 'Knowledge Park 3, Greater Noida',
    description:
      'BiiGTecH mixed-use commercial hub — retail, F&B, gaming, and offices surrounded by colleges and IT parks.',
    propertyCount: 1,
    image: '/images/plots/biigtech/cover.jpg',
  },
]

/** Hero search location options (must match Property.locality). */
export const searchLocalities = localities.map((l) => l.name)

/** Best cover image per listing for homepage hero rotation. */
export const heroPlotImages = [
  { src: '/images/plots/hari_shyam_township/jawer_plot1.jpeg', title: 'Hari Shyam Township', locality: 'Jewar / Yamuna Expressway' },
  { src: '/images/plots/lalita-kunj/01.jpg', title: 'Lalita Kunj', locality: 'Nandgaon / Barsana' },
  { src: '/images/plots/nari-semri/01.jpg', title: 'Nari Semri Plots', locality: 'Nari Semri / Vrindavan' },
  { src: '/images/plots/radha-krishna-vihar/01.jpg', title: 'Radha Krishna Vrindavan Ashram', locality: 'Nari Semri / Vrindavan' },
  { src: '/images/plots/radha-krishna-puram/01.jpg', title: 'Radha Krishna Puram', locality: 'Nari Semri / Vrindavan' },
  { src: '/images/plots/vrinda-vatika/cover.png', title: 'Vrinda Vatika Homes', locality: 'Vrindavan' },
  { src: '/images/plots/urbtech-business-suites/cover.jpg', title: 'Urbtech Business Suites', locality: 'Sector 153, Noida' },
  { src: '/images/plots/urbtech-npx-extension/cover.jpg', title: 'Urbtech NPX Extension', locality: 'Sector 153, Noida' },
  { src: '/images/plots/gaur-chrysalis/cover.jpg', title: 'Gaur Chrysalis & Aero Suites', locality: 'Yamuna Expressway' },
  { src: '/images/plots/eldeco-7-peaks/cover.jpg', title: 'Eldeco 7 Peaks Residence', locality: 'Greater Noida' },
  { src: '/images/plots/biigtech/cover.jpg', title: 'BiiGTecH Knowledge Park 3', locality: 'Greater Noida' },
]

export function getLocalityBySlug(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug)
}
