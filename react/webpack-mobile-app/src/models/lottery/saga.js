import * as types from '../../constants/actionTypes';
import * as service from '../../services/lottery';
import { call, put, take, select, fork, takeLatest} from 'redux-saga/effects';

export function *getInit ({payload}) {
  try {
    const res = yield call(service.getList);
    yield put({
      type: types.LOTTERY_GET_TIMES_REQUEST
    });
    yield put({
      type: types.LOTTERY_INIT_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    console.log(e);
  }
}

export function *getTimes ({payload}) {
  try {
    const res = yield call(service.getTimes);
    yield put({
      type: types.LOTTERY_GET_TIMES_SUCCESS,
      payload: res.data
    });
  } catch (e) {
    console.log(e);
  }
}

export function *play ({payload}) {
  try {
    const res = yield call(service.play);
    const lotteryInfo = yield select(s => s.getIn(['lottery', 'lotteryInfo']).toJS());
    if (res.status === 1) {
      yield put({
        type: types.LOTTERY_GET_TIMES_REQUEST
      });
      const lotteryId = lotteryInfo.list.findIndex(i => i.code === res.data.code);
      if (res.data.type === 'REDPACKET') {
        yield put({ type: types.LOTTERY_RED_BAG, payload: res.data });
      }
      yield put({
        type: types.LOTTERY_DO_PLAY_SUCCESS,
        payload: lotteryId
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export default function *() {
  yield takeLatest(types.LOTTERY_INIT_REQUEST, getInit);
  yield takeLatest(types.LOTTERY_GET_TIMES_REQUEST, getTimes);
  yield takeLatest(types.LOTTERY_DO_PLAY_REQUEST, play);
}
