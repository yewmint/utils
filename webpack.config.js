const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: '#source-map',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './test/src/index.js',
  },
  output: {
    path: resolve(__dirname, 'test'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  }
}