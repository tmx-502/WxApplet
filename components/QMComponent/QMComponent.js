Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemName: {
      type: String
    },
    itemId: {
      type: String
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    QMImgUrl: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    qzClick(res) { //点击签字
      wx.navigateTo({
        url: '/pages/dzqm/dzqm?btnId=' + res.target.id,
      });
    },
    imgShow(res) {
      this.setData({
        QMImgUrl: res[this.data.itemId] ? res[this.data.itemId].url : ''
      })
    },
    previewImg(res) { //签字照片预览(目前真机无法预览wxfile地址图片)
      console.log(res.target.id.replace('wxfile', 'http'))
      res.target.id ? wx.previewMedia({
        sources: [{
          url: res.target.id.replace('wxfile', 'http')
        }]
      }) : '';
    },
  }
})