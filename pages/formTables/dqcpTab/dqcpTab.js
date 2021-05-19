// pages/fromTables/dqcpTab/dqcpTab.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headline: '称重制动仪表(Ver 6.1)(全车型(Ver 6.1)、托车(Ver 6.1)检验记录',
    wgList: [{
      item: "壳体整洁，无划伤、磕碰、锈迹、污物，门开关自如。壳内无遗留杂物",
      id: 0
    }, {
      item: "壳内支架方位规矩，大小尺寸合理，无偏斜现象。",
      id: 1
    }, {
      item: "各电子器件按图纸要求布局，合理协调，放置横平竖直。固定各器件的螺丝大小选用合适，规格统一，螺丝固定牢固。",
      id: 2
    }, {
      item: "线槽固定居中整齐，线槽盖锯口平齐，交接处无明显缝隙。",
      id: 3
    }, {
      item: "各线缆、器件的规格型号符合图纸要求和材料单规定。",
      id: 4
    }, {
      item: "各种半成品线路板在安装前都应检查是否粘贴质检合格标签。使用粘贴质检合格标签的线路板。",
      id: 5
    }, {
      item: "接线均严格按图纸连接，整齐有序，线号方向一致。",
      id: 6
    }, {
      item: "U型头固定牢固且不偏斜。U型头接头中焊锡要镀透镀满，且无铜丝裸露。",
      id: 7
    }, {
      item: "配备塑封图纸，版本正确，图纸与实物相符、字迹清晰。",
      id: 8
    }],
    dqList: [{
      item: "测量接线排上有线性电源上的电压（+15V,-15V,+5V）和开关电源上的电压（+5V,+12V），测量串口通讯线，传感器信号线的通断。",
      id: 0
    }, {
      item: "零漂检验：观察各路信号的跳动情况。称重制动每小时零点漂不得超过1kg或1daN，加载后，观察信号跳动情况，使用9v电池作为信号输入，观察显示数据的稳定性，不能有忽大忽小现象。",
      id: 1
    }, {
      item: "标定检验：按住标定键同时打开电源开关进入标定界面，使用9v电池作为信号输入，对称重和制动进行标定，测试增大减小键是否能加减数值，按标定确认键确认标定完成，按退出标定键退出标定界面。（标定时左边增大右边减小，退出后加力时应有相应的变化。）",
      id: 2
    }, {
      item: "测试检验：打开电源开关，进入读秒查看软件版本为6-09。预热完毕测试单机状态下，按气缸举升键观察调试接的接触器对应的举升、下降动作吸合。外接传感器，模拟实际现场进行测试，查看测试数据是否已储存，按查询结果键查看测试结果。",
      id: 3
    }, {
      item: "参数设置检验：按住设置键同时打开电源开关进入参数设置界面，按设置键查看各显示板、指示灯及按钮工作是否正常，且设置正确有效。调试完毕后均需调回为出厂的默认值。",
      id: 4
    }, {
      item: "通讯检验：打开电脑上全车型称重制动调试软件，进行查询、复位、初始化、轴重、制动等项目联网测试并收取相关数据与曲线后再完成收尾工作，进行开出信号测试，举升、下降、左制电机、右制电机、前夹紧、后夹紧的动作可靠。",
      id: 5
    }, {
      item: "停机检验：用信号发生器(100Hz)模拟第三滚筒转速,在测试制动状态下，3-2-1采样后，断掉信号发生器的信号时，控制电机的继电器停机及时可靠。",
      id: 6
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindDateChange: function (e) { //检验日期绑定
    this.setData({
      date: e.detail.value
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
    if (this.data.QMImgUrl) {
      this.selectAllComponents("#QM").forEach(element => {
        element.imgShow(this.data.QMImgUrl);
      });
    }
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

  },


  //数据表事件
  show() {
    let duration = 500;
    this.setData({
      show: true,
      duration
    })
  },
  exit() {
    this.setData({
      show: false
    })
    // wx.navigateBack()
  },
  onEnter(res) {
    this.setData({
      fromHidden: true
    })
  },

  leave(res) {
    this.setData({
      fromHidden: false
    })
  }
})