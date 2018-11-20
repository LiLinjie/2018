import React from 'react';
import './index.less';

export default class Index extends React.PureComponent {
  render () {
    const { hideModal, content, okText, handleOk, isShowModal } = this.props;
    return (
      isShowModal 
        ? <div className="task-modal">
            <div className="mask" onClick={hideModal} />
            <div className="task-modal-content">
              <div className="content">
                {content}
              </div>
              <div className="task-modal-footer flex">
                <button className="flex-1 cancel" onClick={hideModal}>取消</button>
                <button className="flex-1 ok" onClick={handleOk}>{okText}</button>
              </div>
            </div>
          </div>
        : <div></div>
    )
  }
}
