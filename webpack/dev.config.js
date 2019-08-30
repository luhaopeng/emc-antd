const merge = require('webpack-merge')
const base = require('./base.config')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(base, {
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '../static'),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
