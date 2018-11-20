import React from 'react';
import './index.less';
import Deliver from '../../Deliver'
import { connect } from 'react-redux'
import * as types from '../../../constants/actionTypes'
import { getShowPrice } from '../../../utils'

// 计算时间差
function getShowTime (time) {
  let timeCountDown, timeShow;
  timeCountDown = ((new Date()).getTime() - time) / 1000;
  if (timeCountDown < 60) {
    timeShow = '刚刚';
  } else if (timeCountDown >= 60 && timeCountDown < 3600) {
    timeCountDown = Math.floor(timeCountDown / 60);
    timeShow = `${timeCountDown}分钟前`;
  } else if (timeCountDown >= 3600 && timeCountDown < 86400) {
    timeCountDown = Math.floor(timeCountDown / 60 / 60);
    timeShow = `${timeCountDown}小时前`;
  } else if (timeCountDown >= 86400 && timeCountDown < 172800) {
    timeCountDown = Math.floor(timeCountDown / 60 / 60 / 24);
    timeShow = `昨天`;
  }  else if (timeCountDown >= 172800 && timeCountDown < 604800) {
    timeCountDown = Math.floor(timeCountDown / 60 / 60 / 24);
    timeShow = `${timeCountDown}天前`;
  } else {
    const dates = new Date(time);
    const year = dates.getFullYear();
    const month = dates.getMonth() + 1;
    const date = dates.getDate();
    timeShow = `${year}年${month}月${date}日`;
  }
  return timeShow;
}

@connect(
  state => ({
    broadcast: state.getIn(['tasks', 'broadcastList'])
  }),
  dispatch => ({
    getList() {
      dispatch({
        type: types.TASKS_BROADCAST_REQUEST
      })
    }
  })
)
export default class Index extends React.PureComponent {
  componentWillMount() {
    this.props.getList();
  }

  render () {
    let { broadcast } = this.props;
    broadcast = broadcast.toJS()
    const len = broadcast ? broadcast.length : 0;
    const duration = (len || 20) * 4 + 's'; // 轮播显示一轮的时间

    return (
      <div className="broadcast">
        { len ? <ul
          className="list clearfix"
          style={{ animationDuration: duration, WebkitAnimationDuration: duration }}
        >
          {
            broadcast.map((i, idx) => {
              const { finishedTime, nickName, amount } = i;
              const diffTime = getShowTime(finishedTime || Date.now())
              return (
                <li key={idx}>
                  {diffTime} {nickName || ''}完成任务，赚到￥{getShowPrice(amount)}
                </li>
              )
            })
          }
        </ul> : null }
      </div>
    )
  }
}
