import wxAsync from './wxAsync';
import MD5 from './MD5';
import config from '../config';

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 获取当前页url
 */
export function getCurrentPageUrl() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage.route;
}

/**
 * 获取当前页带参数的url
 */
export function getCurrentPageUrlWithArgs () {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const { route, options } = currentPage;

  let urlWithArgs = route + '?';
  for (let key in options) {
    const value = options[key];
    urlWithArgs += key + '=' + value + '&';
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
  return urlWithArgs;
}

/**
 * 获取当前页所带参数
 * @returns {*}
 */
export function getQuery () {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage.options;
}

/**
 * 下载网络图片
 * @param url
 * @returns {Promise<void>}
 */
export async function downloadImg (url) {
  const imgRes = await wxAsync({
    api: 'getImageInfo',
    params: {
      src: url
    }
  });
  const res = await wxAsync({
    api: 'saveImageToPhotosAlbum',
    params: {
      filePath: imgRes.path
    }
  });
  return res;
}

/**
 * 版本号比较
 * @param v1
 * @param v2
 * @returns {number}
 */
export function compareVersion (v1, v2) {
  console.log(v1);
  console.log(v2);
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

/**
 * 加密
 * @param txt
 * @param secretChar
 * @returns {string}
 */
export function encryptTxt(txt, secretChar = '****') {
  if (!txt || typeof txt !== 'string') return '';
  const len = txt.length;
  if (len > 1) {
    const firstChar = txt.charAt(0);
    const lastChar = txt.charAt(len - 1);
    const splitStr = firstChar + secretChar + lastChar;
    return splitStr;
  }
  return txt;
}

/**
 * 价格转换
 * @param _price
 * @param fixedCount 保留小数位数
 * @returns {*}
 */
export function getPrice (_price, fixedCount = 2) {
  if ((_price + '').includes('.')) {
    return _price;
  }
  return (_price / 100).toFixed(fixedCount);
}

function e(e) {
  for (var t = Object.keys(e).sort(), n = {}, r = 0; r < t.length; r++) n[t[r]] = e[t[r]];
  return n;
}

export function getParams (t) {
  var i = {}, c = config.client_secret, s = {
    client_id: config.client_id,
    timestamp: Date.parse(new Date()) / 1e3
  }, a = e(i = Object.assign(s, t));
  for (var o in a) c += o, c += a[o];
  return c += config.client_secret, i.sign = MD5(c), i;
}

export function linkTo (url, type) {
  if (type === 'tabPage') {
    wx.switchTab({
      url
    });
  } else {
    wx.navigateTo({
      url
    });
  }
}

export default {
  formatNumber,
  formatTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  getQuery,
  downloadImg,
  compareVersion,
  encryptTxt,
  getPrice,
  linkTo
}
