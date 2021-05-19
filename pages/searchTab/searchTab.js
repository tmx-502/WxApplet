// pages/searchTab/searchTab.js
Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },
  onLoad: function () {
    this.setData({
      search: this.search.bind(this)
    })

  },
  onShow: async function () {
    let array = [];
    let result = await getApp().request({
      UserGH: getApp().globalData.UserGH
    }, 'Query', '20S05');
    console.log(result);
    result.body.SaveItemCls.forEach(e => {
      e.RecordNo.split(',').forEach(item => {
        if (item == '') return;
        array.push({
          Bid: e.Bid,
          Bcontent: e.Bcontent,
          Cid: e.Cid,
          Ccontent: e.Ccontent,
          RecordNo: item
        })
      })
    })
    this.setData({
      array
    })

  },
  search: async function (value) {
    let result = this.data.array.filter(e => e.RecordNo.includes(value) || e.Ccontent.includes(value));
    let showList = [];
    for (let i = 1; i <= result.length; i++) {
      showList.push({
        text: result[result.length - i].RecordNo + ' 一 ' + result[result.length - i].Ccontent,
        value: result[result.length - i]
      })

      //if (i == 5) break;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(showList)
      }, 200)
    })
  },
  selectResult: async function (e) {
    let result = await getApp().request({
      Cid: e.detail.item.value.Cid,
      RecordNo: e.detail.item.value.RecordNo,
      SelType: 1
    }, 'Query', '20S03');
    this.setData({
      result
    })
    wx.navigateTo({
      url: '../formTables/jxsbTab/jxsbTab?Bid=' + e.detail.item.value.Bid + '&Cid=' + e.detail.item.value.Cid + '&Ccontent=' + e.detail.item.value.Ccontent + '&RecordNo=' + e.detail.item.value.RecordNo + '&isQuery=' + true
    })


  },
})