import { post } from '../utils/request';
import { COMMON } from '../constants/api';

export function save (params) {
  return post(COMMON.SAVE, params);
}

export function saveMedia (params) {
  return post(COMMON.SAVE_MEDIA, params)
}
