
module.exports = {
  images: {
    domains: ['cloud.appwrite.io'],
  },
  reactStrictMode: false,
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
}
const path = require('path');

module.exports = {
  outputFileTracingRoot: path.join(__dirname),
  // other config options...
}


module.exports = nextConfig
module.exports = {
  webpack: (config, { isServer }) => {
    // Example: Add custom alias
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');

    return config;
  },
};
