'use strict'
// 编译代码时执行的确认node和npm版本的文件，如果版本不符，则停止编译；
const chalk = require('chalk')//引入的是一个用来在命令行输出不同颜色文字的模块，通过chalk.yellow("想添加颜色的文字......")来实现改变文字颜色的；
const semver = require('semver')//引入的是一个语义化版本文件的npm包，其实它就是用来控制版本的
const packageConfig = require('../package.json')//引入package.json，用来获取版本
const shell = require('shelljs')//用来执行unix命令的包。

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),//semver.clean(process.version)上面介绍过，返回的是一个版本信息，
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () { //分别检测当前的npm和node版本是不是符合package.json中定义的，如果不符合就提示wraning。
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
