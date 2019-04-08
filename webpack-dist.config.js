const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { WebPlugin } = require('web-webpack-plugin');

const outputPath = path.resolve(__dirname, '.public');
module.exports = {
  output: {
    path: outputPath,
    publicPath: '',
    filename: '[name]_[chunkhash:8].js',
  },
  resolve: {
    // 加快搜索速度
    modules: [path.resolve(__dirname, 'node_modules')],
    // es tree-shaking
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  module: {
      rules: [
          {
              test: /\.scss$/,
              /*提取scss*/
              loaders: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
              }),
              include: path.resolve(__dirname, 'src')
          },
          {
              test: /\.css$/,
              /*提取css*/
              loaders: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader'],
              }),
          },
          {
              test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
              loader: 'base64-inline-loader',
          },
      ]
  },
  entry: {
    main: './src/main.js',
  },
  plugins: [
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new WebPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new ExtractTextPlugin({
      filename: '[name]_[contenthash:8].css',
      allChunks: true,
    }),
  ]
};
