const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'none', // 模式
  context: path.resolve(__dirname, '../'),  // 基础路径
  // 入口 单页面/多页面配置
  entry: {
    app: './src/one/index.js' // 相对于基础路径
  },
  // 输出 
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出路径
    filename: 'static/js/[name].[hash:16].js', // 相对于path下置顶目录 [name] [id] [hash(:number)]
    publicPath: '/',  // 全部css js img等静态文件基础路径, 相对路径则cdn下无法访问
    chunkFilename: 'static/js/[id].[chunkhash].js' // 非入口bundle chunk, 如使用CommonsChunkPlugin独立的chunk
  },
  // 解析 路径等解析细节配置
  resolve: {
    alias: { // import/requre 路径简写
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.css', '.less', 'json']  // import/require 省略文件ext
  },
  // 模块 决定如何处理项目中不同模块
  module: {
    // 规则 三个部分（条件、结果、嵌套规则）
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader' // mini html https://www.webpackjs.com/loaders/html-loader/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'  // es5+ https://www.webpackjs.com/loaders/babel-loader/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',  // 顶层使用file-loader
        options: { // loader 接入参数
          limit: 1000,  // 限制文件大小
          name: 'static/image/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/media/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/fonts/[name].[hash:6].[ext]'
        }
      }
    ]
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(), // 清空output文件
    new HtmlWebpackPlugin({  // 生成页面
      filename: 'index.html',
      template: './public/index.html', // 模板 相对于context路径
      inject: true  // all javascript resources will be placed at the bottom of the body element
    })
  ]
}