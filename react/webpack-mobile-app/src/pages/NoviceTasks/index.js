import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import { getRandomMode, NOVICE_TASKS_CONFIG, STRATEGY_TASK_TYPE, SHARE_TASK_TYPE, FOLLOW_TASK_TYPE, NORMAL_TASK_TYPE, COMMON_ROLE, AGENT_ROLE, OPERATOR_ROLE, NEW_USER_TASK_ID, NOVICE_TASK_STATUE, NOVICE_TASKS_AWARD_TYPE, ABLE_RECEIVE_AWARD_STATUS, RECEIVED_AWARD_STATUS, NOVICE_TASKS_PAGE, DEFAULT_SHARE_IMG_URL } from '../../constants/tasks'
import * as types from '../../constants/actionTypes';
import './index.less'
import TaskItem from '../../components/NoviceTasks/TaskItem';
import { linkTo } from '../../utils/url';
import ShareModal from '../../components/Tasks/ShareModal';
import RedBagModal from '../../components/Tasks/RedBagModal';
import Header from '../../components/NoviceTasks/Header'
import Deliver from '../../components/Deliver'
import {getQuery, getShowPrice} from '../../utils'

const { DONE_STATUS, PENDING_STATUS, NO_OPEN_STATUS } = NOVICE_TASK_STATUE;

@connect(
  state => ({
    userInfo: state.getIn(['user', 'userInfo']),
    noviceTasks: state.getIn(['tasks', 'noviceTasks']),
  }),
  dispatch => ({
    getUserInfo() {
      dispatch({
        type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
      });
    },
    getNoviceTasks() {
      dispatch({
        type: types.TASKS_NOVICE_TASKS_REQUEST
      })
    },
    showShareMask() {
      dispatch({
        type: types.TASKS_SHARE_MODAL_SHOW
      })
    },
    hideShareMask() {
      dispatch({
        type: types.TASKS_SHARE_MODAL_HIDE
      })
    },
    getAward(payload, nextAction) {
      dispatch({
        type: types.TASKS_GET_NOVICE_TASKS_AWARD,
        payload,
        nextAction,
      })
    },
    getRedBagInfo(payload) {
      dispatch({
        type: types.TASKS_GET_RED_BAG_REQUEST,
        payload,
        nextAction: { type: types.TASKS_GET_AWARD_REQUEST }
      })
    },
  })
)
export default class NoviceTask extends PureComponent {
  componentWillMount() {
    this.props.getNoviceTasks(); // 获取任务列表
    // this.props.getUserInfo();
    this.pageMode = getRandomMode();
  }

  componentWillReceiveProps(nextProps) {

    // 请求第一次或第二次任务的零陵区情况
    if (this.props.noviceTasks !== nextProps.noviceTasks) {
      const { activities } = nextProps.noviceTasks.toJS();
      const matchFollowItem = activities.find((i) => ((i.type === FOLLOW_TASK_TYPE) && (i.status === DONE_STATUS)));
      const matchNormalItem = activities.find((i) => ((i.type === NORMAL_TASK_TYPE) && (i.status === DONE_STATUS)));

      if (matchFollowItem) {
        this.getAward(FOLLOW_TASK_TYPE); // 获取第一次任务奖励
      }

      if (matchNormalItem) {
        this.getAward(NORMAL_TASK_TYPE); // 获取第二次任务奖励
      }
    }
  }

  // 获取奖励（是否可以领取，可以则领取并提示领取信息）
  getAward(type, nextAction) {
    const inviteCode = this.getInviteCode();
    this.props.getAward({ type, inviteCode }, nextAction);
  }

  // 设置分享
  getShareData() {
    const { pageMode } = this;
    const { userInfo } = this.props;
    const { nickName } = userInfo.toJS();
    const inviteCode = this.getInviteCode();

    return {
      title: '悦惠赏金联盟',
      desc: `${nickName}邀请你一起参加悦惠赏金联盟，每天可赚99`,
      imgUrl: DEFAULT_SHARE_IMG_URL,
      link: `${window.location.protocol}//${window.location.host}/tasks?code=${inviteCode}&mode=${pageMode}`,
      shareAppFn: this.shareSuc,
      shareTimeLineFn: this.props.hideShareMask,
    };
  }

