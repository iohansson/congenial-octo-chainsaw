'use strict';
const path = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

module.exports = {
  entry: isProduction() ? {
    main: './src/index.js',
  } : [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],

  output: {
    path: path.resolve(__dirname, '../build/'),
    filename: isProduction() ? 'js/[name].[chunkhash].js' : 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: './',
  },

  devtool: isProduction() ? false : 'source-map',

  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    modules: [
      resolve('src'),
      resolve('src/js/components'),
      resolve('src/js/modules'),
      resolve('node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },

  devServer: {
    contentBase: path.join('build'),
    port: 9090,
    publicPath: '/',
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        },],
      },
      {
        test: /.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'vue-loader',
            options: require('./vue-loader.conf'),
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new ProgressPlugin(),
  ],
};