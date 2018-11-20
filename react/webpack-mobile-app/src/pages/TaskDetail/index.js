'use extensible';
import React from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import * as types from '../../constants/actionTypes';
import './index.less';
import TaskInfo from '../../components/TaskDetail/TaskInfo'
import Deliver from '../../components/Deliver'
import ShareModal from '../../components/Tasks/ShareModal';
import { COMMON_ROLE, AGENT_ROLE, OPERATOR_ROLE, isActivityEnd, getRandomMode, OVER_TIME_TASK, NO_RECEIVE_TASK, ACTIVITY_START_STATUS, DEFAULT_SHARE_IMG_URL, } from '../../constants/tasks'
import Register from '../../components/Tasks/RegisterModal';
import TaskModal from '../../components/Tasks/TaskModal';
import ImgShareModal from '../../components/TaskDetail/ImgShareModal';
import ImgMaterial from '../../components/TaskDetail/ImgMaterial'
import OrderMaterial from '../../components/TaskDetail/OrderMaterial'
import {encryptTxt, getQuery} from '../../utils'
import HomeIcon from '../../components/Tasks/SuspendedIcon/HomeIcon'
import ContactService from '../../components/Tasks/SuspendedIcon/ContactService'
import { linkTo } from '../../utils/url';
import FooterBtns from '../../components/TaskDetail/FooterBtns'
import CountDown from '../../components/TaskDetail/CountDown'
import Loading from '../../components/Loading'

