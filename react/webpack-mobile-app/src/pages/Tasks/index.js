'use extensible';
import React from 'react';
import {connect} from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import Broadcast from '../../components/Tasks/Broadcast';
import UserInfo from '../../components/Tasks/UserInfo';
import List from '../../components/Tasks/List/List';
import Register from '../../components/Tasks/RegisterModal';
import TaskModal from '../../components/Tasks/TaskModal';
import RedBagModal from '../../components/Tasks/RedBagModal';
import LotteryIcon from '../../components/Tasks/LotteryIcon';
import * as types from '../../constants/actionTypes';
import './index.less';
import { COMMON_ROLE, getRandomMode, DEFAULT_SHARE_IMG_URL, NOVICE_RED_BAG_TYPE, NOVICE_TASKS_PAGE } from '../../constants/tasks';
import DataNone from '../../components/DataNone';
import { linkTo } from '../../utils/url';
import {getQuery, getShowPrice} from '../../utils'
import Link from '../../components/Link'
import NoviceTaskModal from '../../components/Tasks/NoviceTaskModal'

@connect(state => {
  return {
    userInfo: state.getIn(['user', 'userInfo']),
    dataSearch: state.getIn(['tasks', 'dataSearch']),
    isShowApplyModal: state.getIn(['tasks', 'isShowApplyModal']),
    showBindModal: state.getIn(['tasks', 'showBindModal']),
    income: state.getIn(['tasks', 'income']),
    redBagInfo: state.getIn(['tasks', 'redBagInfo']),
    isShowNoviceTaskModal: state.getIn(['tasks', 'isShowNoviceTaskModal']),
    restNoviceTaskAward: state.getIn(['tasks', 'restNoviceTaskAward']),
  }
}, (dispatch) => ({
  getList () {
    dispatch({
      type: types.TASKS_LIST_REQUEST
    });
  },
  getUserInfo () {
    dispatch({
      type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
    });
  },
  showRegister () {
    dispatch({
      type: types.TASKS_REGISTER_SHOW
    })
  },
  handleTabChange (payload) {
    dispatch({
      type: types.TASKS_TAB_CHANGE,
      payload
    })
  },
  showApplyModal () {
    dispatch({
      type: types.TASKS_APPLY_MODAL_SHOW
    })
  },
  hideApplyModal () {
    dispatch({
      type: types.TASKS_APPLY_MODAL_HIDE
    })
  },
  applyToAgent () {
    dispatch({
      type: types.TASKS_APPLY_AGENT_REQUEST,
    })
  },
  cancelBindModal() {
    dispatch({
      type: types.TASKS_BIND_MODAL_HIDE
    })
  },
  bindRelation() {
    dispatch({
      type: types.TASKS_BIND_RELATION_REQUEST
    })
  },
  getIncome() {
    dispatch({
      type: types.TASKS_GET_INCOME_REQUEST,
    })
  },
  getRedBagInfo(payload) {
    dispatch({
      type: types.TASKS_GET_RED_BAG_REQUEST,
      payload
    })
  },
  getInviteRedBagInfo() {
    dispatch({
      type: types.TASKS_GET_INVITE_RED_BAG_REQUEST
    })
  },
  hideNoviceTaskModal() {
    dispatch({
      type: types.TASK_DISPLAY_NOVICE_TASKS_MODAL,
      payload: false
    })
  }
}))
export default class Tasks extends React.PureComponent {
  componentWillMount() {
    // this.props.getUserInfo();
    this.props.getIncome(); // 获取总收益
    this.shareMode = this.getShareMode(); //页面模式
  }

  componentDidMount() {
    this.props.getList();
  }

  componentWillReceiveProps(nextProps) {
    const newInfo = nextProps.userInfo.toJS();

    // 用户信息更新,检查红包情况
    if ((this.props.userInfo !== nextProps.userInfo) && newInfo.nickName) {
      const { location } = this.props;
      const { code, mode = '未携带用户展示模式参数' } = getQuery(location);
      if (!newInfo.agentId) { // 非注册用户获取新人红包详情
        this.props.getRedBagInfo({ type: NOVICE_RED_BAG_TYPE, inviteCode: code });
      } else { // 查询师徒红包
        this.props.getInviteRedBagInfo();
      }
    }
  }

  // 设置分享的页面模式
  getShareMode() {
    const { location } = this.props;
    const { mode = '' } = getQuery(location);
    return getRandomMode(mode); // 随机的页面模式：a/b;
  }

  // 处理注册
  handleRegister = () => {
    const { userInfo } = this.props;
    const { role } = userInfo.toJS();
    if (role === COMMON_ROLE) { // 消费者，升级为代理
      this.props.showApplyModal();
    } else { // 注册
      this.props.showRegister();
    }
  }

