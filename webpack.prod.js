const { merge } = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'static/css/[name].[fullhash].css',
    }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: "./src/scripts/sw.js",
    //   swDest: "service-worker.js"
    // })
    WorkboxPlugin.GenerateSW({
      clientsClaim: true
    })
  ],
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCSSExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
});
