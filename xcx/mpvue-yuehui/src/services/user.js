import { request } from '../utils/request'

export function getUserInfo () {
  return request('/agent/newUser/detail')
}

export function login (params) {
  return request('/uc/xcxLogin', params, 'POST')
}

export function register (params) {
  return request('/agent/user/bind', params, 'POST')
}

// 获取运营商导师微信号
export function getOperatorName() {
  return request('/agent/newUser/getOperatorName')
}

// 获取运营商导师微信号
export function getTeam (params) {
  return request('/agent/newUser/team', params, 'POST')
}

export function getOrder (params) {
  return request(`/agent/user/pdd/${params.name}`, params, 'POST')
}

export function getPersonHome () {
  return request('/agent/data/personHome1', {}, 'POST')
}

export function getPersonAmount () {
  return request('/agent/data/personAmount', {}, 'POST')
}

/*点击分享链接*/
export function shareClick (params) {
  return request('/integral/xcx/product-share/click', params, 'POST');
}

/*分享必得 统计*/
export function shareStat () {
  return request('/integral/xcx/product-share/statistic');
}

/*分享必得 收益列表*/
export function shareStatList (params) {
  return request('/integral/xcx/product-share/page', params, 'POST');
}

/*获取拼多多pid*/
export function getPddpid (params) {
  return request('/agent/newUser/pid/pdd', params, 'GET');
}
