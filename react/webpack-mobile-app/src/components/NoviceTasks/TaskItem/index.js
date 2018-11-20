import React from 'react';
import './index.less'
import { NOVICE_TASK_STATUE, } from '../../../constants/tasks'

const { DONE_STATUS, PENDING_STATUS, NO_OPEN_STATUS } = NOVICE_TASK_STATUE;

const TaskItem = (props) => {
  const { title, status, onDoTask, money } = props;
  const isNoOpen = status === NO_OPEN_STATUS; // 未开启
  const isPending = status === PENDING_STATUS; // 去完成
  const isDone = status >= DONE_STATUS; // 已完成

  return (
    <div className="novice-tasks-item flex items-center justify-between" onClick={onDoTask}>
      <div className="content flex items-center">
        <div className="red-bag-icon">
          <div className="money">
            <span>{money}</span><span className="unit">元</span>
          </div>
        </div>
        <div className="title">{ title }</div>
      </div>
      { isNoOpen && <button className="btn">待开启</button> }
      { isPending && <button className="btn active">去完成</button> }
      { isDone && <div className="done-status"></div> }
    </div>
  )
}

export default TaskItem;