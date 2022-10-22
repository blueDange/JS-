$(function () {
    // 读取存储中的用户信息,根据是否存在来决定显示什么
    // 通过短路语法: 先从临时的读, 如果没有在永久的 读
    let user = sessionStorage.getItem('user') || localStorage.getItem('user')

    // 存储的是json字符串, 需要转为对象使用
    if (user) user = JSON.parse(user)

    // 检查永久存储是否过期 ,如果过期就清空
    if (localStorage.getItem('user')) {
        let user = localStorage.getItem('user')
        user = JSON.parse(user)
        var expireTime = user.expireTime // 获取过期时间
        // 当前时间 超过, 过期保质期
        if (new Date().getTime() > expireTime) {
            // 用户在浏览页面时, 把登录信息存储在临时存储区,确保本次访问正常
            sessionStorage.getItem('user', JSON.stringify(user))

            localStorage.removeItem('user') // 删除
        }
    }

    if (user) {
        $('.noLogin').hide()
        $('.isLogin a').html(user.phone)
    } else {
        $('.isLogin').hide()
    }

    // 添加logo动画
    $('#header .logo').on('animationend', function () {
        $(this).removeClass('animate__fadeOut')
    })

    setInterval(() => {
        $('#header .logo').addClass('animate__fadeOut')
    }, 3000)

    $('.search button').click(function () {
        // val() : 读取输入框的值 value
        const kw = $(this).prev().val()

        // 修改路径中的参数
        // replace: 替换路径后,没有回退操作
        // assign: 前往新地址后,有回退操作
        location.assign(`/?page=search&kw=${kw}&type=0`)
        // page:代表页面名称
        // kw:搜索的关键词
        // type: 搜索结果的排序方式 0 是日期最新
    })

    // 回车时,也能出发搜索按钮
    $('.search input').keyup(function (e) {
        if (e.keyCode == 13) {
            $(this).next().click()
        }
    })
})
