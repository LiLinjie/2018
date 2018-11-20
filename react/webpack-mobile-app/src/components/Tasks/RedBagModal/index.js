import React from 'react';
import './index.less';
import {connect} from 'react-redux';
import * as types from "../../../constants/actionTypes";
import { getShowPrice } from '../../../utils/'

@connect(state => {
  return {
    isShowRedBagModal: state.getIn(['tasks', 'isShowRedBagModal']),
    redBagInfo: state.getIn(['tasks', 'redBagInfo'])
  }
}, (dispatch) => ({
  hideModal () {
    dispatch({
      type: types.TASKS_RED_BAG_MODAL_HIDE
    })
  },
  getAward() {
    dispatch({
      type: types.TASKS_GET_AWARD_REQUEST,
    })
  }
}))
export default class RedBagModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.initStatus, // 红包的领取状态, close: 未领取，open：已领取
    }
  }

  openBag = () => {
    this.setState({ status: 'open' })
    this.props.getAward(); // 获取奖励
  }

  onOk = () => {
    this.props.onOk && this.props.onOk();
    this.props.hideModal();
  }

  render () {
    const { status } = this.state;
    const { hideModal, isShowRedBagModal, content='', redBagInfo, onOkTxt } = this.props;
    const { amount } = redBagInfo.toJS();
    
    return (
      isShowRedBagModal
        ? <div className="task-redBag-modal">
            <div className="mask" />
            { (status === 'close') 
              ? <div className="redBag-modal-content closed">
                <div onClick={this.openBag} className="open-btn">
                  <img src="http://img-cows.kkkd.com/Fl9C3ceKFVxNQilCE7VdkMHtkHZ5" alt=""/>
                </div>
                <p>初次见面<br/>
                  送你一个新人红包</p>
              </div> 
              : <div className="redBag-modal-content opened">
                <p className="name">恭喜{content}！</p>
                <p className="money">现金<span>{getShowPrice(amount)}</span>元已入账</p>
                <button className="btn" onClick={this.onOk}>{ onOkTxt || '开始赚钱' }</button>
                <p className="tip">做任务预计每天可得50元！</p>
              </div> 
            }
        </div>
        : null
    )
  }
}
