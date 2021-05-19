// components/CheckItem/CheckItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemName: {
      type: String
    },
    itemList: {
      type: Array
    },
    sfQM: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [],
    showLeft1: false,
    previewArray: [], //预览图片路径
  },

  /**
   * 组件的方法列表
   */
  methods: {

    Click() { //点击展开项目列表
      this.setData({
        isDisabled: getCurrentPages()[getCurrentPages().length - 1].data.isDisabled,
        ClickBtn: this.data.ClickBtn ? false : true
      })
    },
    bhgpz(res) { //点击合格/不合格事件
      if (this.data.isDisabled) {
        wx.showToast({
          title: '超过可修改时间',
          icon: 'error',
          duration: 2000
        })
        return
      }
      let id = res.target.id.split(",");
      let tempData = 'itemList[' + id[0] + ']';
      if (!this.data.itemList[id[0]].hasOwnProperty('ImgUrl')) this.data.itemList[id[0]].ImgUrl = [];
      wx.chooseImage({
        count: 9 - this.data.itemList[id[0]].ImgUrl.length, //照片上传张数
        sizeType: 'compressed',
        success: (res) => {
          res.tempFilePaths.forEach(item => {
            this.data.itemList[id[0]].ImgUrl.push(item);
            let imgList = getApp().globalData.imgList;
            imgList.push({
              ID: id[2],
              RecordImg: item
            });
            getApp().watch("imgList", (res) => {
              this.setData({
                imgList: res
              })
            }, this);
            getApp().globalData.imgList = imgList;
          })
        },
        fail: (res) => {
          if (res.errMsg != "chooseImage:fail cancel") {
            wx.showToast({
              title: '上传失败',
              icon: 'error'
            })
          }
        },
        complete: () => {
          this.setData({
            [tempData + ".RecordEvl"]: id[1] == 'N'
          })
        }
      })
    },
    imgShow(res) { //父页面调用签名照
      this.selectComponent('#QM') ? this.selectComponent('#QM').imgShow(res) : ''
    },
    bindPreview(res) { //照片预览开关
      this.setData({
        bindID: {
          index: res.currentTarget.id.split(",")[0],
          ID: res.currentTarget.id.split(",")[1]
        }
      });
      let previewArray;
      if (res.type == "tap") {
        previewArray = this.data.itemList[this.data.bindID.index].ImgUrl ? this.data.itemList[this.data.bindID.index].ImgUrl : []
      };
      this.setData({
        showLeft1: !this.data.showLeft1,
        previewArray: previewArray
      });
    },
    addImg(res) {
      if (this.data.isDisabled) {
        wx.showToast({
          title: '超过可修改时间',
          icon: 'error',
          duration: 2000
        })
        return
      }
      wx.chooseImage({
        count: res.currentTarget.id, //绑定剩余可上传照片数
        success: (res) => {
          if (!this.data.itemList[this.data.bindID.index].hasOwnProperty('ImgUrl')) {
            this.setData({
              ['itemList[' + this.data.bindID.index + '].ImgUrl']: [],
            })
          }
          res.tempFilePaths.forEach(item => {
            this.data.itemList[this.data.bindID.index].ImgUrl.push(item);
            let globalImgList = getApp().globalData.imgList;
            globalImgList.push({
              ID: this.data.bindID.ID,
              RecordImg: item
            });
            getApp().watch("imgList", (res) => {
              this.setData({
                imgList: res
              })
            }, this);
            getApp().globalData.imgList = globalImgList;
          })
          this.setData({
            previewArray: this.data.itemList[this.data.bindID.index].ImgUrl
          })
        }
      })
    },
    showIco() {
      this.setData({
        showIco: !this.data.showIco,
      })
      wx.vibrateShort({
        type: 'medium'
      });
    },
    deleteImg(res) { //删除照片

      if (this.data.isDisabled) {
        wx.showToast({
          title: '超过可修改时间',
          icon: 'error',
          duration: 2000
        })
        return
      }
      let _this = this;
      let _res = res;
      let temp = this.data.itemList[this.data.bindID.index].ImgUrl[res.currentTarget.id] //寻找本地图片路径
      let globalImgList = getApp().globalData.imgList;
      let index = globalImgList.findIndex(item => item.RecordImg == temp); //寻找上传队列的此项照片
      if (index != -1 && globalImgList[index].Status == "1") {
        wx.showModal({
          cancelColor: '#393D49',
          confirmColor: "#5FB878",
          content: '此照片已上传服务器,是否删除',
          success(res) {
            if (res.confirm) {
              getApp().request({
                ID: globalImgList[index].ID,
                RecordImg: globalImgList[index].ImgPath
              }, 'Write', '20R04').then(res => {
                wx.showToast({
                  title: res.head.message,
                  icon: 'none'
                })
                console.log(res);
                console.log(globalImgList);
                if (res.head.status == '1') {
                  globalImgList.splice(index, 1);
                  getApp().globalData.imgList = globalImgList;
                  _this.data.itemList[_this.data.bindID.index].ImgUrl.splice(_res.currentTarget.id, 1);
                  _this.setData({
                    previewArray: _this.data.itemList[_this.data.bindID.index].ImgUrl
                  })
                }
              });

            }
          }
        })
      } else {
        if (!temp.includes("tmp")) {
          wx.showModal({
            cancelColor: '#393D49',
            confirmColor: "#5FB878",
            content: '此照片已上传服务器,是否删除',
            success(res) {
              if (res.confirm) {
                getApp().request({
                  ID: _this.data.bindID.ID,
                  RecordImg: temp
                }, 'Write', '20R04').then(res => {
                  wx.showToast({
                    title: res.head.message,
                    icon: 'none'
                  })
                  console.log(res);
                  if (res.head.status == '1') {
                    _this.data.itemList[this.data.bindID.index].ImgUrl.splice(res.currentTarget.id, 1);
                    _this.setData({
                      previewArray: _this.data.itemList[_this.data.bindID.index].ImgUrl
                    })
                  }
                })
              }
            }
          })
        } else {
          globalImgList.splice(index, 1);
          getApp().globalData.imgList = globalImgList;
        }

      }


      console.log(this.data.previewArray);
    },
    tapEvent(res) { //照片预览
      console.log(res);
      wx.previewImage({
        urls: this.data.previewArray,
        current: this.data.previewArray[res.currentTarget.id]
      })
    },
  },

})