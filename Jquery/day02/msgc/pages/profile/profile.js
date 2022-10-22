$(function () {
    // 读取存储的用户信息，把其中的用户名设置到 表格里

    let user = sessionStorage.getItem('user') || localStorage.getItem('user')

    if (user) user = JSON.parse(user)

    const created = moment(user.created).format('YYYY-MM-DD')
    console.log(created)

    $('td.phone').html(user.phone)
    $('td.created').html(created)

    $('#sidemenu li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')

        // 获取点击项的序号，找到对应此序号的右侧栏目 ，激活他
        const i = $(this).index()
        $('#content>div')
            .eq(i)
            .addClass('active')
            .siblings()
            .removeClass('active')
    })

    // 退出登录
    $('button:contains(退出登录)').on('click', function () {
        // 登录状态依赖 存储在浏览器中的用户信息来判定
        // 退出登录 即 删除信息
        sessionStorage.removeItem('user')
        localStorage.removeItem('user')

        // location.replace('./')
    })
})
