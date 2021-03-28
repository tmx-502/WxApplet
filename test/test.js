// test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headline: '制动台测速板Ⅱ进货检验记录表',
    cpwgList: [{
      cpwg: "崭新，元器件排列整齐崭新，元器件排列整齐崭新，元器件排列整齐崭新，元器件排列整齐器件排列整齐",
      id: 0
    }, {
      cpwg: "崭新，元器件排列整齐",
      id: 1
    }, {
      cpwg: "崭新，元器件排列整齐",
      id: 2
    }],
    dqxnList: [{
      dqxn: "崭新，元器件排列整齐",
      id: 0,
      sfhg: true
    }, {
      dqxn: "崭新，元器件排列整齐",
      id: 1,
      sfhg: true
    }],
    index: 0,
    qtList: [],
    imgUrls: []
  },

  bhgpz(res) {
    let id = res.target.id.split(" ");
    let tempData = id[0] + 'List[' + id[1] + ']';
    console.log(tempData);
    if (id[2] == 'Y') {
      //点击合格时删除不合格的图片路径
      let temp = this.data.imgUrls.indexOf('http://tmp/' + this.data[id[0] + 'List'][id[1]].ImgUrl);
      if (temp >= 0) this.data.imgUrls.splice(temp, 1);
      this.setData({
        [tempData + ".sfbhg"]: null,
        [tempData + ".ImgUrl"]: null
      })
    } else if (id[2] == 'N') {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          this.data.imgUrls.push(res.tempFilePaths[0]);
          this.setData({
            [tempData + ".sfbhg"]: true,
            [tempData + ".ImgUrl"]: res.tempFilePaths[0].replace("http://tmp/", '')
          })
        },
        fail: () => {
          console.log();
        },
      })
    }
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  qtListAdd() {
    this.data.qtList.push({
      qt: "",
      id: this.data.qtList.length,
    });
    this.setData({
      qtList: this.data.qtList
    })
  },

  cpwgClick() {
    this.setData({
      cpwgClickBtn: this.data.cpwgClickBtn ? false : true
    })
  },
  dqxnClick(event) {
    this.setData({
      dqxnClickBtn: this.data.dqxnClickBtn ? false : true
    })
  },
  qtClick(event) {
    this.setData({
      qtClickBtn: this.data.qtClickBtn ? false : true
    })
  },
  qzClick(res) {
    wx.navigateTo({
      url: '../pages/dzqm/dzqm?btnId=' + res.target.id,
    })

  },
  fromSubmit: function (e) {
    console.log(e.detail.value);
    wx.showLoading({
      title: '上传中',
    })
    this.data.imgUrls.forEach(function (url) {
      wx.uploadFile({
        filePath: url,
        name: url.replace("http://tmp/", ''),
        url: 'url',
      })
    });
    wx.hideLoading({
      success: (res) => {

      },
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})