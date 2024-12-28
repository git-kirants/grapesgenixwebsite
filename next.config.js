/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your custom Webpack configuration
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      undici: false, // This resolves the issue of undici library warnings
    };
    return config;
  },

  // Image optimization settings (e.g., domains you want to load images from)
  images: {
    domains: ['lh3.googleusercontent.com'], // Add your allowed image domains
  },

  // ESLint configuration: Disable specific rules during builds
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during the build process
    dirs: ['app', 'pages'], // Target specific directories for ESLint
  },

  // Next.js specific rules configuration (for disabling warnings)
  reactStrictMode: true, // Optionally enable React Strict Mode (helps with debugging)
};

module.exports = nextConfig;
