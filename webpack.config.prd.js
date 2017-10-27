const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry : [
    './client/index'
  ],

  output : {
    path     : resolve(__dirname, 'server', 'public'),
    filename : 'bundle.js'
  },

  resolve : {
    extensions : ['.jsx', '.js', '.json']
  },

  module : {
    loaders : [{
      test    : /\.(js|jsx)$/,
      exclude : /node_modules/,
      loaders : ['babel-loader']
    }, {
      test    : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders : ['url-loader?limit=10000&minetype=application/font-woff']
    }, {
      test    : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders : ['file-loader']
    }, {
      test    : /\.(jpe?g|png|gif|svg)$/i,
      loaders : ['url?limit=10000!img?progressive=true']
    }, {
      test : /\.css$/,
      use  : extractCSS.extract({
        fallback : 'style-loader',
        use      : ['css-loader?minimize']
      })
    }, {
      test    : /\.less$/,
      exclude : /\.modules\.less$/,
      use     : extractCSS.extract({
        fallback : 'style-loader',
        use      : ['css-loader?minimize', 'less-loader']
      })
    }]
  },

  plugins : [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : '"production"'
    })
  ]
};
