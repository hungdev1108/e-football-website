import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5002',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '14.225.211.212',
        port: '5002',
      },
      {
        protocol: 'https',
        hostname: 'api.hieptranefootball.com',
      },
      {
        protocol: 'https',
        hostname: '.hieptranefootball.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Bundle analyzer for production builds
  webpack: (config, { isServer }) => {
    // Optimize bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  
  // Enable compression
  compress: true,
  
  // Static generation for better performance
  output: 'standalone',
};

export default nextConfig;
