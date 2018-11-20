import * as types from '../../constants/actionTypes';
import { put, take, fork, select, spawn, join, cancel, race, call, apply, cps, takeLatest } from 'redux-saga/effects';
import { setWxShare, init } from '../../utils/wechat';
import { setDocumentTitle } from '../../utils';


function *updateViewConfig (action) {
  const {payload: {documentTitle, shareData}} = action;
  setDocumentTitle(documentTitle);
  if (shareData) {
    init();
    const shareData = yield select(state => state.getIn(['viewConfig', 'shareData']).toJS());
    yield call(setWxShare, shareData);
  }
}

export default function * () {
  yield takeLatest(types.SET_VIEW_CONFIG, updateViewConfig);
}
