// index3.js
// node.js 提供的模块化引入方式
// 默认不支持 css文件, 仅支持js文件
// 需要安装额外的loader  -- 加载器
// npm i -D style-loader css-loader
// 在配置文件中, 使用这些加载器
import './my.css'
// npm i -D sass-loader sass
import './you.scss'
// 配置文件需要配置
import bs from './505-bigskin-1.jpg'

// babel 加载器:
// npm install -D babel-loader @babel/core @babel/preset-env webpack
// 现在大量采用ES6语法, 但是ES6语法是 2015年6月发布的
// 如果运行时所在的浏览器是 ES6 之前发布的版本, 则不支持ES6语法
class Vue {
  static name = 'Vue'
}

const el = document.createElement('div')

var img = new Image()
img.src = bs
img.style.width = '300px'
document.body.appendChild(img)

el.innerHTML = `
<ul>
  <li>铭铭</li>
  <li>亮亮</li>
  <li>泡泡</li>
  <li>${Vue.name}</li>
</ul>`

document.body.appendChild(el)
