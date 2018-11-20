'use extensible';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import Deliver from '../../components/Deliver'
import './index.less'
import ViewConfig from '../../components/ViewConfig';
import Broadcast from '../../components/Tasks/Broadcast';
import * as types from '../../constants/actionTypes'
import DataNone from '../../components/DataNone'
// import WayPoint from '../../components/WayPoint';
import {getQuery, getShowPrice} from '../../utils'
import { COMMON_ROLE, AGENT_ROLE, OPERATOR_ROLE, incomeRecordTrace, } from '../../constants/tasks'
import Register from '../../components/Tasks/RegisterModal';
import TaskModal from '../../components/Tasks/TaskModal';
import InfoModal from '../../components/Tasks/InfoModal'
import { linkTo } from '../../utils/url';

const ABLE_WITHDRAW_MONEY = 2000; // 可提现金额数

@connect(
  state => ({
    dataSearch: state.getIn(['tasks', 'incomeDataSearch']),
    income: state.getIn(['tasks', 'income']),
    isShowApplyModal: state.getIn(['tasks', 'isShowApplyModal']),
    showBindModal: state.getIn(['tasks', 'showBindModal']),
    userInfo: state.getIn(['user', 'userInfo']),
  }),
  dispatch => ({
    getList() {
      dispatch({
        type: types.TASKS_GET_INCOME_LIST_REQUEST
      })
    },
    handleTabChange(payload) {
      dispatch({
        type: types.TASKS_CHANGE_INCOME_TAB,
        payload
      })
    },
    getIncome() {
      dispatch({
        type: types.TASKS_GET_INCOME_REQUEST,
      })
    },
    getUserInfo () {
      dispatch({
        type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
      });
    },
    showApplyModal() {
      dispatch({
        type: types.TASKS_APPLY_MODAL_SHOW
      })
    },
    showRegister () {
      dispatch({
        type: types.TASKS_REGISTER_SHOW
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
  })
)
export default class IncomeRecord extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      showWithdrawTipModal: false, // 显示提现提示弹框
    };
  }
  componentWillMount() {
    this.props.getIncome();
    const { role } = this.props.userInfo;
    if (role) {
      this.props.getList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const newInfo = nextProps.userInfo.toJS();

    // 注册用户请求列表
    if ((this.props.userInfo !== nextProps.userInfo) && newInfo.role) {
      this.props.getList();
    }
  }

  // 权限判断操作
  roleOperate = (callBack) => {
    const { userInfo } = this.props;
    const { role } = userInfo.toJS();
    const isOperateRole = (role === AGENT_ROLE) || (role === OPERATOR_ROLE);
    if (isOperateRole) {
      callBack();
    } else {
      this.handleRole();
    }
  }

  // 登录或升级操作
  handleRole = () => {
    const { userInfo } = this.props;
    const { role } = userInfo.toJS();
    if (role === COMMON_ROLE) {
      this.props.showApplyModal();
    } else {
      this.props.showRegister();
    }
  }

  goApp = () => {
    incomeRecordTrace.goApp();
    const { income } = this.props;
    if (!income || (income < ABLE_WITHDRAW_MONEY)) { // 低于提现金额时，弹框提示
      this.setState({ showWithdrawTipModal: true });
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = ua.indexOf('iphone') > -1;
    const url = isIOS
      ? 'https://itunes.apple.com/cn/app/%E6%82%A6%E6%83%A0-%E4%B9%90%E4%BA%AB%E7%94%9F%E6%B4%BB/id1362570063?mt=8'
      : 'http://18020774384.fx.sj.360.cn/qcms/view/t/detail?id=3962781';

    window.location.href = url;
  }

  beforeGoApp = () => {
    this.roleOperate(this.goApp)
  }

  tryLoadMore = (currentPlacement, previousPlacement) => {
    const { dataSearch } = this.props;
    if (currentPlacement.indexOf('under') === -1 && previousPlacement.indexOf('under') >= 0) {
      dataSearch.toJS().hasMore && this.props.getList();
    }
  }

  goHome = () => {
    this.setState({ showWithdrawTipModal: false });
    linkTo(`${window.location.protocol}//${window.location.host}/tasks`)
  }

  render() {
    const { showWithdrawTipModal } = this.state;
    const { handleTabChange, dataSearch, income, userInfo, isShowApplyModal, hideApplyModal, applyToAgent, showBindModal, cancelBindModal, bindRelation, location } = this.props;
    const { code } = getQuery(location);
    const { hasMore, isInit, isRequesting, list, role } = dataSearch.toJS();
    const showList = !!list.length;
    const userMsg = userInfo.toJS();
    const diffMoney = ABLE_WITHDRAW_MONEY - (income || 0); // 剩余可提现金额差

    console.log('list', list);
    return (
      <div className="income-record-wrap">
        <ViewConfig documentTitle="提现/收益记录"/>
        <Broadcast />
        <div className="header">
          <div className="flex justify-between">
            <div>
              <div className="cash-tit">累计任务收益：</div>
              <p className="price price-cny">{getShowPrice(income)}</p>
            </div>
            <button className="withdraw-btn btn" onClick={this.beforeGoApp}>去APP提现</button>
          </div>
          <Deliver height=".1rem" />
          <p className="tip">本页面暂不支持提现，请到《悦惠APP》进行提现（20元起提）。</p>
        </div>
        <Deliver height=".2rem" />
        <div className="income-list-wrap">
          <ul className="income-tab flex">
            <li
              className={(role === 'INITIATIVE') ? 'active' : ''}
              onClick={() => handleTabChange('INITIATIVE')}
            >
              任务收入
            </li>
            <li
              className={(role === 'PASSIVE') ? 'active' : ''}
              onClick={() => handleTabChange('PASSIVE')}
            >
              好友提成
            </li>
          </ul>
          { showList && <ul className="income-list">
            {
              list.map(i => {
                const { name, finishTime, amount, id } = i;
                const taskTime = finishTime
                 ? new Date(finishTime).format('yyyy-MM-dd hh:mm:ss')
                 : '';

                return (
                  <li key={id} className="flex">
                    <div className="desc-wrap">
                      <div className="tit">{name}</div>
                      <div className="time">{taskTime}</div>
                    </div>
                    <div className="income flex-1 self-center">￥{getShowPrice(amount)}</div>
                  </li>
                )
              })
            }
          </ul> }
        </div>
        {/*{ userMsg.role
            ? <WayPoint enable={hasMore} onEnterView={this.tryLoadMore}>
                <p>{hasMore && '加载中...'}</p>
                <p>{(!hasMore && showList) && ' 已经到底啦~ '}</p>
                {(!hasMore && !showList) && (<DataNone dataNoneTxt="暂无数据" />)}
              </WayPoint>
            : <DataNone dataNoneTxt="暂无数据" />
        }*/}
        <Register code={code} />
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
        <InfoModal
          title="温馨提示"
          isShowModal={showWithdrawTipModal}
          handleOk={this.goHome}
          content={`当前累计任务收益${getShowPrice(income)}元，再赚${getShowPrice(diffMoney)}元可提现，请先完成更多任务哦~`}
          okText="去赚钱"
        />
      </div>
    )
  }
}

