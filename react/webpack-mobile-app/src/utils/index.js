import queryString from 'query-string';

export function getQuery (location) {
  return queryString.parse(location.search);
}

export function getShowPrice (price, toFixed = 2) {
  const _price = ((price / 100) + '').indexOf('.') > -1 ? (price / 100).toFixed(toFixed) : (price / 100);
  return _price || 0;
}

export function encryptTxt(txt, secretChar = '****') {
  if (!txt || typeof txt !== 'string') return '';
  const len = txt.length;
  if (len > 2) {
    const firstChar = txt.charAt(0);
    const lastChar = txt.charAt(len - 1);
    const splitStr = firstChar + secretChar + lastChar;
    return splitStr;
  }
  return txt;
}

export function setDocumentTitle (title = ' ') {
  document.title = title;
  let ua = navigator.userAgent.toLowerCase();
  // IPHONE版无法监听TITLE 需要IFRAME触发
  if (ua.indexOf('iphone') > -1) {
    let iframe = document.createElement('iframe');
    iframe.src = '/static/ok.txt';
    iframe.width = 0;
    iframe.height = 0;
    iframe.frameBorder = 0;
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe);
      }, 0);
    };
    document.body.appendChild(iframe);
  }
}
