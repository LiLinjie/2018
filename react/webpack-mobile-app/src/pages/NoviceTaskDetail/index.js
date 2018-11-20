import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as types from '../../constants/actionTypes';
import {getQuery, getShowPrice} from '../../utils'
import Deliver from '../../components/Deliver'
import { isActivityEnd, PROCESS_CONFIG, getRandomMode, FOLLOW_TASK_TYPE, } from '../../constants/tasks'
import ViewConfig from '../../components/ViewConfig';
import './index.less'
import RedBagModal from '../../components/Tasks/RedBagModal';
import HomeIcon from '../../components/Tasks/SuspendedIcon/HomeIcon'
import ContactService from '../../components/Tasks/SuspendedIcon/ContactService'
import ShareModal from '../../components/Tasks/ShareModal';

@connect(
  state => ({
    detail: state.getIn(['tasks', 'detail']),
    userInfo: state.getIn(['user', 'userInfo']),
  }),
  dispatch => ({
    getDetail (payload) {
      dispatch({
        type: types.TASK_DETAIL_REQUEST,
        payload
      });
    },
    getUserInfo () {
      dispatch({
        type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
      });
    },
    getRedBagInfo(payload) {
      dispatch({
        type: types.TASKS_GET_RED_BAG_REQUEST,
        payload,
        nextAction: { type: types.TASKS_GET_AWARD_REQUEST }
      })
    },
    showShareMask() {
      dispatch({
        type: types.TASKS_SHARE_MODAL_SHOW
      })
    },
    getFollowTaskAward(payload) {
      dispatch({
        type: types.TASKS_GET_NOVICE_TASKS_AWARD,
        payload,
      })
    },
  })
)
class NoviceTaskDetail extends PureComponent {
  componentWillMount() {
    const { location, userInfo, } = this.props;
    const { id } = getQuery(location);
    this.props.getDetail({ id });
    this.props.getUserInfo();
    this.pageEventName = null;
    this.pageEventFunc = null;
  }

  componentDidMount() {
    this.onPageVisible()
  }

  componentWillReceiveProps(nextProps) {
    const newInfo = nextProps.userInfo.toJS();

    // 新用户可以领取新手奖励
    if ((this.props.userInfo !== nextProps.userInfo) && newInfo.nickName) {
      const { location } = nextProps;
      const { code, mode = '未携带用户展示模式参数' } = getQuery(location);
      const { newUser } = newInfo;
      this.getRedBagInfo(newUser, code);
      const pageMode = newInfo.role ? '已注册用户展示模式' : mode;
    }
  }

  componentWillUnmount() {
    document.removeEventListener(this.pageEventName, this.pageEventFunc)
  }

  // 监听页面激活状态
  onPageVisible() {
    const hiddenProperty = 'hidden' in document ? 'hidden' :
    'webkitHidden' in document ? 'webkitHidden' :
    'mozHidden' in document ? 'mozHidden' : null;
    this.pageEventName = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    this.pageEventFunc = () => {
      if (!document[hiddenProperty]) {
          const { location, userInfo } = this.props;
          const { code } = getQuery(location);
          const { newUser } = userInfo.toJS();
          this.getRedBagInfo(newUser, code);
      }
    };
    document.addEventListener(this.pageEventName, this.pageEventFunc);
  }

  // 获取关注奖励
  getRedBagInfo(isNewUser, code) {
    if (isNewUser) { // 新用户，toast提示
      this.props.getFollowTaskAward({ type: FOLLOW_TASK_TYPE, inviteCode: code })
    } else { // 老用户，红包提示
      this.props.getRedBagInfo({ type: FOLLOW_TASK_TYPE, inviteCode: code });
    }
  }

  previewImg(url) {
    wx.previewImage({
      current: url,
      urls: PROCESS_CONFIG.map(i => i.imgUrl)
    });
  }

