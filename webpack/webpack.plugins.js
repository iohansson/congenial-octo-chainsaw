const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractMain = new ExtractTextPlugin({
  filename: '[name].[md5:contenthash:hex:20].css',
  allChunks: true,
});

exports.extractMain = extractMain;