  // 获取邀请码
  getInviteCode() {
    const { location, userInfo } = this.props;
    const { code = '507vnIx8' } = getQuery(location);
    const { inviteCode, } = userInfo.toJS();
    return inviteCode || code;
  }

  // 分享成功
  shareSuc = () => {
    this.props.hideShareMask();
    const nextAction = { type: types.TASKS_NOVICE_TASKS_REQUEST };
    this.getAward(SHARE_TASK_TYPE, nextAction);
  }

  // 点击任务
  onDoTask(type, status) {
    if (status === NO_OPEN_STATUS) {
      alertTip('该任务还未解锁，请先完成解锁任务！');
      return;
    } else if (status >= DONE_STATUS) {
      alertTip('任务已完成');
      return;
    }

    if (status !== PENDING_STATUS) return;

    switch (type) {
      case STRATEGY_TASK_TYPE: { // 前往攻略页
        this.goStrategy();
        return;
      };
      case SHARE_TASK_TYPE: { // 分享
        this.props.showShareMask();
        return;
      };
      case FOLLOW_TASK_TYPE: { // 做第一次任务
        this.goNoviceTaskPage();
        return;
      };
      case NORMAL_TASK_TYPE: { // 常规任务（第二次任务）
        this.goHome();
        return;
      };
      default: return;
    }
  }

  // 前往攻略
  goStrategy() {
    linkTo('/noviceStrategy');
  }

  // 前往新手关注任务
  goNoviceTaskPage() {
    const inviteCode = this.getInviteCode();
    linkTo(`/noviceTaskDetail?id=${NEW_USER_TASK_ID}&code=${inviteCode}`)
  }

  // 渲染任务子项目
  renderItem(list = []) {
    return NOVICE_TASKS_CONFIG.map(i => {
      const { title, type } = i;
      const matchItem = list.find(item => item.type === type);
      if (!matchItem) return null;
      const { amount, status } = matchItem;
      return (
        <TaskItem
          key={title}
          title={title}
          status={status}
          money={getShowPrice(amount)}
          onDoTask={() => { this.onDoTask(type, status) }}
        />
      )
    })
  }

  goHome = () => {
    const inviteCode = this.getInviteCode();
    linkTo(`/tasks?code=${inviteCode}&fromPage=${NOVICE_TASKS_PAGE}`);
  }

  // 领取新手大红包
  getRedBag(status) {
    const isDoneStatus = status === ABLE_RECEIVE_AWARD_STATUS;
    if (isDoneStatus) {
      this.props.getRedBagInfo({ type: NOVICE_TASKS_AWARD_TYPE });
    } else {
      alertTip('请先完成以上任务，再领取红包')
    }
  }

  render() {
    const { noviceTasks } = this.props;
    const { activities, redpacket } = noviceTasks.toJS();
    const { status } = redpacket || {};
    const shareData = this.getShareData();
    const hideSubmitBtn = status === RECEIVED_AWARD_STATUS; // 隐藏领取按钮

    return (
      <div className="novice-tasks-wrapper">
        <ViewConfig documentTitle="新手任务" shareData={shareData} />
        <Header />
        { this.renderItem(activities) }
        <Deliver height=".27rem" />
        { hideSubmitBtn ? null : <button className="award-btn" onClick={() => {this.getRedBag(status)}}>领取最高10元新手红包</button> }
        <ShareModal content={`点击右上角“...”点击发送给朋友，然后选择要分享的群即可。`} />
        <RedBagModal
          initStatus="open"
          content="完成新手任务"
          onOkTxt="继续赚钱"
          onOk={this.goHome}
        />
      </div>
    )
  }
}
