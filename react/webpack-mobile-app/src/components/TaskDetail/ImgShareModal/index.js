import React from 'react';
import './index.less';
import {connect} from 'react-redux';
import * as types from "../../../constants/actionTypes";

@connect(state => {
  return {
    showImgModal: state.getIn(['tasks', 'showImgModal'])
  }
}, (dispatch) => ({
  hideModal () {
    dispatch({
      type: types.TASKS_IMG_MODAL_HIDE
    })
  },
}))
export default class ImgShareModal extends React.PureComponent {
  render () {
    const { hideModal, showImgModal, imgUrl, } = this.props;
    return (
      showImgModal 
        ? <div className="img-share-modal">
            <div className="mask" onClick={hideModal} />
            <div className="img-modal-content">
              <div className="tit">【长按保存图片，分享好友/朋友圈】</div>
              <img className="img" src={imgUrl} alt="图片"/>
            </div>
          </div>
        : null
    )
  }
}
