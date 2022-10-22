$(function () {
    $('#footer').hide()

    // 注册按钮的点击逻辑
    $('button:contains(注册)').click(function () {
        // 获取checkbox 的勾选状态
        // JQ提供的新选择器语法, :checkbox 代替 [type=checkbox]
        // prop: 读取元素的系统属性
        const checked = $(':checkbox').prop('checked')
        console.log('checked', checked)
        if (!checked) {
            $('.agree').addClass('animate__animated animate__headShake')
        } else {
            // 三个输入框都处于正确状态, 才能注册
            // 三个按钮 .ok样式元素,均可见
            console.log('可见.ok', $('.item>.ok:visible'))
            if ($('.item>.ok:visible').length == 3) {
                const phone = $('.item:eq(0)>input').val()
                const pwd = $('.item:eq(1)>input').val()
                Req.post('users/register', { phone, pwd }, (data) => {
                    console.log(data)
                    // 如果 成功 ,code==200, 则跳转到登录页面 ,且不能返还 replace
                    if (data.code == 200) {
                        alert('恭喜你,注册成功!即将跳转到登录页面~')
                        location.replace('?page=login')
                    } else {
                        alert(data.msg)
                    }
                })
            }
        }
    })

    $('.agree').on('animationend', function () {
        $(this).removeClass('animate__headShake')
    })

    // 手机号的相关逻辑
    $('.item')
        .eq(0)
        .on('blur', 'input', function () {
            // blur: 失去焦点事件
            const phone = $(this).val()
            console.log('phone', phone)

            if (phone == '') return

            // 先隐藏所有span标签
            $(this).siblings('span').hide()

            if (/^1[3-9]\d{9}$/.test(phone)) {
                // 发请求，查看是否已注册
                Req.post('users/checkPhone', { phone }, (data) => {
                    console.log(data)
                    if (data.code == 200) {
                        // siblings('.ok'): 兄弟元素中, 带有 ok 样式的
                        $(this).removeClass('err').siblings('.ok').show()
                    }
                    if (data.code == 202) {
                        // 已存在
                        $(this).addClass('err').siblings('.err2').show()
                    }
                })
            } else {
                $(this).addClass('err').siblings('.err1').show()
            }
        })

    // 密码
    $('.item')
        .eq(1)
        .on('blur', 'input', function () {
            const len = $(this).val().length

            if (len == 0) return

            $(this).siblings('span').hide()

            if (len >= 6 && len <= 12) {
                $(this).removeClass('err').siblings('.ok').show()
            } else {
                $(this).addClass('err').siblings('.err').show()
            }
        })

    //验证密码
    $('.item')
        .eq(2)
        .on('blur', 'input', function () {
            const re_pwd = $(this).val()
            const pwd = $('.item:eq(1)>input').val()

            if (pwd == '') return

            $(this).siblings('span').hide()
            if (re_pwd == pwd) {
                $(this).removeClass('err').siblings('.ok').show()
            } else {
                $(this).addClass('err').siblings('.err').show()
            }
        })

    // 当输入框获得焦点时:
    $('.item>input').on('focus', function () {
        $(this).removeClass('err').siblings().hide()
    })

    // 让有错误的输入框 动画提示
    $('button:contains(注册)').click(function () {
        $('input.err').addClass('animate__animated animate__headShake')
    })
    $('.item>input').on('animationend', function () {
        $(this).removeClass('animate__headShake')
    })
})
