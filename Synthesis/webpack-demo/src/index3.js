// node.js 提供的模块化引入方式
import './my.css'
// 默认不支持 css 文件 , 仅支持js文件
// 需要安装额外的 loader -- 加载器
// npm i -D style-loader css-loader
// 在配置文件中,使用这些
const el = document.createElement('div')
el.innerHTML = `<ul>
<li>神里凌华</li>
<li>申鹤</li>
<li>胡桃</li>
<li>雷电影</li>
</ul>`

document.body.appendChild(el)
