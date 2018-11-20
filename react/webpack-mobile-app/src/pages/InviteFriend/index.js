'use extensible';
import React from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import InviteQRCModal from '../../components/Tasks/InviteModal/InviteQRCModal';
import Register from '../../components/Tasks/RegisterModal';
import TaskModal from '../../components/Tasks/TaskModal';
import * as types from "../../constants/actionTypes";
import './index.less';
import { COMMON_ROLE } from "../../constants/tasks";
import { getShowPrice, getQuery } from '../../utils';

@connect(state => {
  return {
    userInfo: state.getIn(['user', 'userInfo']),
    inviteStats: state.getIn(['tasks', 'inviteStats']),
    isShowApplyModal: state.getIn(['tasks', 'isShowApplyModal']),
    showBindModal: state.getIn(['tasks', 'showBindModal']),
    isShowInviteModal: state.getIn(['tasks', 'isShowInviteModal'])
  }
}, (dispatch) => ({
  getUserInfo () {
    dispatch({
      type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
    });
  },
  getStats () {
    dispatch({
      type: types.TASKS_INVITE_STATS_REQUEST
    });
  },
  inviteFriend () {
    dispatch({
      type: types.TASKS_INVITE_MODAL_SHOW
    })
  },
  hideInviteModal () {
    dispatch({ type: types.TASKS_INVITE_MODAL_HIDE });
  },
  showRegister () {
    dispatch({
      type: types.TASKS_REGISTER_SHOW
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
}))
export default class InviteFriend extends React.PureComponent {
  componentWillMount () {
    // this.props.getUserInfo();
  }
  componentDidMount () {
    const { userInfo } = this.props;
    const { role } = userInfo;
    if (role) {
      this.props.getStats();
    }
  }
  componentWillReceiveProps (nextProps) {
    const oldInfo = this.props.userInfo ? this.props.userInfo.toJS() : {};
    const newInfo = nextProps.userInfo ? nextProps.userInfo.toJS() : {};
    if (oldInfo.role !== newInfo.role && newInfo.role) {
      this.props.getStats();
    }
  }

  handleRegister () {
    const { userInfo } = this.props;
    const { role } = userInfo.toJS();
    if (role === COMMON_ROLE) {
      this.props.showApplyModal();
    } else {
      this.props.showRegister();
    }
  }

  inviteFriend () {
    const { userInfo } = this.props;
    const { role } = userInfo.toJS();
    if (role === COMMON_ROLE) {
      this.props.showApplyModal();
    } else {
      this.props.inviteFriend();
    }
  }

  render () {
    const {
      userInfo,
      inviteStats,
      isShowInviteModal,
      hideInviteModal,
      hideApplyModal,
      applyToAgent,
      isShowApplyModal,
      showBindModal,
      cancelBindModal,
      bindRelation } = this.props;
    const { code = '507vnIx8' } = getQuery(location);
    const { role, nickName, inviteCode, userId, agentId, userName, avatar, } = userInfo;
    const { todayApprenticeCount, todayRedpacketAmount, totalApprenticeCount, totalRedpacketAmount, integer, decimal } = inviteStats;
    const shareInviteCode = role ? inviteCode : code;
    const link = `${window.location.protocol}//${window.location.host}/tasks?code=${shareInviteCode}`;
    const shareData = {
      title: '悦惠赏金联盟',
      desc: nickName + '邀请您一起参加悦惠赏金联盟，每天可赚99',
      imgUrl: 'http://img-cows.kkkd.com/FgteCBy2P7JNj2R8R4Aiz7gObkRm',
      link
    };

    return (
      <div className="invite-friend-page">
        <ViewConfig documentTitle="收徒赚钱，每天可稳定收入几十元" shareData={shareData} />
        <div className="invite-steps flex items-center">
          <div className="flex-1 flex items-center justify-center">邀请好友</div>
          <div className="flex-1 flex items-center justify-center">好友做任务</div>
          <div className="flex-1 flex items-center justify-center">我拿奖励</div>
        </div>
        <div className="invite-content">
          <div className="invite-txt">
            <h2>
              收好友为徒
              <span>一起赚钱</span>
            </h2>
            <h3>收取一个徒弟最高可得<span>20</span>元</h3>
            <p className="flex items-center justify-center">邀请无上限  奖励不封顶</p>
          </div>
          <div className="invite-btn-wrap">
            <img src="http://img-cows.kkkd.com/FmAgtNtW2dx2aJpgNt_RDbpzsQE0" alt=""/>
            {
              userName ?
                <button className="btn invite-btn" onClick={() => this.inviteFriend()}>立即收徒赚钱</button>
                :
                <button className="btn invite-btn" onClick={() => this.handleRegister()}>立即收徒赚钱</button>
            }
          </div>
          <div className="invite-info flex justify-center">
            <div className="detail">
              <img src="http://img-cows.kkkd.com/Fj1_zBG1NHF3Cq4KWDg1Y3PONlso" alt=""/>
              <p className="name">已收徒弟</p>
              <p className="num">
                {totalApprenticeCount || 0}
                <span className="unit">人</span>
              </p>
              <p className="stats">今日收徒<span>{todayApprenticeCount || 0}</span>人</p>
            </div>
            <div className="detail">
              <img src="http://img-cows.kkkd.com/Fm2pAyiQ_vkT4E1LgHu1L3Pk_IqM" alt=""/>
              <p className="name">已获得奖励</p>
              <p className="num">
                {integer || 0}
                <span className="decimal">.{decimal || 0}</span>
                <span className="unit">元</span>
              </p>
              <p className="stats">今日邀请收益<span>{getShowPrice(todayRedpacketAmount)}</span>元</p>
            </div>
          </div>
          <dl className="invite-notice">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <dt className="title">收徒提示</dt>
            <dd>徒弟首次完成任务（非新手任务），师傅获得随机红包，最高可得20元</dd>
            <dd>徒弟完成任务，师傅拿5%以上的徒弟收入提成</dd>
            <dd>徒弟持续完成任务，师傅获得奖励上不封顶</dd>
          </dl>
        </div>
      {/*  <InviteModal
          link={link}
          show={isShowInviteModal}
          hideModal={hideInviteModal}
        />*/}
        <InviteQRCModal
          link={link}
          show={isShowInviteModal}
          hideModal={hideInviteModal}
          name={nickName}
          avatar={avatar}
        />
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
      </div>
    )
  }
}
