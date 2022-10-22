$(function () {
    $('#footer').hide()
    // 点击登录获取两个输入框的值
    $('button:contains(登录)').click(function () {
        const phone = $('#main>div input:eq(0)').val()
        const pwd = $('#main>div input:eq(1)').val()
        // console.log(phone)
        // console.log('pwd', pwd)
        Req.post('users/login', { phone, pwd }, (data) => {
            console.log(data)
            if (data.code == 200) {
                // 存储机制: 临时的一定会存, 永久的就要看用户的选择了
                sessionStorage.setItem('user', JSON.stringify(data.data))
                // 根据 下次自动登录的值 ,来普安段要不要存永久
                var checked = $(':checkbox').prop('checked')
                if (checked) {
                    // 30天过期
                    var expireTime =
                        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
                    // 存储到返回值的 用户数据里
                    data.data.expireTime = expireTime

                    localStorage.setItem('user', JSON.stringify(data.data))
                }
                alert('登录成功 ,即将跳转到首页')
                location.replace('?page=profile')
            } else {
                alert('登录失败! 请检查账号密码')
            }
        })
    })
})
