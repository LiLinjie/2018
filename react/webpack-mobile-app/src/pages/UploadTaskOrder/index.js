import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewConfig from '../../components/ViewConfig';
import Deliver from '../../components/Deliver';
import './index.less'
import * as types from '../../constants/actionTypes';
import TaskInfo from '../../components/TaskDetail/TaskInfo'
import ImgUpload from '../../components/UploadTaskOrder/ImgUpload'
import Remarks from '../../components/UploadTaskOrder/Remarks'
import InfoModal from '../../components/Tasks/InfoModal'
import { linkTo } from '../../utils/url'
import {getQuery} from "../../utils";

@connect(
  (state) => {
    return {
      detail: state.getIn(['tasks', 'detail']),
      uploading: state.getIn(['tasks', 'uploadingMaterial']),
      showInfoModal: state.getIn(['tasks', 'showInfoModal'])
    }
  },
  (dispatch) => ({
    uploadOrder(payload) {
      dispatch({
        type: types.TASKS_UPLOAD_ORDER_REQUEST,
        payload
      })
    },
    getDetail (payload) {
      dispatch({
        type: types.TASK_DETAIL_REQUEST,
        payload
      });
    },
    setDisplayInfoModal(payload) {
      dispatch({
        type: types.TASKS_SHOW_INFO_MODAL,
        payload
      })
    }
  })
)
export default class UploadTaskOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledSubmit: true,
    };
    this.imgUploadRef = null;
    this.remarksRef = null;
  }

  componentWillMount() {
    const { location } = this.props;
    const { id } = getQuery(location);
    this.props.getDetail({ id });
  }

  doUpload = () => {
    const { location, detail, } = this.props;
    const { id } = getQuery(location);
    const { info } = detail.toJS();
    const texts = this.remarksRef && this.remarksRef.getRemarks();
    // const imgUrls = this.imgUploadRef && this.imgUploadRef.getImgUrls();
    // console.log(imgUrls);
    // this.props.uploadOrder({ imgUrls, texts, id, });
    if (!info.imgMust) { // 非图文素材
      this.props.uploadOrder({ texts, id, });
    } else {
      this.imgUpload((mediaIds) => {
        this.props.uploadOrder({ mediaIds, texts, id, });
      })
    }
  }

  imgUpload(callback) {
    let i = 0;
    let mediaIds = [];
    const imgUrls = this.imgUploadRef.getImgUrls();
    const imgLen = imgUrls.length;
    if (!imgLen) { // 不存在图片，返回空数组
      callback(mediaIds)
    }

    function wxUpload() {
      wx.uploadImage({
        localId: imgUrls[i], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          i++;
          mediaIds.push(res.serverId); // 返回图片的服务器端ID
          if (i < imgLen) {
            wxUpload();
          } else if (i >= imgLen) {
            callback(mediaIds)
          }
        }
      });
    }

    wxUpload();
  }

  isDisableSubBtn = () => {
    const { detail } = this.props;
    const { info } = detail.toJS();
    const { imgMust, textMust, imgTemplates, placeholders } = info;
    let isNotValidateRemarks = false; // 文本校验是否未通过
    let isNotValidateImgUrls = false; // 图片校验是否未通过

    // 需要上传图片，验证是否上传完成
    if (imgMust) {
      const imgUrls = this.imgUploadRef.getImgUrls();
      isNotValidateImgUrls = imgUrls.length !== imgTemplates.length;
    }

    // 需要上传文本，验证是否上传完成
    if (textMust) {
      const texts = this.remarksRef.getRemarks();
      isNotValidateRemarks = texts.length !== placeholders.length;
    }

    this.setState({ disabledSubmit: (isNotValidateImgUrls ||  isNotValidateRemarks) })
  }

  // 提示信息
  renderTip(info) {
    let tip;
    const { textMust, imgMust, imgTemplates, placeholders } = info;
    const onlyShowRemark = !imgMust && textMust; // 只展示文本
    const onlyShowImg = imgMust && !textMust; // 只展示图片
    const allShowMaterial = textMust && imgMust; // 都展示
    const imgMaterialLen = imgTemplates && imgTemplates.length; // 需要上传的图片数
    const remarkLen = placeholders && placeholders.length; // 需要上传的备注数量

    if (onlyShowRemark) {
      tip = `*此任务需上传${remarkLen}条备注，方可提交一个订单进行审核*`
    } else if (onlyShowImg) {
      tip = '*请参照以上示例，截取相应的图片，上传并提交审核*'
    } else if (allShowMaterial) {
      tip = `*此任务需上传${imgMaterialLen}张图片和${remarkLen}条备注，方可提交一个订单进行审核*`
    }

    return tip;
  }

  goDetail = () => {
    const { location } = this.props;
    const { id, fromPage, } = getQuery(location);
    this.props.setDisplayInfoModal(false);
    linkTo(`/taskDetail?id=${id}&fromPage=${fromPage}`);
  }

  render() {
    const { detail, uploading, showInfoModal } = this.props;
    const { disabledSubmit } = this.state;
    const { info } = detail.toJS();
    const { textMust, imgMust, imgTemplates, placeholders } = info;
    const disableBtn = disabledSubmit || uploading;
    const tip = this.renderTip(info);
    const onlyShowRemark = textMust && !imgMust;
    const contentTit = onlyShowRemark ? '文字审核' : '截图审核';

    return (
      <div className="upload-task-order-wrap">
        <ViewConfig documentTitle="上传素材" />
        <TaskInfo msg={info} role={true} />
        <dl className="tip-wrap">
          <dt>审核说明</dt>
          <dd>1.提交任务素材后，不可更改，请确保提交的素材符合任务要求；</dd>
          <dd>2.审核会在1-2个工作日完成，请您耐心等待审核结果；</dd>
          <dd>3.审核通过后，任务佣金直接发放到您的账户。</dd>
        </dl>
        <div className="content content-top">
          <p className="tit">{contentTit}</p>
          { imgMust && <ImgUpload ref={ref => { this.imgUploadRef = ref;}} imgTemplates={imgTemplates} onChange={this.isDisableSubBtn} /> }
          { textMust && <Remarks ref={ref => { this.remarksRef = ref;}} placeholders={placeholders} onChange={this.isDisableSubBtn} /> }
          <p className="submit-tip">{tip}</p>
          <section className="upload-order-footer">
            <button
              onClick={() => { (!disableBtn) && this.doUpload()}}
              className={`btn ${disableBtn ? 'disabled' : ''}`}
            >
              { uploading ? '提交中' : '提交审核资料' }
            </button>
          </section>
        </div>
        <InfoModal
          title="提交材料成功"
          isShowModal={showInfoModal}
          handleOk={this.goDetail}
          content="审核将在1-2个工作日完成，通过后奖励自动发放到您的账户，可在审核明细页中查询审核进度。"
          okText="知道了"
        />
      </div>
    )
  }
}
