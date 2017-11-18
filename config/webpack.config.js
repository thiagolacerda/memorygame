'use strict';

module.exports = {
  entry: './index',
  output: {
    path: `${__dirname}/../build`,
    filename: 'bundle.js',
    library: 'GM'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};
