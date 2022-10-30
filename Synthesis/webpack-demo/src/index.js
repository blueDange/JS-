/**
 * 传统开发方案带来的问题:
 * - 把JS存储在外部, 然后利用脚本引入到html文件中
 * - 问题:
 * --- 1. 依赖关系: index.js 中的 _ 是来自 lodash.js 脚本的函数
 *  所以要求, 必须先引入 lodash.js   再引入index.js
 *
 * --- 2. 没有代码提示: 我们vscode都只能静态分析代码, 不可能去下载lodash.js 文件, 然后分析里面的代码, 最后给出提示
 */

// node.js 平台提供模块化思想, 允许把外部JS封装成模块, vscode就能分析并给出提示
// 安装lodash 模块:  npm i lodash

// const _ = require('lodash')  //ES6前的语法
// 仅格式不同

// 模块化语法是node.js 平台的, 浏览器不支持!!!
// webpack: 可以把模块化语法 自动转换成 浏览器支持的语法
// 执行命令: npx webpack
// npx: 优先执行当前项目包中的 webpack 命令; 如果当前包中没有就会执行全局的webpack命令

// 默认设定: wepback工具自动找到 src/index.js 文件, 分析其中引入的模块信息, 把使用到的模块代码打包到一起, 导出成 main.js 文件
// index.html 只要引入这个导出的 main.js 文件就可以了

// 优点:
// 享受了 node.js 平台的 模块化福利  -- 代码提示友好, 依赖关系明确
// 又可以脱离 node.js 平台的限制, webpack最后打包即可

import _ from 'lodash' // ES6后的语法
import demo from './demo'
// 丰富的提示
demo.get()
demo.post()

function comp() {
  const el = document.createElement('div')
  // join: 把参数1数组拼接成字符串, 用 参数2 间隔
  // 重点: 有代码提示了
  el.innerHTML = _.join(['Hello', 'Webpack', demo.uname], ' ')
  return el
}

document.body.appendChild(comp())
