var webpack = require('webpack');

module.exports = {
  entry: './javascripts/app.jsx',
  output: {
    path: 'assets',
    filename: 'app-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
}
