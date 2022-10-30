// webpack: 能把 node.js 的模块化语法 转为普通的JS代码, 让浏览器可用
// 配置文件: 可以通过配置文件, 个性化的为webpack 做配置
// 固定名称: webpack.config.js
// 存放在根目录下

// 开发服务器插件
// 项目开发分两个阶段:  开发阶段 和 产品阶段
// 开发阶段: 希望能够实时看到运行效果
// 产品阶段: 把代码打包好, 放在服务器上运行
function comp() {
  const el = document.createElement('div')
  el.innerHTML = 'Hello World!!'
  return el
}

document.body.appendChild(comp())
