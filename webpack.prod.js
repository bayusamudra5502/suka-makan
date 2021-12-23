const { merge } = require('webpack-merge');
const ci = require('./webpack.prod.ci');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(ci, {
  plugins: [
    new BundleAnalyzerPlugin()
  ],
});
