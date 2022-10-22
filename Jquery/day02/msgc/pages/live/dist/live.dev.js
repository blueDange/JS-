"use strict";

$(function () {
  // 直播来自其他服务器,需要单独发请求
  var loading = false; // 代表是否正在请求 43.
  // var 和 let 没有区别 因为都是在函数作用域中

  var newPage = 1;
  var nomore = false; // 是否没有更多了

  function getData(page) {
    var url = "https://douyu.xin88.top/api/room/list?page=".concat(page, "&type=ms"); // 如果请求中,就不要再发请求 - 如果 有人在坑, 其他人就不能进了

    loading = true; // 代表请求中,蹲坑中....

    $.get(url, function (data) {
      loading = false; // 请求完毕,出坑了...

      nowPage = data.data.nowPage; //当前页
      // 当前页 == 总页数 为真  就是没有更多了

      nomore = data.data.nowPage == data.data.pageCount; // 如果没有更多,就展示对应的提示

      if (nomore) $('#nomore').show();
      console.log(data);
      newPage = data.data.nowPage;
      console.log(newPage);
      $('.list').append(data.data.list.map(function (item) {
        console.log(item);
        var roomSrc = item.roomSrc,
            hn = item.hn,
            nickname = item.nickname,
            roomName = item.roomName;
        return "                <div class=\"list-items\">\n            <div>\n                <img src=\"".concat(roomSrc, "\" alt=\"\">\n                <span>").concat(hn, "</span>\n                <span>").concat(nickname, "</span>\n            </div>\n            <span>").concat(roomName, "</span>\n        </div>\n\n                ");
      }));
    });
  } // 由于一页只有8条数据 无法充满网页 所以请求两次


  getData(1);
  getData(2); // 监听页面的滚动

  $(window).on('scroll', function () {
    // 如果请求中,就不要再发请求 -如
    // 如果没有更多,则停止加载更多
    if (nomore || loading) return; // 如果没有更多数据,则不操作

    var top = $(window).scrollTop(); //页面滚动的距离
    // // 获取body 内容的高度 (不包含内边距和边框)
    // const innerH = $(window).innerHeight()
    // 窗口本身没有内边距,所以 innerHeight 和 height 相同

    var win_height = $(window).height(); // 窗口高度  (包含内边距和边框)

    var footer_y = $('#footer').offset().top; // 触底时滚动的偏移量

    var toBottom = footer_y - win_height;

    if (top >= toBottom - 100) {
      console.log('触底了');
      getData(newPage + 1);
    }
  });
});