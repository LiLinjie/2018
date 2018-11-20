import React from 'react';
import { connect } from 'react-redux';
import * as types from '../../../constants/actionTypes';
import './index.less';
import { tasksTrace } from '../../../constants/tasks'

@connect(state => {
  return {
    showRegCountdown: state.getIn(['tasks', 'showRegCountdown']),
    isShowRegister: state.getIn(['tasks', 'isShowRegister'])
  };
  
}, (dispatch) => ({
  getReg (payload = {}) {
    dispatch({ type: types.IDENTIFY_REG_REQUEST, payload });
  },
  submit (payload = {}) {
    dispatch({ type: types.TASKS_REGISTER_REQUEST, payload });
  },
  stop () {
    dispatch({ type: types.REG_COUNTDOWN_STOPPED});
  },
  hideRegister () {
    dispatch({
      type: types.TASKS_REGISTER_HIDE
    })
  },
}))
export default class RegisterComp extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      timerCount: 60,
      timerTitle: '获取验证码',
      enable: false,
      tel: '',
      invite: this.props.code,
      reg: '',
      submitEnable: false
    }
  }

  componentWillReceiveProps (nextProps) {
    // 开始计时
    if (nextProps.showRegCountdown && !this.props.showRegCountdown) {
      this.countdown();
    }

    // 禁止滚动
    if (nextProps.isShowRegister !== this.props.isShowRegister) {
      if (nextProps.isShowRegister) {
        this.setRootDomStyle('height', '100%');
        this.setRootDomStyle('overflow', 'hidden');
      } else {
        this.setRootDomStyle('height', 'auto');
        this.setRootDomStyle('overflow', 'visible');
      }
    }
  }

  setRootDomStyle(prop, val) {
    if (!prop) return;
    document.documentElement.style[prop] = val;
    document.body.style[prop] = val;
  }

  getReg () {
    const { domain } = this.props;
    const { enable, tel} = this.state;
    if (enable) {
      this.props.getReg({ domain, userName: tel, isApp: true, });
    }
  }
  
  countdown () {
    const codeTime = this.state.timerCount;
    this.interval = setInterval(() =>{
      const timer = this.state.timerCount - 1;
      if (timer === 0) {
        this.interval && clearInterval(this.interval);
        this.props.stop();
        this.setState({
          timerCount: codeTime,
          timerTitle: this.props.timerTitle || '获取验证码',
          enable: true
        })
      } else {
        this.setState({
          timerCount:timer,
          timerTitle: `${timer}s`,
          enable: false
        });
      }
    }, 1000)
  }

  handleChangeValue (val, name) {
    let { enable, submitEnable } = this.state;
    this.setState({
      [name]: val
    }, () => {
      //enable = regTel.test(this.state.tel);
      enable = this.state.tel !== '';
      //submitEnable = regTel.test(this.state.tel) && this.state.invite && this.state.reg;
      submitEnable = this.state.tel !== '' && this.state.invite && this.state.reg;
      this.setState({
        enable,
        submitEnable
      });
    });
  }

  submit () {
    let { tel, invite, reg } = this.state;
    if (!tel) {
      window.alertTip('请输入正确的手机号！');
      return;
    }
    if (!reg) {
      window.alertTip('请输入正确的验证码！');
      return;
    }
    tasksTrace.register();
    this.props.submit({ userName: tel, inviteCode: invite, code: reg });
  }

  render () {
    const { showRegCountdown, getCoding, isShowRegister, hideRegister } = this.props;
    const { timerTitle, enable, tel, invite, reg, submitEnable } = this.state;
    return (
      isShowRegister ?
        <div className={isShowRegister ? 'task-register in' : 'task-register'}>
          <div className="mask" onClick={() => hideRegister()}/>
          <div className="register-content">
            <h3>注册后开始赚钱</h3>
            <div className="register-form">
              <div className="form-item">
                <input type="tel" placeholder="请输入手机号" value={tel} onChange={e => this.handleChangeValue(e.target.value, 'tel')}/>
                <div className={enable && !showRegCountdown ? 'active btn-code' : 'btn-code'} onClick={() => this.getReg()}>{timerTitle}</div>
              </div>
              <div className="form-item">
                <input type="tel" placeholder="请输验证码" value={reg} onChange={e => this.handleChangeValue(e.target.value, 'reg')}/>
              </div>
            </div>
            <button className={submitEnable ? 'btn active' : 'btn'} onClick={() => this.submit()}>立即注册</button>
          </div>
        </div>
        :
        <div></div>
    )
  }
}
