'use strict'
// 导出开发环境名称,导出是一个一个对象，属性为当前的node环境，值为“development”（开发环境）
const merge = require('webpack-merge')//合并两个配置文件对象并生成一个新的配置文件
const prodEnv = require('./prod.env')//引入prod.env.js配置
module.exports = merge(prodEnv, { //合并
  NODE_ENV: '"development"'
})
