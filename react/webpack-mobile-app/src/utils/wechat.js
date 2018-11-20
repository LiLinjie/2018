import { get } from './request';
import config from '../../config';

let wxReady = false;
let wxTimer = null;

function getSign (_url) {
  return get(`${config.getSetting('wechatConfig')}/uc/weixin/signInfo?url=${_url}`)
}

function setWxConfig () {
  window.wx.ready(() => {
    console.log('ready');
    wxReady = true;
  });
  getSign(window.encodeURIComponent(window.location.href)).then(res => {
    let data = res.data;
    window.wxData.config = {
      debug: false,
      appId: data.appId + '',
      timestamp: data.timestamp + '',
      nonceStr: data.noncestr + '',
      signature: data.sign + '',
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'showOptionMenu',
        'showMenuItems',
        'chooseImage',
        'previewImage',
        'uploadImage'
      ]
    };
    window.wx.config(window.wxData.config);
    wxTimer = setTimeout(() => {
      if (wxReady) {
        clearInterval(wxTimer);
        return;
      }
      window.wx.config(window.wxData.config);
    }, 1000);
  });
}

export function init () {
  console.info('[wx]init');
  wxReady = false;
  setWxConfig();
}

function wxCall (fn) {
  let timer = null;
  if (wxReady) {
    fn();
    return;
  }
  timer = setInterval(() => {
    if (wxReady) {
      clearInterval(timer);
      fn();
    }
  }, 500);
}

export function setWxShare ({
                              title = '悦惠赏金联盟',
                              link = window.location.href,
                              desc = ' ',
                              imgUrl = 'http://img-cows.kkkd.com/FgteCBy2P7JNj2R8R4Aiz7gObkRm',
                              shareAppFn = function () {},
                              shareTimeLineFn = function () {}
                            }) {
  const shareData = { title, link, desc, imgUrl, shareAppFn, shareTimeLineFn };
  wxCall(() => {
    if (shareData.title && shareData.link) {
      window.wx.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl,
        success: shareAppFn
      });
      window.wx.onMenuShareTimeline({
        title,
        link,
        imgUrl,
        success: shareTimeLineFn
      });
    }
  });
}
