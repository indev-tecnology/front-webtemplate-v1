/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { locales: ['es'], defaultLocale: 'es', localeDetection: false,  },
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  images: { remotePatterns: [{ protocol: 'https', hostname: process.env.NEXT_IMAGES_HOSTNAME_PREFIX? process.env.NEXT_IMAGES_HOSTNAME_PREFIX: 'locahost:3000' }] },
};
export default nextConfig;
