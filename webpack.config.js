const path = require('path');
const webpack = require('webpack');
const friendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  context: __dirname,
  entry: {
    'vue-trans': './src/index.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library: 'vue-trans',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: friendlyFormatter,
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
      sourceMap: true,
    }),
  ],
};
