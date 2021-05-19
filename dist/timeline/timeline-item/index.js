"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames4 = _interopRequireDefault(require("../helpers/classNames")),
  _styleToCssString = _interopRequireDefault(require("../helpers/styleToCssString"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function _defineProperty(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e
}(0, _baseComponent.default)({
  relations: {
    "../timeline/index": {
      type: "parent"
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: "wux-timeline-item"
    },
    content: {
      type: String,
      value: ""
    },
    dotStyle: {
      type: [String, Object],
      value: "",
      observer: function (e) {
        this.setData({
          extStyle: (0, _styleToCssString.default)(e)
        })
      }
    },
    custom: {
      type: Boolean,
      value: !1
    }
  },
  data: {
    isLast: !1,
    isPending: !1,
    pending: !1,
    className: "",
    extStyle: ""
  },
  computed: {
    classes: ["prefixCls, isLast, pending, isPending, custom", function (e, t, n, a, i) {
      var s;
      return {
        wrap: (0, _classNames4.default)(e, (_defineProperty(s = {}, "".concat(e, "--last"), t), _defineProperty(s, "".concat(e, "--pending"), n), s)),
        tail: (0, _classNames4.default)("".concat(e, "__tail"), _defineProperty({}, "".concat(e, "__tail--pending"), a)),
        dot: (0, _classNames4.default)("".concat(e, "__dot"), _defineProperty({}, "".concat(e, "__dot--custom"), i)),
        content: "".concat(e, "__content")
      }
    }]
  },
  methods: {
    updateIsLastElement: function (e) {
      var t = e.index,
        n = e.isLast,
        a = e.isPending,
        i = e.pending,
        s = e.position,
        r = this.data.prefixCls,
        o = "alternate" === s ? t % 2 == 0 ? "".concat(r, "--alternate ").concat(r, "--left") : "".concat(r, "--alternate ").concat(r, "--right") : "right" === s ? "".concat(r, "--right") : "";
      this.setData({
        isLast: n,
        isPending: a,
        pending: i,
        className: o
      })
    }
  }
});