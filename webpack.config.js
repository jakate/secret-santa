const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
  console.log(env)

  const ENV_VARIABLES = {

  }

  const destFolder = path.resolve(__dirname, 'public/')

  return {
    watch: env.watch,
    entry: './src/js/main.js',
    devtool: 'source-map',
    output: {
      filename: 'main.js',
      path: destFolder
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new webpack.DefinePlugin(ENV_VARIABLES),
      new HtmlWebpackPlugin({
        title: 'Project title',
        template: 'src/html/root.html'
      }),
      new webpack.ProvidePlugin({
        Promise: 'es6-promise-promise',
      })
    ],
    module: {
      rules: [
      {
        test: /es5-shim.js$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'lib',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp4)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'videos',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          env.development ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      }]
    }
  }
}