  /**
   * 显示步骤
   * @param  {Array<object>} config     任务步骤文案
   * @param  {Number} processLen        显示任务步骤的步骤数
   * @return {Node}                     任务步骤节点
   */
  renderProcess(config, processLen = 0) {
    return config.map((i, idx) => {
      const { title, imgUrl } = i;
      if (idx >= processLen) return null;
      return (
        <div className="process-content" key={idx}>
          <p className="process-tit">{title}</p>
          <Deliver height=".24rem" />
          <img onClick={() => {this.previewImg(imgUrl)}} className="process-img" src={imgUrl} alt="流程"/>
          <Deliver height=".43rem" />
        </div>
      )
    })
  }

  goHome = () => {
    const { location } = this.props;
    const { code, mode, } = getQuery(location);
    window.location.href = `${window.location.protocol}//${window.location.host}/tasks?code=${code || '507'}&mode=${mode}`
  }

  setShareData = () => {
    const { location, detail, userInfo, } = this.props;
    const { id, code, mode } = getQuery(location);
    const { info } = detail.toJS();
    const { name, description } = info;
    const { inviteCode } = userInfo.toJS();
    const pageMode = getRandomMode(mode);

    return {
      title: name,
      desc: description,
      imgUrl: 'http://img-cows.kkkd.com/FqWOYC2pvqp56kj-OCRE8DyMKlxL',
      link: `${window.location.protocol}//${window.location.host}/noviceTaskDetail?id=${id}&code=${inviteCode || code || '507'}&mode=${pageMode}`,
    };
  }

  render () {
    const { detail, location, showShareMask, userInfo, } = this.props;
    const { code, mode } = getQuery(location);
    const { info } = detail.toJS();
    const { newUser } = userInfo.toJS();
    const { status, urls, hasOrder, name, description, surplusNum, estimateTotalAmount, earnedTotalAmount, id, parentDividerRate,  } = info;
    const isEnd = isActivityEnd(status);
    const shareData = this.setShareData();
    const processLen = newUser ? 2 : PROCESS_CONFIG.length;

    return (
      <div className="novice-task-wrap">
        <ViewConfig documentTitle={name} shareData={shareData} />
        <Deliver height=".36rem" />
        <div className="novice-task-info new-user-task">
          <div>
            <div className="new-user-task-tag">新手任务</div>
            <Deliver height=".18rem" />
          </div>
          <div className="info">
            <div className="name">{name}</div>
            <div className="desc">{description}</div>
            <div className="flex justify-between items-center">
              {
                !isEnd
                  ? <div className="tag count">
                      {(typeof surplusNum === 'number') ? `剩余${surplusNum}份` : '不限量'}
                    </div>
                  : <div className="tag end">已结束</div>
              }
              {
                !isEnd
                  && (
                      <div className="profit">
                        预计赚:
                        <span className="price price-cny">
                          {getShowPrice(estimateTotalAmount)}
                        </span>
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
        <Deliver height=".3rem" />
        <dl className="tip-wrap">
          <dt>注意事项</dt>
          <dd>1.必须首次关注公众号，才能领取红包；</dd>
          <dd>2.建议根据微信公众号推送的链接回到此页面领取红包；</dd>
          <dd>3.请阅读【任务步骤】，再做任务。</dd>
        </dl>
        <Deliver height=".32rem" />
        <div className="separate"></div>
        <div className="process-wrap">
          <Deliver height=".75rem" />
          <p className="tit">任务步骤</p>
          <Deliver height=".27rem" />
          <div className="process-content-wrap">
            { this.renderProcess(PROCESS_CONFIG, processLen) }
          </div>
        </div>
      {/*  <section className="task-footer flex justify-between">
          <button
            onClick={showShareMask}
            className="btn invite-btn flex-1"
          >
            <span>邀请好友</span><br />
            <span className="share-tip">可永久享受{parentDividerRate || 0}%提成</span>
          </button>
        </section>
        <ShareModal
          content={`点击右上角“...”发送给朋友，还能永久享受好友${parentDividerRate || 0}%的收入提成`}
        />*/}
        <RedBagModal
          initStatus="open"
          content="完成新手任务"
          onOkTxt="继续赚钱"
          onOk={this.goHome}
        />
        <HomeIcon code={code} mode={mode} />
        <ContactService />
      </div>
    )
  }
}

export default NoviceTaskDetail;
