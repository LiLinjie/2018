const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        '>1%',
        'Android >= 2.3',
        'iOS >= 7',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
    }
  }
}
