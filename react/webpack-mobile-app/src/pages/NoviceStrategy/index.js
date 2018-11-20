import React, { PureComponent } from 'react';
import ViewConfig from '../../components/ViewConfig';
import { connect } from 'react-redux';
import * as types from '../../constants/actionTypes';
import { STRATEGY_TASK_TYPE } from '../../constants/tasks'
import './index.less'

@connect(
  state => ({

  }),
  dispatch => ({
    getAward(payload, nextAction) {
      dispatch({
        type: types.TASKS_GET_NOVICE_TASKS_AWARD,
        payload,
      })
    }
  })
)
export default class NoviceStrategy extends PureComponent {
  componentWillMount() {
    this.props.getAward({ type: STRATEGY_TASK_TYPE });
  }

  render() {
    return (
      <div className="novice-strategy-wrapper">
        <ViewConfig documentTitle="赚钱攻略" />
        <div className="card">
          <div className="content">
            <span className="left-circle circle"></span>
            <span className="right-circle circle"></span>
            <dl>
              <dt>为什么赚钱？</dt>
              <dd>用户完成广告商指定的任务，即完成了广告推广行为，获得相应报酬。此奖励为劳动所得，由悦惠赏金联盟支付相应的报酬。同样的任务，悦惠赏金联盟支付的报酬为同行业最高。</dd>
            </dl>
            <dl>
              <dt>如何赚到钱？</dt>
              <dd>领取自己喜爱的任务，按照任务要求执行任务，按要求提交截图等资料，审核通过后获得任务奖励。</dd>
            </dl>
            <dl>
              <dt>有什么诀窍？</dt>
              <dd>收好友为徒，和他一起赚钱。徒弟首次完成任务可获得相应的奖励，并能永久享受徒弟5%以上的收入提成，做到躺着也能赚钱。</dd>
            </dl>
          </div>
        </div>
        <div className="bottom">
          <div className="circle-half"></div>
        </div>
      </div>
    )
  }
}
