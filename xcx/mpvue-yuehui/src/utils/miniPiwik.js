function getValuesFromVisitorIdCookie () {
  let cookieVisitorIdValue = loadVisitorIdCookie(),
    newVisitor = cookieVisitorIdValue[0],
    uuid = cookieVisitorIdValue[1],
    createTs = cookieVisitorIdValue[2],
    visitCount = cookieVisitorIdValue[3],
    currentVisitTs = cookieVisitorIdValue[4],
    lastVisitTs = cookieVisitorIdValue[5];
// case migrating from pre-1.5 cookies
  if (typeof cookieVisitorIdValue[6] !== 'undefined') {
    cookieVisitorIdValue[6] = '';
  }
  var lastEcommerceOrderTs = cookieVisitorIdValue[6];
  return {
    newVisitor,
    uuid,
    createTs,
    visitCount,
    currentVisitTs,
    lastVisitTs,
    lastEcommerceOrderTs
  };
}
function loadVisitorIdCookie () {
  let now = new Date(),
    nowTs = Math.round(now.getTime() / 1000),
    visitorValue = wx.getStorageSync('visitorValue'),
    uuid;
// Visitor ID cookie found
  if (visitorValue) {
    return visitorValue;
  }
  uuid = generateRandomUuid();
// No visitor ID cookie, let's create a new one
  visitorValue = [
// new visitor
    '1',
// uuid
    uuid,
// creation timestamp - seconds since Unix epoch
    nowTs,
// visitCount - 0 = no previous visit
    0,
// current visit timestamp
    nowTs,
// last visit timestamp - blank = no previous visit
    '',
// last ecommerce order timestamp
    ''
  ];
  return visitorValue;
}
function generateUniqueId() {
  var id = '';
  var chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charLen = chars.length;
  var i;
  for (i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * charLen));
  }
  return id;
}
function generateRandomUuid() {
  return hash(
    (new Date()).getTime() +
    Math.random()
  ).slice(0, 16);
}
function hash (str) {
  var
    rotate_left = function (n, s) {
      return (n << s) | (n >>> (32 - s));
    },
    cvt_hex = function (val) {
      var strout = '',
        i,
        v;
      for (i = 7; i >= 0; i--) {
        v = (val >>> (i * 4)) & 0x0f;
        strout += v.toString(16);
      }
      return strout;
    },
    blockstart,
    i,
    j,
    W = [],
    H0 = 0x67452301,
    H1 = 0xEFCDAB89,
    H2 = 0x98BADCFE,
    H3 = 0x10325476,
    H4 = 0xC3D2E1F0,
    A,
    B,
    C,
    D,
    E,
    temp,
    str_len,
    word_array = [];
  str = utf8_encode(str);
  str_len = str.length;
  for (i = 0; i < str_len - 3; i += 4) {
    j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 |
      str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
    word_array.push(j);
  }
  switch (str_len & 3) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
      break;
    case 2:
      i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
      break;
    case 3:
      i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
      break;
  }
  word_array.push(i);
  while ((word_array.length & 15) !== 14) {
    word_array.push(0);
  }
  word_array.push(str_len >>> 29);
  word_array.push((str_len << 3) & 0x0ffffffff);
  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) {
      W[i] = word_array[blockstart + i];
    }
    for (i = 16; i <= 79; i++) {
      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
  return temp.toLowerCase();
}
function utf8_encode(argString) {
  return unescape(encodeURIComponent(argString));
}
export function getRequest (options) {
  // console.log('option', options);
  const now = new Date();
  let cookieVisitorIdValues = getValuesFromVisitorIdCookie();
  const configSessionCookieTimeout = 1800000; // 30 minutes
  let visitDuration = configSessionCookieTimeout / 1000;
  if (!cookieVisitorIdValues.lastVisitTs || (Math.round(now.getTime() / 1000) - cookieVisitorIdValues.lastVisitTs) > visitDuration) {
    cookieVisitorIdValues.visitCount++;
    cookieVisitorIdValues.lastVisitTs = cookieVisitorIdValues.currentVisitTs;
  }
  const req = '&idsite=9' +
    (options.e_a ? '&e_a=' + options.e_a : '') +
    (options.e_c ? '&e_c=' + options.e_c : '') +
    (options.e_n ? '&e_n=' + options.e_n : '') +
    '&rec=1' +
    '&r=' + String(Math.random()).slice(2, 8) + // keep the string to a minimum
    '&h=' + now.getHours() + '&m=' + now.getMinutes() + '&s=' + now.getSeconds() +
    '&url=' + encodeURIComponent('http://mini.xuanwonainiu.com/s3/xcx-yhzx/' + options.url) +
    '&_id=' + cookieVisitorIdValues.uuid + '&_idts=' + cookieVisitorIdValues.createTs + '&_idvc=' + cookieVisitorIdValues.visitCount +
    '&_idn=' + cookieVisitorIdValues.newVisitor + // currently unused
    '&_refts=0' +
    '&_viewts=' + cookieVisitorIdValues.lastVisitTs +
    '&send_image=1&pdf=1&qt=0&realp=0&wma=0&dir=0&fla=0&java=0&gears=0&ag=0&cookie=1&res=1366x768&gt_ms=0&pv_id=' + generateUniqueId();
  // const req = 'action_name=&idsite=2&rec=1&r=900912&h=16&m=26&s=24&url=http%3A%2F%2Fm.xuanwonainiu.com%2Fproduct-detail%3Fid%3D81523648%26es%3Dtrue%26&urlref=http%3A%2F%2Fm.xuanwonainiu.com%2Fgroup%3F&uid=UNLOGIN&_id=cef2e84a90f20e47&_idts=1527061619&_idvc=29&_idn=0&_refts=0&_viewts=1530087985&send_image=1&pdf=1&qt=0&realp=0&wma=0&dir=0&fla=0&java=0&gears=0&ag=0&cookie=1&res=1366x768&gt_ms=138&pv_id=TEffxc';
  // console.log('req', req);
  cookieVisitorIdValues.currentVisitTs = Math.round(now.getTime() / 1000);
  wx.request({
    url: 'https://piwik.mdscj.com/piwik/piwik.php?' + req,
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function(res) {
      // console.log(res.data)
    }
  });
  if (!Object.values) {
    Object.values = function (obj) {
      let values = [];
      for (let key in obj) {
        values.push(obj[key]);
      }
      return values;
    }
  }
  wx.setStorageSync('visitorValue', Object.values(cookieVisitorIdValues));
}
