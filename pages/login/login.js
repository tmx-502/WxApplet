// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

  },
  handleInput(event) {
    this.setData({
      [event.currentTarget.id]: event.detail.value
    })
  },
  async login() {
    let {
      phone,
      password
    } = this.data;
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    } else if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
    } else {
      let result = await request('/login/cellphone', {
        phone,
        password
      })
      console.log(result);
    }

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