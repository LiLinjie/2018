import { PRODUCTS } from '../config/apis';
import { get, post } from '../utils/request';

// 获取普通搜索商品列表
export function getProList (params) {
  return post(PRODUCTS.SEARCH, params);
}

/**
 * 获取商品推广信息
 * @param {agentId, comId}
 */
export function getDetail (params) {
  return post(PRODUCTS.AGENT_DETAIL, params);
}

/**
 * 获取商品图文详情
 * @param {comId}
 */
export function getDetailItem (params) {
  return post(PRODUCTS.DETAIL_ITEM, params);
}
