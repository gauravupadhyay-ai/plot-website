import { TeamMember } from '@/types/property'

export const founders: TeamMember[] = [
  {
    name: 'Aryan Yadav',
    role: 'Co-Founder',
    image: '/images/team/aryan-yadav.png',
    linkedin: 'https://www.linkedin.com/in/aryan-yadav-434273251/',
    bio: 'Leads strategy and client relationships across Greater Noida, Noida, Yamuna Expressway, and Vrindavan — focused on clear advice for plots, residences, and commercial deals.',
  },
  {
    name: 'Sukhpreet Singh Kajal',
    role: 'Co-Founder',
    image: '',
    linkedin: 'https://www.linkedin.com/in/sukhpreet-singh-kajal-bab77a33/',
    bio: 'Drives operations and inventory curation at Aurixxrealty, ensuring every listing is verified and every buyer journey — from enquiry to registration — stays transparent.',
  },
]

export const team: TeamMember[] = [...founders]

export const certifications = [
  { name: 'NAR', fullName: 'National Association of Realtors — Certified Member' },
  { name: 'CREDAI', fullName: 'CREDAI — Active Member' },
  { name: 'Digital Certified', fullName: 'Digital Certified Real Estate Professional' },
  { name: 'eXp Realty', fullName: 'eXp Realty Certified' },
]

export const galleryImages = [
  { src: '/images/gallery/investor-meet.jpg', alt: 'Investor Meet', caption: 'Investor Meet' },
  { src: '/images/gallery/exhibition-navlakhi.jpg', alt: 'Exhibition Stall', caption: 'Exhibition Stall' },
  { src: '/images/gallery/credai.jpg', alt: 'At CREDAI', caption: 'At CREDAI' },
  { src: '/images/gallery/morin-team.jpg', alt: 'Aurixxrealty Team', caption: 'Aurixxrealty Team' },
  { src: '/images/gallery/vpca-visit.jpg', alt: 'NCR Partner Visit', caption: 'NCR Partner Visit' },
]
