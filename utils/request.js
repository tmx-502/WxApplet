import config from '../utils/config'
export default (URL, data = {}, method = 'Get') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: (result) => {
        resolve(result.data);
      },
      fail: (res) => {
        reject(res.errMsg)
      }
    })
  })
}