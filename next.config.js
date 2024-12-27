/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        undici: false,
      };
      return config;
    },
  }
  
  module.exports = nextConfig