export function imgParser (url, width, height, format = 'jpg', q = 90, mode = 0) {
  if (!url) {
    return;
  }

  // if (!~url.indexOf('img.alicdn.com')) return url; // 如果不是阿里cdn的图片，则不处理
  if (~url.indexOf('img.alicdn.com') || ~url.indexOf('gw.alicdn.com')) {
    if (url.match(/_(\d*)x(\d*).*\./)) return url; // 如果已经添加过规则的，则不处理
    //if (width === void 0 || height === void 0) return url; // 如果没有提供宽高属性也不处理
    let ret = `${url}_`;
    if (width !== void 0 && height !== void 0) {
      ret += `${width}x${height}`;
    }
    ret += `q${q}.${format}`;
    return ret;
  } else if (~url.indexOf('img-prod.kkkd.com') || ~url.indexOf('xaya.qiniudn.com')) {
    let targetUrl;
    let thumbnail = '';
    let gravityCrop = '';
    let q = '';
    // 如果有设置宽高则取缩略图
    if (width || height) {
      thumbnail = `/thumbnail/${width}x${height}`;
    }
    // 如果宽高都有设置，则截取
    if (width && height && mode === 1) {
      gravityCrop = `/gravity/Center/crop/${width}x${height}`;
    }

    if (q) {
      q = `/quality/${q}`;
    } else {
      let qValue;
      qValue = {
        '2g': 50,
        '3g': 60,
        '4g': 80,
        'wifi': 90
      }[window.support.networkType] || 90;
      q = `/quality/${qValue}`;
    }

    targetUrl = `${url}?imageMogr2/auto-orient/strip${gravityCrop}${thumbnail}${q}/interlace/1`;
    return targetUrl;
  } else {
    return url;
  }
}
