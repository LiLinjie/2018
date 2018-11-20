module.exports = {
  baseCssLoader: {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: [
        require('cssnano'),
        require('autoprefixer')({
          browsers: ['last 2 versions', 'Android >= 2.3', 'iOS >= 7', '> 2%']
        })
      ]
    }
  }
};
