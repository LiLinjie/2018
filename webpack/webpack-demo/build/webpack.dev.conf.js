const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const webpack = require('webpack');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 启用HMR
  ],
  devServer: {
    contentBase: __dirname + '/dist', // 默认目录
    port: 3000, // 端口
    open: true, // 运行时自动在浏览器打开
    hot: true // 开启热更新
  }
});
