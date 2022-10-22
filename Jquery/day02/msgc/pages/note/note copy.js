$(function () {
    // 没有更多数据,即最后一页,不在加载更多了
    // 已经在加载了, 则不在加载了
    let nowPage = 1
    let loading = false // 代表是否正在请求
    let nomore = false // 是否没有更多了
    function getData(name) {
        // const url = `https://serverms.xin88.top/note?page=${name}`
        loading = true // 正在发请求
        Req.get(`note?page=${name}`, (data) => {
            loading = false
            nomore = data.page == data.pageCount
            nowPage = data.page
            // 如果没有更多数据 则显示没有更多
            if (nomore) $('.nomore').show()
            // console.log(data)
            $('.list').append(
                data.data.map((item) => {
                    // console.log(item)
                    const {
                        cover,
                        title,
                        name,
                        favorite,
                        head_icon,
                        width,
                        height,
                    } = item
                    // 在每个元素上,保存图片的宽高比例 高/宽

                    return `<div class="list-item" data-hw="${height / width}">
            <img src="/assets/img/note/${cover}" alt="">
            <div>
                <p class="line-2">${title}</p>
                <div>
                    <i><img src="./assets/img/note/${head_icon}" alt=""></i>
					<div>
                        <span>${name}</span>
                        <span>${favorite}</span>
                    </div>
                </div>
            </div>
        </div>`
                })
            )

            // 实时读取:每一列的宽
            const item_w = $('.list-item').width()
            // 存放每一列中,最下方的元素
            const arr = []

            // 获取某个元素的底部 距离 顶部的距离
            function getBottom(element) {
                // 元素底部 = top + 图片稿 + 文字高100
                const top = $(element).css('top') // 例如 10px
                // 按比例,算出图片的高
                const img_h = $(element).data('hw') * item_w
                return parseInt(top) + img_h + 100
            }

            // 从数组中找到底部距离 最小的, 即最靠上的
            function finMin() {
                // 先假设序号0的最小,然后遍历数组,看是否有更小的
                let minElement = arr[0]

                arr.forEach((item) => {
                    // 如果底部有更小的
                    if (getBottom(item) < getBottom(minElement)) {
                        minElement = item
                    }
                })
                return minElement // 返回找到的最小元素
            }

            // 找4列中,底部最大的, 作为整个父元素的高
            function findMax() {
                let MaxElement = arr[0]
                // 遍历查看是否有更大的
                arr.forEach((item) => {
                    // 如果有更大的就替换他
                    if (getBottom(item) > getBottom(MaxElement)) {
                        MaxElement = item
                    }
                })
            }

            // JQ提供的遍历语法 : 遍历查找到的元素们
            $('.list-item').each((index, element) => {
                // 一排四个,序号是0 1 2 3
                if (index < 4) {
                    $(element).css({
                        top: 0,
                        left: index * (item_w + 10),
                    })
                    arr.push(element)
                } else {
                    // 找到最小的元素,放在其下方
                    const minElement = finMin()
                    $(element).css({
                        left: $(minElement).css('left'),
                        top: getBottom(minElement) + 10,
                    })

                    // 新增元素之后,这一列的最下方元素就要发生变化
                    // 获取最小元素在数组中的序号
                    const i = arr.indexOf(minElement)
                    arr[i] = element
                }
            })

            // 修改父元素 列表的高 为 最大底部子元素的底部
            $('.list').css('height', getBottom(findMax()))
        })
    }

    getData(1)

    // 触底检测,加载更多
    // 监听窗口的滚动
    $(window).on('scroll', function () {
        const top = $(window).scrollTop()

        const innerH = $(window).innerHeight()

        const foot_y = $('#footer').offset().top

        const toButton = foot_y - innerH

        if (top >= toButton - 100) {
            // 如果没有更多数据 或 加载中 都停止
            if (loading || nomore) return
            console.log('触底了')
            getData(nowPage + 1)
        }
    })
})
