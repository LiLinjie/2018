import { Map, fromJS } from 'immutable';
import * as types from '../../constants/types';

export function dataTemp (state = fromJS({
  loading: false
}), { type, payload }) {
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return state.merge({
        loading: true
      });
    case types.USER_LOGIN_SUCCESS:
    case types.USER_LOGIN_FAILURE:
      return state.merge({
        loading: false
      });
    default:
      return state;
  }
}

export function baseInfo (state = Map(), { type, payload }) {
  switch (type) {
    case types.USER_INFO_SUCCESS:
      return fromJS(payload);
    default:
      return state;
  }
}
