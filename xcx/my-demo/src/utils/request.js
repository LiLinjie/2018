const baseURL = process.env.API_BASE_URL

export function request (url, data, method = 'GET', header) {
  return new Promise((resolve, reject) => {
    if (url.indexOf('//') === -1) {
      url = baseURL + url
    }
    header = Object.assign({}, header)

    console.log('reqUrl:', url, 'reqData:', data);
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
