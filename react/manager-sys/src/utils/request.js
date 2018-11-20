import { baseURL } from '../config';
import qs from 'qs';
import { message } from 'antd';

function parseJSON (response) {
  return response.json();
}
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  message.error(response.statusText, 3);
  throw error;
}

function checkResponseSuccess (json) {
  if (json.status === 401) {
    if (!window.location.pathname.match(/\/login/)) {
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `/login?redirect=${redirectUrl}`;
      return json;
    }
  }
  if (json.status !== 1) {
    const msg = json.msg || json.detail;
    const err = new Error();
    err.status = json.status;
    err.data = json.data;
    err.message = msg;
    if (msg) {
      message.error(msg, 3);
    }
    //console.error(`Error:${err}`);
    throw err;
  }
  return json;
}

export default function request (url, options = {}) {
  if (url.indexOf('//') === -1) {
    url = baseURL + url;
  }
  let doNotShowError = options.doNotShowError || false;
  delete options.doNotShowError;

  options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers
  };
  options.credentials = 'include';
  if (options.body) {
    if (!options.method || options.method.toLowerCase() === 'get') {
      options.method = 'get';
      const search = qs.stringify(options.body);
      if (url.match(/\?/)) {
        url += '&' + search;
      } else {
        url += '?' + search;
      }
      delete options.body;
    } else {
      options.body = JSON.stringify(options.body);
    }
  } else if (options.form) {
    delete options.headers['Accept'];
    delete options.headers['Content-Type'];

    const {form} = options;
    const formData = new FormData();
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        formData.append(key, form[key]);
      }
    }

    options.body = formData;
  }
  let res = fetch(url, options);
  if (!doNotShowError) {
    res = res.then(checkStatus);
  }
  res = res.then(parseJSON);
  if (!doNotShowError) {
    res = res.then(checkResponseSuccess);
  }

  return res;
}

export function get (url, paramsObj, otherOptions = {}) {
  return request(url, {...otherOptions, method: 'get', body: paramsObj});
}

export function post (url, requestBody, otherOptions = {}) {
  return request(url, {...otherOptions, method: 'post', body: requestBody});
}

export function put (url, requestBody, otherOptions = {}) {
  return request(url, {...otherOptions, method: 'put', body: requestBody});
}

export function del (url, requestBody, otherOptions = {}) {
  return request(url, {...otherOptions, method: 'del', body: requestBody});
}
