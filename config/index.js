'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// 导出不同环境的具体配置；
const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static', //静态资源文件
    assetsPublicPath: '/',  //发布路径
    proxyTable: {   //跨域设置
      '/api':{
        // target:'http://localhost:5000/',
        changeOrigin:true,
        // pathRewrite:{
        //   '^/api':'/'
        // }

      }
    },  //配置代理API的地方

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 5000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false, //是否自动打开浏览器
    errorOverlay: true, //查询错误
    notifyOnErrors: true, //通知错误
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    //poll跟devserver相关的一个配置，webpack为我们提供的devserver是可以监控文件改动的，但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true, //是否使用eslint
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,//是否展示eslint的错误提示

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map', // webpack提供的用来方便调试的配置

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,//一个配合devtool的配置，当给文件名插入新的hash导致清除缓存时是否生成source maps

    cssSourceMap: true //是否开启cssSourceMap
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),//编译后index.html的路径
    //path.resolve(__dirname）指的是index.js所在的绝对路径，再去找“../dist”这个路径（node相关的知识），
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'), //打包后的文件根路径
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true, //是否开启source-map，
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,//是否压缩，
    productionGzipExtensions: ['js', 'css'], //gzip模式下需要压缩的文件的扩展名，设置后会对相应扩展名的文件进行压缩

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report //是否开启打包后的分析报告
  }
}
