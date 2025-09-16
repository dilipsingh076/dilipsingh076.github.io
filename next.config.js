/** @type {import('next').NextConfig} */
const repo = 'dilipsingh076.github.io'; // your repo name

const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
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
  assetPrefix: isGithubPages ? `/${repo}/` : '',
  basePath: isGithubPages ? `/${repo}` : '',
  output: 'export',
}

module.exports = nextConfig