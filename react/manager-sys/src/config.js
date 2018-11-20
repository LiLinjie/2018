const webSiteName = '网赚toB系统';

let baseURL;
let authApi;

const host = window.location.host;
const protocol = window.location.protocol;

if (~host.indexOf('xuanwonainiu.com')) {
  baseURL = `${protocol}//qf-bos.xuanwonainiu.com`;
  authApi = `${protocol}//tk-auth-bos.xuanwonainiu.com`
} else {
  baseURL = 'http://qf-bos.xuanwonainiutest.com';
  authApi = 'http://tk-auth-bos.xuanwonainiutest.com';
}

export {
  webSiteName,
  baseURL,
  authApi
};

