import { UC } from '../config/apis';
import { get, post } from '../utils/request';

export function register (params) {
  return post(UC.REGISTER, {isApp: true, domain: 49, ...params});
}

export function getReg (params) {
  return post(UC.GET_REG, {isApp: 1, domain: 49, ...params});
}

export function getUserDetail () {
  return get(UC.USER_DETAIL);
}
