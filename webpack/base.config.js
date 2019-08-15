const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  target: 'web',
  context: path.resolve(__dirname, '../'),
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/template.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
}
