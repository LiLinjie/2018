import React from 'react';
import './index.less';
import { AGENT_ROLE, OPERATOR_ROLE, COMMON_ROLE, MODE_A, MODE_B } from '../../../constants/tasks';
import Link from '../../Link';
import { getShowPrice } from '../../../utils'

export default class Index extends React.PureComponent {
  render () {
    const { userInfo, onRegister, income, goIncome, mode=MODE_A, } = this.props;
    const role = userInfo.get('role');
    const showModeB = (mode === MODE_B) && !role; // 显示模式B
    const showModeA = !showModeB; // 显示模式A
    const { avatar, nickName, userName } = userInfo.toJS();

    return (
      <div className="task-user-info-wrap">
        <div className="task-user-info">
          { showModeA
            && <div className="profile flex items-center">
                  <img  className="avatar" src={avatar} alt="头像"/>
                  <div className="flex-auto">
                    <div className="name">{nickName}</div>
                    {
                      userName 
                      ? <div className="tel">已绑定手机</div>
                      : <div onClick={onRegister} className="tel link-register">未绑定手机</div>
                    }
                  </div>
                </div>
          }
          {
            showModeB
            && <div>
                  <div className="guide-tit">做任务赚钱</div>
                  <div className="flex guide-process">
                    <div className="process">选择任务</div>
                    <div className="process">完成任务</div>
                    <div className="process">领取任务</div>
                  </div>
                </div>
          }
          <div className="income-tit">累计任务收益</div>
          <div className="flex items-center justify-between">
            <span className="price price-cny">{getShowPrice(income)}</span>
            <div onClick={goIncome} className="income-link">
              提现/收益记录&nbsp;
              <i style={{fontSize: '.3rem'}} className="iconfont">&#xe601;</i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
