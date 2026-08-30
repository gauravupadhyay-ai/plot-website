/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'dhxkwqtocmpnqcnlttko.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/the-corridor', destination: '/properties', permanent: true },
      { source: '/the-corridor/', destination: '/properties', permanent: true },
      { source: '/the-corridor.html', destination: '/properties', permanent: true },
      { source: '/expressway-residency', destination: '/properties', permanent: true },
      { source: '/expressway-residency.html', destination: '/properties', permanent: true },
      { source: '/properties/expressway-residency-yamuna-expressway', destination: '/properties', permanent: true },
      { source: '/properties/shri-radha-krishna-vihar-vrindavan', destination: '/properties/radha-krishna-vrindavan-ashram', permanent: true },
      { source: '/index.html', destination: '/properties', permanent: true },
    ];
  },
};

module.exports = nextConfig;
