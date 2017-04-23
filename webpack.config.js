const path = require('path');

const commonjs = {
  entry: './src/index.ts',
  output: {
    path: __dirname,
    filename: './dist/protocode.js',
    libraryTarget: 'commonjs',
    library: 'protocode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /.ts$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: /(node_modules)/
      }
    ]
  },
  devtool: 'source-map'
};

const client = {
  entry: './src/index.ts',
  output: {
    path: __dirname,
    filename: './dist/protocode.client.js',
    libraryTarget: 'var',
    library: 'protocode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /.ts$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: /(node_modules)/
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = [commonjs, client];