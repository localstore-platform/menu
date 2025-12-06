/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for Docker production builds
  // This creates a minimal production bundle with all dependencies
  output: 'standalone',

  // Allow dev access from any local network IP (mobile testing)
  // Format: hostname only (not full URL), supports wildcards
  allowedDevOrigins: ['192.168.*.*'],
  
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
        protocol: 'http',
        hostname: 'api',
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
