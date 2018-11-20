import * as types from '../../constants/actionTypes';
import { fromJS, Map, List } from 'immutable';

// 用户信息
export function userInfo (state = Map(), { type, payload }) {
  switch (type) {
    case types.TASKS_WANGZHUAN_USER_INFO_SUCCESS:
      return fromJS(payload);
    default:
      return state;
  }
}
