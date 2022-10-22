$('load', function () {
    const url = 'https://serverms.xin88.top/index'
    Req.get('index', (data) => {
        console.log(data)
        $('#topvideo .list').html(
            data.hot_video.map((item) => {
                const { vname, mp4, pic } = item
                return `
                <div>

                    <video src="./assets/video/${mp4}" poster="./assets/img/${pic}" preload="none"></video>
                    <i></i>
                    <span>${vname}</span>
                </div>

`
            })
        )

        // 热搜
        $('#hot-search > div').html(
            data.today_hot.map((item) => {
                const { name, emphasize: em } = item
                return `
                <a href="" class="${em ? 'em' : ''}">${name}</a>
            `
            })
        )

        data.today_meal.forEach((element, index) => {
            const { cate_name, contents } = element

            $('#select>div>ul').append(
                `<li class="${index == 0 ? 'active' : ''}">${cate_name}</li>`
            )

            contents.forEach((element) => {
                const { desc, pic, title } = element

                $('.swiper>.swiper-wrapper').append(` <div class="swiper-slide">
                        <img src="/assets/img/food/${pic}" alt="" />
                        <b>${title}</b>
                        <span>${desc}</span>
                    </div>`)
            })
        })

        // data.index_items.forEach((element) => {
        //     const { title, items } = element

        //     $('#index-items>.index-item').append(`<h2>${title}</h2>`)

        //     items.forEach((element) => {
        //         const { pic, title, desc, author } = element

        //         $('#index-items>.index-item>ul').append(` <li>
        //                 <div>
        //                     <img src="./assets/img/food/${pic}" alt="">
        //                     <span>${author}</span>
        //                 </div>
        //                 <div>
        //                     <b>${title}</b>
        //                     <span>${desc}</span>
        //                 </div>
        //             </li>`)
        //     })
        // })

        $('#index-items').html(
            data.index_items.map((item) => {
                const { title, items } = item

                // 对items 再便利一次
                const lis = items.map((item) => {
                    const { author, desc, pic, title } = item
                    return `<li class="line-1">
                        <div>
                            <img src="./assets/img/food/${pic}" alt="">
                            <span>${author}</span>
                        </div>
                        <div>
                            <b>${title}</b>
                            <span>${desc}</span>
                        </div>
                    </li>`
                })

                // 利用join分隔字符串, 不然后, 拼接
                return `            <div class="index-item">
                <h2>${title}</h2>
                <ul>
					${lis.join('')}
                </ul>
            </div>
`
            })
        )
    })

    //为异步添加的元素监听事件 推荐采用委托模式
    $('#topvideo .list').on('click', '>div', function () {
        //从div子元素中找到video
        //children() 获取所有子元素 其参数是过滤选择器
        //children('video') 子元素里  video标签
        // this是 .list > div 即 .list 元素下的 子元素div
        // 仅播放当前,其他不播放

        // 如果当前点击项已激活

        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $(this).children('video').trigger('pause') // 暂停播放
            $(this).siblings().removeClass('noactive')
        } else {
            $('#topvideo video').trigger('pause')
            $(this).children('video').trigger('play')

            // 添加激活
            $(this).addClass('active').siblings().removeClass('active')
            $(this).removeClass('noactive').siblings().addClass('noactive')
        }
    })

    // swiper初始化
    var mySwiper = new Swiper('.swiper', {
        // 轮播图组件会自动根据设置来调整,  滚动项的宽度
        slidesPerGroup: 3, // 几个为一组
        slidesPerView: 3, //每页有几个
        spaceBetween: 10, // 间距
        on: {
            slideChange() {
                // console.log('改变了,activeInder为' + this.activeIndex)
                // 触发对应 li 的点击事件,trigger('click')
                // 序号除3 转为 0 1 2 3
                $('#select li')
                    .eq(this.activeIndex / 3)
                    .trigger('click')
            },
        },
    })

    // 用委托来管理动态新增的子元素
    $('#select').on('click', 'ul li', function () {
        $(this).addClass('active').siblings().removeClass('active')
        const i = $(this).index()
        // console.log('i', i)
        mySwiper.slideTo(i * 3)
    })

    // 定时器切换广告的激活
    setInterval(() => {
        $('#banner').toggleClass('active')
    }, 3000)
})
