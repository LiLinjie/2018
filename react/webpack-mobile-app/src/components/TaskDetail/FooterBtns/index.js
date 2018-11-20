import React from 'react';
import './index.less'

const FooterBtns = (props) => {
  const { showTaskBtn, showUploadBtn, startUpload, doTask, showStartTaskBtn, startTask, isRestartTask, } = props;
  const receiveTaskTxt = isRestartTask ? '重新领取任务' : '领取任务';

  return (
    <section className="task-footer">
      <div className="footer-tip">请先阅读【任务步骤】</div>
      <div className="flex justify-center">
        { showStartTaskBtn && <button onClick={startTask} className="btn">{receiveTaskTxt}</button> }
        { showUploadBtn && <button
            onClick={startUpload}
            className={`btn invite-btn ${showTaskBtn ? '' : 'flex-0'}`}
          >
            <span>上传资料</span>
          </button> 
        }
        { showTaskBtn && <button onClick={doTask} className="btn">去做任务</button> }
      </div>
    </section>
  )
}

export default FooterBtns;