import { post } from '../utils/request';
import { authApi } from '../config';

export function logout () {
  return post(`${authApi}/logout`);
}

export function login (body) {
  return post(`${authApi}/login`, body);
}

export function getUserInfo () {
  return post(`${authApi}/user/base-info`);
}
