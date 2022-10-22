'use strict'

$(function () {
    // 请求到指定页数的数据, 并展示到页面上
    function getData(page) {
        Req.get('video?page='.concat(page), function (data) {
            console.log(data)
            $('.list').html(
                data.data.map(function (item) {
                    var duration = item.duration,
                        pic = item.pic,
                        title = item.title,
                        views = item.views
                    return '<div class="list-item">\n        <div>\n          <img src="./assets/img/video/'
                        .concat(
                            pic,
                            '" alt="">\n          <div>\n            <span>'
                        )
                        .concat(
                            views,
                            '\u6B21\u64AD\u653E</span>\n            <span>'
                        )
                        .concat(
                            duration,
                            '</span>\n          </div>\n        </div>\n        <div>\n          <span>'
                        )
                        .concat(title, '</span>\n        </div>\n      </div>')
                })
            )
            var page = data.page,
                pageCount = data.pageCount
            var pages = ''
            var start = Math.max(page - 2, 1) //最小是1
            // 最大页数: 最多不能超出总页数

            var end = Math.min(start + 4, pageCount) // 根据最大页数,范随处起始页

            start = Math.max(end - 4, 1)

            for (var i = start; i <= end; i++) {
                // 序号i 和 当前页相同, 则添加激活样式
                pages += '<button class="page '
                    .concat(page == i ? 'active' : '', '">')
                    .concat(i, '</button>')
            }

            $('.pager').html(
                '<button class="prev '
                    .concat(
                        page == 1 ? 'hide' : '',
                        '">\u4E0A\u4E00\u9875</button>'
                    )
                    .concat(pages, '<button class="next ')
                    .concat(
                        page == pageCount ? 'hide' : '',
                        '">\u4E0B\u4E00\u9875</button>'
                    )
            )
        })
    } // 初始化时, 触发一次函数, 获取第一页数据

    getData(1) // 页数是请求后, 动态添加的, 适合用委托模式绑定事件

    $('.pager').on('click', 'button.page', function () {
        var page = $(this).text()
        console.log('page', page) // 传入点击的页数按钮上的 页数, 获取对应的数据

        getData(page)
    }) // 下一页

    $('.pager').on('click', 'button.next', function () {
        // 找到当前激活的页数
        var page = $('.pager>.active').text()
        getData(page - -1) // 不用+,规避字符串拼接
    }) // 上一页

    $('.pager').on('click', 'button.prev', function () {
        // 找到当前激活的页数
        var page = $('.pager>.active').text()
        getData(page - 1)
    })
})
