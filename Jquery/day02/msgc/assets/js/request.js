// request.js
// 存放网络请求相关代码
class Req {
    static baseURL = 'https://serverms.xin88.top/'

    // 仿造 $.get(地址,回调函数)
    static get(url, callback) {
        $.get(Req.baseURL + url, callback)
    }

    // post 请求的特点: 路径 和 参数 分开传递
    // $.post(地址,参数, 回调函数)
    static post(url, params, cb) {
        $.post(Req.baseURL + url, params, cb)
    }
}
