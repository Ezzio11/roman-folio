import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Transpile packages that ship un-compiled ESM
  transpilePackages: ['three', 'ogl', 'gsap'],

  // Optimize package imports
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@tabler/icons-react',
      'lucide-react',
      'react-icons',
      'gsap',
      'three',
      'ogl',
      'matter-js'
    ],
  },
};

export default nextConfig;
