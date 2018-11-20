import {TASKS} from '../constants/api';
import { post, get } from '../utils/request';

export function getList (params) {
  return post(TASKS.LIST, params);
}

export function getDetail (params) {
  return post(TASKS.DETAIL, params);
}

export function check (params) {
  return post(TASKS.CHECK, params);
}

export function upload (params) {
  return post(TASKS.UPLOAD, params);
}

export function getNum (id) {
  return get(`${TASKS.UPLOAD_NUM}/${id}`);
}

// 注册
export function doRegister (params) {
  return post(TASKS.REGISTER, params);
}

// 绑定手机号和微信号的关联
export function bindRelation (params) {
  return post(TASKS.BIND_RELATION, params);
}

export function getIncomeList(params) {
  return post(TASKS.INCOME_LIST, params);
}

export function getOrderList(params) {
  return post(TASKS.ORDER_LIST, params);
}

export function createOrder(params) {
  return post(TASKS.UPLOAD_ORDER, params);
}

export function getIncome() {
  return get(TASKS.INCOME);
}

export function getBroadcastList(params) {
  return post(TASKS.BROADCAST, params);
}

export function applyAgent() {
  return post(TASKS.APPLY_AGENT);
}

export function getRedBagInfo(params) {
  return post(TASKS.RED_BAG_INFO, params);
}

export function getAward(params) {
  return get(`${TASKS.GET_AWARD}/${params}`);
}

export function awardEnterAccount() {
  return post(TASKS.AWARD_ENTER_ACCOUNT);
}

export function getInviteRedBagInfo() {
  return get(TASKS.INVITE_RED_BAG_INFO);
}

export function getInviteAward(params) {
  return post(TASKS.GET_INVITE_AWARD, params);
}

export function getInviteStats () {
  return get(TASKS.INVITE_STATISTIC);
}

export function startTaskTime(params) {
  return get(`${TASKS.TASK_START_TIME}?id=${params}`);
}

export function interrTaskTime(params) {
  return get(`${TASKS.TASK_INTERRUPT_TIME}?id=${params}`);
}

export function noviceTasks() {
  return get(TASKS.NOVICE_TASKS);
}

export function getRestNoviceAward(params) {
  return post(TASKS.NOVICE_REST_TASKS_AWARD, params);
}





