const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: '../api/public',
    filename: 'index.js'
  },
  module: {
    loaders: [

{test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')},
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new CopyWebpackPlugin([{ from: './src/assets/unapec.jpg', to: 'logo.jpg' }])
  ]
}
