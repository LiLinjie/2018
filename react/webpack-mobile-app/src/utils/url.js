import qs from 'qs';
import { remainParmas } from '../../config';

export function getUrlQuery () {
  const { search, hash } = window.location;
  let searchStr = search || hash;
  searchStr = searchStr.replace(/^(.*?\?)/, '');

  return qs.parse(searchStr);
}

export function concatUrlAndQuery (baseUrl, query) {
  let _url = baseUrl.indexOf('?') > -1 ? baseUrl : baseUrl + '?';
  let search = _url.split('?')[1];
  const urlQ = qs.parse(search);
  remainParmas.forEach(p => {
    if (urlQ.hasOwnProperty(p)) {
      delete query[p];
    }
  });
  if (typeof query === 'object') {
    query = qs.stringify(query);
  } else if (typeof query !== 'string' || !query) {
    return baseUrl;
  }

  if (/\?/.test(baseUrl)) {
    baseUrl += '&';
  } else {
    baseUrl += '?';
  }

  return baseUrl + query;
}

export function getTargetQuery (url = '') {
  let targetQuery = {};
  let _url = url.indexOf('?') > -1 ? url : url + '?';
  let search = _url.split('?')[1];
  const urlQ = qs.parse(search);
  const urlQuery = url ? urlQ : getUrlQuery();
  remainParmas.forEach(params => {
    urlQuery[params] !== void 0 && (targetQuery[params] = urlQuery[params]);
  });
  return targetQuery;
}

export function linkTo (href) {
  let targetQuery = getTargetQuery();
  let targetUrl;
  if (href.indexOf('http') === 0) {
    targetUrl = concatUrlAndQuery(href, targetQuery);
  } else {
    targetUrl = concatUrlAndQuery(window.location.origin + href, targetQuery);
  }

  window.location.href = targetUrl;
}
