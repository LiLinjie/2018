import { request } from '../utils/request';
import config from '../config';

const pddConfig = {
  client_id: config.client_id,
};

export function getProduct (params) {
  return request('https://gw-api.pinduoduo.com/api/router', Object.assign({}, params, pddConfig), 'POST', {'Content-Type': 'application/x-www-form-urlencoded'})
}
