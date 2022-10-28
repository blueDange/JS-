// node.js平台: 提供了模块化思想,允许把外部JS封装成模块,vscode就能分析并给出提示
// 安装lodash 模块: npm i lodash

// 模块化语法是node.js 平台的,浏览器不支持!!!
// webpack: 可以把模块化语法 自动转换为 浏览器支持的语法
const _ = require('lodash')  // es6 前的写法
import _ from 'lodash'
import demo from './demo'





function comp() {
    const el = document.createElement('div')
    // join : 把参数1数组拼接成字符串,用参数2 间隔
    el.innerHTML = _.join(['Hello', 'Webpack', demo.uname], '')
    return el
}

document.body.appendChild(comp())