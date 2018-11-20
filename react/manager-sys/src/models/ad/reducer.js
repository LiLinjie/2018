import * as types from '../../constants/types';
import { Map, List, fromJS } from 'immutable';

export function selectedRowKeys (state = [], {type, payload}) {
  switch (type) {
    case types.AD_SELECT_KEY_REQUEST:
      return payload.keys;
    case types.AD_LIST_SUCCESS:
      return [];
    default:
      return state;
  }
}

export function selectedRows (state = [], {type, payload}) {
  switch (type) {
    case types.AD_SELECT_KEY_REQUEST:
      return payload.rows;
    case types.AD_LIST_SUCCESS:
      return [];
    default:
      return state;
  }
}

const listInit = fromJS({
  loading: false,
  data: [],
  page: 0,
  size: 10,
  totalItem: 0
});
export function adList (state = listInit, {type, payload}) {
  switch (type) {
    case types.AD_LIST_REQUEST:
      return listInit.merge({loading: true});
    case types.AD_LIST_SUCCESS:
      return state.merge({
        ...payload,
        loading: false
      });
    case types.AD_LIST_FAILURE:
      return state.merge({
        loading: false
      });
    default:
      return state;
  }
}

const preImgInit = fromJS({
  show: false,
  img: []
});
export function imgPreview (state = preImgInit, { type, payload }) {
  switch (type) {
    case types.AD_ACTIVITY_IMG_SHOW:
      return state.merge({
        show: true,
        img: payload
      });
    case types.AD_ACTIVITY_IMG_HIDE:
      return state.merge({
        show: false
      });
    default:
      return state;
  }
}

const rejectInit = fromJS({
  show: false,
  rows: [],
  remark: ''
});
export function rejectInfo (state = preImgInit, { type, payload }) {
  switch (type) {
    case types.AD_REJECT_MODAL_SHOW:
      return state.merge({
        show: true,
        rows: payload.rows,
        remark: ''
      });
    case types.AD_REJECT_MODAL_HIDE:
      return rejectInit;
    case types.AD_REJECT_REMARK_CHANGE:
      return state.merge({
        remark: payload
      });
    default:
      return state;
      return state;
  }
}

const rateInit = fromJS({
  show: false,
  rate: '',
  oneRate: '',
  userRate: '',
  row: ''
});
export function rateInfo (state = rateInit, { type, payload }) {
  switch (type) {
    case types.AD_RATE_MODAL_SHOW:
      return state.merge({
        show: true,
        row: payload
      });
    case types.AD_RATE_MODAL_HIDE:
      return rateInit;
    case types.AD_RATE_SETTING_CHANGE:
      return state.merge({
        ...payload
      });
    default:
      return state;
  }
}