@connect(state => {
  return {
    detail: state.getIn(['tasks', 'detail']),
    userInfo: state.getIn(['user', 'userInfo']),
    isShowApplyModal: state.getIn(['tasks', 'isShowApplyModal']),
    showBindModal: state.getIn(['tasks', 'showBindModal']),
    materialList: state.getIn(['tasks', 'materialList']),
    isShowInterModal: state.getIn(['tasks', 'isShowInterModal']),
  }
}, (dispatch) => ({
  getUserInfo () {
    dispatch({
      type: types.TASKS_WANGZHUAN_USER_INFO_REQUEST
    });
  },
  getDetail (payload) {
    dispatch({
      type: types.TASK_DETAIL_REQUEST,
      payload
    });
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
  showApplyModal() {
    dispatch({
      type: types.TASKS_APPLY_MODAL_SHOW
    })
  },
  hideApplyModal() {
    dispatch({
      type: types.TASKS_APPLY_MODAL_HIDE
    })
  },
  hideApplyModal() {
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
  showRegister () {
    dispatch({
      type: types.TASKS_REGISTER_SHOW
    })
  },
  showImgShareModal() {
    dispatch({
      type: types.TASKS_IMG_MODAL_SHOW
    })
  },
  getMaterialList(payload) {
    dispatch({
      type: types.TASKS_CHECK_LIST_REQUEST,
      payload
    })
  },
  startDoTask(payload) {
    dispatch({
      type: types.TASKS_START_TIME_REQUEST,
      payload
    })
  },
  cancelInterruptModal(payload) {
    dispatch({
      type: types.TASKS_HIDE_INTERRUPT_MODAL
    })
  },
  showInterruptModal(payload) {
    dispatch({
      type: types.TASKS_SHOW_INTERRUPT_MODAL
    })
  },
  interrTime(payload) {
    dispatch({
      type: types.TASKS_INTERRUPT_TIME_REQUEST,
      payload,
    })
  },
  autoInterruptTime() {
    dispatch({
      type: types.TASKS_AUTO_INTERRUPT_TIME,
      payload: OVER_TIME_TASK
    })
  }
}))
export default class TaskDetail extends React.PureComponent {
  componentWillMount () {
    const { location } = this.props;
    const { id } = getQuery(location);
    this.props.getDetail({id});
    this.articleImgs = []; // 流程文章内的所有图片地址
    this.shareMode = this.setShareMode();
    const { role } = this.props.userInfo;
    if (role) {
      this.props.getMaterialList({ activityId: id });
    }
  }


  componentWillReceiveProps(nextProps) {
    // 获取个人上传素材的列表
    const newInfo = nextProps.userInfo ? nextProps.userInfo.toJS() : {};
    if (this.props.userInfo !== nextProps.userInfo && newInfo.role) { // 获取当前活动所有素材订单列表
      const { location } = this.props;
      const { id, code, source } = getQuery(location);
      this.props.getMaterialList({ activityId: id });
    }
  }

  componentDidUpdate(prevProps) {
    // 存储流程文章内容的所有图片地址
    if (this.props.detail !== prevProps.detail) {
      this.articleImgs = this.collectArticleImgs();
    }
  }

  // 设置分享的页面模式
  setShareMode() {
    const { location } = this.props;
    const { mode } = getQuery(location);
    return getRandomMode(mode)
  }

  // 邀请好友
  inviteFriends = () => {
    this.roleOperate(() => {
      this.props.showShareMask();
    })
  }

  // 点击任务
  doTask = () => {
    const { info } = this.props.detail.toJS();
    const { materialContent, materialType } = info;
    this.roleOperate(() => {
      if (materialType === 'LINK') {
        linkTo(materialContent);
      } else if (materialType === 'IMAGE') {
        this.props.showImgShareModal();
      }
    })
  }

  // 点击流程，显示图片
  clickArticle = (e) => {
    if (e.target.nodeName.toLowerCase() === 'img') {
      const url = e.target.src;
      wx.previewImage({
        current: url,
        urls: this.articleImgs
      });
    }
  }

  // 收集流程文章内容的所有图片地址
  collectArticleImgs() {
    const imgDoms = document.querySelectorAll('.J-article img');
    if (!imgDoms) return [];
    const imgUrls = Array.prototype.map.call(imgDoms, (dom) => dom.src);
    return imgUrls || [];
  }

  // 权限判断操作
  roleOperate = (callBack) => {
    const { userInfo } = this.props;
    const { role } = userInfo.toJS();

    // 是否是运营商或代理商身份
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
    if (role === COMMON_ROLE) { // 消费者身份
      this.props.showApplyModal();
    } else {
      this.props.showRegister();
    }
  }

  setShareData = ({ title, desc, imgUrl, code }) => {
    const { location } = this.props;
    const { id, mode, partner = '' } = getQuery(location);
    return {
      title,
      desc,
      imgUrl,
      link: `${window.location.protocol}//${window.location.host}/taskDetail?id=${id}&code=${code}&mode=${this.shareMode}&partner=${partner}`,
      shareAppFn: this.props.hideShareMask,
      shareTimeLineFn: this.props.hideShareMask,
    };
  }

  // 查看审核明细
  goCheckDetail = () => {
    this.roleOperate(() => {
      const { location } = this.props;
      const { id } = getQuery(location);
      linkTo(`/checkDetail?id=${id}`);
    })
  }

  // 跳转至任务素材上传页面
  goMaterialUpload = () => {
    this.roleOperate(() => {
      const { location, materialList, detail, } = this.props;
      const { id, fromPage } = getQuery(location);
      const parseMaterialList = materialList.toJS();
      const materialLen = parseMaterialList.length;
      const { info } = detail.toJS();
      const { orderLimit } = info;

      if (materialLen < orderLimit) {
        linkTo(`/uploadTaskOrder?id=${id}&fromPage=${fromPage}`);
      } else {
        alertTip('上传素材数量已达上限')
      }
    })
  }

  // 开始领取任务
  startTask = () => {
    this.roleOperate(() => {
      const { location } = this.props;
      const { id } = getQuery(location);
      this.props.startDoTask(id);
    })
  }

  // 中断任务计时
  interruptTime = () => {
    this.props.showInterruptModal();
  }

  // 执行中断计时操作
  doInterruptTime = () => {
    const { location } = this.props;
    const { id } = getQuery(location);
    this.props.cancelInterruptModal();
    this.props.interrTime(id)
  }

  render () {
    const { detail, userInfo,  location, isShowApplyModal, hideApplyModal, applyToAgent, showBindModal, cancelBindModal, bindRelation, materialList, isShowInterModal, cancelInterruptModal, autoInterruptTime, } = this.props;
    const { id, code, mode, fromPage, partner } = getQuery(location);
    const { info, isInit, } = detail.toJS();
    const { name, backgroundUrl, description, materialImg, materialUrl, orderLimit, imgMust, textMust, materialType, materialContent, status, parentDividerRate, limitTime, } = info;
    const showImgs = imgMust; // 显示图片材料上传情况
    const showOrderList = textMust && !imgMust; // 显示文本订单表格
    const { inviteCode, role } = userInfo.toJS();
    const isEnd = isActivityEnd(status); // 活动是否结束
    const showShareBtn = !isEnd; // 显示分享按钮
    const documentTitle = (role && !isEnd)
      ? (name || '加载中...') + '|悦惠赏金联盟'
      : encryptTxt(name); // 标题
    const finalInviteCode = inviteCode || code || '507'; // 最终邀请码
    const shareData = name ? this.setShareData({ // 分享配置
      title: documentTitle,
      desc: (role && !isEnd) ? description : encryptTxt(description),
      imgUrl: backgroundUrl || DEFAULT_SHARE_IMG_URL,
      code: finalInviteCode,
    }) : null;
    const parseMaterialList = materialList.toJS();
    const materialLen = parseMaterialList.length; // 已上传的材料数
    const { article } = info.info || {}; // 流程文章
    const showMaterialList = materialLen; // 显示上传材料状态详情

    // 显示开始任务按钮: 非进行中且未做过任务
    const showStartTaskBtn = (limitTime <= NO_RECEIVE_TASK) && !showMaterialList;
    const showUploadBtn = !showStartTaskBtn; // 显示上传按钮
    const showTaskBtn = !showStartTaskBtn && (materialType !== 'NONE'); // 显示做任务按钮

    // 显示重新开始任务按钮: 已过期且未参与过任务活动
    const isRestartTask = (limitTime < NO_RECEIVE_TASK) && !showMaterialList;

    // 显示倒计时：已领取状态且未参与过活动
    const showTime = (limitTime !== NO_RECEIVE_TASK) && !showMaterialList;
    const showFooter = status === ACTIVITY_START_STATUS; // 活动是否开启状态

    return isInit
      ? <Loading />
      : <div className="task-detail-wrap">
          <ViewConfig documentTitle={documentTitle} shareData={shareData} />
          <TaskInfo msg={info} role={role} extraContent={showTime ? <CountDown isRestartTask={isRestartTask} limitTime={limitTime} interruptTime={this.interruptTime} autoInterruptTime={autoInterruptTime} /> : null} />
          <section className="task-main">
           { showMaterialList
              ? <section className="task-list">
                  <div className="tit flex justify-between">
                    <div>您上传的任务素材 ({materialLen}/{orderLimit})</div>
                    <div onClick={this.goCheckDetail} className="link">查看审核明细</div>
                  </div>
                  <div>
                    { showImgs && <ImgMaterial isEnd={isEnd} list={parseMaterialList} /> }
                    { showOrderList && <OrderMaterial isEnd={isEnd} list={parseMaterialList} /> }
                  </div>
                </section>
              : null
            }
            <section className="task-detail">
              {
                isEnd
                  ? <div className="end">已结束</div>
                  : <div onClick={this.clickArticle} className="J-article activity-process-content" dangerouslySetInnerHTML={{__html: article}} />
              }
            </section>
          </section>
          { showFooter && <FooterBtns
            showTaskBtn={showTaskBtn}
            doTask={this.doTask}
            showUploadBtn={showUploadBtn}
            startUpload={this.goMaterialUpload}
            showStartTaskBtn={showStartTaskBtn}
            startTask={this.startTask}
            isRestartTask={isRestartTask}
          /> }
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
          <TaskModal
            isShowModal={isShowInterModal}
            hideModal={cancelInterruptModal}
            handleOk={this.doInterruptTime}
            content="确认放弃任务？"
            okText="确认"
          />
          {
            !partner && (
              <div>
                <ShareModal
                  content={`点击右上角“...”发送给朋友，还能永久享受好友${parentDividerRate || 0}%的收入提成`}
                />
                <div onClick={this.inviteFriends} className="share-icon"/>
                <ImgShareModal imgUrl={materialContent} />
                <HomeIcon code={finalInviteCode} mode={mode} fromPage={fromPage} />
                <ContactService />
              </div>
            )
          }
        </div>
  }
}
