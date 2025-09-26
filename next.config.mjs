/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoBasePath = '/nextjs-boilerplate' // set to your repo name for GH Pages

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Static export for GitHub Pages
  ...(isGithubPages
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: repoBasePath,
        assetPrefix: repoBasePath + '/',
      }
    : {}),
  // Performance optimizations
  swcMinify: true,
  // Faster development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig