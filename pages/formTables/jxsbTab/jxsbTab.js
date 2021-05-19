const app = getApp();
import pinyin from "wl-pinyin";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLeft1: false,
    islongpress: {},
    textareaValue: {},
    inputValue: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let presets = { //绑定默认选项
      jyyj: (await getApp().request({
        ID: 11
      }, 'Query', '20S04')).body.ItemCls.Content.split(','),
      ghdw: (await getApp().request({
        ID: 12
      }, 'Query', '20S04')).body.ItemCls.Content.split(','),
      cgy: (await getApp().request({
        ID: 13
      }, 'Query', '20S04')).body.ItemCls.Content.split(','),
      jyyQz: (await getApp().request({
        ID: 14
      }, 'Query', '20S04')).body.ItemCls.Content.split(','),
    }
    presets.bhgQz = presets.jyyQz;
    let result = getCurrentPages()[getCurrentPages().length - 2].data.result;
    console.log(result);

    let list = [];
    let jbxxIndex, jyxmIndex = [],
      jgIndex = []; //记录基本信息,检验项目,检验结果数据位置
    for (let i = 0; i < result.body.InspItem.length; i++) { //数据项拆分
      let thisDcontent = result.body.InspItem[i].Dcontent;
      if (thisDcontent.includes('基本信息')) jbxxIndex = i;
      else if (thisDcontent.includes('描述') || thisDcontent.includes('结果') || thisDcontent.includes('方法') || thisDcontent.includes('结论') || thisDcontent.includes('意见')) jgIndex.push(i)
      else jyxmIndex.push(i)

      let listID = result.body.InspItem[i].ID.slice(0, -1).split('|');
      let listItem = result.body.InspItem[i].RecordItem.slice(0, -1).split('|');
      let listEvl, listImg;
      if (options.isQuery) {
        listEvl = result.body.InspItem[i].RecordEvl.slice(0, -1).split('|');
        listImg = result.body.InspItem[i].RecordImg.replace(/\\/g, "\/").slice(0, -1).split('|');
      }
      list.push([]);

      listID.forEach((e, index) => {
        if (options.isQuery) list[i].push({
          ID: e,
          Item: listItem[index].trim(),
          Evl: listEvl[index],
          ImgUrl: listImg[index].slice(0, -1).split(';').filter(e => e != ''),
          RecordEvl: listEvl[index] == '不合格'
        })
        else list[i].push({
          ID: e,
          Item: listItem[index].trim()
        })
        if (jgIndex.includes(i)) {
          if (list[i][index].Item.includes('签字')) {
            list[i][index].isQZ = true;
            list[i][index].pickerID = pinyin.getFirstLetter(list[i][index].Item).replace(/\：/g, '');
            presets[pinyin.getFirstLetter(list[i][index].Item).replace(/\：/g, '')] = presets.jyyQz;
          }
          if (list[i][index].Item.includes('日期')) {
            list[i][index].isDate = true;
          }
        }
      });
    }
    if (jbxxIndex != undefined) list[jbxxIndex];
    let evlDate = list[jbxxIndex].find(e => e.Item == '检验日期' || e.Item == '日期');
    let isDisabled = evlDate != undefined && evlDate.hasOwnProperty('Evl') && new Date().getTime() - new Date(evlDate.Evl).getTime() > 2 * 24 * 3600000;
    this.setData({
      jbxxIndex,
      jyxmIndex,
      jgIndex,
      options,
      initData: result.body.InspItem,
      presets,
      list,
      isDisabled
    });
  },

  bhgpz(res) { //其他项上传照片
    if (this.data.isDisabled) {
      wx.showToast({
        title: '超过可修改时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let qtIndex = this.data.initData.findIndex(e => e.Dcontent == '其他')
    if (qtIndex == -1) return
    let id = res.target.id.split(",");
    let tempData = 'list[' + qtIndex + '][' + id[0] + ']';
    if (!this.data.list[qtIndex][id[0]].hasOwnProperty('ImgUrl')) this.data.list[qtIndex][id[0]].ImgUrl = [];
    wx.chooseImage({
      count: 9 - this.data.list[qtIndex][id[0]].ImgUrl.length, //照片上传张数
      sizeType: 'compressed',
      success: (res) => {
        res.tempFilePaths.forEach(item => {
          this.data.list[qtIndex][id[0]].ImgUrl.push(item);
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
  bindValueChange: function (e) { //下拉框绑定

    if (this.data.isDisabled) {
      wx.showToast({
        title: '超过可修改时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    if (e.type == 'longpress') {
      wx.vibrateShort({
        type: 'medium'
      });
      this.setData({
        ['islongpress.' + e.currentTarget.id]: this.data.islongpress.hasOwnProperty(e.currentTarget.id) ? !this.data.islongpress[e.currentTarget.id] : true
      })
    } else if (e.currentTarget.dataset.type == 'QZ') {
      this.setData({
        ['inputValue.' + e.currentTarget.dataset.id]: this.data.presets[e.currentTarget.id][e.detail.value]

      })
    } else if (e.currentTarget.dataset.type == 'date') this.setData({
      ['inputValue.' + e.currentTarget.dataset.id]: e.detail.value
    })
    else this.setData({
      ['inputValue.' + e.currentTarget.dataset.id]: this.data.presets[e.currentTarget.id][e.detail.value]
    })
  },

  qtListAdd() { //增加其他要判断的项目
    if (this.data.isDisabled) {
      wx.showToast({
        title: '超过可修改时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let qtIndex = this.data.initData.findIndex(e => e.Dcontent == '其他')
    let index = this.data.list[qtIndex].findIndex(e => e.Item.trim() == "");
    if (index == -1) return;
    this.data.list[qtIndex][index].isAdd = true;
    this.setData({
      ['list[' + qtIndex + '][' + index + ']']: this.data.list[qtIndex][index]
    })
  },
  input_qt(res) { //其他选项数据回调
    let qtIndex = this.data.initData.findIndex(e => e.Dcontent == '其他')
    this.setData({
      ['list[' + qtIndex + '][' + res.currentTarget.id + '].Item']: res.detail.value
    })
  },
  bindPreview(res) { //其他照片预览开关
    this.setData({
      bindID: {
        index: res.currentTarget.id.split(",")[0],
        ID: res.currentTarget.id.split(",")[1]
      }
    });
    let qtIndex = this.data.initData.findIndex(e => e.Dcontent == '其他')
    let previewArray;
    if (res.type == "tap") {
      previewArray = this.data.list[qtIndex][this.data.bindID.index].hasOwnProperty('ImgUrl') ? this.data.list[qtIndex][this.data.bindID.index].ImgUrl : []
    };
    this.setData({
      showLeft1: !this.data.showLeft1,
      previewArray: previewArray,
      showIco: false
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
    let qtIndex = this.data.initData.findIndex(e => e.Dcontent == '其他')
    wx.chooseImage({ //绑定剩余可上传照片数
      count: res.currentTarget.id,
      success: (res) => {
        if (!this.data.list[qtIndex][this.data.bindID.index].hasOwnProperty('ImgUrl')) {
          this.setData({
            ['list[' + qtIndex + '][' + this.data.bindID.index + '].ImgUrl']: [],
          })
        }
        res.tempFilePaths.forEach(item => {
          this.data.list[qtIndex][this.data.bindID.index].ImgUrl.push(item);
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
          previewArray: this.data.list[qtIndex][this.data.bindID.index].ImgUrl
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
    let qtIndex = this.data.initData.findIndex(e => e.Dcontent == '其他')
    let temp = this.data.list[qtIndex][this.data.bindID.index].ImgUrl[res.currentTarget.id] //寻找本地图片路径
    let globalImgList = getApp().globalData.imgList;
    let index = globalImgList.findIndex(item => item.RecordImg == temp); //寻找上传队列的此项照片
    console.log(index);
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
              if (res.head.status == '1') {
                globalImgList.splice(index, 1);
                getApp().globalData.imgList = globalImgList;
                _this.data.list[qtIndex][_this.data.bindID.index].ImgUrl.splice(_res.currentTarget.id, 1);
                _this.setData({
                  previewArray: _this.data.list[qtIndex][_this.data.bindID.index].ImgUrl
                })

              }
            });

          }
        }
      })
    } else {
      if (this.data.isDisabled) {
        wx.showToast({
          title: '超过可修改时间',
          icon: 'error',
          duration: 2000
        })
        return
      }
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
                if (res.head.status == '1') {
                  _this.data.list[qtIndex][_this.data.bindID.index].ImgUrl.splice(res.currentTarget.id, 1);
                  _this.setData({
                    previewArray: _this.data.list[qtIndex][_this.data.bindID.index].ImgUrl
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
  tapEvent(res) { //单张照片预览
    wx.previewImage({
      urls: this.data.previewArray,
      current: this.data.previewArray[res.currentTarget.id]
    })
  },
  delete_qt: function (res) { //其他选项数据删除
    if (this.data.isDisabled) {
      wx.showToast({
        title: '超过可修改时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let id = res.currentTarget.id;
    let _this = this;
    wx.showModal({
      cancelColor: '#393D49',
      confirmColor: "#5FB878",
      content: '是否删除',
      async success(res) {
        if (res.confirm) {
          let result = await getApp().request({
            ID: _this.data.list[qtIndex].splice(id, 1)[0].ID
          }, 'Write', '20R05');
          _this.setData({
            ['list[' + qtIndex + ']']: _this.data.list[qtIndex]
          })
          wx.showToast({
            title: result.head.message,
            icon: 'none'
          })
        }
      }
    })
  },
  qtClick(event) { //点击展开其他列表
    this.setData({
      qtClickBtn: this.data.qtClickBtn ? false : true
    })
  },
  bindTextarea(e) {
    this.data.textareaValue[e.currentTarget.id] = e.detail.value
  },
  fromSubmit: async function (e) { //提交数据
    console.log(e);
    if (this.data.isDisabled) {
      wx.showToast({
        title: '超过可修改时间',
        icon: 'error',
        duration: 2000
      })
      return
    }
    let RecordItem;
    let formData = [];
    for (const key in this.data.textareaValue) {
      if (this.data.textareaValue.hasOwnProperty(key)) {
        e.detail.value[key] = this.data.textareaValue[key];
      }
    }

    for (let i = 0; i < this.data.list.length; i++) {
      if (this.data.jyxmIndex.includes(i)) continue;
      this.data.list[i].forEach(item => {
        let RecordEvl = this.data.initData[i].Dcontent != '其他' ? e.detail.value[item.ID] : item.RecordEvl ? '不合格' : '合格';
        if (RecordEvl == '') RecordItem = item.Item

        formData.push({
          InspRecord: {
            ID: item.ID,
            UserGH: getApp().globalData.UserGH,
            RecordItem: item.Item,
            RecordEvl: RecordEvl
          }
        })
      })
    }
    if (RecordItem) {
      wx.showToast({
        title: RecordItem + '不能为空',
        icon: 'none'
      })
      return
    }
    this.selectAllComponents("#CheckItem").forEach(e => {
      e.data.itemList.forEach(item => {
        formData.push({
          InspRecord: {
            ID: item.ID,
            UserGH: getApp().globalData.UserGH,
            RecordItem: item.Item,
            RecordEvl: item.RecordEvl ? '不合格' : '合格'
          }
        })
      })
    })
    console.log(formData);
    let result = await getApp().request(formData, 'Write', '20R01');
    if (result.head.status == '1') {
      wx.navigateBack();
      this.setData({
        fromState: true
      })
    }
    wx.showToast({
      title: result.head.message,
      duration: 3000,
      icon: 'none'
    })
    getApp().setStorage(this.data.options);

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
    
    if (this.data.fromState || this.data.isDisabled) return
    wx.showToast({
      title: '表单尚未保存',
      icon: 'error',
      duration: 3000
    })
    if (this.data.options.isQuery) return
    getApp().request({
      RecordNo: this.data.initData[0].RecordNo
    }, 'Write', '20R03');
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