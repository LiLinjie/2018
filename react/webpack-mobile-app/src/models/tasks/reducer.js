import * as types from '../../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';

// 广告活动列表
export function dataSearch (state = fromJS({
  page: 0,
  size: 10,
  hasMore: true,
  isRequesting: false,
  isInit: true,
  list: [],
  progressStatus: 'IN_PROGRESS',
}), {type, payload}) {
  switch (type) {
    case types.TASKS_LIST_REQUEST:
      return state.merge({
        isRequesting: true
      });
    case types.TASKS_TAB_CHANGE:
      return state.merge({
        page: 0,
        hasMore: true,
        isRequesting: true,
        list: [],
        progressStatus: payload
      });
    case types.TASKS_LIST_SUCCESS:
      return state.merge({
        page: payload.page,
        hasMore: payload.hasMore,
        isRequesting: false,
        isInit: false,
        list: payload.list || []
      });
    default:
      return state;
  }
}

// 显示注册弹框
export function isShowRegister (state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_REGISTER_SHOW:
      return true;
    case types.TASKS_REGISTER_HIDE:
      return false;
    default:
      return state;
  }
}

// 显示升级弹框
export function isShowApplyModal (state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_APPLY_MODAL_SHOW:
      return true;
    case types.TASKS_APPLY_MODAL_HIDE:
      return false;
    default:
      return state;
  }
}

// 显示分享提示
export function isShowShareModal (state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_SHARE_MODAL_SHOW:
      return true;
    case types.TASKS_SHARE_MODAL_HIDE:
      return false;
    default:
      return state;
  }
}

// 绑定手机号和微信的关系弹窗
export function showBindModal(state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_BIND_MODAL_SHOW:
      return true;
    case types.TASKS_BIND_MODAL_HIDE:
      return false;
    default:
      return state;
  }
}

// 广告活动明细
export function detail (state = fromJS({
  isInit: true,
  info: {}
}), { type, payload }) {
  switch (type) {
    case types.TASK_DETAIL_REQUEST:
      return state.merge({
        isInit: true,
        info: {}
      });
    case types.TASK_DETAIL_SUCCESS:
      return state.merge({
        isInit: false,
        info: payload
      });
    case types.TASK_DETAIL_FAILURE:
      return state.merge({
        isInit: false,
        info: {}
      });
    case types.TASKS_START_TIME_SUCCESS: // 开始领取任务，开始计时
    case types.TASKS_AUTO_INTERRUPT_TIME: // 倒计时结束
      return state.setIn(['info', 'limitTime'], payload);
    default:
      return state;
  }
}

// 显示做任务的图片弹框
export function showImgModal(state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_IMG_MODAL_SHOW:
      return true;
    case types.TASKS_IMG_MODAL_HIDE:
      return false;
    default:
      return state;
  }
}

// 收入列表
export function incomeDataSearch(state = fromJS({
  page: 0,
  size: 10,
  hasMore: true,
  isRequesting: false,
  isInit: true,
  list: [],
  role: 'INITIATIVE',
}), {type, payload}) {
  switch (type) {
    case types.TASKS_GET_INCOME_LIST_REQUEST:
      return state.merge({
        isRequesting: true
      });
    case types.TASKS_CHANGE_INCOME_TAB:
      return state.merge({
        page: 0,
        hasMore: true,
        isRequesting: true,
        list: [],
        role: payload
      });
    case types.TASKS_GET_INCOME_LIST_SUCCESS:
      return state.merge({
        page: payload.page,
        hasMore: payload.hasMore,
        isRequesting: false,
        isInit: false,
        list: payload.list || []
      });
    default:
      return state;
  }
}


// 订单的素材列表
export function materialList(state = fromJS([]), { type, payload }) {
  switch (type) {
    case types.TASKS_CHECK_LIST_REQUEST:
      return state.merge([]);
    case types.TASKS_CHECK_LIST_SUCCESS:
      return fromJS(payload || []);
    default:
      return state;
  }
}

