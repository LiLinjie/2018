import { post } from '../utils/request';
import qs from 'qs';
import { baseURL } from '../config';

export function getList (body) {
  const { agentAdvertiseStatus } = body;
  if (!!agentAdvertiseStatus) {
    if (agentAdvertiseStatus === 'BLACKLIST') {
      delete body.agentAdvertiseStatus;
      return post('/agent/activity/selectAgentAdvertiseOrderBlacklist', body);
    } else {
      return post('/agent/user/advertise-order-list', body);
    }
  } else {
    return post('/agent/activity/list', body);
  }
}

export function exportAd (body) {
  window.open(`${baseURL}/agent/export-order?${qs.stringify(body)}`, '_blank');
}

// 佣金设置
export function setRate (body) {
  return post('', body)
}

// 批量拒绝
export function batchRefuse (body) {
  return post('/agent/activity/batchPassOrRefuse', body)
}

// 批量结算
export function batchSettle (body) {
  return post('', body)
}
