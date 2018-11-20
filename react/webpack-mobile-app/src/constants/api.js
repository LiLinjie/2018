import {getSetting} from '../../config';

export const API_ROOT = getSetting('apiRoot');
export const API_MALL = getSetting('apiMall');
export const API_QF = getSetting('apiQf');
export const API_MAIDAO = getSetting('apiMaidao');

function api(url, type = 'ROOT') {
    let key;
    switch (type) {
        case 'ROOT':
            key = API_ROOT;
            break;
        case 'MALL':
            key = API_MALL;
            break;
        case 'QF':
            key = API_QF;
            break;
        case 'MAIDAO':
            key = API_MAIDAO;
            break;
        default:
            key = API_ROOT;
    }
    return `${key}${url}`;
}

export const UC = {
  APPLY_AGENT: api('/agent/advertise/wangzhuan/user/upgrade-role'),
  REGISTER: api('/agent/advertise/wangzhuan/user/bind/check'),
  BIND_RELATION: api('/agent/user/bind'),
  AWARD_ENTER_ACCOUNT: api('/agent/advertise/wangzhuan/bind/user/success'),
  USER_INFO: api('/agent/advertise/wangzhuan/user/detail'),
};

export const COMMON = {
  SAVE: api('/agent/image/save'),
  SAVE_MEDIA: api('/agent/weixin/save/mediaId'),
  GET_REG: api('/agent/sms/reg')
};

export const TASKS = {
  LIST: api('/agent/advertise/wangzhuan/activity/page'),
  DETAIL: api('/agent/advertise/wangzhuan/activity/detail'),
  INCOME_LIST: api('/agent/advertise/wangzhuan/order/page/income-trace'),
  ORDER_LIST: api('/agent/advertise/wangzhuan/order/list'),
  UPLOAD_ORDER: api('/agent/advertise/wangzhuan/order/create'),
  INCOME: api('/agent/advertise/wangzhuan/order/total-income'),
  BROADCAST: api('/agent/advertise/wangzhuan/order/page/finished'),
  APPLY_AGENT: api('/agent/advertise/wangzhuan/user/upgrade-role'),
  REGISTER: api('/agent/advertise/wangzhuan/user/bind/check'),
  BIND_RELATION: api('/agent/user/bind'),

  CHECK: api('/agent/advertiseOrderActivity/can-uploadAdvertiseOrder'),
  UPLOAD_NUM: api('/agent/advertiseOrderActivity/getUserCanUploadOrderNum'),
  UPLOAD: api('/agent/advertiseOrderActivity/uploadAdvertiseOrder'),
  SAVE: api('/agent/image/save'),
  RED_BAG_INFO: api('/agent/advertise/wangzhuan/redpacket/detail'),
  GET_AWARD: api('/agent/advertise/wangzhuan/redpacket/receive'),
  AWARD_ENTER_ACCOUNT: api('/agent/advertise/wangzhuan/bind/user/success'),
  USER_INFO: api('/agent/advertise/wangzhuan/user/detail'),
  INVITE_RED_BAG_INFO: api('/agent/advertise/wangzhuan/master-redpacket/detail'),
  GET_INVITE_AWARD: api('/agent/advertise/wangzhuan/master-redpacket/receive'),
  INVITE_STATISTIC: api('/agent/advertise/wangzhuan/master-redpacket/statistic'),  //师傅红包统计
  TASK_START_TIME: api('/agent/advertise/wangzhuan/start/ad'),
  TASK_INTERRUPT_TIME: api('/agent/advertise/wangzhuan/refuse/ad'),
  NOVICE_TASKS: api('/agent/advertise/wangzhuan/tiro-task/detail'), // 新手任务列表详情
  NOVICE_REST_TASKS_AWARD: api('/agent/advertise/wangzhuan/tiro-task/unfinished'), // 新手剩余任务奖励金额
  SAVE_MEDIA: api('/agent/weixin/save/mediaId'),
  GET_REG: api('/agent/sms/reg')
};

export const LOTTERY = {
  LIST: api('/agent/advertise/wangzhuan/lottery/award/list'),
  GET_TIMES: api('/agent/advertise/wangzhuan/lottery/remaining-times'),
  PLAY: api('/agent/advertise/wangzhuan/lottery')
};
