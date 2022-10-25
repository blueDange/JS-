//app.js
const express = require('express')
const cors = require('cors')
// 安装 uuid 模块  用于生成唯一表示  npm i uuid
const uuid = require('uuid')
//文件上传模块  multer
const multer = require('multer')
//创建1个负责文件上传操作的对象
var upload = multer({
  //配置项  按ctrl + i 看提示
  //destination 缩写  ： 目的地地址
  // 设置上传文件的存放地址
  // dest: 'upload',  //此路径相对于服务器根目录,
  // dest会采用默认设置,文件名保存时没有后缀,难以分辨,不友好
  dest: 'upload',

  // 自定义化的配置:storage
  // diskStorage: 生成硬盘存储配置项
  storage: multer.diskStorage({
    destination: 'upload', // 用于配置存放位置
    // 接收请求的参数和文件信息,拖过回调函数返回 你希望的文件名
    filename(req, file, cb) {
      console.log('file', file)
      // 参数1: 错误信息,没错误就写null
      // 参数2: 返回文件存储到服务器上的名字
      // -- 直接采用用户上传的文件名, 有两个问题:
      //  --- 1. 中文会乱码
      //  --- 2. 同名文件会覆盖
      //  解决办法: 服务器生成唯一的名称 -- 依赖模块 uuid
      // 采用 uuid 的第四版 -- 随机数方案,生成唯一标识

      // 截取后缀名部分:  xxx.jpg  xxx.png  xxx.zip
      // 其中 .jpg .png .zip称为后缀名
      // 思路: 找到最后一个(lastIndexOf)点的序号,进行截取 substr
      var fn = file.originalname
      var ext = fn.substr(fn.lastIndexOf('.'))
      cb(null, uuid.v4() + ext) // 唯一标识 拼接 后缀名
    },
  }),
})

const app = express()
//用anfn可以快速生成箭头函数
app.listen(3000, () => {
  console.log('服务器已开启，端口3000')
})

app.use(cors()) // 允许跨域

app.use(express.static('public'))

app.use(express.static('upload'))
//app.get('/',(req,res) => res.send('欢迎使用Express'))

//添加上传接口
//注意事项 必须采用 post 方式来接收
//参数1 接口地址   -- localhost：3000/upload
//参数2 把接收的数据用 upload进行处理
//      ---single: 获取单文件上传的信息
//       ----avatar 自定义的代表上传的文件对应的属性名  前端设置
//       ----- <input type='file' name='avatar'/>
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.file)
  res.send(req.file)
})

// 多文件
// 通过 multer 的 array 方法来接收, 参数 photos 是自定义的名称 ,前端上传时需要保持一致
app.post('/upload_duo', upload.array('photos'), (req, res) => {
  res.send(req.file)
})

// 套路
// 1. 下载安装 multer
// 2.用multer 创建上传对象  --配置文件的存储位置
// 3 上传接口中  用multer 对象对文件做处理
