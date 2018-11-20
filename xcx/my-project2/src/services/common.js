import { request } from '../utils/request'
const { API_MDSCJ_URL } = process.env

export function getXcxStatus (params) {
  return request(`${API_MDSCJ_URL}/others/xcx/status/get`, params)
}
