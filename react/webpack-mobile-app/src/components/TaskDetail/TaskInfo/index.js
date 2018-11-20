import React from 'react';
import './index.less'
import { getShowPrice, encryptTxt, } from '../../../utils'
import { isActivityEnd, ACTIVITY_START_STATUS, ACTIVITY_WILL_START_STATUS } from '../../../constants/tasks'
import Deliver from '../../../components/Deliver'

const TaskInfo = (props) => {
  const { msg, role, extraContent, } = props;
  const { name, surplusNum, estimateTotalAmount, earnedTotalAmount, status, amount, orderLimit } = msg;
  const isEnd = isActivityEnd(status);
  const isActive = status === ACTIVITY_START_STATUS;
  const isWillActive = status === ACTIVITY_WILL_START_STATUS;

  return (
    <div className="task-info">
      <div className="summary flex">
        <div className="desc-wrap flex-auto">
          <div className="name">{role && !isEnd ? name : encryptTxt(name)}</div>
          <div className="desc">
            佣金: {getShowPrice(amount)}元/份,每人最多领取{orderLimit}份
          </div>
          <div className="extra-content">
            { extraContent ? extraContent : <Deliver height=".58rem" /> }
          </div>
          <div className="flex justify-between items-center footer-desc">
            {
              isActive
                && <div className="count">{(typeof surplusNum === 'number') ? `剩余${surplusNum}份` : '不限量'}</div>
            }
            {
              isWillActive && <div className="end">即将开始</div>
            }
            {
              isEnd && <div className="end">已结束</div>
            }
            { (isEnd && earnedTotalAmount) ? (
                <div className="profit">
                  已赚:
                  <span className="price price-cny">
                   {getShowPrice(earnedTotalAmount)}
                  </span>
                </div>
              ) : null }
            { !isEnd ? (
                <div className={`profit ${isWillActive ? 'inactive' : ''}`}>
                  {earnedTotalAmount ? '已' : '预计'}赚:&nbsp;
                  <span className="price price-cny">
                    {getShowPrice(earnedTotalAmount || estimateTotalAmount)}
                  </span>
                </div>
              ) : null }
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskInfo;
