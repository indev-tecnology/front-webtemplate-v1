/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { locales: ['es'], defaultLocale: 'es', localeDetection: false },
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  images: {
    remotePatterns: [
      // S3/Cloud storage host (configurable por env)
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGES_HOSTNAME_PREFIX || 'indev-clients-medias.s3.us-east-1.amazonaws.com',
        // Soporta prefijo opcional de path (e.g. "/c001/web-general/")
        pathname: (process.env.NEXT_IMAGES_HOSTNAME_PATH || '**').replace(/\*\*?$/, '') + '**',
      },
      // Desarrollo local (placeholders u otros hosts locales)
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '**' },
    ],
  },
};

export default nextConfig;
