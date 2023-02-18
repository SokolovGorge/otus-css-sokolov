const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name][hash:8].js',
    clean: true,
  },
  devtool: "source-map",
  plugins: [new HtmlWebpackPlugin({ 
    template: './src/index.html',
    filename: 'index.html', 
  }),
  new MiniCssExtractPlugin()],  
  module: {
    rules: [
      { 
        test: /\.(c|sc|sa|)ss$/, 
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(?:ico|gif|jpg|jpeg|png)$/i,
        type: "asset/resource",
        generator: {
          filename: 'images/[name]-[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: "asset/resource",
        generator: {
          filename: 'fonts/[name]-[hash][ext]',
        },
      },

    ],
  },
  devServer: {
    compress: false,
    open: true,
    port: 3001,
    hot: true,
   },
};