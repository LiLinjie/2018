import * as types from '../../constants/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { delay } from 'redux-saga';
import * as service from '../../services/user';
import { message } from 'antd';
import { getUrlQuery } from '../../utils';

/*登录*/
export function *handleLogin ({payload}) {
  try {
    const params = {
      appId: 'https://xuanwonainiutest.com/app-id.json',
      ...payload
    };
    const res = yield call(service.login, params);
    if (res.status ===1) {
      message.success('登录成功，即将跳转');
      yield call(delay, 1000);
      const query = getUrlQuery();
      if (query.redirect) {
        window.location.href = encodeURI(decodeURIComponent(query.redirect));
      } else {
        window.location.href = '/';
      }
    } else {
      const msg = res.data.msg || '登录失败';
      message.error(msg);
    }
  } catch (e) {
    console.log(e);
    yield put({type: types.USER_LOGIN_FAILURE});
  }
}

/*退出*/
export function *handleLogout() {
  try {
    const res = yield call(service.logout);
    if (res.status === 1) {
      window.localStorage.clear();
      window.sessionStorage.clear();
      if (!window.location.pathname.match(/\/login/)) {
        const href = encodeURIComponent(window.location.pathname);
        window.location = `/login?redirect=${href}`;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/*获取用户信息*/
export function *getUserInfo() {
  try {
    const res = yield call(service.getUserInfo);
    if (res.status === 1) {
      yield put({
        type: types.USER_INFO_SUCCESS,
        payload: res.data
      });
    } else {
      yield put({ type: types.USER_LOGIN_FAILURE });
    }
  } catch (e) {
    console.log(e);
  }
}

/*初始化用户*/
export function *initUserAuthData() {
  if (window.location.pathname === '/login') {
    return;
  }
  yield put({type: types.USER_INFO_REQUEST});
}

export default function *() {
  yield takeLatest(types.USER_LOGIN_REQUEST, handleLogin);
  yield takeLatest(types.USER_LOGOUT_REQUEST, handleLogout);
  yield takeLatest(types.USER_INFO_REQUEST, getUserInfo);
  yield takeLatest(LOCATION_CHANGE, initUserAuthData);
}
