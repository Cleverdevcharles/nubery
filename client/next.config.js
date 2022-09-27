/** @type {import('next').NextConfig} */
const webpack = require('webpack')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'nubery.s3.eu-west-3.amazonaws.com',
      'nubery.s3.amazonaws.com',
    ],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    )
    return config
  },
}

module.exports = nextConfig
