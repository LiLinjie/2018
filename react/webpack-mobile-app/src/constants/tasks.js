let isDebug = false;

try {
  isDebug = process.env.NODE_ENV === 'development'
} catch (e) {
  console.log(e)
}
// 身份： AGENT:代理, OPERATOR:运营商, COMMON:消费者
export const AGENT_ROLE = 'AGENT';
export const OPERATOR_ROLE = 'OPERATOR';
export const COMMON_ROLE = 'COMMON';

// 订单状态配置
export const REJECT_STATUS = 'REJECT'; // 拒绝状态
export const STATUS_CONFIG = {
  'PEND': {
    label: '审核中',
    color: '#93969D'
  },
  'PASS': {
    label: '已通过',
    color: '#000'
  },
  [REJECT_STATUS]: {
    label: '未通过',
    color: '#FF6F2D'
  }
}

export const ACTIVITY_AUTO_END_STATUS = 'PAUSE_AUTO'; // 已结束状态：自动
export const ACTIVITY_HAND_END_STATUS = 'PAUSE_HAND'; // 已结束状态：手动
export const ACTIVITY_START_STATUS = 'START'; // 活动开始状态
export const ACTIVITY_WILL_START_STATUS = 'PRESTART'; // 活动即将开始状态

// 判断活动是否已结束
export function isActivityEnd(status) {
  if (
    (status === ACTIVITY_AUTO_END_STATUS)
    || (status === ACTIVITY_HAND_END_STATUS)
  ) {
    return true;
  }

  return false;
}

// 进入到首页的模式（a列表，b列表）
export const MODE_A = 'a';
export const MODE_B = 'b';

// 随机的模式
export function getRandomMode(mode) {
  if (mode !== 'undefined' && mode) return mode;
  const randomMode = ((Date.now() % 2) === 0) ? MODE_A : MODE_B;
  return randomMode;
}

export const NEW_USER_TASK_ID = 375; // 新手任务的id

// 新手任务步骤
export const PROCESS_CONFIG = [
  {
    title: '微信扫码关注公众号',
    imgUrl: isDebug
      ? 'http://img-cows.kkkd.com/FkjS3S3cJPyfWgqQctd9ClakCngH'
      : 'http://img-cows.kkkd.com/Fqm0NAD0fMU4g5EC1hdP-pXf4-YV',
  },
  {
    title: '点击红包链接返回此页面',
    imgUrl: 'http://img-cows.kkkd.com/FvdWs4Fwbtwvue-Moi9szpPICepj'
  },
  {
    title: '领取奖励',
    imgUrl: 'http://img-cows.kkkd.com/FrPrP6pY8Hw2sRwGkog6ESpPZmDv'
  },
];

export const OVER_TIME_TASK = -1; // 任务倒计时超时的时间值
export const NO_RECEIVE_TASK = 0; // 未领取任务状态的时间值

export const DEFAULT_SHARE_IMG_URL = 'http://xaya.qiniudn.com/FgGv1PH4T_sVtoDDLTKc0l3Ts5a7'; // 默认分享图

// 新手任务完成状态
export const NOVICE_TASK_STATUE = {
  NO_OPEN_STATUS: 0, // 待开启
  PENDING_STATUS: 1, // 待完成
  DONE_STATUS: 2, // 已完成
  RECEIVED_STATUS: 3, // 已领取
};

// 新手任务的类型
export const NOVICE_RED_BAG_TYPE = 1; // 新手奖励红包类型
export const FOLLOW_TASK_TYPE = 2; // 新手关注任务类型
export const STRATEGY_TASK_TYPE = 3; // 攻略任务类型
export const SHARE_TASK_TYPE = 4; // 分享任务类型
export const NORMAL_TASK_TYPE = 5; // 常规任务类型
export const NOVICE_TASKS_AWARD_TYPE = 6; // 新手任务流大红包类型

// 新手任务详情的配置
export const NOVICE_TASKS_CONFIG = [
  {
    title: '浏览赚钱攻略',
    type: STRATEGY_TASK_TYPE
  },
  {
    title: '分享到微信群',
    type: SHARE_TASK_TYPE
  },
  {
    title: '关注公众号',
    type: FOLLOW_TASK_TYPE
  },
  {
    title: '完成一次任务',
    type: NORMAL_TASK_TYPE
  }
];

export const ABLE_RECEIVE_AWARD_STATUS = 1; // 红包可领取状态
export const RECEIVED_AWARD_STATUS = 3; // 红包已领取状态

export const NOVICE_TASKS_PAGE = 'novice_tasks_page'; // 新手任务流页面





