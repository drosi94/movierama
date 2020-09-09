const path = require('path');

const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './public/css/main.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'movierama.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/public/css',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64]',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    https: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      root: '/dist',
      verbose: true,
    }),
    new Dotenv({
      systemvars: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/icons',
          to: 'icons',
        },
        {
          from: 'manifest.json',
          to: 'manifest.json',
        },
        {
          from: 'robots.txt',
          to: 'robots.txt',
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://api.themoviedb.org/3.'),
          handler: 'StaleWhileRevalidate',
        },
        {
          urlPattern: new RegExp('https://kit.fontawesome.com.'),
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ],
  node: {
    fs: 'empty',
  },
};
