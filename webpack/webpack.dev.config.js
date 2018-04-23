'use strict';

const webpack = require('webpack');
const base = require('./webpack.base.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');

base.plugins.push(
  new webpack.HotModuleReplacementPlugin(),

  new HtmlWebpackPlugin({
    hash: true,
    template: 'src/template/index.pug',
    filename: 'index.html',
    inject: true,
    minify: false,
  }),
);

base.mode = 'development';

module.exports = base;
