'use strict';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const path = require('path');
const base = require('./webpack.base.config');

const plugins = require('./webpack.plugins');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

base.plugins.push(

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),

  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  }),

  plugins.extractMain,

  new UglifyJsPlugin({
    sourceMap: true,
    parallel: true,
    uglifyOptions: {
      ecma: 6,
      output: {
        comments: false,
        beautify: false
      },
      warnings: false
    }
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),

  new HtmlWebpackPlugin({
    hash: true,
    template: 'src/template/index.pug',
    filename: 'index.html',
    inject: true,
    minify: true,
  }),
);

base.mode = 'production';

module.exports = base;