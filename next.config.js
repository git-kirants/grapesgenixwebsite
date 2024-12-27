/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
      return config;
    },
    images: {
      domains: ['lh3.googleusercontent.com'], // Add the domain here
    },
  };
  
  module.exports = nextConfig;
  