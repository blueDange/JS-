// common.js
// 存放一些公用的JS方法

// 模仿JQuery, 把一些常用的方法,封装到一个对象里
// JQ的函数名是 $
class Q {
    static search(name) {
        // 考虑到URL中可能出现中文编码问题,需要转码
        const search = decodeURI(location.search)

        // 静态方法: static. 直接用Q.search出发
        const params = new URLSearchParams(location.search)
        return params.get(name)
        // return new URLSearchParams(location.search).get(name)
    }
}
