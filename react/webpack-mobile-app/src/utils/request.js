import qs from 'qs';
import { getWebOAuthUrl } from '../services/uc';

async function request (method, url, body) {
  method = method.toLowerCase();

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'channel': 'tk_agent'
    },
    credentials: 'include'
  };

  if (window.localStorage.getItem('t')) {
    options.headers.WXEXTSession = window.localStorage.getItem('t');
  }

  if (['get', 'jsonp'].indexOf(method) >= 0 && body) {
    url = url.replace(/\?$/, '');
    if (/\?/.test(url)) {
      url += '&';
    } else {
      url += '?';
    }
    url += qs.stringify(body);
  } else {
    options.body = body && JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, options);
    res = await res.json();
    if (res.status === 401) {
      const { appId, domain, qunId, callbackUrl, oauthPlatform } = res.data || {};
      window.location.href = getWebOAuthUrl({appId, domain, qunId, callbackUrl, oauthPlatform});
    } else if (res.status !== 1 ) {
      window.alertTip(res.msg);
    }
    return res;
  } catch (e) {
    return {
      status: 500,
      data: null
    };
  }
}

function restApiRequest (method) {
  return request.bind(null, method);
}

export default request;
export const get = restApiRequest('get');
export const post = restApiRequest('post');
export const del = restApiRequest('delete');
export const put = restApiRequest('put');
