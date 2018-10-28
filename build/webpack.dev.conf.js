'use strict'
// 开发环境下的webpack的配置
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')// 基本配置的参数
const merge = require('webpack-merge')// webpack-merge是一个可以合并数组和对象的插件
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf') // webpack基本配置文件（开发和生产环境公用部分）
//一个负责拷贝资源的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即在index.html里面加上<link>和<script>标签引用webpack打包后的文件
//一个更友好的展示webpack错误提示的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
//一个自动检索端口的包
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
// 合并baseWebpackConfig配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 对一些独立的css文件以及它的预处理文件做一个编译
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {//  webpack-dev-server服务器配置
    clientLogLevel: 'warning', // console 控制台显示的消息，可能的值有 none, error, warning 或者 info
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,// 开启热模块加载
    contentBase: false, // since we use CopyWebpackPlugin.告诉服务器在哪里提供静态的内容，这里我们使用false的原因是使用了“copy-webpack-plugin”插件，不需要使用contentBase了；
    compress: true,
    host: HOST || config.dev.host,// process.env 优先
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,// 代理设置
    quiet: true, // necessary for FriendlyErrorsPlugin除了初始启动信息之外的任何内容都不会被打印到控制台，即使是webpack 的错误或警告在控制台也不可见。不过我们用了'friendly-errors-webpack-plugin'插件，就可以设为true了
    watchOptions: { // 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改
      poll: config.dev.poll,// 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。默认为false
    }
  },
  plugins: [
    //还记得之前说的生产环境和开发环境的变量在哪儿定义的吗？对，就是这里
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    //模块热替换的插件，修改模块不需要刷新页面
    new webpack.HotModuleReplacementPlugin(),
    //当使用HotModuleReplacementPlugin时，这个插件会显示模块正确的相对路径
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    //在编译出错时，使用NoEmitOnErrorsPlugin来跳过输出阶段，这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',// 指定编译后生成的html文件名
      template: 'index.html', // 需要处理的模板
      inject: true
      // 打包过程中输出的js、css的路径添加到html文件中
      // css文件插入到head中
      // js文件插入到body中，可能的选项有 true, 'head', 'body', false
    }),
    // copy custom static assets
    // 将static文件夹和里面的内容拷贝到开发模式下的路径,比如static下有个img文件夹，里面有张图片
    // 我们可以这样访问：localhost:8080/static/img/logo.png
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
//这里主要是做端口的检索以及npm run dev后对错误的处理，我们可以看这里使用了前面引入的
//'friendly-errors-webpack-plugin'插件
module.exports = new Promise((resolve, reject) => {// 获取当前设定的端口
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port //发布新的端口，对于e2e测试
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
