import React from 'react';
import './index.less';
import {connect} from 'react-redux';
import * as types from "../../../constants/actionTypes";

@connect(state => {
  return {
    isShowShareModal: state.getIn(['tasks', 'isShowShareModal'])
  }
}, (dispatch) => ({
  hideModal () {
    dispatch({
      type: types.TASKS_SHARE_MODAL_HIDE
    })
  },
}))
export default class ShareModal extends React.PureComponent {
  render () {
    const { hideModal, isShowShareModal, content } = this.props;
    return (
      isShowShareModal 
        ? <div className="task-share-modal">
            <div className="mask" onClick={hideModal} />
            <div className="share-modal-content">
              {content}
            </div>
          </div>
        : null
    )
  }
}
