/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  
  // Environment
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  // Images
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'api.lsp.menu',
      },
      {
        protocol: 'https',
        hostname: '**.lsp.menu',
      },
    ],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Strict mode
  reactStrictMode: true,

  // Trailing slash for consistency
  trailingSlash: true,
};

module.exports = nextConfig;
