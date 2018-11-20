import * as types from '../../constants/types';
import { LOCATION_CHANGE } from 'react-router-redux';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import * as service from '../../services/ad';
import { getUrlQuery} from "../../utils";
import moment from 'moment';
import { message } from 'antd';

export function *getList () {
  try {
    let {...otherQuery } = getUrlQuery();
    let params = {
      page: 0,
      size: 20,
      ...otherQuery
    };
    // 广告列表，解析状态条件
    // if (!otherQuery.agentAdvertiseStatus) {
    //   params.activityStatusList = ((activityStatusList === AD_ALL_STATUS) || (!activityStatusList))
    //     ? [] : [activityStatusList]
    // }
    const res = yield call(service.getList, params);
    if (res.status === 1) {
      yield put({
        type: types.AD_LIST_SUCCESS,
        payload: res.data
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export function * handleLocationChange ({payload: {pathname}}) {
  switch (pathname) {
    case '/ad':
      yield put({type: types.AD_LIST_REQUEST, payload: null});
      break;
  }
}

export function * exportAd (state) {
  const params = getUrlQuery();
  let data = {
    agentAdvertiseStatus: 'PASS',
    ...params,
    // publishStartTime: params.publishStartTime ? moment(params.publishStartTime).startOf('day').valueOf() : undefined,
    // publishEndTime: params.publishEndTime ? moment(params.publishEndTime).endOf('day').valueOf() : undefined,
    createStartTime: params.createStartTime ? moment(params.createStartTime).startOf('day').valueOf() : undefined,
    createEndTime: params.createEndTime ? moment(params.createEndTime).endOf('day').valueOf() : undefined,
  };
  delete data.page;
  delete data.size;
  service.exportAd(data);
}

/*佣金设置*/
export function *handleSetRate ({payload}) {
  const { nextAction } = payload;
  const rateInfo = yield select(s => s.getIn(['ad', 'rateInfo']).toJS());
  if (rateInfo.rate * 100 < rateInfo.oneRate * 100) {
    message.error('下级佣金应小于自身佣金！');
    return;
  } else if (rateInfo.rate * 100 < rateInfo.userRate * 100) {
    message.error('用户佣金应小于自身佣金！');
    return;
  }
  const params = {
    row: rateInfo.row,
    rate: rateInfo.rate * 100,
    onRate: rateInfo.oneRate * 100,
    userRate: rateInfo.userRate * 100
  };
  console.log(params);
  try {
    // const res = yield call(service.setRate, params);
    // if (res.status === 1) {
    //   yield put({type: types.AD_RATE_SETTING_SUCCESS, payload: null});
    //   message.success('操作成功!');
    //   yield put({type: types.AD_RATE_MODAL_HIDE});
    //   if (nextAction) {
    //     yield put(nextAction);
    //   }
    // }
  } catch (e) {
    console.log(e);
  }
}

/*批量结算*/
export function *batchSettle ({payload}) {
  const { nextAction, rows } = payload;
  const selectedRows = yield select(s => s.getIn(['ad', 'selectedRows']));
  if ((!rows || !rows.length) && (!selectedRows || !selectedRows.length)) {
    message.error('请选择要操作的行');
    return;
  }
  try {
    let actionRows = !!rows && rows.length ? rows : selectedRows;
    actionRows = actionRows.map((i, idx) => {
      return {
        id: i.id
      }
    });
    console.log(actionRows);
    // const res = yield call(service.batchSettle, [...actionRows]);
    // if (res.status === 1) {
    //   yield put({type: types.AD_BATCH_SETTLE_SUCCESS, payload: null});
    //   message.success('操作成功!');
    //   if (nextAction) {
    //     yield put(nextAction);
    //   }
    // }
  } catch (e) {
    console.log(e);
  }
}

/*批量拒绝*/
export function *batchReject ({payload}) {
  const { nextAction } = payload;
  const selectedRows = yield select(s => s.getIn(['ad', 'selectedRows']));
  const rejectInfo = yield select(s => s.getIn(['ad', 'rejectInfo']).toJS());
  const { rows, remark } = rejectInfo;
  if (!rows.length && (!selectedRows || !selectedRows.length)) {
    message.error('请选择要操作的行');
    return;
  }
  try {
    let actionRows = rows.length ? rows : selectedRows;
    actionRows = actionRows.map((i, idx) => {
      return {
        id: i.id,
        orderNo: i.orderNo || undefined,
        type: i.type || undefined,
        agentAdvertiseStatus: 'REJECT',
        remark
      }
    });
    const res = yield call(service.batchRefuse, [...actionRows]);
    if (res.status === 1) {
      yield put({type: types.AD_BATCH_REJECT_SUCCESS, payload: null});
      message.success('操作成功!');
      yield put({type: types.AD_REJECT_MODAL_HIDE});
      if (nextAction) {
        yield put(nextAction);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default function *() {
  yield takeLatest(types.AD_LIST_REQUEST, getList);
  yield takeLatest(LOCATION_CHANGE, handleLocationChange);
  yield takeLatest(types.AD_EXPORT_REQUEST, exportAd);
  yield takeLatest(types.AD_BATCH_SETTLE_REQUEST, batchSettle);
  yield takeLatest(types.AD_BATCH_REJECT_REQUEST, batchReject);
  yield takeLatest(types.AD_RATE_SETTING_REQUEST, handleSetRate);
}
