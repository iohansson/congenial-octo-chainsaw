'use strict';

let $ = {};

$.isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

$.sassLoaders = function (extractPlugin) {
  if (!this.isProduction()) return [{
    loader: 'style-loader' // creates style nodes from JS strings
  }, {
    loader: 'css-loader' // translates CSS into CommonJS
  }, {
    loader: 'sass-loader' // compiles Sass to CSS
  }];

  return extractPlugin.extract({
    use: ['css-loader', 'postcss-loader', 'sass-loader'],
    fallback: 'style-loader'
  });
};

$.cssLoaders = function (extractPlugin) {
  if (!this.isProduction()) return [{
    loader: 'style-loader' // creates style nodes from JS strings
  }, {
    loader: 'css-loader' // translates CSS into CommonJS
  }];

  return extractPlugin.extract({
    use: ['css-loader', 'postcss-loader'],
    fallback: 'style-loader'
  });
};

module.exports = $;