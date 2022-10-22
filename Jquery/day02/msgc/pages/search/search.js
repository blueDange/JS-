$(function () {
    // https://serverms.xin88.top/mall/search?type=1&kw=猪肉&page=1

    // 读取路径中的参数kw 和 type, 拼接到URL地址中
    // 发请求即可
    const kw = Q.search('kw')
    const type = Q.search('type') // 0 1 2
    // 通过type的值  找到对应的按钮, 添加激活
    $('#sort>button').eq(type).addClass('active')
    // 排序的点击
    $('#sort>button').click(function () {
        const i = $(this).index() // 点击按钮的序号,恰好与type一致
        location.assign(`?page=search&kw=${kw}&type=${i}`)
        // 路径变化后,会导致页面刷新, 所有的代码都会再执行一次
    })

    // console.log('url', url)
    function getData(name) {
        const url = `mall/search?type=${type}&kw=${kw}&page=${name}`
        Req.get(url, (data) => {
            console.log(data)

            $('#content>ul').html(
                data.data.map((item) => {
                    const { name, pic, price, sale_count } = item
                    return `<li>
        <img
          src="/assets/img/mall/${pic}"
          alt=""
        />
        <div>
          <h3>${name}</h3>
          <b>￥${price}</b>
          <span>销量:${sale_count}</span>
        </div>
      </li>`
                })
            )

            const { page, pageCount } = data
            let pages = ''
            let start = Math.max(page - 2, 1)
            let end = Math.min(start + 4, pageCount)
            start = Math.max(end - 4, 1)

            if (page == 1) {
                $('.prev').addClass('disabled')
            }

            for (let i = start; i < end; i++) {
                pages += `<button class="page ${
                    page == i ? 'active' : ''
                }">${i}</button>`
            }

            $('.pager').html(
                `<button class="${
                    page == 1 ? 'disabled' : ''
                }">上一页</button>${pages}<button class="${
                    page == pageCount - 1 ? 'disabled' : ''
                }">下一页</button>`
            )
        })
    }

    getData(1)

    $('.pager').on('click', 'button.page', function () {
        const page = $(this).text()
        console.log(page)
        getData(page)
    })

    // 下一页
    $('.pager').on('click', 'button:contains(下一页)', function () {
        const pno = $('.pager>.active').text()
        getData(pno - -1)
    })

    // 上一页
    $('.pager').on('click', 'button:contains(上一页)', function () {
        const page = $('button.active').text()
        getData(page - 1)
    })
})
