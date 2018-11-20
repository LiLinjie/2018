import * as types from '../types';

const state = {
  systemInfo: {
    isX: false,
    isAndroid: false,
    pixelRatio: 2
  }
};

const mutations = {
  [types.SET_SYSTEM_INFO] (state, data) {
    const systemInfo = wx.getSystemInfoSync();
    state.systemInfo = systemInfo;
    state.systemInfo.isX = /iphone10|iphone x|iphone11|iphone12/i.test(systemInfo.model);
    state.systemInfo.isAndroid = /android/i.test(systemInfo.system);
  }
};

export default {
  state,
  mutations
}
