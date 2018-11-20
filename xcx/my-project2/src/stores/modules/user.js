import * as service from '../../services/user'

const state = {
  userInfo: {}
};

const actions = {
  login ({ commit }) {
    wx.login({
      success (res) {
        const code = res.code
        if (code) {
          wx.getUserInfo({
            withCredentials: true,
            async success (res) {
              const { userInfo, rawData, signature, encryptedData, iv } = res;
              wx.setStorageSync('xcxUserInfo', userInfo);
              const params = {
                channel: 'wanquan_xcx',
                domain: 49,
                code,
                encryptedData,
                iv,
                rawData,
                signature
              }
              const loginRes = await service.login(params);
              console.log(loginRes);
            }
          })
        }
      }
    })
  },
  async getUserInfo ({ commit }) {
    const res = await service.getUserInfo();
    commit('setUserInfo', res.data);
  }
};

const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  }
};

export default {
  state,
  actions,
  mutations
}
