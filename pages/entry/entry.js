// pages/entry/entry.js
import pinyin from "wl-pinyin";
import isEmpty from "../../dist/timeline/helpers/isEmpty";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: [{
        headline: "板卡进货检验记录表",
        dataList: [{
            title: "AD转换板检验记录表",
            className: ["产品外观", "电气性能", "其他"],
            "产品外观": [{
              item: "崭新，元器件排列整齐",
              id: 0
            }, {
              item: "焊点饱满无漏焊虚焊",
              id: 1
            }],
            "电气性能": [{
              item: "16路模拟信号通道0~10V正常",
              id: 0
            }, {
              item: "16路模拟信号通道0~-10V正常",
              id: 1
            }, {
              item: "示值漂移10秒内≤1mV",
              id: 2
            }, {
              item: "相邻两通道互补干扰相邻两通道互补干扰相邻两通道互补干扰相邻两通道互补干扰相邻两通道互补干扰相邻两通道互补干扰",
              id: 3
            }],
            "其他": [{
              item: "配备减震塑料包装袋",
              id: 0
            }, {
              item: "配备纸质包装盒",
              id: 1
            }]
          },
          {
            title: "ADDA转换板进货检验记录表",
            className: ["产品外观", "电气性能", "其他"],
            "产品外观": [{
              item: "崭新，元器件排列整齐",
              id: 0
            }, {
              item: "焊点饱满无漏焊虚焊",
              id: 1
            }, {
              item: "配备跳线器",
              id: 2
            }],
            "电气性能": [{
              item: "零点不能为负值",
              id: 0
            }, {
              item: "示值误差≤50mV",
              id: 1
            }, {
              item: "示值漂移10秒内≤1mV",
              id: 2
            }],
            "其他": [{
              item: "配备减震塑料包装袋",
              id: 0
            }, {
              item: "配备纸质包装盒",
              id: 1
            }]
          },
          {
            title: "ADDA转换板进货检验记录表",
            className: ["产品外观", "电气性能", "其他"],
            "产品外观": [{
              item: "崭新，元器件排列整齐",
              id: 0
            }, {
              item: "焊点饱满无漏焊虚焊",
              id: 0
            }, {
              item: "配备跳线器",
              id: 0
            }],
            "电气性能": [{
              item: "零点不能为负值",
              id: 0
            }, {
              item: "示值误差≤50mV",
              id: 1
            }, {
              item: "示值漂移10秒内≤1mV",
              id: 2
            }],
            "其他": [{
              item: "配备减震塑料包装袋",
              id: 0
            }, {
              item: "配备纸质包装盒",
              id: 1
            }]
          }, {
            title: "电压转换板进货检验记录表",
          }, {
            title: "侧滑仪表主控板检验记录表",
          }, {
            title: "速度仪表主控板检验记录表",
          }, {
            title: "称重制动仪表显示板检验记录表",
          }, {
            title: "重柴三通道扭力采集板进货检验记录表",
          }, {
            title: "科目三车载采集板Ⅲ进货检验记录表",
          }, {
            title: "称重制动仪表显示板检验记录表",
          }, {
            title: "重柴三通道扭力采集板进货检验记录表",
          }, {
            title: "科目三车载采集板Ⅲ进货检验记录表",
          }
        ]
      },
      {
        headline: "机械设备装配质量跟踪单",
        dataList: [{
          title: "汽车侧滑检验台",
          className: ["装配台架", "布线调试", "技术要求"],
          "装配台架": [{
            id: 0,
            item: "测试板和放松板无拉簧抻拉时，可任意位置停留，滑动自如，无阻滞、不平、曲翘等现象。"
          }, {
            id: 1,
            item: "回位拨叉轴及同步杠杆轴与轴承间过渡配合。回位拨叉与同步杠杆平行。"
          }, {
            id: 2,
            item: "联动机构装配后，应活动自如，导向轴承配合适中，无阻滞现象。"
          }, {
            id: 3,
            item: "外框架与滑板（或放松板）承载面间距：前、后5mm±0.5mm；左、右15mm±0.5mm；高度差为±2mm。"
          }, {
            id: 4,
            item: "左右滑板承载面：左右面高度差±1.5mm；前后窜动量0.1mm。"
          }, {
            id: 5,
            item: "滑板与放松板：高度差不超过1mm；间隙差不大于1.5mm。"
          }],
          "布线调试": [{
            id: 0,
            item: "台架各部件配合尺寸符合图纸要求。"
          }, {
            id: 1,
            item: "台架拆散，对应标记明确，且无碍于外表面的美观。送喷漆房。"
          }, {
            id: 2,
            item: "检查喷漆除锈后的漆面，螺丝、螺杆和镀件等不得污染上油漆。漆面无锈斑及油污，无明显突出颗粒，应平整、光滑、颜色均匀、光泽一致，不允许出现流挂、起泡、剥落、皱纹及划伤等缺陷。"
          }, {
            id: 3,
            item: "重新组装拆散喷漆后的台架。验证是否符合装配台架的各项要求。"
          }, {
            id: 4,
            item: "按图纸要求接线，线缆固定牢靠。端子排的所有螺丝拧紧固定。外露线缆用绕线管缠绕保护。"
          }, {
            id: 5,
            item: "有保护接地端子,并有清晰的接地标志。"
          }],
          "技术要求": [{
            id: 0,
            item: "调整位移传感器零位状态信号输出电压为0V±20mV。"
          }, {
            id: 1,
            item: "向内或向外轻推滑板从零位移至0.2mm再松开，回零误差不超过±0.03mm；从零位移至5mm以上再松开，回零误差不超过±0.05mm。"
          }, {
            id: 2,
            item: "左、右滑板位移同步性不超过0.05mm。"
          }, {
            id: 3,
            item: "滑板从零位移至0.1mm作用力不超过50N,从零位移至5mm作用力不超过100N。"
          }, {
            id: 4,
            item: "盖上盖板之后检查滑板行程：左、右各12mm～12.5mm。"
          }]
        }]
      }, {
        headline: "2018年电气类成品检验规范及检验记录汇编",
        dataList: [{
          title: "称重制动仪表",
          className: ["外观", "电气"],
          "外观": [{
            id: 0,
            item: "壳体整洁，无划伤、磕碰、锈迹、污物，门开关自如。壳内无遗留杂物。"
          }, {
            id: 1,
            item: "壳内支架方位规矩，大小尺寸合理，无偏斜现象。"
          }, {
            id: 2,
            item: "各电子器件按图纸要求布局，合理协调，放置横平竖直。固定各器件的螺丝大小选用合适，规格统一，螺丝固定牢固。"
          }, {
            id: 3,
            item: "线槽固定居中整齐，线槽盖锯口平齐，交接处无明显缝隙。"
          }],
          "电气": [{
            id: 0,
            item: "测量接线排上有线性电源上的电压（+15V,-15V,+5V）和开关电源上的电压（+5V,+12V），测量串口通讯线，传感器信号线的通断。"
          }, {
            id: 1,
            item: "零漂检验：观察各路信号的跳动情况。称重制动每小时零点漂不得超过1kg或1daN，加载后，观察信号跳动情况，使用9v电池作为信号输入，观察显示数据的稳定性，不能有忽大忽小现象。"
          }, {
            id: 2,
            item: "标定检验：按住标定键同时打开电源开关进入标定界面，使用9v电池作为信号输入，对称重和制动进行标定，测试增大减小键是否能加减数值，按标定确认键确认标定完成，按退出标定键退出标定界面。（标定时左边增大右边减小，退出后加力时应有相应的变化。）"
          }]
        }]
      }
    ],
    current_scroll: '0',
    scrollTop: 1,
    forms: []
  },

  //最近页面滚动执行方式 (pc端预览无效)
  latestScroll(event) {
    this.setData({
      scrollTop: event.detail.scrollTop + 40
    })
  },

  handleChangeScroll(res) { //选项卡,swiper位置改变事件
    this.setData({
      current_scroll: isNaN(res.detail.current) ? res.detail.key : isEmpty(res.detail.source) ? this.data.current_scroll : res.detail.current
    });
  },
  stopTouchMove: function () {
    return false;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // getApp().imgUpload(); //开启照片上传监听
    let result = await getApp().request({
      UserGH: getApp().globalData.UserGH
    }, 'Query', '20S02');
    let tabs = ['最近'];
    result.body.UserGrant.forEach(e => { //主分类项去重
      tabs.indexOf(e.Bcontent.substring(0, e.Bcontent.length - 2)) == -1 && tabs.push(e.Bcontent.substring(0, e.Bcontent.length - 2))
    })
    this.setData({
      tabs
    });
    let info = []; //次分类项去重
    for (let i = 0; i < result.body.UserGrant.length; i++) {
      let index = info.findIndex(e =>
        e[0].Bid == result.body.UserGrant[i].Bid
      )
      index == -1 ? info.push([result.body.UserGrant[i]]) : info[index].push(result.body.UserGrant[i]);
    }

    let formList = new Array(tabs.length - 1); //插入首字母索引
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    for (let i = 0; i < formList.length; i++) {
      formList[i] = [];
      words.forEach(item => {
        formList[i].push({
          key: item,
          list: []
        })
      });
    }
    info.forEach((e, sub) => { //分类列表首字母排列
      e.forEach(element => {
        let FirstLetter = pinyin.getFirstLetter(element.Ccontent).charAt(0).toUpperCase();
        let index = words.indexOf(FirstLetter);
        formList[sub][index].list.push({
          key: FirstLetter,
          Bid: element.Bid,
          Bcontent: element.Bcontent,
          Cid: element.Cid,
          Ccontent: element.Ccontent,
        });
      })
    });
    for (let i = 0; i < formList.length; i++) { //删除索引列空项目
      let index = formList[i].length;
      while (index--) {
        formList[i][index].list.length == 0 ? formList[i].splice(index, 1) : ''
      }
    }
    this.setData({
      formList
    })
  },

  async chooseItem(event) { //选择指定项目
    let _this = this;
    let id = event.currentTarget.id.split(',');
    if (id[0] != '5' && id[0] != '8') {
      wx.navigateTo({
        url: '/pages/formTables/jxsbTab/jxsbTab?Bid=' + id[0] + '&Cid=' + id[1] + "&Ccontent=" + id[2]
      });
      return
    }
    wx.showModal({
      title: '请输入要录入的设备编号',
      editable: true,
      async success(res) {
        console.log(res);
        if (res.confirm) {
          await getApp().request({
            Cid: id[1],
            RecordNo: res.content,
            SelType: 0
          }, 'Query', '20S03').then(result => {
            if (result.head.code == '1') {
              _this.setData({
                result
              })
              switch (id[0]) {
                case '9':
                  wx.navigateTo({
                    url: '/pages/formTables/bkjhTab/bkjhTab?Bid=' + id[0] + '&Cid=' + id[1] + "&Ccontent=" + id[2] + "&RecordNo=" + res.content
                  })
                  break;
                case '8':
                  wx.navigateTo({
                    url: '/pages/formTables/jxsbTab/jxsbTab?Bid=' + id[0] + '&Cid=' + id[1] + "&Ccontent=" + id[2] + "&RecordNo=" + res.content
                  })
                  break;
                case '5':
                  wx.navigateTo({
                    url: '/pages/formTables/jxsbTab/jxsbTab?Bid=' + id[0] + '&Cid=' + id[1] + "&Ccontent=" + id[2] + "&RecordNo=" + res.content
                  })
                  break;
                default:
                  break;
              }

            } else {
              wx.showToast({
                title: result.head.message,
                duration: 2300,
                icon: 'error',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onTabClick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },











  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: async function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    wx.getStorage({
      key: 'lately',
      success(res) {
        let lately = []
        res.data.forEach(e => {
          let index = lately.findIndex(value => value.Date == e.Date);
          let time = new Date(e.Date.replace(/日/, '').replace(/[\u4e00-\u9fa5]/g, '\/'));
          if (time.toLocaleDateString() == new Date().toLocaleDateString()) time = "今天"
          else if (time.getFullYear() == new Date().getFullYear() && time.getMonth() == new Date().getMonth() && new Date().getDate() - time.getDate() == 1) time = "昨天"
          else if (time.getFullYear() == new Date().getFullYear() && time.getMonth() == new Date().getMonth() && new Date().getDate() - time.getDate() == 2) time = "前天"
          else time = e.Date.slice(5)
          index == -1 ? lately.push({
            Date: e.Date,
            time: time,
            items: [e]
          }) : lately[index].items.push(e)
        })
        _this.setData({
          lately
        })
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