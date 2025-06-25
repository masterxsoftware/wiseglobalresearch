const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util/'),
    url: require.resolve('url/'),
    https: require.resolve('https-browserify'),
    http: require.resolve('stream-http'),
    crypto: require.resolve('crypto-browserify'),
    assert: require.resolve('assert/'),
    process: require.resolve('process/browser.js'), // ✅ Ye fix kar diya
  };

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // ✅ Extension added
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
};
