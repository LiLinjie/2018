import { LOTTERY } from '../constants/api';
import { post, get } from '../utils/request';

export function getList () {
  return post(LOTTERY.LIST);
}

export function getTimes () {
  return get(LOTTERY.GET_TIMES);
}

export function play () {
  return post(LOTTERY.PLAY);
}
