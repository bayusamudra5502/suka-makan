const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const path = require('path');

const QUALITY = 60;

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/bundle.[fullhash].js',
    assetModuleFilename: 'static/img/[name].[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new ESLintWebpackPlugin(),
    new ImageminWebpWebpackPlugin({
      overrideExtension: false,
      config: [{
        test: /\.(jpe?g)/,
        options: {
          quality: QUALITY
        }
      }],
    })
  ],
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/images'),
      '@style': path.resolve(__dirname, 'src/styles'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
