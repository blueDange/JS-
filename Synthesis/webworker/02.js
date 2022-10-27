// 11.js
// 此文件想象成: 跑腿骑手 -- 负责完成一个耗时操作
function fb(n) {
    return n < 3 ? 1 : fb(n - 1) + fb(n - 2)
}

// 监听信息:  监听是否有人下订单,  有就执行操作
onmessage = function (e) {
    console.log('骑手收到订单信息:', e)
    // 信息存储在 e.data 属性里

    var x = fb(45)
    // this: window  -- 发消息给下订单的人 -- 世宇
    this.postMessage({
        x,
        name: e.data.name,
        msg: '好的, 1年后送到',
    })
    // console.log('x', x)
}
