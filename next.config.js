/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/dilipsingh076.github.io',
  assetPrefix: '/dilipsingh076.github.io/',
  images: {
    domains: ['media.istockphoto.com', 'github.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;