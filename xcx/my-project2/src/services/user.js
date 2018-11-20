import { request } from '../utils/request'

export function getUserInfo () {
  return request('/uc/uInfo')
}

export function login (params) {
  return request('/uc/xcxLogin', params, 'POST')
}
