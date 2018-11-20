import React from 'react';
import CopyToClipboard from 'react-clipboard2';
import './index.less';

export default class Index extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      status: ''
    }
  }
  render () {
    const { link, show, hideModal } = this.props;
    const { status } = this.state;
    const copyText = status === 'SUCCESS' ? `复制成功` : (status === 'FAILURE' ? '请手动复制' : '复制链接');
    return (
      show
        ? <div className="task-invite-modal">
          <div className="mask" onClick={hideModal} />
          <div className="task-invite-content">
            <div className="close" onClick={hideModal}><i className="iconfont">&#xe616;</i></div>
            <div className="title">邀请链接</div>
            <textarea className="link" value={link}></textarea>
            <CopyToClipboard text={link}
                             onFail={() => {this.setState({status: 'FAILURE'}); window.alertTip('浏览器不兼容，请手动复制.')}}
                             onCopy={() => {this.setState({status: 'SUCCESS'}); window.alertTip('复制成功！')}}
            >
              <button className="btn">{copyText}</button>
            </CopyToClipboard>
          </div>
        </div>
        : null
    )
  }
}
