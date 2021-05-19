"use strict";
var _baseComponent = _interopRequireDefault(require("../helpers/baseComponent")),
  _classNames = _interopRequireDefault(require("../helpers/classNames"));

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}(0, _baseComponent.default)({
  relations: {
    "../timeline-item/index": {
      type: "child",
      observer: function () {
        this.debounce(this.updateIsLastElement)
      }
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: "wux-timeline"
    },
    pending: {
      type: Boolean,
      value: !1
    },
    position: {
      type: String,
      value: "left"
    }
  },
  methods: {
    updateIsLastElement: function () {
      var e = this.getRelationNodes("../timeline-item/index");
      if (0 < e.length) {
        var s = e.length - 1,
          t = this.data,
          a = t.pending,
          o = t.position;
        e.forEach(function (e, t) {
          var i = a ? t === Math.max(0, s - 1) : t === s,
            n = a && t === s;
          e.updateIsLastElement({
            index: t,
            isLast: i,
            isPending: n,
            pending: a,
            position: o
          })
        })
      }
    }
  }
});