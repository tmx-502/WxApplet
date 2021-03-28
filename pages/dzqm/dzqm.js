const app = getApp()
var ctx = null
var arrx = []
var arry = []
var arrz = []
var canvasw = 600
var canvash = 300
var isButtonDown = false

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDrawing: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = wx.createSelectorQuery()
    query.select('.paint-board-canvas').boundingClientRect(rect => {
      canvasw = rect.width
      canvash = rect.height
      console.log(canvasw + '-' + canvash)
    }).exec()
    ctx = wx.createCanvasContext("board")
    ctx.beginPath()
    ctx.setStrokeStyle("#000000")
    ctx.setLineWidth(4)
    ctx.setLineCap("round")
    ctx.setLineJoin("round")
    this.setData({
      ctx: ctx,
      options
    })
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

  startDraw: function (e) {
    // console.log(e)
    this.setData({
      isDrawing: true
    })
    isButtonDown = true
    arrz.push(0)
    arrx.push(e.changedTouches[0].x)
    arry.push(e.changedTouches[0].y)
  },

  onDraw: function (e) {
    // console.log(e)
    if (isButtonDown) {
      arrz.push(1)
      arrx.push(e.changedTouches[0].x)
      arry.push(e.changedTouches[0].y)
    }
    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        ctx.moveTo(arrx[i], arry[i])
      } else {
        ctx.lineTo(arrx[i], arry[i])
      };

    };
    ctx.clearRect(0, 0, canvasw, canvash);

    ctx.setStrokeStyle('#000000');
    ctx.setLineWidth(4);
    ctx.setLineCap('round');
    ctx.setLineJoin('round');
    ctx.stroke();

    ctx.draw(false);

  },

  endDraw: function (e) {
    isButtonDown = false
  },

  cleardraw: function (e) {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    ctx.clearRect(0, 0, canvasw, canvash);
    ctx.draw(true);
    this.setData({
      isDrawing: false
    })
  },

  submit: function (e) {
    if (!this.data.isDrawing) {
      wx.showToast({
        title: '请先完成签名',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '提交中...',
      })
      this.saveTmpImg()
    }
  },

  saveTmpImg: function () {
    // 这里是转换id为board的canvas，即未旋转前的图片
    wx.canvasToTempFilePath({
      canvasId: 'board',
      fileType: 'jpg',
      destWidth: '300',
      destHeight: '600',
      quality: 1, //图片质量
      success: (res) => {
        this.setRotateImage(res.tempFilePath)
      }
    })
  },

  setRotateImage: function (filePath) {
    console.log('rotate')
    // 这里就用到了tmp_board 即将转换后的图片画回到画布中 只是在页面中无感知而已
    let tmpCtx = wx.createCanvasContext('tmp_board', this)
    // 设置基准点 因为要转-90度 所以要将基准点设置为左下角
    tmpCtx.translate(0, 180)
    tmpCtx.rotate(270 * Math.PI / 180)
    // drawImage时 因为长宽不一 需要按原始图片的宽高比例设置来填充下面的后两个参数 如原始图片 300 * 600 则转过来时需要保持宽比高短 如下面的180 * 360
    tmpCtx.drawImage(filePath, 0, 0, 180, 360)
    tmpCtx.draw(false)
    // 这里是确保能draw完再保存
    setTimeout(() => {
      this.uploadCanvasImg('tmp_board', 1)
    }, 1000)
  },

  //上传
  uploadCanvasImg: function (canvasId, quality) {
    let token = app.globalData.token
    if (token == undefined || token == '') {
      token = wx.getStorageSync('token')
    }
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      fileType: 'jpg',
      destWidth: '120',
      destHeight: '52',
      quality: quality, //图片质量
      success: (res) => {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
        if (this.data.options.btnId == 'jyyqz') {
          prevPage.setData({
            jyyqzImgUrl: res.tempFilePath
          })
          wx.hideToast();
          wx.navigateBack();
        } else if ((this.data.options.btnId == 'bhgqz')) {
          prevPage.setData({
            bhgqzImgUrl: res.tempFilePath
          })
          wx.hideToast();
          wx.navigateBack();
        } else {
          wx.hideToast();
          wx.showToast({
            title: '签名上传失败',
            icon: 'error'
          })
        }


        /*wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: (res) => {
            wx.showToast({
              title: '已保存到相册',
              duration: 2000
            })
          },
          fail: (res) => {
            wx.showToast({
                title: '失败',
                duration: 2000
              }),
              console.log(res);
          }
        })*/
        // 可做上传操作
      }
    })
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
    this.cleardraw()
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