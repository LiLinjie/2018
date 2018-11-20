export const MENU = [
  {
    url: '/ad',
    code: 'AD',
    icon: 'bars',
    name: '广告订单'
  },
  {
    url: '/feedback',
    code: 'FEEDBACK',
    icon: 'customer-service',
    name: '用户反馈'
  }
];

export const adOrderStatus = [{
  key: 'PEND',
  value: '待审核订单'
},{
  key: 'PASS',
  value: '已通过订单'
},{
  key: 'REJECT',
  value: '已拒绝订单'
}];

export function getAdOrderStatus (status) {
  let ret = adOrderStatus.find(item => item.key === status);
  if (ret) {
    return ret.value;
  }
  return '';
}
