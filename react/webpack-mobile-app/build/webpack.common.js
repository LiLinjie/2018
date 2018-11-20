const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseLoader = require('./baseLoader');

const root = (_path = '.') => path.join(__dirname, _path);

module.exports = {
  entry: {
    app: [root('../src/index.js')],
    vendor: ['react', 'react-dom', 'redux', 'react-router-dom', 'react-redux', 'immutable']
  },
  plugins: [
    new CleanWebpackPlugin('dist/*.*', {
      root: root('../')
    }),
    new HtmlWebpackPlugin({
      template: root('../src/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {from: root('../static'), to: 'static'}
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', baseLoader.baseCssLoader]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          baseLoader.baseCssLoader,
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader?limit=8192']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    path: root('../dist')
  }
};
