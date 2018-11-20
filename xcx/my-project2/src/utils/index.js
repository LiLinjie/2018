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

/* 获取当前页url */
export function getCurrentPageUrl () {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage.route;
}

/* 获取当前页带参数的url */
export function getCurrentPageUrlWithArgs () {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const { route, options } = currentPage;
  // 拼接url的参数
  let urlWithArgs = route + '?';
  for (let key in options) {
    const value = options[key];
    urlWithArgs += key + '=' + value + '&';
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
  return urlWithArgs
}

export function getSetting (callback) {
  wx.getSetting({
    success: function(res) {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function(res) {
            console.log('用户已经授权过');
            !!callback && callback(res)
          }
        });
      } else {
        console.log('用户还未授权过');
        !!callback && callback(res)
      }
    }
  });
}

export function getQuery () {
  /* 获取当前路由栈数组 */
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;

  return options;
}

export function getPrice (_price, fixedCount = 2) {
  if ((_price + '').includes('.')) {
    return _price;
  }
  return (_price / 100).toFixed(fixedCount);
}

export default {
  formatNumber,
  formatTime,
  getCurrentPageUrl,
  getCurrentPageUrlWithArgs,
  getQuery,
  getPrice
}
