const path = require('path');

module.exports = {
  entry: {
    allin1: ['./src/allin1.js'],
    jqweb: ['./src/jqweb.js'],
    emuto:  ['./src/emuto.js'],
    both:   ['./src/both.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.emu$/,
      loader: 'emuto-loader' // compiles emuto to JavaScript
    }]
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "fs": false
    }
  }
};
