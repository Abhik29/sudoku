var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');


const base_ref = '/';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  cache:false,
  output: {
    path: helpers.root('src','dist'),
    publicPath: './',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new BaseHrefWebpackPlugin({ baseHref: base_ref })
  ],
  
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
