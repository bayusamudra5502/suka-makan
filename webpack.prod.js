const { merge } = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'assets/css/[name].[hash].css',
    }),
  ],
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
