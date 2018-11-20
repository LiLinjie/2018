import * as types from '../../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';

export function lotteryInfo (state = fromJS({
  list: [],
  leftTime: 0,
  lotteryId: -1
}), { type, payload }) {
  switch (type) {
    case types.LOTTERY_INIT_SUCCESS:
      return state.merge({
        list: payload
      });
    case types.LOTTERY_DO_PLAY_SUCCESS:
      return state.merge({
        lotteryId: payload
      });
    case types.LOTTERY_GET_TIMES_SUCCESS:
      return state.merge({
        leftTime: payload
      });
    default:
      return state;
  }
}
