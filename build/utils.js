'use strict'
//utils.js文件主要是用来处理各种css loader的，比如css-loader，less-loader等。
// 一是作为vue-loader的配置来使用；另一个是用来给开发环境和生产环境配置loader；
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')//它的作用是打包后将生成css文件通过link的方式引入到html中，如果不使用这个插件，那么css就打包到<head>的style中
const packageConfig = require('../package.json')

// 资源文件的存放路径
exports.assetsPath = function (_path) {
  //结合config文件的代码可以知道，当环境为生产环境时，assetSubDirectory为“static”,开发环境也是“static”
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
// path.posix.join()是path.join的一种兼容性写法，它的作用是路径的拼接，这里返回的是"static/_path"
  return path.posix.join(assetsSubDirectory, _path)
}

// cssLoaders方法根据传进来的参数(options)是否有extract属性来返回不同的值，如果你看了后面的代码你就会知道在生产模式下extract属性为true， 开发模式下为false。
//导出一个供vue-loader的options使用的一个配置
exports.cssLoaders = function (options) {
  //如果没有传参就默认空对象
  options = options || {}
  //配置css-loader，css-loader可以让处理css中的@import或者url()
  const cssLoader = {
    loader: 'css-loader',
    options: {// 是否使用source-map
      sourceMap: options.sourceMap
    }
  }
//配置postcss-loader，主要功能是补全css中的兼容性前缀，比如“-webkit-”等
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  //生成loader的私有方法
  function generateLoaders (loader, loaderOptions) {
    //参数的usePostCss属性是否为true，是就使用两个loader，否则只使用css-loader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    //给generateLoaders传loader参数的话，比如“less或者sass”，就将这个loader的配置传到loaders数组中
    // 例如generateLoaders('less')，这里就会push一个less-loader
    // less-loader先将less编译成css，然后再由css-loader去处理css
    // 其他sass、scss等语言也是一样的过程
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        //Object.assign()是es6的语法，用来合并对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    //如果options参数的extract属性为true，就使用extract text plugin将css抽成单独的文件，否则就将css写进style里
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        //vue-style-loader可以理解为vue版的style-loader，它可以将css放进style中
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {//返回各种语言的loader
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
//styleLoaders是用来给webpack提供所有和css相关的loader的配置，// 生成处理单独的.css、.sass、.scss等样式文件的规则
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options) //调用cssLoaders方法，返回loaders的对象
//遍历每一个loader，并配置成对应的格式，传给output数组
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
//'node-notifier'是一个跨平台系统通知的页面，当遇到错误时，它能用系统原生的推送方式给你推送信息
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
