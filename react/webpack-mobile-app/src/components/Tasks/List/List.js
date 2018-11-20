import React from 'react';
import TaskItem from './Item';
import './list.less';

export default class List extends React.PureComponent {
  render () {
    const { list, progressStatus, handleTabChange, code, role, mode, fromPage, userId, isLatestUser, } = this.props;
    const isActive = progressStatus.indexOf('IN_PROGRESS') > -1; // 进行中
    const isEnd = progressStatus.indexOf('OVER') > -1; // 已结束
    const isWillActive = progressStatus.indexOf('PRESTART') > -1; // 即将开始
    const showList = !!list.length;

    return (
      <div className="task-list-wrap">
        <ul className="task-tab flex">
          <li className={isActive ? 'active' : ''} onClick={() => handleTabChange('IN_PROGRESS')}>进行中</li>
          <li className={isWillActive ? 'active' : ''} onClick={() => handleTabChange('PRESTART')}>即将开始</li>
          <li className={isEnd ? 'active' : ''} onClick={() => handleTabChange('OVER')}>已结束</li>
        </ul>
        { showList && <ul className="task-list">
          {
            list.map((i, idx) => {
              return <TaskItem userId={userId} role={role} mode={mode} code={code} fromPage={fromPage} item={i} key={idx} isActive={isActive} isEnd={isEnd} isWillActive={isWillActive} isLatestUser={isLatestUser} />
            })
          }
        </ul> }
      </div>
    )
  }
}
