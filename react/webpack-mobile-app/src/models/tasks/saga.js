import * as types from '../../constants/actionTypes';
import * as service from '../../services/tasks';
import * as serviceCom from '../../services/common';
import { call, put, take, select, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { COMMON_ROLE, NO_RECEIVE_TASK, STRATEGY_TASK_TYPE, SHARE_TASK_TYPE, FOLLOW_TASK_TYPE, NORMAL_TASK_TYPE, NOVICE_RED_BAG_TYPE, ABLE_RECEIVE_AWARD_STATUS, NOVICE_TASKS_PAGE } from '../../constants/tasks'
import { linkTo, getUrlQuery, } from '../../utils/url'
import { getShowPrice } from '../../utils'

// 获取广告活动列表
function *getList ({ payload }) {
  const { page, size, hasMore, list, progressStatus } = yield select(s => s.getIn(['tasks', 'dataSearch']).toJS());
  if (!hasMore) {
    return;
  }
  const params = {
    page,
    size,
    progressStatus
  };
  const res = yield call(service.getList, params);
  if (res.status === 1) {
    yield put({
      type: types.TASKS_LIST_SUCCESS,
      payload: {
        list: list.concat(res.data.data),
        page: page + 1,
        hasMore: (page + 1) < res.data.totalPage
      }
    });
  } else {
    yield put({ type: types.TASKS_LIST_FAILURE });
  }
}

// 获取广告详情
function *getDetail ({payload}) {
  try {
    const { id } = payload;
    const res = yield call(service.getDetail, payload);
    if (res.status === 1) {
      // 兼容旧任务模式
      const { imgMust, textMust, imgTemplates, placeholders } = res.data;

      // 为图片素材设置默认值
      if (imgMust && (!imgTemplates || !imgTemplates.length)) {
        res.data.imgTemplates = []
      }

      // 为文本素材设置默认值
      if (textMust && (!placeholders || !placeholders.length)) {
        res.data.placeholders = [''];
      }

      yield put({
        type: types.TASK_DETAIL_SUCCESS,
        payload: res.data
      })
    } else {
      yield put({ type: types.TASK_DETAIL_FAILURE })
    }
  } catch (e) {
    yield put({ type: types.TASK_DETAIL_FAILURE })
  }
}

// 注册
function* doRegister({ payload }) {
  const { userName } = payload;
  yield put({ type: types.TASKS_CHANGE_REGISTER_INFO, payload })
  try {
    const res = yield call(service.doRegister, { userName }); // 检查手机号状态
    const { status, data } = res;
    if (status !== 1) return;
    switch (data) {
      case 1: { // 未注册，执行注册功能
        const registerInfo = yield select(state => state.getIn(['tasks', 'registerInfo']));
        const params = {  ...payload, isApp: true, };
        const res = yield call(service.bindRelation, params);
        if (res.status === 1) {
          // 红包入账,更新收益
          const enterAccountRes = yield call(service.awardEnterAccount);
          if (enterAccountRes.status === 1) {
            yield put({ type: types.TASKS_GET_INCOME_REQUEST })
          }

          const applyRes = yield call(service.applyAgent); // 升级代理
          if (applyRes.status === 1) {
            yield put({ type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST });
            alertTip('注册成功');
            yield put({ type: types.TASKS_REGISTER_HIDE });
          }
        }
        break;
      };
      case 2: { // 手机号已注册但未绑定
        yield put({ type: types.TASKS_REGISTER_HIDE });
        yield put({ type: types.TASKS_BIND_MODAL_SHOW });
        break;
      };
      case 3: {
        alertTip('您填写的⼿机号已绑定过其他微信，请更换⼿机号');
        break;
      };
      default: break;
    }
  } catch (e) {}
}

// 绑定手机号和微信关系
function* bindRelation({ payload }) {
  const registerInfo = yield select(state => state.getIn(['tasks', 'registerInfo']));
  const params = { ...registerInfo.toJS(), isApp: true, };
  const res = yield call(service.bindRelation, params);
  if (res.status === 1) {
    // 红包入账,更新收益
    const enterAccountRes = yield call(service.awardEnterAccount);
    if (enterAccountRes.status === 1) {
      yield put({ type: types.TASKS_GET_INCOME_REQUEST });
    }

    yield put({ type: types.TASKS_BIND_MODAL_HIDE });
    const userInfoRes = yield call(service.getUser);
    if (userInfoRes.status === 1) {
      const { role } = userInfoRes;
      if (role === COMMON_ROLE) { // 升级为代理
        yield put({ type: TASKS_APPLY_AGENT_REQUEST })
      } else { // 更新用户信息
        yield put({
          type: types.TASKS_WANGZHUAN_USER_INFO_SUCCESS,
          payload: userInfoRes.data
        });
      }
    }
  }
}

// 升级为代理
function* applyAgent({ payload }) {
  try {
    const res = yield call(service.applyAgent);
    if (res.status === 1) {
      yield put({ type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST });
      alertTip('操作成功');
    }
  } finally {
    yield put({ type: types.TASKS_APPLY_MODAL_HIDE });
  }
}

// 获取任务收入/好友提成列表
function* getIncomeList ({ payload }) {
  const { page, size, hasMore, list, role } = yield select(s => s.getIn(['tasks', 'incomeDataSearch']).toJS());
  const userInfo = yield select(s => s.getIn(['user', 'userInfo']).toJS());
  if (!hasMore || !userInfo.role) return;
  const params = {
    page,
    size,
    role
  };
  const res = yield call(service.getIncomeList, params);
  if (res.status === 1) {
    yield put({
      type: types.TASKS_GET_INCOME_LIST_SUCCESS,
      payload: {
        list: list.concat(res.data.data),
        page: page + 1,
        hasMore: (page + 1) < res.data.totalPage
      }
    });
  } else {
    yield put({ type: types.TASKS_GET_INCOME_LIST_FAILURE });
  }
}

// 获取审核详情列表
function* getCheckList() {
  while (1) {
    const { payload } = yield take(types.TASKS_CHECK_LIST_REQUEST);
    const res = yield call(service.getOrderList, payload);
    if (res.status === 1) {
      yield put({ type: types.TASKS_CHECK_LIST_SUCCESS, payload: res.data })
    }
  }
}

// 上传订单材料
function* uploadOrder() {
  while (1) {
    const { payload } = yield take(types.TASKS_UPLOAD_ORDER_REQUEST);
    const { mediaIds, texts, id } = payload;
    try {
      // const uploadRes = yield call(service.createOrder, { activityId: id, texts, imgUrls });
      // if (uploadRes.status === 1) {
      //   yield put({ type: types.TASKS_SHOW_INFO_MODAL, payload: true })
      //   yield put({ type: types.TASKS_UPLOAD_ORDER_SUCCESS })
      // } else {
      //   yield put({ type: types.TASKS_UPLOAD_ORDER_FAILURE })
      // }
      if (mediaIds) { // 含有图片素材
        const urlRes = yield call(serviceCom.saveMedia, { mediaIds });
        if (urlRes.status === 1) {
          const imgUrls = urlRes.data.map(i => i.url);
          const filterUrls = [...new Set(imgUrls)]; // 去重
          if (filterUrls.length !== imgUrls.length) {
            alertTip('不能上传相同的图片');
            yield put({ type: types.TASKS_UPLOAD_ORDER_FAILURE });
            continue;
          }
          const uploadRes = yield call(service.createOrder, { activityId: id, imgUrls, texts });
          if (uploadRes.status === 1) {
            yield put({ type: types.TASKS_SHOW_INFO_MODAL, payload: true });
            yield put({ type: types.TASKS_UPLOAD_ORDER_SUCCESS });
          } else {
            yield put({ type: types.TASKS_UPLOAD_ORDER_FAILURE });
          }
        } else {
          yield put({ type: types.TASKS_UPLOAD_ORDER_FAILURE });
        }
      } else { // 纯文本素材上传
        const uploadRes = yield call(service.createOrder, { activityId: id, texts });
        if (uploadRes.status === 1) {
          yield put({ type: types.TASKS_SHOW_INFO_MODAL, payload: true });
          yield put({ type: types.TASKS_UPLOAD_ORDER_SUCCESS });
        } else {
          yield put({ type: types.TASKS_UPLOAD_ORDER_FAILURE });
        }
      }
    } catch (e) {
      yield put({ type: types.TASKS_UPLOAD_ORDER_FAILURE });
    }
  }
}

// 获取累计收益
function* getIncome() {
  while (1) {
    yield take(types.TASKS_GET_INCOME_REQUEST);
    const res = yield call(service.getIncome);
    if (res.status === 1) {
      yield put({ type: types.TASKS_GET_INCOME_SUCCESS, payload: res.data });
    }
  }
}

// 获取轮播领取奖励信息
function* getBroadcastList() {
  while (1) {
    yield take(types.TASKS_BROADCAST_REQUEST);
    const params = { page: 0, size: 20 }; // 固定请求条数
    const res = yield call(service.getBroadcastList, params);
    if (res.status === 1) {
      yield put({ type: types.TASKS_BROADCAST_SUCCESS, payload: res.data.data })
    }
  }
}

// 获取红包信息
function* getRedBagInfo() {
  while (1) {
    const { payload, nextAction } = yield take(types.TASKS_GET_RED_BAG_REQUEST);
    const res = yield call(service.getRedBagInfo, payload);
    const { data, status } = res;
    if ((status === 1) && (data.status === ABLE_RECEIVE_AWARD_STATUS)) { // 待领取状态
      yield put({ type: types.TASKS_GET_RED_BAG_SUCCESS, payload: data });
      yield put({ type: types.TASKS_RED_BAG_MODAL_SHOW });
      if (nextAction) {
        yield put(nextAction);
      }
    } else if (payload.type === NOVICE_RED_BAG_TYPE) { // 新用户红包已被领取，则弹出新手任务剩余弹窗
      yield put({ type: types.TASKS_REST_NOVICE_AWARD_REQUEST });
    }
  }
}

// 新手任务列表领取奖励成功后的提示
function noviceAwardTip(type, money) {
  switch (type) {
    case STRATEGY_TASK_TYPE: {
      setTimeout(() => {
        alertTip(`浏览成功，获得${money}元奖励`);
      }, 2000);
      break;
    }
    case SHARE_TASK_TYPE: {
      alertTip(`您已分享成功，获得${money}元奖励`);
      break;
    }
    case FOLLOW_TASK_TYPE: {
      alertTip(`您已完成关注公众号，额外获得${money}元`);
      break;
    }
    case NORMAL_TASK_TYPE: {
      alertTip(`您已完成一次任务，额外获得${money}元`);
      break;
    }
    default: break;
  }
}

// 领取新手任务奖励
function* getNoviceTasksAward({ payload, nextAction }) {
  const { type } = payload;
  try {
    const res = yield call(service.getRedBagInfo, payload); // 获取奖励信息
    const { data, status } = res;
    if ((status === 1) && data && (data.status === 1)) { // 待领取状态
      const getAwardRes = yield call(service.getAward, data.id); // 领取
      if (getAwardRes.status === 1) { // 领取成功
        noviceAwardTip(type, getShowPrice(data.amount));
        if (nextAction) {
          yield put(nextAction);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// 获取师徒红包信息
function* getInviteRedBagInfo() {
  while (1) {
    yield take(types.TASKS_GET_INVITE_RED_BAG_REQUEST);
    try {
      const res = yield call(service.getInviteRedBagInfo);
      const { data, status } = res;
      if ((status === 1) && data && data.count) { // 待领取状态
        yield put({ type: types.TASKS_GET_INVITE_RED_BAG_SUCCESS, payload: data });
        yield put({ type: types.TASKS_RED_BAG_MODAL_SHOW });
        const inviteAwardRes = yield call(service.getInviteAward, data.ids); // 领取红包
        if (inviteAwardRes.status === 1) { // 领取成功后，更新收益
          yield put({ type: types.TASKS_GET_INCOME_REQUEST });
        }
      } else { // 最新授权用户，获取新手任务奖励信息
        yield put({ type: types.TASKS_REST_NOVICE_AWARD_REQUEST });
      }
    } catch (e) {
      yield put({ type: types.TASKS_GET_INVITE_RED_BAG_FAILURE });
    }
  }
}

// 领取红包奖励
function* getAward() {
  while (1) {
    yield take(types.TASKS_GET_AWARD_REQUEST);
    const params = yield select(state => state.getIn(['tasks', 'redBagInfo']));
    const { id } = params.toJS();
    const res = yield call(service.getAward, id);
    if (res.status === 1) { // 重新获取下收益金额
      yield put({ type: types.TASKS_GET_INCOME_REQUEST });
    }
  }
}

// 获取师傅红包统计
function* getInviteStats() {
  const res = yield call(service.getInviteStats);
  if (res.status === 1) {
    const { data } = res;
    const incomeData = (data.totalRedpacketAmount / 100).toFixed(1).split('.');
    data.integer = incomeData[0] || 0;
    data.decimal = incomeData[1] || 0;
    yield put({ type: types.TASKS_INVITE_STATS_SUCCESS, payload: data });
  } else {
    yield put({ type: types.TASKS_INVITE_STATS_FAILURE });
  }
}

// 启动任务计时
function* startTaskTime({ payload }) {
  try {
    const res = yield call(service.startTaskTime, payload);
    if (res.status === 1) {
      alertTip('领取任务成功！');
      yield put({ type: types.TASKS_START_TIME_SUCCESS, payload: res.data.time });
    }
  } catch (e) {
    yield put({ type: types.TASKS_START_TIME_FAILURE })
  }
}

// 中断任务计时
function* interruptTime({ payload }) {
  try {
    const res = yield call(service.interrTaskTime, payload);
    const { partner, id } = getUrlQuery();
    if (res.status === 1) { // 中断成功，时间重设为0,跳转至列表页面
      if (!partner) {
        linkTo('/tasks');
      } else {
        yield put({
          type: types.TASK_DETAIL_REQUEST,
          payload: {
            id
          }
        })
      }
    }
  } catch (e) {
    console.log('e=', e)
  }
}

// 获取新手任务列表详情
function* getNoviceTasks() {
  while (1) {
    yield take(types.TASKS_NOVICE_TASKS_REQUEST);
    try {
      const res = yield call(service.noviceTasks);
      if (res.status === 1) {
        yield put({ type: types.TASKS_NOVICE_TASKS_SUCCESS, payload: res.data })
      } else {
        yield put({ type: types.TASKS_NOVICE_TASKS_FAILURE });
      }
    } catch (e) {
      yield put({ type: types.TASKS_NOVICE_TASKS_FAILURE });
    }
  }
}

// 获取新手任务剩余的奖励金额
function* getRestNoviceAward() {
  while (1) {
    yield take(types.TASKS_REST_NOVICE_AWARD_REQUEST);
    const { fromPage } = getUrlQuery();
    const isHideModal = fromPage === NOVICE_TASKS_PAGE; // 非新手任务列表页进入
    const userInfo = yield select(s => s.getIn(['tasks', 'newUserInfo']).toJS());
    const { newUser } = userInfo;
    if (!newUser || isHideModal) return;
    try {
      const res = yield call(service.getRestNoviceAward);
      if (
        (res.status === 1)
        && res.data
        && (res.data.amount > 0)
      ) { // 需要提示用户剩余的新手任务奖励金额
        yield put({ type: types.TASKS_REST_NOVICE_AWARD_SUCCESS, payload: res.data });
        yield put({ type: types.TASK_DISPLAY_NOVICE_TASKS_MODAL, payload: true });
      }
    } catch (e) {
      yield put({ type: types.TASKS_REST_NOVICE_AWARD_FAILURE });
    }
  }
}

export default function *() {
  yield fork(getAward);
  yield fork(getIncome);
  yield fork(uploadOrder);
  yield fork(getCheckList);
  yield fork(getRedBagInfo);
  yield fork(getInviteRedBagInfo);
  yield fork(getBroadcastList);
  yield fork(getNoviceTasks);
  yield fork(getRestNoviceAward);
  yield takeEvery(types.TASKS_GET_NOVICE_TASKS_AWARD, getNoviceTasksAward);
  yield takeLatest(types.TASKS_LIST_REQUEST, getList);
  yield takeLatest(types.TASKS_TAB_CHANGE, getList);
  yield takeLatest(types.TASK_DETAIL_REQUEST, getDetail);
  yield takeLatest(types.TASKS_REGISTER_REQUEST, doRegister);
  yield takeLatest(types.TASKS_BIND_RELATION_REQUEST, bindRelation);
  yield takeLatest(types.TASKS_GET_INCOME_LIST_REQUEST, getIncomeList);
  yield takeLatest(types.TASKS_CHANGE_INCOME_TAB, getIncomeList);
  yield takeLatest(types.TASKS_APPLY_AGENT_REQUEST, applyAgent);
  yield takeLatest(types.TASKS_INVITE_STATS_REQUEST, getInviteStats);
  yield takeLatest(types.TASKS_START_TIME_REQUEST, startTaskTime);
  yield takeLatest(types.TASKS_INTERRUPT_TIME_REQUEST, interruptTime);
}
