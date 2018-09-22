const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/index.js',
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [
        'babel-loader',
        'eslint-loader',
      ],
      exclude: [
        /node_modules/,
        /\.(test|spec|e2e)\.(js|jsx)$/,
      ],
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
      }],
    }, {
      test: /\.scss$/,
      use: [
        'style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        'sass-loader', // compiles Sass to CSS, using Node Sass by default
      ],
    }, {
      test: /\.(svg)([\?]?.*)$/,
      use: {
        loader: 'url-loader',
      },
    }],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/app/index.html',
      filename: './index.html',
    }),
  ],
};
