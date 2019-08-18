const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')

const webpackBase = require('./webpack.base.conf')
process.env.NODE_ENV = 'production'

module.exports = merge(webpackBase, {
  optimization: {
    // SplitChunksPlugin 代替CommonsChunkPlugin
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    // 环境配置
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // bundle chunk 压缩
    new UglifyjsPlugin(),

    // extract-text-webpack-plugin在webpack4+报错 需要按章@next版本， 亦可采用mini-css-extract-plugin替代
    // 独立css等静态文件
    new ExtractTextPlugin({
      filename: path.resolve(__dirname, '../dist/static/css/[name].[contenthash].css'),
      allChunks: true
    })
    
    // 独立压缩css MiniCssExtractPlugin详见https://webpack.js.org/plugins/mini-css-extract-plugin/
    // new MiniCssExtractPlugin(),
    
    // CommonsChunkPlugin被移除，使用splitChunksPlugin
    // // 独立chunk 独立单独引用模块
    // new webpack.optimization.CommonsChunkPlugin({
    //   name: 'vendor',
    //   // minChuncks 数字则表示几个chunk共有则独立，函数则自定义
    //   minChuncks (module) {
    //     return module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(path.resource(__dirname, '../node_modules')) === 0
    //   }
    // }),
    // // 独立chunk 独立共有chunk
    // new webpack.optimization.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChuncks: Infinity
    // }),
    // // 独立子chunk
    // new webpack.optimization.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   minChuncks: 3
    // })
  ]
})