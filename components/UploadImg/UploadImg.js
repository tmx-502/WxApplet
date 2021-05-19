// components/UploadImg/UploadImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showIcon: false,
    showView: true,
    detached: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadImg() {
      this.setData({
        ImgList: getApp().globalData.imgList
      })
      if (this.data.ImgList.length != 0) {
        this.setData({
          showIcon: true
        })
      }
      setTimeout(() => {
        (!this.data.detached) && this.uploadImg();
      }, 1500);
    },
    showView() {
      this.setData({
        showView: !this.data.showView
      })
    },
    tapEvent(res) {
      console.log(this.data.ImgList);
      wx.previewImage({
        urls: [this.data.ImgList[res.currentTarget.id].RecordImg],
      })
    },
  },
  lifetimes: {
    created: function () {
      this.uploadImg();
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      this.setData({
        detached: true
      })
    },
  },

})