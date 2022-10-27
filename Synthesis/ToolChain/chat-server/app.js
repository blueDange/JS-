// 搭建socket长链接服务器
const socket = require('socket.io') // 长链接模块
const http = require('http') // http模块,执行网络操作

// 搭建http服务器  -- 想象成express也行,但express更强大
// express 属于在 http 服务器的基础上 加功能了
const httpServer = http.createServer()

// 创建长链接对象,来管理http服务器
const io = new socket.Server(httpServer, {
    // 允许任何来源的访问 -- 解决跨域问题
    cors: { origin: '*' },
})

// 长链接对象,监听 connection(连接操作)
// 参数1: 固定的几个选项  -- connection 代表链接操作
io.on('connection', socket => {
    console.log('检测到新用户:' + socket.id)

    socket.on('score', data => {
        // 根据不同的分数,给对应的反馈
        const msgs = [
            '很抱歉,没有让你满意', '你到时能歘', '诶,你就这求是子', '能弄松', '好太太'
        ]

        // socket: 是箭头函数的形参,参数的是当前链接的 单个用户信息
        // socket.emit('feedback', msgs[data - 1])  // 让按钮数字对应和数组下标
        // 群发: 利用整个socket服务,可以给每个链接对象发消息

        io.emit('feedback', msgs[data - 1])
    })

    // socket变量: 链接用户的对象
    setInterval(() => {
        // emit: 发消息
        // 参数1: 消息名 - 随意书写; 参数2: 消息体
        socket.emit('suiBian', '故乡的樱花开啦,快回来看')
    }, 6000)
})

httpServer.listen(3000, function () {
    console.log('服务器已开启,端口3000监测中...')
})

// 与 express 服务器相比, 就是多了一个模块, 可以管理长链接