import React from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import LotteryItem from '../../components/Lottery/LotteryItem';
import RedBagModal from '../../components/Tasks/RedBagModal';
import { linkTo } from '../../utils/url';
import { getQuery } from '../../utils';
import './index.less';
import * as types from "../../constants/actionTypes";

@connect(state => {
  console.log('state', state.toJS());
  return {
    lotteryInfo: state.getIn(['lottery', 'lotteryInfo']),
    userInfo: state.getIn(['user', 'userInfo']),
  }
}, (dispatch) => ({
  getUserInfo () {
    dispatch({
      type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
    });
  },
  getInit () {
    dispatch({
      type: types.LOTTERY_INIT_REQUEST
    })
  },
  play () {
    dispatch({
      type: types.LOTTERY_DO_PLAY_REQUEST
    })
  },
  showModal () {
    dispatch({
      type: types.TASKS_RED_BAG_MODAL_SHOW
    })
  },
  hideModal () {
    dispatch({
      type: types.TASKS_RED_BAG_MODAL_HIDE
    })
  }
}))
export default class Lottery extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      activeId: -1,  // 当前转动到哪个位置，起点位置
      lotteryId: -1, // 中奖位置
      times: 0,  // 至少需要转动的次数
      actTimes: 0, // 转动次数
      isRolling: false,
      speed: 100,  // 初始速度
      timer: null, // 定时器
    }
  }
  componentWillMount () {
    this.props.getInit();
    // this.props.getUserInfo();
  }

  handleBegin () {
    const { lotteryInfo, userInfo, location } = this.props;
    const { code, mode } = getQuery(location);
    const { leftTime } = lotteryInfo.toJS();
    const { userId, inviteCode } = userInfo.toJS();
    if (leftTime === 0) {
      alertTip('暂时没有抽奖机会，快去做任务获得抽奖机会吧！');
      setTimeout(() => {
        linkTo(`/tasks?code=${code || inviteCode || '507'}&mode=${mode || ''}`);
      }, 2000);
      return;
    }
    if (!this.state.isRolling) {
      this.setState({
        activeId: -1,
        lotteryId: -1,
        times: 0,
        actTimes: 0,
        isRolling: false,
        speed: 100
      }, () => {
        this.props.play();
        this.handlePlay();
      })
    }
  }

  handlePlay () {
    const { lotteryId, list } = this.props.lotteryInfo.toJS();
    let times = list.length * Math.floor(Math.random() * 5 + 4); // 设置至少要转的次数
    this.setState({
      lotteryId,
      activeId: 0,
      times,
      isRolling: true
    });
    this.running();
  }
  running () {
    let { activeId, actTimes, times, timer, speed} = this.state;
    const { list, lotteryId } = this.props.lotteryInfo.toJS();
    let num = activeId;

    if (activeId === lotteryId && actTimes > times) {
      clearInterval(timer);
      if (list[lotteryId].type === 'NONE') {
        alertTip('哎呀，您没抽中奖，请再接再厉哦！');
      } else if (list[lotteryId].type === 'REDPACKET'){
        this.props.showModal();
      }
      this.setState({
        isRolling: false
      });
      return;
    }
    if (num === list.length) {
      num = 0;
    } else {
      num++;
    }
    this.setState({
      activeId: num,
      actTimes: actTimes + 1
    });

    if (actTimes < times) {
      speed -= 10;
    } else {
      if (actTimes > times && ((lotteryId === 0 && activeId === list.length) || lotteryId === activeId + 1)) {
        speed += 100;
      } else {
        speed += 40;
      }
    }
    if (speed < 40) {
      speed = 40;
    }
    this.setState({
      speed
    });

    this.timer = setTimeout(()=> {
      this.running();
    }, speed);
  }
  goTasks () {
    const { userInfo, location } = this.props;
    const { code, mode } = getQuery(location);
    const { userId, inviteCode } = userInfo.toJS();
    linkTo(`/tasks?code=${code || inviteCode || '507'}&mode=${mode || ''}`);
  }

  render () {
    const { activeId, isRolling } = this.state;
    const { hideModal, lotteryInfo, userInfo, location } = this.props;
    const { code, mode } = getQuery(location);
    const { leftTime = 0, list = []} = lotteryInfo.toJS();
    const { nickName, inviteCode} = userInfo.toJS();
    const link = `${window.location.protocol}//${window.location.host}/lottery?code=${code || inviteCode || '507'}&mode=${mode || ''}`;
    const shareData = {
      title: '悦惠赏金联盟-每日抽奖活动',
      desc: nickName + '邀请您一起参加抽奖活动，有机会赢小米平衡车！',
      imgUrl: 'http://img-cows.kkkd.com/Fit8lVLlC8CEBcgEGy8TCpZRO4A3',
      link
    };
    return (
      <div className="lottery-wrap">
        <ViewConfig documentTitle="每日抽奖" shareData={shareData}/>
        {/*<p onClick={() => this.goTasks()} className="task-enter">多抽一次</p>
        <img src="http://img-cows.kkkd.com/FjfgWhLTMCW6UTJxr3AVvwXvw-Vg" alt="" className="lottery-banner"/>*/}
        <div className="lottery-content">
          <div className="shaking-bar flex items-center justify-between">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="left-time">您有<span>{leftTime}</span>次抽奖机会</div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <div className="lottery-box">
            <div className={(leftTime ? isRolling ? 'is-rolling' : '' : 'disabled') + ' lottery-btn flex items-center justify-center'}
                 onClick={() => this.handleBegin()}>
              点击抽奖
            </div>
            <div className="flex justify-between">
              <LotteryItem activeId={activeId} index={0} content={list[0] || {}} />
              <LotteryItem activeId={activeId} index={1} content={list[1] || {}} />
              <LotteryItem activeId={activeId} index={2} content={list[2] || {}} />
            </div>
            <div className="flex justify-between">
              <LotteryItem activeId={activeId} index={7} content={list[7] || {}} />
              <LotteryItem activeId={activeId} index={3} content={list[3] || {}} />
            </div>
            <div className="flex justify-between">
              <LotteryItem activeId={activeId} index={6} content={list[6] || {}} />
              <LotteryItem activeId={activeId} index={5} content={list[5] || {}} />
              <LotteryItem activeId={activeId} index={4} content={list[4] || {}} />
            </div>
          </div>
          <div className="shaking-bar flex items-center justify-between">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="lottery-task">
          <button onClick={() => this.goTasks()} className="btn">多抽一次</button>
          <p>完成1次任务获得1次额外的抽奖机会</p>
        </div>
        <dl className="lottery-rules">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <dt>抽奖规则</dt>
          <dd>每日可获得一次免费抽奖机会；</dd>
          <dd>当日完成1次任务即可获得1次额外的抽奖机会；</dd>
          <dd>抽中现金奖励直接发放到悦惠账户中；如抽中实物奖品，请根据提示输入收货信息，并在24小时内留意公众号给您的发货信息；</dd>
          <dd>抽奖机会仅在当天有效，请获得后及时使用。</dd>
        </dl>
        <RedBagModal initStatus="open" onOkTxt="知道了" onOk={hideModal} />
      </div>
    )
  }
}
