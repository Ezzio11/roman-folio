import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true, // Removed as per request ☝️🚀

  
  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920, 2048],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year

  },

  // Transpile packages that ship un-compiled ESM
  transpilePackages: ['next-mdx-remote'], // Assuming other lightweight packages are fine

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
