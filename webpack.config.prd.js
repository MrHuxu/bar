var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry : [
    './client/index' // Your appʼs entry point
  ],

  output : {
    path       : path.join(__dirname, 'server', 'built'),
    filename   : 'bundle.js',
    publicPath : 'http://localhost:6789/assets/'
  },

  resolve : {
    extensions : ['.js', '.jsx', '.json', '.scss']
  },

  module : {
    loaders : [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['react-hot-loader', 'babel-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url-loader?limit=10000&minetype=application/font-woff'] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['url-loader?limit=10000!img?progressive=true'] }
    ]
  },

  externals : {
    'jquery'    : 'jQuery',
    'react'     : 'React',
    'react-dom' : 'ReactDOM',
    'radium'    : 'Radium',
    'react-addons-shallow-compare': 'React.addons.shallowCompare',
    'react-addons-create-fragment': 'React.addons.createFragment',
    'react-addons-transition-group': 'React.addons.TransitionGroup'
  },

  plugins : [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : '"production"'
    })
  ]
};
