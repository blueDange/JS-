const express = require("express");

// 引入cors模块
const cors = require("cors");

const app = express();

// 使用cors模块,自动解决跨域
// 问题: 允许所有来源的访问
// 跨域本身是为了安全, 不允许不明来源的访问, 全部都允许不安全
// app.use(cors());

// 白名单
app.use(
  cors({
    // 数组中书写 允许的来源
    origin: ["http://127.0.0.1:3000/emps"],
  })
);

// 设置静态拖过文件夹: 存放html css js 之类的前端页面
app.use(express.static("public"));

// 接口
app.get("/emps", (req, res, next) => {
  res.send(["神里", "申鹤", "胡桃", "优菈"]);
});

app.listen(3000, () => {
  console.log("服务器已开启,8000端口检测中");
});

// 启动方式有两种：
// 产品阶段 ：node app.js
// -- 特点 ：代码有修改时 ，必须重启服务器生效

// 开发阶段 ：nodemon app.js
// -- 特点 ：使用nodemon 模块起东，一旦代码有修改 自动重启
// -- 注意1：需要全局安装此模块 npm i -g nodemon
//-- 注意2：此方式不适合上线到云服务器，不适合产品
