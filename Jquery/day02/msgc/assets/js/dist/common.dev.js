"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// common.js
// 存放一些公用的JS方法
// 模仿JQuery, 把一些常用的方法,封装到一个对象里
// JQ的函数名是 $
var Q =
/*#__PURE__*/
function () {
  function Q() {
    _classCallCheck(this, Q);
  }

  _createClass(Q, null, [{
    key: "search",
    value: function search(name) {
      // 考虑到URL中可能出现中文编码问题,需要转码
      var search = decodeURI(location.search); // 静态方法: static. 直接用Q.search出发

      var params = new URLSearchParams(location.search);
      return params.get(name); // return new URLSearchParams(location.search).get(name)
    }
  }]);

  return Q;
}();