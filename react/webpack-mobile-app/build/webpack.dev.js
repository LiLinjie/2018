const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const root = (_path = '.') => path.join(__dirname, _path);

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 8886,
    historyApiFallback: true,
    contentBase: root('dist'),
    host: '0.0.0.0'
  }
});
