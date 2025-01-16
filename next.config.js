/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["protofolio-ashy-one.vercel.app/"],
    unoptimized: true,
  },
  experimental: {
    metadataBase: 'https://protofolio-ashy-one.vercel.app/', // Ganti dengan URL domain utama kamu
  },
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
