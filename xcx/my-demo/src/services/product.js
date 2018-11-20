import { request } from '../utils/request';
import { getParams } from '../utils';

export function getProduct (params) {
  return request('https://gw-api.pinduoduo.com/api/router', getParams(params), 'POST', {'Content-Type': 'application/x-www-form-urlencoded'})
}

export function getHot (params) {
  return request(`/product/pdd/hot-words/${params || -1}`)
}
