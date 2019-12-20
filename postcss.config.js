const nested = require('postcss-nested');
const cssnextenv = require('postcss-preset-env');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const simplevars = require('postcss-simple-vars');

module.exports = {
  plugins: [
    simplevars(),
    nested(),
    cssnextenv({
      warnForDuplicates: false,
      autoprefixer: false
    }),
    cssnano({
      autoprefixer: false,
      'postcss-zindex': false
    }),
    autoprefixer({
      remove: true
    })
  ],
  extensions: ['.css', '.less']
};
