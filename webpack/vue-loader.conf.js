'use strict';

const isProduction = process.env.NODE_ENV === 'production';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
});
let config = {};
if (isProduction) {
  config = {
    loaders: {
      sass: extractPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
        fallback: 'vue-style-loader'
      }),
      css: extractPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'vue-style-loader'
      })
    }
  };
} else {
  config = {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
      sass: 'vue-style-loader!css-loader!sass-loader' // <style lang="sass">
    }
  };
}

module.exports = config;
