"use strict";

$(function () {
  var newPage = 1; // 当前页

  var loading = false; // 存储当前的请求状态

  var nomore = false; // 是否没有更多数据

  function getData(page) {
    loading = true; // 请求中...

    Req.get("mall?page=".concat(page), function (data) {
      loading = false; // 请求完毕

      nomore = data.page == data.pageCount; // 如果是最后一页,则显示没有更多

      if (nomore) $('#nomore').show();
      console.log(data);
      newPage = data.page; // append: 累加子元素,新增的会添加到旧的后面

      $('.list').append(data.data.map(function (item) {
        var name = item.name,
            pic = item.pic,
            price = item.price,
            sale = item.sale_count;
        return "        <div class=\"list-item\">\n            <a href=\"javascript:;\">\n                <img src=\"/assets/img/mall/".concat(pic, "\" alt=\"\">\n            </a>\n            <div>\n                <span class=\"line-2\">").concat(name, "</span>\n                <div>\n                    <span>\xA5").concat(price, "</span>\n                    <p>\u6708\u552E").concat(sale, "</p>\n                </div>\n            </div>\n        </div>\n");
      }));
    });
  }

  getData(1); // 监听页面的滚动,当触底时,发请求,获取新的数据

  $(window).on('scroll', function () {
    // 如果请求中,则忽略触底操作
    // 如果没有更多数据,则不操作
    if (loading || nomore) return;
    var top = $(window).scrollTop(); // 滚动的距离
    // console.log('top', top)

    var innerH = $(window).innerHeight(); // console.log('innerH', innerH) // 整个页面的高度,也可以认为是body的高
    // 获取脚部栏的位置

    var footer_y = $('#footer').offset().top; // 恰好触底的滚动偏移量

    var toBottom = footer_y - innerH; // 获取交不栏的位置
    // console.log('footer', $('#footer').offset().top)
    // 只要滚动距离,大于恰好触底的偏移量,就算触底
    // 触底优化: 把请求时间提前,更早的获取新的数据,尽量让用户无感

    if (top >= toBottom) {
      console.log('触底了');
      getData(newPage + 1); // 获取下一页的
    }
  }); // // 请求页数
  // $('.pager').on('click', 'button.page', function () {
  //     const page = $(this).text()
  //     // console.log('page', page)
  // })
});