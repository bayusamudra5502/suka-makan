const { merge } = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const WorkboxPlugin = require("workbox-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["mozjpeg", { progressive: true, quality: 80 }]
          ]
        }
      }
    }),
    new MiniCSSExtractPlugin({
      filename: 'static/css/[name].[fullhash].css',
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/scripts/sw.js",
      swDest: "service-worker.js"
    }),
  ],
  output: {
    filename: "static/js/[name].[fullhash].js",
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
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 100000,
      maxAsyncRequests: 30
    }
  }
});
