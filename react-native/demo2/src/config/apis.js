export const UC = {
  USER_INFO: '/uc/userInfo',
  REGISTER: '/agent/appUserLogin',
  GET_REG: '/agent/sms/reg',
  USER_DETAIL: '/agent/newUser/detail',
  USER_UNBIND: '/agent/user/changeUserName',
  USER_LOGIN: '/uc/tkLogin',
  USER_LOGOUT: '/uc/tklogout',
  USER_HYBRID_LOGIN: '/uc/tkAppLogin', // hybrid授权回调地址
  ACCOUNT_OVERVIEW: '/agent/account/overview', //暂时无用
  USER_MODIFYPASSWORD: '/agent/user/changepw',
  USER_BASEINFO_DETAIL: '/agent/user/getBaseInfo',
  USER_BASEINFO_MODIFY: '/agent/user/addBaseInfo',
  USER_BASEINFO: '/agent/user/isFinishBaseInfo',
  USER_SWITCHINFO: '/agent/weixin/detail',
  USER_RATE: '/agent/user/rate',
  WX_SAVE_SHARE: '/agent/weixin/saveShare',
  WX_CHECK_SHARE: '/agent/weixin/checkShare',
  WX_PERSONAL_INFO: '/agent/weixin/personDetail',
  WX_PERSONAL_BIND: '/agent/user/personBind',
  WX_USER_INFO: '/agent/newUser/detail'
};

export const PRODUCTS = {
  SEARCH:  '/product/mall/list/search',
  DETAIL: '/product/mall/promote',
  AGENT_SEARCH: '/product/agent/list/search',
  AGENT_DETAIL: '/product/agent/promote',
  AGENT_PWD: '/product/agent/promote',
  RECOMMEND: '/product/unite/list/recommand',
  DETAIL_ITEM: '/product/unite/item/detail/comId',
  PROD_DETAIL_ITEM: '/product/unite/item/detail',
  PRO_SUPER_LIST: '/product/unite/list/super/search',
  PRO_SUPER_DETAIL: '/product/mall/promote/super',
  PRO_COLLECT_LIST: '/product/agent/batch/promote',
  GUIDE_SEARCH: '/product/guide/list/search',
  GUIDE_SEARCH_NEW: '/product/guideProd/list/search',
  GUIDE_DETAIL_OLD: '/product/guide/promote',
  GUIDE_DETAIL: '/product/guideProd/detail',
  GUIDE_DETAIL_GZH: '/product/guideProd/wx/detail',
  GUIDE_CMS_DETAIL_GZH: '/product/guideProd/wx/promote',
  PRO_COLLECT_LIST_NEW: '/product/agent/batch/promoteNoMatch',
  PRO_DETAIL_PID: '/product/agent/promote/new',  // 共享pid 普通商品推广
  PRO_DETAIL_SUPER_PID: '/product/agent/promote/super'  // 共享pid 超级搜索商品推广
}
