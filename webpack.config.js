const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dev',
      template: './src/index.html',
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    clean: true
  },
  module: {
    rules: [
        {
            test: /\.html$/i,
            use: ['html-loader'],
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        }
    ]
    },
};