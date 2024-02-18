/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'flagcdn.com',
      '192.168.31.15',
      'ltbeck-2e4ce2725976.herokuapp.com',
      'api.lehendatrans.com',
    ],
  },
};

module.exports = nextConfig;