  // 列表加载更多
  tryLoadMore = (currentPlacement, previousPlacement) => {
    const { dataSearch } = this.props;
    if (currentPlacement.indexOf('under') === -1 && previousPlacement.indexOf('under') >= 0) {
      dataSearch.toJS().hasMore && this.props.getList();
    }
  }

  // 前往收益记录页
  goIncome = () => {
    const { location } = this.props;
    const { code = '507vnIx8' } = getQuery(location);
    linkTo(`/incomeRecord?code=${code}`);
  }


  // 分享数据
  createShareData(nickName, shareInviteCode) {
    return {
      title: '悦惠赏金联盟',
      desc: nickName + '邀请您一起参加悦惠赏金联盟，每天可赚99',
      imgUrl: DEFAULT_SHARE_IMG_URL,
      link: `${window.location.protocol}//${window.location.host}/tasks?code=${shareInviteCode}&mode=${this.shareMode}`
    }
  }

  // 前往新手任务列表
  goNoviceTasks = () => {
    const { location } = this.props;
    const { code = '507vnIx8' } = getQuery(location);
    linkTo(`/noviceTasks?code=${code}`);
  }

  render () {
    const { dataSearch, userInfo, handleTabChange, location, hideApplyModal, applyToAgent, isShowApplyModal, showBindModal, cancelBindModal, bindRelation, income, redBagInfo, isShowNoviceTaskModal, hideNoviceTaskModal, restNoviceTaskAward } = this.props;
    const { code = '507vnIx8', mode = '', fromPage = ''} = getQuery(location);
    const { hasMore, isInit, isRequesting, list, progressStatus } = dataSearch.toJS();
    const showList = !!list.length;
    const { role, nickName, inviteCode, userId, agentId, newUser, } = userInfo.toJS();
    const shareInviteCode = role ? inviteCode : code; // 最终的分享邀请码
    const shareData = this.createShareData(nickName, shareInviteCode);
    const showNewUserRedBag = !agentId; // 显示新手红包
    const showInviteRedBag = agentId; // 显示收徒红包
    const inviteRedBagInfo = redBagInfo.toJS(); // 收徒红包信息
    const { count } = inviteRedBagInfo; // 收徒红包的徒弟数
    const isLatestUser = newUser; // 是否是第四期需求开始后，新进入的用户
    const { amount } = restNoviceTaskAward.toJS(); // 剩余新手任务列表的奖励对象
    const restNoviceAward = getShowPrice(amount); // 剩余新手任务列表的奖励金

    return (
      <div className="tasks-container">
        <ViewConfig documentTitle="悦惠赏金联盟-动手指即可赚钱" shareData={shareData} />
        <Broadcast />
        <UserInfo mode={mode} goIncome={this.goIncome} onRegister={this.handleRegister} userInfo={userInfo} income={income} />
        <div className="invite-friend-wrap" >
          <Link to={`/inviteFriend?code=${shareInviteCode}`} className="invite-friend" />
        </div>
        <List
          list={list}
          role={role}
          mode={mode}
          fromPage={fromPage}
          userId={userId}
          isLatestUser={isLatestUser}
          progressStatus={progressStatus}
          code={code || inviteCode || '507'}
          handleTabChange={(status) => handleTabChange(status)}
        />
        {/*<WayPoint enable={hasMore} onEnterView={this.tryLoadMore}>
          <p>{hasMore && '加载中...'}</p>
          <p>{(!hasMore && showList) && ' 已经到底啦~ '}</p>
          {(!hasMore && !showList) && (<DataNone dataNoneTxt="暂无数据" />)}
        </WayPoint>*/}
        <Register userInfo={userInfo} code={code} />
        <TaskModal
          isShowModal={isShowApplyModal}
          hideModal={hideApplyModal}
          handleOk={applyToAgent}
          content="成为悦惠代理才能做任务赚钱哦"
          okText="申请成为代理"
        />
        <TaskModal
          isShowModal={showBindModal}
          hideModal={cancelBindModal}
          handleOk={bindRelation}
          content="您填写的⼿机号已注册，是否绑定当前微信"
          okText="绑定"
        />
        {showNewUserRedBag && <RedBagModal initStatus="close" onOk={this.startTask} />}
        {showInviteRedBag && <RedBagModal initStatus="open" onOkTxt="朕知道了" onOk={this.startTask} content={`收徒${count}人`} />}
        <NoviceTaskModal show={isShowNoviceTaskModal} hideModal={hideNoviceTaskModal} onOk={this.goNoviceTasks} okTxt="去赚钱" money={restNoviceAward} title="发现新手任务" />
        <LotteryIcon code={code || inviteCode || '507vnIx8'} mode={mode || ''} />
      </div>
    )
  }
}
