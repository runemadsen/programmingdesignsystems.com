var webpack = require('webpack');

// Defaults
// -------------------------------------------------

var config = {
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
  plugins: []
};

// Production
// -------------------------------------------------

if(process.env.NODE_ENV == 'production') {

  // Pass ENV to webpack
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }));

  // Uglify
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));

}

module.exports = config;
