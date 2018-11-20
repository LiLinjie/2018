import React from 'react';
import './item.less';
import { getShowPrice, encryptTxt, } from '../../../utils'
import Deliver from '../../Deliver'
import { NEW_USER_TASK_ID, tasksTrace, getRandomMode } from '../../../constants/tasks'
import { linkTo } from '../../../utils/url'

export default class Item extends React.PureComponent {
  goTaskDetail = ({ tit, mode, url, userId }) => {
    linkTo(url);
  }

  /**
   * 得到任务明细的地址
   * @param  {Number} options.id            详情页 id
   * @param  {String} options.code          邀请码
   * @param  {String} options.mode          新手进入的页面模式
   * @param  {Boolen} options.isNewUserTask 是否是新手任务
   * @param  {Boolen} options.isLatestUser  是否是最新的用户（第四期需求加入）
   * @return {String}                       详情页的地址
   */
  getDetailUrl({ id, code, mode, fromPage, isNewUserTask, isLatestUser }) {
    const pageMode = getRandomMode(mode); // 页面的随机展示模式
    const normalDetailUrl = `/taskDetail?id=${id}&code=${code}&mode=${pageMode}&fromPage=${fromPage}`; // 常规任务链接

    // 新手关注公众号任务链接
    const noviceTaskUrl = `/noviceTaskDetail?id=${id}&code=${code}&mode=${pageMode}`;
    const noviceTasksUrl = `/noviceTasks?code=${code}`; // 新手任务列表链接

    // 第四期开始判断新进的用户，跳转至新手任务列表页
    if (isLatestUser && isNewUserTask) return noviceTasksUrl;
    const detailUrl = !isNewUserTask ? normalDetailUrl : noviceTaskUrl; // 详情链接
    return detailUrl;
  }

  render () {
    const { item, isActive, isEnd, isWillActive, code, role, mode, fromPage, userId, isLatestUser } = this.props;
    const { status, urls, hasOrder, name, description, surplusNum, estimateTotalAmount, earnedTotalAmount, id, } = item;
    const showJoinedTag = hasOrder; // 是否参与过活动
    const isNewUserTask = (id === NEW_USER_TASK_ID); // 新手任务
    const showNewUserTag = isNewUserTask && !hasOrder;; // 显示新手任务图标
    const detailUrl = this.getDetailUrl({ id, code, mode, fromPage, isNewUserTask, isLatestUser }) // 详情链接

    // 是否对展示文本: 进行中或即将开始 且为注册用户或者任务为新手任务
    const isDisplayTxt = (isActive || isWillActive) && (role || isNewUserTask);
    const traceMode = role ? '已注册用户展示模式' : mode;

    return (
      <li className={`task-item ${showNewUserTag ? 'new-user-task' : ''}`}>
        <div onClick={() => { this.goTaskDetail({ tit: name, mode: traceMode, url: detailUrl, userId }) }}>
          {
            showJoinedTag && <div className="join-tag">已参与</div>
          }
          {
            showNewUserTag && <div style={{fontSize: 0}}>
              <div className="new-user-task-tag">新手任务</div>
              <Deliver height=".18rem" />
            </div>
          }
          <div className="info">
            <div className="name">{isDisplayTxt ? name : encryptTxt(name)}</div>
            <div className="desc">{isDisplayTxt ? description : encryptTxt(description)}</div>
            <div className="flex justify-between items-center">
              {
                isActive
                  && <div className="tag count">
                      {(typeof surplusNum === 'number') ? `剩余${surplusNum}份` : '不限量'}
                    </div>
              }
              {
                isWillActive && <div className="tag end">即将开始</div>
              }
              {
                isEnd && <div className="tag end">已结束</div>
              }
              {
                (isActive || isWillActive)
                  && (
                      <div className={`profit ${isWillActive ? 'inactive' : ''}`}>
                        预计赚:
                        <span className="price price-cny">
                          {getShowPrice(estimateTotalAmount)}
                        </span>
                        <span className={`link-icon ${isWillActive ? 'inactive' : ''}`}></span>
                      </div>
                    )
              }
              {
                (isEnd && earnedTotalAmount)
                  ? (
                      <div className="profit end">
                        已赚:
                        <span className="price price-cny">
                          {getShowPrice(earnedTotalAmount)}
                        </span>
                      </div>
                    )
                  : null
              }
            </div>
          </div>
        </div>
      </li>
    )
  }
}
