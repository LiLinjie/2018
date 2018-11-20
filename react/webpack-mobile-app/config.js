const path = require('path');

const __NODE_ENV__ = process.env.NODE_ENV;
console.log('env', __NODE_ENV__);

const env = {
  __DEV__:      __NODE_ENV__ === 'development',
  __PROD__:     __NODE_ENV__ === 'production',
  __TEST__:     __NODE_ENV__ === 'test',
  __NODE_ENV__: __NODE_ENV__
};

let logLevel = 0;
if (process.env.LOG_LEVEL) {
  logLevel = +process.env.LOG_LEVEL;
}

function root () {
  return path.join.apply(null, [__dirname, '../'].concat([].slice.call(arguments)));
}

const settings = {
  'production': {
    apiRoot: `${getProtocol()}//restapi.xuanwonainiu.com`,
    apiMall: `${getProtocol()}//mall.xuanwonainiu.com`,
    apiQf: `${getProtocol()}//qf-bos.xuanwonainiu.com`,
    apiMaidao: `${getProtocol()}//qf-restapi.mdscj.com`,
    redirectServerUri: 'http://restapi.xuanwonainiu.com/uc/dispatch', // 微信授权回调地址
    oauthState: `http://dl.xuanwonainiu.com|prod`, // 微信授权判断哪个环境
    wechatConfig: `${getProtocol()}//restapi.xuanwonainiu.com`, // 获取微信sdk配置参数
  },
  'development': {
    apiRoot: 'http://restapi.xuanwonainiutest.com',
    apiMall: 'http://mall.xuanwonainiutest.com',
    apiQf: 'http://qf-bos.xuanwonainiutest.com',
    apiMaidao: 'http://qf-restapi.mdscj.com',
    redirectServerUri: 'http://restapi.xuanwonainiu.com/uc/dispatch',
    oauthState: 'http://dl.xuanwonainiutest.com|test',
    wechatConfig: 'http://restapi.xuanwonainiutest.com'
  },
  'default': {
    apiRoot: 'http://restapi.xuanwonainiutest.com',
    apiMall: 'http://mall.xuanwonainiutest.com',
    apiQf: 'http://qf-bos.xuanwonainiutest.com',
    apiMaidao: 'http://qf-restapi.mdscj.com',
    redirectServerUri: 'http://restapi.xuanwonainiu.com/uc/dispatch',
    oauthState: 'http://dl.xuanwonainiutest.com|test',
    wechatConfig: 'http://restapi.xuanwonainiutest.com'
  }
};

const remainParmas = ['partner'];
const domain = 49;

function getSetting (name) {
  const setting = settings[__NODE_ENV__] || settings['default'];
  return setting[name] || settings['default'][name];
}

function getProtocol () {
  let protocol = 'http:';
  try {
    let a = window.document.body;
    protocol = window.location.protocol;
  } catch (e) {
    // 服务端都用http加快速度
    protocol = 'http:';
  }
  return protocol;
}

module.exports = {
  env,
  settings,
  logLevel,
  getSetting,
  getProtocol,
  remainParmas,
  domain
};
