$(function () {
  // 读取存储的用户信息, 把其中的用户名设置到 表格里
  let user = sessionStorage.getItem('user') || localStorage.getItem('user')
  if (user) user = JSON.parse(user)

  // 设置头像页面的默认头像
  $('.head-photo>div>img').prop(
    'src',
    user.avatar
      ? `https://game.gtimg.cn/images/lol/act/img/champion/${user.avatar}.png`
      : '/assets/img/user_unknown.png'
  )

  $('td.phone').html(user.phone)
  // 服务器存放的秒数, 此处需要毫秒, 需要 x1000
  $('td.created').html(moment(user.created * 1000).format('YYYY-MM-DD'))

  const i = sessionStorage.getItem('profile_index') || 0

  $('#sidemenu li').click(function () {
    $(this).addClass('active').siblings().removeClass('active')

    // 获取点击项的序号, 找到对应此序号的右侧项目, 激活他
    const i = $(this).index()
    // 序号保存到临时存储区,刷新不丢失
    sessionStorage.setItem('profile_index', i)
    $('#content>div').eq(i).addClass('active').siblings().removeClass('active')
  })

  // 页面加载时 ,读取激活的序号
  $('#sidemenu li').eq(1).click()

  // 退出登录
  $('button:contains(退出登录)').on('click', function () {
    // 登录状态依赖 存储在浏览器中的用户信息来判定
    // 退出登录 即 删除信息
    sessionStorage.removeItem('user')
    localStorage.removeItem('user')

    location.replace('./')
  })

  // 头像请求
  Req.get('users/head_photos', data => {
    console.log(data)

    $('.head-photo>ul').html(
      data.hero.map(item => {
        const { alias, selectAudio: sa } = item

        return `<li><img data-alias="${alias}" data-sa="${sa}" src="https://game.gtimg.cn/images/lol/act/img/champion/${alias}.png" alt=""></li>`
      })
    )
  })

  // 点击头像播放声音
  const au = new Audio() //音频播放器
  au.preload = 'none'

  $('.head-photo>ul').on('click', 'img', function () {
    const sa = $(this).data('sa')

    au.src = sa
    au.play()

    // 替换头像:
    // clone: 复制元素
    $('.head-photo>div>img').replaceWith($(this).clone())
  })

  // 点击确定按钮, 更新头像地址到服务器上
  $('.head-photo>div>button').on('click', function () {
    // 按钮上方的元素
    const alias = $(this).prev().data('alias')
    const img_src = $(this).prev().prop('src')
    Req.post('users/head_photo', { id: user.id, alias }, data => {
      console.log(data)
      if (data.code == 200) {
        $('#header .isLogin>img').prop('src', img_src)
        //更新本地缓存中的数据
        user.avatar = alias
        //更新到临时存储区  对象类型要转JSON字符串才能存
        sessionStorage.setItem('user', JSON.stringify(user))
        //如果长期存储过  则也要更新
        if (localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(user))
        }
        alert('头像更新成功')
      } else {
        alert('头像更新失败')
      }
    })
  })
})
