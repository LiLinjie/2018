import globalStore from '../stores/global-store'
import { getCurrentPageUrlWithArgs } from './index'
const baseURL = process.env.API_BASE_URL

export function request (url, data, method = 'GET', header) {
  return new Promise((resolve, reject) => {
    if (url.indexOf('//') === -1) {
      url = baseURL + url
    }
    header = Object.assign({}, header)

    let xcxToken = wx.getStorageSync('xcxToken') || '1'
    header['XCXSessionId'] = xcxToken
    wx.request({
      url,
      data,
      method,
      header,
      async success (res) {
        if (res.statusCode !== 200) {
          let msg = res.errMsg
          if (msg === 'request:ok') {
            msg = JSON.stringify(res.data)
          }
          msg = `[${res.statusCode}] ${msg}`
          wx.showModal({
            title: '网络异常',
            content: '您当前的网络环境好像有点问题，请检查后重试~',
            showCancel: false,
            confirmColor: '#ff2551'
          })
          reject(res)
        } else {
          if (res.data) {
            if (res.data.status === 401) {
              // const pages = global.getCurrentPages()
              // const currentPage = pages[pages.length - 1]
              // console.log(currentPage)
              globalStore.dispatch('login');
              reject(res);
              return
            }
            if (!url.includes('gw-api.pinduoduo.com') && res.data.status !== 1) {
              wx.showModal({
                title: '系统提示',
                content: res.data.msg || '',
                showCancel: false,
                confirmColor: '#ff2551'
              });
              reject(res);
              return
            }

            // 设置xcxToken
            if (res.data.data && res.data.data.token) {
              wx.setStorageSync('xcxToken', res.data.data.token)
            }
            resolve(res.data)
          } else {
            reject(res)
          }
        }
      },
      fail (ret) {
        reject(ret)
      }
    })
  })
}
