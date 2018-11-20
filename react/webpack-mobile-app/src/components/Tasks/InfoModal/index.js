import React from 'react';
import './index.less';

export default class Index extends React.PureComponent {
  render () {
    const { content, okText, isShowModal, handleOk, title } = this.props;
    return (
      isShowModal 
        ? <div className="task-info-modal">
            <div className="mask" />
            <div className="task-modal-content">
              <div className="title">{title}</div>
              <div className="content">
                {content}
              </div>
              <div className="task-modal-footer flex">
                <div className="ok-btn" onClick={handleOk}>{okText}</div>
              </div>
            </div>
          </div>
        : <div></div>
    )
  }
}
