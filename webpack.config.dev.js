var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry : './client/index',

  output : {
    path       : path.join(__dirname, 'public', 'built'),
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

  watchOptions : {
    poll : true
  },

  devtool : 'source-map',

  externals : {
    'jquery'    : 'jQuery',
    'react'     : 'React',
    'react-dom' : 'ReactDOM',
    'react-addons-shallow-compare': 'React.addons.shallowCompare',
    'react-addons-create-fragment': 'React.addons.createFragment'
  },

  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : '"development"'
    })
  ]
};