// 总收益
export function income(state = 0, { type, payload }) {
  return (type === types.TASKS_GET_INCOME_SUCCESS)
    ? payload
    : state;
}

// 领取的轮播列表
export function broadcastList(state = fromJS([]), { type, payload }) {
  switch (type) {
    case types.TASKS_BROADCAST_REQUEST:
      return fromJS([]);
    case types.TASKS_BROADCAST_SUCCESS:
      return fromJS(payload || []);
    default:
      return state;
  }
}

// 填写的注册信息
export function registerInfo(state = fromJS({}), { type, payload }) {
  switch (type) {
    case types.TASKS_CHANGE_REGISTER_INFO:
      return state.merge(payload);
    default:
      return state;
  }
}

// 上传图片素材的loading状态
export function uploadingMaterial(state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_UPLOAD_ORDER_REQUEST:
      return true;
    case types.TASKS_UPLOAD_ORDER_SUCCESS:
    case types.TASKS_UPLOAD_ORDER_FAILURE:
      return false;
    default:
      return state;
  }
}

// 是否展示红包弹窗
export function isShowRedBagModal(state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_RED_BAG_MODAL_SHOW:
      return true;
    case types.TASKS_RED_BAG_MODAL_HIDE:
      return false;
    default:
      return state;
  }
}

// 红包信息
export function redBagInfo(state=fromJS({}), { type, payload }) {
  switch (type) {
    case types.TASKS_GET_RED_BAG_FAILURE:
    case types.TASKS_GET_INVITE_RED_BAG_FAILURE:
    case types.TASKS_RED_BAG_MODAL_HIDE:
      return fromJS({});
    case types.TASKS_GET_RED_BAG_SUCCESS:
    case types.TASKS_GET_INVITE_RED_BAG_SUCCESS:
    case types.LOTTERY_RED_BAG:
      return fromJS(payload);
    default:
      return state;
  }
}

// 师傅红包统计
export function inviteStats (state = Map(), { type, payload }) {
  switch (type) {
    case types.TASKS_INVITE_STATS_SUCCESS:
      return fromJS(payload);
    default:
      return state;
  }
}

// 师傅红包统计
export function isShowInviteModal (state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_INVITE_MODAL_SHOW:
      return true;
    case types.TASKS_INVITE_MODAL_HIDE:
      return false;
    default:
      return state;
  }
}

// 显示确认框
export function showInfoModal(state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_SHOW_INFO_MODAL:
      return payload;
    default:
      return state;
  }
}

// 是否展示中断计时功能
export function isShowInterModal(state = false, { type, payload }) {
  switch (type) {
    case types.TASKS_SHOW_INTERRUPT_MODAL:
      return true;
    case types.TASKS_HIDE_INTERRUPT_MODAL:
      return false;
    default:
      return state;
  }
}

// 新手任务列表详情初始值
const INIT_NOVICE_TASKS = {
  activities: [],
  redpacket: {}
};

// 新手任务列表详情
export function noviceTasks(state = fromJS(INIT_NOVICE_TASKS), { type, payload }) {
  switch(type) {
    case types.TASKS_NOVICE_TASKS_SUCCESS:
      return fromJS(payload);
    case types.TASKS_NOVICE_TASKS_FAILURE:
      return fromJS(INIT_NOVICE_TASKS);
    default:
      return state;
  }
}

// 是否展示新手引导弹窗
export function isShowNoviceTaskModal(state = false, { type, payload }) {
  switch (type) {
    case types.TASK_DISPLAY_NOVICE_TASKS_MODAL:
      return payload;
    default:
      return state;
  }
}

// 新手任务剩余奖励金额
export function restNoviceTaskAward(state = fromJS({}), { type, payload }) {
  switch (type) {
    case types.TASKS_REST_NOVICE_AWARD_SUCCESS:
      return fromJS(payload);
    case types.TASKS_REST_NOVICE_AWARD_FAILURE:
      return fromJS({});
    default:
      return state;
  }
}
