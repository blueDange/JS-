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

            // 新增元素之后,遍历每个元素,设定其位置
            // forEach是数组遍历  ,   each是JQ对象的遍历方法
            // 参数1: 序号, 参数2: 元素   -- 这个参数顺序与 forEach 相反

            // 获取宽度
            const item_w = $('.list-item').width()
            console.log(item_w)

            // 1个数组,存储4列中, 最下面的元素
            const arr = []

            // 获取数组中, 底部最矮的
            function findMin() {
                // 临时指定第一个元素最矮
                let minElement = arr[0]

                arr.forEach((item) => {
                    // 如果遍历到的元素的底部更小,则替换最小元素
                    if (getBottom(item) < getBottom(minElement)) {
                        minElement = item
                    }
                })
                return minElement
            }

            // 获取数组中, 最高的
            function findMax() {
                let maxElement = arr[0]
                arr.forEach((item) => {
                    if (getBottom(item) > getBottom(maxElement)) {
                        maxElement = item
                    }
                })
                return maxElement
            }
            // 获取元素下边框, 距离顶部的距离
            function getBottom(element) {
                // 图片高: 图片的宽 x 比例
                const img_h = $(element).width() * $(element).data('hw')
                // css('top') 的结果类似 '10px' 需要转数字
                const top = parseInt($(element).css('top'))
                return top + img_h + 100
            }
            $('.list-item').each((index, element) => {
                // console.log(index, element)
                // 1排4个,先布局前4个
                if (index < 4) {
                    $(element).css({
                        left: index * (item_w + 10),
                        top: 0,
                    })

                    // 前4个放数组里
                    arr.push(element)
                } else {
                    // 找到最小的元素
                    const minElement = findMin()
                    console.log('minElement', minElement)
                    // 设置新元素
                    $(element).css({
                        left: $(minElement).css('left'),
                        top: getBottom(minElement) + 10,
                    })
                    // 找到新元素增加在第几列,替换掉数组中的这个元素
                    // arr中存储的永远都是 4列中 ,最下方的那个元素
                    // 当新元素添加到最小元素下之后,新元素就是最下方
                    // i 是最小元素的序号,也是所在列的序号
                    const i = arr.indexOf(minElement)
                    arr[i] = element
                }

                // 放置新的元素时, 需要从数组里找到最矮的那个
                // 遍历数组arr,找到最矮的元素: y轴偏移量 + 自身高(图+100)
                // 找到之后, 把元素放到对应列,并且更新数组中对应列的元素
            })

            // 由于素有子元素都是绝对定位,倒是 .list 的高度缺失
            // 人为计算,赋值为 最下方的子元素的底部
            let maxElement = findMax()
            $('.list').css('height', getBottom(maxElement))
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
