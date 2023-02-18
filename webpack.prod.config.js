const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name][hash:8].js',
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ 
    template: './src/index.html',
    filename: 'index.html', 
  })],  
  module: {
    rules: [
      { 
        test: /\.(c|sc|sa|)ss$/, 
        use: ["style-loader", "css-loader", 
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                  plugins: [
                      "autoprefixer",
                      "postcss-preset-env",
                     // "postcss-deadcss", //маркирует код фейковым pixel.png для сбора статистики
                      "at-rule-packer",
                      "postcss-import",
                  ],
              },
            },
          },
          "sass-loader"
        ] 
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(?:ico|gif|jpg|jpeg|png)$/i,
        use: [  // оптимизация размера картинок
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
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
};