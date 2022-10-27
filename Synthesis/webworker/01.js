// 10.js
// 普通的没有反馈信息的做法
function fb(n) {
    return n < 3 ? 1 : fb(n - 1) + fb(n - 2)
}

var x = fb(45)
console.log('x', x)
