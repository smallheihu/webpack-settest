const path = require('path')
const webpack = require('webpack')
// 配置合并
const merge = require('webpack-merge')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')
// 端口检测
const portfinder = require('portfinder')

const webpackBase = require('./webpack.base.conf')

const webpackDev = merge(webpackBase, {
  // 资源映射
  devtool: 'source-map',
  devServer: {
    // 模式inline iframe
    // 前者处理实时重载的脚本被插入到你的包(bundle)中并输出构建信息于控制台
    // 后者通知栏下面使用iframe包含了构建信息
    // cli --inline
    inline: true,
    
    // H5 history api 单页面或多页面应用中使用history路由模式时，自动将上下文转至初始上下文
    // historyApiFallback: true, // 单页面应用时
    // historyApiFallback: { // 多页面应用时，配置多页面跳转上下文
    //   rewrites: [
    //     {
    //       from: /^\/user/,
    //       to: '/user.html'
    //     },
    //     {
    //       from: /./,
    //       to: '/index.html'
    //     }
    //   ]
    // },

    // 对外bundle访问路径，此路径下bundle浏览器下可访问
    // 若修改为/static/,则原默认ip:port初始页会修改为ip:port/static
    publicPath: '/',
    
    // devServer暴露文件
    // contentBase: {},

    // gzip压缩 cli --compress
    compress: true,
    // 开启热替换
    hot: true,
    // errors 出现时，覆盖浏览器页面全屏展示
    overlay: true,
    // 自动打开浏览器
    open: true,
    // http响应头配置
    headers: {},
    host: '127.0.0.1',
    port: 3000,
    // 代理
    proxy: {
    },
    // TODO:
    watchContentBase: true
    // watchOptions: {}
  },
  plugins: [
    // 压缩bundle chunk
    new UglifyjsPlugin({
      // 资源映射
      sourceMap: true
    }),
    // 热替换
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedChunksPlugin(),  // 更新时 console输出当前文档名称
    new webpack.NoEmitOnErrorsPlugin()  // webpack 进程遇到错误代码将不会退出
  ]
})

module.exports = new Promise((resolve, reject) => {
  // 检测port端口号
  portfinder.basePort = 3000
  portfinder.highestPort = 3333
  portfinder.getPortPromise().then(port => {
    process.env.PORT = port
    webpackDev.devServer.port = port
    resolve(webpackDev)
  }).catch(err => {
    reject(err)
  })
})