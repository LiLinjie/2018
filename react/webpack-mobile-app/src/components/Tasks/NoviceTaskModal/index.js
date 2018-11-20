import React from 'react';
import './index.less';

const NoviceTaskModal = (props) => {
  const { show, hideModal, onOk, okTxt, money } = props;

  return show
      ? <div className="task-novice-modal">
          <div className="mask" onClick={hideModal} />
          <div className="task-novice-content">
            <div className="money">
              <span>{money}</span>
              <span className="unit">元</span>
            </div>
            <button className="btn" onClick={onOk}>{okTxt}</button>
            <div className="close" onClick={hideModal}></div>
          </div>
        </div>
      : null
}

export default NoviceTaskModal;
