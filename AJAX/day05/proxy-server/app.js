const express = require('express')

const proxy = require('express-http-proxy')

// 安装跨域cors模块: npm i cors
const cors = require('cors')

const app = express()

app.listen(8000, () => {
  console.log('服务器已开启,8000端口监测中...')
})

app.use(cors()) // 解决 浏览器访问代理服务器时的跨域

app.use('/baidu', proxy('http://www.baidu.com'))

app.use('/douyu', proxy('https://m.douyu.com'))

app.use('/bilibili', proxy('https://api.bilibili.com'))

app.get('/', function (req, res) {
  res.send('<h1>欢迎使用Express代理服务器</h1>')
})

// 启动服务器 nodemon app.js
