const withLESS = require('@zeit/next-less')
const swPrecheWebpackPlugin = require('sw-precache-webpack-plugin')

if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => { }
}

module.exports = withLESS({
  webpack: (config) => {
    config.plugins.push(
      new swPrecheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )

    return config
  }
})