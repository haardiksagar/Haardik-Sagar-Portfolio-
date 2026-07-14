/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Required for GitHub Pages static hosting
  basePath: isProd ? '/Haardik-Sagar-Portfolio' : '',
  images: {
    unoptimized: true, // Disables Next.js server-side image optimization
  },
};

export default nextConfig;
