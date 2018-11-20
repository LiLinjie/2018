import * as service from '../../services/user';
import * as types from '../types';
import wxAsync from '../../utils/wxAsync';
import config from '../../config';
import { getPrice } from '../../utils';
import { DEFAULT_CODE } from '../../constants';

const state = {
  isAuthorized: false,
  wxUserInfo: '',
  userDetail: '',
  homeRes: '',
  amountRes: 0,
  inviteCode: DEFAULT_CODE,
  shareStat: 0,
  xcxToken: ''
};

const actions = {
  async login ({ dispatch, commit }, payload) {
    const setting = await wxAsync({api: 'getSetting'});
    if (setting && setting.authSetting && setting.authSetting['scope.userInfo']) {
      // 用户已授权
      commit('setAuthorize', true);
      const loginRes = await wxAsync({
        api: 'login'
      });
      const { code } = loginRes;
      // 获取用户信息
      const userInfoRes = await wxAsync({
        api: 'getUserInfo'
      });
      const { userInfo, rawData, signature, encryptedData, iv } = userInfoRes;
      wx.setStorageSync('xcxUserInfo', userInfo);
      commit('setUserInfo', userInfo);
      const params = {
        channel: config.channel,
        domain: config.domain,
        code,
        encryptedData,
        iv,
        rawData,
        signature
      }
      const res = await service.login(params);
      if (res.status === 1) {
        wx.setStorageSync('xcxToken', res.data.token);
        commit('setXcxToken', res.data.token);
      }
      console.log('用户已授权');
      return res;
    } else {
      console.log('用户还未授权过');
      commit('setAuthorize', false);
      return false;
    }
  },
  async getUserInfo ({ dispatch, commit }, payload) {
    const res = await service.getUserInfo();
    if (res.status === 1 && res.data && res.data.agentId) {
      if (res.data.status === 'CLOSE') {
        wx.showModal({
          title: '帐号异常',
          content: '您的帐号出现异常，请联系管理员',
          showCancel: false,
          confirmColor: '#ff2551'
        });
        return;
      }
      wx.setStorageSync('userDetail', res.data);
      commit('setUserDetail', res.data);
    }
  },
  async getPersonHome ({ dispatch, commit }) {
    const res = await service.getPersonHome();
    if (res.status === 1 && res.data) {
      res.data.lastMonthEffectAmount = getPrice(res.data.lastMonthEffectAmount);
      res.data.monthEffectAmount = getPrice(res.data.monthEffectAmount);
      commit(types.SET_HOME_DATA, res.data);
    }
  },
  async getPersonAmount ({ dispatch, commit }) {
    const res = await service.getPersonAmount();
    if (res.status === 1 && res.data) {
      res.data.amount = getPrice(res.data.amount);
      commit(types.SET_AMOUNT, res.data);
    }
  },
  async getShareStat ({ dispatch, commit }) {
    const res = await service.shareStat();
    if (res.status === 1 && res.data) {
      const shareStat = getPrice(res.data.totalAmont);
      commit(types.SET_SHARE_STAT, shareStat);
    }
  },
  async shareClick ({state, dispatch, commit }, payload) {
    const {shareUserId, productId = void 0} = payload;
    if (state.userDetail.agentId && shareUserId) {
      await service.shareClick(payload);
    }
  }
};

const mutations = {
  setAuthorize (state, data) {
    state.isAuthorized = data;
  },
  setUserInfo (state, data) {
    state.wxUserInfo = data;
  },
  setXcxToken (state, data) {
    state.xcxToken = data;
  },
  setUserDetail (state, data) {
    state.userDetail = data;
  },
  [types.SET_AMOUNT] (state, data) {
    state.amountRes = data;
  },
  [types.SET_HOME_DATA] (state, data) {
    state.homeRes = data;
  },
  [types.SET_SHARE_STAT] (state, data) {
    state.shareStat = data;
  },
  [types.SET_INVITE_CODE] (state, data) {
    state.inviteCode = data;
  }
};

export default {
  state,
  actions,
  mutations
}
