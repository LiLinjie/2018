import { showModal } from '../utils';
const baseURL = process.env.API_BASE_URL;
import store from '../store/store';

export function request (url, data, method = 'GET', header) {
  return new Promise((resolve, reject) => {
    if (url.indexOf('//') === -1) {
      url = baseURL + url;
    }
    header = Object.assign({}, header);

    let xcxToken = wx.getStorageSync('xcxToken') || '1';
    header['XCXSessionId'] = xcxToken;

    wx.request({
      url,
      data,
      method,
      header,
      async success (res) {
        if (res.statusCode !== 200) {
          let msg = res.errMsg;
          if (msg === 'request:ok') {
            msg = JSON.stringify(res.data);
          }
          msg = `[${res.statusCode}] ${msg}`;
          showModal({
            content: '您当前的网络环境好像有点问题，请检查后重试~'
          });
          reject(res);
        } else {
          if (res.data) {
            if (res.data.status === 401) {
              // 未授权
              const res = await store.dispatch('login');
              if (res && res.status === 1) {
                return await request(url, data, method, header);
              }
              return;
            }
            if (!url.includes('gw-api.pinduoduo.com') && res.data.status !== 1) {
              showModal({
                title: '系统提示',
                content: res.data.msg || ''
              });
              return;
            }
            resolve(res.data);
          } else {
            reject(res);
          }
        }
      },
      fail (ret) {
        reject(ret);
      }
    })
  })
}

function login () {

}
