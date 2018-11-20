import * as types from '../../constants/actionTypes';
import { fromJS, List, Map } from 'immutable';

export function documentTitle (state = '加载中...', {type, payload = {}}) {
  switch (type) {
    case types.SET_VIEW_CONFIG:
      return payload.documentTitle || state;
    default:
      return state;
  }
}

export function activeFooterItem (state = '-1', {type, payload = {}}) {
  switch (type) {
    case types.SET_VIEW_CONFIG:
      return payload.activeFooterItem || state;
    default:
      return state;
  }
}

export function dark (state = true, {type, payload = {}}) {
  switch (type) {
    case types.SET_VIEW_CONFIG:
      return payload.dark === undefined ? true : payload.dark;
    default:
      return state;
  }
}

const initialShareData = fromJS({
  title: '悦惠赏金联盟',
  desc: '',
  link: window.location.href,
  imgUrl: 'http://img-cows.kkkd.com/FgteCBy2P7JNj2R8R4Aiz7gObkRm'
});

export function shareData (state = initialShareData, {type, payload}) {
  switch (type) {
    case types.SET_VIEW_CONFIG: {
      if (payload.shareData) {
        if (payload.shareData === 'initial') {
          return initialShareData;
        }
        return state.merge(payload.shareData);
      }
      return state;
    }
    default:
      return state;
  }
}
