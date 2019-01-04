import { PRODUCTS } from '../config/apis';
import { get, post } from '../utils/request';

// 获取普通搜索商品列表
export function getProList (params) {
  return post(PRODUCTS.SEARCH, params);
}

export function getDetail (params) {
  return post(PRODUCTS.AGENT_DETAIL, params);
}
