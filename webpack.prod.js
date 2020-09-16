const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports =  {
  mode: "production",
  entry: path.resolve(__dirname, "./src"),
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, "./dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
            }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
         'css-loader',
         'postcss-loader',
         'sass-loader',
        ]
      },
    ],
  }, 
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.bundle.css',
      path: path.resolve(__dirname, './dist'),
    }), 
    new HtmlWebpackPlugin({      
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: true
    })      
  ]
}